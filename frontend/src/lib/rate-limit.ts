// Simple in-memory rate limiter for API routes
// In production with multiple instances, use Redis-backed rate limiting

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key);
  }
}, 60_000);

interface RateLimitConfig {
  /** Max requests per window */
  limit: number;
  /** Window size in seconds */
  window: number;
}

export const RATE_LIMITS = {
  LOGIN: { limit: 5, window: 60 * 15 } as RateLimitConfig,      // 5 per 15 min
  API_WRITE: { limit: 30, window: 60 } as RateLimitConfig,       // 30 per minute
  API_READ: { limit: 100, window: 60 } as RateLimitConfig,       // 100 per minute
} as const;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + config.window * 1000 });
    return { allowed: true, remaining: config.limit - 1, resetAt: now + config.window * 1000 };
  }

  entry.count++;
  if (entry.count > config.limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  return { allowed: true, remaining: config.limit - entry.count, resetAt: entry.resetAt };
}

export function getRateLimitKey(ip: string, prefix: string): string {
  return `${prefix}:${ip}`;
}
