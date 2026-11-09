import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  uuid,
} from 'drizzle-orm/pg-core';
import { timestamps } from './common.js';

export const experience = pgTable(
  'experience',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    key: text('key').notNull().unique(),
    company: text('company').notNull(),
    location: text('location'),
    isRemote: boolean('is_remote').notNull().default(false),
    startDate: date('start_date').notNull(),
    endDate: date('end_date'),
    isCurrent: boolean('is_current').notNull().default(false),
    technologies: text('technologies').array().notNull().default(sql`'{}'::text[]`),
    sortOrder: integer('sort_order').notNull().default(0),
    isPublished: boolean('is_published').notNull().default(true),
    ...timestamps,
  },
  (t) => [
    index('experience_published_sort_idx').on(t.isPublished, t.sortOrder),
    index('experience_start_date_idx').on(t.startDate),
  ],
);

export const experienceTranslations = pgTable(
  'experience_translations',
  {
    experienceId: uuid('experience_id')
      .notNull()
      .references(() => experience.id, { onDelete: 'cascade' }),
    locale: text('locale').notNull(),
    role: text('role').notNull(),
    summary: text('summary').notNull(),
    achievements: jsonb('achievements').$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  },
  (t) => [
    primaryKey({ columns: [t.experienceId, t.locale] }),
    check('experience_translations_locale_check', sql`${t.locale} in ('es', 'en')`),
  ],
);
