import { createClient } from '@supabase/supabase-js';

// These will be populated with real values later. 
// For now, we will use placeholders or rely on mock data if they are missing.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a dummy client that supports chaining to avoid crashing the whole app
const mockClient = {
    from: () => ({
        select: () => mockClient.from(),
        insert: () => mockClient.from(),
        update: () => mockClient.from(),
        delete: () => mockClient.from(),
        upsert: () => mockClient.from(),
        eq: () => mockClient.from(),
        order: () => mockClient.from(),
        single: () => mockClient.from(),
        match: () => mockClient.from(),
        // Make it thenable so 'await' works
        then: (onFullfilled: any) => onFullfilled({ data: [], error: null })
    }),
    channel: () => ({
        on: () => ({
            subscribe: () => ({ unsubscribe: () => { } })
        })
    })
} as any;

export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : mockClient;

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
