# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Reclutadores técnicos y hiring managers de empresas globales que contratan roles full-time remotos de software. Evalúan el portfolio en paralelo con LinkedIn y el CV, muchas veces en escritorio y en una primera pasada de 30 a 90 segundos. Buscan encaje de rol, seniority, dominio de negocio, evidencia verificable y comunicación en inglés.

## Product Purpose

Portfolio personal de Andrés Felipe Guerrero Novoa para conseguir empleo full-time remoto como Full Stack Developer. Existe para convertir una visita de un reclutador en una conversación o entrevista. El éxito se mide en contactos calificados y entrevistas, no en tráfico.

## Positioning

Ingeniero full-stack end-to-end con profundidad real en banca y fintech: puede discutir arquitectura de microservicios, modelado de datos y entrega de producto, y también construir la interfaz. A eso se suma experiencia aplicando herramientas de IA y flujos agénticos al ciclo de desarrollo. La combinación —dominio fintech + recorrido completo de arquitectura a UI + entrega bilingüe— es lo que un perfil generalista no puede copiar con honestidad.

## Operating Context

- El reclutador llega desde LinkedIn, una aplicación o una búsqueda, y compara contra otros portfolios y contra el CV en PDF.
- La evaluación inicial es en inglés; el sitio debe ser completo en ES y EN, con el inglés como camino principal para el mercado global.
- El contenido se actualiza en Neon (SQL Editor) y el sitio publicado es estático: un cambio de datos requiere redeploy.
- Todavía no hay panel de administración; la edición es por base de datos.
- El portfolio también funciona como demostración del stack: monorepo, Astro, Drizzle, Neon y despliegue estático.

## Capabilities and Constraints

- `apps/web` es un sitio Astro 6 estático, bilingüe ES/EN, con estética terminal.
- Los datos viven en Neon Postgres y se leen en build con Drizzle; no hay base de datos local ni Supabase.
- Existen: perfil, 7 experiencias, 1 educación, 5 grupos de skills, 43 certificaciones (12 publicadas) y CV en YAML.
- Pendiente: casos de estudio reales, blog, formulario de contacto, panel de administración y deploy en Vercel.
- Restricción de costo: $0/mes; Vercel Hobby, Neon Free, Resend Free y Turnstile.
- No se inventan métricas, clientes, testimonios ni resultados. Lo que no esté confirmado queda como decisión abierta.

## Brand Commitments

- Nombre público: Andrés Felipe Guerrero Novoa; forma corta: Andrés Guerrero.
- Identidad existente: terminal/dev, prompt `ag@portfolio`, marca `[ag]`, acento verde y voz directa en primera persona.
- El sitio se presenta como una herramienta de trabajo, no como una landing publicitaria.
- El CV y el portfolio comparten la misma verdad factual: roles, fechas, tecnologías y certificados.

## Evidence on Hand

- CV fuente: `C:\Users\Administrador\Projects\rendercv\themes\atscv\cv.es.yaml` y `cv.en.yaml` (la versión más reciente; el YAML de `docs/` es anterior).
- Datos sembrados: `packages/data/seed/data.json` y `db/migrations/`.
- 7 experiencias laborales (2018–2026), incluida banca/fintech en Idea Latente.
- 43 certificados reales de Platzi, 12 publicados en el sitio.
- 46 skills en 5 grupos.
- El usuario confirmó que existen 4–6 proyectos reales con links y métricas publicables para los casos de estudio; todavía no están enumerados en el repo.
- Ausencias que no se deben fabricar: testimonios, logos de clientes, métricas de negocio no verificadas y casos con nombres de clientes sin permiso.

## Product Principles

1. **Evidencia antes que adjetivos.** Cada afirmación se sostiene con un repo, una métrica, un artefacto o una experiencia verificable.
2. **Treinta segundos para el encaje, profundidad bajo demanda.** Rol, dominio y prueba visible arriba; los casos de estudio sostienen la conversación.
3. **Inglés primero, bilingüe de verdad.** El evaluador global debe poder recorrer todo el sitio en inglés; el español queda completo, no como traducción de segunda.
4. **El portfolio es la demostración.** La calidad del propio sitio —performance, accesibilidad, código— es parte de la prueba.
5. **Mantenimiento bajo y costo cero.** Estático, sin dependencias pagas, con actualizaciones por base de datos y redeploy.

## Accessibility & Inclusion

Objetivo: WCAG 2.2 AA. Navegación completa por teclado, foco visible, contraste AA, soporte de `prefers-reduced-motion`, formularios con estados accesibles y contenido bilingüe con `lang` correcto.
