import { createClient } from '@supabase/supabase-js';

// These will be populated with real values later. 
// For now, we will use placeholders or rely on mock data if they are missing.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a dummy client if URL is missing to avoid crashing the whole app
export const supabase = supabaseUrl
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            insert: async () => ({ error: null }),
            select: async () => ({ data: [], error: null }),
            update: async () => ({ error: null }),
            upsert: async () => ({ error: null }),
        })
    } as any;

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

export type Task = {
    id: string;
    user_id: string;
    title: string;
    start_time: string; // ISO time string or simple "HH:mm"
    end_time: string;   // ISO time string or simple "HH:mm"
    date: string;       // ISO date string YYYY-MM-DD
    category: string;
    is_reminder_on: boolean;
    is_completed: boolean;
    sub_tasks?: string[];
    created_at?: string;
};
