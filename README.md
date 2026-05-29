<div align="center">

# 📰 Aurews

### Premium Tech & Editorial News Platform

**Next.js 16 · TypeScript · Prisma · Supabase PostgreSQL · Vercel · GitHub Actions · Playwright · Discord Ops**

[Live Site](https://aurews.id.vn) · [CI Pipeline](https://github.com/23520904/aurews-seo/actions/workflows/ci.yml) · [Production Deploy](https://github.com/23520904/aurews-seo/actions/workflows/deploy.yml) · [Coverage Reports](https://codecov.io/gh/23520904/aurews-seo)

[![CI Pipeline](https://github.com/23520904/aurews-seo/actions/workflows/ci.yml/badge.svg)](https://github.com/23520904/aurews-seo/actions/workflows/ci.yml)
[![Deploy to Production](https://github.com/23520904/aurews-seo/actions/workflows/deploy.yml/badge.svg)](https://github.com/23520904/aurews-seo/actions/workflows/deploy.yml)
[![Lighthouse CI — SEO Health](https://github.com/23520904/aurews-seo/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/23520904/aurews-seo/actions/workflows/lighthouse.yml)
[![codecov](https://codecov.io/gh/23520904/aurews-seo/branch/main/graph/badge.svg)](https://codecov.io/gh/23520904/aurews-seo)

</div>

---

**Aurews** is a next-generation tech and editorial news platform inspired by the premium **WIRED design system**. Built with **Next.js 16 (App Router)**, **TypeScript**, and **Prisma**, it represents a production-grade, highly optimized, and SEO-maximized web application tailored for lightning-fast delivery and rich reader engagement.

---

## ⚡ Current Production Stack

*   🚀 **Runtime**: Vercel Serverless
*   🧠 **Framework**: Next.js 16 App Router
*   🗄️ **Database**: Supabase PostgreSQL
*   🔐 **Auth**: Auth.js / NextAuth v5
*   🧪 **Testing**: Vitest + Playwright
*   🛡️ **Security**: Trivy + TruffleHog + npm audit
*   📣 **Alerts**: Discord `#aurews-deploy` / `#aurews-security` channels

---

## 🧰 Tech Stack & Tools

*   **App Core**: Next.js, TypeScript, Auth.js (v5 Beta)
*   **Data & ORM**: Prisma ORM, Supabase PostgreSQL
*   **Testing Suite**: Vitest, Playwright, React Testing Library, MSW
*   **Ops & CI/CD**: GitHub Actions, Vercel CLI, UptimeRobot, Discord Webhooks
*   **Security & Audit**: Trivy, TruffleHog, npm audit, SonarCloud, Codecov, Lighthouse CI

---

## ✨ Product Highlights

### 📑 SEO-First Article Engine
Dynamic canonical links, custom Open Graph metadata, and automated **NewsArticle JSON-LD structured schema** pre-rendering.

### 🗺️ Google News-Safe Sitemap
GSC-compliant news sitemaps (`news-sitemap.xml`) strictly filtered to the last 48 hours, automatically falling back to the **5 latest published articles** to prevent crawl errors during publication droughts.

### 💬 Circular Branded Share Panel
Sticky floating sharing bar (Facebook, X, LinkedIn, WhatsApp, Copy Link) on desktop, transitioning to the native **Web Share API (`navigator.share`)** on mobile viewports. Automatically remaps dynamic local references to `https://aurews.id.vn`.

### 🔒 Role-Based Access Control
Authenticated author CRUD control panels at `/dashboard` with multi-tier route middleware and Server Action security restricting `/dashboard/bulk` actions strictly to **`ADMIN`** accounts.

---

## ⚙️ Installation & Development Guide

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

## 🚀 DevOps Pipeline at a Glance

```mermaid
flowchart LR
  A[Push / Pull Request] --> B[CI Pipeline]
  B --> C[Lint + Type Check]
  B --> D[Unit / Integration Tests]
  B --> E[Security Scan]
  B --> F[Build]
  B --> G[Playwright E2E]

  PR[Pull Request] --> PV[Vercel Preview]
  PV --> PS[Preview Smoke Test]

  MAIN[Push to main] --> M[Prisma Migration]
  M --> PROD[Vercel Production]
  PROD --> SMOKE[Smoke Test]
  PROD --> SEO[Sitemap Check]

  CRON[Schedule] --> SEC[Daily Security]
  CRON --> LH[Lighthouse]

  B --> DD[Discord Deploy]
  PV --> DD
  PROD --> DD
  LH --> DD
  SEC --> DS[Discord Security]
```

*Every critical path either blocks merge/deploy or reports status to Discord.*

---

## 📋 Workflows & Checklists

### 🧪 CI Pipeline (`ci.yml`)
Triggered on push and pull requests to `main` and `develop`.
- [x] **Lint**: Executes ESLint syntax and rule checking.
- [x] **Type-Check**: Strict compilation validation (`tsc --noEmit`).
- [x] **Unit & Integration Tests**: 37/37 tests passing green via Vitest.
- [x] **Security**: Trivy filesystem scans (blocks critical fixable), TruffleHog git secrets auditing, and `npm audit`.
- [x] **Production Standalone Build**: Validates compilation success.
- [x] **E2E tests**: Headless Playwright suite verifying key pathways.
- [x] **Discord Alerts**: Reports workflow pass/fail to `#aurews-deploy`.

### 🌐 Preview Pipeline (`preview.yml`)
Triggered on pull requests to `main` and `develop`.
- [x] **Vercel Preview Deploy**: Automatically spins up a temporary preview deployment.
- [x] **Security Bypass**: Sets bypass headers & browser session cookies to bypass Vercel's auth shield.
- [x] **Smoke Tests**: Validates live preview routing using Playwright.
- [x] **Discord Alerts**: Reports deployment status to `#aurews-deploy`.

### 🚢 Production Deploy (`deploy.yml`)
Triggered on push/merge to `main`.
*Production Path:* **GitHub Actions ──► Prisma migrate deploy ──► Vercel Production**
- [x] **Prisma Migration**: Automatically runs `prisma migrate deploy` through a direct PostgreSQL connection (`port: 5432`).
- [x] **Vercel Production Deploy**: Direct CDN rollout to `https://aurews.id.vn`.
- [x] **Smoke Tests**: Verifies site availability post-deploy.
- [x] **SEO Validation**: Curls `/sitemap.xml` and `/news-sitemap.xml` to protect crawl indexing.
- [x] **Discord Alerts**: Reports rollout details and commit messages to `#aurews-deploy`.

### 🛡️ Daily Security (`daily-security.yml`)
Triggered daily at 2:00 AM or manually.
- [x] **npm audit**: Library vulnerability updates check.
- [x] **Trivy Scan**: Scans codebase dependencies for new CVEs.
- [x] **Uptime monitor**: Validates live site responsiveness.
- [x] **Sitemap health check**: Verifies sitemap availability.
- [x] **Discord Alerts**: Direct alerts to `#aurews-security` on anomalies.

### 💡 Lighthouse Health (`lighthouse.yml`)
Triggered weekly on Mondays at 6:00 AM or manually.
- [x] **Performance Metrics**: Verifies fast LCP load times (Min Performance `0.80`).
- [x] **Accessibility**: Checks screen-reader compliance (Min A11y `0.85`).
- [x] **SEO Auditing**: Strictly enforces GSC standards (Min SEO `0.95`).
- [x] **Discord Alerts**: Reports final health score audits to `#aurews-deploy`.

---

### 🔄 Pipeline Execution Timeline

```mermaid
flowchart TD
  P1[1 Validate] --> P2[2 Tests]
  P2 --> P3[3 Security]
  P3 --> P4[4 Build]
  P4 --> P5[5 E2E]
  P5 --> P6{PR or main?}
  P6 -->|PR| P7[Preview Deploy]
  P6 -->|main| P8[Migration + Production Deploy]
  P8 --> P9[Smoke + Sitemap]
  P9 --> P10[Monitoring]
```

*   **PR Path**: Automatically provisions sandboxed Vercel preview environments for visual QA.
*   **Main Path**: Executes Prisma migrations via secure direct session ports before deploying code.
*   **Scheduled Path**: Continuously audits security, uptime, and SEO scores on a regular basis.

---

### 💾 Database Routing Policy

> [!IMPORTANT]
> **Database Routing Rules**
> *   `DATABASE_URL` ➡️ Supabase Pooler (`port: 6543` with `?pgbouncer=true`) for active Next.js serverless queries.
> *   `DIRECT_URL` ➡️ Supabase Direct PostgreSQL connection (`port: 5432`) used for migrations, database seeding, and admin operations.
> *   `prisma migrate deploy` must **never** run through the transaction pooler (port `6543`). Schema baseline migration is located at `prisma/migrations/0_init`.

```mermaid
flowchart LR
  APP[Vercel App Runtime] -->|DATABASE_URL :6543| POOL[Supabase Pooler]
  MIGRATE[GitHub Actions Migration] -->|DIRECT_URL :5432| DB[Supabase PostgreSQL]
```

---

### 📢 Notification & Alert Map

```mermaid
flowchart LR
  CI[CI Pipeline] --> DEPLOY[#aurews-deploy]
  PREVIEW[Preview Deploy] --> DEPLOY
  PROD[Production Deploy] --> DEPLOY
  LH[Lighthouse] --> DEPLOY

  DAILY[Daily Security] --> SECURITY[#aurews-security]
  UPTIME[UptimeRobot] --> SECURITY
  SENTRY[Sentry optional] -. later .-> SECURITY
```

*   `#aurews-deploy`: Logs build, preview, production deployment status, and Lighthouse CI metrics.
*   `#aurews-security`: Logs daily security updates, sitemap audits, and UptimeRobot down/up alerts.

---

## 🛠️ Extended Operations Manual

<details>
<summary>🔑 Required GitHub Secrets</summary>

Configure the following repository secrets under **Settings ➡️ Secrets and variables ➡️ Actions**:

*   `DATABASE_URL` — Transaction connection string (Supabase pooled port `6543`)
*   `DIRECT_URL` — Session connection string (Supabase direct port `5432`)
*   `NEXTAUTH_SECRET` — Authorization crypt secret key
*   `VERCEL_TOKEN` — Vercel Automation deployment token
*   `VERCEL_ORG_ID` & `VERCEL_PROJECT_ID` — Vercel account and project routing markers
*   `DISCORD_WEBHOOK_DEPLOY` — Webhook for `#aurews-deploy` channel logs
*   `DISCORD_WEBHOOK_SECURITY` — Webhook for `#aurews-security` security logs
*   `CODECOV_TOKEN` — Codecov test line coverage report token
*   `LHCI_GITHUB_APP_TOKEN` — Lighthouse status checklist app authorization key

*Detailed step-by-step setup guides are available in [docs/MANUAL_SETUP_GUIDE.md](./docs/MANUAL_SETUP_GUIDE.md).*
</details>

<details>
<summary>☁️ External Services Registry Status</summary>

*   **Vercel** (Active) — Primary hosting and CDN Serverless runner environment.
*   **Supabase** (Active) — Relational PostgreSQL storage backend.
*   **UptimeRobot** (Active) — 24/7 endpoint uptime checkers.
*   **Codecov** (Active) — Dynamic test coverage reporting.
*   **SonarCloud** (Active) — PR quality analysis.
*   **Sentry** (Optional / Later) — Error tracing logging.
*   **Discord** (Active) — Chat operations alert targets.
</details>

<details>
<summary>📦 Audited Gaps Resolved</summary>

We resolved the following design gaps identified in the original repository audit:
*   **Ignored Failures**: Replaced insecure scripts (`npm run test || true`) with strict exit-code pipelines blocking all runs on test failures.
*   **Insecure Master Branches**: Pinned all unpinned GitHub actions to immutable, audited SHA-1 hashes (e.g. upgraded Trivy to `v0.35.0`).
*   **No DB Sync**: Automated database migrations on production during deployments.
*   **PR Auth Lockout**: Configured Playwright with Vercel protection bypass automation and browser session cookies.
*   **SEO Coverage**: Configured Lighthouse CI metrics and sitemap curls to protect crawling indices.
</details>

<details>
<summary>⚡ Architecture & Database Entity Details</summary>

Decoupled Edge Router & Supabase PostgreSQL architecture flow:
```
Client ──► Next.js App Router ──► Auth.js Session Gate ──► Server Components ──► Prisma ──► Supabase PostgreSQL
```

#### Entities (`schema.prisma`):
*   **User**: `id` (PK), `name`, `email` (UK), `password`, `role` (USER/ADMIN), `image`, `createdAt`, `updatedAt`
*   **Category**: `id` (PK), `name` (UK), `slug` (UK), `image`, `createdAt`, `updatedAt`
*   **Post**: `id` (PK), `title`, `slug` (UK), `body`, `excerpt`, `coverImage`, `status` (DRAFT/PUBLISHED), `views`, `authorId` (FK), `categoryId` (FK), `createdAt`, `updatedAt`
</details>

<details>
<summary>🐳 Docker & Dev-Parity Policy Details</summary>

*   **Parity Policy**: Docker environments (`Dockerfile`, `docker-compose.yml`) are restricted strictly to local dev-parity setups, local integration/E2E testing, and production-parity backup deployments.
*   **Production target**: The production deployment target remains strictly **GitHub Actions ──► Vercel Serverless**.
</details>

<details>
<summary>📂 Project Folder Structure Details</summary>

```
aurews/
├── analysis/               # Competitor & SEO keyword analysis audits
├── content/                # Copywriting and SEO-optimized text resources
├── docs/                   # Developer guidelines and manual setup guides
├── prisma/                 # Database schema & local seeding models
│   ├── migrations/         # Prisma migrations database history
│   ├── schema.prisma       # Relational models
│   └── seed.ts             # Seeding controller
├── public/                 # Static vector assets, logos, and sitemaps
├── src/
│   ├── app/                # Next.js App Router Page components
│   │   ├── article/        # Dynamic article reader layout
│   │   ├── news-sitemap/   # GSC-safe XML news controller
│   │   ├── sitemap.ts      # Core dynamic sitemap generator
│   │   └── globals.css     # Premium UI visual tokens
│   ├── components/         # Reusable UI component modules
│   └── lib/                # Database clients, tokens, and constant configs
```
</details>

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
