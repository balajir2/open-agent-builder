import { v } from "convex/values";
import { query, mutation, internalQuery, action } from "./_generated/server";
import { internal } from "./_generated/api";

/**
 * SECURITY: All public queries/mutations enforce authentication and ownership.
 * Internal queries (for server-side execution) accept userId as args.
 */

/**
 * Require authentication. Returns identity subject (userId).
 * Throws if not authenticated.
 */
async function requireAuth(ctx: any): Promise<string> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.subject) {
    throw new Error("Authentication required");
  }
  return identity.subject;
}

/**
 * Check if a user can READ a workflow.
 * Access is granted if the user is the owner, an assignee, an admin, or the workflow is a template.
 */
async function checkWorkflowAccess(ctx: any, workflow: any, userId: string): Promise<boolean> {
  if (!workflow) return false;

  // Templates are publicly readable
  if (workflow.isTemplate) return true;

  // Owner or assignee
  if (workflow.userId === userId || workflow.assignedTo === userId) return true;

  // Admin check
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q: any) => q.eq("clerkId", userId))
    .first();
  if (user?.role === "admin") return true;

  return false;
}

/**
 * Check if a user can WRITE (update/delete) a workflow.
 * Only owner or admin — assignees have read/execute access only.
 */
async function checkWorkflowWriteAccess(ctx: any, workflow: any, userId: string): Promise<boolean> {
  if (!workflow) return false;

  // Owner
  if (workflow.userId === userId) return true;

  // Admin check
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q: any) => q.eq("clerkId", userId))
    .first();
  if (user?.role === "admin") return true;

  return false;
}

/**
 * Check if a user is an admin.
 */
async function requireAdmin(ctx: any, userId: string): Promise<void> {
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q: any) => q.eq("clerkId", userId))
    .first();
  if (user?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }
}

/**
 * Clean nodes/edges before storing in Convex.
 * Ensures JSON-safe minimal objects.
 */
function sanitizeNodesAndEdges(nodes: any[], edges: any[]) {
  const cleanNodes = (nodes || []).map((node) => ({
    id: String(node.id ?? ""),
    type: String(node.type ?? node?.data?.nodeType ?? "default"),
    position: {
      x: typeof node?.position?.x === "number" ? node.position.x : 0,
      y: typeof node?.position?.y === "number" ? node.position.y : 0,
    },
    data: JSON.parse(JSON.stringify(node.data ?? {})),
  }));

  const cleanEdges = (edges || []).map((edge) => ({
    id: String(edge.id ?? ""),
    source: String(edge.source ?? ""),
    target: String(edge.target ?? ""),
    sourceHandle: edge.sourceHandle != null ? String(edge.sourceHandle) : undefined,
    targetHandle: edge.targetHandle != null ? String(edge.targetHandle) : undefined,
    type: edge.type != null ? String(edge.type) : "smoothstep",
  }));

  return { cleanNodes, cleanEdges };
}

/* --------------------------------------------------------
   WORKFLOW CRUD — OWNERSHIP ENFORCED
--------------------------------------------------------- */

// Get all workflows for the authenticated user
export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) return [];
    const userId = identity.subject;

    return await ctx.db
      .query("workflows")
      .filter((q: any) =>
        q.and(
          q.neq(q.field("isTemplate"), true),
          q.or(
            q.eq(q.field("userId"), userId),
            q.eq(q.field("assignedTo"), userId)
          )
        )
      )
      .order("desc")
      .collect();
  },
});

// Get all workflows (team mode — admin sees all, users see own + assigned)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) return [];
    const userId = identity.subject;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q: any) => q.eq("clerkId", userId))
      .first();

    const isAdmin = user?.role === "admin";

    if (isAdmin) {
      return await ctx.db.query("workflows")
        .filter((q: any) => q.neq(q.field("isTemplate"), true))
        .order("desc")
        .collect();
    }

    return await ctx.db
      .query("workflows")
      .filter((q: any) =>
        q.and(
          q.neq(q.field("isTemplate"), true),
          q.or(
            q.eq(q.field("userId"), userId),
            q.eq(q.field("assignedTo"), userId)
          )
        )
      )
      .order("desc")
      .collect();
  },
});

// Alias
export const listWorkflows = list;

// Get workflow by Convex ID — ownership enforced
export const getWorkflow = query({
  args: { id: v.id("workflows") },
  handler: async (ctx, { id }) => {
    const userId = await requireAuth(ctx);
    const workflow = await ctx.db.get(id);

    if (!workflow) return null;

    const hasAccess = await checkWorkflowAccess(ctx, workflow, userId);
    if (!hasAccess) return null;

    return workflow;
  },
});

