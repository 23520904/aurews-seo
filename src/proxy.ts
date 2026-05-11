import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const userRole = (req.auth?.user as any)?.role;

  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }
    if (userRole !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return NextResponse.next();
});


export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
