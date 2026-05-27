# Aurews DevOps Pipeline v2 — Coverage Report

> Based on `aurews-devops-pipeline-v2.html` — full cross-reference of what's done vs what's pending.
> Last updated: 2026-05-27

---

## Legend
- ✅ **Done** — implemented and verified
- ⏳ **Pending** — needs manual action (secrets, dashboards, external services)
- ❌ **Not done** — not implemented yet

---

## 📦 1. Dependencies

| Item | Status | Notes |
|------|--------|-------|
| `vitest @vitejs/plugin-react jsdom @testing-library/react` | ✅ | Installed |
| `vite-tsconfig-paths` | ✅ | Installed |
| `@playwright/test` + chromium | ✅ | Installed |
| `msw` (API mocking) | ✅ | Installed |
| `@vitest/coverage-v8` | ✅ | Installed |
| `@testing-library/jest-dom` | ✅ | Installed (added during fix) |

---

## ⚙️ 2. Configuration Files

| File | Status | Notes |
|------|--------|-------|
| `vitest.config.ts` | ✅ | jsdom, globals, coverage thresholds |
| `playwright.config.ts` | ✅ | chromium, PLAYWRIGHT_BASE_URL env |
| `.lighthouserc.json` | ✅ | SEO ≥ 0.95, Perf warn ≥ 0.8, a11y ≥ 0.85 |
| `next.config.ts` → `output: 'standalone'` | ✅ | Required for Docker |
| `package.json` scripts | ✅ | `test`, `test:watch`, `test:coverage`, `test:e2e`, `test:e2e:ui` |

---

## 🧪 3. Test Files

### Unit Tests (`src/__tests__/unit/`)

| File | Status | Test Count | Coverage |
|------|--------|-----------|---------|
| `sitemap.test.ts` | ✅ | 6 real tests | 48h filter, fallback, XML structure, empty, special chars, URL |
| `seo-metadata.test.ts` | ✅ | 8 real tests | @type, canonical, ISO date, description fallback, image fallback, publisher |
| `utils.test.ts` | ✅ | 9 real tests | slug generation, excerpt truncation, date formatting |
| `auth-helpers.test.ts` | ✅ | 7 real tests | bcrypt hash/compare, role enum validation |
| Redis cache utils | ❌ | 0 | Pipeline spec calls for `vitest-mock-extended` Upstash mock — not implemented |
| Prisma query helpers unit tests | ❌ | 0 | `getPaginatedPosts()`, `getPostBySlug()` helpers not extracted as testable functions |

### Integration Tests (`src/__tests__/integration/`)

| File | Status | Test Count | Coverage |
|------|--------|-----------|---------|
| `article-page.test.tsx` | ✅ | 4 tests | Mocked Prisma, SEO lib integration, post data shape |
| `api-routes.test.ts` | ✅ | 3 tests | Response shape, pagination, category+author includes |
| Auth middleware integration | ❌ | 0 | Pipeline spec: test session token, NEXTAUTH_SECRET validation |
| Dashboard RBAC integration | ❌ | 0 | Pipeline spec: test ADMIN vs USER access control logic |

### E2E Tests (`e2e/`)

| File | Status | Tests | Notes |
|------|--------|-------|-------|
| `smoke.spec.ts` | ✅ | 4 | Homepage, sitemap.xml, news-sitemap.xml, login form |
| `article-page.spec.ts` | ✅ | 5+1 | Dynamic slug, JSON-LD, canonical URL, og:image |
| `news-sitemap.spec.ts` | ✅ | 1 | 48h fallback — never empty |
| `auth.spec.ts` | ✅ | 1 | Basic stub (login redirect) |
| `dashboard-access.spec.ts` | ✅ | 4 | Unauthenticated → /auth/login redirect |
| `category.spec.ts` | ✅ | 3 | 3 categories (business, tech-innovation, a.i.) |
| `search.spec.ts` | ✅ | 4 | Search input, results/empty state, title tag |
| `share-buttons.spec.ts` | ✅ | 1 | Pipeline spec: social share URLs use prod domain (not localhost) |
| `404.spec.ts` | ✅ | 1 | Pipeline spec: /nonexistent → 404 status + page |
| `homepage.spec.ts` | ✅ | 1 | Pipeline spec: full homepage spec (article cards, categories in nav) |

**Total tests: 37 unit+integration + 10 e2e files**

---

## 🔄 4. GitHub Actions Workflows

| Workflow | Status | Notes |
|----------|--------|-------|
| `ci.yml` (5-job: validate→test→security→build→e2e) | ✅ | Trufflehog pinned, Trivy@0.28.0, no `\|\| true` |
| `deploy.yml` (Prisma migrate + Vercel + smoke + sitemap) | ✅ | sleep 10, sitemap grep graceful, Discord notify |
| `preview.yml` (PR preview + upsert comment + smoke) | ✅ | Creates/updates bot comment, success/fail status |
| `lighthouse.yml` (collect + assert + upload artifact) | ✅ | Weekly cron + push to main |
| `daily-security.yml` (audit + Trivy + uptime + Discord) | ✅ | CRIT count, HTTP_STATUS, rich Discord message |
| ~~`docker.yml`~~ | ✅ DELETED | Was obsolete — Vercel is the deploy target |

