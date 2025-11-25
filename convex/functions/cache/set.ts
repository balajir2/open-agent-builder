/**
 * Cache Set Operation
 *
 * Stores a value in the cache with automatic expiration.
 */

import { mutation } from "../../_generated/server";
import { v } from "convex/values";

/**
 * Set cached value
 *
 * @param key - Unique cache key
 * @param value - Any JSON-serializable value
 * @param ttlMs - Time-to-live in milliseconds (default: 5 minutes)
 */
export const set = mutation({
  args: {
    key: v.string(),
    value: v.any(),
    ttlMs: v.optional(v.number()),
  },
  handler: async (ctx, { key, value, ttlMs = 5 * 60 * 1000 }) => {
    const now = Date.now();
    const expiresAt = now + ttlMs;

    try {
      // Serialize value
      const serialized = JSON.stringify(value);

      // Check if key already exists
      const existing = await ctx.db
        .query("cache")
        .withIndex("by_key", (q) => q.eq("key", key))
        .first();

      if (existing) {
        // Update existing record
        await ctx.db.patch(existing._id, {
          value: serialized,
          expiresAt,
        });
      } else {
        // Create new record
        await ctx.db.insert("cache", {
          key,
          value: serialized,
          expiresAt,
          createdAt: now,
        });
      }

      return { success: true, expiresAt };
    } catch (error) {
      console.error(`[Cache] Failed to cache value for key: ${key}`, error);
      throw new Error(`Failed to cache value: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  },
});
