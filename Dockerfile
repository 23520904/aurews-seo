FROM node:20-alpine

WORKDIR /app

# Cài đặt libc6-compat (Alpine cần thư viện này để chạy các chương trình biên dịch C như Prisma Client binary)
RUN apk add --no-cache libc6-compat

# Thiết lập quyền sở hữu thư mục làm việc cho user node
RUN chown -R node:node /app

# Sao chép file định nghĩa dependencies trước với quyền sở hữu của node user
COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node prisma ./prisma/

# Cài đặt toàn bộ dependencies và sinh mã Prisma Client cho môi trường container
RUN npm ci --legacy-peer-deps && npx prisma generate

# Sao chép toàn bộ mã nguồn vào trong container với quyền sở hữu của node user
COPY --chown=node:node . .

# Chuyển sang sử dụng user node (non-root) để đảm bảo an toàn vận hành
USER node

# Mở cổng 3000 của ứng dụng Next.js
EXPOSE 3000

# Next.js telemetry disable để tăng tốc độ chạy dev server
ENV NEXT_TELEMETRY_DISABLED=1

# Khởi chạy Next.js dev server hỗ trợ hot reload
CMD ["npm", "run", "dev"]
