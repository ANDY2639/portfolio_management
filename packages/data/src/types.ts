import type { Locale } from './schema/common.js';
import type { ProjectMetric } from './schema/projects.js';

export interface ProfileContent {
  id: string;
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
  title: string;
  bioP1: string;
  bioP2: string;
  bioP3: string;
}

export interface SkillGroupContent {
  id: string;
  key: string;
  label: string;
  skills: Array<{ id: string; name: string }>;
}

export interface ExperienceContent {
  id: string;
  key: string;
  company: string;
  location: string | null;
  isRemote: boolean;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  role: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationContent {
  id: string;
  key: string;
  institution: string;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  degree: string;
  field: string | null;
  description: string | null;
}

export interface CertificationContent {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  url: string | null;
  keywords: string[];
}

export interface ProjectContent {
  id: string;
  key: string;
  repoUrl: string | null;
  demoUrl: string | null;
  tags: string[];
  coverUrl: string | null;
  featured: boolean;
  year: number | null;
  metrics: ProjectMetric[];
  name: string;
  description: string | null;
  problem: string | null;
  role: string | null;
  outcome: string | null;
}

export interface PostContent {
  id: string;
  key: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  coverUrl: string | null;
  tags: string[];
  publishedAt: string | null;
}

export interface SiteContent {
  locale: Locale;
  profile: ProfileContent | null;
  skillGroups: SkillGroupContent[];
  experience: ExperienceContent[];
  education: EducationContent[];
  certifications: CertificationContent[];
  projects: ProjectContent[];
  posts: PostContent[];
}
