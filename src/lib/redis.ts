import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

function createRedisClient() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn("Redis credentials not set. Using in-memory fallback.");
    return null;
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export const redis = createRedisClient();

export const rateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      prefix: "acc:ratelimit",
    })
  : null;

export const aiRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      analytics: true,
      prefix: "acc:ai-ratelimit",
    })
  : null;

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 3600
): Promise<T> {
  if (!redis) return fetcher();

  const cached = await redis.get<T>(key);
  if (cached) return cached;

  const data = await fetcher();
  await redis.set(key, data, { ex: ttlSeconds });
  return data;
}

export async function invalidateCache(pattern: string): Promise<void> {
  if (!redis) return;
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}
