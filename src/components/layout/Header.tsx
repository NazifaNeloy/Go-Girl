import React from 'react';
import { Sparkles, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Growth', path: '/growth' },
    { label: 'Budget', path: '/budget' },
    { label: 'Profile', path: '/profile' },
    { label: 'Code', path: 'https://github.com/NazifaNeloy/Go-Girl', external: true },
];

export const Header: React.FC = () => {
    const location = useLocation();

    return (
        <header className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between bg-black/20 backdrop-blur-xl border-b border-white/5">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />

            <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(236,72,153,0.3)] group-hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all">
                        <Sparkles size={16} />
                    </div>
                    <span className="font-black text-lg tracking-tighter text-white uppercase italic">
                        Go Girl
                    </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        if (item.external) {
                            return (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-bold text-gray-400 uppercase tracking-widest transition-colors hover:text-pink-500"
                                >
                                    {item.label}
                                </a>
                            );
                        }
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "text-xs font-bold uppercase tracking-widest transition-colors hover:text-pink-500",
                                    isActive ? "text-pink-500" : "text-gray-400"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <button className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white border border-transparent hover:border-white/10">
                <Bell size={20} />
            </button>
        </header>
    );
};
