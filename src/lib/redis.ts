import Redis from "ioredis";

let redisClient: Redis | null = null;

/**
 * Returns the active Redis client instance, or null if Redis is disabled or unconfigured.
 * Prevents initialization errors during static builds or in CI test environments.
 */
export function getRedis(): Redis | null {
  if (process.env.DISABLE_RATE_LIMIT === "true") {
    return null;
  }

  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!redisClient) {
    try {
      // Lazy connection prevents immediate connection attempts upon import
      redisClient = new Redis(process.env.REDIS_URL, {
        lazyConnect: true,
      });

      // Suppress unhandled error events to avoid crashing the node process in CI or production
      redisClient.on("error", (error) => {
        console.error("[Redis error event]:", error.message || error);
      });
    } catch (error) {
      console.error("[Redis Initialization Failed]:", error);
      redisClient = null;
    }
  }

  return redisClient;
}
