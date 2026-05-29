<div align="center">

# 📰 Aurews

### Premium Tech & Editorial News Platform

**Next.js 16 · TypeScript · Prisma · Supabase · Vercel · GitHub Actions · Playwright · Discord Ops**

[🌐 Live Site](https://aurews.id.vn) · [⚙️ CI Pipeline](https://github.com/23520904/aurews-seo/actions/workflows/ci.yml) · [🚢 Production Deploy](https://github.com/23520904/aurews-seo/actions/workflows/deploy.yml) · [📊 Coverage](https://codecov.io/gh/23520904/aurews-seo)

[![CI Pipeline](https://github.com/23520904/aurews-seo/actions/workflows/ci.yml/badge.svg)](https://github.com/23520904/aurews-seo/actions/workflows/ci.yml)
[![Deploy to Production](https://github.com/23520904/aurews-seo/actions/workflows/deploy.yml/badge.svg)](https://github.com/23520904/aurews-seo/actions/workflows/deploy.yml)
[![Lighthouse CI — SEO Health](https://github.com/23520904/aurews-seo/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/23520904/aurews-seo/actions/workflows/lighthouse.yml)
[![codecov](https://codecov.io/gh/23520904/aurews-seo/branch/main/graph/badge.svg)](https://codecov.io/gh/23520904/aurews-seo)

</div>

---

## ✨ What is Aurews?

**Aurews** is a modern editorial news platform inspired by the premium, high-contrast style of **WIRED**.
It combines a polished reading experience with production-ready engineering: dynamic articles, SEO-first metadata, Google News-safe sitemaps, authenticated creator dashboards, and a full DevOps pipeline from pull request to production.

The project is not only a news website. It is also a complete demonstration of how a real production web app can be validated, secured, deployed, monitored, and reported automatically.

---

## ⚡ Production Snapshot

* 🚀 **Runtime**: Vercel Serverless
* 🧠 **Framework**: Next.js 16 App Router
* 🗄️ **Database**: Supabase PostgreSQL
* 🔐 **Auth**: Auth.js / NextAuth v5
* 🧪 **Testing**: Vitest + Playwright
* 🛡️ **Security**: Trivy + TruffleHog + npm audit
* 📈 **Quality**: SonarCloud + Codecov + Lighthouse CI
* 📣 **Alerts**: Discord `#aurews-deploy` and `#aurews-security`

---

## 🧰 Tech Stack

**Application**
Next.js 16 · TypeScript · Auth.js · Vanilla CSS Tokens

**Data Layer**
Prisma ORM · Supabase PostgreSQL · Connection Pooling

**Testing**
Vitest · React Testing Library · Playwright E2E

**DevOps**
GitHub Actions · Vercel · Prisma Migrate · Lighthouse CI

**Security & Monitoring**
Trivy · TruffleHog · npm audit · UptimeRobot · SonarCloud · Codecov · Sentry optional

---

## 🌟 Product Highlights

### 📑 SEO-first Article Engine

Aurews is optimized for search visibility from the article level upward.

* Dynamic article routes: `/article/[slug]`
* Canonical URLs and Open Graph metadata
* `NewsArticle` JSON-LD structured data
* Production-domain sharing URLs
* Sitemap and news sitemap support

### 🗺️ Google News-safe Sitemap

Google News sitemaps require fresh content. Aurews handles this with a resilient fallback system.

```mermaid
sequenceDiagram
    participant Bot as Googlebot
    participant Route as news-sitemap.xml
    participant DB as Supabase DB

    Bot->>Route: Request /news-sitemap.xml
    Route->>DB: Query posts from last 48 hours
    alt Recent posts exist
        DB-->>Route: Return recent posts
        Route-->>Bot: Render valid news sitemap
    else No recent posts
        Route->>DB: Query latest 5 published posts
        DB-->>Route: Return fallback posts
        Route-->>Bot: Render non-empty fallback sitemap
    end
```

### 💬 Premium Social Sharing

Aurews includes a responsive sharing experience designed for editorial content.

* Desktop sticky circular share panel
* Facebook, X, LinkedIn, WhatsApp, Copy Link
* Mobile native Web Share API support
* Localhost-to-production URL remapping for clean share payloads

### 🔒 Protected Creator Dashboard

The dashboard supports authenticated content management while keeping admin-only actions protected.

* `/dashboard` is available for authenticated users
* `/dashboard/bulk` is restricted to `ADMIN`
* Route-level and server-side checks protect privileged actions
* Supports editorial workflows such as publishing, editing, images, and bulk content creation

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    User[Reader / Author] --> App[Next.js App Router]
    App --> Auth[Auth.js Session Layer]
    App --> Pages[Server & Client Components]
    App --> API[API Routes / Server Actions]
    Pages --> Prisma[Prisma ORM]
    API --> Prisma
    Prisma --> DB[(Supabase PostgreSQL)]
    App --> SEO[Metadata / JSON-LD / Sitemaps]
```

<details>
<summary>📦 Core database entities</summary>

* **User**: registered account, role, auth profile
* **Category**: article classification and slug mapping
* **Post**: article content, metadata, status, author, category, views

```mermaid
erDiagram
    User ||--o{ Post : writes
    Category ||--o{ Post : categorizes

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
```

</details>

---

## 🚀 DevOps Pipeline at a Glance

Every important path is automated: validation, testing, security, preview deployment, production deployment, smoke testing, sitemap checking, and Discord reporting.

```mermaid
flowchart LR
    A[Push / Pull Request] --> CI[CI Pipeline]

    CI --> Lint[Lint + Type Check]
    CI --> Test[Unit / Integration Tests]
    CI --> Sec[Security Scan]
    CI --> Build[Next.js Build]
    CI --> E2E[Playwright E2E]

    PR[Pull Request] --> Preview[Vercel Preview]
    Preview --> PreviewSmoke[Preview Smoke Test]

    Main[Push to main] --> Migrate[Prisma migrate deploy]
    Migrate --> Prod[Vercel Production]
    Prod --> Smoke[Production Smoke Test]
    Prod --> Sitemap[Sitemap Validation]

    Cron[Scheduled Jobs] --> Daily[Daily Security Scan]
    Cron --> Lighthouse[Lighthouse SEO Health]

    CI --> DeployDiscord[Discord Deploy Channel]
    Preview --> DeployDiscord
    Prod --> DeployDiscord
    Lighthouse --> DeployDiscord
    Daily --> SecurityDiscord[Discord Security Channel]
```

---

## ✅ Workflow Cards

### 🧪 CI Pipeline

Triggered on push and pull request.

* Lint and TypeScript validation
* Unit and integration tests
* Trivy dependency scan
* TruffleHog secret scan
* npm audit
* Next.js production build
* Playwright E2E tests
* Discord report to `#aurews-deploy`

### 🌐 Preview Pipeline

Triggered on pull request.

* Creates Vercel Preview deployment
* Uses Vercel automation bypass when needed
* Runs preview smoke tests
* Reports preview status to `#aurews-deploy`

### 🚢 Production Deploy

Triggered on push or merge to `main`.

```mermaid
flowchart LR
    Main[main branch] --> Migration[Prisma migrate deploy]
    Migration --> Vercel[Vercel Production]
    Vercel --> Smoke[Smoke Test]
    Smoke --> Sitemap[Sitemap + News Sitemap Check]
    Sitemap --> Discord[Discord Deploy Report]
```

Production deploy verifies that the live site is not only deployed, but also reachable and SEO-safe.

### 🛡️ Daily Security

Triggered by schedule or manual run.

* npm audit summary
* Trivy filesystem dependency scan
* Homepage uptime check
* Sitemap and news sitemap health check
* Discord alert to `#aurews-security` only when issues are detected

### 💡 Lighthouse Health

Triggered weekly or manually.

* Performance audit
* Accessibility audit
* SEO audit
* Discord report to `#aurews-deploy`

---

## 💾 Database & Prisma Policy

> [!IMPORTANT]
> Aurews separates runtime database traffic from migration/admin traffic.

```mermaid
flowchart LR
    App[Vercel App Runtime] -->|DATABASE_URL :6543| Pooler[Supabase Transaction Pooler]
    Actions[GitHub Actions Migration] -->|DIRECT_URL :5432| Database[(Supabase PostgreSQL)]
    Admin[Manual Seed / Admin Scripts] -->|DIRECT_URL :5432| Database
```

* `DATABASE_URL` uses Supabase pooler port `6543` for app runtime queries.
* `DIRECT_URL` uses port `5432` for Prisma migrations, seed, and admin scripts.
* `prisma migrate deploy` must run through `DIRECT_URL`, not the transaction pooler.
* Initial migration baseline is stored at `prisma/migrations/0_init`.

---

## 📣 Notification Map

```mermaid
flowchart LR
    CI[CI Pipeline] --> Deploy[#aurews-deploy]
    Preview[Preview Deploy] --> Deploy
    Prod[Production Deploy] --> Deploy
    LH[Lighthouse CI] --> Deploy

    Daily[Daily Security] --> Security[#aurews-security]
    Uptime[UptimeRobot] --> Security
    Sentry[Sentry optional] -. later .-> Security
```

* `#aurews-deploy`: CI, preview, production deploy, Lighthouse.
* `#aurews-security`: uptime, security scan, sitemap health.
* Sentry is available for runtime monitoring and can be fully connected later.

---

## 🛡️ DevOps Improvements Delivered

<details open>
<summary>Key improvements from the original setup</summary>

* Test failures now block downstream build and deploy.
* GitHub Actions use pinned versions / immutable SHAs where applicable.
* Pull requests get preview deployments for QA.
* Production deployment runs Prisma migration before Vercel rollout.
* Playwright verifies critical user journeys and SEO routes.
* Trivy, TruffleHog, and npm audit protect the codebase from common security risks.
* UptimeRobot and daily security workflows report operational issues to Discord.
* Lighthouse CI tracks SEO, accessibility, and performance health.

</details>

---

## ⚙️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Start development server
npm run dev
```

Create a local `.env` file:

```env
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
NEXTAUTH_SECRET="your-auth-secret"
NEXT_PUBLIC_SITE_URL="https://aurews.id.vn"
```

---

## 🧪 Local Quality Checks

Run these before pushing:

```bash
npm run lint
npm run type-check
npm run test
npx playwright test
npm run build
```

---

## 📂 Project Structure

```text
aurews/
├── prisma/
│   ├── migrations/
│   │   └── 0_init/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── e2e/
├── docs/
└── src/
    ├── app/
    ├── components/
    └── lib/
```

---

## 🔑 Operations Manual

<details>
<summary>Required GitHub Secrets</summary>

Configure these in **GitHub → Settings → Secrets and variables → Actions**:

* `DATABASE_URL`
* `DIRECT_URL`
* `NEXTAUTH_SECRET`
* `VERCEL_TOKEN`
* `VERCEL_ORG_ID`
* `VERCEL_PROJECT_ID`
* `DISCORD_WEBHOOK_DEPLOY`
* `DISCORD_WEBHOOK_SECURITY`
* `CODECOV_TOKEN`
* `LHCI_GITHUB_APP_TOKEN`

</details>

<details>
<summary>External services</summary>

* **Vercel**: hosting and production deployment
* **Supabase**: PostgreSQL database
* **UptimeRobot**: homepage, sitemap, news sitemap, keyword monitoring
* **Codecov**: coverage reports
* **SonarCloud**: PR code quality gate
* **Discord**: deployment and security notification channels
* **Sentry**: optional runtime error monitoring

</details>

<details>
<summary>Docker policy</summary>

Docker is used for local development, test parity, and backup production-like environments.

The live production path remains:

```text
GitHub Actions → Prisma migrate deploy → Vercel Production
```

</details>

---

## 🎯 Final Result

Aurews demonstrates a complete modern web delivery system:

* a premium editorial news website,
* a search-engine-ready article engine,
* protected dashboard workflows,
* automated CI/CD gates,
* production migration safety,
* preview and production verification,
* Discord-based operational visibility,
* and continuous security / uptime monitoring.