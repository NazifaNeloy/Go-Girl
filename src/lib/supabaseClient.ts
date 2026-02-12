import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a dummy client that supports chaining to avoid crashing the whole app
const mockClient = {
    auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
    },
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

export default supabase;

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
    start_time: string;
    end_time: string;
    date: string;
    category: string;
    is_reminder_on: boolean;
    is_completed: boolean;
    sub_tasks?: string[];
    created_at?: string;
};

export type Transaction = {
    id: string;
    user_id: string;
    item_name: string;
    amount: number;
    category: string;
    type: 'credit' | 'debit';
    created_at: string;
};
