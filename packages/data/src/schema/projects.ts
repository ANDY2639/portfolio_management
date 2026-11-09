import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { timestamps } from './common.js';

export type ProjectMetric = {
  label: string;
  value: string;
};

export const projects = pgTable(
  'projects',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    key: text('key').notNull().unique(),
    repoUrl: text('repo_url'),
    demoUrl: text('demo_url'),
    tags: text('tags').array().notNull().default(sql`'{}'::text[]`),
    coverUrl: text('cover_url'),
    featured: boolean('featured').notNull().default(false),
    year: integer('year'),
    metrics: jsonb('metrics').$type<ProjectMetric[]>().notNull().default(sql`'[]'::jsonb`),
    sortOrder: integer('sort_order').notNull().default(0),
    isPublished: boolean('is_published').notNull().default(true),
    ...timestamps,
  },
  (t) => [
    index('projects_published_sort_idx').on(t.isPublished, t.sortOrder),
    index('projects_featured_idx').on(t.featured),
  ],
);

export const projectTranslations = pgTable(
  'project_translations',
  {
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    locale: text('locale').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    problem: text('problem'),
    role: text('role'),
    outcome: text('outcome'),
  },
  (t) => [
    primaryKey({ columns: [t.projectId, t.locale] }),
    check('project_translations_locale_check', sql`${t.locale} in ('es', 'en')`),
  ],
);

export const projectMedia = pgTable(
  'project_media',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    url: text('url').notNull(),
    kind: text('kind').notNull().default('image'),
    caption: text('caption'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('project_media_project_sort_idx').on(t.projectId, t.sortOrder),
    check('project_media_kind_check', sql`${t.kind} in ('image', 'diagram', 'video')`),
  ],
);
