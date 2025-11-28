import { mutation } from "../_generated/server";
import { v } from "convex/values";

/**
 * Distributed Rate Limiting using Convex (Insert-Only Pattern)
 *
 * This uses an "Insert-Only" pattern to avoid write conflicts.
 * Instead of updating a single document with a list of timestamps (which causes conflicts),
 * we insert a new document for every request.
 *
 * To check the limit, we count how many documents exist in the current window.
 */

export const checkRateLimit = mutation({
  args: {
    key: v.string(),        // Unique identifier (e.g., "user:123:workflow-execution")
    limit: v.number(),       // Max requests allowed
    windowMs: v.number(),    // Time window in milliseconds
  },
  handler: async (ctx, { key, limit, windowMs }) => {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Count requests in the current window
    // We use the index "by_key_timestamp" to efficiently count
    const requestCount = await ctx.db
      .query("rateLimits")
      .withIndex("by_key_timestamp", (q) =>
        q.eq("key", key).gt("timestamp", windowStart)
      )
      .collect()
      .then((results) => results.length);

    // Check if limit exceeded
    if (requestCount >= limit) {
      // Find the oldest request in the window to calculate reset time
      const oldestRequest = await ctx.db
        .query("rateLimits")
        .withIndex("by_key_timestamp", (q) =>
          q.eq("key", key).gt("timestamp", windowStart)
        )
        .first();

      const resetAt = oldestRequest ? (oldestRequest.timestamp ?? now) + windowMs : now + windowMs;

      return {
        allowed: false,
        remaining: 0,
        resetAt,
      };
    }

    // Allowed: Insert new request record
    await ctx.db.insert("rateLimits", {
      key,
      timestamp: now,
    });

    return {
      allowed: true,
      remaining: limit - requestCount - 1,
      resetAt: now + windowMs,
    };
  },
});

/**
 * Reset rate limit for a specific key
 * Deletes all records for this key
 */
export const resetRateLimit = mutation({
  args: {
    key: v.string(),
  },
  handler: async (ctx, { key }) => {
    const records = await ctx.db
      .query("rateLimits")
      .withIndex("by_key_timestamp", (q) => q.eq("key", key))
      .collect();

    for (const record of records) {
      await ctx.db.delete(record._id);
    }

    return { success: true };
  },
});

/**
 * Cleanup old rate limit records
 * Should be called via cron job
 */
export const cleanupExpiredRecords = mutation({
  handler: async (ctx) => {
    const now = Date.now();
    const cutoff = now - 24 * 60 * 60 * 1000; // Keep 24 hours of history just in case, or match max window

    // Use the timestamp index for efficient cleanup
    const expiredRecords = await ctx.db
      .query("rateLimits")
      .withIndex("by_timestamp", (q) => q.lt("timestamp", cutoff))
      .take(1000); // Process in batches to avoid timeouts

    let deletedCount = 0;
    for (const record of expiredRecords) {
      await ctx.db.delete(record._id);
      deletedCount++;
    }

    return { deletedCount, hasMore: expiredRecords.length === 1000 };
  },
});


