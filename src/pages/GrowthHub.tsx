import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Send, Play, Folder, Star, ChevronRight, LayoutGrid } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';

export const GrowthHub: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
    const [isActive, setIsActive] = useState(false);
    const [showReflection, setShowReflection] = useState(false);
    const [reflection, setReflection] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let interval: any = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            setShowReflection(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStartTimer = () => setIsActive(true);

    const handleSubmitReflection = async () => {
        if (!reflection.trim()) return;
        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('daily_logs')
                .insert([{ content: reflection, type: 'reflection', created_at: new Date() }]);

            if (error) throw error;
            setReflection('');
            setShowReflection(false);
            setTimeLeft(30 * 60);
            alert('Reflection saved! ✨');
        } catch (error) {
            console.error('Error saving reflection:', error);
            alert('Failed to save reflection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const folders = [
        { title: 'YouTube Folders', count: 12, icon: Play, color: 'text-red-500' },
        { title: 'Focus Folders', count: 8, icon: LayoutGrid, color: 'text-blue-500' },
        { title: 'Resource Hub', count: 15, icon: Folder, color: 'text-yellow-500' },
        { title: 'Skill Garden', count: 6, icon: Star, color: 'text-green-500' },
    ];

    const skills = [
        { name: 'UI/UX Design', progress: 87, level: 'Advanced' },
        { name: 'React Development', progress: 64, level: 'Intermediate' },
        { name: 'Product Growth', progress: 42, level: 'Beginner' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] text-white pb-32">
            <div className="max-w-md mx-auto px-6 space-y-8">
                {/* Header */}
                <div className="pt-8">
                    <h1 className="text-3xl font-bold tracking-tight">Growth Hub</h1>
                    <p className="text-gray-400 mt-2">Invest in yourself & reflect daily.</p>
                </div>

                {/* 30-Day Challenge Section */}
                <section className="glass-dark rounded-3xl p-6 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#FF71CD]">Day 14/30</span>
                    </div>

                    <h2 className="text-xl font-bold mb-4">Invest & Reflect</h2>

                    <div className="flex flex-col items-center justify-center py-6">
                        <div className={cn(
                            "relative w-48 h-48 rounded-full flex items-center justify-center border-4 transition-all duration-500",
                            isActive ? "border-[#FF71CD] neon-glow-pink" : "border-white/10"
                        )}>
                            <div className="text-center">
                                <span className="text-4xl font-mono font-bold">{formatTime(timeLeft)}</span>
                                <p className="text-xs text-gray-400 mt-1 uppercase tracking-tighter">Stay Focused</p>
                            </div>
                        </div>

                        {!showReflection && !isActive && (
                            <button
                                onClick={handleStartTimer}
                                className="mt-8 px-8 py-3 bg-[#FF71CD] hover:bg-[#ff89d5] text-black font-bold rounded-full transition-all active:scale-95 flex items-center gap-2"
                            >
                                <Timer size={20} />
                                Start Focus Session
                            </button>
                        )}

                        {isActive && (
                            <button
                                onClick={() => setIsActive(false)}
                                className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all active:scale-95"
                            >
                                Pause
                            </button>
                        )}
                    </div>

                    <AnimatePresence>
                        {showReflection && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-6 space-y-4 pt-6 border-t border-white/10"
                            >
                                <h3 className="font-bold">Daily Reflection</h3>
                                <textarea
                                    value={reflection}
                                    onChange={(e) => setReflection(e.target.value)}
                                    placeholder="What did you learn today?"
                                    className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#FF71CD] transition-colors resize-none"
                                />
                                <button
                                    onClick={handleSubmitReflection}
                                    disabled={isSubmitting || !reflection.trim()}
                                    className="w-full py-3 bg-gradient-to-r from-[#FF71CD] to-[#9D50BB] text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Log'}
                                    <Send size={18} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* YouTube & Focus Folders */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Media Library</h2>
                        <button className="text-xs text-[#FF71CD] font-bold">View All</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {folders.map((folder) => (
                            <motion.div
                                key={folder.title}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="glass-dark p-4 rounded-2xl border border-white/10 flex flex-col items-start gap-4 cursor-pointer group"
                            >
                                <div className={cn("p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors", folder.color)}>
                                    <folder.icon size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">{folder.title}</h3>
                                    <p className="text-xs text-gray-400 mt-1">{folder.count} Items</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Skill Roadmaps */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold">Skill Roadmaps</h2>
                    <div className="space-y-6">
                        {skills.map((skill) => (
                            <div key={skill.name} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="font-bold text-sm">{skill.name}</h3>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{skill.level}</p>
                                    </div>
                                    <span className="text-sm font-bold text-[#FF71CD]">{skill.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.progress}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className="h-full bg-gradient-to-r from-[#FF71CD] to-[#9D50BB]"
                                    />
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-gray-400">
                                    <span>Next: Project Milestone</span>
                                    <ChevronRight size={12} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
