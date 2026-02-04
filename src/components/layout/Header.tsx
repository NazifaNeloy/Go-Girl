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
        <header className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between glass border-b-0 border-b-transparent/0 bg-white/30 backdrop-blur-md">
            <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center text-white">
                        <Sparkles size={16} />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-text-primary">
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
                                    className="text-sm font-medium text-text-secondary transition-colors hover:text-pink-600"
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
                                    "text-sm font-medium transition-colors hover:text-pink-600",
                                    isActive ? "text-pink-600" : "text-text-secondary"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <button className="p-2 rounded-full hover:bg-white/40 transition-colors">
                <Bell size={20} className="text-text-secondary" />
            </button>
        </header>
    );
};
