import { SignJWT, jwtVerify } from "jose";
import { redis } from "./redis";

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "access-secret-fallback"
);
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(
  (process.env.NEXTAUTH_SECRET || "refresh-secret-fallback") + "-refresh"
);

export async function generateAccessToken(payload: { id: string, email: string, role?: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(ACCESS_TOKEN_SECRET);
}

export async function generateRefreshToken(payload: { id: string, email: string, role?: string }) {
  const refreshToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(REFRESH_TOKEN_SECRET);

  // Store refresh token in Redis with expiration (7 days in seconds)
  await redis.set(`refresh_token:${payload.id}`, refreshToken, "EX", 7 * 24 * 60 * 60);

  return refreshToken;
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, ACCESS_TOKEN_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, REFRESH_TOKEN_SECRET);
    
    // Check if token exists in Redis
    const storedToken = await redis.get(`refresh_token:${payload.id}`);
    if (storedToken !== token) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function revokeRefreshToken(userId: string) {
  await redis.del(`refresh_token:${userId}`);
}
