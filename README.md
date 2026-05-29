# 📰 Aurews — Premium Tech & Editorial News Platform

[![CI Pipeline](https://github.com/23520904/aurews-seo/actions/workflows/ci.yml/badge.svg)](https://github.com/23520904/aurews-seo/actions/workflows/ci.yml)
[![Deploy to Production](https://github.com/23520904/aurews-seo/actions/workflows/deploy.yml/badge.svg)](https://github.com/23520904/aurews-seo/actions/workflows/deploy.yml)
[![Lighthouse CI — SEO Health](https://github.com/23520904/aurews-seo/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/23520904/aurews-seo/actions/workflows/lighthouse.yml)
[![codecov](https://codecov.io/gh/23520904/aurews-seo/branch/main/graph/badge.svg)](https://codecov.io/gh/23520904/aurews-seo)

**Aurews** is a next-generation tech and editorial news platform inspired by the premium **WIRED design system**. Built with **Next.js 16 (App Router)**, **TypeScript**, and **Prisma**, it represents a production-grade, highly optimized, and SEO-maximized web application tailored for lightning-fast delivery and rich reader engagement.

---

## 🌟 System Snapshot

| Area          | Current Setup                    |
| ------------- | -------------------------------- |
| **Framework**     | Next.js 16 App Router            |
| **Runtime**       | Vercel Serverless (Edge Support) |
| **Database**      | Supabase PostgreSQL              |
| **ORM**           | Prisma                           |
| **Auth**          | Auth.js / NextAuth v5            |
| **CI/CD**         | GitHub Actions + Vercel          |
| **Monitoring**    | UptimeRobot + Sentry (Optional)  |
| **Notifications** | Discord `#aurews-deploy` / `#aurews-security` channels |

---

## 🛠️ Modern Tech Stack

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Core App** | Next.js 16, TypeScript | Server-Side Rendering (SSR) & strong compile-time type safety |
| **Database & ORM** | Supabase PostgreSQL, Prisma | Relational PostgreSQL with pooled querying and strict schema policies |
| **Authentication** | Auth.js (NextAuth v5 Beta) | Secure role-based gateways and session management |
| **CI/CD Pipeline** | GitHub Actions, Vercel | Pinned workflows for automated preview and production CD deploys |
| **Testing Suite** | Playwright, Vitest | Headless E2E journeys, mocked integrations, and sitemap assertions |
| **Security Scanning** | Trivy, TruffleHog, npm audit | Codebase audits, library CVE blocks, and leaked secrets scanning |
| **Ops & Telemetry** | Codecov, Lighthouse CI, Sentry | Test coverage reports, SEO health audits, and runtime error logs |
| **Alerting** | UptimeRobot, Discord | 24/7 endpoint checks with instant notifications |

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

*   **Typography Core**: Merriweather/Playfair Serif headings paired with geometric Space Mono & Work Sans UI elements.
*   **Hard Grayscale Accents**: Thick 2px black borders, completely square corners (`border-radius: 0 !important`), and strict solid paper whites / ink black backgrounds.
*   **Micro-Animations**: Custom cubic-bezier spring transitions (`150ms` to `300ms` transitions) applied on hover states for interactive elements.

---

## 🚀 Key Feature Sets

### 📑 1. Dynamic Article Engine & JSON-LD SEO
*   Generates dynamic canonical links and Open Graph tags during server pre-rendering.
*   Auto-injects dynamic structured `NewsArticle` schemas (`type="application/ld+json"`) via Server Components for search engines.

### 💬 2. Premium Social Sharing Panel
*   **Desktop Sidebar**: Sticky floating sharing bar (Facebook, X, LinkedIn, WhatsApp, Copy Link) with hover lift states.
*   **Mobile Drawer Hook**: Connects to the native **Web Share API (`navigator.share`)** for system sharing drawer interaction.
*   **Local Host Mapping**: Remaps development addresses (`localhost:3000`) back to the production domain (`https://aurews.id.vn`) in social payload URLs.

### 🗺️ 3. GSC-Resilient News Sitemap with 48-Hour Fallback
*   News sitemaps (`news-sitemap.xml`) are strictly filtered to the last 48 hours to comply with Google Search Console policies.
*   If no recent articles are found, the sitemap automatically falls back to the **5 latest published articles**, preventing blank sitemap crawl errors.

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
*   Author writing platform at `/dashboard` with article CRUD, publication triggers, and image uploaders.
*   `/dashboard/bulk` restricted strictly to users with the **`ADMIN`** role, protected at Edge and action levels.

---

## 📂 Project Folder Structure

```
aurews/
├── prisma/                 # Database schema & migrations
├── public/                 # Static vector assets & workflow charts
├── e2e/                    # Headless Playwright E2E spec suites
└── src/
    ├── app/                # App Router layouts, pages, sitemaps
    ├── components/         # Reusable UI component modules
    └── lib/                # Database clients, tokens, and constant configs
```

---

## ⚙️ Installation & Development Guide

### Prerequisites
*   **Node.js**: `v20` LTS
*   **Database**: Supabase PostgreSQL instance

### Quick Setup

```bash
# 1. Clone and install dependencies
npm install

# 2. Setup environment keys in .env
DATABASE_URL="postgresql://postgres.[ref]:[pwd]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[pwd]@aws-0-[region].pooler.supabase.com:5432/postgres"
NEXTAUTH_SECRET="auth-session-secret-key"
NEXT_PUBLIC_SITE_URL="https://aurews.id.vn"

# 3. Generate clients and initialize database
npx prisma generate
npx prisma db push
npm run db:seed

# 4. Start local development server
npm run dev
```

---

## 🚀 DevOps Pipeline

All checks, tests, and security scans are automated via GitHub Actions to ensure 100% stable deployments.

### 🌐 Pipeline Map & Trigger Events

![Aurews DevOps Flow Chart](./public/devops_flow_chart.png)

```mermaid
flowchart TD
  DEV[Developer Push / Pull Request] --> CI[CI Pipeline]
  CI --> VALIDATE[Lint + Type Check]
  CI --> TEST[Unit / Integration Tests]
  CI --> SECURITY[Trivy + TruffleHog + npm audit]
  CI --> BUILD[Next.js Build]
  CI --> E2E[Playwright E2E]

  PR[Pull Request] --> PREVIEW[Vercel Preview Deploy]
  PREVIEW --> PREVIEW_SMOKE[Preview Smoke Test]

  MAIN[Merge / Push to main] --> MIGRATE[Prisma migrate deploy]
  MIGRATE --> PROD[Vercel Production Deploy]
  PROD --> SMOKE[Production Smoke Test]
  PROD --> SITEMAP[Sitemap Validation]

  CRON[Scheduled Jobs] --> DAILY[Daily Security Scan]
  CRON --> LH[Lighthouse / SEO Health]

  CI --> DISCORD_DEPLOY[#aurews-deploy]
  PREVIEW --> DISCORD_DEPLOY
  PROD --> DISCORD_DEPLOY
  LH --> DISCORD_DEPLOY
  DAILY --> DISCORD_SECURITY[#aurews-security]
```

### 📋 Workflows Overview

| Workflow | Trigger | Main Checks | Discord Target |
| :--- | :--- | :--- | :--- |
| `ci.yml` | Push / Pull Request to `main`, `develop` | ESLint, type-check, Vitest, Trivy scan, TruffleHog, build, Playwright E2E | `#aurews-deploy` |
| `preview.yml` | Pull Request | Vercel Preview Deploy, Playwright E2E Smoke test with bypass cookie | `#aurews-deploy` |
| `deploy.yml` | Push / Merge to `main` | Prisma migrate, Vercel Production Deploy, post-deploy smoke test, sitemap check | `#aurews-deploy` |
| `daily-security.yml` | Daily Cron (2:00 AM) | npm audit, Trivy filesystem scan, endpoint uptime, sitemap check | `#aurews-security` |
| `lighthouse.yml` | Weekly Cron / manual | Lighthouse SEO, Performance, Accessibility health checks | `#aurews-deploy` |

---

### 🛡️ Pipeline Gates

Our pipeline enforces rigorous checkpoints before allowing code integration or rollout:

| Gate | Blocks Merge/Deploy? | Purpose |
| :--- | :---: | :--- |
| **Lint + TypeScript** | Yes | Prevents syntax issues and compilation regressions |
| **Unit/Integration Tests** | Yes | Validates core business logic and API route behavior |
| **Trivy Critical Scan** | Yes | Blocks known, fixable high/critical security vulnerabilities |
| **TruffleHog** | Yes | Scan git history to completely block leaked credentials |
| **Production Build** | Yes | Confirms Next.js standalone compile passes without errors |
| **Playwright E2E** | Yes | Guarantees sitemap schemas, JSON-LD, and user journeys work |
| **Smoke Test** | Yes | Verifies that the newly deployed build is fully accessible |
| **Sitemap Check** | Yes | Safeguards XML structure to prevent Google Search Console indexing blocks |

---

### 💾 Database & Prisma Migration Policy

Supabase and Prisma access routing is separated into pooled and direct policies:

| Variable | Connection Port | Mode | Used For |
| :--- | :--- | :---: | :--- |
| `DATABASE_URL` | `6543` | Transaction | App runtime queries on Vercel via Supavisor pooler |
| `DIRECT_URL` | `5432` | Session | Direct PostgreSQL connection for Prisma migrations, seeding, and admin tasks |

> [!IMPORTANT]
> * Production migrations (**`prisma migrate deploy`**) must use **`DIRECT_URL`** (port `5432`). Do not run database schema migrations through the transaction pooler (port `6543`).
> * The database setup assumes a clean base. The migration baseline resides at `prisma/migrations/0_init`.

---

### 🛡️ Audited Gaps Resolved

We rebuilt the pipeline from a fragile, untested setup into a top-tier secure delivery flow:

*   **Test Gate Enforced**: Replaced silent, failing checks (`npm run test || true`) with strict exit-code blocks.
*   **Security Supply-Chain Pinned**: Replaced unpinned action master tags with secure, immutable release SHAs.
*   **Database Automated**: Introduced schema migrations (`prisma migrate deploy`) dynamically running before deployment.
*   **Vercel Auth Bypass Integration**: Designed automated E2E tests to bypass Vercel deployment protection seamlessly using automated bypass secrets and browser session cookies.
*   **Vitals & SEO Shield**: Integrated Lighthouse CI audits and dynamic sitemap curls to prevent index regressions on Google News.

---

### 🔄 The 10-Phase Pipeline Flow

Our delivery cycle maps through ten key phases:

| Phase | Category | Check / Step |
| :---: | :--- | :--- |
| **1** | Validate | Formatting, ESLint, TypeScript compiler checks |
| **2** | Unit Tests | SEO, GSC fallbacks, auth helpers, and utilities |
| **3** | Security Scan | Trivy filesystem, TruffleHog secret scanning, and npm audit |
| **4** | Build | Standalone bundle generation |
| **5** | E2E | Core user journey test executions via Playwright |
| **6** | Preview Deploy | Automatic Vercel preview deploys for PRs |
| **7** | Production Migration | Prisma schema updates applied on production database |
| **8** | Production Deploy | Rolling rollout to the live server CDN |
| **9** | Smoke + Sitemap | Deployed smoke checks and crawler XML validations |
| **10** | Monitoring | Continuous daily scanning, Sentry logs, and Uptime robots |

---

### ⚙️ Integrations & Manual Setup Registry

For complete system walkthroughs and step-by-step setup guides, refer to the [Manual Setup Guide](./docs/MANUAL_SETUP_GUIDE.md).

#### Required GitHub Secrets

| Secret | Purpose |
| :--- | :--- |
| `DATABASE_URL` | App runtime Supabase PostgreSQL connection via transaction pooler |
| `DIRECT_URL` | Direct connection for Prisma schema migrations |
| `NEXTAUTH_SECRET` | Base64 token to secure Auth.js author sessions |
| `VERCEL_TOKEN` | Auth token enabling Vercel deploy integration |
| `VERCEL_ORG_ID` & `VERCEL_PROJECT_ID` | Vercel account and project routing IDs |
| `DISCORD_WEBHOOK_DEPLOY` | Discord deploy channel hook (`#aurews-deploy`) |
| `DISCORD_WEBHOOK_SECURITY` | Discord security alerts channel hook (`#aurews-security`) |
| `CODECOV_TOKEN` | Repository upload token for test coverage reports |
| `LHCI_GITHUB_APP_TOKEN` | Lighthouse CI status reporting token |

#### External Services Status

| Service | Status | Purpose |
| :--- | :---: | :--- |
| **Vercel** | Active | Primary hosting and Serverless edge deployment |
| **Supabase** | Active | Relational PostgreSQL database client |
| **UptimeRobot** | Active | 24/7 uptime monitor for homepage, sitemaps, and news routes |
| **Codecov** | Active | Dynamic test line coverage dashboards |
| **SonarCloud** | Active | Code quality gating and automated PR audits |
| **Sentry** | Optional | Production runtime error logging |
| **Discord** | Active | Real-time channel status cards |

---

### 🚨 Notification Map

Our monitoring and alerting hooks dynamically direct summaries to dedicated communication endpoints:

| Source | Channel | What It Reports |
| :--- | :--- | :--- |
| **CI Pipeline** | `#aurews-deploy` | CI validation pass/fail/cancel logs |
| **Preview Deploy** | `#aurews-deploy` | PR preview deploy status and Playwright smoke results |
| **Production Deploy** | `#aurews-deploy` | Production Prisma migrations and live rollout status |
| **Lighthouse** | `#aurews-deploy` | SEO/performance health metrics |
| **Daily Security** | `#aurews-security` | npm audit, Trivy package scans, sitemap compliance |
| **UptimeRobot** | `#aurews-security` | Website down/up telemetry alerts |
| **Sentry** | Optional / Later | Production runtime edge/server error stacks |

---

### 🐳 Docker & Dev-Parity Policy

*   **Role**: Docker (`Dockerfile`, `docker-compose.yml`) is strictly restricted to local development, local integration/E2E testing, and production-parity backup deployments.
*   **Production Path**: The live production deployment path remains strictly orchestrated via **GitHub Actions ──► Vercel Serverless**.

---

### 🛠️ Instructions to Verify and Debug the Pipeline

#### How to check workflow logs
1. Navigate to the **Actions** tab of your repository on GitHub.
2. Click on the active or failed run.
3. View specific logs for each job:
   * **`security` Job**: Expand the `Print Trivy vulnerabilities table` step to view a complete, clean, human-readable console table of library CVEs to see if any dependency needs an upgrade.
   * **`e2e` Job / `Run smoke tests`**: If a smoke test fails, Playwright's HTML report and browser screenshots on failure will be uploaded to the **Artifacts** section at the bottom of the Action run page for easy visual debugging.

#### Testing the Pipeline locally
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


