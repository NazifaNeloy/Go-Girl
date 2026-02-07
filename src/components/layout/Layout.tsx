import React, { type ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { Header } from './Header';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen pb-24 md:pb-0 relative overflow-hidden">

            <Header />

            <main className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6">
                {children}
            </main>

            <BottomNav />
        </div>
    );
};
