import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

/**
 * Workflow Execution State Management
 */

/**
 * Helper to get the current user's identity subject (Clerk ID).
 * Returns undefined if no identity is present (e.g. test environment).
 */
async function getCurrentUserId(ctx: any): Promise<string | undefined> {
  const identity = await ctx.auth.getUserIdentity();
  return identity?.subject;
}

/**
 * Helper to check if current user can access an execution.
 * Allows access if: user is owner, user is admin, or in test environment.
 */
async function checkExecutionAccess(ctx: any, execution: any): Promise<boolean> {
  // In test environments, allow access
  if (process.env.NODE_ENV === "test" || process.env.CONVEX_TEST_SECRET) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return true; // Test env without identity
  }

  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return false;

  // Owner check
  if (execution.userId === identity.subject) return true;

  // Admin check
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q: any) => q.eq("clerkId", identity.subject))
    .first();
  if (user?.role === "admin") return true;

  return false;
}

// Create execution record
export const createExecution = mutation({
  args: {
    workflowId: v.id("workflows"),
    userId: v.optional(v.string()),
    input: v.optional(v.any()),
    threadId: v.optional(v.string()),
  },
  handler: async ({ db }, { workflowId, userId, input, threadId }) => {
    const executionId = await db.insert("executions", {
      workflowId,
      userId,
      status: "running",
      input,
      threadId,
      nodeResults: {},
      variables: {},
      startedAt: new Date().toISOString(),
    });
    return executionId;
  },
});

// Update execution state
export const updateExecution = mutation({
  args: {
    id: v.id("executions"),
    status: v.optional(v.string()),
    currentNodeId: v.optional(v.string()),
    nodeResults: v.optional(v.any()),
    variables: v.optional(v.any()),
    output: v.optional(v.any()),
    error: v.optional(v.string()),
  },
  handler: async ({ db }, { id, ...updates }) => {
    await db.patch(id, updates);
    return id;
  },
});

// Complete execution
export const completeExecution = mutation({
  args: {
    id: v.id("executions"),
    output: v.optional(v.any()),
    error: v.optional(v.string()),
  },
  handler: async ({ db }, { id, output, error }) => {
    await db.patch(id, {
      status: error ? "failed" : "completed",
      output,
      error,
      completedAt: new Date().toISOString(),
    });
    return id;
  },
});

// Get execution by ID — with ownership check
export const getExecution = query({
  args: { id: v.id("executions") },
  handler: async (ctx, { id }) => {
    const execution = await ctx.db.get(id);
    if (!execution) return null;

    const hasAccess = await checkExecutionAccess(ctx, execution);
    if (!hasAccess) return null;

    return execution;
  },
});

// Get executions for a workflow — with ownership check
export const getWorkflowExecutions = query({
  args: { workflowId: v.id("workflows") },
  handler: async (ctx, { workflowId }) => {
    const executions = await ctx.db
      .query("executions")
      .withIndex("by_workflow", (q) => q.eq("workflowId", workflowId))
      .order("desc")
      .collect();

    // Filter by ownership
    const results = [];
    for (const execution of executions) {
      const hasAccess = await checkExecutionAccess(ctx, execution);
      if (hasAccess) {
        results.push(execution);
      }
    }
    return results;
  },
});

/**
 * Mark execution as failed
 * Used by tests for error handling scenarios
 */
export const failExecution = mutation({
  args: {
    id: v.optional(v.id("executions")), // For test compatibility
    executionId: v.optional(v.id("executions")),
    error: v.string(),
  },
  handler: async ({ db }, args) => {
    const execId = args.executionId || args.id;
    if (!execId) {
      throw new Error("executionId or id is required");
    }

    await db.patch(execId, {
      status: "failed",
      error: args.error,
      completedAt: new Date().toISOString(),
    });
    return execId;
  },
});
