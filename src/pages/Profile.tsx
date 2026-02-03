import React, { useState } from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProgressSection } from '../components/profile/ProgressSection';
import { GlowHeatmap } from '../components/profile/GlowHeatmap';
import type { Profile, DailyLog } from '../lib/supabase';

// --- MOCK DATA FOR UI DEVELOPMENT ---
const MOCK_PROFILE: Profile = {
    id: '1',
    username: 'CodeGirl_99',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoey',
    bio: 'Frontend dev in the making! 💅 building things.',
    total_glow_points: 420,
    github_url: 'https://github.com',
    linkedin_url: 'https://linkedin.com'
};

const MOCK_LOGS: DailyLog[] = [
    { id: '1', user_id: '1', date: '2025-01-10', glow_points: 5, mood: 'tired', learning_log: 'Too tired, just did 1 leetcode.' },
    { id: '2', user_id: '1', date: '2025-01-12', glow_points: 40, mood: 'excited', learning_log: 'Crushed the React docs today!', code_snippet: 'useEffect(() => {\n  console.log("I am glowing!");\n}, []);' },
    { id: '3', user_id: '1', date: '2025-10-24', glow_points: 15, mood: 'focused' }, // Future date for testing
    // Generate some random history
    ...Array.from({ length: 20 }).map((_, i) => ({
        id: `gen-${i}`,
        user_id: '1',
        date: new Date(new Date().setDate(new Date().getDate() - i * 3)).toISOString(),
        glow_points: Math.floor(Math.random() * 50),
        mood: ['happy', 'stressed', 'focused'][Math.floor(Math.random() * 3)]
    }) as DailyLog)
];

export const Profile: React.FC = () => {
    const [profile, setProfile] = useState<Profile>(MOCK_PROFILE);

    const handleUpdateBio = (newBio: string) => {
        setProfile(prev => ({ ...prev, bio: newBio }));
        // TODO: Sync with Supabase
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Identity Section */}
            <ProfileHeader profile={profile} onUpdateBio={handleUpdateBio} />

            {/* Progress Section */}
            <ProgressSection
                glowPoints={profile.total_glow_points}
                monthlyTarget={600}
                streakDays={12}
            />

            {/* Heatmap Section */}
            <div className="glass-card p-4">
                <GlowHeatmap logs={MOCK_LOGS} />
            </div>
        </div>
    );
};
