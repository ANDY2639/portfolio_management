import { getSupabaseClient } from './supabase';
import type { Certification, DataResult, Education, Experience, Profile, Project, Skill } from './types';

function safeErrorMessage(error: unknown, fallback: string) {
	if (error instanceof Error) {
		return error.message;
	}

	return fallback;
}

export async function getProfile(): Promise<DataResult<Profile | null>> {
	try {
		const { client, error: clientError } = getSupabaseClient();

		if (!client) {
			return { data: null, error: clientError };
		}

		const { data, error } = await client
			.from('profile')
			.select(
				'id, full_name, display_name, title, terminal_user, bio_es_p1, bio_es_p2, bio_es_p3, bio_en_p1, bio_en_p2, bio_en_p3, location, availability_open, email, phone, github, linkedin, cv_url',
			)
			.limit(1)
			.maybeSingle();

		if (error) {
			return { data: null, error: error.message };
		}

		if (!data) {
			return { data: null, error: null };
		}

		return {
			data: {
				id: data.id,
				fullName: data.full_name,
				displayName: data.display_name,
				title: data.title,
				terminalUser: data.terminal_user,
				bioEs: { p1: data.bio_es_p1, p2: data.bio_es_p2, p3: data.bio_es_p3 },
				bioEn: { p1: data.bio_en_p1, p2: data.bio_en_p2, p3: data.bio_en_p3 },
				location: data.location,
				availabilityOpen: data.availability_open,
				email: data.email,
				phone: data.phone,
				github: data.github,
				linkedin: data.linkedin,
				cvUrl: data.cv_url,
			},
			error: null,
		};
	} catch (error) {
		return { data: null, error: safeErrorMessage(error, 'Unexpected error loading profile.') };
	}
}

export async function getSkills(): Promise<DataResult<Skill[]>> {
	try {
		const { client, error: clientError } = getSupabaseClient();

		if (!client) {
			return { data: [], error: clientError };
		}

		const { data, error } = await client
			.from('skills')
			.select('id, name, category, level, icon, highlight, sort_order')
			.eq('is_published', true)
			.order('sort_order', { ascending: true })
			.order('name', { ascending: true });

		if (error) {
			return { data: [], error: error.message };
		}

		const normalized: Skill[] = (data ?? []).map((skill) => ({
			id: skill.id,
			name: skill.name,
			category: skill.category,
			level: skill.level,
			icon: skill.icon,
			highlight: skill.highlight,
			sortOrder: skill.sort_order,
		}));

		return { data: normalized, error: null };
	} catch (error) {
		return { data: [], error: safeErrorMessage(error, 'Unexpected error loading skills.') };
	}
}

export async function getExperience(): Promise<DataResult<Experience[]>> {
	try {
		const { client, error: clientError } = getSupabaseClient();

		if (!client) {
			return { data: [], error: clientError };
		}

		const { data, error } = await client
			.from('experience')
			.select(
				'id, company, role, start_date, end_date, is_current, location, summary, achievements, technologies, sort_order',
			)
			.eq('is_published', true)
			.order('sort_order', { ascending: true })
			.order('start_date', { ascending: false });

		if (error) {
			return { data: [], error: error.message };
		}

		const normalized: Experience[] = (data ?? []).map((item) => ({
			id: item.id,
			company: item.company,
			role: item.role,
			startDate: item.start_date,
			endDate: item.end_date,
			isCurrent: item.is_current,
			location: item.location,
			summary: item.summary,
			achievements: Array.isArray(item.achievements) ? item.achievements : [],
			technologies: Array.isArray(item.technologies) ? item.technologies : [],
			sortOrder: item.sort_order,
		}));

		return { data: normalized, error: null };
	} catch (error) {
		return { data: [], error: safeErrorMessage(error, 'Unexpected error loading experience.') };
	}
}

export async function getEducation(): Promise<DataResult<Education[]>> {
	try {
		const { client, error: clientError } = getSupabaseClient();

		if (!client) {
			return { data: [], error: clientError };
		}

		const { data, error } = await client
			.from('education')
			.select(
				'id, institution, degree, field, start_date, end_date, is_current, description, certifications_url, sort_order',
			)
			.eq('is_published', true)
			.order('sort_order', { ascending: true })
			.order('start_date', { ascending: false });

		if (error) {
			return { data: [], error: error.message };
		}

		const normalized: Education[] = (data ?? []).map((item) => ({
			id: item.id,
			institution: item.institution,
			degree: item.degree,
			field: item.field,
			startDate: item.start_date,
			endDate: item.end_date,
			isCurrent: item.is_current,
			description: item.description,
			certificationsUrl: item.certifications_url,
			sortOrder: item.sort_order,
		}));

		return { data: normalized, error: null };
	} catch (error) {
		return { data: [], error: safeErrorMessage(error, 'Unexpected error loading education.') };
	}
}

export async function getCertifications(): Promise<DataResult<Certification[]>> {
	try {
		const { client, error: clientError } = getSupabaseClient();

		if (!client) {
			return { data: [], error: clientError };
		}

		const { data, error } = await client
			.from('certifications')
			.select('id, name, issuer, issued_date, url, keywords, sort_order')
			.eq('is_published', true)
			.order('sort_order', { ascending: true });

		if (error) {
			return { data: [], error: error.message };
		}

		const normalized: Certification[] = (data ?? []).map((item) => ({
			id: item.id,
			name: item.name,
			issuer: item.issuer,
			issuedDate: item.issued_date,
			url: item.url,
			keywords: Array.isArray(item.keywords) ? item.keywords : [],
			sortOrder: item.sort_order,
		}));

		return { data: normalized, error: null };
	} catch (error) {
		return { data: [], error: safeErrorMessage(error, 'Unexpected error loading certifications.') };
	}
}

export async function getProjects(): Promise<DataResult<Project[]>> {
	try {
		const { client, error: clientError } = getSupabaseClient();

		if (!client) {
			return { data: [], error: clientError };
		}

		const { data, error } = await client
			.from('projects')
			.select('id, name, description, repo_url, demo_url, tags, sort_order')
			.eq('is_published', true)
			.order('sort_order', { ascending: true });

		if (error) {
			return { data: [], error: error.message };
		}

		const normalized: Project[] = (data ?? []).map((item) => ({
			id: item.id,
			name: item.name,
			description: item.description,
			repoUrl: item.repo_url,
			demoUrl: item.demo_url,
			tags: Array.isArray(item.tags) ? item.tags : [],
			sortOrder: item.sort_order,
		}));

		return { data: normalized, error: null };
	} catch (error) {
		return { data: [], error: safeErrorMessage(error, 'Unexpected error loading projects.') };
	}
}
