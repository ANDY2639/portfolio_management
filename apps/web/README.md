# Portfolio MVP (Astro + Supabase)

MVP de portfolio en Astro con estrategia **SSG-first** y contenido dinámico desde Supabase para:

- Skills
- Experience
- Education

## Setup rápido

1. Instalá dependencias:

```bash
pnpm install
```

2. Copiá variables de entorno:

```bash
cp .env.example .env
```

3. Completá en `.env`:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

> Nunca expongas `service_role` en cliente.

4. Levantá desarrollo:

```bash
pnpm dev
```

## Scripts

- `pnpm dev` — entorno local
- `pnpm build` — build de producción
- `pnpm preview` — preview local de build
- `pnpm check` — chequeo de tipos Astro/TS

## UI conventions

- El sistema visual usa design tokens CSS en `src/layouts/Layout.astro` (`:root`): color, spacing, radios, sombras y escala tipográfica.
- La homepage mantiene render SSG-first y datos dinámicos desde Supabase para `skills`, `experience` y `education`.
- Se prioriza layout mobile-first y accesibilidad base (landmarks, jerarquía de headings, `skip-link`, focus visible).

## Base de datos (versionada)

Migración inicial incluida en:

`supabase/migrations/20260502012000_portfolio_mvp.sql`

Incluye:

- Tablas `skills`, `experience`, `education`
- Índices de publicación/orden
- Trigger global `set_updated_at`
- RLS con lectura pública sólo para contenido `is_published = true`

> Esta migración está lista para aplicar en Supabase, pero en este MVP no se aplica en remoto automáticamente.