// Get workflow by custom ID — ownership enforced
export const getWorkflowByCustomId = query({
  args: { customId: v.string() },
  handler: async (ctx, { customId }) => {
    const userId = await requireAuth(ctx);

    const workflow = await ctx.db
      .query("workflows")
      .withIndex("by_customId", (q: any) => q.eq("customId", customId))
      .first();

    if (!workflow) return null;

    const hasAccess = await checkWorkflowAccess(ctx, workflow, userId);
    if (!hasAccess) return null;

    return workflow;
  },
});

// Internal queries for server-side use (execution engine, etc.) — NOT publicly callable
export const getWorkflowInternal = internalQuery({
  args: { id: v.id("workflows") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

export const getWorkflowByCustomIdInternal = internalQuery({
  args: { customId: v.string() },
  handler: async (ctx, { customId }) => {
    return await ctx.db
      .query("workflows")
      .withIndex("by_customId", (q: any) => q.eq("customId", customId))
      .first();
  },
});

// Public action for API key-authenticated workflow lookups (execute-stream route)
// Validates via CONVEX_TEST_SECRET to prevent unauthorized access
export const getWorkflowForExecution = action({
  args: {
    customId: v.optional(v.string()),
    convexId: v.optional(v.string()),
    secret: v.string(),
  },
  handler: async (ctx, args): Promise<any> => {
    const testSecret = process.env.CONVEX_TEST_SECRET;
    if (!testSecret || args.secret !== testSecret) {
      throw new Error("Unauthorized: invalid execution secret");
    }

    if (args.customId) {
      return await ctx.runQuery(internal.workflows.getWorkflowByCustomIdInternal, {
        customId: args.customId,
      });
    }
    if (args.convexId) {
      return await ctx.runQuery(internal.workflows.getWorkflowInternal, {
        id: args.convexId as any,
      });
    }
    return null;
  },
});

// Create or update workflow — ownership enforced on update
export const saveWorkflow = mutation({
  args: {
    customId: v.optional(v.string()),
    name: v.string(),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    difficulty: v.optional(v.string()),
    estimatedTime: v.optional(v.string()),
    nodes: v.array(v.any()),
    edges: v.array(v.any()),
    version: v.optional(v.string()),
    isTemplate: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);

    const { cleanNodes, cleanEdges } = sanitizeNodesAndEdges(args.nodes, args.edges);

    const safeName =
      args.name && args.name.trim().length > 0 ? args.name : "Untitled Workflow";

    // If customId exists → update (with ownership check)
    let existing = null;
    if (args.customId) {
      existing = await ctx.db
        .query("workflows")
        .withIndex("by_customId", (q: any) => q.eq("customId", args.customId!))
        .first();
    }

    if (existing) {
      // Ownership check: only owner or admin can update (assignees have read-only access)
      const hasAccess = await checkWorkflowWriteAccess(ctx, existing, userId);
      if (!hasAccess) {
        throw new Error("Unauthorized: You can only update your own workflows");
      }

      await ctx.db.patch(existing._id, {
        name: safeName,
        description: args.description,
        category: args.category,
        tags: args.tags,
        difficulty: args.difficulty,
        estimatedTime: args.estimatedTime,
        nodes: cleanNodes,
        edges: cleanEdges,
        version: args.version,
        isTemplate: args.isTemplate,
        updatedAt: new Date().toISOString(),
      });

      return existing._id;
    }

    // Otherwise create — set authenticated user as owner
    const nowIso = new Date().toISOString();

    return await ctx.db.insert("workflows", {
      customId: args.customId,
      name: safeName,
      description: args.description,
      category: args.category,
      tags: args.tags,
      difficulty: args.difficulty,
      estimatedTime: args.estimatedTime,
      nodes: cleanNodes,
      edges: cleanEdges,
      version: args.version,
      isTemplate: args.isTemplate,
      isPublic: false,
      userId,
      createdAt: nowIso,
      updatedAt: nowIso,
    });
  },
});

// Delete workflow — ownership enforced
export const deleteWorkflow = mutation({
  args: { id: v.id("workflows") },
  handler: async (ctx, { id }) => {
    const userId = await requireAuth(ctx);

    const workflow = await ctx.db.get(id);
    if (!workflow) {
      throw new Error("Workflow not found");
    }

    const user = await ctx.db.query("users").withIndex("by_clerkId", (q: any) => q.eq("clerkId", userId)).first();
    const isAdmin = user?.role === "admin";

    if (!isAdmin && workflow.userId !== userId) {
      throw new Error("Unauthorized: You can only delete your own workflows");
    }

    await ctx.db.delete(id);
    return { success: true };
  },
});

// Assign workflow to a user (Admin only)
export const assignWorkflow = mutation({
  args: {
    workflowId: v.id("workflows"),
    assignedTo: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q: any) => q.eq("clerkId", userId))
      .first();

    if (user?.role !== "admin") throw new Error("Unauthorized: Admin access required");

    await ctx.db.patch(args.workflowId, {
      assignedTo: args.assignedTo,
    });

    return { success: true };
  },
});

