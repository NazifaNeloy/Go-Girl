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
                        className="fixed bottom-0 left-0 right-0 bg-[#B47B84] rounded-t-[50px] z-[70] shadow-2xl max-h-[95vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="p-8 flex items-center justify-between text-white">
                            <button onClick={onClose} className="flex items-center space-x-2 text-sm font-bold opacity-80">
                                <X size={18} />
                                <span>Back</span>
                            </button>
                            <h2 className="text-xl font-black">Create New Task</h2>
                            <div className="w-10" /> {/* Spacer */}
                        </div>

                        {/* Form Content */}
                        <div className="bg-[#F7E7E5] rounded-t-[50px] p-8 space-y-8 min-h-[500px]">
                            <form onSubmit={handleSubmit} className="space-y-8 pb-10">

                                {/* Date Selection (Grid Calendar) */}
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-[#B47B84] uppercase tracking-widest pl-2">Date</label>
                                    <div className="bg-white rounded-[30px] p-6 shadow-sm">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-bold text-[#2D1B2E]">{format(currentMonth, 'MMMM yyyy')}</h3>
                                            <div className="flex space-x-2">
                                                <button type="button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1"><ChevronLeft size={20} /></button>
                                                <button type="button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1"><ChevronRight size={20} /></button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-7 gap-2">
                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                                <div key={day} className="text-center text-[10px] font-black text-gray-400 uppercase">{day}</div>
                                            ))}
                                            {daysInMonth.map((day, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => setSelectedDate(day)}
                                                    className={cn(
                                                        "h-10 w-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all",
                                                        !isSameMonth(day, currentMonth) && "text-gray-300",
                                                        isSameDay(day, selectedDate) ? "bg-[#B47B84] text-white shadow-md scale-110" : "text-[#2D1B2E] hover:bg-pink-50",
                                                        isSameDay(day, new Date()) && !isSameDay(day, selectedDate) && "border border-[#B47B84]/30"
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
                                    <label className="text-xs font-black text-[#B47B84] uppercase tracking-widest pl-2">Time</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white rounded-[24px] p-4 flex items-center justify-between border-2 border-transparent focus-within:border-[#B47B84]/20 shadow-sm">
                                            <span className="text-xs font-bold text-gray-400 uppercase">Start</span>
                                            <input
                                                type="time"
                                                value={startTime}
                                                onChange={(e) => setStartTime(e.target.value)}
                                                className="bg-transparent outline-none font-black text-[#B47B84]"
                                            />
                                        </div>
                                        <div className="bg-white rounded-[24px] p-4 flex items-center justify-between border-2 border-transparent focus-within:border-[#B47B84]/20 shadow-sm">
                                            <span className="text-xs font-bold text-gray-400 uppercase">End</span>
                                            <input
                                                type="time"
                                                value={endTime}
                                                onChange={(e) => setEndTime(e.target.value)}
                                                className="bg-transparent outline-none font-black text-[#B47B84]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Title Selection */}
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-[#B47B84] uppercase tracking-widest pl-2">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Write the Title"
                                        className="w-full bg-white border-2 border-transparent focus:border-[#B47B84]/20 rounded-[24px] px-6 py-5 outline-none text-[#2D1B2E] font-black shadow-sm transition-all text-lg placeholder:text-gray-300"
                                        required
                                    />
                                </div>

                                {/* Category Selection */}
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-[#B47B84] uppercase tracking-widest pl-2">Category</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Study', 'Meeting', 'Travelling', 'Work', 'Health'].map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setCategory(cat)}
                                                className={cn(
                                                    "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                                                    category === cat
                                                        ? "bg-[#B47B84] text-white shadow-md scale-105"
                                                        : "bg-white text-[#B47B84] hover:bg-[#B47B84]/10 shadow-sm"
                                                )}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sub-tasks Section */}
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-[#B47B84] uppercase tracking-widest pl-2">Sub-tasks</label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={subTaskInput}
                                            onChange={(e) => setSubTaskInput(e.target.value)}
                                            placeholder="Add a step..."
                                            className="flex-1 bg-white border-2 border-transparent focus:border-[#B47B84]/20 rounded-[20px] px-5 py-3 outline-none text-[#2D1B2E] font-bold shadow-sm transition-all text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={addSubTask}
                                            className="bg-[#B47B84] text-white p-3 rounded-[20px] shadow-md"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                    {subTasks.length > 0 && (
                                        <div className="bg-white/50 rounded-[30px] p-4 flex flex-wrap gap-2">
                                            {subTasks.map((st, i) => (
                                                <div key={i} className="bg-white px-4 py-1.5 rounded-full text-xs font-bold text-[#B47B84] flex items-center space-x-2 shadow-sm">
                                                    <span>{st}</span>
                                                    <button onClick={() => setSubTasks(subTasks.filter((_, idx) => idx !== i))}><X size={12} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Alarm Toggle */}
                                <div className="flex items-center justify-between p-6 bg-white rounded-[30px] shadow-sm">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-[#B47B84]/10 flex items-center justify-center">
                                            <Bell size={20} className="text-[#B47B84]" strokeWidth={2} />
                                        </div>
                                        <h4 className="font-bold text-[#2D1B2E]">Alarm</h4>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsReminderOn(!isReminderOn)}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-colors relative flex items-center px-1",
                                            isReminderOn ? "bg-[#B47B84]" : "bg-gray-200"
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
                                    className="w-full bg-[#B47B84] text-white rounded-[30px] py-5 font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-98 transition-all shadow-xl mt-4"
                                >
                                    <span>Save</span>
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
