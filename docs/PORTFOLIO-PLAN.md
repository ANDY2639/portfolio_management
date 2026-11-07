# Plan del portfolio — v2.2 (consolidado, free tier, Neon)

> **Estado:** Fase 0 en ejecución (2026-11-07).
> **Repo canónico:** `C:\Users\Administrador\Projects\portfolio_management` → remoto `ANDY2639/portfolio_management`
> **Repo legacy:** `C:\Users\Administrador\Projects\portfolio` (archivado; respaldo en `%USERPROFILE%\Backups\github`)
> **Última actualización:** 2026-11-07
> **Cambio v2.2:** se reemplaza Supabase por **Neon** (Postgres + Auth + Object Storage) y se adopta **Drizzle ORM**.

**Objetivo:** conseguir empleo remoto como Full Stack.
**Restricción:** costo $0, sin servicios de pago, máxima calidad percibida.

### Decisiones v2.2

| Decisión | v2.1 | v2.2 |
|---|---|---|
| Base de datos | Supabase Free | **Neon Free** (autosuspend, sin pausa manual) |
| ORM | `@supabase/supabase-js` | **Drizzle ORM + drizzle-kit** |
| Auth | Supabase Auth | **Neon Auth** (Managed Better Auth) |
| Storage | Supabase Storage | **Neon Object Storage** (S3-compatible) |
| Docker local | Opcional | **No se usa** (`pg_dump`/`psql` de Scoop) |
| Repo remoto | `portfolio-v2` | **`portfolio_management`** (público) |
| Repos viejos | — | `portfolio` y `portfolio-management` se eliminan (con backup) |

---

## 1. Decisión de arquitectura

**Repo canónico:** `portfolio_management` (monorepo Turborepo).

```
portfolio_management/
  apps/
    web/        Astro 6 + Preact  → Vercel (proyecto 1)
    admin/      Next 16 + React 19 → Vercel (proyecto 2)
  packages/
    contracts/  Zod (validación de formularios y API)
    data/       Drizzle: schema, cliente, queries y mappers
  db/           migraciones generadas por drizzle-kit + seeds
  docs/         plan, ADRs, runbooks, archive
```

**Por qué monorepo recortado:**

| Opción | Veredicto |
|---|---|
| `portfolio` solo (Astro) | Simple y $0, pero no muestra monorepo ni panel separado |
| Monorepo completo (Nest + Prisma + Railway) | Mejor showcase teórico, pero Railway es pago y suma ~3 semanas |
| **Monorepo recortado + Neon** | **$0 real, narrativa senior (monorepo, Drizzle, 2 apps, auth propia), sin pausas** |
| Mantener ambos | Duplica contenido y trabajo. Descartado |

**Repo público.** El código es parte del portfolio y branch protection es gratis en repos públicos.

---

## 2. Auditoría

### `portfolio` (legacy, archivado)

Producto real en Astro con Supabase. Problemas principales:

1. `.env.local` con `SUPABASE_SERVICE_KEY` fuera de `.gitignore` (se corrigió antes de archivar).
2. Todo el trabajo estaba sin commitear: se commiteó en `680c9d3` y se respaldó en un bundle local.
3. Build publica vacío si la DB falla (fallback silencioso).
4. `es/` y `en/` duplicados con `lang` hardcodeado.
5. Sin CI, lint, tests, sitemap, canonical, hreflang, OG ni JSON-LD.
6. Contraste `--fg-3 #555` sobre `#0a0a0a` ≈ 3.3:1 (falla AA).
7. `ThemeToggle` con `role="listbox"` y sin teclado.
8. Skip-link invisible; Google Fonts bloqueando render.
9. `README.md` referencia una migración que no existe; el SQL real es `portfolio_full.sql`.

### `portfolio_management` (monorepo)

**Bien:** Turborepo + pnpm, Oxlint/Oxfmt, `.gitignore` correcto, i18n ya configurado.

**Problemas corregidos o pendientes:**

1. `apps/web` era idéntico al legacy. Ya es la única copia.
2. Contracts no coinciden con la DB real (se reescriben en Fase 1).
3. Tests validaban un fixture inventado (se eliminan y se reemplazan por dump real).
4. `apps/api` devolvía mocks y se archivó fuera del workspace.
5. `apps/admin` sigue siendo el starter de `create-next-app`.
6. `turbo` estaba en `"latest"`: ya está pinchado a `2.9.18`.
7. `portfolio_system_prompt.md` (spec v1 con Nest/Prisma/Railway) estaba en la raíz: movido a `docs/archive/`.
8. Sin CI ni remoto: se resuelven en esta fase y en Fase 6.

