FROM node:20-alpine

WORKDIR /app

# Cài đặt libc6-compat (Alpine cần thư viện này để chạy các chương trình biên dịch C như Prisma Client binary)
RUN apk add --no-cache libc6-compat

# Sao chép các tệp cấu hình dependencies và prisma (mặc định root-owned, read-only đối với user node)
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Cài đặt toàn bộ dependencies và sinh mã Prisma Client bằng quyền root
RUN npm ci --legacy-peer-deps && npx prisma generate

# Sao chép toàn bộ mã nguồn vào trong container bằng quyền root
# Bảo đảm các file ứng dụng là read-only đối với runtime user node (SonarCloud S6504 compliant)
# Lưu ý: Toàn bộ build context được kiểm soát chặt chẽ thông qua tệp .dockerignore để tránh lọt file nhạy cảm
COPY . .

# Tạo thư mục build cache .next và cấp quyền ghi cụ thể cho user node để Next.js chạy dev server
RUN mkdir -p /app/.next && chown -R node:node /app/.next

# Chuyển sang sử dụng user node (non-root) để đảm bảo an toàn vận hành
USER node

# Mở cổng 3000 của ứng dụng Next.js
EXPOSE 3000

# Next.js telemetry disable để tăng tốc độ chạy dev server
ENV NEXT_TELEMETRY_DISABLED=1

# Khởi chạy Next.js dev server hỗ trợ hot reload
CMD ["npm", "run", "dev"]
