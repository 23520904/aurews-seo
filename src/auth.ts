import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { getClientIp, rateLimit } from "@/lib/ratelimit";

const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

if (!authSecret && process.env.NODE_ENV === "production") {
  throw new Error("Missing AUTH_SECRET or NEXTAUTH_SECRET in production environment!");
}

const secret = authSecret || "dev-only-fallback-secret-aurews-xyz-123456789";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret,
  trustHost: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Rate limit login attempts: 5-10 attempts per minute per IP (e.g. 10 attempts)
        const ip = await getClientIp();
        const limitRes = await rateLimit(`login:${ip}`, 10, 60);
        if (!limitRes.success) {
          throw new Error("Too many login attempts. Please try again later.");
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  basePath: "/api/auth",
});

