/**
 * Distributed Rate Limiter using Convex
 *
 * Replaces the in-memory Map-based rate limiting that doesn't scale
 * across multiple serverless instances.
 *
 * Usage:
 *   import { checkRateLimit, RATE_LIMITS } from '@/src/lib/api/distributed-rate-limiter';
 *
 *   const rateLimitResponse = await checkRateLimit(
 *     `user:${userId}:workflow-execution`,
 *     RATE_LIMITS.WORKFLOW_EXECUTION
 *   );
 *
 *   if (rateLimitResponse) return rateLimitResponse;
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

/**
 * Rate limit configurations
 */
export const RATE_LIMITS = {
  WORKFLOW_EXECUTION: {
    windowMs: 60 * 1000,      // 1 minute
    maxRequests: 100,          // Increased for dev
  },
  API_GENERAL: {
    windowMs: 60 * 1000,      // 1 minute
    maxRequests: 600,          // Increased for dev
  },
  API_HEAVY: {
    windowMs: 60 * 1000,      // 1 minute
    maxRequests: 100,          // Increased for dev
  },
} as const;

export type RateLimitConfig = {
  windowMs: number;
  maxRequests: number;
};

/**
 * Check rate limit using Convex distributed storage
 *
 * @param identifier - Unique identifier for the rate limit (e.g., "user:123:workflow-execution")
 * @param config - Rate limit configuration
 * @returns Response object if rate limited, null if allowed
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<Response | null> {
  try {
    // Initialize Convex client
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    // Check rate limit via Convex mutation
    const result = await convex.mutation(api.functions.rateLimits.check.checkRateLimit, {
      key: identifier,
      limit: config.maxRequests,
      windowMs: config.windowMs,
    });

    // If not allowed, return 429 response
    if (!result.allowed) {
      const retryAfterSeconds = Math.ceil((result.resetAt! - Date.now()) / 1000);

      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          message: `Too many requests. Please try again in ${retryAfterSeconds} seconds.`,
          retryAfter: retryAfterSeconds,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(retryAfterSeconds),
            "X-RateLimit-Limit": String(config.maxRequests),
            "X-RateLimit-Remaining": String(result.remaining),
            "X-RateLimit-Reset": new Date(result.resetAt!).toISOString(),
          },
        }
      );
    }

    // Allowed - return null to continue
    return null;
  } catch (error) {
    console.error("[Rate Limiter] Error checking rate limit:", error);

    // On error, allow the request (fail open)
    // This prevents rate limiter failures from blocking all requests
    return null;
  }
}

/**
 * Generate rate limit identifier for a user
 *
 * @param userId - User ID
 * @param action - Action being rate limited (e.g., "workflow-execution", "api-call")
 * @returns Rate limit key
 */
export function getRateLimitKey(userId: string, action: string): string {
  return `user:${userId}:${action}`;
}

/**
 * Generate rate limit identifier from request
 *
 * @param request - HTTP request
 * @param userId - Optional user ID
 * @returns Rate limit key
 */
export function getRateLimitIdentifier(request: Request, userId?: string): string {
  if (userId) {
    return `user:${userId}`;
  }

  // Fallback to IP-based rate limiting
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  return `ip:${ip}`;
}

/**
 * Reset rate limit for a user (admin function)
 *
 * @param identifier - Rate limit identifier
 */
export async function resetRateLimit(identifier: string): Promise<void> {
  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    await convex.mutation(api.functions.rateLimits.check.resetRateLimit, {
      key: identifier,
    });
  } catch (error) {
    console.error("[Rate Limiter] Error resetting rate limit:", error);
    throw error;
  }
}