// Workflows by category — auth enforced, scoped to user
export const getWorkflowsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, { category }) => {
    const userId = await requireAuth(ctx);

    const workflows = await ctx.db.query("workflows")
      .withIndex("by_category", (q: any) => q.eq("category", category))
      .collect();

    // Filter to only accessible workflows
    const accessible = [];
    for (const w of workflows) {
      if (await checkWorkflowAccess(ctx, w, userId)) {
        accessible.push(w);
      }
    }
    return accessible;
  },
});

// All templates — templates are public, auth still required
export const getTemplates = query({
  args: {},
  handler: async (ctx) => {
    await requireAuth(ctx);
    return await ctx.db.query("workflows").withIndex("by_template", (q: any) => q.eq("isTemplate", true)).collect();
  },
});

// Seed template — requires auth
export const seedOfficialTemplate = mutation({
  args: {
    customId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    difficulty: v.optional(v.string()),
    estimatedTime: v.optional(v.string()),
    nodes: v.array(v.any()),
    edges: v.array(v.any()),
  },
  handler: async (ctx, template) => {
    const userId = await requireAuth(ctx);
    await requireAdmin(ctx, userId);

    const existing = await ctx.db
      .query("workflows")
      .withIndex("by_customId", (q: any) => q.eq("customId", template.customId))
      .first();

    if (existing) return { success: false, message: "Template already exists" };

    const { cleanNodes, cleanEdges } = sanitizeNodesAndEdges(template.nodes, template.edges);
    const nowIso = new Date().toISOString();

    const newId = await ctx.db.insert("workflows", {
      customId: template.customId,
      name: template.name,
      description: template.description,
      category: template.category || "Templates",
      tags: template.tags || [],
      difficulty: template.difficulty,
      estimatedTime: template.estimatedTime,
      nodes: cleanNodes,
      edges: cleanEdges,
      createdAt: nowIso,
      updatedAt: nowIso,
      version: "1.0.0",
      isTemplate: true,
      isPublic: true,
    });

    return { success: true, id: newId.toString(), message: `Seeded template: ${template.name}` };
  },
});

// Get template by ID — templates are public, auth still required
export const getTemplateByCustomId = query({
  args: { customId: v.string() },
  handler: async (ctx, { customId }) => {
    await requireAuth(ctx);

    const template = await ctx.db
      .query("workflows")
      .withIndex("by_customId", (q: any) => q.eq("customId", customId))
      .filter((q: any) => q.eq(q.field("isTemplate"), true))
      .first();

    if (!template) return null;

    return {
      ...template,
      id: template.customId || template._id,
    };
  },
});

// Update template — admin only
export const updateTemplateStructure = mutation({
  args: {
    customId: v.string(),
    nodes: v.array(v.any()),
    edges: v.array(v.any()),
  },
  handler: async (ctx, { customId, nodes, edges }) => {
    const userId = await requireAuth(ctx);
    await requireAdmin(ctx, userId);

    const template = await ctx.db
      .query("workflows")
      .withIndex("by_customId", (q: any) => q.eq("customId", customId))
      .filter((q: any) => q.eq(q.field("isTemplate"), true))
      .first();

    if (!template) throw new Error(`Template ${customId} not found`);

    const { cleanNodes, cleanEdges } = sanitizeNodesAndEdges(nodes, edges);

    await ctx.db.patch(template._id, {
      nodes: cleanNodes,
      edges: cleanEdges,
      updatedAt: new Date().toISOString(),
    });

    return { success: true };
  },
});

