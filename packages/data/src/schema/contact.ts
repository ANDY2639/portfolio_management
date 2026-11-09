import { sql } from 'drizzle-orm';
import { check, index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const contactMessages = pgTable(
  'contact_messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    message: text('message').notNull(),
    ipHash: text('ip_hash').notNull(),
    status: text('status').notNull().default('new'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('contact_messages_ip_created_idx').on(t.ipHash, t.createdAt),
    index('contact_messages_created_idx').on(t.createdAt),
    check('contact_messages_status_check', sql`${t.status} in ('new', 'read', 'replied')`),
  ],
);
