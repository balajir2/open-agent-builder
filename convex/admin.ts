import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

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
