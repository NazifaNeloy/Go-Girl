import supabase from '../lib/supabaseClient';

/**
 * Authentication Service
 * Handles OAuth sign-ins, sign-outs, and session management.
 */
export const authService = {
    /**
     * Trigger OAuth sign-in flow.
     * @param provider 'google' | 'github' | etc.
     */
    async signInWithOAuth(provider: 'google' | 'github') {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            console.error(`OAuth login failed for ${provider}:`, error.message);
            throw error;
        }
    },

    /**
     * Sign out the current user.
     */
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Sign out failed:', error.message);
            throw error;
        }
    },

    /**
     * Get the current session user.
     */
    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) return null;
        return user;
    }
};

export default authService;
