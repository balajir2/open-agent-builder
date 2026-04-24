import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

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
