/**
 * Cache Cleanup Internal Function
 *
 * Removes all expired cache entries from the database.
 */

import { internalMutation } from "../../_generated/server";

/**
 * Cleanup expired cache entries
 *
 * Called by cron job every 5 minutes.
 * Deletes all cache records where expiresAt <= now.
 */
export const cleanupExpired = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Find all expired cache records
    const expired = await ctx.db
      .query("cache")
      .withIndex("by_expiration", (q) => q.lte("expiresAt", now))
      .collect();

    // Delete all expired records
    await Promise.all(
      expired.map(record => ctx.db.delete(record._id))
    );

    console.log(`[Cache Cleanup] Deleted ${expired.length} expired cache entries`);

    return { deleted: expired.length };
  },
});
