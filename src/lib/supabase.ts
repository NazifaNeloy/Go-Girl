import { createClient } from '@supabase/supabase-js';

// These will be populated with real values later. 
// For now, we will use placeholders or rely on mock data if they are missing.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
    id: string;
    username: string;
    avatar_url?: string;
    bio?: string;
    title?: string;
    location?: string;
    total_glow_points: number;
    github_url?: string;
    linkedin_url?: string;
};

export type DailyLog = {
    id: string;
    user_id: string;
    date: string; // ISO date string YYYY-MM-DD
    glow_points: number;
    mood?: 'happy' | 'focused' | 'tired' | 'stressed' | 'excited' | string;
    learning_log?: string;
    code_snippet?: string;
};
