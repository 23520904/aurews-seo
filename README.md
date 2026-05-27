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

The production compiler executes standalone package bundling optimization, runs the TypeScript strict type validators, optimizes dynamic images, and pre-renders static pages under a resilient Incremental Static Regeneration (ISR) cache structure, fully integrated out of the box with **Vercel's global CDN network**.

---

## 🚀 DevOps & CI/CD Pipeline Architecture

Aurews features a production-grade, highly automated DevOps ecosystem designed for continuous validation, security scanning, and seamless deployments. All checks are fully coordinated via GitHub Actions.

### 🌐 Pipeline Map & Trigger Events

![Aurews DevOps Flow Chart](./public/devops_flow_chart.png)

```mermaid
graph TD
    PR[Pull Request to main/develop] -->|Triggers| CI[1. CI Pipeline]
    PR -->|Triggers| Preview[2. Preview Pipeline]
    Merge[Push/Merge to main] -->|Triggers| Deploy[3. Production Deploy]
    Cron[Daily Scheduler] -->|Triggers| Security[4. Daily Security & Uptime]
    Weekly[Weekly Scheduler] -->|Triggers| LH[5. Lighthouse Audits]
```

---

### 1. CI Pipeline (`ci.yml`)
* **Trigger**: Every Pull Request and push to `main` or `develop`.
* **Jobs Executed**:
  1. **Validate**: Runs strict lint checks (`npm run lint`) and TypeScript type-checking (`tsc --noEmit`).
  2. **Test**: Runs the entire Vitest test suite (`npm run test:coverage`) compiling 37/37 unit/integration tests with SQLite. Uploads coverage data directly to Codecov.
  3. **Security**:
     * Runs a file system security audit with **Trufflehog** to block any accidental secrets or hardcoded credentials.
     * Runs a multi-stage **Trivy** scan (`aquasecurity/trivy-action@v0.35.0`) to catch high/critical library CVEs.
     * Runs a dependency vulnerability check with `npm audit`.
  4. **Build**: Builds a production Next.js standalone artifact to guarantee compile success before E2E testing.
  5. **E2E**: Downloads the Next.js build artifact and runs the complete 10/10 file Playwright test suite (`npx playwright test`) inside the isolated virtual runner.

---

### 2. PR Preview Deployment (`preview.yml`)
* **Trigger**: Every Pull Request targeted at `main` or `develop`.
* **Flow & Features**:
  1. **Vercel Deploy**: Leverages `@amondnet/vercel-action` to build and deploy a unique preview instance on Vercel.
  2. **PR Comment Upsert**: A Github-script comments the preview URL on the PR page. It dynamically updates the card status (e.g. `⏳ Smoke tests running...` ➡️ `✅ Smoke tests passed!`) on subsequent runs to prevent comment spam.
  3. **Automated Bypass E2E**: Playwright smoke tests are executed directly against the live Vercel Preview URL.
     * **Bypass Secret**: Uses Vercel's **Protection Bypass for Automation** by sending custom headers `x-vercel-protection-bypass` and `x-vercel-set-bypass-cookie: true` mapped to GitHub Secrets. This seamlessly bypasses Vercel's authentication shield for testing without exposing credentials.
     * **No Database Hangs**: Conditionally disables Playwright's local `webServer` block when `PLAYWRIGHT_BASE_URL` is detected, avoiding DB connection errors.

---

### 3. Production Deployment (`deploy.yml`)
* **Trigger**: Push or merge directly to the `main` branch.
* **Flow & Features**:
  1. **Prisma Migrations**: Automatically runs `npx prisma migrate deploy` using production Supabase credentials before deployment to ensure schema sync.
  2. **Vercel Production Deploy**: Builds and rolls out the changes live to `https://aurews.id.vn`.
  3. **Production Smoke Tests**: Runs Playwright tests against the live production environment using bypass headers to verify site routing, login pages, and XML structure.
  4. **SEO & Sitemap Validation**: Programmatically calls curl and checks XML structure for Google Search Console compliance (ensuring both `sitemap.xml` and `news-sitemap.xml` contain valid URLs).
  5. **Discord Notifications**: Pushes a rich deployment summary card detailing status (Success/Failure) and commit messages to your Discord channel.

---

### 4. Daily Security & Uptime Scheduler (`daily-security.yml`)
* **Trigger**: Runs automatically once a day at midnight.
* **Flow & Features**:
  1. Runs updated file system security checks using Trufflehog and Trivy.
  2. **Uptime check**: Sends requests to verify live endpoints (Homepage, `/sitemap.xml`, and `/news-sitemap.xml`).
  3. Formats and sends a consolidated daily status report directly to the Discord `#security` webhook.

---

### 5. Lighthouse Audits (`lighthouse.yml`)
* **Trigger**: Weekly cron + pushes to `main`.
* **Flow & Features**: Collects page metrics and strictly enforces high performance standards (SEO $\ge$ 0.95, Perf $\ge$ 0.80, Accessibility $\ge$ 0.85).

---

## 🛠️ Instructions to Verify and Debug the Pipeline

### How to trigger pipelines manually
1. **Trigger CI & PR Preview**: Create a feature branch, commit changes, and open a Pull Request to `main` or `develop`.
2. **Trigger Production Deploy**: Merge the approved PR directly into the `main` branch.
3. **Trigger Security / Audits**: You can navigate to **GitHub ➡️ Actions**, select the specific workflow (e.g. `Daily Security & Audit` or `CI Pipeline`), and click **Run workflow**.

### How to check workflow logs
1. Navigate to the **Actions** tab of your repository on GitHub.
2. Click on the active or failed run.
3. View specific logs for each job:
   * **`security` Job**: Expand the `Print Trivy vulnerabilities table` step to view a complete, clean, human-readable console table of library CVEs to see if any dependency needs an upgrade.
   * **`e2e` Job / `Run smoke tests`**: If a smoke test fails, Playwright's HTML report and browser screenshots on failure will be uploaded to the **Artifacts** section at the bottom of the Action run page for easy visual debugging.

### Testing the Pipeline locally
You can validate the codebase rules locally before committing to guarantee your pipeline runs green:
```bash
# 1. Run type-checker
npm run type-check

# 2. Run linter
npm run lint

# 3. Run all unit and integration tests (passing 37/37)
npm run test

# 4. Run local Playwright E2E tests
npx playwright test
```
