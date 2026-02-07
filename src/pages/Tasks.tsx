import React, { useState, useEffect } from 'react';
import { Timeline } from '../components/tasks/Timeline';
import { TaskCreator } from '../components/tasks/TaskCreator';
import { taskService } from '../services/taskService';
import { Plus, Menu, User } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import type { Task } from '../lib/supabase';

export const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '1',
            user_id: 'mock',
            title: 'Welcome to Daily Tasks! ✨',
            start_time: '09:00',
            end_time: '10:00',
            date: format(new Date(), 'yyyy-MM-dd'),
            category: 'Personal',
            is_reminder_on: true,
            is_completed: false,
            sub_tasks: ['Explore the new UI', 'Create your first task']
        }
    ]);
    const [isCreatorOpen, setIsCreatorOpen] = useState(false);
    const [selectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    useEffect(() => {
        fetchTasks();
        // Subscribe to real-time changes
        try {
            const subscription = taskService.subscribeToTasks('user-id-placeholder', (payload) => {
                console.log('Real-time change:', payload);
                fetchTasks();
            });

            return () => {
                subscription.unsubscribe();
            };
        } catch (e) {
            console.warn('Real-time subscription failed:', e);
        }
    }, [selectedDate]);

    const fetchTasks = async () => {
        try {
            const data = await taskService.getTasks(selectedDate);
            if (data && data.length > 0) {
                setTasks(data);
            }
        } catch (error) {
            console.error('Error fetching tasks, using mock data:', error);
        }
    };

    const handleCreateTask = async (taskData: any) => {
        try {
            await taskService.createTask({ ...taskData, user_id: 'user-id-placeholder' });
            setIsCreatorOpen(false);
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleCompleteTask = async (id: string) => {
        try {
            await taskService.updateTask(id, { is_completed: true });
            fetchTasks();
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    return (
        <div className="theme-soft min-h-screen pb-32">
            <div className="max-w-2xl mx-auto px-6 py-10 space-y-10 relative z-10">
                {/* Header from Image 2 */}
                <header className="flex justify-between items-center text-[#2D1B2E]">
                    <button className="p-2 rounded-xl bg-white shadow-sm hover:bg-gray-50 transition-colors">
                        <Menu size={20} />
                    </button>
                    <h1 className="text-xl font-black">Daily Task</h1>
                    <button className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden border-2 border-white">
                        <div className="w-full h-full bg-[#B47B84]/20 flex items-center justify-center text-[#B47B84]">
                            <User size={24} />
                        </div>
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
                        className="bg-[#B47B84] text-white p-5 rounded-full shadow-[0_20px_40px_rgba(180,123,132,0.4)]"
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
