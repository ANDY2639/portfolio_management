import type {
  CertificationDto,
  EducationDto,
  ExperienceDto,
  ProfileDto,
  ProjectDto,
  SkillDto,
} from "@portfolio/contracts";

const now = new Date().toISOString();

export const profileMock: ProfileDto = {
  id: "11111111-1111-1111-1111-111111111111",
  full_name: "Portfolio Owner",
  title: "Software Engineer",
  bio: "Experienced full-stack developer.",
  email: "owner@example.com",
  phone: null,
  location: "Remote",
  avatar_url: "https://example.com/avatar.jpg",
  cv_url: null,
  github_url: "https://github.com/example",
  linkedin_url: "https://linkedin.com/in/example",
  website_url: "https://example.com",
  created_at: now,
  updated_at: now,
};

export const skillsMock: SkillDto[] = [
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "TypeScript",
    category: "frontend",
    level: 5,
    icon: null,
    highlight: true,
    sort_order: 1,
    created_at: now,
    updated_at: now,
  },
];

export const experienceMock: ExperienceDto[] = [
  {
    id: "33333333-3333-3333-3333-333333333333",
    company: "Example Corp",
    position: "Senior Engineer",
    description: "Built platform services.",
    achievements: ["Shipped API v2"],
    start_date: "2022-01-01",
    end_date: null,
    location: "Remote",
    employment_type: "Full-time",
    sort_order: 1,
    created_at: now,
    updated_at: now,
  },
];

export const educationMock: EducationDto[] = [
  {
    id: "44444444-4444-4444-4444-444444444444",
    institution: "Tech University",
    degree: "BSc Computer Science",
    field: "Software Engineering",
    description: null,
    start_date: "2016-03-01",
    end_date: "2020-12-01",
    sort_order: 1,
    created_at: now,
    updated_at: now,
  },
];

export const certificationsMock: CertificationDto[] = [
  {
    id: "55555555-5555-5555-5555-555555555555",
    name: "Cloud Practitioner",
    issuer: "Example Cloud",
    issue_date: "2024-01-01",
    expiry_date: null,
    credential_id: null,
    credential_url: null,
    keywords: ["cloud"],
    sort_order: 1,
    created_at: now,
    updated_at: now,
  },
];

export const projectsMock: ProjectDto[] = [
  {
    id: "66666666-6666-6666-6666-666666666666",
    name: "Portfolio Platform",
    description: "Personal portfolio platform.",
    long_description: null,
    technologies: ["TypeScript", "NestJS"],
    tags: ["portfolio"],
    github_url: "https://github.com/example/portfolio",
    live_url: "https://portfolio.example.com",
    image_url: null,
    featured: true,
    sort_order: 1,
    created_at: now,
    updated_at: now,
  },
];
