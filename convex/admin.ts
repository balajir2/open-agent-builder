import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

// Mark a stuck "running" execution as failed (e.g., Vercel timeout victims).
export const markStuckExecutionFailed = internalMutation({
  args: { executionId: v.id("executions"), reason: v.optional(v.string()) },
  handler: async (ctx, { executionId, reason }) => {
    const exec = await ctx.db.get(executionId);
    if (!exec) throw new Error("Execution not found");
    if ((exec as any).status !== "running") {
      return { skipped: true, currentStatus: (exec as any).status };
    }
    await ctx.db.patch(executionId, {
      status: "failed",
      error: reason ?? "Marked failed manually (workflow no longer running).",
      completedAt: new Date().toISOString(),
    });
    return { skipped: false };
  },
});

// Get a full execution row for diagnostics.
export const getExecutionRaw = internalQuery({
  args: { id: v.id("executions") },
  handler: async (ctx, { id }) => {
    const exec = await ctx.db.get(id);
    if (!exec) return null;
    const e = exec as any;
    return {
      _id: e._id,
      workflowId: e.workflowId,
      userId: e.userId,
      status: e.status,
      currentNodeId: e.currentNodeId,
      error: e.error,
      startedAt: e.startedAt,
      completedAt: e.completedAt,
      threadId: e.threadId,
      hasInput: e.input != null,
      inputKeys: e.input ? Object.keys(e.input) : [],
      hasOutput: e.output != null,
      outputKeys: e.output ? Object.keys(e.output) : [],
      outputPreview: e.output
        ? JSON.stringify(e.output).slice(0, 1000)
        : null,
      nodeResultsKeys: e.nodeResults ? Object.keys(e.nodeResults) : [],
      variablesKeys: e.variables ? Object.keys(e.variables) : [],
    };
  },
});

// Inspect the most recent execution for a workflow's full node-by-node status.
export const inspectLatestExecution = internalQuery({
  args: { workflowId: v.id("workflows") },
  handler: async (ctx, { workflowId }) => {
    const exec: any = await ctx.db
      .query("executions")
      .withIndex("by_workflow", (q: any) => q.eq("workflowId", workflowId))
      .order("desc")
      .first();
    if (!exec) return null;
    const summary: any = {};
    if (exec.nodeResults) {
      for (const [nodeId, v] of Object.entries(exec.nodeResults) as any[]) {
        const out = (v as any).output ?? (v as any).result ?? (v as any).data;
        const outStr =
          typeof out === "string" ? out : JSON.stringify(out ?? null);
        summary[nodeId] = {
          status: (v as any).status,
          error: (v as any).error,
          startedAt: (v as any).startedAt,
          completedAt: (v as any).completedAt,
          outputLength: outStr ? outStr.length : 0,
          outputPreview: outStr ? outStr.slice(0, 300) : null,
        };
      }
    }
    return {
      _id: exec._id,
      status: exec.status,
      currentNodeId: exec.currentNodeId,
      topLevelError: exec.error,
      startedAt: exec.startedAt,
      completedAt: exec.completedAt,
      nodes: summary,
    };
  },
});

// Inspect a workflow's node configurations — diagnostic only.
export const inspectWorkflowNodes = internalQuery({
  args: { workflowId: v.id("workflows") },
  handler: async (ctx, { workflowId }) => {
    const w = await ctx.db.get(workflowId);
    if (!w) return null;
    return {
      name: (w as any).name,
      customId: (w as any).customId,
      updatedAt: (w as any).updatedAt,
      nodes: ((w as any).nodes ?? []).map((n: any) => ({
        id: n.id,
        type: n.type,
        nodeName: n.data?.nodeName,
        model: n.data?.model,
        mcpServerIds: n.data?.mcpServerIds,
        tokenLimit: n.data?.tokenLimit,
      })),
    };
  },
});

// Recent failed/incomplete executions across ALL workflows.
export const recentFailures = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const rows = await ctx.db.query("executions").order("desc").take(limit ?? 20);
    return rows.map((r: any) => {
      const failedNodes: any = {};
      if (r.nodeResults) {
        for (const [k, v] of Object.entries(r.nodeResults) as any[]) {
          if (v && (v.error || v.status === "failed")) {
            const errStr = typeof v.error === "string" ? v.error : JSON.stringify(v.error);
            failedNodes[k] = { status: v.status, error: errStr?.slice(0, 400) };
          }
        }
      }
      return {
        _id: r._id,
        workflowId: r.workflowId,
        status: r.status,
        currentNodeId: r.currentNodeId,
        topLevelError: r.error?.slice(0, 400),
        startedAt: r.startedAt,
        completedAt: r.completedAt,
        failedNodes,
        userId: r.userId,
      };
    });
  },
});

