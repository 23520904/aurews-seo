import { NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "@/lib/tokens";
import { getRedis } from "@/lib/redis";

async function testTokens(dummyUser: { id: string; email: string; role: string }) {
  const accessToken = await generateAccessToken(dummyUser);
  const refreshToken = await generateRefreshToken(dummyUser);

  const decodedAccess = await verifyAccessToken(accessToken);
  const decodedRefresh = await verifyRefreshToken(refreshToken);

  return {
    accessToken,
    refreshToken,
    decodedAccess,
    decodedRefresh,
  };
}

async function verifyRedis(
  redis: ReturnType<typeof getRedis>,
  dummyUserId: string,
  refreshToken: string
) {
  if (!redis) {
    return { redisStatus: "BYPASSED" as const, storedToken: refreshToken };
  }

  const pong = await redis.ping();
  if (pong !== "PONG") {
    throw new Error("Redis connection failed");
  }

  const storedToken = await redis.get(`refresh_token:${dummyUserId}`);
  return { redisStatus: "CONNECTED" as const, storedToken };
}

export async function GET() {
  try {
    const redis = getRedis();
    const dummyUser = { id: "test-user-123", email: "test@aurews.id.vn", role: "OPERATOR" };

    const { accessToken, refreshToken, decodedAccess, decodedRefresh } = await testTokens(dummyUser);
    const { redisStatus, storedToken } = await verifyRedis(redis, dummyUser.id, refreshToken);

    return NextResponse.json({
      redis: redisStatus,
      tokens: {
        access: accessToken ? "GENERATED" : "FAILED",
        refresh: refreshToken ? "GENERATED" : "FAILED"
      },
      verification: {
        access: decodedAccess ? "SUCCESS" : "FAILED",
        refresh: decodedRefresh ? "SUCCESS" : "FAILED"
      },
      redis_storage: storedToken === refreshToken ? "MATCHED" : "MISMATCHED",
      payload: decodedAccess
    });
  } catch (error: unknown) {
    console.error("Token test failed:", error);
    const isError = error instanceof Error;
    const message = isError ? error.message : "Unknown error";
    const stack = isError && process.env.NODE_ENV === 'development' ? error.stack : undefined;

    return NextResponse.json({
      error: "TEST_FAILED",
      message,
      stack
    }, { status: 500 });
  }
}

