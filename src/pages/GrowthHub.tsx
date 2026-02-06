import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Send, Play, Folder, Star, ChevronRight, LayoutGrid } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';
import profilePic from '../assets/photos/neel_cartoon.jpg';

export const GrowthHub: React.FC = () => {
    const [duration, setDuration] = useState(30); // minutes
    const [timeLeft, setTimeLeft] = useState(30 * 60);
    const [isActive, setIsActive] = useState(false);
    const [showReflection, setShowReflection] = useState(false);
    const [reflection, setReflection] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFocusFolder, setShowFocusFolder] = useState(false);

    useEffect(() => {
        let interval: any = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
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

    const handleStartTimer = () => {
        if (!isActive) {
            setTimeLeft(duration * 60);
        }
        setIsActive(true);
    };

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
            setTimeLeft(duration * 60);
            alert('Reflection saved! ✨');
        } catch (error) {
            console.error('Error saving reflection:', error);
            alert('Failed to save reflection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const folders = [
        { title: 'YouTube Folders', count: 12, icon: Play, color: 'text-red-500', gradient: 'from-red-500/10' },
        { title: 'Focus Folders', count: 8, icon: LayoutGrid, color: 'text-[#FF71CD]', gradient: 'from-[#FF71CD]/10', action: () => setShowFocusFolder(true) },
        { title: 'Resource Hub', count: 15, icon: Folder, color: 'text-yellow-500', gradient: 'from-yellow-500/10' },
        { title: 'Skill Garden', count: 6, icon: Star, color: 'text-green-500', gradient: 'from-green-500/10' },
    ];

    const progressData = [40, 60, 45, 80, 55, 90, 87];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] text-white pb-32 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="diagonal-lines" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
                </svg>
            </div>

            <div className="max-w-6xl mx-auto px-6 space-y-12 relative z-10">
                {/* User Header */}
                <div className="pt-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-2 border-[#FF71CD] p-0.5">
                            <img
                                src={profilePic}
                                alt="User"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Welcome back</p>
                            <h1 className="text-xl font-bold">Nazifa Neloy</h1>
                        </div>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                    {/* Left Column: Progress & Library */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Progress Section */}
                        <section className="glass-dark rounded-[2.5rem] p-8 border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 flex flex-col items-end">
                                <span className="text-4xl font-bold">87%</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Passed</span>
                            </div>

                            <div className="relative z-10 space-y-6 text-left">
                                <div>
                                    <h2 className="text-2xl font-black italic tracking-tighter uppercase">Your progress is amazing!</h2>
                                    <p className="text-gray-400 text-sm mt-1">Keep up the good work 😎</p>
                                </div>

                                <div className="flex items-end gap-3 h-32 pt-4">
                                    {progressData.map((val, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="w-full bg-white/5 rounded-t-lg rounded-b-sm relative overflow-hidden h-full flex items-end">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${val}%` }}
                                                    className={cn(
                                                        "w-full rounded-t-sm",
                                                        i === progressData.length - 1 ? "bg-[#FF71CD] shadow-[0_0_15px_#FF71CD]" : "bg-white/10"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Media Grid */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold uppercase tracking-tight italic">Resource Library</h2>
                                <button className="text-xs text-[#FF71CD] font-bold uppercase tracking-widest">See All</button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {folders.map((folder) => (
                                    <motion.div
                                        key={folder.title}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={folder.action}
                                        className={cn(
                                            "glass-dark p-6 rounded-[2rem] border border-white/10 flex flex-col items-start gap-5 cursor-pointer group bg-gradient-to-br to-transparent text-left",
                                            folder.gradient
                                        )}
                                    >
                                        <div className={cn("p-4 rounded-2xl bg-black/40 border border-white/5 transition-colors group-hover:bg-black/60", folder.color)}>
                                            <folder.icon size={22} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base">{folder.title}</h3>
                                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">{folder.count} Folders</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Focus & Active Courses */}
                    <div className="space-y-10">
                        {/* Focus / Timer Card */}
                        <section className="space-y-6 text-left">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold uppercase tracking-tight italic">Focus Mode</h2>
                                <span className="text-[10px] bg-[#FF71CD]/20 text-[#FF71CD] px-2 py-0.5 rounded-full font-bold">ALPHA</span>
                            </div>

                            <AnimatePresence mode="wait">
                                {!showFocusFolder ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        className="h-[430px] glass-dark rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center p-8 text-center"
                                    >
                                        <div className="w-24 h-24 rounded-full bg-[#FF71CD]/10 border border-[#FF71CD]/20 flex items-center justify-center text-[#FF71CD] mb-6 animate-pulse">
                                            <Timer size={48} />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">Ready to Focus?</h3>
                                        <p className="text-sm text-gray-400 mb-8">Set your timer in the Focus Folder</p>
                                        <button
                                            onClick={() => setShowFocusFolder(true)}
                                            className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform active:scale-95"
                                        >
                                            Open Folder
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="h-[430px] bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-[2.5rem] border border-[#FF71CD]/20 p-8 flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(255,113,205,0.1)] text-left"
                                    >
                                        <button
                                            onClick={() => setShowFocusFolder(false)}
                                            className="absolute top-6 left-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white"
                                        >
                                            <ChevronRight size={16} className="rotate-180" />
                                        </button>

                                        <div className="mt-8 flex-1 flex flex-col items-center justify-center space-y-8">
                                            <div className={cn(
                                                "w-48 h-48 rounded-full border-2 flex items-center justify-center transition-all duration-700",
                                                isActive ? "border-[#FF71CD] shadow-[0_0_30px_rgba(255,113,205,0.3)] bg-[#FF71CD]/5" : "border-white/10"
                                            )}>
                                                <div className="text-center">
                                                    <span className="text-5xl font-mono font-black italic tracking-tighter">{formatTime(timeLeft)}</span>
                                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">
                                                        {isActive ? 'Keep Going' : 'Set Timer'}
                                                    </p>
                                                </div>
                                            </div>

                                            {!isActive ? (
                                                <div className="w-full space-y-6">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                                            <span>Duration</span>
                                                            <span className="text-[#FF71CD]">{duration} Min</span>
                                                        </div>
                                                        <input
                                                            type="range"
                                                            min="1"
                                                            max="120"
                                                            value={duration}
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                setDuration(val);
                                                                setTimeLeft(val * 60);
                                                            }}
                                                            className="w-full accent-[#FF71CD] h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={handleStartTimer}
                                                        className="w-full py-4 bg-[#FF71CD] text-black font-black uppercase tracking-widest rounded-3xl shadow-[0_5px_15px_rgba(255,113,205,0.4)]"
                                                    >
                                                        Arise!
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setIsActive(false)}
                                                    className="px-12 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-3xl hover:bg-white/10 transition-colors"
                                                >
                                                    Pause
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>

                        {/* Recent Reflection Card */}
                        <AnimatePresence>
                            {showReflection && (
                                <motion.section
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass-dark rounded-[2rem] p-6 border border-white/10 text-left"
                                >
                                    <h3 className="text-lg font-bold mb-4 uppercase italic tracking-tight">Mission Report</h3>
                                    <textarea
                                        value={reflection}
                                        onChange={(e) => setReflection(e.target.value)}
                                        placeholder="Log your progress, Monarch..."
                                        className="w-full h-32 bg-black/40 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#FF71CD] transition-all resize-none mb-4"
                                    />
                                    <button
                                        onClick={handleSubmitReflection}
                                        disabled={isSubmitting || !reflection.trim()}
                                        className="w-full py-4 bg-gradient-to-r from-[#FF71CD] to-[#9D50BB] text-white font-black uppercase tracking-widest rounded-2xl disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
                                    >
                                        {isSubmitting ? 'Syncing...' : 'Sync Data'}
                                        <Send size={18} />
                                    </button>
                                </motion.section>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};
