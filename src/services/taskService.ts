import supabase from '../lib/supabaseClient';
import type { Task } from '../lib/supabaseClient';

export const taskService = {
    /**
     * Get the current user session.
     * Mandatory for all DB calls.
     */
    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw new Error('Authentication required');
        return user;
    },

    async getTasks(date: string) {
        try {
            const user = await this.getCurrentUser();
            if (!user) throw new Error('No user session found');

            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', user.id)
                .eq('date', date)
                .order('start_time', { ascending: true });

            if (error) throw error;
            return data as Task[];
        } catch (error: any) {
            console.warn('Task fetch failed, using potential local/mock data:', error.message);
            throw error;
        }
    },

    async addTask(task: Omit<Task, 'id' | 'created_at' | 'user_id'>) {
        try {
            const user = await this.getCurrentUser();
            if (!user) throw new Error('Login to save tasks permanently');

            const { data, error } = await supabase
                .from('tasks')
                .insert([{ ...task, user_id: user.id }])
                .select()
                .single();

            if (error) throw error;
            return data as Task;
        } catch (error: any) {
            console.error('Add task failed:', error.message);
            throw error;
        }
    },

    async updateTask(id: string, updates: Partial<Task>) {
        try {
            const user = await this.getCurrentUser();
            if (!user) throw new Error('Authentication required to sync changes');

            const { data, error } = await supabase
                .from('tasks')
                .update(updates)
                .eq('id', id)
                .eq('user_id', user.id)
                .select()
                .single();

            if (error) throw error;
            return data as Task;
        } catch (error: any) {
            console.error('Update task failed:', error.message);
            throw error;
        }
    },

    async deleteTask(id: string) {
        try {
            const user = await this.getCurrentUser();
            if (!user) throw new Error('Authentication required');

            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id)
                .eq('user_id', user.id);

            if (error) throw error;
        } catch (error: any) {
            console.error('Delete task failed:', error.message);
            throw error;
        }
    },

    subscribeToTasks(userId: string, callback: (payload: any) => void) {
        return supabase
            .channel(`public:tasks:user:${userId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'tasks',
                    filter: `user_id=eq.${userId}`,
                },
                callback
            )
            .subscribe();
    },
};
