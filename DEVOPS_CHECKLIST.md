# DevOps Implementation Checklist

> Tick each box as you complete it. See `PLANFORDEVOPS.md` for full details on each step.

---

## Phase 1 — GitHub Setup

- [x] Repo is pushed to GitHub
- [x] Branch protection rule added for `main` (require status checks, squash/rebase only)
- [x] Secret scanning + Push Protection enabled
- [x] Dependabot alerts enabled

---

## Phase 2 — GitHub Actions (CI)

- [x] `.github/workflows/ci.yml` 
- [x] GitHub Actions secrets added (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`)
- [x] `.github/dependabot.yml` 
- [x] CI passes on a test push/PR

---

## Phase 3 — Docker

- [ ] `Dockerfile` created (3-stage: deps → builder → runner)
- [ ] `docker-compose.yml` created (Next.js + local Redis)
- [ ] `.dockerignore` created
- [ ] `docker compose up --build` runs successfully locally
- [ ] Git tag `v0.1.0` pushed → Docker image published to GitHub Container Registry

---

## Phase 4 — Vercel

- [ ] `vercel.json` created with security headers
- [ ] All env vars from `.env.example` filled in Vercel Dashboard
- [ ] Vercel Analytics enabled in Dashboard
- [ ] Custom domain `aurews.id.vn` connected and working

---

## Phase 5 — Jenkins

- [ ] Decided where to host Jenkins (local PC or Oracle Cloud free VM)
- [ ] Jenkins started via Docker (`jenkins/jenkins:lts-jdk21`)
- [ ] Setup wizard completed at `http://localhost:8080`
- [ ] Plugins installed: Git, NodeJS, Blue Ocean, Credentials Binding
- [ ] Job 1 created — Nightly DB backup (runs at 2 AM daily)
- [ ] Job 2 created — Weekly `npm audit` report (runs Monday 9 AM)
- [ ] Job 3 created — Daily Lighthouse score (runs 6 AM daily)

---

## Phase 6 — Monitoring

- [ ] UptimeRobot account created, monitor added for `https://aurews.id.vn`
- [ ] Vercel Analytics confirmed receiving real-user data
- [ ] Neon dashboard checked for slow queries
- [ ] GitHub Security tab reviewed — no critical CVE alerts

---

**Progress: 8 / 22 tasks done**