---

## 3. Arquitectura free tier

```
GitHub público (main protegido)
   │  PR → CI + Vercel Preview (opcional Neon branch)
   ▼
Vercel Hobby ($0)
   ├─ apps/web    → SSG + 1 función (/api/contact)
   └─ apps/admin  → panel privado, SSR (noindex)
          │
          ▼
Neon Free ($0)
   ├─ Postgres     → contenido + contact_messages + audit_log
   ├─ Neon Auth    → 1 usuario admin (Managed Better Auth)
   ├─ Object Storage → covers, OG, foto, CV
   └─ Branches     → preview por PR (opcional)
   │
   ├─ Resend Free  → 100 emails/día
   ├─ Turnstile    → anti-spam
   └─ GitHub Actions → CI, migraciones, backup
```

**Nada de:** Supabase, Railway, R2, Redis, Sentry pago, dominio.
**Opcional futuro:** dominio (~$12/año) y analytics sin cookies (Cloudflare/Vercel).

### Límites free que condicionan el diseño

| Límite | Impacto | Mitigación |
|---|---|---|
| Neon Free: 0.5 GB storage y ~192 h de compute/mes | Suficiente para un portfolio; el compute se apaga solo | SSG: la DB se consulta en build, no en cada visita; conexiones pooled |
| Autosuspend (scale-to-zero) | Primer query tras inactividad tarda ~500 ms | Solo afecta builds y admin; la web estática no lo nota |
| Object Storage free | Imágenes deben comprimirse | WebP 1600px, máx 300 KB por cover |
| Resend 100/día sin dominio | Solo envía a tu email | Suficiente; `reply_to` del visitante |
| Turnstile requiere hostname | No valida en localhost por defecto | Agregar `localhost` y `*.vercel.app` |
| Vercel Hobby: 100 GB/mes | Sitio liviano | Imágenes optimizadas + CDN |
| GitHub Actions 2000 min/mes | CI en monorepo | `turbo-ignore` + caché de pnpm |

### Seguridad del formulario de contacto

`contact_messages` no se expone a `anon`. El API route de Astro corre en servidor con `DATABASE_URL`, valida con Zod, aplica rate limit por hash de IP con sal y hace el insert con Drizzle. Resend envía la notificación. El formulario muestra aviso de privacidad.

---

## 4. Fases (orden de ejecución)

### Fase 0 — Seguridad y consolidación (en curso)

1. Legacy: `.gitignore` con `.env*`, commit del producto real (`680c9d3`) y bundle local.
2. Repos viejos de GitHub: backup espejo y borrado (`portfolio`, `portfolio-management`).
3. Neon: CLI 9.2.0, login, MCP + 7 skills, proyecto `portfolio` (`ancient-term-72556472`).
4. `DATABASE_URL` (pooled) y `DATABASE_URL_UNPOOLED` en `apps/web/.env.local`.
5. `supabase/` archivado en `docs/archive/supabase/` como referencia del esquema.
6. `apps/api` eliminado del workspace; contracts fuera de web/admin.
7. Node 24, `turbo` pinchado, `.gitignore` endurecido, rama `main`.
8. `pnpm install` + `pnpm build`.
9. Repo `portfolio_management` público + branch protection.

**DoD:** un solo repo activo, legacy preservado, Neon listo, build verde.

---

### Fase 1 — Datos reales con Drizzle (1 semana)

1. **Schema Drizzle** derivado de `docs/archive/supabase/migrations/portfolio_full.sql`:
   - `profile`, `skills`, `experience`, `education`, `certifications`, `projects`.
   - Nombres snake_case en DB, camelCase en los tipos generados.
2. **`packages/data`:**
   - `db/schema.ts`, `db/index.ts` (cliente pooled con `@neondatabase/serverless` o `postgres`).
   - Queries tipadas: `getSiteContent()`, `getPostBySlug()`, `listProjects()`.
   - Mappers para no tocar los componentes.
3. **Migraciones:** `drizzle-kit generate` + `drizzle-kit migrate` contra `DATABASE_URL_UNPOOLED`.
4. **Seed:** convertir los `insert` del SQL legacy a `db/seed.ts` (UTF-8 verificado).
5. **Contracts:** solo Zod para formularios; eliminar ts-rest y los schemas desalineados.
6. **Web:** reemplazar `portfolio-data.ts` y `supabase.ts` por `@portfolio/data`; borrar `types.ts` duplicado.
7. **Env validado con Zod** en web y admin; fail-fast en producción.
8. **Tests:** Vitest para mappers y validadores; fixture generado desde un dump real (`pg_dump --data-only`).
9. **Scaffold Playwright** (home, idioma, tema).

