# Plan del portfolio — v2 (consolidado, 100% free tier)

> **Estado:** planificación cerrada. Implementación **no iniciada**.
> **Repo canónico:** `C:\Users\Administrador\Projects\portfolio_management`
> **Repo legacy:** `C:\Users\Administrador\Projects\portfolio` (archivar, solo lectura)
> **Última actualización:** 2026-11-06

**Objetivo:** conseguir empleo remoto como Full Stack.
**Restricción:** costo $0, sin servicios de pago, máxima calidad percibida.
**Repos revisados:** `portfolio` (legacy) y `portfolio_management` (canónico)
**Fecha:** 2026-11-06

---

## 1. Decisión de arquitectura

**Repo canónico:** `portfolio_management` (monorepo Turborepo).
**Recorte:** se elimina `apps/api` (NestJS + Prisma) del v1.
**Resultado:**

```
portfolio_management/
  apps/
    web/        Astro 6 + Preact  → Vercel (proyecto 1)
    admin/      Next 16 + React 19 → Vercel (proyecto 2)
  packages/
    contracts/  Zod + ts-rest (tipos y validación compartidos)
    data/       (nuevo) cliente Supabase + queries compartidas
  supabase/     migraciones + seed + config (movido desde portfolio)
```

**Por qué esta y no las otras:**

| Opción | Veredicto |
|---|---|
| `portfolio` solo (Astro) | Simple y $0, pero no muestra monorepo ni panel separado. Menos señal para un rol full stack |
| Monorepo completo (Nest + Prisma + Railway) | Mejor showcase teórico, pero Railway es pago, 3 runtimes y ~3 semanas extra. Riesgo alto de no terminar |
| **Monorepo recortado** | **$0 real, narrativa senior (monorepo, contracts, 2 apps), una sola DB, mantenimiento manejable** |
| Mantener ambos | Duplica contenido y trabajo. Descartado |

**Justificación para el objetivo (empleo remoto):** un reclutador ve un sitio rápido, bilingüe, con casos de estudio medibles y un panel real. La arquitectura se explica en un README, no se demuestra con servicios pagos. El mejor portfolio es el que está online y se mantiene.

---

## 2. Auditoría de los dos repos

### `portfolio` (app Astro única)

**Bien:** datos normalizados en `src/lib/portfolio-data.ts`, RLS por `is_published`, identidad visual propia, islas con `client:visible`.

**Problemas:**
1. `.env.local` con `SUPABASE_SERVICE_KEY` **fuera de `.gitignore`**.
2. Todo el trabajo real sin commitear; repo sin remoto.
3. Build publica vacío si Supabase falla (fallback silencioso).
4. `es/` y `en/` duplicados, `lang` hardcodeado.
5. Sin CI, lint, tests, sitemap, canonical, hreflang, OG ni JSON-LD.
6. Contraste `--fg-3 #555` sobre `#0a0a0a` ≈ 3.3:1 (falla AA).
7. `ThemeToggle` con `role="listbox"` mal usado y sin teclado.
8. Skip-link invisible; Google Fonts bloqueando render.
9. SQL manual, README apunta a un archivo inexistente, mojibake UTF-8.

### `portfolio_management` (monorepo)

**Bien:** Turborepo + pnpm workspaces, Oxlint/Oxfmt, ts-rest con OpenAPI, `.gitignore` correcto (ignora `.env.local`).

**Problemas:**
1. **`apps/web` es byte a byte idéntico a `portfolio`.** Dos fuentes de verdad.
2. **Los contracts no coinciden con la DB real:**
   - `profile`: `display_name`/`terminal_user`/`bio_es_*` vs `full_name`/`bio`/`avatar_url`.
   - `experience`: `role`/`summary`/`is_current` vs `position`/`description`/`employment_type`.
   - `certifications`: `issued_date`/`url` vs `issue_date`/`credential_url`.
   - `projects`: `repo_url`/`demo_url`/`tags` vs `github_url`/`live_url`/`image_url`.
3. **Tests que validan ficción:** el fixture `supabase-public-sample.json` fue inventado para coincidir con los schemas, no exportado de la DB.
4. `@portfolio/contracts` es dependencia muerta en `web` y `admin` (solo la usa `api`).
5. `apps/api` devuelve **datos mock**; sin Prisma, sin auth, sin posts, sin analytics.
6. `apps/admin` es el starter de `create-next-app`.
7. `turbo.json` sin tarea `test`; `contracts` sin `types:check` ni `format`.
8. Sin `Dockerfile`, `vercel.json`, CI ni remoto. `node_modules` no instalado.
9. `.env.local` duplicado con la misma service key.

### Conclusión

El monorepo tiene el andamiaje correcto y el `portfolio` tiene el producto real. La jugada es **unificarlos**, no elegir uno.

