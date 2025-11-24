/**
 * Distributed Cache Client using Convex
 *
 * Provides a simple caching interface that works across all serverless instances.
 *
 * Usage:
 *   import { cacheGet, cacheSet } from '@/src/lib/api/distributed-cache';
 *
 *   // Set cache with 10-minute TTL
 *   await cacheSet('user:123:profile', userData, 10 * 60 * 1000);
 *
 *   // Get cached value
 *   const cached = await cacheGet('user:123:profile');
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

/**
 * Get cached value by key
 *
 * @param key - Unique cache key
 * @returns Cached value or null if not found/expired
 */
export async function cacheGet<T = any>(key: string): Promise<T | null> {
  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    const result = await convex.query(api.functions.cache.get.get, {
      key,
    });

    return result as T | null;
  } catch (error) {
    console.error("[Cache] Error getting cached value:", error);
    return null; // Fail open - cache misses are okay
  }
}

/**
 * Set cached value with TTL
 *
 * @param key - Unique cache key
 * @param value - Any JSON-serializable value
 * @param ttlMs - Time-to-live in milliseconds (default: 5 minutes)
 */
export async function cacheSet(
  key: string,
  value: any,
  ttlMs: number = 5 * 60 * 1000
): Promise<boolean> {
  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    await convex.mutation(api.functions.cache.set.set, {
      key,
      value,
      ttlMs,
    });

    return true;
  } catch (error) {
    console.error("[Cache] Error setting cached value:", error);
    return false;
  }
}

/**
 * Delete cached value by key
 *
 * @param key - Cache key to delete
 * @returns true if deleted, false if not found
 */
export async function cacheDelete(key: string): Promise<boolean> {
  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    const result = await convex.mutation(api.functions.cache.delete.deleteKey, {
      key,
    });

    return result;
  } catch (error) {
    console.error("[Cache] Error deleting cached value:", error);
    return false;
  }
}

/**
 * Delete multiple cache keys matching a pattern
 *
 * @param pattern - Regex pattern to match keys (e.g., "user:123:.*")
 * @returns Number of keys deleted
 */
export async function cacheDeletePattern(pattern: string): Promise<number> {
  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    const result = await convex.mutation(api.functions.cache.delete.deletePattern, {
      pattern,
    });

    return result;
  } catch (error) {
    console.error("[Cache] Error deleting cached pattern:", error);
    return 0;
  }
}

/**
 * Get or set cached value (fetch-once pattern)
 *
 * If the key exists in cache, returns cached value.
 * Otherwise, executes fetcher function, caches result, and returns it.
 *
 * @param key - Unique cache key
 * @param fetcher - Function to fetch fresh data
 * @param ttlMs - Cache TTL in milliseconds (default: 5 minutes)
 */
export async function cacheGetOrSet<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = 5 * 60 * 1000
): Promise<T> {
  // Try to get from cache
  const cached = await cacheGet<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Cache miss - fetch fresh data
  const fresh = await fetcher();

  // Cache the result (fire and forget - don't wait)
  cacheSet(key, fresh, ttlMs).catch(error => {
    console.error("[Cache] Background cache set failed:", error);
  });

  return fresh;
}

/**
 * Common cache TTL constants
 */
export const CACHE_TTL = {
  ONE_MINUTE: 60 * 1000,
  FIVE_MINUTES: 5 * 60 * 1000,
  TEN_MINUTES: 10 * 60 * 1000,
  THIRTY_MINUTES: 30 * 60 * 1000,
  ONE_HOUR: 60 * 60 * 1000,
  ONE_DAY: 24 * 60 * 60 * 1000,
} as const;
