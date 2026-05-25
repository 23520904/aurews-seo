import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',

  // Catch React + Next.js bugs at build time
  reactStrictMode: true,

  // Suppress all deprecation warnings from dependencies
  serverExternalPackages: ['@prisma/client', 'pg', '@neondatabase/serverless', 'ioredis'],


  // next/image remote domains — required or you get 400 errors
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Enable Turbopack (Next.js 16 default)
  turbopack: {},

  trailingSlash: false,


  // Disable X-Powered-By header (security)
  poweredByHeader: false,

  // Compress responses
  compress: true,
};

export default nextConfig;

