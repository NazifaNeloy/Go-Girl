import React, { useMemo, useState } from 'react';
import { eachDayOfInterval, startOfYear, endOfYear, format, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';
import { type DailyLog } from '../../lib/supabaseClient';
import { GlowSquareModal } from './GlowSquareModal';

interface GlowHeatmapProps {
    logs: DailyLog[];
}

export const GlowHeatmap: React.FC<GlowHeatmapProps> = ({ logs }) => {
    const [selectedDay, setSelectedDay] = useState<{ date: Date; log?: DailyLog } | null>(null);

    const days = useMemo(() => {
        const today = new Date();
        return eachDayOfInterval({
            start: startOfYear(today),
            end: endOfYear(today),
        });
    }, []);

    const getIntensityClass = (points: number) => {
        if (points === 0) return "bg-white/5 border-transparent";
        if (points <= 10) return "bg-pink-900/30 border-pink-900/50";
        if (points <= 30) return "bg-pink-600/60 border-pink-500/50";
        return "bg-pink-500 border-pink-400 shadow-[0_0_12px_#ec4899]";
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-pink-500" />
                    <h3 className="text-white font-black text-xl tracking-tight uppercase italic">Activity Log</h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest font-bold">
                    <span>Low</span>
                    <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-sm bg-white/5"></div>
                        <div className="w-2.5 h-2.5 rounded-sm bg-pink-900/30"></div>
                        <div className="w-2.5 h-2.5 rounded-sm bg-pink-600/60"></div>
                        <div className="w-2.5 h-2.5 rounded-sm bg-pink-500 shadow-[0_0_5px_#ec4899]"></div>
                    </div>
                    <span>High</span>
                </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar pb-4 -mx-2 px-2">
                <div className="grid grid-rows-7 grid-flow-col gap-1.5 w-max">
                    {days.map((day) => {
                        const log = logs.find(l => isSameDay(new Date(l.date), day));
                        const points = log?.glow_points || 0;

                        return (
                            <motion.div
                                key={day.toISOString()}
                                whileHover={{ scale: 1.3, zIndex: 10 }}
                                onClick={() => setSelectedDay({ date: day, log })}
                                className={cn(
                                    "w-3.5 h-3.5 md:w-4 md:h-4 rounded-[3px] border transition-all duration-300 cursor-pointer",
                                    getIntensityClass(points)
                                )}
                                title={`${format(day, 'MMM do')}: ${points} pts`}
                            />
                        );
                    })}
                </div>
            </div>

            <GlowSquareModal
                isOpen={!!selectedDay}
                onClose={() => setSelectedDay(null)}
                dayData={selectedDay}
            />
        </div>
    );
};
