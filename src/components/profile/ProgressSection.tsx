import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Brain, Sparkles, Trophy, Book } from 'lucide-react';

interface CircularProgressProps {
    value: number;
    max: number;
    color: string;
    label: string;
    subtext: string;
    icon: React.ElementType;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, max, color, label, subtext, icon: Icon }) => {
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const percentage = value / max;
    const strokeDashoffset = circumference - percentage * circumference;

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center relative group overflow-hidden shadow-lg"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r={radius} stroke="#1f1f1f" strokeWidth="8" fill="transparent" />
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="64" cy="64" r={radius}
                        stroke={color} strokeWidth="8" fill="transparent"
                        strokeDasharray={circumference} strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_currentColor]"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-3 rounded-full bg-white/5 border border-white/5 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>

            <h3 className="text-white font-bold text-base z-10 tracking-wide uppercase">{label}</h3>
            <p className="text-gray-400 text-xs z-10 mt-1 font-mono tracking-wider">{value} / {subtext}</p>
        </motion.div>
    );
};

interface ProgressSectionProps {
    glowPoints: number;
    monthlyTarget: number;
    streakDays: number;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({ glowPoints, monthlyTarget, streakDays }) => {
    return (
        <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"></div>
                    <div>
                        <h2 className="text-white font-black text-2xl tracking-tight uppercase italic">Stats Distribution</h2>
                        <p className="text-gray-500 text-xs font-mono">SYSTEM LEVEL: MONARCH</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active Streak</span>
                    <div className="flex items-center gap-2">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], filter: ["drop-shadow(0 0 2px #f97316)", "drop-shadow(0 0 8px #f97316)", "drop-shadow(0 0 2px #f97316)"] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-orange-500"
                        >
                            <Flame fill="currentColor" size={20} />
                        </motion.div>
                        <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
                            {streakDays} DAYS
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CircularProgress
                    value={Math.min(glowPoints, 400)}
                    max={400}
                    color="#ec4899"
                    label="Hard Skills"
                    subtext="400 XP"
                    icon={Brain}
                />
                <CircularProgress
                    value={120}
                    max={200}
                    color="#a855f7"
                    label="Soft Skills"
                    subtext="200 XP"
                    icon={Sparkles}
                />
                <CircularProgress
                    value={80}
                    max={150}
                    color="#f59e0b"
                    label="Challenges"
                    subtext="150 XP"
                    icon={Trophy}
                />
                <CircularProgress
                    value={Math.min(glowPoints, monthlyTarget)}
                    max={monthlyTarget}
                    color="#3b82f6"
                    label="Monthly Goal"
                    subtext={`${monthlyTarget} XP`}
                    icon={Book}
                />
            </div>
        </section>
    );
};
