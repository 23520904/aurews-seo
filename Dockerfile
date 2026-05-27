# ── Stage 1: Cài đặt Dependencies ──
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci --legacy-peer-deps && npx prisma generate

# ── Stage 2: Xây dựng ứng dụng (Builder) ──
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_SITE_URL=https://aurews.id.vn
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

# ── Stage 3: Môi trường chạy thực tế (Production runner) ──
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# SỬA: Cài đặt libc6-compat cho Prisma và curl cho lệnh HEALTHCHECK
RUN apk add --no-cache libc6-compat curl

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy tài nguyên tĩnh công khai
COPY --from=builder --chmod=555 /app/public ./public

# Sao chép gói Standalone đã được Next.js gom gọn
COPY --from=builder --chown=nextjs:nodejs --chmod=555 /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs --chmod=555 /app/.next/static ./.next/static

# SỬA: Copy bắt buộc thư viện Prisma Client sang môi trường production để tránh lỗi kết nối DB
COPY --from=builder --chown=nextjs:nodejs --chmod=555 /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs --chmod=555 /app/node_modules/@prisma/client ./node_modules/@prisma/client

USER nextjs
EXPOSE 3000

# SỬA: Thay wget bằng curl để kiểm tra chính xác mã phản hồi HTTP 200 từ Next.js
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