// Recent executions for a specific workflow — diagnostic only.
export const recentExecutionsForWorkflow = internalQuery({
  args: { workflowId: v.id("workflows"), limit: v.optional(v.number()) },
  handler: async (ctx, { workflowId, limit }) => {
    const rows = await ctx.db
      .query("executions")
      .withIndex("by_workflow", (q: any) => q.eq("workflowId", workflowId))
      .order("desc")
      .take(limit ?? 5);
    return rows.map((r: any) => ({
      _id: r._id,
      status: r.status,
      currentNodeId: r.currentNodeId,
      error: r.error,
      startedAt: r.startedAt,
      completedAt: r.completedAt,
      nodeResultsKeys: Object.keys(r.nodeResults ?? {}),
      lastNodeError: r.nodeResults
        ? Object.entries(r.nodeResults).reduce((acc: any, [k, v]: any) => {
            if (v && (v.error || v.status === "failed")) {
              acc[k] = { error: v.error, status: v.status };
            }
            return acc;
          }, {})
        : {},
    }));
  },
});

// Summarize Convex file storage (user-uploaded documents).
export const countStorage = internalQuery({
  args: {},
  handler: async (ctx) => {
    const files = await ctx.db.system.query("_storage").collect();
    let totalBytes = 0;
    const byType: Record<string, { count: number; bytes: number }> = {};
    for (const f of files as any[]) {
      totalBytes += f.size ?? 0;
      const t = f.contentType ?? "unknown";
      byType[t] = byType[t] ?? { count: 0, bytes: 0 };
      byType[t].count += 1;
      byType[t].bytes += f.size ?? 0;
    }
    return { fileCount: files.length, totalBytes, totalMB: +(totalBytes / 1024 / 1024).toFixed(2), byType };
  },
});

// Count rows across every known table — for usage diagnostics.
export const countAllTables = internalQuery({
  args: {},
  handler: async (ctx) => {
    const tables = [
      "users", "workflows", "executions", "mcpServers", "arcadeAuth",
      "userMCPs", "apiKeys", "userLLMKeys", "userToolKeys",
      "uiBuilderConfigurations", "approvals", "rateLimits", "cache",
      "checkpoints", "checkpoint_writes", "mcpOAuthTokens", "mcpOAuthStates",
    ] as const;
    const counts: Record<string, number> = {};
    for (const t of tables) {
      const rows = await ctx.db.query(t as any).collect();
      counts[t] = rows.length;
    }
    return counts;
  },
});

/**
 * Admin functions for database management
 * All functions are internal-only to prevent public access.
 */

// Clear all workflows — internal only, not callable from public clients
export const clearAllWorkflows = internalMutation({
  args: {},
  handler: async ({ db }) => {
    const workflows = await db.query("workflows").collect();
    let deleted = 0;

    for (const workflow of workflows) {
      await db.delete(workflow._id);
      deleted++;
    }

    return { deleted };
  },
});

/**
 * Clean transaction / ephemeral tables. Runs ONE table per call to stay under
 * Convex's 16MB per-execution read budget (checkpoints are large).
 *
 * Usage:
 *   npx convex run admin:cleanOneTransactionTable '{"table":"checkpoints"}'
 *
 * Valid tables: executions, checkpoints, checkpoint_writes, rateLimits,
 *               arcadeAuth, mcpOAuthStates, cache, approvals.
 * approvals: only non-"pending" rows deleted.
 * cache: only expired entries deleted.
 */
export const cleanOneTransactionTable = internalMutation({
  args: { table: v.string(), batchSize: v.optional(v.number()) },
  handler: async (ctx, { table, batchSize }) => {
    const allowedTables = new Set([
      "executions",
      "checkpoints",
      "checkpoint_writes",
      "rateLimits",
      "arcadeAuth",
      "mcpOAuthStates",
      "cache",
      "approvals",
    ]);
    if (!allowedTables.has(table)) {
      throw new Error(`Refusing to clean table "${table}" — not on allowlist.`);
    }

    const BATCH = batchSize ?? 20;
    const rows = await ctx.db.query(table as any).take(BATCH);
    let deleted = 0;
    const now = Date.now();
    for (const row of rows) {
      if (table === "cache") {
        if (!(row as any).expiresAt || (row as any).expiresAt >= now) continue;
      }
      if (table === "approvals") {
        if ((row as any).status === "pending") continue;
      }
      await ctx.db.delete(row._id);
      deleted++;
    }
    return { table, deleted, scanned: rows.length, moreWork: rows.length === BATCH };
  },
});
