# Portfolio — Andrés Guerrero

Personal portfolio for Andrés Felipe Guerrero Novoa, a full-stack developer focused on end-to-end product delivery for banking and fintech. Built as a monorepo, bilingual (English/Spanish), and designed to be read by technical recruiters in under a minute.

> **Status:** Phase 2 in progress (web accessibility, SEO, performance). Deployment is planned for Phase 4.

## Stack

| Layer | Choice |
|---|---|
| Web | Astro 6 + Preact islands |
| Admin | Next.js 16 + React 19 (starter; built in Phase 7) |
| Data | Drizzle ORM + `@neondatabase/serverless` |
| Database | Neon Postgres (free tier) |
| Auth / Storage | Neon Auth + Object Storage (Phase 7) |
| Deploy | Vercel Hobby (two projects) |
| Tooling | pnpm workspaces, Turborepo, Oxlint, Oxfmt, Vitest, Playwright |

## Structure

```
portfolio_management/
  apps/
    web/            public site (Astro, static output)
    admin/          private panel (Next.js)
  packages/
    data/           Drizzle schema, client, queries, seed
  db/
    migrations/     drizzle-kit migrations
  e2e/              Playwright tests (content, theme, a11y, SEO)
  docs/             product plan, archived legacy SQL, CV
  PRODUCT.md        product truth (users, positioning, principles)
```

## Requirements

- Node.js 24
- pnpm 10.33.4
- A Neon project with `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED` (direct)

No local PostgreSQL, Docker, or Supabase is required.

## Setup

```bash
pnpm install
pnpm build
```

Create `apps/web/.env.local`:

```dotenv
DATABASE_URL=postgresql://...-pooler.../neondb?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://.../neondb?sslmode=require
```

`DATABASE_URL` uses the `app_rw` runtime role; `DATABASE_URL_UNPOOLED` uses the owner role for migrations.

## Development

```bash
pnpm dev                              # web on :4321, admin on :3000
pnpm --filter @portfolio/web dev      # web only
```

If you edit `packages/data`, rebuild it so the web picks up the changes:

```bash
pnpm --filter @portfolio/data build
```

## Database

```bash
pnpm --filter @portfolio/data db:verify    # row counts + ES/EN content
pnpm --filter @portfolio/data db:seed      # idempotent seed
pnpm --filter @portfolio/data db:generate  # new migration from schema
pnpm --filter @portfolio/data db:migrate   # apply to Neon
```

The seed is generated from the CV (`rendercv` YAML files) and the certificate manifest. It covers 7 roles, 1 education entry, 5 skill groups, 46 skills, and 43 certifications (12 published).

## Languages

- English is the default locale at `/`.
- Spanish lives at `/es`.
- Content is stored language-neutrally with stable English keys plus translation tables; queries pick the locale and fall back to Spanish.
- The public site is static (SSG): content is read at build time, so a database update requires a redeploy.

## Tests

```bash
pnpm test    # Vitest (data layer against Neon)
pnpm e2e     # Playwright: content, theme, accessibility, SEO
```

## Product decisions

- **Neon over Supabase:** no 7-day pause, Postgres + Auth + Storage in one free-tier provider, Drizzle-first.
- **No `packages/contracts`:** the API was removed, so validation lives next to each form instead of a shared dead package.
- **Translations table over `_en` columns:** adding a locale is data, not a migration.
- **Static-first:** the portfolio must be cheap to host and fast for a recruiter; the admin is the only dynamic surface.

## Documentation

- `docs/PORTFOLIO-PLAN.md` — phases, architecture, risks.
- `PRODUCT.md` — users, positioning, evidence, principles.
- `docs/andres_guerrero_cv.yaml` — CV source (the newer RenderCV version is the source of truth).
