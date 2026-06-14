# Sandpitt Project — Status Summary

_Last updated: 2026-06-14_

---

## What We're Building

**Sandpitt** is a self-hosted inspection management system for a small business (or multi-client consultancy). It covers the full inspection lifecycle: scheduling, mobile field capture with photos and geolocation, supervisor sign-off, and reporting.

### Stack

| Layer | Technology |
|---|---|
| API | FastAPI (Python 3.12) + SQLAlchemy + PostGIS |
| Mobile | Expo / React Native (TypeScript), offline-capable |
| Admin UI | Next.js 14 |
| Auth | Keycloak (JWT/RS256) |
| Storage | MinIO (S3-compatible) |
| Database | PostgreSQL 16 + PostGIS 3.4 |
| Analytics | Metabase |
| Hosting | Self-hosted VPS via Coolify |

---

## Original Goals

1. Build out the core Sandpitt inspection system
2. Choose and document the self-hosted VPS stack
3. Research the best open-source tools that complement or replace stack choices
4. Maintain an interactive link catalog (`docs/index.html`) as a living reference

---

## What's Been Done

### Link Catalog (`docs/link-catalog-interactive.html` / `docs/index.html`)

- Grew from ~120 entries to **282 entries** across 15+ categories
- Added **multi-category support** (`cats: []` array field) so tools that span multiple categories appear under all of them
- Processed ~300 new URLs: filtered Google searches, news articles, paywalled/commercial-only tools; kept genuinely open-source/free entries
- Identified better alternatives to current stack choices (see below)
- Cleaned up 7 duplicate entries created by a parallel agent mishap
- Live at: `https://kingdonk-ops.github.io/Sandpitt/` (after PR merge)

### Better Alternatives Identified

| Current / Candidate | Better Choice | Why |
|---|---|---|
| Activepieces / Automatisch | **n8n** | 400+ integrations, most mature open-source automation |
| OpenProject | **Plane** | Linear-style agile UI, better for software teams |
| Custom admin on Supabase | **Refine.dev** | React admin framework, one-line Supabase connection |
| Cron + queues | **Trigger.dev** | Durable background jobs, native Supabase integration |
| Custom PDF generation | **PDFME** | TypeScript, browser + Node, template-based |
| No offline sync | **ElectricSQL / PowerSync** | PostgreSQL → SQLite offline sync for React Native |
| Metabase (product analytics) | **PostHog** | Funnels, session recording, feature flags (Metabase stays for BI/SQL) |
| Ad-hoc webhooks | **Svix** | Reliable delivery, retry logic, user portal |
| Cron + queues (complex flows) | **Temporal** | Durable workflow engine for inspection lifecycle |
| Keycloak (TypeScript apps) | **Better Auth** | Simpler TS-native auth library |
| Manual sign-off | **DocuSeal / LibreSign** | Open-source document signing |

### Infrastructure & Auth Research

- **iCloud+ custom email domain** eliminates the need for a self-hosted mail server (~160 MB RAM saved on VPS)
- **Forgejo incoming email** works with iCloud+ IMAP sub-addressing — `incoming+%{token}@yourdomain.com` routes to inbox; Forgejo polls via IMAP
- **Forgejo OAuth2 → Coolify** works as SSO: a single credential covers both developer tools (Coolify natively supports Gitea/Forgejo OAuth login)
- **MCP server scoping**: global `~/.claude/settings.json` for shared services; project-level `.claude/settings.json` for per-client Supabase instances — no cross-contamination between parallel sessions

### Git / Branch State

- Active branch: `claude/research-links-categorize-h2g3se`
- All changes pushed to remote
- **No PR created yet** — GitHub MCP auth failed during the last session; PR must be created manually

---

## What Remains

### Immediate

- [ ] Create PR: `claude/research-links-categorize-h2g3se` → `main`
  - Manual URL: `https://github.com/kingdonk-ops/Sandpitt/compare/main...claude/research-links-categorize-h2g3se`
- [ ] After merge: GitHub Pages at `https://kingdonk-ops.github.io/Sandpitt/` auto-updates

### Infrastructure (Researched, Not Yet Written)

- [ ] **Docker Compose for slim stack** — Supabase (self-hosted) + Coolify + Forgejo, `docker compose up` ready
- [ ] **Claude Code MCP config** — `.claude/settings.json` connecting to Supabase, MinIO, Postgres, Forgejo
- [ ] **Forgejo `app.ini`** incoming email block (iCloud+ IMAP config is ready to write)

### Core App Features (Not Yet Started)

- [ ] **Mobile offline sync** — ElectricSQL or PowerSync (PostgreSQL → SQLite)
- [ ] **Inspection PDF reports** — PDFME template-based generation
- [ ] **Document sign-off flow** — DocuSeal or LibreSign
- [ ] **Admin UI** — Refine.dev on top of Supabase (faster than building from scratch)
- [ ] **Background jobs / lifecycle automation** — Trigger.dev or Temporal

---

## Suggested Next Steps

1. **Create the PR** — open manually or start a new session with working GitHub auth
2. **Docker Compose stack file** — get Coolify + Forgejo + slim Supabase running locally with one command
3. **Pick one core feature** — offline sync is the highest-value mobile feature; Refine.dev admin is the quickest admin win
