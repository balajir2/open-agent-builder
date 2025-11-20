/**
 * In-Memory Rate Limiter
 *
 * Simple rate limiting implementation for API routes
 * For production with multiple servers, use Redis-backed rate limiting (Upstash, ioredis, etc.)
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

// In-memory store (replace with Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  const entries = Array.from(rateLimitStore.entries());
  for (const [key, entry] of entries) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // Workflow execution - most resource-intensive
  WORKFLOW_EXECUTION: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 executions per minute per user
  },

  // Workflow CRUD operations
  WORKFLOW_CRUD: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 operations per minute
  },

  // API key generation
  API_KEY_GENERATION: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5, // 5 keys per hour
  },

  // General API calls
  GENERAL: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute
  },

  // Strict limit for unauthenticated requests
  UNAUTHENTICATED: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 requests per minute
  },
} as const;

/**
 * Check if a request should be rate limited
 *
 * @param identifier - Unique identifier (userId, IP address, API key)
 * @param config - Rate limit configuration
 * @returns Object with allowed status and remaining requests
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  resetTimeSeconds: number;
} {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  // Get or create entry
  let entry = rateLimitStore.get(key);

  if (!entry || entry.resetTime < now) {
    // Create new window
    entry = {
      count: 0,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);
  }

  // Increment request count
  entry.count++;

  const allowed = entry.count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - entry.count);

  return {
    allowed,
    remaining,
    resetTime: entry.resetTime,
    resetTimeSeconds: Math.ceil((entry.resetTime - now) / 1000),
  };
}

/**
 * Rate limiter middleware for Next.js API routes
 *
 * @param identifier - Unique identifier (userId, IP, etc.)
 * @param config - Rate limit configuration
 * @returns Response if rate limited, null if allowed
 */
export function rateLimitMiddleware(
  identifier: string,
  config: RateLimitConfig
): Response | null {
  const result = checkRateLimit(identifier, config);

  if (!result.allowed) {
    return new Response(
      JSON.stringify({
        error: 'Rate limit exceeded',
        message: `Too many requests. Please try again in ${result.resetTimeSeconds} seconds.`,
        retryAfter: result.resetTimeSeconds,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': String(config.maxRequests),
          'X-RateLimit-Remaining': String(result.remaining),
          'X-RateLimit-Reset': String(Math.floor(result.resetTime / 1000)),
          'Retry-After': String(result.resetTimeSeconds),
        },
      }
    );
  }

  return null; // Allowed to proceed
}

/**
 * Get identifier for rate limiting
 * Priority: userId > API key > IP address
 */
export function getRateLimitIdentifier(request: Request, userId?: string): string {
  // Prefer userId if available
  if (userId) {
    return `user:${userId}`;
  }

  // Fall back to IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  return `ip:${ip}`;
}

/**
 * Rate limit based on multiple identifiers (e.g., user + IP)
 * All must pass for request to be allowed
 */
export function checkMultipleRateLimits(
  identifiers: string[],
  config: RateLimitConfig
): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  resetTimeSeconds: number;
  failedIdentifier?: string;
} {
  for (const identifier of identifiers) {
    const result = checkRateLimit(identifier, config);

    if (!result.allowed) {
      return {
        ...result,
        failedIdentifier: identifier,
      };
    }
  }

  // All passed - return the most restrictive remaining count
  const results = identifiers.map(id => checkRateLimit(id, config));
  const minRemaining = Math.min(...results.map(r => r.remaining));
  const maxResetTime = Math.max(...results.map(r => r.resetTime));

  return {
    allowed: true,
    remaining: minRemaining,
    resetTime: maxResetTime,
    resetTimeSeconds: Math.ceil((maxResetTime - Date.now()) / 1000),
  };
}

/**
 * Reset rate limit for an identifier (admin/debugging)
 */
export function resetRateLimit(identifier: string): void {
  const key = `ratelimit:${identifier}`;
  rateLimitStore.delete(key);
}

/**
 * Get current rate limit status without incrementing
 */
export function getRateLimitStatus(
  identifier: string,
  config: RateLimitConfig
): {
  remaining: number;
  resetTime: number;
  resetTimeSeconds: number;
} {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetTime < now) {
    return {
      remaining: config.maxRequests,
      resetTime: now + config.windowMs,
      resetTimeSeconds: Math.ceil(config.windowMs / 1000),
    };
  }

  return {
    remaining: Math.max(0, config.maxRequests - entry.count),
    resetTime: entry.resetTime,
    resetTimeSeconds: Math.ceil((entry.resetTime - now) / 1000),
  };
}
