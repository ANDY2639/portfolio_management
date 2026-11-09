import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { timestamps } from './common.js';

export const skillGroups = pgTable('skill_groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: text('key').notNull().unique(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const skillGroupTranslations = pgTable(
  'skill_group_translations',
  {
    groupId: uuid('group_id')
      .notNull()
      .references(() => skillGroups.id, { onDelete: 'cascade' }),
    locale: text('locale').notNull(),
    label: text('label').notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.groupId, t.locale] }),
    check('skill_group_translations_locale_check', sql`${t.locale} in ('es', 'en')`),
  ],
);

export const skills = pgTable(
  'skills',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    groupId: uuid('group_id')
      .notNull()
      .references(() => skillGroups.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
    isPublished: boolean('is_published').notNull().default(true),
    ...timestamps,
  },
  (t) => [
    uniqueIndex('skills_group_name_unique').on(t.groupId, t.name),
    index('skills_group_sort_idx').on(t.groupId, t.sortOrder),
    index('skills_published_idx').on(t.isPublished),
  ],
);
