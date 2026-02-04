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
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 pointer-events-auto"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 m-auto w-[90%] max-w-sm h-fit bg-[#0a0a0a]/90 border border-white/10 rounded-3xl z-50 p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
                    >
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600 opacity-60" />

                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center space-x-3 text-white">
                                <Calendar size={20} className="text-pink-500" />
                                <span className="font-black uppercase italic tracking-tighter text-lg">{format(dayData.date, 'MMMM do, yyyy')}</span>
                            </div>
                            <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-colors border border-white/5">
                                <X size={20} />
                            </button>
                        </div>

                        {dayData.log ? (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg",
                                        dayData.log.glow_points > 30 ? "bg-purple-600 shadow-purple-600/20" : "bg-pink-600 shadow-pink-600/20"
                                    )}>
                                        ✨
                                    </div>
                                    <div>
                                        <p className="font-black text-2xl text-white tracking-tighter">{dayData.log.glow_points} GLOW XP</p>
                                        <div className="flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                                            <Smile size={12} className="mr-1.5 text-pink-500" />
                                            Mood: {dayData.log.mood || "Neutral"}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Learning Log</h4>
                                    <div className="bg-white/5 p-4 rounded-2xl text-sm border border-white/5 text-gray-300 leading-relaxed italic">
                                        "{dayData.log.learning_log || "No log entry for this day."}"
                                    </div>
                                </div>

                                {dayData.log.code_snippet && (
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Neural Code Extract</h4>
                                        <div className="bg-black border border-white/10 p-4 rounded-2xl overflow-x-auto text-[11px] font-mono text-pink-400/80 shadow-inner">
                                            <pre><code>{dayData.log.code_snippet}</code></pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-10 space-y-4">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/5">
                                    <Smile size={32} className="text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-white font-bold uppercase tracking-widest text-xs">No System Logs Found</p>
                                    <p className="text-[10px] text-gray-500 mt-2 font-mono uppercase">Rest days are productive too • Arise soon</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 pt-4 border-t border-white/5 flex justify-center">
                            <span className="text-[8px] font-mono text-gray-700 uppercase tracking-[0.3em]">Status: Data Synchronized</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
