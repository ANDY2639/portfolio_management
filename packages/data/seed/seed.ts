import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import { eq } from 'drizzle-orm';
import { getDb } from '../src/client.js';
import * as schema from '../src/schema/index.js';

config({ path: '../../apps/web/.env.local' });

interface Translation<T> {
  es: T;
  en: T;
}

interface SeedData {
  profile: {
    fullName: string;
    displayName: string;
    terminalUser: string;
    email: string;
    phone: string | null;
    location: string;
    github: string;
    linkedin: string;
    cvUrl: string | null;
    availabilityOpen: boolean;
    translations: Translation<{
      title: string;
      bioP1: string;
      bioP2: string;
      bioP3: string;
    }>;
  };
  skillGroups: Array<{
    key: string;
    translations: Translation<string>;
    skills: string[];
  }>;
  experience: Array<{
    key: string;
    company: string;
    location: string | null;
    isRemote: boolean;
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
    technologies: string[];
    translations: Translation<{
      role: string;
      summary: string;
      achievements: string[];
    }>;
  }>;
  education: Array<{
    key: string;
    institution: string;
    startDate: string | null;
    endDate: string | null;
    isCurrent: boolean;
    translations: Translation<{
      degree: string;
      field: string | null;
      description: string | null;
    }>;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    issuedDate: string;
    keywords: string[];
    published: boolean;
  }>;
}

const here = dirname(fileURLToPath(import.meta.url));
const seedData = JSON.parse(readFileSync(join(here, 'data.json'), 'utf8')) as SeedData;

const db = getDb();

async function seedProfile() {
  const [existing] = await db
    .select({ id: schema.profile.id })
    .from(schema.profile)
    .limit(1);

  const values = {
    fullName: seedData.profile.fullName,
    displayName: seedData.profile.displayName,
    terminalUser: seedData.profile.terminalUser,
    email: seedData.profile.email,
    phone: seedData.profile.phone,
    location: seedData.profile.location,
    github: seedData.profile.github,
    linkedin: seedData.profile.linkedin,
    cvUrl: seedData.profile.cvUrl,
    availabilityOpen: seedData.profile.availabilityOpen,
  };

  let profileId: string;

  if (existing) {
    await db.update(schema.profile).set(values).where(eq(schema.profile.id, existing.id));
    profileId = existing.id;
  } else {
    const [inserted] = await db
      .insert(schema.profile)
      .values(values)
      .returning({ id: schema.profile.id });

    profileId = inserted.id;
  }

  for (const locale of ['es', 'en'] as const) {
    const translation = seedData.profile.translations[locale];

    await db
      .insert(schema.profileTranslations)
      .values({ profileId, locale, ...translation })
      .onConflictDoUpdate({
        target: [schema.profileTranslations.profileId, schema.profileTranslations.locale],
        set: translation,
      });
  }
}

async function seedSkills() {
  for (const [groupIndex, group] of seedData.skillGroups.entries()) {
    const [row] = await db
      .insert(schema.skillGroups)
      .values({ key: group.key, sortOrder: groupIndex + 1 })
      .onConflictDoUpdate({
        target: schema.skillGroups.key,
        set: { sortOrder: groupIndex + 1 },
      })
      .returning({ id: schema.skillGroups.id });

    for (const locale of ['es', 'en'] as const) {
      await db
        .insert(schema.skillGroupTranslations)
        .values({ groupId: row.id, locale, label: group.translations[locale] })
        .onConflictDoUpdate({
          target: [
            schema.skillGroupTranslations.groupId,
            schema.skillGroupTranslations.locale,
          ],
          set: { label: group.translations[locale] },
        });
    }

    for (const [skillIndex, name] of group.skills.entries()) {
      await db
        .insert(schema.skills)
        .values({
          groupId: row.id,
          name,
          sortOrder: skillIndex + 1,
          isPublished: true,
        })
        .onConflictDoUpdate({
          target: [schema.skills.groupId, schema.skills.name],
          set: { sortOrder: skillIndex + 1, isPublished: true },
        });
    }
  }
}

async function seedExperience() {
  for (const [index, entry] of seedData.experience.entries()) {
    const [row] = await db
      .insert(schema.experience)
      .values({
        key: entry.key,
        company: entry.company,
        location: entry.location,
        isRemote: entry.isRemote,
        startDate: entry.startDate,
        endDate: entry.endDate,
        isCurrent: entry.isCurrent,
        technologies: entry.technologies,
        sortOrder: index + 1,
        isPublished: true,
      })
      .onConflictDoUpdate({
        target: schema.experience.key,
        set: {
          company: entry.company,
          location: entry.location,
          isRemote: entry.isRemote,
          startDate: entry.startDate,
          endDate: entry.endDate,
          isCurrent: entry.isCurrent,
          technologies: entry.technologies,
          sortOrder: index + 1,
          isPublished: true,
        },
      })
      .returning({ id: schema.experience.id });

    for (const locale of ['es', 'en'] as const) {
      const translation = entry.translations[locale];

      await db
        .insert(schema.experienceTranslations)
        .values({ experienceId: row.id, locale, ...translation })
        .onConflictDoUpdate({
          target: [
            schema.experienceTranslations.experienceId,
            schema.experienceTranslations.locale,
          ],
          set: translation,
        });
    }
  }
}

async function seedEducation() {
  for (const [index, entry] of seedData.education.entries()) {
    const [row] = await db
      .insert(schema.education)
      .values({
        key: entry.key,
        institution: entry.institution,
        startDate: entry.startDate,
        endDate: entry.endDate,
        isCurrent: entry.isCurrent,
        sortOrder: index + 1,
        isPublished: true,
      })
      .onConflictDoUpdate({
        target: schema.education.key,
        set: {
          institution: entry.institution,
          startDate: entry.startDate,
          endDate: entry.endDate,
          isCurrent: entry.isCurrent,
          sortOrder: index + 1,
          isPublished: true,
        },
      })
      .returning({ id: schema.education.id });

    for (const locale of ['es', 'en'] as const) {
      const translation = entry.translations[locale];

      await db
        .insert(schema.educationTranslations)
        .values({ educationId: row.id, locale, ...translation })
        .onConflictDoUpdate({
          target: [
            schema.educationTranslations.educationId,
            schema.educationTranslations.locale,
          ],
          set: translation,
        });
    }
  }
}

async function seedCertifications() {
  for (const [index, entry] of seedData.certifications.entries()) {
    await db
      .insert(schema.certifications)
      .values({
        name: entry.name,
        issuer: entry.issuer,
        issuedDate: entry.issuedDate,
        keywords: entry.keywords,
        sortOrder: index + 1,
        isPublished: entry.published,
      })
      .onConflictDoUpdate({
        target: [
          schema.certifications.name,
          schema.certifications.issuer,
          schema.certifications.issuedDate,
        ],
        set: {
          keywords: entry.keywords,
          sortOrder: index + 1,
          isPublished: entry.published,
        },
      });
  }
}

await seedProfile();
await seedSkills();
await seedExperience();
await seedEducation();
await seedCertifications();

console.log('Seed completed.');
console.log(`  experience: ${seedData.experience.length}`);
console.log(`  education: ${seedData.education.length}`);
console.log(`  skill groups: ${seedData.skillGroups.length}`);
console.log(`  skills: ${seedData.skillGroups.reduce((total, group) => total + group.skills.length, 0)}`);
console.log(
  `  certifications: ${seedData.certifications.length} (${seedData.certifications.filter((entry) => entry.published).length} published)`,
);
