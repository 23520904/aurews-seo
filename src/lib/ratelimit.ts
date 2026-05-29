import { getRedis } from "./redis";
import { headers } from "next/headers";

/**
 * Resolves the client IP address from request headers.
 * Safe for use in Server Actions and Route Handlers.
 */
export async function getClientIp(): Promise<string> {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    
    if (forwardedFor) {
      return forwardedFor.split(",")[0].trim();
    }
    if (realIp) {
      return realIp;
    }
  } catch {
    // headers() can throw if called outside a request context (e.g. static build or CLI execution)
  }
  return "127.0.0.1";
}

export interface RateLimitResult {
  success: boolean;
  count: number;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Atomic fixed-window rate limiter using Redis.
 * Works seamlessly with Upstash Redis and ioredis.
 *
 * @param key - Unique key for the rate limit subject (e.g. IP, user ID).
 * @param limit - Maximum requests allowed in the window.
 * @param windowSeconds - Window duration in seconds.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  // Fail-open immediately if rate limiting is explicitly disabled
  if (process.env.DISABLE_RATE_LIMIT === "true") {
    return { success: true, count: 0, limit, remaining: limit, reset: 0 };
  }

  const redis = getRedis();
  // Fail-open gracefully if the Redis client is null (unconfigured)
  if (!redis) {
    return { success: true, count: 0, limit, remaining: limit, reset: 0 };
  }

  const fullKey = `ratelimit:${key}`;
  try {
    const current = await redis.get(fullKey);
    const count = current ? parseInt(current, 10) : 0;

    if (count >= limit) {
      const ttl = await redis.ttl(fullKey);
      return {
        success: false,
        count,
        limit,
        remaining: 0,
        reset: ttl > 0 ? ttl : windowSeconds,
      };
    }

    const multi = redis.multi();
    multi.incr(fullKey);
    if (!current) {
      multi.expire(fullKey, windowSeconds);
    }
    const results = await multi.exec();
    
    // results[0][1] holds the output of INCR command
    const newCount = results && results[0] && results[0][1] 
      ? Number(results[0][1]) 
      : count + 1;

    const ttl = await redis.ttl(fullKey);

    return {
      success: newCount <= limit,
      count: newCount,
      limit,
      remaining: Math.max(0, limit - newCount),
      reset: ttl > 0 ? ttl : windowSeconds,
    };
  } catch (error) {
    console.error("[RateLimit Error]:", error);
    // Fail-open in case Redis connection fails
    return {
      success: true,
      count: 0,
      limit,
      remaining: limit,
      reset: 0,
    };
  }
}
