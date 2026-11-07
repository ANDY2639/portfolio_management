-- ============================================================
-- Portfolio — Andrés Felipe Guerrero Novoa
-- Setup completo: esquema + datos
-- Ejecutar en orden en el SQL Editor de Supabase
-- ============================================================


-- ════════════════════════════════════════════════════════════
-- 1. EXTENSIONES Y UTILIDADES
-- ════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ════════════════════════════════════════════════════════════
-- 2. TABLAS
-- ════════════════════════════════════════════════════════════

-- ── profile ─────────────────────────────────────────────────
create table if not exists public.profile (
  id            uuid        primary key default gen_random_uuid(),

  -- Identidad
  full_name     text        not null,
  display_name  text        not null,
  title         text        not null,
  terminal_user text        not null,

  -- Bio bilingüe
  bio_es_p1     text        not null,
  bio_es_p2     text        not null,
  bio_es_p3     text        not null,
  bio_en_p1     text        not null,
  bio_en_p2     text        not null,
  bio_en_p3     text        not null,

  -- Ubicación y disponibilidad
  location          text    not null,
  availability_open boolean not null default true,

  -- Contacto
  email    text not null,
  phone    text,
  github   text not null,
  linkedin text not null,

  -- CV
  cv_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── skills ──────────────────────────────────────────────────
create table if not exists public.skills (
  id          uuid    primary key default gen_random_uuid(),
  name        text    not null,
  category    text    not null,                          -- frontend | backend | tools | soft
  level       int     not null check (level between 1 and 5),
  icon        text,                                      -- slug de Simple Icons
  highlight   boolean not null default false,
  sort_order  int     not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── experience ──────────────────────────────────────────────
create table if not exists public.experience (
  id           uuid    primary key default gen_random_uuid(),
  company      text    not null,
  role         text    not null,
  start_date   date    not null,
  end_date     date,
  is_current   boolean not null default false,
  location     text,
  summary      text    not null,
  achievements jsonb   not null default '[]'::jsonb,    -- string[]
  technologies text[]  not null default '{}',
  sort_order   int     not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── education ───────────────────────────────────────────────
create table if not exists public.education (
  id                  uuid    primary key default gen_random_uuid(),
  institution         text    not null,
  degree              text    not null,
  field               text,
  start_date          date,
  end_date            date,
  is_current          boolean not null default false,
  description         text,
  certifications_url  text,                              -- link externo a Drive/etc.
  sort_order          int     not null default 0,
  is_published        boolean not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ── certifications ──────────────────────────────────────────
create table if not exists public.certifications (
  id           uuid    primary key default gen_random_uuid(),
  name         text    not null,
  issuer       text    not null,
  issued_date  date    not null,
  url          text,                                     -- link al certificado
  keywords     text[]  not null default '{}',            -- deben coincidir con skills.name
  sort_order   int     not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── projects ────────────────────────────────────────────────
create table if not exists public.projects (
  id           uuid    primary key default gen_random_uuid(),
  name         text    not null,
  description  text,                          -- opcional
  repo_url     text,                          -- URL repositorio remoto
  demo_url     text,                          -- URL demo desplegada, opcional
  tags         text[]  not null default '{}', -- tecnologías usadas
  sort_order   int     not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);


-- ════════════════════════════════════════════════════════════
-- 3. ÍNDICES
-- ════════════════════════════════════════════════════════════

create index if not exists skills_published_sort_idx
  on public.skills (is_published, sort_order);

create index if not exists experience_published_sort_idx
  on public.experience (is_published, sort_order);

create index if not exists education_published_sort_idx
  on public.education (is_published, sort_order);

create index if not exists certifications_published_sort_idx
  on public.certifications (is_published, sort_order);

create index if not exists projects_published_sort_idx
  on public.projects (is_published, sort_order);

-- ════════════════════════════════════════════════════════════
-- 4. TRIGGERS (updated_at automático)
-- ════════════════════════════════════════════════════════════

drop trigger if exists profile_set_updated_at       on public.profile;
drop trigger if exists skills_set_updated_at        on public.skills;
drop trigger if exists experience_set_updated_at    on public.experience;
drop trigger if exists education_set_updated_at     on public.education;
drop trigger if exists certifications_set_updated_at on public.certifications;
drop trigger if exists projects_set_updated_at on public.projects;

create trigger profile_set_updated_at
  before update on public.profile
  for each row execute function public.set_updated_at();

create trigger skills_set_updated_at
  before update on public.skills
  for each row execute function public.set_updated_at();

create trigger experience_set_updated_at
  before update on public.experience
  for each row execute function public.set_updated_at();

create trigger education_set_updated_at
  before update on public.education
  for each row execute function public.set_updated_at();

create trigger certifications_set_updated_at
  before update on public.certifications
  for each row execute function public.set_updated_at();

create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ════════════════════════════════════════════════════════════
-- 5. ROW LEVEL SECURITY
-- ════════════════════════════════════════════════════════════

alter table public.profile       enable row level security;
alter table public.skills        enable row level security;
alter table public.experience    enable row level security;
alter table public.education     enable row level security;
alter table public.certifications enable row level security;
alter table public.projects enable row level security;

-- profile: lectura pública total (no tiene is_published)
drop policy if exists "Public can read profile" on public.profile;
create policy "Public can read profile"
  on public.profile for select
  to anon, authenticated
  using (true);

-- skills
drop policy if exists "Public can read published skills" on public.skills;
create policy "Public can read published skills"
  on public.skills for select
  to anon, authenticated
  using (is_published = true);

-- experience
drop policy if exists "Public can read published experience" on public.experience;
create policy "Public can read published experience"
  on public.experience for select
  to anon, authenticated
  using (is_published = true);

-- education
drop policy if exists "Public can read published education" on public.education;
create policy "Public can read published education"
  on public.education for select
  to anon, authenticated
  using (is_published = true);

-- certifications
drop policy if exists "Public can read published certifications" on public.certifications;
create policy "Public can read published certifications"
  on public.certifications for select
  to anon, authenticated
  using (is_published = true);

-- projects
drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
  on public.projects for select
  to anon, authenticated
  using (is_published = true);

-- ════════════════════════════════════════════════════════════
-- 6. DATOS — PROFILE
-- ════════════════════════════════════════════════════════════

insert into public.profile (
  full_name, display_name, title, terminal_user,
  bio_es_p1, bio_es_p2, bio_es_p3,
  bio_en_p1, bio_en_p2, bio_en_p3,
  location, availability_open,
  email, phone, github, linkedin,
  cv_url
) values (
  'Andrés Felipe Guerrero Novoa',
  'Andrés Guerrero',
  'Full Stack Developer',
  'andres_guerrero',

  'Full Stack Developer con más de 7 años de experiencia construyendo productos digitales end-to-end para entornos B2A, B2C y B2E. Enfocado en diseñar soluciones escalables, arquitectura de microservicios e integraciones con servicios en la nube.',
  'Aplico herramientas de IA y diseño flujos agénticos para optimizar procesos de implementación, integración y entrega continua de valor.',
  'Cuando no estoy programando, estoy explorando nuevas herramientas de IA, contribuyendo a proyectos open source o tomando café mientras debuggeo algo que "debería funcionar".',

  'Full Stack Developer with 7+ years of experience building end-to-end digital products for B2A, B2C and B2E environments. Focused on scalable solutions, microservices architecture and cloud integrations.',
  'I apply AI tools and design agentic workflows to optimize implementation, integration and continuous value delivery processes.',
  'When I''m not coding, I''m exploring new AI tools, contributing to OSS, or debugging something that ''should work'' over a coffee.',

  'Cartagena, Colombia',
  true,

  'dev.andres.guerrero@gmail.com',
  '+573135810421',
  'https://github.com/DevAndresGuerrero',
  'https://linkedin.com/in/andres-felipe-guerrero-novoa-40b70a203',

  null
);


-- ════════════════════════════════════════════════════════════
-- 7. DATOS — SKILLS
-- ════════════════════════════════════════════════════════════

insert into public.skills (name, category, level, icon, highlight, sort_order, is_published) values

  -- Frontend
  ('TypeScript',             'frontend', 5, 'typescript',      true,  1,  true),
  ('React',                  'frontend', 5, 'react',           true,  2,  true),
  ('Next.js',                'frontend', 5, 'nextdotjs',       true,  3,  true),
  ('Vue.js',                 'frontend', 4, 'vuedotjs',        false, 4,  true),
  ('React Query',            'frontend', 4, 'reactquery',      false, 5,  true),
  ('Redux',                  'frontend', 4, 'redux',           false, 6,  true),
  ('Tailwind CSS',           'frontend', 5, 'tailwindcss',     false, 7,  true),
  ('Bootstrap',              'frontend', 4, 'bootstrap',       false, 8,  true),

  -- Backend
  ('PHP / Laravel',          'backend',  5, 'laravel',         true,  1,  true),
  ('Node.js',                'backend',  4, 'nodedotjs',       true,  2,  true),
  ('Go',                     'backend',  4, 'go',              true,  3,  true),
  ('C#',                     'backend',  3, 'csharp',          false, 4,  true),
  ('Python',                 'backend',  3, 'python',          false, 5,  true),
  ('GraphQL',                'backend',  4, 'graphql',         false, 6,  true),
  ('REST API',               'backend',  5, 'openapi',         false, 7,  true),
  ('NestJS',                 'backend',  3, 'nestjs',          false, 8,  true),
  ('Express',                'backend',  4, 'express',         false, 9,  true),
  ('PostgreSQL',             'backend',  5, 'postgresql',      true,  10, true),
  ('MySQL / MariaDB',        'backend',  4, 'mysql',           false, 11, true),
  ('Supabase',               'backend',  4, 'supabase',        false, 12, true),

  -- Tools & DevOps
  ('Docker',                 'tools',    4, 'docker',          true,  1,  true),
  ('Azure Pipelines',        'tools',    4, 'azuredevops',     true,  2,  true),
  ('AWS',                    'tools',    3, 'amazonaws',       false, 3,  true),
  ('Cloudflare',             'tools',    3, 'cloudflare',      false, 4,  true),
  ('Git / GitHub',           'tools',    5, 'github',          false, 5,  true),
  ('GitLab',                 'tools',    4, 'gitlab',          false, 6,  true),
  ('Bitbucket',              'tools',    3, 'bitbucket',       false, 7,  true),
  ('Jest',                   'tools',    4, 'jest',            true,  8,  true),
  ('React Testing Library',  'tools',    4, 'testinglibrary',  false, 9,  true),
  ('Playwright',             'tools',    4, 'playwright',      false, 10, true),
  ('WordPress',              'tools',    4, 'wordpress',       false, 11, true),
  ('Drupal',                 'tools',    3, 'drupal',          false, 12, true),

  -- Soft Skills
  ('Clean Architecture',     'soft',     5, null, true,  1, true),
  ('Microservicios',         'soft',     4, null, true,  2, true),
  ('Agile / Scrum',          'soft',     4, null, false, 3, true),
  ('Code Review',            'soft',     5, null, false, 4, true),
  ('Flujos con IA',          'soft',     4, null, true,  5, true),
  ('CI/CD',                  'soft',     4, null, false, 6, true);


-- ════════════════════════════════════════════════════════════
-- 8. DATOS — EXPERIENCE
-- ════════════════════════════════════════════════════════════

insert into public.experience
  (company, role, start_date, end_date, is_current, location, summary, achievements, technologies, sort_order, is_published)
values
  (
    'Idea Latente',
    'Full Stack Developer',
    '2023-05-01', null, true,
    'Cali, Colombia',
    'Lideré y desarrollé proyectos full stack, construyendo soluciones backend y frontend escalables con enfoque en arquitectura limpia, pruebas automatizadas y despliegues continuos en nube.',
    '[
      "Diseño e implementación de arquitecturas backend con PHP, Laravel y Go siguiendo principios de Clean Architecture.",
      "Desarrollo de interfaces modernas con React, Next.js y TypeScript con gestión de estado avanzada (React Query, Redux).",
      "Implementación de suites de testing automatizado con Jest, React Testing Library y Playwright.",
      "Configuración de pipelines CI/CD en Azure Pipelines y despliegues en AWS y Cloudflare.",
      "Integración de APIs GraphQL y REST para comunicación entre microservicios."
    ]'::jsonb,
    array['PHP', 'Laravel', 'Go', 'GraphQL', 'C#', 'React', 'Next.js', 'TypeScript', 'React Query', 'Redux', 'Jest', 'Playwright', 'Docker', 'Azure Pipelines', 'AWS', 'Cloudflare'],
    1, true
  ),
  (
    'GML Software',
    'Middle Developer',
    '2022-11-01', '2023-02-28', false,
    'Cartagena, Colombia',
    'Implementación de funcionalidad a la medida para proyectos de Laravel. Soporte de aplicativos propios y desarrollo de nuevas características en distintos aplicativos.',
    '[
      "Desarrollo de nuevas funcionalidades en proyectos existentes de Laravel con PHP.",
      "Construcción de vistas dinámicas con Blade y Vue.js.",
      "Gestión y optimización de bases de datos MySQL."
    ]'::jsonb,
    array['PHP', 'Laravel', 'Vue.js', 'Blade', 'MySQL'],
    2, true
  ),
  (
    '150 Porciento S.A.S',
    'Backend Developer',
    '2021-08-01', '2022-10-31', false,
    'Cartagena, Colombia',
    'Implementación de funcionalidad a la medida para proyectos de WordPress, Drupal y Laravel. Creación de componentes dinámicos y manejo de frontend con Vue.js.',
    '[
      "Personalización y extensión de proyectos WordPress y Drupal a medida del cliente.",
      "Desarrollo de módulos backend en Laravel con integración a bases de datos MySQL.",
      "Creación de componentes reactivos con Vue.js para interfaces dinámicas."
    ]'::jsonb,
    array['PHP', 'Laravel', 'WordPress', 'Drupal', 'Vue.js', 'MySQL'],
    3, true
  ),
  (
    'Tecnológico Comfenalco',
    'Desarrollador Web / Analista de Sistemas',
    '2019-10-01', '2021-04-30', false,
    'Cartagena, Colombia',
    'Desarrollo de proyectos institucionales: Plan de Desempeño Docente, Preparatorio Derecho y Proyecto de Aula.',
    '[
      "Análisis de requerimientos y diseño de soluciones para sistemas institucionales.",
      "Desarrollo full stack de plataformas educativas con Laravel y Moodle.",
      "Implementación de interfaces responsivas con Bootstrap y Tailwind CSS.",
      "Administración y optimización de bases de datos PostgreSQL."
    ]'::jsonb,
    array['PHP', 'Laravel', 'Moodle', 'WordPress', 'Bootstrap', 'Tailwind CSS', 'PostgreSQL'],
    4, true
  ),
  (
    'VPixel',
    'Desarrollador Web / Analista de Sistemas',
    '2019-03-01', '2019-09-30', false,
    'Cartagena, Colombia',
    'Desarrollo web incluyendo panel de administración, landing pages y e-commerce.',
    '[
      "Construcción de paneles de administración con Laravel y Vue.js.",
      "Desarrollo de landing pages y tiendas e-commerce.",
      "Diseño e implementación de APIs REST y GraphQL.",
      "Gestión de bases de datos MySQL y PostgreSQL."
    ]'::jsonb,
    array['PHP', 'Laravel', 'Vue.js', 'REST API', 'GraphQL', 'MySQL', 'PostgreSQL'],
    5, true
  ),
  (
    'VPixel',
    'Desarrollador Web Junior',
    '2018-08-01', '2019-03-31', false,
    'Cartagena, Colombia',
    'Desarrollo de la plataforma Colombiamar y asistencia técnica. Creación de la plataforma turística DealYourFun.',
    '[
      "Diseño de arquitectura y estructura de aplicaciones web.",
      "Desarrollo frontend con HTML, CSS y JavaScript.",
      "Implementación de backend con PHP bajo patrón MVC y WordPress.",
      "Gestión de base de datos MariaDB."
    ]'::jsonb,
    array['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress', 'MariaDB'],
    6, true
  ),
  (
    'SENA',
    'Desarrollador Web / Analista de Sistemas',
    '2018-02-01', '2018-07-31', false,
    'Cartagena, Colombia',
    'Diseño y desarrollo de un sistema de monitoreo remoto de signos vitales en pacientes críticos ventilados con atención domiciliaria, usando tecnologías de hardware y software libre.',
    '[
      "Recopilación de información y diseño de la arquitectura del sistema.",
      "Desarrollo de interfaz web con HTML, CSS, JS y Bootstrap.",
      "Implementación de comunicación en tiempo real con WebSockets y Node.js.",
      "Integración con hardware Arduino para captura de signos vitales.",
      "Gestión de base de datos MariaDB."
    ]'::jsonb,
    array['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP', 'Node.js', 'WebSocket', 'Arduino', 'MariaDB'],
    7, true
  );


