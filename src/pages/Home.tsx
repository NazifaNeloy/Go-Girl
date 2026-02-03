import React from 'react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
                    Good Morning, Girlie! 💖
                </h1>
                <p className="text-text-secondary">Ready to conquer the tech world today?</p>
            </header>

            {/* Daily Progress Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full blur-3xl -z-10" />
                <h2 className="font-semibold text-lg mb-2">Today's Focus</h2>
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-2xl">
                        🚀
                    </div>
                    <div>
                        <p className="font-medium">Complete React Module</p>
                        <p className="text-xs text-text-secondary">2 hours remaining</p>
                    </div>
                </div>

                <div className="w-full bg-white/50 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-pink-400 to-purple-400 w-2/3 h-full rounded-full" />
                </div>
            </motion.div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'Journal', icon: '✨', color: 'bg-lavender/50' },
                    { label: 'Finances', icon: '💸', color: 'bg-green-100/50' },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`glass p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 cursor-pointer ${item.color}`}
                    >
                        <span className="text-3xl">{item.icon}</span>
                        <span className="font-medium text-sm">{item.label}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
