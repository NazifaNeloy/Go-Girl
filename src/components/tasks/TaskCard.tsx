import React from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { Clock, CheckCircle2 } from 'lucide-react';
import type { Task } from '../../lib/supabase';
import { cn } from '../../lib/utils';

interface TaskCardProps {
    task: Task;
    onComplete: (id: string) => void;
}

const CATEGORY_STYLES: Record<string, { cardBg: string, labelBg: string, labelText: string, bullet: string }> = {
    Meeting: { cardBg: 'bg-[#F5D6D9]', labelBg: 'bg-white', labelText: 'text-[#B47B84]', bullet: 'bg-[#B47B84]' },
    Study: { cardBg: 'bg-[#E5D9F2]', labelBg: 'bg-white', labelText: 'text-[#947EB0]', bullet: 'bg-[#947EB0]' },
    Travelling: { cardBg: 'bg-[#FDF2D0]', labelBg: 'bg-white', labelText: 'text-[#D4A343]', bullet: 'bg-[#D4A343]' },
    Personal: { cardBg: 'bg-[#F9DCC4]', labelBg: 'bg-white', labelText: 'text-[#E09F7D]', bullet: 'bg-[#E09F7D]' },
    Work: { cardBg: 'bg-[#F0F4F8]', labelBg: 'bg-white', labelText: 'text-[#64748B]', bullet: 'bg-[#64748B]' },
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
                "rounded-[40px] p-6 mb-4 relative cursor-grab active:cursor-grabbing shadow-[0_15px_30px_rgba(0,0,0,0.08)]",
                styles.cardBg,
                task.is_completed && "opacity-60 grayscale-[0.3]"
            )}
        >
            <div className="space-y-4">
                {/* Time Pill */}
                <div className="flex">
                    <div className={cn(
                        "flex items-center space-x-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                        styles.labelBg,
                        styles.labelText
                    )}>
                        <Clock size={12} strokeWidth={3} />
                        <span>{task.start_time} - {task.end_time}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className={cn(
                    "text-lg font-black leading-tight",
                    styles.labelText,
                    task.is_completed && "line-through"
                )}>
                    {task.title}
                </h3>

                {/* Sub-tasks */}
                {(task.sub_tasks && task.sub_tasks.length > 0) ? (
                    <ul className="space-y-2">
                        {task.sub_tasks.map((sub, i) => (
                            <li key={i} className="flex items-center space-x-3 text-xs font-semibold text-gray-700/80">
                                <div className={cn("w-1.5 h-1.5 rounded-full", styles.bullet)} />
                                <span>{sub}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-[10px] font-medium opacity-50 uppercase tracking-widest italic">No sub-tasks listed</p>
                )}
            </div>

            {task.is_completed && (
                <div className="absolute top-6 right-6">
                    <CheckCircle2 className="text-green-500" size={24} />
                </div>
            )}
        </motion.div>
    );
};
