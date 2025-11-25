import { mutation } from "../_generated/server";
import { v } from "convex/values";

/**
 * Distributed Rate Limiting using Convex
 *
 * This replaces the in-memory Map-based rate limiting that doesn't work
 * across multiple Vercel serverless instances.
 *
 * Sliding window algorithm:
 * - Stores array of request timestamps
 * - Filters out expired requests
 * - Allows request if under limit
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

    // Find existing rate limit record
    let record = await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();

    // First request for this key
    if (!record) {
      await ctx.db.insert("rateLimits", {
        key,
        requests: [now],
        resetAt: now + windowMs,
        createdAt: now,
        updatedAt: now,
      });

      return {
        allowed: true,
        remaining: limit - 1,
        resetAt: now + windowMs,
      };
    }

    // Filter out requests outside the current window
    const validRequests = record.requests.filter((timestamp) => timestamp > windowStart);

    // Check if limit exceeded
    if (validRequests.length >= limit) {
      const oldestRequest = Math.min(...validRequests);
      return {
        allowed: false,
        remaining: 0,
        resetAt: oldestRequest + windowMs,
      };
    }

    // Add current request to the array
    validRequests.push(now);

    // Update record with new requests array
    await ctx.db.patch(record._id, {
      requests: validRequests,
      resetAt: now + windowMs,
      updatedAt: now,
    });

    return {
      allowed: true,
      remaining: limit - validRequests.length,
      resetAt: now + windowMs,
    };
  },
});

/**
 * Reset rate limit for a specific key
 * Useful for testing or manual admin resets
 */
export const resetRateLimit = mutation({
  args: {
    key: v.string(),
  },
  handler: async (ctx, { key }) => {
    const record = await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();

    if (record) {
      await ctx.db.delete(record._id);
      return { success: true };
    }

    return { success: false, message: "Key not found" };
  },
});

/**
 * Cleanup old rate limit records
 * Should be called via cron job
 */
export const cleanupExpiredRecords = mutation({
  handler: async (ctx) => {
    const now = Date.now();
    const cutoff = now - 60 * 60 * 1000; // 1 hour ago

    const expiredRecords = await ctx.db
      .query("rateLimits")
      .withIndex("by_resetAt", (q) => q.lt("resetAt", cutoff))
      .collect();

    let deletedCount = 0;
    for (const record of expiredRecords) {
      await ctx.db.delete(record._id);
      deletedCount++;
    }

    return { deletedCount };
  },
});
