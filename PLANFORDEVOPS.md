# DevOps Plan for Aurews

> **Goal:** Set up a full DevOps pipeline with zero budget.  
> **You are:** A student running a Next.js 16 news site on Vercel.  
> **Mandatory tools:** GitHub · Docker · Jenkins  

---

## The Big Picture

```
You write code
    │  git push
    ▼
GitHub (source of truth)
    │  triggers
    ▼
GitHub Actions (CI — runs tests & build automatically)
    │  on merge to main
    ▼
Vercel (auto-deploys to production in ~30 seconds)

Jenkins (runs on your PC or a free cloud VM)
    └── scheduled jobs: DB backup, audits, monitoring
```

---

## Phase 1 — GitHub Setup ✅ (you probably have this already)

**What to do:**

1. Make sure your repo is on GitHub.
2. Go to **Settings → Branches → Add rule** for `main`:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date
   - ✅ Only allow squash/rebase merges (keeps history clean)
3. Go to **Settings → Code security → Secret scanning** → Enable push protection (stops you from accidentally committing passwords).
4. Go to **Settings → Code security → Dependabot alerts** → Enable.

**Why:** Protects your `main` branch and catches leaked secrets automatically.

---

## Phase 2 — GitHub Actions (CI Pipeline)

**What to do:**

Create this file in your repo: `.github/workflows/ci.yml`

**What it should do (in order):**
1. Trigger on every `git push` and every Pull Request
2. `npm ci` — install dependencies
3. `npx prisma generate` — generate the DB client
4. `npm run type-check` — catch TypeScript errors
5. `npm run lint` — catch code style issues
6. `npm run build` — full production build (catches runtime errors)
7. `npm audit --audit-level=high` — check for security vulnerabilities

**Also create:** `.github/dependabot.yml`  
This tells GitHub to automatically open PRs every week when your npm packages have updates. You review them, then merge.

**Why GitHub Actions specifically?**  
- Free (2,000 minutes/month on private repos, unlimited on public)
- Zero server needed — GitHub runs it for you
- Blocks broken code from reaching Vercel

---

## Phase 3 — Docker (Local Parity)

**What to do:**

Create two files in your repo root:

**`Dockerfile`** (3 stages):
- Stage 1 `deps` — install npm packages + run `prisma generate`
- Stage 2 `builder` — run `npm run build`
- Stage 3 `runner` — copy only the built output, run as a non-root user

> Your `next.config.ts` already has `output: 'standalone'` which makes this work perfectly. 

**`docker-compose.yml`**:
- One service: your Next.js app reading from `.env`
- One service: a local Redis container (mirrors Upstash in prod)

**`.dockerignore`**:
- Exclude `node_modules`, `.next`, `.git`, `.env` from the image

**Commands you'll use day-to-day:**
```bash
docker compose up --build   # start everything locally
docker compose logs -f app  # watch live logs
docker compose down         # stop
```

**Why Docker?**  
"Works on my machine" → guaranteed to work the same in any environment.  
Also required to push images to GitHub Container Registry for Jenkins to pull.

**To publish an image** (after Docker workflow is set up in GitHub Actions):  
```bash
git tag v0.1.0
git push origin v0.1.0
# GitHub Actions will build + push to ghcr.io/yourusername/aurews:0.1.0
```

---

## Phase 4 — Vercel (Production — you already use this ✅)

**What to do:**

1. Create `vercel.json` in your repo root with security headers:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           { "key": "X-Frame-Options", "value": "DENY" },
           { "key": "X-Content-Type-Options", "value": "nosniff" }
         ]
       }
     ]
   }
   ```
2. Go to your **Vercel Dashboard → Project → Settings → Environment Variables** and make sure ALL variables from your `.env.example` are filled in.
3. Enable **Vercel Analytics** in the Dashboard (free, gives you real-user Web Vitals).

**How deploy works:**
- Every push to `main` → Vercel auto-deploys (no action needed from you)
- Every PR → Vercel creates a preview URL (so you can test before merging)

---

## Phase 5 — Jenkins (Scheduled Jobs / Automation)

Jenkins is for **jobs that run on a schedule**, not for deployments (Vercel handles that).

**Where to run Jenkins for free:**

| Option | How |
|--------|-----|
| **Your own PC** (easiest to start) | Run Jenkins in Docker while your PC is on |
| **Oracle Cloud Always-Free VM** ⭐ | Free forever, 1 CPU / 1 GB RAM, good enough |

**How to start Jenkins with Docker:**
```bash
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts-jdk21

# Then open http://localhost:8080 in your browser
```

**Install these free plugins:** Git, NodeJS, Blue Ocean (nice UI), Credentials Binding

**Jobs to create in Jenkins:**

### Job 1 — Nightly Database Backup (every night at 2 AM)
- Connect to your Neon DB using `DATABASE_URL`
- Run `pg_dump` to export a `.dump` file
- Keep the last 7 backups, delete older ones
- Send yourself an email if it fails

### Job 2 — Weekly Dependency Audit (every Monday 9 AM)
- Pull latest `main` from GitHub
- Run `npm audit` and `npm outdated`
- Save the reports as Jenkins artifacts so you can review them

### Job 3 — Daily Lighthouse Performance Check (every morning 6 AM)
- Run `lighthouse https://aurews.id.vn --output=json`
- Log the scores: Performance, SEO, Accessibility, Best Practices
- Archive the report — you can see trends over time

---

## Phase 6 — Monitoring (All Free)

| Tool | What it does | Sign up |
|------|-------------|---------|
| **UptimeRobot** | Pings your site every 5 min, emails you if it goes down | uptimerobot.com |
| **Vercel Analytics** | Real page views + Web Vitals from real users | Already in your Vercel dashboard |
| **Neon Dashboard** | Slow query detection, DB usage | console.neon.tech |
| **GitHub Security tab** | CVE alerts for your packages | Automatic on GitHub |

---

## Implementation Order (Suggested)

| Week | Task |
|------|------|
| **Week 1, Day 1** | Set branch protection rules on GitHub |
| **Week 1, Day 1** | Create `.github/workflows/ci.yml` + add secrets in GitHub |
| **Week 1, Day 2** | Create `Dockerfile` + `docker-compose.yml` + test locally |
| **Week 1, Day 3** | Create `vercel.json`, check all env vars in Vercel |
| **Week 1, Day 3** | Create `.github/dependabot.yml` |
| **Week 2** | Set up Jenkins (Docker on your PC or Oracle Cloud VM) |
| **Week 2** | Create the 3 Jenkins jobs (backup, audit, lighthouse) |
| **Week 2** | Register on UptimeRobot, add your site |

---

## Total Cost: $0/month

| Tool | Free Limit |
|------|-----------|
| GitHub | Unlimited repos + Actions minutes (public) |
| GitHub Actions | 2,000 min/month (private) or unlimited (public) |
| GitHub Container Registry | Free for public images |
| Vercel Hobby | Unlimited deployments + free analytics |
| Oracle Cloud VM (Jenkins) | Always-free forever |
| UptimeRobot | 50 monitors, 5-min interval |
| Neon PostgreSQL | 0.5 GB storage |
| Upstash Redis | 10k commands/day |

---

*When you're ready to implement any phase, just ask and I'll write the exact files for you.*
