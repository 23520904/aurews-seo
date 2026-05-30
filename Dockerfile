FROM node:20-alpine

WORKDIR /app

# Cài đặt libc6-compat (Alpine cần thư viện này để chạy các chương trình biên dịch C như Prisma Client binary)
RUN apk add --no-cache libc6-compat

# Sao chép file định nghĩa dependencies trước để tối ưu hóa Docker layer cache
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Cài đặt toàn bộ dependencies bao gồm cả devDependencies phục vụ phát triển local
RUN npm ci --legacy-peer-deps

# Tự sinh mã Prisma Client cho môi trường container
RUN npx prisma generate

# Sao chép toàn bộ mã nguồn vào trong container
COPY . .

# Mở cổng 3000 của ứng dụng Next.js
EXPOSE 3000

# Next.js telemetry disable để tăng tốc độ chạy dev server
ENV NEXT_TELEMETRY_DISABLED=1

# Khởi chạy Next.js dev server hỗ trợ hot reload
CMD ["npm", "run", "dev"]