**DoD:** web y admin leen la misma capa Drizzle; migraciones reproducibles; tests verdes contra datos reales.

---

### Fase 2 — Web: a11y, SEO, performance (1 semana) · `impeccable`

1. Refactor es/en: deduplicar 5 páginas × 2 idiomas (`Astro.currentLocale`).
2. A11y: skip-link visible, `ThemeToggle` accesible, reduced-motion, contraste AA, menú móvil como diálogo.
3. SEO: canonical, hreflang, OG/Twitter, sitemap, robots, JSON-LD `Person` + `ProfilePage`, 404 bilingüe.
4. Performance: JetBrains Mono self-host, `astro:assets`, presupuesto Lighthouse ≥95 y LCP < 2 s.
5. Narrativa de contratación: disponibilidad, `/cv`, tiempos de respuesta, stack.
6. `DESIGN.md` y `README.md` raíz con arquitectura y ADRs.
7. Analytics sin cookies (Cloudflare o Vercel).

**DoD:** Lighthouse verde, `DESIGN.md` y README publicados, EN a la par de ES.

---

### Fase 3 — Contenido: casos, blog y CV (1 semana) · `humanizer`, `media-use`

**DB (migración Drizzle):** `projects` gana `slug`, `problem`, `role`, `outcome`, `metrics`, `cover_url`, `featured`, `year`; se agregan `posts` y `project_media`.

**Casos (4-6):** `microservices/nexora`, `gen-anel`, `prowler`, `Ventori`, `automations/youtube`, `liquid-gauge`.
Formato: contexto → problema → rol → decisiones → stack → resultado medible → demo/repo.

**Blog:** `/blog` + `/blog/[slug]` + `/en/blog`, markdown sanitizado, RSS por idioma.

**CV:** `docs/andres_guerrero_cv.yaml` → `rendercv` en CI → PDFs bilingües + página `/cv`.

**DoD:** 4+ casos, 2+ posts, CV descargable. Si el tiempo aprieta, el blog es el primer recorte.

---

### Fase 4 — Deploy en Vercel (1-2 días)

1. `apps/web`: Root Directory `apps/web`, `@astrojs/vercel`, `output: 'static'`.
2. `apps/admin`: Root Directory `apps/admin`, Next 16 SSR.
3. `turbo-ignore` en ambos proyectos.
4. **Secrets:**

   | Variable | Dónde |
   |---|---|
   | `DATABASE_URL`, `DATABASE_URL_UNPOOLED` | web + admin |
   | `NEON_AUTH_*` (URL/secret) | admin |
   | Object Storage: endpoint, bucket, access key, secret | admin / web |
   | `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` | web |
   | `PUBLIC_TURNSTILE_SITE_KEY` | web |
   | `ADMIN_EMAILS`, `DEPLOY_HOOK_URL` | admin |
   | `VERCEL_TOKEN` | GitHub Actions |

5. CSP en `Report-Only` primero; HSTS, `X-Content-Type-Options`, `Referrer-Policy`, cache inmutable.
6. Dominio temporal `*.vercel.app`; switch documentado.

**DoD:** web pública con contenido real, admin privado, previews por PR, rollback probado, $0.

---

### Fase 5 — Contacto real (2-3 días)

- `apps/web/src/pages/api/contact.ts` con `prerender = false`.
- Zod → honeypot → Turnstile → rate limit por hash de IP con sal → insert con Drizzle.
- Resend con `reply_to`; estados accesibles (`aria-live`).
- Aviso de privacidad.

**DoD:** el mensaje llega y queda en DB; spam y flood bloqueados; E2E verde.

---

### Fase 6 — CI/CD (3-4 días)

| Workflow | Trigger | Acción |
|---|---|---|
| `ci.yml` | PR + main | pnpm cache, lint, `types:check`, test, build filtrado |
| `e2e.yml` | PR | Playwright contra preview + axe |
| `lighthouse.yml` | PR | presupuesto de performance |
| `db-migrate.yml` | main con cambios en `db/migrations/**` | `drizzle-kit migrate` con `DATABASE_URL_UNPOOLED` |
| `db-backup.yml` | semanal | `pg_dump` cifrado como artifact |
| `cv.yml` | cambio en el YAML | RenderCV → PDFs |
| `codeql.yml` | semanal | análisis estático |

Actualizaciones: Dependabot/Renovate semanal, release-please, migraciones expand/contract, rollback con "Promote to Production", rotación de secretos cada 90 días, runbooks en `docs/runbooks/`.

**DoD:** PR no mergea sin CI; migraciones automáticas; rollback probado.

---

