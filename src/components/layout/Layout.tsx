import React, { type ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { Header } from './Header';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen pb-24 md:pb-0 relative overflow-hidden bg-[#050505]">
            {/* Background Gradients */}
            <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <Header />

            <main className="relative z-10 w-full px-4 py-6">
                {children}
            </main>

            <BottomNav />
        </div>
    );
};
