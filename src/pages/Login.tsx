import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Github, Chrome, ArrowRight, ShieldCheck } from 'lucide-react';
import { authService } from '../services/authService';
import { cn } from '../lib/utils';

export const Login: React.FC = () => {
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const handleOAuthLogin = async (provider: 'google' | 'github') => {
        setIsLoading(provider);
        try {
            await authService.signInWithOAuth(provider);
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(null);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-700" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10 space-y-12"
            >
                {/* Branding */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="w-20 h-20 mx-auto rounded-[2rem] bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                    >
                        <Sparkles size={40} />
                    </motion.div>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
                            Level Up <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">Your Life</span>
                        </h1>
                        <p className="text-gray-400 text-sm font-medium tracking-tight">
                            The ultimate dashboard for tasks & finance
                        </p>
                    </div>
                </div>

                {/* Login Options */}
                <div className="space-y-4">
                    <button
                        onClick={() => handleOAuthLogin('google')}
                        disabled={!!isLoading}
                        className={cn(
                            "w-full group relative flex items-center justify-between p-5 rounded-[2rem] bg-white text-black font-black uppercase tracking-widest text-sm transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50",
                            isLoading === 'google' && "animate-pulse"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <Chrome size={20} strokeWidth={3} />
                            <span>Continue with Google</span>
                        </div>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => handleOAuthLogin('github')}
                        disabled={!!isLoading}
                        className={cn(
                            "w-full group relative flex items-center justify-between p-5 rounded-[2rem] bg-zinc-900 border border-white/10 text-white font-black uppercase tracking-widest text-sm transition-all hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 disabled:opacity-50",
                            isLoading === 'github' && "animate-pulse"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <Github size={20} />
                            <span>Continue with GitHub</span>
                        </div>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    <ShieldCheck size={14} className="text-pink-500/50" />
                    <span>Securely powered by Supabase</span>
                </div>
            </motion.div>

            {/* Decorative Grid Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
    );
};
