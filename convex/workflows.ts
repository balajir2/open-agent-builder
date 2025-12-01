import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

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
   WORKFLOW CRUD (DEV MODE — NO OWNERSHIP PERMISSIONS)
--------------------------------------------------------- */

// Get all workflows for logged-in user
export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("workflows")
      .filter((q) =>
        q.and(q.eq(q.field("userId"), identity.subject), q.neq(q.field("isTemplate"), true))
      )
      .order("desc")
      .collect();
  },
});

// Get all workflows (team mode)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return await ctx.db.query("workflows").filter((q) => q.neq(q.field("isTemplate"), true)).order("desc").collect();
  },
});

// Alias
export const listWorkflows = list;

// Get workflow by Convex ID
export const getWorkflow = query({
  args: { id: v.id("workflows") },
  handler: async ({ db }, { id }) => db.get(id),
});

// Get workflow by custom ID
export const getWorkflowByCustomId = query({
  args: { customId: v.string() },
  handler: async ({ db }, { customId }) => {
    return await db
      .query("workflows")
      .withIndex("by_customId", (q) => q.eq("customId", customId))
      .first();
  },
});

// Create or update workflow — NO ownership check
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
    const identity = await ctx.auth.getUserIdentity();

    const { cleanNodes, cleanEdges } = sanitizeNodesAndEdges(args.nodes, args.edges);

    const safeName =
      args.name && args.name.trim().length > 0 ? args.name : "Untitled Workflow";

    // If customId exists → update
    let existing = null;
    if (args.customId) {
      existing = await ctx.db
        .query("workflows")
        .withIndex("by_customId", (q) => q.eq("customId", args.customId!))
        .first();
    }

    if (existing) {
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

    // Otherwise create
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
      userId: identity?.subject,
      createdAt: nowIso,
      updatedAt: nowIso,
    });
  },
});

// Delete workflow — NO ownership restrictions
export const deleteWorkflow = mutation({
  args: { id: v.id("workflows") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return { success: true };
  },
});

// Workflows by category
export const getWorkflowsByCategory = query({
  args: { category: v.string() },
  handler: async ({ db }, { category }) => {
    return await db.query("workflows").withIndex("by_category", (q) => q.eq("category", category)).collect();
  },
});

// All templates
export const getTemplates = query({
  args: {},
  handler: async ({ db }) => {
    return await db.query("workflows").withIndex("by_template", (q) => q.eq("isTemplate", true)).collect();
  },
});

// Seed template
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
    const existing = await ctx.db
      .query("workflows")
      .withIndex("by_customId", (q) => q.eq("customId", template.customId))
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

// Get template by ID
export const getTemplateByCustomId = query({
  args: { customId: v.string() },
  handler: async ({ db }, { customId }) => {
    const template = await db
      .query("workflows")
      .withIndex("by_customId", (q) => q.eq("customId", customId))
      .filter((q) => q.eq(q.field("isTemplate"), true))
      .first();

    if (!template) return null;

    return {
      ...template,
      id: template.customId || template._id,
    };
  },
});

// Update template — unrestricted
export const updateTemplateStructure = mutation({
  args: {
    customId: v.string(),
    nodes: v.array(v.any()),
    edges: v.array(v.any()),
  },
  handler: async (ctx, { customId, nodes, edges }) => {
    const template = await ctx.db
      .query("workflows")
      .withIndex("by_customId", (q) => q.eq("customId", customId))
      .filter((q) => q.eq(q.field("isTemplate"), true))
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

// Reset template to default
export const resetTemplateToDefault = mutation({
  args: { customId: v.string() },
  handler: async (ctx, { customId }) => {
    const originalTemplate = await import("../lib/workflow/templates").then((mod) =>
      mod.getTemplate(customId)
    );

    if (!originalTemplate) throw new Error(`Original template ${customId} not found`);

    const template = await ctx.db
      .query("workflows")
      .withIndex("by_customId", (q) => q.eq("customId", customId))
      .filter((q) => q.eq(q.field("isTemplate"), true))
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

// Workflow details + extracted input variables
export const getWorkflowDetails = query({
  args: { customId: v.string() },
  handler: async ({ db }, { customId }) => {
    const workflow = await db
      .query("workflows")
      .withIndex("by_customId", (q) => q.eq("customId", customId))
      .first();

    if (!workflow) return null;

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
    } catch {}

    return {
      ...workflow,
      requiredInputs,
    };
  },
});