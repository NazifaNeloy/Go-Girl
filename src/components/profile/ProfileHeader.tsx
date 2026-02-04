import React, { useState } from 'react';
import { Github, Linkedin, Edit3, Check, MapPin } from 'lucide-react';
import type { UserProfile } from '../../lib/supabase';

interface ProfileHeaderProps {
    profile: UserProfile;
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
        <header className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600 opacity-60" />

            {/* Avatar Section */}
            <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-md opacity-50 animate-[pulse_3s_infinite] group-hover:opacity-80 transition-opacity"></div>
                <img
                    src={profile.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                    alt="Avatar"
                    className="relative w-32 h-32 rounded-full border-4 border-black object-cover z-10 bg-black"
                />
                <div className="absolute bottom-1 right-1 z-20 bg-black rounded-full p-1 border border-white/20">
                    <span className="block w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-black"></span>
                </div>
            </div>

            {/* Info Section */}
            <div className="text-center md:text-left flex-1 space-y-3">
                <div className="flex flex-col md:flex-row items-center gap-3">
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
                        {profile.username}
                    </h1>
                    <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
                        {profile.title || 'Shadow Monarch'}
                    </span>
                </div>

                <div className="relative max-w-xl mx-auto md:mx-0">
                    {isEditing ? (
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full bg-white/10 border border-pink-500/30 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                autoFocus
                            />
                            <button onClick={handleSave} className="p-1.5 bg-pink-500/20 rounded-full text-pink-400 hover:bg-pink-500/40 transition-colors">
                                <Check size={16} />
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm leading-relaxed cursor-pointer hover:text-gray-200 transition-colors" onClick={() => setIsEditing(true)}>
                            {profile.bio || "Arise and code."}
                            <Edit3 size={12} className="inline ml-2 text-pink-500/50" />
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-gray-500 mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5 hover:text-purple-400 transition-colors cursor-default">
                        <MapPin size={14} className="text-purple-500" />
                        <span>{profile.location || 'Seoul, Dungeon Gate 1'}</span>
                    </div>

                    <div className="flex gap-4">
                        {profile.github_url && (
                            <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                <Github size={18} />
                            </a>
                        )}
                        {profile.linkedin_url && (
                            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                <Linkedin size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Top Right Edit Shortcut */}
            {!isEditing && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full text-gray-500 hover:text-white transition-colors border border-white/5"
                >
                    <Edit3 size={18} />
                </button>
            )}
        </header>
    );
};
