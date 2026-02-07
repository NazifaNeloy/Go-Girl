import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

interface TaskCreatorProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (task: any) => void;
}

export const TaskCreator: React.FC<TaskCreatorProps> = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startTime, setStartTime] = useState('10:00');
    const [endTime, setEndTime] = useState('11:00');
    const [category, setCategory] = useState('Study');
    const [isReminderOn, setIsReminderOn] = useState(false);
    const [subTaskInput, setSubTaskInput] = useState('');
    const [subTasks, setSubTasks] = useState<string[]>([]);

    const daysInMonth = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth)),
        end: endOfWeek(endOfMonth(currentMonth)),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            date: format(selectedDate, 'yyyy-MM-dd'),
            start_time: startTime,
            end_time: endTime,
            category,
            is_reminder_on: isReminderOn,
            is_completed: false,
            sub_tasks: subTasks,
        });
        // Reset form
        setTitle('');
        setSubTasks([]);
        setIsReminderOn(false);
    };

    const addSubTask = () => {
        if (subTaskInput.trim()) {
            setSubTasks([...subTasks, subTaskInput.trim()]);
            setSubTaskInput('');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-white/10 rounded-t-[50px] z-[70] shadow-2xl max-h-[95vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="p-8 flex items-center justify-between text-white border-b border-white/5">
                            <button onClick={onClose} className="flex items-center space-x-2 text-sm font-bold opacity-80 hover:text-pink-500 transition-colors">
                                <X size={18} />
                                <span>Cancel</span>
                            </button>
                            <h2 className="text-xl font-black italic uppercase tracking-tighter">New Task</h2>
                            <div className="w-10" /> {/* Spacer */}
                        </div>

                        {/* Form Content */}
                        <div className="p-8 space-y-8 min-h-[500px] bg-zinc-950/50">
                            <form onSubmit={handleSubmit} className="space-y-8 pb-10">

                                {/* Date Selection (Grid Calendar) */}
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-pink-500 uppercase tracking-widest pl-2">Selection Date</label>
                                    <div className="bg-zinc-900 border border-white/10 rounded-[30px] p-6 shadow-xl">
                                        <div className="flex justify-between items-center mb-4 text-white">
                                            <h3 className="font-bold">{format(currentMonth, 'MMMM yyyy')}</h3>
                                            <div className="flex space-x-2">
                                                <button type="button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover:text-pink-500"><ChevronLeft size={20} /></button>
                                                <button type="button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover:text-pink-500"><ChevronRight size={20} /></button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-7 gap-2">
                                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                                <div key={day} className="text-center text-[10px] font-black text-gray-500 uppercase">{day}</div>
                                            ))}
                                            {daysInMonth.map((day, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => setSelectedDate(day)}
                                                    className={cn(
                                                        "h-10 w-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all",
                                                        !isSameMonth(day, currentMonth) && "text-gray-700",
                                                        isSameDay(day, selectedDate) ? "bg-pink-500 text-white shadow-[0_0_15px_rgba(255,113,205,0.4)] scale-110" : "text-gray-300 hover:bg-white/5",
                                                        isSameDay(day, new Date()) && !isSameDay(day, selectedDate) && "border border-pink-500/30"
                                                    )}
                                                >
                                                    {format(day, 'd')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Time Selection */}
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-pink-500 uppercase tracking-widest pl-2">Time Slot</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-zinc-900 border border-white/10 rounded-[24px] p-4 flex items-center justify-between shadow-xl">
                                            <span className="text-xs font-bold text-gray-500 uppercase">Start</span>
                                            <input
                                                type="time"
                                                value={startTime}
                                                onChange={(e) => setStartTime(e.target.value)}
                                                className="bg-transparent outline-none font-black text-white"
                                            />
                                        </div>
                                        <div className="bg-zinc-900 border border-white/10 rounded-[24px] p-4 flex items-center justify-between shadow-xl">
                                            <span className="text-xs font-bold text-gray-500 uppercase">End</span>
                                            <input
                                                type="time"
                                                value={endTime}
                                                onChange={(e) => setEndTime(e.target.value)}
                                                className="bg-transparent outline-none font-black text-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Title Selection */}
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-pink-500 uppercase tracking-widest pl-2">Goal Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="What are we achieving today?"
                                        className="w-full bg-zinc-900 border border-white/10 rounded-[24px] px-6 py-5 outline-none text-white font-black shadow-xl transition-all text-lg placeholder:text-zinc-700 focus:border-pink-500/50"
                                        required
                                    />
                                </div>

                                {/* Category Selection */}
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-pink-500 uppercase tracking-widest pl-2">Category</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Study', 'Meeting', 'Travelling', 'Work', 'Health'].map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setCategory(cat)}
                                                className={cn(
                                                    "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                                                    category === cat
                                                        ? "bg-pink-500 text-white shadow-[0_0_15px_rgba(255,113,205,0.4)]"
                                                        : "bg-zinc-900 text-gray-400 border border-white/10 hover:border-pink-500/30 shadow-sm"
                                                )}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sub-tasks Section */}
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-pink-500 uppercase tracking-widest pl-2">Milestones</label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={subTaskInput}
                                            onChange={(e) => setSubTaskInput(e.target.value)}
                                            placeholder="Split into steps..."
                                            className="flex-1 bg-zinc-900 border border-white/10 rounded-[20px] px-5 py-3 outline-none text-white font-bold shadow-xl transition-all text-sm mb-4"
                                        />
                                        <button
                                            type="button"
                                            onClick={addSubTask}
                                            className="bg-black border border-pink-500 text-pink-500 p-3 rounded-[20px] shadow-lg mb-4"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                    {subTasks.length > 0 && (
                                        <div className="bg-white/5 rounded-[30px] p-4 flex flex-wrap gap-2">
                                            {subTasks.map((st, i) => (
                                                <div key={i} className="bg-zinc-800 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-white flex items-center space-x-2 shadow-sm">
                                                    <span>{st}</span>
                                                    <button type="button" onClick={() => setSubTasks(subTasks.filter((_, idx) => idx !== i))} className="hover:text-pink-500 transition-colors"><X size={12} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Privacy/Alarm Toggle */}
                                <div className="flex items-center justify-between p-6 bg-zinc-900 border border-white/10 rounded-[30px] shadow-xl">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                                            <Bell size={20} className="text-pink-500" strokeWidth={2} />
                                        </div>
                                        <h4 className="font-bold text-white">Reminder Alarm</h4>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsReminderOn(!isReminderOn)}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-colors relative flex items-center px-1",
                                            isReminderOn ? "bg-pink-500" : "bg-zinc-700"
                                        )}
                                    >
                                        <motion.div
                                            animate={{ x: isReminderOn ? 24 : 0 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                            className="w-4 h-4 bg-white rounded-full shadow-sm"
                                        />
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-pink-500 text-white rounded-[30px] py-5 font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-98 transition-all shadow-[0_0_20px_rgba(255,113,205,0.4)] mt-4"
                                >
                                    <span>Plan Task</span>
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
