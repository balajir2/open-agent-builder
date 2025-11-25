import { cronJobs } from "convex/server";
import { internalMutation } from "../../_generated/server";
import { internal } from "../../_generated/api";

export const cleanupExpired = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const expired = await ctx.db
      .query("cache")
      .withIndex("by_expiration", (q) => q.lt("expiresAt", now))
      .collect();

    for (const record of expired) {
      await ctx.db.delete(record._id);
    }
  },
});

const crons = cronJobs();

/**
 * Cleanup expired cache entries
 * Runs every 5 minutes
 */
crons.interval(
  "cleanup-expired-cache",
  { minutes: 5 },
  internal.functions.cache.cleanup.cleanupExpired
);

export default crons;
