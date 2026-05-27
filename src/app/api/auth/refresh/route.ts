// Standard Node.js runtime (Cloudflare nodejs_compat)
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from "@/lib/tokens";

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json({ error: "Missing refresh token" }, { status: 400 });
    }

    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired refresh token" }, { status: 401 });
    }

    // Generate new pair (Refresh Token Rotation)
    // First, remove the old one (logic inside generateRefreshToken handles overwriting/expiry)
    const p = payload as { id: string, email: string, role?: string };
    const newAccessToken = await generateAccessToken(p);
    const newRefreshToken = await generateRefreshToken(p);

    return NextResponse.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
