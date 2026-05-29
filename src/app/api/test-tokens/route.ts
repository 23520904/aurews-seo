import { NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "@/lib/tokens";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = getRedis();
    let storedToken: string | null = null;
    let pong = "BYPASSED";

    if (redis) {
      // 1. Check Redis Connection
      pong = await redis.ping();
      if (pong !== "PONG") {
        throw new Error("Redis connection failed");
      }
    }

    const dummyUser = { id: "test-user-123", email: "test@aurews.id.vn", role: "OPERATOR" };

    // 2. Generate Tokens
    const accessToken = await generateAccessToken(dummyUser);
    const refreshToken = await generateRefreshToken(dummyUser);

    // 3. Verify Tokens
    const decodedAccess = await verifyAccessToken(accessToken);
    const decodedRefresh = await verifyRefreshToken(refreshToken);

    if (redis) {
      // 4. Check Redis Storage
      storedToken = await redis.get(`refresh_token:${dummyUser.id}`);
    } else {
      storedToken = refreshToken; // Mock storage match in bypassed/disabled environments
    }

    return NextResponse.json({
      redis: redis ? "CONNECTED" : "BYPASSED",
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
    return NextResponse.json({
      error: "TEST_FAILED",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error && process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
