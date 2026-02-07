import { Home, BookHeart, Wallet, UserCircle2, LayoutList } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutList, label: 'Tasks', path: '/tasks' },
    { icon: BookHeart, label: 'Growth', path: '/growth' },
    { icon: Wallet, label: 'Budget', path: '/budget' },
    { icon: UserCircle2, label: 'Profile', path: '/profile' },
];

export const BottomNav: React.FC = () => {
    const location = useLocation();

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 pt-2 z-50 md:hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Link
                    to="/"
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-black text-white border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform hover:scale-110 active:scale-95 z-50"
                >
                    <Home size={28} />
                </Link>
            </div>

            <nav className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-4 flex justify-around items-center shadow-[0_0_30px_rgba(0,0,0,0.8)] relative">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    // Skip Home in the regular items since it's the floating button
                    if (item.path === '/') return <div key="spacer" className="w-16 h-4" />;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex flex-col items-center justify-center space-y-1 transition-all relative",
                                isActive ? "text-[#FF71CD]" : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-nav"
                                    className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-[#FF71CD] shadow-[0_0_12px_#FF71CD]"
                                />
                            )}
                            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};
