import React, { useState, useEffect } from 'react';
import { Timeline } from '../components/tasks/Timeline';
import { TaskCreator } from '../components/tasks/TaskCreator';
import { taskService } from '../services/taskService';
import { Plus, Menu, User } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import supabase, { type Task } from '../lib/supabaseClient';

export const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isCreatorOpen, setIsCreatorOpen] = useState(false);
    const [selectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        // Initialize Auth listener
        const initAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUser(user);
        };

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
            setCurrentUser(session?.user ?? null);
        });

        initAuth();
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        fetchTasks();

        if (!currentUser) return;

        // Subscribe to real-time changes
        try {
            const subscription = taskService.subscribeToTasks(currentUser.id, (payload) => {
                console.log('Real-time task change:', payload);
                fetchTasks();
            });

            return () => {
                subscription.unsubscribe();
            };
        } catch (e) {
            console.warn('Real-time subscription failed:', e);
        }
    }, [selectedDate, currentUser]);

    const fetchTasks = async () => {
        try {
            const data = await taskService.getTasks(selectedDate);
            if (data && data.length > 0) {
                setTasks(data);
            } else {
                setTasks([]);
            }
        } catch (error: any) {
            console.warn('Error fetching tasks:', error.message);
        }
    };

    const handleCreateTask = async (taskData: any) => {
        const tempId = crypto.randomUUID();
        const newTask = {
            ...taskData,
            id: tempId,
            user_id: currentUser?.id || 'guest'
        };

        // Optimistically update local state so user sees it immediately
        setTasks(prev => [...prev, newTask].sort((a, b) => a.start_time.localeCompare(b.start_time)));
        setIsCreatorOpen(false);

        try {
            await taskService.addTask(newTask);
            fetchTasks(); // Refresh to get the actual database ID
        } catch (error: any) {
            console.error('Save to DB failed, kept local:', error.message);
        }
    };

    const handleCompleteTask = async (id: string) => {
        // Optimistically update local state
        setTasks(prev => prev.map(t => t.id === id ? { ...t, is_completed: true } : t));

        try {
            await taskService.updateTask(id, { is_completed: true });
        } catch (error: any) {
            console.error('Error completing task:', error.message);
        }
    };

    return (
        <div className="min-h-screen pb-32">
            <div className="max-w-2xl mx-auto px-6 py-10 space-y-10 relative z-10">
                {/* Header from Solo Leveling Theme */}
                <header className="flex justify-between items-center text-white">
                    <button className="p-2 rounded-xl bg-white/5 border border-white/10 shadow-sm hover:bg-white/10 transition-colors">
                        <Menu size={20} className="text-pink-500" />
                    </button>
                    <h1 className="text-xl font-black italic tracking-tighter uppercase">Daily Tasks</h1>
                    <button className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 shadow-sm flex items-center justify-center overflow-hidden border border-white/10">
                        <User size={24} className="text-white" />
                    </button>
                </header>

                <div className="space-y-8">
                    <Timeline tasks={tasks} onCompleteTask={handleCompleteTask} />
                </div>

                {/* Floating Add Button */}
                <div className="fixed bottom-32 left-1/2 -translate-x-1/2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsCreatorOpen(true)}
                        className="bg-black border-2 border-pink-500 text-pink-500 p-5 rounded-full shadow-[0_0_20px_rgba(255,113,205,0.4)]"
                    >
                        <Plus size={32} strokeWidth={3} />
                    </motion.button>
                </div>

                <TaskCreator
                    isOpen={isCreatorOpen}
                    onClose={() => setIsCreatorOpen(false)}
                    onSubmit={handleCreateTask}
                />
            </div>
        </div>
    );
};