---

## 3. Arquitectura free tier

```
GitHub (main protegido, 1 repo)
   │  PR → CI + Vercel Preview
   ▼
Vercel Hobby ($0)
   ├─ apps/web    → dominio público, SSG + 1 función (/api/contact)
   └─ apps/admin  → panel privado, SSR (noindex)
          │
          ▼
Supabase Free ($0)
   ├─ Postgres 500 MB  → contenido + contact_messages + audit_log
   ├─ Auth             → 1 usuario admin
   └─ Storage 1 GB     → covers, OG, foto, CV
   │
   ├─ Resend Free      → 100 emails/día (notificación de contacto)
   ├─ Turnstile Free   → anti-spam
   └─ GitHub Actions   → CI, migraciones, backup, ping anti-pausa
```

**Nada de:** Railway, R2, Redis, Sentry pago, dominio.
**Opcional futuro:** dominio (~$12/año) y analytics privacy-first (Umami Cloud free tier).

### Límites free que condicionan el diseño

| Límite | Impacto | Mitigación |
|---|---|---|
| Supabase pausa a los 7 días sin actividad | El sitio queda sin datos y el admin sin DB | Cron de GitHub Actions cada 3 días contra `/rest/v1/` + uptime monitor |
| Supabase 1 GB Storage | Imágenes deben comprimirse | WebP 1600px, máx 300 KB por cover, limpieza de huérfanos |
| Resend 100/día y sin dominio | Solo se puede enviar a tu propio email | Suficiente: el formulario te notifica a vos; `reply_to` del visitante |
| Turnstile requiere hostname | No valida en localhost por defecto | Agregar `localhost` y `*.vercel.app` en el dashboard |
| Vercel Hobby: 100 GB/mes | Sitio liviano | Imágenes optimizadas + cache CDN |
| GitHub Actions 2000 min/mes | CI en monorepo | `turbo-ignore` + caché de pnpm |

---

## 4. Fases

### Fase 0 — Seguridad y consolidación (3-5 días)

1. **Rotar `SUPABASE_SERVICE_KEY`** en Supabase. Verificar `git log --all -- .env.local` en ambos repos.
2. `.gitignore` del standalone: agregar `.env*` + `!.env.example`.
3. **Repo canónico:** `portfolio_management`.
   - Mover `supabase/` (migraciones, `config.toml`) a la raíz del monorepo.
   - Confirmar que `apps/web` ya tiene el contenido actual (lo tiene, idéntico).
   - Mover `andres_guerrero_cv.yaml` a `packages/cv/` o `docs/`.
4. **Archivar `portfolio`:** push a un repo privado `portfolio-legacy` y dejar un README que apunte al monorepo. No borrar.
5. **Sacar `apps/api` del workspace:** mover a `_archive/api` (fuera de `apps/*`) o a una branch `legacy/api`. Se conserva como muestra, no se buildea.
6. `.nvmrc` = 22. Unificar `packageManager` (el monorepo usa pnpm 10.33.4).
7. `pnpm install` + `pnpm build` en verde.
8. Commit + repo privado en GitHub + branch protection en `main`.

**DoD:** un solo repo activo, service key rotada, build completo verde.

---

### Fase 1 — Contracts y datos reales (1 semana)

1. **Baseline de DB:** `supabase db pull` contra el proyecto linkeado → `supabase/migrations/2026..._init.sql` + `seed.sql`. Reescribir en UTF-8 (hoy hay mojibake).
2. **Reescribir `packages/contracts`** contra el SQL real:
   - Alinear nombres (`role`, `summary`, `is_current`, `issued_date`, `repo_url`…).
   - `SkillCategorySchema` como `z.string()` (la DB no tiene CHECK) o agregar el CHECK en la migración.
   - Eliminar `fixtures/supabase-public-sample.json` inventado.
3. **Fixture real:** `supabase db dump --data-only` en CI → test que valide los schemas contra ese dump. Así el test prueba la DB, no una fantasía.
4. **`packages/data` (nuevo):**
   - `createBrowserClient()` y `createServerClient()`.
   - Queries tipadas: `getSiteContent()`, `getPostBySlug()`, `listProjects()`.
   - Consumido por `apps/web` y `apps/admin`. Elimina `apps/web/src/lib/portfolio-data.ts`.
5. **Tipos generados:** `supabase gen types typescript --linked > packages/data/src/database.types.ts`.
6. **Env validado con Zod** en web y admin; fail-fast en producción.
7. **`apps/web`** consume los tipos de `@portfolio/contracts` (se borra `src/lib/types.ts`).

**DoD:** contracts verdes contra un dump real; web y admin comparten una sola capa de datos.

---

### Fase 2 — Web: pulido visual, a11y, SEO, performance (1 semana) · `impeccable`