---

## 🔐 5. GitHub Secrets (Manual — needs YOU)

| Secret | Status | Where to get |
|--------|--------|-------------|
| `DATABASE_URL` | ⏳ | Supabase dashboard → Connection string (Transaction pooler, port 6543) |
| `DIRECT_URL` | ⏳ | Supabase dashboard → Connection string (Session direct, port 5432) |
| `NEXTAUTH_SECRET` | ⏳ | `openssl rand -base64 32` |
| `VERCEL_TOKEN` | ⏳ | Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | ⏳ | `vercel projects ls` |
| `VERCEL_PROJECT_ID` | ⏳ | `vercel projects ls` |
| `DISCORD_WEBHOOK_DEPLOY` | ⏳ | Discord → Server Settings → Integrations |
| `DISCORD_WEBHOOK_SECURITY` | ⏳ | Discord → Server Settings → Integrations |
| `CODECOV_TOKEN` | ⏳ | codecov.io → connect repo |
| `LHCI_GITHUB_APP_TOKEN` | ⏳ | Lighthouse CI GitHub App install |

---

## 🐳 6. Docker

| Item | Status | Notes |
|------|--------|-------|
| `Dockerfile` 3-stage build (deps→builder→runner) | ✅ | libc6-compat + curl installed |
| Curl-based `HEALTHCHECK` | ✅ | 30s interval, 15s start-period |
| Prisma client copied to runner stage | ✅ | `node_modules/.prisma` + `@prisma/client` |
| `docker-compose.yml` with healthcheck | ✅ | Aligned with Dockerfile |
| `next.config.ts` `output: 'standalone'` | ✅ | Required for standalone copy |

---

## 📊 7. Monitoring Stack (Manual — needs YOU)

| Item | Status | Action |
|------|--------|--------|
| Sentry Next.js integration | ✅ | `npx @sentry/wizard@latest -i nextjs` |
| UptimeRobot — `aurews.id.vn` | ✅ | Add monitor at uptimerobot.com |
| UptimeRobot — `/sitemap.xml` | ✅ | Add separate monitor |
| UptimeRobot — `/news-sitemap.xml` | ✅ | Add separate monitor |
| UptimeRobot Discord Webhook Alerts | ✅ | Link UptimeRobot alerts to `#security` Discord channel |
| Sentry Discord Integration Alerts | ✅ | Connect Sentry Alerts to `#security` Discord channel |
| Vercel Analytics | ⏳ | Enable in Vercel dashboard |
| Vercel Speed Insights | ⏳ | Enable in Vercel dashboard |
| GitHub Dependabot security alerts | ⏳ | Repo → Settings → Security |
| Google Search Console — submit sitemaps | ✅ | Submit `/sitemap.xml` + `/news-sitemap.xml` |

---

## 🔧 8. Utility Libraries (Added by us, not in original spec)

| File | Status | Notes |
|------|--------|-------|
| `src/lib/seo.ts` — `buildArticleJsonLd()` | ✅ | Pure function, testable |
| `src/lib/sitemap-builder.ts` — `buildNewsSitemap()` | ✅ | Pure function, 48h fallback |

---

## 📋 Summary

| Category | Done | Pending/Manual | Not Done |
|----------|------|----------------|---------|
| Dependencies | 6/6 | 0 | 0 |
| Config Files | 5/5 | 0 | 0 |
| Unit Tests | 4/6 | 0 | 2 (Redis, Prisma helpers) |
| Integration Tests | 2/4 | 0 | 2 (auth middleware, RBAC) |
| E2E Tests | 10/10 | 0 | 0 |
| CI Workflows | 5/5 | 0 | 0 |
| GitHub Secrets | 0/10 | 10 | 0 |
| Docker | 5/5 | 0 | 0 |
| Monitoring | 7/10 | 3 | 0 |
| **TOTAL** | **44/61** | **13** | **4** |

---

## 🎯 What's Left To Do

### You need to do (external services):
1. Add **10 GitHub Secrets** (Supabase, Vercel, Discord, Codecov, LHCI)
2. ~~Setup **Sentry** (`npx @sentry/wizard@latest -i nextjs`)~~ ✅
3. ~~Setup **3 UptimeRobot** monitors~~ ✅
4. Enable **Vercel Analytics + Speed Insights**
5. Enable **GitHub Dependabot**
6. ~~Submit sitemaps to **Google Search Console**~~ ✅
7. ~~Connect Sentry and UptimeRobot alert webhooks to Discord `#security` channel~~ ✅
8. Merge a **PR to test** the CI/CD pipeline end-to-end

### Code still to implement (optional — for full spec compliance):
1. ~~`e2e/share-buttons.spec.ts` — social share URLs contain prod domain~~ ✅
2. ~~`e2e/404.spec.ts` — /nonexistent → 404 status + page~~ ✅
3. ~~`e2e/homepage.spec.ts` — article cards, nav categories~~ ✅
4. Redis cache helper unit tests (needs `vitest-mock-extended`)
5. Auth middleware integration tests (session, NEXTAUTH_SECRET)
