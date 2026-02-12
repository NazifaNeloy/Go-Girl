import React, { useEffect, useState } from 'react';
import { Sparkles, Bell, LogIn, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import supabase from '../../lib/supabaseClient';
import { cn } from '../../lib/utils';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Tasks', path: '/tasks' },
    { label: 'Growth', path: '/growth' },
    { label: 'Budget', path: '/budget' },
];

export const Header: React.FC = () => {
    const location = useLocation();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Initial user check
        supabase.auth.getUser().then(({ data: { user } }: any) => setUser(user));

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

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

            <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white border border-transparent hover:border-white/10">
                    <Bell size={20} />
                </button>

                {user ? (
                    <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                        <Link to="/profile" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 overflow-hidden group-hover:border-pink-500 transition-colors">
                                {user.user_metadata?.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-pink-500 text-white">
                                        <User size={14} />
                                    </div>
                                )}
                            </div>
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="p-2 rounded-full text-gray-400 hover:text-pink-500 transition-colors"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all hover:scale-105"
                    >
                        <LogIn size={14} className="text-pink-500" />
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};