1. **Refactor es/en:** extraer `HomePage.astro`, `AboutPage.astro`, etc. `lang` desde `Astro.currentLocale`.
2. **A11y:** skip-link visible, `ThemeToggle` accesible (menu, flechas, Escape, click-outside), `prefers-reduced-motion`, contraste AA, menú móvil como diálogo.
3. **SEO:** `SEO.astro` con canonical, hreflang es/en/x-default, OG/Twitter, `og:image`; `@astrojs/sitemap`; `robots.txt`; JSON-LD `Person` + `ProfilePage`; `404` bilingüe.
4. **Performance:** JetBrains Mono self-host (`@fontsource`, subset latin), `astro:assets`, `image.remotePatterns` para Supabase Storage. Presupuesto Lighthouse ≥95, LCP < 2 s.
5. **Narrativa de contratación:** sección "disponible para" + `/cv` descargable + tiempos de respuesta + stack destacado.

**DoD:** auditoría sin hallazgos críticos, `DESIGN.md` versionado, Lighthouse verde, versión EN a la par de ES.

---

### Fase 3 — Contenido: casos de estudio, blog y CV (1 semana) · `humanizer`, `media-use`

**DB (migración nueva):**

```sql
alter table projects
  add column slug text unique,
  add column problem text,
  add column role text,
  add column outcome text,
  add column metrics jsonb default '[]',
  add column cover_url text,
  add column featured boolean default false,
  add column year int;

create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  lang text not null check (lang in ('es','en')),
  title text not null,
  excerpt text,
  body text not null,
  cover_url text,
  tags text[] default '{}',
  published_at timestamptz,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  url text not null,
  kind text check (kind in ('image','diagram','video')),
  caption text,
  sort_order int default 0
);
```

RLS: lectura pública solo `is_published`; escritura solo `authenticated` con claim admin.

**Casos de estudio (4-6):** `microservices/nexora`, `gen-anel`, `prowler`, `Ventori`, `automations/youtube`, `liquid-gauge`.
Formato: contexto → problema → rol → decisiones → stack → resultado medible → demo/repo.

**Blog:** `/blog` + `/blog/[slug]` + `/en/blog`, markdown sanitizado (`rehype-sanitize`), RSS por idioma.

**CV:** `andres_guerrero_cv.yaml` como fuente única → `rendercv` en CI → `public/cv/andres-guerrero-{es,en}.pdf` + página `/cv`.

**DoD:** 4+ casos publicados, 2+ posts, CV descargable en ambos idiomas.

---

### Fase 4 — Contacto real (2-3 días)

- `apps/web/src/pages/api/contact.ts` con `prerender = false` + `@astrojs/vercel`.
- Zod → honeypot → Turnstile → rate limit por `ip_hash` (conteo en `contact_messages`, 60 min) → insert con policy `insert` para `anon` → Resend a tu email con `reply_to`.
- UI con estados accesibles (`aria-live`), sin recarga.

**DoD:** mensaje llega y queda en DB; spam y flood bloqueados; E2E verde.

---

### Fase 5 — Admin Next.js (1-1.5 semanas)

- `/login` + middleware de sesión con `@supabase/ssr` (cookies httpOnly).
- Guard por `app_metadata.role = 'admin'`; la `SERVICE_KEY` solo en el servidor de Vercel.
- Módulos: profile, skills (drag & drop), experience, education, certifications, projects/casos, posts (editor Markdown con preview), media library (Storage), inbox de contacto, audit log.
- Guardar → Deploy Hook de `apps/web` con debounce 30 s.
- `noindex` + `X-Robots-Tag` en todas las rutas.
- UI con el mismo lenguaje visual terminal (skill `impeccable`).

**DoD:** editar todo sin SQL; cambios públicos en <2 min; `/admin` inaccesible sin sesión.

---

### Fase 6 — Deploy en Vercel (1-2 días, $0)

1. `apps/web`: **Root Directory** `apps/web`, `@astrojs/vercel`, `output: 'static'`, una función `/api/contact`.
2. `apps/admin`: **Root Directory** `apps/admin`, Next 16, SSR.
3. **Ignored Build Step:** `npx turbo-ignore` en ambos proyectos → solo redeploya lo afectado.
4. Env por proyecto (Production/Preview/Development): `PUBLIC_SITE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (solo admin), `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `PUBLIC_TURNSTILE_SITE_KEY`, `ADMIN_EMAILS`, `DEPLOY_HOOK_URL`.
5. Headers: CSP (Supabase, Turnstile), HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, cache inmutable `/_astro/*`.
6. Dominio: `portfolio-<hash>.vercel.app` ahora; documentar el switch a dominio propio.
7. Uptime + ping anti-pausa de Supabase.

