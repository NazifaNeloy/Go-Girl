import React, { useMemo, useState } from 'react';
import { eachDayOfInterval, startOfYear, endOfYear, format, isSameDay } from 'date-fns';
import { cn } from '../../lib/utils';
import type { DailyLog } from '../../lib/supabase';
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
        if (points === 0) return "bg-gray-100 border-transparent"; // Emotional design: Soft grey, no red
        if (points <= 10) return "bg-pink-200 border-pink-300";
        if (points <= 30) return "bg-pink-400 border-pink-500 shadow-[0_0_5px_rgba(244,114,182,0.4)]";
        return "bg-purple-600 border-purple-700 shadow-[0_0_8px_rgba(147,51,234,0.6)]";
    };

    return (
        <>
            <div className="space-y-2">
                <h3 className="font-semibold text-lg text-text-primary pl-1">Yearly Glow ✨</h3>

                {/* Scrollable Container */}
                <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                    <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
                        {days.map((day) => {
                            const log = logs.find(l => isSameDay(new Date(l.date), day));
                            const points = log?.glow_points || 0;

                            return (
                                <div
                                    key={day.toISOString()}
                                    onClick={() => setSelectedDay({ date: day, log })}
                                    className={cn(
                                        "w-3 h-3 rounded-sm border transition-all hover:scale-125 cursor-pointer",
                                        getIntensityClass(points)
                                    )}
                                    title={`${format(day, 'MMM do')}: ${points} pts`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center text-xs text-text-secondary space-x-2 pl-1">
                    <span>Less</span>
                    <div className="w-3 h-3 bg-gray-100 rounded-sm" />
                    <div className="w-3 h-3 bg-pink-200 rounded-sm" />
                    <div className="w-3 h-3 bg-pink-400 rounded-sm" />
                    <div className="w-3 h-3 bg-purple-600 rounded-sm" />
                    <span>More</span>
                </div>
            </div>

            <GlowSquareModal
                isOpen={!!selectedDay}
                onClose={() => setSelectedDay(null)}
                dayData={selectedDay}
            />
        </>
    );
};
