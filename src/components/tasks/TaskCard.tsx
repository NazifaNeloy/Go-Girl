import React from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { Clock, CheckCircle2 } from 'lucide-react';
import { type Task } from '../../lib/supabaseClient';
import { cn } from '../../lib/utils';

interface TaskCardProps {
    task: Task;
    onComplete: (id: string) => void;
}

const CATEGORY_STYLES: Record<string, { accent: string }> = {
    Meeting: { accent: 'bg-[#B47B84]' },
    Study: { accent: 'bg-[#947EB0]' },
    Travelling: { accent: 'bg-[#D4A343]' },
    Personal: { accent: 'bg-pink-500' },
    Work: { accent: 'bg-blue-500' },
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
    const styles = CATEGORY_STYLES[task.category] || CATEGORY_STYLES.Personal;

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.x > 100) {
            onComplete(task.id);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            drag="x"
            dragConstraints={{ left: 0, right: 100 }}
            onDragEnd={handleDragEnd}
            className={cn(
                "rounded-[40px] p-6 mb-4 relative cursor-grab active:cursor-grabbing shadow-2xl transition-all",
                "bg-zinc-900/50 backdrop-blur-xl border border-white/10",
                task.is_completed && "opacity-50 grayscale"
            )}
        >
            <div className="space-y-4">
                {/* Time Pill */}
                <div className="flex">
                    <div className={cn(
                        "flex items-center space-x-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-white"
                    )}>
                        <Clock size={12} strokeWidth={3} className="text-pink-500" />
                        <span>{task.start_time} - {task.end_time}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className={cn(
                    "text-lg font-black leading-tight text-white",
                    task.is_completed && "line-through text-gray-500"
                )}>
                    {task.title}
                </h3>

                {/* Sub-tasks */}
                {(task.sub_tasks && task.sub_tasks.length > 0) ? (
                    <ul className="space-y-2">
                        {task.sub_tasks.map((sub: string, i: number) => (
                            <li key={i} className="flex items-center space-x-3 text-xs font-semibold text-gray-400">
                                <div className={cn("w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]", styles.accent)} />
                                <span>{sub}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-[10px] font-medium opacity-30 uppercase tracking-widest italic text-white">No sub-tasks</p>
                )}
            </div>

            {task.is_completed && (
                <div className="absolute top-6 right-6">
                    <CheckCircle2 className="text-pink-500" size={24} />
                </div>
            )}
        </motion.div>
    );
};
