import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

/**
 * Workflow Execution State Management
 */

/** Max approximate size (in bytes) for an execution document to avoid Convex 1MB limit */
const MAX_DOC_SIZE = 900_000;

/**
 * Truncate large string values recursively to fit within Convex document size limits.
 * Preserves structure but shortens strings that exceed maxLen.
 */
function truncateLargeStrings(obj: any, maxLen: number): any {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj === 'string') {
        if (obj.length > maxLen) {
            return obj.slice(0, maxLen) + `...[truncated, ${obj.length} chars total]`;
        }
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => truncateLargeStrings(item, maxLen));
    }
    if (typeof obj === 'object') {
        const result: Record<string, any> = {};
        for (const [key, value] of Object.entries(obj)) {
            result[key] = truncateLargeStrings(value, maxLen);
        }
        return result;
    }
    return obj;
}

/**
 * Progressively truncate data to fit within Convex document size limits.
 * Tries string limits: 2000 → 1000 → 500 → 200 → 100 chars.
 * Execution outputs use gentler limits than checkpoints since they're user-facing.
 */
function fitExecutionToSizeLimit(data: any): any {
    const raw = JSON.stringify(data);
    if (raw.length <= MAX_DOC_SIZE) return data;

    const levels = [2000, 1000, 500, 200, 100];
    for (const limit of levels) {
        const truncated = truncateLargeStrings(data, limit);
        if (JSON.stringify(truncated).length <= MAX_DOC_SIZE) {
            console.warn(`[Executions] Truncated output at ${limit}-char limit to fit within size limit`);
            return truncated;
        }
    }

    console.warn(`[Executions] Last-resort truncation at 50-char limit`);
    return truncateLargeStrings(data, 50);
}

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
    // Truncate large fields to fit within Convex document size limits
    if (updates.nodeResults) {
      updates.nodeResults = fitExecutionToSizeLimit(updates.nodeResults);
    }
    if (updates.output) {
      updates.output = fitExecutionToSizeLimit(updates.output);
    }
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
    // Truncate output to fit within Convex document size limits
    const safeOutput = output ? fitExecutionToSizeLimit(output) : output;
    await db.patch(id, {
      status: error ? "failed" : "completed",
      output: safeOutput,
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
