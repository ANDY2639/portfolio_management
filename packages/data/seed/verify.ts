import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { loadContent } from '../src/queries.js';

config({ path: '../../apps/web/.env.local' });

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error('DATABASE_URL is required');
}

const sql = neon(url);

const [identity] = await sql`select current_user as user, current_database() as database`;
const [counts] = await sql`
  select
    (select count(*) from profile)::int as profile,
    (select count(*) from profile_translations)::int as profile_translations,
    (select count(*) from skill_groups)::int as skill_groups,
    (select count(*) from skill_group_translations)::int as skill_group_translations,
    (select count(*) from skills)::int as skills,
    (select count(*) from experience)::int as experience,
    (select count(*) from experience_translations)::int as experience_translations,
    (select count(*) from education)::int as education,
    (select count(*) from education_translations)::int as education_translations,
    (select count(*) from certifications)::int as certifications,
    (select count(*) from certifications where is_published)::int as certifications_published,
    (select count(*) from projects)::int as projects
`;

console.log('Connected as:', identity.user, '/', identity.database);
console.log('Counts:', counts);

const content = await loadContent('es');

console.log('--- Content (es)');
console.log('profile:', content.profile?.fullName, '/', content.profile?.title);
console.log('experience:', content.experience.length);
console.log(
  'skill groups:',
  content.skillGroups.map((group) => `${group.label} (${group.skills.length})`).join(', '),
);
console.log('education:', content.education.length);
console.log('certifications:', content.certifications.length);
console.log('projects:', content.projects.length);

const contentEn = await loadContent('en');
console.log('--- Content (en)');
console.log('profile title:', contentEn.profile?.title);
console.log('first experience:', contentEn.experience[0]?.role ?? 'none');
console.log('skill groups:', contentEn.skillGroups.map((group) => group.label).join(', '));
