# Portfolio System Prompt (Fullstack Architecture)

## Goal
Build a dynamic portfolio system with:
- Public landing (Astro - already done)
- Private admin (Next.js)
- API (NestJS + ts-rest)
- Database (PostgreSQL via Prisma)
- Auth (JWT + HTTP-only cookies + refresh tokens)
- Infrastructure (Vercel + Railway)

---

## Architecture Overview
- Monorepo (Turborepo)
- Apps:
  - web (Astro)
  - admin (Next.js)
  - api (NestJS)
- Packages:
  - contracts (ts-rest)
  - ui (shared components)

---

## Backend (NestJS)
- Use Clean Architecture:
  - Controller (ts-rest handlers)
  - UseCases
  - Repositories
- ORM: Prisma
- Database: PostgreSQL

### Modules:
- auth
- projects
- posts
- analytics

---

## Contracts (ts-rest + Zod)
- Define all endpoints in contracts package
- Share types between frontend and backend
- Use Zod for validation

---

## Authentication
- JWT Access Token (15 min) via HTTP-only cookie
- Refresh Token (14 days) stored hashed in DB
- Cookie config:
  - httpOnly
  - secure (prod)
  - sameSite=lax

### Features:
- Login
- Refresh token rotation
- Logout
- Role-based access (ADMIN, EDITOR)

---

## Security
- Rate limiting on auth endpoints
- Password hashing (bcrypt)
- CSRF protection (recommended next step)

---

## Admin App (Next.js)
- Features:
  - Login
  - CRUD Projects
  - CRUD Posts
  - MDX Editor
  - Dashboard analytics

- Use:
  - React Hook Form
  - Zod
  - Fetch with credentials: include

---

## Landing (Astro)
- Fetch data from API
- Use Islands for:
  - Likes
  - Views
  - Filters

---

## Analytics
- Track:
  - Page views
  - Clicks

- Dashboard in admin:
  - Total views
  - Top projects

---

## Infra
- Frontend: Vercel
- API: Railway
- DB: Supabase
- Storage: Cloudflare R2

---

## Dev Workflow
1. Start API
2. Start Admin
3. Connect contracts
4. Test endpoints
5. Deploy

---

## Future Improvements
- Redis caching
- Feature flags
- AI assistant
- Public API

---

End of system prompt.
