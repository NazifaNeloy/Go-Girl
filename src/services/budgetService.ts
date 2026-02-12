import supabase from '../lib/supabaseClient';
import type { Transaction } from '../lib/supabaseClient';

export const budgetService = {
    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw new Error('Authentication required');
        return user;
    },

    async getTransactions() {
        try {
            const user = await this.getCurrentUser();
            if (!user) throw new Error('No user session found');

            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data as Transaction[];
        } catch (error: any) {
            console.warn('Transaction fetch failed:', error.message);
            throw error;
        }
    },

    async addTransaction(transaction: Omit<Transaction, 'id' | 'created_at' | 'user_id'>) {
        try {
            const user = await this.getCurrentUser();
            if (!user) throw new Error('Login to save transactions');

            const { data, error } = await supabase
                .from('transactions')
                .insert([{ ...transaction, user_id: user.id }])
                .select()
                .single();

            if (error) throw error;
            return data as Transaction;
        } catch (error: any) {
            console.error('Add transaction failed:', error.message);
            throw error;
        }
    },

    subscribeToBudget(userId: string, callback: (payload: any) => void) {
        return supabase
            .channel(`public:transactions:user:${userId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'transactions',
                    filter: `user_id=eq.${userId}`,
                },
                callback
            )
            .subscribe();
    },
};
