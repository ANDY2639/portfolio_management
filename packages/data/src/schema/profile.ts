import { sql } from 'drizzle-orm';
import { boolean, check, pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from './common.js';

export const profile = pgTable('profile', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: text('full_name').notNull(),
  displayName: text('display_name').notNull(),
  terminalUser: text('terminal_user').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  location: text('location').notNull(),
  github: text('github').notNull(),
  linkedin: text('linkedin').notNull(),
  cvUrl: text('cv_url'),
  availabilityOpen: boolean('availability_open').notNull().default(true),
  ...timestamps,
});

export const profileTranslations = pgTable(
  'profile_translations',
  {
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profile.id, { onDelete: 'cascade' }),
    locale: text('locale').notNull(),
    title: text('title').notNull(),
    bioP1: text('bio_p1').notNull(),
    bioP2: text('bio_p2').notNull(),
    bioP3: text('bio_p3').notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.profileId, t.locale] }),
    check('profile_translations_locale_check', sql`${t.locale} in ('es', 'en')`),
  ],
);
