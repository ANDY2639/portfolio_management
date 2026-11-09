import { asc, desc, eq } from 'drizzle-orm';
import { getDb } from './client.js';
import * as schema from './schema/index.js';
import type { Locale } from './schema/common.js';
import type {
  CertificationContent,
  EducationContent,
  ExperienceContent,
  PostContent,
  ProfileContent,
  ProjectContent,
  SiteContent,
  SkillGroupContent,
} from './types.js';

function pickByLocale<T extends { locale: string }>(rows: T[], locale: Locale): T | undefined {
  return rows.find((row) => row.locale === locale) ?? rows.find((row) => row.locale === 'es') ?? rows[0];
}

function groupBy<T>(rows: T[], key: (row: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();

  for (const row of rows) {
    const groupKey = key(row);
    const list = map.get(groupKey);

    if (list) {
      list.push(row);
    } else {
      map.set(groupKey, [row]);
    }
  }

  return map;
}

export async function loadContent(locale: Locale): Promise<SiteContent> {
  const db = getDb();

  const [
    profileRows,
    profileTranslationRows,
    groupRows,
    groupTranslationRows,
    skillRows,
    experienceRows,
    experienceTranslationRows,
    educationRows,
    educationTranslationRows,
    certificationRows,
    projectRows,
    projectTranslationRows,
    postRows,
    postTranslationRows,
  ] = await Promise.all([
    db.select().from(schema.profile).limit(1),
    db.select().from(schema.profileTranslations),
    db.select().from(schema.skillGroups).orderBy(asc(schema.skillGroups.sortOrder)),
    db.select().from(schema.skillGroupTranslations),
    db
      .select()
      .from(schema.skills)
      .where(eq(schema.skills.isPublished, true))
      .orderBy(asc(schema.skills.sortOrder)),
    db
      .select()
      .from(schema.experience)
      .where(eq(schema.experience.isPublished, true))
      .orderBy(asc(schema.experience.sortOrder)),
    db.select().from(schema.experienceTranslations),
    db
      .select()
      .from(schema.education)
      .where(eq(schema.education.isPublished, true))
      .orderBy(asc(schema.education.sortOrder)),
    db.select().from(schema.educationTranslations),
    db
      .select()
      .from(schema.certifications)
      .where(eq(schema.certifications.isPublished, true))
      .orderBy(asc(schema.certifications.sortOrder)),
    db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.isPublished, true))
      .orderBy(asc(schema.projects.sortOrder)),
    db.select().from(schema.projectTranslations),
    db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.isPublished, true))
      .orderBy(desc(schema.posts.publishedAt)),
    db.select().from(schema.postTranslations),
  ]);

  const profileRow = profileRows[0];
  const profileTranslation = profileRow
    ? pickByLocale(
        profileTranslationRows.filter((translation) => translation.profileId === profileRow.id),
        locale,
      )
    : undefined;

  const profile: ProfileContent | null = profileRow
    ? {
        id: profileRow.id,
        fullName: profileRow.fullName,
        displayName: profileRow.displayName,
        terminalUser: profileRow.terminalUser,
        email: profileRow.email,
        phone: profileRow.phone,
        location: profileRow.location,
        github: profileRow.github,
        linkedin: profileRow.linkedin,
        cvUrl: profileRow.cvUrl,
        availabilityOpen: profileRow.availabilityOpen,
        title: profileTranslation?.title ?? '',
        bioP1: profileTranslation?.bioP1 ?? '',
        bioP2: profileTranslation?.bioP2 ?? '',
        bioP3: profileTranslation?.bioP3 ?? '',
      }
    : null;

  const groupTranslationsById = groupBy(groupTranslationRows, (row) => row.groupId);
  const skillsByGroup = groupBy(skillRows, (row) => row.groupId);

  const skillGroups: SkillGroupContent[] = groupRows.map((group) => {
    const translation = pickByLocale(groupTranslationsById.get(group.id) ?? [], locale);

    return {
      id: group.id,
      key: group.key,
      label: translation?.label ?? group.key,
      skills: (skillsByGroup.get(group.id) ?? []).map((skill) => ({
        id: skill.id,
        name: skill.name,
      })),
    };
  });

  const experienceTranslationsById = groupBy(
    experienceTranslationRows,
    (row) => row.experienceId,
  );

  const experience: ExperienceContent[] = experienceRows.flatMap((entry) => {
    const translation = pickByLocale(experienceTranslationsById.get(entry.id) ?? [], locale);

    if (!translation) {
      return [];
    }

    return [
      {
        id: entry.id,
        key: entry.key,
        company: entry.company,
        location: entry.location,
        isRemote: entry.isRemote,
        startDate: entry.startDate,
        endDate: entry.endDate,
        isCurrent: entry.isCurrent,
        role: translation.role,
        summary: translation.summary,
        achievements: translation.achievements ?? [],
        technologies: entry.technologies ?? [],
      },
    ];
  });

  const educationTranslationsById = groupBy(
    educationTranslationRows,
    (row) => row.educationId,
  );

  const education: EducationContent[] = educationRows.flatMap((entry) => {
    const translation = pickByLocale(educationTranslationsById.get(entry.id) ?? [], locale);

    if (!translation) {
      return [];
    }

    return [
      {
        id: entry.id,
        key: entry.key,
        institution: entry.institution,
        startDate: entry.startDate,
        endDate: entry.endDate,
        isCurrent: entry.isCurrent,
        degree: translation.degree,
        field: translation.field,
        description: translation.description,
      },
    ];
  });

  const certifications: CertificationContent[] = certificationRows.map((certification) => ({
    id: certification.id,
    name: certification.name,
    issuer: certification.issuer,
    issuedDate: certification.issuedDate,
    url: certification.url,
    keywords: certification.keywords ?? [],
  }));

  const projectTranslationsById = groupBy(
    projectTranslationRows,
    (row) => row.projectId,
  );

  const projects: ProjectContent[] = projectRows.flatMap((project) => {
    const translation = pickByLocale(projectTranslationsById.get(project.id) ?? [], locale);

    if (!translation) {
      return [];
    }

    return [
      {
        id: project.id,
        key: project.key,
        repoUrl: project.repoUrl,
        demoUrl: project.demoUrl,
        tags: project.tags ?? [],
        coverUrl: project.coverUrl,
        featured: project.featured,
        year: project.year,
        metrics: project.metrics ?? [],
        name: translation.name,
        description: translation.description,
        problem: translation.problem,
        role: translation.role,
        outcome: translation.outcome,
      },
    ];
  });

  const postTranslationsById = groupBy(postTranslationRows, (row) => row.postId);

  const posts: PostContent[] = postRows.flatMap((post) => {
    const translation = pickByLocale(postTranslationsById.get(post.id) ?? [], locale);

    if (!translation) {
      return [];
    }

    return [
      {
        id: post.id,
        key: post.key,
        slug: translation.slug,
        title: translation.title,
        excerpt: translation.excerpt,
        body: translation.body,
        coverUrl: post.coverUrl,
        tags: post.tags ?? [],
        publishedAt: post.publishedAt?.toISOString() ?? null,
      },
    ];
  });

  return {
    locale,
    profile,
    skillGroups,
    experience,
    education,
    certifications,
    projects,
    posts,
  };
}

const contentCache = new Map<Locale, SiteContent>();

export async function getSiteContent(locale: Locale): Promise<SiteContent> {
  const cached = contentCache.get(locale);

  if (cached) {
    return cached;
  }

  const content = await loadContent(locale);
  contentCache.set(locale, content);

  return content;
}

export function clearSiteContentCache(): void {
  contentCache.clear();
}

export async function getProfile(locale: Locale): Promise<ProfileContent | null> {
  return (await getSiteContent(locale)).profile;
}

export async function listProjects(locale: Locale): Promise<ProjectContent[]> {
  return (await getSiteContent(locale)).projects;
}
