/**
 * Cache Delete Operation
 *
 * Removes a cached value by key.
 */

import { mutation } from "../../_generated/server";
import { v } from "convex/values";

/**
 * Delete cached value by key
 *
 * @param key - Cache key to delete
 * @returns true if deleted, false if not found
 */
export const deleteKey = mutation({
  args: {
    key: v.string(),
  },
  handler: async (ctx, { key }) => {
    const record = await ctx.db
      .query("cache")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();

    if (!record) {
      return false;
    }

    await ctx.db.delete(record._id);
    return true;
  },
});

/**
 * Delete multiple cache keys matching a pattern
 *
 * @param pattern - Regex pattern to match keys (e.g., "user:123:*")
 * @returns Number of keys deleted
 */
export const deletePattern = mutation({
  args: {
    pattern: v.string(),
  },
  handler: async (ctx, { pattern }) => {
    try {
      const regex = new RegExp(pattern);

      // Find all matching cache records
      const records = await ctx.db.query("cache").collect();
      const matching = records.filter(record => regex.test(record.key));

      // Delete all matching records
      await Promise.all(
        matching.map(record => ctx.db.delete(record._id))
      );

      return matching.length;
    } catch (error) {
      console.error(`[Cache] Failed to delete pattern: ${pattern}`, error);
      throw new Error(`Invalid regex pattern: ${pattern}`);
    }
  },
});
