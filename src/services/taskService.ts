import { supabase } from '../lib/supabase';
import type { Task } from '../lib/supabase';

export const taskService = {
    async getTasks(date: string) {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('date', date)
            .order('start_time', { ascending: true });

        if (error) throw error;
        return data as Task[];
    },

    async createTask(task: Omit<Task, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('tasks')
            .insert([task])
            .select()
            .single();

        if (error) throw error;
        return data as Task;
    },

    async updateTask(id: string, updates: Partial<Task>) {
        const { data, error } = await supabase
            .from('tasks')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Task;
    },

    async deleteTask(id: string) {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    subscribeToTasks(userId: string, callback: (payload: any) => void) {
        return supabase
            .channel('public:tasks')
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
