import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Smile } from 'lucide-react';
import type { DailyLog } from '../../lib/supabase';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

interface GlowSquareModalProps {
    isOpen: boolean;
    onClose: () => void;
    dayData: { date: Date; log?: DailyLog } | null;
}

export const GlowSquareModal: React.FC<GlowSquareModalProps> = ({ isOpen, onClose, dayData }) => {
    if (!dayData) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 rounded-2xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 m-auto w-[90%] max-w-sm h-fit glass-card z-50 p-6 shadow-2xl"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-2 text-purple-900">
                                <Calendar size={18} />
                                <span className="font-semibold">{format(dayData.date, 'MMMM do, yyyy')}</span>
                            </div>
                            <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        {dayData.log ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-white",
                                        dayData.log.glow_points > 30 ? "bg-purple-600" : "bg-pink-400"
                                    )}>
                                        ✨
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{dayData.log.glow_points} Glow Points</p>
                                        <div className="flex items-center text-xs text-text-secondary mt-0.5">
                                            <Smile size={12} className="mr-1" />
                                            Mood: {dayData.log.mood || "Neutral"}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/40 p-3 rounded-xl text-sm border border-white/60">
                                    <p className="italic text-text-secondary">"{dayData.log.learning_log || "No log entry for this day."}"</p>
                                </div>

                                {dayData.log.code_snippet && (
                                    <div className="bg-slate-900 p-3 rounded-xl overflow-x-auto text-xs font-mono text-green-400">
                                        <pre>{dayData.log.code_snippet}</pre>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-text-secondary">
                                <p>No activity recorded for this day.</p>
                                <p className="text-xs mt-2">Rest days are productive too! 😴</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