-- ════════════════════════════════════════════════════════════
-- 9. DATOS — EDUCATION
-- ════════════════════════════════════════════════════════════

insert into public.education
  (institution, degree, field, start_date, end_date, is_current, description, sort_order, is_published)
values
  (
    'Fundación Universitaria Tecnológico Comfenalco',
    'Tecnólogo en Sistemas',
    'Ingeniería de Sistemas',
    '2016-01-01', '2021-12-01', false,
    'Formación en análisis y desarrollo de sistemas de información, bases de datos, redes, programación orientada a objetos y gestión de proyectos de software.',
    1, true
  ),
  (
    'SENA',
    'Técnico',
    'Sistemas',
    '2017-01-01', '2018-12-01', false,
    'Formación técnica en sistemas: mantenimiento de hardware y software, redes, programación básica y soporte técnico.',
    2, true
  );


-- ════════════════════════════════════════════════════════════
-- 10. DATOS — CERTIFICATIONS
-- Nota: keywords deben coincidir (case-insensitive) con skills.name
-- El cruce se hace en build-time en el código, no en DB
-- ════════════════════════════════════════════════════════════

insert into public.certifications
  (name, issuer, issued_date, url, keywords, sort_order, is_published)
values
  (
    'Curso de PHP Testing y buenas prácticas',
    'Platzi',
    '2023-06-01', null,
    array['PHP / Laravel', 'Jest', 'Clean Architecture'],
    1, true
  ),
  (
    'React: De cero a experto (Hooks y MERN)',
    'Udemy',
    '2022-03-15', null,
    array['React', 'Next.js', 'TypeScript', 'Node.js'],
    2, true
  ),
  (
    'Go: Programación backend con Go',
    'Platzi',
    '2023-09-01', null,
    array['Go', 'PostgreSQL', 'REST API'],
    3, true
  ),
  (
    'Docker y CI/CD en la práctica',
    'Udemy',
    '2024-01-10', null,
    array['Docker', 'Azure Pipelines', 'AWS'],
    4, true
  ),
  (
    'TypeScript: De JavaScript a TypeScript',
    'Platzi',
    '2022-08-01', null,
    array['TypeScript', 'React', 'Node.js'],
    5, true
  );

-- ════════════════════════════════════════════════════════════
-- 11. DATOS — PROJECTS (dummy — reemplazar con proyectos reales)
-- ════════════════════════════════════════════════════════════

insert into public.projects
  (name, description, repo_url, demo_url, tags, sort_order, is_published)
values
  (
    'Portfolio Personal',
    'Portfolio profesional construido con Astro, Supabase y TypeScript. Diseño terminal con soporte i18n y dark mode.',
    'https://github.com/DevAndresGuerrero/portfolio',
    null,
    array['Astro', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    1, true
  ),
  (
    'API REST con Go',
    'Microservicio REST con autenticación JWT, middlewares y persistencia en PostgreSQL. Dockerizado y listo para CI/CD.',
    'https://github.com/DevAndresGuerrero/go-rest-api',
    null,
    array['Go', 'PostgreSQL', 'Docker', 'REST API'],
    2, true
  ),
  (
    'Dashboard React',
    'Panel de administración con gráficas, tablas paginadas y gestión de estado con React Query.',
    'https://github.com/DevAndresGuerrero/react-dashboard',
    null,
    array['React', 'TypeScript', 'React Query', 'Tailwind CSS'],
    3, true
  );
