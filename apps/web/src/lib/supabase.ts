import { createClient } from '@supabase/supabase-js';

export function getSupabaseClient() {
	const supabaseUrl = import.meta.env.SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		return {
			client: null,
			error: 'Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.',
		};
	}

	return {
		client: createClient(supabaseUrl, supabaseAnonKey, {
			auth: {
				persistSession: false,
				autoRefreshToken: false,
			},
		}),
		error: null,
	};
}