// Reset template to default — admin only
export const resetTemplateToDefault = mutation({
  args: { customId: v.string() },
  handler: async (ctx, { customId }) => {
    const userId = await requireAuth(ctx);
    await requireAdmin(ctx, userId);

    const originalTemplate = await import("../lib/workflow/templates").then((mod) =>
      mod.getTemplate(customId)
    );

    if (!originalTemplate) throw new Error(`Original template ${customId} not found`);

    const template = await ctx.db
      .query("workflows")
      .withIndex("by_customId", (q: any) => q.eq("customId", customId))
      .filter((q: any) => q.eq(q.field("isTemplate"), true))
      .first();

    if (!template) throw new Error(`Template ${customId} not found in database`);

    const { cleanNodes, cleanEdges } = sanitizeNodesAndEdges(
      originalTemplate.nodes,
      originalTemplate.edges
    );

    await ctx.db.patch(template._id, {
      nodes: cleanNodes,
      edges: cleanEdges,
      updatedAt: new Date().toISOString(),
    });

    return { success: true };
  },
});

// Workflow details — ownership enforced
export const getWorkflowDetails = query({
  args: { customId: v.string() },
  handler: async (ctx, { customId }) => {
    const userId = await requireAuth(ctx);

    const workflow = await ctx.db
      .query("workflows")
      .withIndex("by_customId", (q: any) => q.eq("customId", customId))
      .first();

    if (!workflow) return null;

    const hasAccess = await checkWorkflowAccess(ctx, workflow, userId);
    if (!hasAccess) return null;

    const requiredInputs: any[] = [];

    try {
      workflow.nodes?.forEach((node: any) => {
        if (Array.isArray(node.data?.inputVariables)) {
          node.data.inputVariables.forEach((inputVar: any) => {
            requiredInputs.push({
              name: inputVar.name,
              description: inputVar.description || "Enter value",
              type: inputVar.type || "text",
              required: inputVar.required ?? true,
              defaultValue: inputVar.defaultValue || "",
            });
          });
        }
      });
    } catch { }

    return {
      ...workflow,
      requiredInputs,
    };
  },
});

// Get all workflows assigned to a specific user (Admin only)
export const getWorkflowsForUser = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const callerUserId = await requireAuth(ctx);

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q: any) => q.eq("clerkId", callerUserId))
      .first();

    if (user?.role !== "admin") return [];

    return await ctx.db
      .query("workflows")
      .filter((q: any) =>
        q.or(
          q.eq(q.field("assignedTo"), userId),
          q.eq(q.field("userId"), userId)
        )
      )
      .collect();
  },
});

// Batch update workflow assignments for a user (Admin only)
export const batchUpdateAssignments = mutation({
  args: {
    userId: v.string(),
    workflowIds: v.array(v.id("workflows")),
  },
  handler: async (ctx, { userId, workflowIds }) => {
    const callerUserId = await requireAuth(ctx);

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q: any) => q.eq("clerkId", callerUserId))
      .first();

    if (user?.role !== "admin") throw new Error("Unauthorized: Admin access required");

    // 1. Unassign all workflows currently assigned to this user that are NOT in the new list
    const currentAssignments = await ctx.db
      .query("workflows")
      .filter((q: any) => q.eq(q.field("assignedTo"), userId))
      .collect();

    for (const workflow of currentAssignments) {
      if (!workflowIds.includes(workflow._id)) {
        await ctx.db.patch(workflow._id, { assignedTo: undefined });
      }
    }

    // 2. Assign all workflows in the new list to this user
    for (const workflowId of workflowIds) {
      await ctx.db.patch(workflowId, { assignedTo: userId });
    }

    return { success: true };
  },
});

/* --------------------------------------------------------
   TEST-COMPATIBLE ALIASES
   --------------------------------------------------------
   These functions provide backwards-compatible names for tests
   -------------------------------------------------------- */

/**
 * Create a new workflow (alias for saveWorkflow)
 */
export const create = saveWorkflow;

/**
 * Get a workflow by ID (alias for getWorkflow)
 */
export const get = getWorkflow;

/**
 * Update an existing workflow — ownership enforced
 */
export const update = mutation({
  args: {
    id: v.id("workflows"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    nodes: v.optional(v.any()),
    edges: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);

    const workflow = await ctx.db.get(args.id);
    if (!workflow) {
      throw new Error("Workflow not found");
    }

    const hasAccess = await checkWorkflowWriteAccess(ctx, workflow, userId);
    if (!hasAccess) {
      throw new Error("Unauthorized: You can only update your own workflows");
    }

    const { id, ...updates } = args;

    // Clean nodes and edges if provided
    if (updates.nodes || updates.edges) {
      const { cleanNodes, cleanEdges } = sanitizeNodesAndEdges(
        updates.nodes || [],
        updates.edges || []
      );
      updates.nodes = cleanNodes;
      updates.edges = cleanEdges;
    }

    await ctx.db.patch(id, updates);
    return id;
  },
});
