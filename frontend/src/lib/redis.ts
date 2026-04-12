import Redis from "ioredis";

const isMockMode = process.env.MOCK_DB === "true";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

function createRedisClient() {
  if (isMockMode) {
    return null;
  }
  return new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  });
}

export const redis = (globalForRedis.redis ?? createRedisClient()) as Redis | null;

if (process.env.NODE_ENV !== "production" && redis) {
  globalForRedis.redis = redis;
}

// Cache TTL constants (in seconds)
export const CACHE_TTL = {
  BLOG: 5 * 60,         // 5 minutes
  BLOG_LIST: 5 * 60,    // 5 minutes
  SERVICE: 30 * 60,     // 30 minutes
  LOCATION: 60 * 60,    // 1 hour
  SITEMAP: 60 * 60,     // 1 hour
} as const;

export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number
): Promise<T> {
  if (redis) {
    try {
      const cached = await redis.get(key);
      if (cached) {
        return JSON.parse(cached) as T;
      }
    } catch {
      // Redis unavailable, fall through to fetcher
    }
  }

  const data = await fetcher();

  if (redis) {
    try {
      await redis.setex(key, ttl, JSON.stringify(data));
    } catch {
      // Redis unavailable, continue without cache
    }
  }

  return data;
}

export async function invalidateCache(pattern: string): Promise<void> {
  if (!redis) return;
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch {
    // Redis unavailable
  }
}
