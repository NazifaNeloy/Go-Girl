import React, { useState } from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProgressSection } from '../components/profile/ProgressSection';
import { GlowHeatmap } from '../components/profile/GlowHeatmap';
import { SystemMessage } from '../components/profile/SystemMessage';
import type { UserProfile, DailyLog } from '../lib/supabase';
import profilePic from '../assets/photos/neel_cartoon.jpg';

// --- MOCK DATA FOR UI DEVELOPMENT ---
const MOCK_PROFILE: UserProfile = {
    id: '1',
    username: 'Nazifa Neloy',
    avatar_url: profilePic,
    title: 'Shadow Monarch (Dev)',
    bio: 'Leveling up daily. Focus on React and Systems Architecture.',
    location: 'Seoul, Dungeon Gate 1',
    total_glow_points: 420,
    github_url: 'https://github.com/NazifaNeloy/Go-Girl',
    linkedin_url: '#'
};

const MOCK_LOGS: DailyLog[] = [
    { id: '1', user_id: '1', date: '2025-01-10', glow_points: 5, mood: 'tired', learning_log: 'Too tired, just did 1 leetcode.' },
    { id: '2', user_id: '1', date: '2025-01-12', glow_points: 40, mood: 'excited', learning_log: 'Crushed the React docs today!', code_snippet: 'useEffect(() => {\n  console.log("I am glowing!");\n}, []);' },
    { id: '3', user_id: '1', date: '2025-10-24', glow_points: 15, mood: 'focused' },
    ...Array.from({ length: 40 }).map((_, i) => ({
        id: `gen-${i}`,
        user_id: '1',
        date: new Date(new Date().setDate(new Date().getDate() - i * 3)).toISOString(),
        glow_points: Math.floor(Math.random() * 50),
        mood: ['happy', 'stressed', 'focused'][Math.floor(Math.random() * 3)]
    }) as DailyLog)
];

export const Profile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE);

    const handleUpdateBio = (newBio: string) => {
        setProfile(prev => ({ ...prev, bio: newBio }));
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20 pt-4">
            {/* Identity Section */}
            <ProfileHeader profile={profile} onUpdateBio={handleUpdateBio} />

            {/* Progress Section */}
            <ProgressSection
                glowPoints={profile.total_glow_points}
                monthlyTarget={600}
                streakDays={12}
            />

            {/* Heatmap & System Messages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 h-full">
                    <SystemMessage />
                </div>
                <div className="lg:col-span-2">
                    <GlowHeatmap logs={MOCK_LOGS} />
                </div>
            </div>
        </div>
    );
};