**DoD:** web pública HTTPS, admin privado, previews por PR, rollback probado, $0.

---

### Fase 7 — CI/CD y actualizaciones (3-4 días)

| Workflow | Trigger | Acción |
|---|---|---|
| `ci.yml` | PR + main | pnpm cache, `turbo lint`, `types:check`, `test`, `build` con `--filter=...[origin/main]` |
| `e2e.yml` | PR | Playwright contra preview + `axe` |
| `lighthouse.yml` | PR | presupuesto de performance |
| `db-migrate.yml` | main con cambios en `supabase/migrations/**` | `supabase db push` |
| `db-backup.yml` | semanal | `supabase db dump` cifrado como artifact |
| `keepalive.yml` | cada 3 días | ping a Supabase para evitar la pausa |
| `cv.yml` | cambio en el YAML | `rendercv render` → PDFs a `apps/web/public/cv/` |
| `codeql.yml` | semanal | análisis estático |

**Actualizaciones:**
- Dependabot/Renovate semanal, agrupado. Minor/patch auto-merge con CI verde; majors (Astro, Next, Supabase) manuales.
- `release-please` con conventional commits → `CHANGELOG.md` + tags.
- Migraciones expand/contract; nunca destructivas en el mismo deploy.
- Rollback: "Promote to Production" del deploy anterior en Vercel; reversa documentada por migración.
- Rotación de secretos cada 90 días. Runbooks en `docs/runbooks/`.
- Dos carriles: contenido por `/admin` (sin deploy de código); código por PR con preview.

**DoD:** PR no mergea sin CI; migraciones automáticas; rollback probado.

---

### Fase 8 — Testing (transversal)

- **Vitest** en `packages/data`: mappers, `formatDate`, `getLangFromUrl`, validadores Zod.
- **Contracts:** test contra dump real de Supabase.
- **Playwright:** home, idioma, tema, filtro de skills, formulario, guard de admin, `axe`.
- **Manual:** iOS Safari, Android Chrome, teclado completo, zoom 200%, NVDA/VoiceOver.

---

## 5. Cronograma (part-time, 6-7 semanas)

| Semana | Fase | Entregable |
|---|---|---|
| 1 | 0 | Repo único, key rotada, build verde |
| 2 | 1 | Contracts reales + `packages/data` |
| 3 | 2 | A11y, SEO, performance, `DESIGN.md` |
| 4 | 3 | Casos, blog, CV PDF |
| 5 | 4 + inicio 5 | Contacto + auth/admin base |
| 6 | 5 | CRUD completo + inbox |
| 7 | 6 + 7 + 8 | Vercel, CI/CD, tests, launch |

---

## 6. Costos

| Servicio | Plan | Costo |
|---|---|---|
| Vercel Hobby (2 proyectos) | free | $0 |
| Supabase Free (DB + Auth + Storage) | free | $0 |
| Resend Free (100/día) | free | $0 |
| Cloudflare Turnstile | free | $0 |
| GitHub + Actions (2000 min) | free | $0 |
| UptimeRobot | free | $0 |
| **Total** | | **$0/mes** |

---

## 7. Riesgos

| Riesgo | Mitigación |
|---|---|
| Supabase Free se pausa | `keepalive.yml` cada 3 días + uptime monitor |
| Next 16 / Astro 6 son recientes | Probar el build completo antes de la Fase 2; fijar versiones exactas |
| Monorepo duplica esfuerzo si se toca el web en dos lados | `apps/web` es la única copia; `portfolio` archivado |
| Contracts vuelven a divergir | Test contra dump real en CI |
| Sin dominio | canonical y Turnstile en `*.vercel.app`; switch documentado |
| Contenido EN incompleto | CI exige `es` y `en` para cada post/caso publicado |
| Scope creep (NestJS, analytics, R2) | Congelados hasta que el sitio esté online |

---

## 8. Checklist de arranque

- [ ] Rotar `SUPABASE_SERVICE_KEY`
- [ ] `.env*` en `.gitignore` del repo legacy
- [ ] `supabase/` movido al monorepo
- [ ] `apps/api` archivado fuera del workspace
- [ ] `pnpm install` + `pnpm build` en verde
- [ ] Repo privado + branch protection
- [ ] `supabase db pull` + migraciones UTF-8
- [ ] Contracts reescritos contra la DB real
- [ ] `packages/data` compartido
- [ ] Web consume contracts
- [ ] Auditoría `impeccable`
- [ ] 2 proyectos en Vercel + env vars
- [ ] CI en verde en el primer PR
- [ ] `keepalive.yml` activo

---

## 9. Próximo paso

Pasar a un agente de implementación y ejecutar la **Fase 0**: rotar la key, consolidar en el monorepo y dejar el build verde.
