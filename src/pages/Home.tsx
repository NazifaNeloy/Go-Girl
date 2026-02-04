import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export const Home: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-10 py-10 px-4">
            <header className="space-y-2">
                <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 uppercase italic tracking-tighter">
                    Arise, Girlie! 💖
                </h1>
                <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">System Status: Optimal</p>
            </header>

            {/* Daily Progress Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.1)] group"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-pink-500/20 transition-all duration-700" />

                <h2 className="font-black text-xl text-white mb-6 uppercase italic tracking-tight">Today's Focus</h2>

                <div className="flex items-center space-x-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-pink-500/30 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                        🚀
                    </div>
                    <div>
                        <p className="font-bold text-xl text-white">Complete React Module</p>
                        <p className="text-sm font-mono text-pink-400 tracking-widest uppercase">2 Hours Remaining</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-gray-500 uppercase tracking-widest">
                        <span>Progress</span>
                        <span>65%</span>
                    </div>
                    <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full shadow-[0_0_10px_#ec4899]"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { label: 'Journal', icon: '✨', color: 'from-pink-500/10 to-transparent', border: 'border-pink-500/20' },
                    { label: 'Finances', icon: '💸', color: 'from-purple-500/10 to-transparent', border: 'border-purple-500/20' },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                            "bg-gradient-to-br p-8 rounded-3xl flex flex-col items-center justify-center space-y-4 cursor-pointer border backdrop-blur-md transition-all",
                            item.color, item.border, "hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.1)]"
                        )}
                    >
                        <span className="text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{item.icon}</span>
                        <span className="font-black text-sm text-white uppercase tracking-widest">{item.label}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
