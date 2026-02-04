import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const QUOTES = [
    "The system rewards those who grind.",
    "Laziness is a status effect. Cure it.",
    "Your future self is watching.",
    "Discipline > Motivation.",
    "Arise and code.",
    "Level up your mind, the body will follow.",
    "Every small commit is a victory."
];

export const SystemMessage: React.FC = () => {
    const [quote, setQuote] = useState(QUOTES[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuote(prev => {
                const currentIndex = QUOTES.indexOf(prev);
                return QUOTES[(currentIndex + 1) % QUOTES.length];
            });
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-gray-900 via-gray-900 to-black border border-pink-500/20 rounded-3xl p-8 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(236,72,153,0.1)] h-full min-h-[300px]"
        >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-600/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-14 h-14 mx-auto bg-pink-500/10 rounded-full flex items-center justify-center mb-6 border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.2)]"
                >
                    <Sparkles className="w-7 h-7 text-pink-400" />
                </motion.div>
            </div>

            <h4 className="text-pink-500 text-xs font-mono uppercase tracking-[0.2em] mb-4 font-bold">System Message</h4>

            <AnimatePresence mode="wait">
                <motion.p
                    key={quote}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="text-white font-medium text-xl italic leading-relaxed px-4"
                >
                    "{quote}"
                </motion.p>
            </AnimatePresence>

            <div className="mt-8 h-1 w-16 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="h-full w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent"
                ></motion.div>
            </div>
        </motion.div>
    );
};
