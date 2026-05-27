# 📰 Aurews — Premium Tech & Editorial News Platform

[![codecov](https://codecov.io/gh/23520904/aurews-seo/branch/main/graph/badge.svg)](https://codecov.io/gh/23520904/aurews-seo)

**Aurews** is a next-generation news and editorial platform inspired by the premium **WIRED design system**. Built with **Next.js 16 (App Router)**, **TypeScript**, and **Prisma**, it represents a production-grade, highly optimized, and SEO-maximized web application tailored for lightning-fast delivery and rich reader engagement.

---

## 🌟 Executive Overview

Aurews is engineered to bridge the gap between high-end editorial aesthetics and state-of-the-art web performance. Features range from dynamic structured metadata (JSON-LD schemas) to interactive social sharing modules that adapt to native mobile device drawer APIs. The backend is designed for serverless architectures (optimized for **Vercel Edge & Serverless runtimes**), integrating Supabase PostgreSQL (via Supavisor Connection Pooler) and connection-pooled Prisma querying.

---

## 🛠️ Modern Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | Next.js 16.2.6 (App Router) | High-performance Server-Side Rendering (SSR) & Incremental Static Regeneration (ISR) |
| **Language** | TypeScript (Strict Mode) | Strong compile-time contract checking & SSR crash prevention |
| **Styling** | Vanilla CSS Variable Tokens | Premium typography, HSL tailored palettes, and liquid responsive grids |
| **Database** | Supabase PostgreSQL DB | Edge-compatible persistent relational storage |
| **ORM** | Prisma Client (v7.8.0) | Type-safe schema definitions and dynamic relational queries |
| **Authentication** | Auth.js (NextAuth v5 Beta) | Secure role-based gateways and session management |
| **Performance** | Vercel Speed Insights & Analytics | Core Web Vitals monitor tracking and telemetry |

---

## ⚡ Architecture & Database Schema

Aurews relies on a clean, decoupled edge-to-database structure to handle dynamic editorial content creation, user sessions, categories, and article queries:

```mermaid
graph TD
    Client[Browser / Mobile Client]
    Router[Next.js App Router]
    Auth[Auth.js Session Gateways]
    Pages[Server/Client Components]
    APIs[REST Edge endpoints]
    Prisma[Prisma ORM Layer]
    Supabase[Supabase PostgreSQL]

    Client -->|HTTP Request| Router
    Router --> Auth
    Auth --> Pages
    Router --> APIs
    Pages --> Prisma
    APIs --> Prisma
    Prisma -->|Pooled Query| Supabase
```

### Database Entities (`schema.prisma`)

```mermaid
erDiagram
    User {
        String id PK
        String name
        String email UK
        String password
        UserRole role
        String image
        DateTime createdAt
        DateTime updatedAt
    }
    Category {
        String id PK
        String name UK
        String slug UK
        String image
        DateTime createdAt
        DateTime updatedAt
    }
    Post {
        String id PK
        String title
        String slug UK
        String body
        String excerpt
        String coverImage
        PostStatus status
        Int views
        String authorId FK
        String categoryId FK
        DateTime createdAt
        DateTime updatedAt
    }
    User ||--o{ Post : writes
    Category ||--o{ Post : categorizes
```

---

## 🎨 Design System & Aesthetics (WIRED-Inspired)

The visual design system of Aurews centers around modern typography, high contrast, and editorial discipline:

- **Typography Core**: Liquid scaling displays (using Merriweather/Playfair Serif headings) paired with rigorous, geometric sans-serif UI labels (Space Mono & Work Sans UI elements).
- **Hard Grayscale Accents**: Thick 2px black borders, completely square corners (`border-radius: 0 !important`), and strict solid paper whites / ink black backgrounds to keep the layout feeling premium and editorial.
- **Micro-Animations**: Custom cubic-bezier spring transitions (`150ms` to `300ms` transitions) applied on hover states for interactable bubbles and responsive cards.

---

## 🚀 Key Feature Sets

### 📑 1. Dynamic Article Engine & JSON-LD SEO
Dynamic article routes (`/article/[slug]`) are completely optimized for maximum crawl speed:
- Generates dynamic canonical links and Open Graph tags during server pre-rendering.
- Auto-injects dynamic structured `NewsArticle` schemas (`type="application/ld+json"`) via custom Server Component templates to allow Googlebot to parse rich snippets instantly.

### 💬 2. TikTok-Style Premium Circular Social Sharing
Designed specifically for high conversion rates and modern responsive interfaces:
- **Desktop Sidebar**: Pinned sticky sharing bar on the left margin using circular branded bubbles (Facebook, X, LinkedIn, WhatsApp, Copy Link) that float upwards with a soft shadow on hover.
- **Mobile Drawer Hook**: Connects to the native **Web Share API (`navigator.share`)** on mobile viewports. Tapping sharing bubbles triggers the native iOS/Android system share sheet, letting readers share content through *any* installed messaging or social application (Instagram, WeChat, Telegram, Snapchat) instantly.
- **Local Host Mapping**: Remaps development addresses (`localhost:3000`) back to the production domain (`https://aurews.id.vn`) in social payload URLs, keeping direct sharing panels fully functional during test environments.

### 🗺️ 3. GSC-Resilient News Sitemap with 48-Hour Fallback
Google Search Console (GSC) enforces strict rules on News Sitemaps (`news-sitemap.xml`), allowing only articles from the last 48 hours. When no content is published, empty sitemaps trigger crawl validation errors. Aurews resolves this with an automated fallback mechanism:

```mermaid
sequenceDiagram
    participant Googlebot as GSC Crawler / Googlebot
    participant Route as news-sitemap.xml Handler
    participant DB as Supabase PostgreSQL DB

    Googlebot->>Route: GET /news-sitemap.xml
    Route->>DB: Query posts published in last 48 hours
    alt Articles exist (gte 48h cutoff)
        DB-->>Route: Return articles array
        Route-->>Googlebot: Render sitemap with recent news URLs (200 OK)
    else No articles found (0 entries)
        Route->>DB: Query latest 5 published articles (fallback)
        DB-->>Route: Return 5 newest posts
        Route-->>Googlebot: Render sitemap with fallback URLs (200 OK, Prevents blank sitemap error)
    end
```

### 🔒 4. Protected Editorial & Content Creator Dashboard
- Fully featured editing console at `/dashboard` where authors can draft, update, and manage articles.
- Advanced capabilities including batch uploaders (`/dashboard/bulk`), image upload forms, publication status switches, and role-based access gates.

---

## 📂 Project Folder Structure

```
aurews/
├── analysis/               # Competitor & SEO keyword analysis audits
├── content/                # Copywriting and SEO-optimized text resources
├── docs/                   # Developer guidelines and editorial strategy manuals
├── prisma/                 # Database schema & local seeding models
│   ├── schema.prisma       # Relational models
│   └── seed.ts             # Seeding controller
├── public/                 # Static vector assets, logos, and icons
├── src/
│   ├── app/                # Next.js App Router Page components
│   │   ├── article/        # Dynamic article reader layout
│   │   ├── news-sitemap/   # GSC-safe XML news controller
│   │   ├── sitemap.ts      # Core dynamic metadata sitemap generator
│   │   └── globals.css     # Premium UI visual tokens
│   ├── components/         # Reusable UI component modules
│   │   ├── analytics/      # GA4 / telemetry click trackers
│   │   └── seo/            # ShareButtons, Schema injections, and Metadata
│   └── lib/                # Database clients, tokens, and constant configs
```

---

## ⚙️ Installation & Development Guide

### Prerequisites
- **Node.js**: `v20` LTS
- **Database**: PostgreSQL (e.g. Supabase instance)

### 1. Clone the repository and install dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"
DIRECT_URL="postgresql://user:password@hostname/dbname?sslmode=require"
NEXTAUTH_SECRET="your-super-secure-nextauth-secret-key"
NEXT_PUBLIC_SITE_URL="https://aurews.id.vn"
```

### 3. Initialize Database Schemas & Seed Core Data
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 4. Fire Up Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live interface.

---

## 🌐 Production Build & Deployment Posture

To build the project for live production (optimized for Vercel Serverless deployments):

```bash
npm run build
```

The production compiler executes standalone package bundling optimization, runs the TypeScript strict type validators, optimizes dynamic images, and pre-renders static pages under a resilient Incremental Static Regeneration (ISR) cache structure, fully integrated out of the box with **Vercel's global CDN network**.
