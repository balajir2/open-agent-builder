/**
 * Cache Get Operation
 *
 * Retrieves a cached value by key, automatically handling expiration.
 */

import { query } from "../../_generated/server";
import { v } from "convex/values";

/**
 * Get cached value by key
 *
 * Returns null if:
 * - Key doesn't exist
 * - Value has expired
 */
export const get = query({
  args: {
    key: v.string(),
  },
  handler: async (ctx, { key }) => {
    const now = Date.now();

    // Find cache record
    const record = await ctx.db
      .query("cache")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();

    // Not found
    if (!record) {
      return null;
    }

    // Expired
    if (record.expiresAt <= now) {
      // Return null for expired items (cleanup handled by cron)
      return null;
    }

    // Valid cache hit
    try {
      return JSON.parse(record.value);
    } catch (error) {
      console.error(`[Cache] Failed to parse cached value for key: ${key}`, error);
      return null;
    }
  },
});