### Fase 7 — Admin Next.js completo (1.5-2 semanas)

- `/login` con **Neon Auth** (Managed Better Auth) y **`proxy.ts`** (Next 16 deprecó `middleware.ts`; runtime `nodejs`).
- Guard por rol admin en `app_metadata`/tabla de usuarios.
- Módulos: profile, skills, experience, education, certifications, projects/casos, posts (Markdown + preview), media library (Object Storage), inbox, audit log.
- Guardar → Deploy Hook con debounce 30 s.
- `noindex` + `X-Robots-Tag`.
- UI con el lenguaje visual terminal (`impeccable`).

**DoD:** editar todo sin SQL; cambios públicos en <2 min; `/admin` inaccesible sin sesión.

---

### Fase 8 — Testing y pulido (transversal)

- Vitest en `packages/data`: mappers, fechas, validadores.
- Tests de schema contra dump real.
- Playwright: home, idioma, tema, filtros, formulario, guard de admin, axe.
- Manual: iOS Safari, Android Chrome, teclado, zoom 200%, NVDA/VoiceOver.

---

## 5. Cronograma (part-time, 10 semanas)

| Semana | Fase | Entregable |
|---|---|---|
| 1 | 0 | Repo único, legacy preservado, Neon listo, build verde, repo público |
| 2 | 1 | Drizzle + `packages/data` + migraciones + tests |
| 3 | 2 | A11y, SEO, performance, `DESIGN.md`, README |
| 4 | 3 | 4 casos, 2 posts, CV PDF |
| 5 | **4 Deploy** | **Web online** |
| 6 | 5 + inicio 6 | Contacto real + CI base |
| 7-8 | 7 | Admin completo |
| 9 | 6 + 8 | Workflows restantes, Lighthouse, backup, runbooks |
| 10 | 8 | Pulido, a11y manual, launch |

---

## 6. Costos

| Servicio | Plan | Costo |
|---|---|---|
| Vercel Hobby (2 proyectos) | free | $0 |
| Neon Free (Postgres + Auth + Object Storage) | free | $0 |
| Resend Free (100/día) | free | $0 |
| Cloudflare Turnstile | free | $0 |
| GitHub + Actions (2000 min) | free | $0 |
| UptimeRobot | free | $0 |
| **Total** | | **$0/mes** |

---

## 7. Riesgos

| Riesgo | Mitigación |
|---|---|
| Neon cold start en build | La DB se calienta en build; la web es estática |
| Límite de compute de Neon | Consultas en build + admin; cachear lo público |
| Migración de Supabase a Drizzle | Schema derivado del SQL real; seed verificado |
| Auth con Neon Auth en preview | Un solo admin; probar login en preview antes del launch |
| Object Storage mal configurado | Presigned URLs y bucket privado; probar upload en Fase 7 |
| Contenido EN incompleto | CI exige `es` y `en` por post/caso publicado |
| Scope creep (NestJS, analytics pagos, R2) | Congelados hasta que el sitio esté online |
| Borrado de repos viejos | Backups espejo en `%USERPROFILE%\Backups\github` |

---

## 8. Checklist de arranque

- [x] Neon: CLI, login, MCP y 7 skills
- [x] Proyecto Neon `portfolio` creado
- [x] Legacy commiteado y respaldado
- [x] Repos viejos de GitHub eliminados (con backup)
- [x] `DATABASE_URL` y `DATABASE_URL_UNPOOLED` en `apps/web/.env.local`
- [x] SQL legacy archivado en `docs/archive/supabase/`
- [x] `apps/api` fuera del workspace; contracts quitado de web/admin
- [x] `.nvmrc` 24, `turbo` pinchado, `.gitignore` endurecido, rama `main`
- [x] `pnpm install` + `pnpm build` verde (10 páginas)
- [x] Repo `portfolio_management` público + branch protection
- [x] Cero secretos en el historial

### Notas de la Fase 0

- `pnpm build`: verde. La web compila y genera 10 páginas; el contenido sigue vacío porque aún lee Supabase (se corrige en Fase 1).
- `pnpm types:check`: 0 errores.
- `pnpm lint`: 9 errores preexistentes en `apps/web` (TypeScript/React) que se corrigen en Fase 2. Se añadió `oxlint-tsgolint` y se corrigieron dos reglas inválidas de la config.
- Se eliminó el override global de `zod` (forzaba Zod 3 y rompía Astro 6, que requiere Zod 4).

---

## 9. Próximo paso

Cerrar la Fase 0 (build verde + push) y arrancar la Fase 1: schema Drizzle desde `portfolio_full.sql`, migraciones en Neon y `packages/data` consumido por web y admin.
