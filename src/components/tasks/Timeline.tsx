import React from 'react';
import type { Task } from '../../lib/supabase';
import { TaskCard } from './TaskCard';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TimelineProps {
    tasks: Task[];
    onCompleteTask: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string, text: string }> = {
    Meeting: { bg: 'bg-[#B47B84]', text: 'text-white' },
    Study: { bg: 'bg-[#947EB0]', text: 'text-white' },
    Travelling: { bg: 'bg-[#D4A343]', text: 'text-white' },
    Personal: { bg: 'bg-[#F9DCC4]', text: 'text-[#E09F7D]' },
    Work: { bg: 'bg-[#C9ADA7]', text: 'text-white' },
};

export const Timeline: React.FC<TimelineProps> = ({ tasks, onCompleteTask }) => {
    return (
        <div className="relative pl-16">
            {/* Vertical Connector Line */}
            <div className="absolute left-[34px] top-10 bottom-10 w-0.5 border-l-2 border-dashed border-[#C9ADA7]" />

            <div className="space-y-12">
                {tasks.map((task, index) => {
                    const colors = CATEGORY_COLORS[task.category] || CATEGORY_COLORS.Personal;

                    return (
                        <div key={task.id} className="relative flex items-start">
                            {/* Vertical Category Label */}
                            <div className="absolute -left-[58px] top-6 flex flex-col items-center">
                                <div className={cn(
                                    "w-12 h-24 rounded-full flex items-center justify-center shadow-lg border-2 border-white",
                                    colors.bg
                                )}>
                                    <span className="rotate-[270deg] font-black text-[10px] uppercase tracking-widest whitespace-nowrap text-white">
                                        {task.category}
                                    </span>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex-1 ml-4"
                            >
                                <TaskCard task={task} onComplete={onCompleteTask} />
                            </motion.div>
                        </div>
                    );
                })}

                {tasks.length === 0 && (
                    <div className="text-center py-10 opacity-50 pr-8">
                        <p className="text-[#6B5B6E] italic">No tasks yet for today. Let's create something magical! ✨</p>
                    </div>
                )}
            </div>
        </div>
    );
};
