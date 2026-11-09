import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { timestamps } from './common.js';

export const posts = pgTable(
  'posts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    key: text('key').notNull().unique(),
    coverUrl: text('cover_url'),
    tags: text('tags').array().notNull().default(sql`'{}'::text[]`),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    isPublished: boolean('is_published').notNull().default(false),
    ...timestamps,
  },
  (t) => [index('posts_published_idx').on(t.isPublished, t.publishedAt)],
);

export const postTranslations = pgTable(
  'post_translations',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    locale: text('locale').notNull(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    excerpt: text('excerpt'),
    body: text('body').notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.postId, t.locale] }),
    uniqueIndex('post_translations_locale_slug_unique').on(t.locale, t.slug),
    check('post_translations_locale_check', sql`${t.locale} in ('es', 'en')`),
  ],
);
