import { sql } from 'drizzle-orm';
import {
  boolean,
  date,
  index,
  integer,
  pgTable,
  text,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { timestamps } from './common.js';

export const certifications = pgTable(
  'certifications',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    issuer: text('issuer').notNull(),
    issuedDate: date('issued_date').notNull(),
    url: text('url'),
    keywords: text('keywords').array().notNull().default(sql`'{}'::text[]`),
    sortOrder: integer('sort_order').notNull().default(0),
    isPublished: boolean('is_published').notNull().default(true),
    ...timestamps,
  },
  (t) => [
    uniqueIndex('certifications_identity_unique').on(t.name, t.issuer, t.issuedDate),
    index('certifications_published_sort_idx').on(t.isPublished, t.sortOrder),
  ],
);
