import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Protect all routes except those starting with api, _next, or specific public files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
