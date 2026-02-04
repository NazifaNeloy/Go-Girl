import React from 'react';
import { Home, BookHeart, Wallet, UserCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BookHeart, label: 'Growth', path: '/growth' },
    { icon: Wallet, label: 'Budget', path: '/budget' },
    { icon: UserCircle2, label: 'Profile', path: '/profile' },
];

export const BottomNav: React.FC = () => {
    const location = useLocation();

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 pt-2 z-50 md:hidden">
            <nav className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex flex-col items-center justify-center space-y-1 transition-all relative",
                                isActive ? "text-pink-500" : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-nav"
                                    className="absolute -top-3 w-1 h-1 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]"
                                />
                            )}
                            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};
