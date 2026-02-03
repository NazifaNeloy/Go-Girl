import React from 'react';
import { Sparkles, Bell } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between glass border-b-0 border-b-transparent/0 bg-white/30">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center text-white">
                    <Sparkles size={16} />
                </div>
                <span className="font-bold text-lg tracking-tight text-text-primary">
                    Go Girl
                </span>
            </div>

            <button className="p-2 rounded-full hover:bg-white/40 transition-colors">
                <Bell size={20} className="text-text-secondary" />
            </button>
        </header>
    );
};
