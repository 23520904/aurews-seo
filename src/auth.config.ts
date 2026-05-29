import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isAuthPage = nextUrl.pathname.startsWith("/auth");

      if (isOnDashboard) {
        if (!isLoggedIn) return false;

        // /dashboard/bulk is admin-only
        const isBulk = nextUrl.pathname.startsWith("/dashboard/bulk");
        if (isBulk) {
          return (auth?.user as { role?: string })?.role === "ADMIN";
        }

        return true;
      }

      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      if (isAdminRoute) {
        if (isLoggedIn && (auth?.user as { role?: string })?.role === "ADMIN") return true;
        return false; // Or return a 403-like redirect
      }
      
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as { role?: unknown }).role = token.role;
        (session.user as { id?: unknown }).id = token.id;
      }
      return session;
    },
  },
  providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
