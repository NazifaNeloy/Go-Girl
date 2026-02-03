import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface ProgressSectionProps {
    glowPoints: number;
    monthlyTarget: number;
    streakDays: number;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({ glowPoints, monthlyTarget, streakDays }) => {
    const progressPercentage = Math.min((glowPoints / monthlyTarget) * 100, 100);

    return (
        <div className="space-y-4">
            {/* Streak Counter */}
            <div className="flex items-center justify-between glass px-4 py-3 rounded-xl">
                <span className="font-medium text-text-secondary">Current Streak</span>
                <div className="flex items-center space-x-2">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-orange-500"
                    >
                        <Flame fill="currentColor" size={24} />
                    </motion.div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
                        {streakDays} Days
                    </span>
                </div>
            </div>

            {/* Glow Progress Bar */}
            <div className="glass-card p-5 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="font-semibold text-purple-900">Monthly Glow ✨</span>
                    <span className="text-purple-600">{glowPoints} / {monthlyTarget} XP</span>
                </div>
                <div className="h-4 w-full bg-pink-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-pink-400 to-purple-600 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                    />
                </div>
                <p className="text-xs text-center text-text-secondary pt-1">
                    "Success is the sum of small efforts, repeated day in and day out." 💖
                </p>
            </div>
        </div>
    );
};
