import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  date,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  uuid,
} from 'drizzle-orm/pg-core';
import { timestamps } from './common.js';

export const education = pgTable(
  'education',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    key: text('key').notNull().unique(),
    institution: text('institution').notNull(),
    startDate: date('start_date'),
    endDate: date('end_date'),
    isCurrent: boolean('is_current').notNull().default(false),
    sortOrder: integer('sort_order').notNull().default(0),
    isPublished: boolean('is_published').notNull().default(true),
    ...timestamps,
  },
  (t) => [index('education_published_sort_idx').on(t.isPublished, t.sortOrder)],
);

export const educationTranslations = pgTable(
  'education_translations',
  {
    educationId: uuid('education_id')
      .notNull()
      .references(() => education.id, { onDelete: 'cascade' }),
    locale: text('locale').notNull(),
    degree: text('degree').notNull(),
    field: text('field'),
    description: text('description'),
  },
  (t) => [
    primaryKey({ columns: [t.educationId, t.locale] }),
    check('education_translations_locale_check', sql`${t.locale} in ('es', 'en')`),
  ],
);
