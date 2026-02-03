import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Edit3, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Profile } from '../../lib/supabase';

interface ProfileHeaderProps {
    profile: Profile;
    onUpdateBio: (newBio: string) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onUpdateBio }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState(profile.bio || '');

    const handleSave = () => {
        onUpdateBio(bio);
        setIsEditing(false);
    };

    return (
        <div className="glass-card p-6 flex flex-col items-center text-center space-y-4 relative">
            <div className="relative">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-pink-400 to-purple-500">
                    <img
                        src={profile.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                        alt="Profile Avatar"
                        className="w-full h-full rounded-full bg-white object-cover border-4 border-white"
                    />
                </div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bottom-1 right-1 bg-green-400 w-5 h-5 rounded-full border-2 border-white"
                />
            </div>

            <div>
                <h2 className="text-2xl font-bold text-text-primary">{profile.username}</h2>
                <p className="text-sm text-text-secondary">San Francisco, CA 📍</p>
            </div>

            <div className="relative w-full max-w-xs">
                {isEditing ? (
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full bg-white/50 border border-pink-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                            autoFocus
                        />
                        <button onClick={handleSave} className="p-1.5 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200">
                            <Check size={14} />
                        </button>
                    </div>
                ) : (
                    <p className="text-sm text-text-secondary italic min-h-[1.5rem]" onClick={() => setIsEditing(true)}>
                        "{bio || "Ready to grow! 🌱"}"
                        <button className="ml-2 inline-block text-pink-300 hover:text-pink-500">
                            <Edit3 size={12} />
                        </button>
                    </p>
                )}
            </div>

            <div className="flex space-x-4 pt-2">
                {profile.github_url && (
                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-purple-600 transition-colors">
                        <Github size={20} />
                    </a>
                )}
                {profile.linkedin_url && (
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-blue-600 transition-colors">
                        <Linkedin size={20} />
                    </a>
                )}
            </div>
        </div>
    );
};
