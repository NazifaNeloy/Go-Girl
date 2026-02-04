import React, { type ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { Header } from './Header';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen pb-24 md:pb-0 relative overflow-hidden bg-warm-neutral">
            {/* Background Gradients */}
            <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-soft-pink/40 rounded-full blur-[100px] pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-lavender/40 rounded-full blur-[100px] pointer-events-none" />

            <Header />

            <main className="px-4 py-6 max-w-md mx-auto md:max-w-2xl lg:max-w-4xl relative z-10 space-y-6">
                {children}
            </main>

            <BottomNav />
        </div>
    );
};
