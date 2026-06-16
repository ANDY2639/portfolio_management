export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'soft' | string;

export interface Skill {
	id: string;
	name: string;
	category: SkillCategory;
	level: number;
	icon: string | null;
	highlight: boolean;
	sortOrder: number;
}

export interface Experience {
	id: string;
	company: string;
	role: string;
	startDate: string;
	endDate: string | null;
	isCurrent: boolean;
	location: string | null;
	summary: string;
	achievements: string[];
	technologies: string[];
	sortOrder: number;
}

export interface Education {
	id: string;
	institution: string;
	degree: string;
	field: string | null;
	startDate: string | null;
	endDate: string | null;
	isCurrent: boolean;
	description: string | null;
	certificationsUrl: string | null;
	sortOrder: number;
}

export interface Profile {
	id: string;
	fullName: string;
	displayName: string;
	title: string;
	terminalUser: string;
	bioEs: { p1: string; p2: string; p3: string };
	bioEn: { p1: string; p2: string; p3: string };
	location: string;
	availabilityOpen: boolean;
	email: string;
	phone: string | null;
	github: string;
	linkedin: string;
	cvUrl: string | null;
}

export interface Certification {
	id: string;
	name: string;
	issuer: string;
	issuedDate: string;
	url: string | null;
	keywords: string[];
	sortOrder: number;
}

export interface Project {
	id: string;
	name: string;
	description: string | null;
	repoUrl: string | null;
	demoUrl: string | null;
	tags: string[];
	sortOrder: number;
}

export interface DataResult<T> {
	data: T;
	error: string | null;
}
