# Aurews — Manual Setup Guide

> Step-by-step instructions for everything that requires external service registration or dashboard configuration. Follow in order — GitHub Secrets must be done **before** any CI/CD pipeline will work.

---

## Table of Contents
1. [GitHub Secrets](#1-github-secrets)
2. [Vercel Setup](#2-vercel-setup)
3. [Discord Webhooks](#3-discord-webhooks)
4. [Codecov (Test Coverage)](#4-codecov-test-coverage)
5. [Lighthouse CI GitHub App](#5-lighthouse-ci-github-app)
6. [Sentry (Error Tracking)](#6-sentry-error-tracking)
7. [UptimeRobot (Uptime Monitoring)](#7-uptimerobot-uptime-monitoring)
8. [Google Search Console](#8-google-search-console)
9. [GitHub Dependabot](#9-github-dependabot)
10. [Vercel Analytics & Speed Insights](#10-vercel-analytics--speed-insights)
11. [Test the Full Pipeline](#11-test-the-full-pipeline)

---

## 1. GitHub Secrets

All secrets live at: **GitHub repo → Settings → Secrets and variables → Actions → New repository secret**

> [!IMPORTANT]
> The CI/CD pipeline will **fail immediately** without these secrets. Do this first.

### 1.1 DATABASE_URL & DIRECT_URL (Supabase)

1. Go to [supabase.com](https://supabase.com) → sign in and open your project dashboard.
2. Navigate to **Project Settings** (gear icon in the bottom-left sidebar).
3. Select **Database** from the settings menu.
4. Scroll down to the **Connection string** section and select the **URI** tab.
5. In the **Mode** dropdown:
   - Select **Transaction** (for connection pooling) → copy the URI → paste as `DATABASE_URL` in GitHub Secrets and Vercel. Make sure the port is `6543` (Supavisor Transaction Pooler).
   - Select **Session** (for direct connection) → copy the URI → paste as `DIRECT_URL` in GitHub Secrets and Vercel. Make sure the port is `5432` (Direct connection).

```
DATABASE_URL = postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL   = postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```

> [!NOTE]
> `DATABASE_URL` uses the **pooled** Transaction connection via Supavisor (port 6543) — for running the app queries.
> `DIRECT_URL` uses the **direct** Session connection (port 5432) — required for running Prisma migrations.

---

### 1.2 NEXTAUTH_SECRET

Generate a secure 32-character secret:

```bash
# On Mac/Linux:
openssl rand -base64 32

# On Windows PowerShell:
[System.Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Max 256) }))
```

Copy the output → paste as `NEXTAUTH_SECRET`.

---

### 1.3 VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID

**VERCEL_TOKEN:**
1. Go to [vercel.com](https://vercel.com) → click your avatar (top right) → **Settings**
2. Sidebar → **Tokens**
3. Click **Create** → name it `github-actions` → scope: **Full Account** → create
4. Copy the token immediately (shown only once) → paste as `VERCEL_TOKEN`

**VERCEL_ORG_ID & VERCEL_PROJECT_ID:**

Option A — via Vercel CLI (recommended):
```bash
npm i -g vercel
vercel login
vercel link   # links current directory to your project
cat .vercel/project.json
```
Output will show:
```json
{
  "orgId": "team_xxxxxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxxxxx"
}
```
- `orgId` → paste as `VERCEL_ORG_ID`
- `projectId` → paste as `VERCEL_PROJECT_ID`

Option B — via Vercel dashboard:
- **VERCEL_ORG_ID**: Go to your team/personal settings → **General** → copy **Team ID** (or leave blank for personal = your user ID from account settings)
- **VERCEL_PROJECT_ID**: Open your project → **Settings** → **General** → scroll to **Project ID**

---

### 1.4 DISCORD_WEBHOOK_DEPLOY & DISCORD_WEBHOOK_SECURITY

Create **2 separate webhooks** in Discord (keep deploy and security alerts in separate channels):

1. Open Discord → right-click your server → **Server Settings**
2. Sidebar → **Integrations** → **Webhooks** → **New Webhook**
3. Name it `Aurews Deploys`, choose your `#deploys` channel → **Copy Webhook URL**
4. Paste as `DISCORD_WEBHOOK_DEPLOY`
5. Repeat for a `#security` channel → paste as `DISCORD_WEBHOOK_SECURITY`

---

### 1.5 CODECOV_TOKEN

1. Go to [codecov.io](https://codecov.io) → **Sign up with GitHub**
2. Find your repo `23520904/aurews-seo` → click it
3. Go to **Settings** → **General** → copy **Repository Upload Token**
4. Paste as `CODECOV_TOKEN`

---

### 1.6 LHCI_GITHUB_APP_TOKEN

1. Go to [lighthouse-ci.appspot.com/docs/getting-started](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md#github-status-checks)
2. Install the **Lighthouse CI GitHub App**: [github.com/apps/lighthouse-ci](https://github.com/apps/lighthouse-ci)
3. Authorize for your repo `23520904/aurews-seo`
4. After install, you'll see a token — copy it
5. Paste as `LHCI_GITHUB_APP_TOKEN`

> [!NOTE]
> If you skip this, Lighthouse CI still runs and uploads artifacts — it just won't post PR status checks. Safe to skip initially.

---

## 2. Vercel Setup

The app is already deployed via Vercel. Make sure these environment variables are set in **Vercel → Project → Settings → Environment Variables**:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | Supabase pooled connection string | Production, Preview |
| `DIRECT_URL` | Supabase direct connection string | Production, Preview |
| `NEXTAUTH_SECRET` | Same value as GitHub secret | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://aurews.id.vn` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://your-preview-url.vercel.app` | Preview |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | All |
| `CLOUDINARY_API_KEY` | Cloudinary API key | All |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | All |
| `REDIS_URL` | Upstash Redis URL | All |

> [!CAUTION]
> If `NEXTAUTH_SECRET` in Vercel differs from the one in GitHub Secrets, Auth.js sessions will fail after deploy. Keep them **identical**.

---

## 3. Discord Webhooks

Already covered in [1.4 above](#14-discord_webhook_deploy--discord_webhook_security).

**Recommended channel structure:**
```
Discord Server
├── #deploys      → DISCORD_WEBHOOK_DEPLOY   (deploy.yml)
├── #security     → DISCORD_WEBHOOK_SECURITY (daily-security.yml)
└── #monitoring   → (optional, manual — UptimeRobot can post here too)
```

**Test a webhook manually:**
```bash
curl -X POST https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN \
  -H 'Content-Type: application/json' \
  -d '{"content": "✅ Test message from Aurews pipeline"}'
```

---

## 4. Codecov (Test Coverage)

After adding `CODECOV_TOKEN` to GitHub Secrets:

1. The CI pipeline (`ci.yml`) auto-uploads coverage after `npm run test:coverage`
2. Go to [codecov.io/gh/23520904/aurews-seo](https://codecov.io/gh/23520904/aurews-seo) to see your dashboard
3. Optional: add a coverage badge to `README.md`:
```markdown
[![codecov](https://codecov.io/gh/23520904/aurews-seo/branch/main/graph/badge.svg)](https://codecov.io/gh/23520904/aurews-seo)
```

---

## 5. Lighthouse CI GitHub App

After installing the app ([step 1.6](#16-lhci_github_app_token)):

The `lighthouse.yml` workflow is already configured to:
- Run on every push to `main`
- Run weekly on Monday at 6am
- Can be triggered manually via **Actions → Lighthouse CI — SEO Health → Run workflow**

The `.lighthouserc.json` thresholds already set:
- SEO score ≥ **0.95** (error if below — blocks merge)
- Performance ≥ **0.80** (warning only)
- Accessibility ≥ **0.85** (warning only)

---

## 6. Sentry (Error Tracking)

```bash
# Run from your project root:
npx @sentry/wizard@latest -i nextjs
```

The wizard will:
1. Ask you to log in to Sentry (or create account at [sentry.io](https://sentry.io))
2. Create a new project automatically
3. Add `NEXT_PUBLIC_SENTRY_DSN` to your `.env`
4. Create `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
5. Update `next.config.ts` to wrap with Sentry

After setup:
- Add `NEXT_PUBLIC_SENTRY_DSN` to **Vercel environment variables**
- Add `SENTRY_AUTH_TOKEN` to **GitHub Secrets** (Wizard provides the value)

> [!TIP]
> The free tier (50k errors/month) is more than enough for Aurews.

---

## 7. UptimeRobot (Uptime Monitoring)

1. Create a free account at [uptimerobot.com](https://uptimerobot.com)
2. Go to **Dashboard** → **+ Add New Monitor**
3. Create **3 monitors**:

| Monitor Name | URL | Type | Interval |
|-------------|-----|------|---------|
| Aurews — Homepage | `https://aurews.id.vn` | HTTP(s) | Every 5 min |
| Aurews — Sitemap | `https://aurews.id.vn/sitemap.xml` | HTTP(s) | Every 5 min |
| Aurews — News Sitemap | `https://aurews.id.vn/news-sitemap.xml` | HTTP(s) | Every 5 min |

4. For each monitor, set alert contact → **Alert Contacts** → add your email
5. Optional: integrate with Discord

**UptimeRobot → Discord integration:**
1. In UptimeRobot → **Alert Contacts** → **+ Add Alert Contact**
2. Type: **Webhook (URL)**
3. Paste your Discord webhook URL (`DISCORD_WEBHOOK_SECURITY`)
4. Post data:
```json
{"content": "⚠️ UptimeRobot alert: *MonitorFriendlyName* is *AlertTypeFriendlyName* — *AlertDetails*"}
```

---

## 8. Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **+ Add property** → **URL prefix** → enter `https://aurews.id.vn`
3. Verify ownership (easiest: **HTML tag** method — add the meta tag to your `<head>`)
4. After verification, go to **Sitemaps** (left sidebar)
5. Submit both:
   - `https://aurews.id.vn/sitemap.xml`
   - `https://aurews.id.vn/news-sitemap.xml`

> [!IMPORTANT]
> The News Sitemap (`/news-sitemap.xml`) is **critical for Google News indexing**. Submit it separately and monitor for errors in the Coverage report.

**Add HTML verification tag to `src/app/layout.tsx`:**
```tsx
export const metadata = {
  // ... existing metadata
  verification: {
    google: 'YOUR_VERIFICATION_CODE_HERE', // from GSC
  },
}
```

---

## 9. GitHub Dependabot

1. Go to your repo → **Settings** → **Security** (left sidebar) → **Code security and analysis**
2. Enable:
   - ✅ **Dependency graph**
   - ✅ **Dependabot alerts**
   - ✅ **Dependabot security updates**
   - ✅ **Secret scanning**
   - ✅ **Secret scanning push protection**

Optional — add `dependabot.yml` for automatic PR updates:
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 5
```

---

## 10. Vercel Analytics & Speed Insights

Both packages are already in `package.json`:
- `@vercel/analytics`
- `@vercel/speed-insights`

They're already imported in the app. You just need to **enable them in Vercel**:

1. Go to [vercel.com](https://vercel.com) → your project
2. **Analytics** tab → click **Enable**
3. **Speed Insights** tab → click **Enable**

That's it — data starts flowing immediately on next deploy.

---

## 11. Test the Full Pipeline

Once all secrets are configured, trigger a complete pipeline run:

### 11.1 Create a test PR

```bash
git checkout -b test/pipeline-verification
echo "# Pipeline test $(date)" >> README.md
git add README.md
git commit -m "test: verify full CI/CD pipeline"
git push origin test/pipeline-verification
```

Then open a Pull Request to `main` on GitHub.

**Expected flow:**
1. ✅ `CI Pipeline` triggers → validate → test → security → build → e2e
2. ✅ `Preview Deployment` triggers → Vercel preview URL → smoke test → PR comment with URL

### 11.2 Merge the PR

```bash
# After all checks pass, merge on GitHub UI or:
git checkout main
git merge test/pipeline-verification
git push
```

**Expected flow after merge:**
1. ✅ `Deploy to Production` triggers
2. ✅ Prisma migrations run
3. ✅ Vercel production deploy
4. ✅ Smoke tests against `aurews.id.vn`
5. ✅ Sitemap validation
6. ✅ Discord `#deploys` notification

### 11.3 Verify daily security (next day)

The `daily-security.yml` runs at 2am daily. You can trigger manually:

**GitHub → Actions → Daily Security Scan → Run workflow**

Expected: Discord `#security` gets a message only if issues found.

---

## ✅ Completion Checklist

```
[ ] 1. GitHub Secrets — all 10 added
[ ] 2. Vercel env vars — matched with secrets
[ ] 3. Discord — 2 webhooks tested
[ ] 4. Codecov — token added, badge optional
[ ] 5. LHCI GitHub App — installed for repo
[ ] 6. Sentry — wizard run, DSN in Vercel
[ ] 7. UptimeRobot — 3 monitors active
[ ] 8. Google Search Console — 2 sitemaps submitted
[ ] 9. Dependabot — security alerts enabled
[ ] 10. Vercel Analytics + Speed Insights — enabled
[ ] 11. Test PR created → CI passed → merged → deploy succeeded
```
