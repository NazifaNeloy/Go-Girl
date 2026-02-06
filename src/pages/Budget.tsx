import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Utensils,
    Home,
    FileText,
    Sparkles,
    GraduationCap,
    History,
    ArrowUpRight,
    ArrowDownLeft,
    Wallet,
    TrendingUp,
    Search,
    Bell,
    Check,
    Briefcase,
    Heart
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';

interface Transaction {
    id: string;
    item_name: string;
    amount: number;
    category: string;
    type: 'credit' | 'debit';
    created_at: string;
}

const DEBIT_CATEGORIES = {
    'Food': { color: '#4ADE80', icon: Utensils, gradient: 'from-green-500/20' },
    'Accommodation': { color: '#60A5FA', icon: Home, gradient: 'from-blue-500/20' },
    'Bills': { color: '#F472B6', icon: FileText, gradient: 'from-pink-500/20' },
    'Self-Care': { color: '#FBBF24', icon: Sparkles, gradient: 'from-yellow-500/20' },
    'Learning': { color: '#A78BFA', icon: GraduationCap, gradient: 'from-purple-500/20' },
};

const CREDIT_CATEGORIES = {
    'Work': { color: '#4ADE80', icon: Briefcase, gradient: 'from-green-500/20' },
    'Tuition': { color: '#60A5FA', icon: GraduationCap, gradient: 'from-blue-500/20' },
    'Gifts': { color: '#F472B6', icon: Heart, gradient: 'from-pink-500/20' },
    'Others': { color: '#94A3B8', icon: Wallet, gradient: 'from-slate-500/20' },
};

const ALL_CATEGORIES = { ...DEBIT_CATEGORIES, ...CREDIT_CATEGORIES };

export const Budget: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [itemName, setItemName] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'credit' | 'debit'>('debit');
    const [category, setCategory] = useState<string>('Food');

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTransactions(data || []);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            // Fallback mock data
            setTransactions([
                { id: '1', item_name: 'Monthly Salary', amount: 5000, category: 'Work', type: 'credit', created_at: new Date().toISOString() },
                { id: '2', item_name: 'Supermarket', amount: 120, category: 'Food', type: 'debit', created_at: new Date().toISOString() },
                { id: '3', item_name: 'Rent', amount: 800, category: 'Accommodation', type: 'debit', created_at: new Date().toISOString() },
                { id: '4', item_name: 'Freelance Work', amount: 1500, category: 'Work', type: 'credit', created_at: new Date().toISOString() },
                { id: '5', item_name: 'Tuition Income', amount: 200, category: 'Tuition', type: 'credit', created_at: new Date().toISOString() },
                { id: '6', item_name: 'Mom gave', amount: 50, category: 'Gifts', type: 'credit', created_at: new Date().toISOString() },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTransaction = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!itemName || !amount) return;

        setIsSubmitting(true);
        const newTransaction = {
            item_name: itemName,
            amount: parseFloat(amount),
            category,
            type,
            created_at: new Date().toISOString(),
        };

        try {
            const { error } = await supabase
                .from('transactions')
                .insert([newTransaction]);

            if (error) throw error;

            setItemName('');
            setAmount('');
            fetchTransactions();
        } catch (error) {
            console.error('Error adding transaction:', error);
            setTransactions([{ id: Math.random().toString(), ...newTransaction }, ...transactions]);
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalDebit = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);
    const totalCredit = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);

    const categoryDebitTotals = Object.keys(DEBIT_CATEGORIES).reduce((acc, cat) => {
        acc[cat] = transactions
            .filter(t => t.category === cat && t.type === 'debit')
            .reduce((sum, t) => sum + t.amount, 0);
        return acc;
    }, {} as Record<string, number>);

    const activeCategories = type === 'debit' ? DEBIT_CATEGORIES : CREDIT_CATEGORIES;

    // Switch default category when type changes
    useEffect(() => {
        setCategory(type === 'debit' ? 'Food' : 'Work');
    }, [type]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#121212] text-white pb-32">
            <div className="max-w-6xl mx-auto px-6 space-y-10">

                {/* Header */}
                <div className="pt-10 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Monthly Budget</p>
                        <h1 className="text-3xl font-black italic tracking-tighter uppercase mt-1">Financial State</h1>
                    </div>
                    <div className="flex gap-3">
                        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                            <Search size={20} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                            <Bell size={20} />
                        </button>
                    </div>
                </div>

                {/* Main Stats Card */}
                <section className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#FF71CD] to-[#9D50BB] rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative glass-dark rounded-[2.5rem] p-10 border border-white/10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#4ADE80]">Total Income</p>
                                    <h2 className="text-4xl font-black italic tracking-tighter">${totalCredit.toLocaleString()}</h2>
                                    <div className="flex items-center gap-1 text-[10px] text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded-full w-fit uppercase">
                                        <TrendingUp size={12} />
                                        <span>Income</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF71CD]">Total Spending</p>
                                    <h2 className="text-4xl font-black italic tracking-tighter">${totalDebit.toLocaleString()}</h2>
                                    <div className="flex items-center gap-1 text-[10px] text-pink-400 font-bold bg-pink-400/10 px-2 py-0.5 rounded-full w-fit uppercase">
                                        <ArrowUpRight size={12} />
                                        <span>Expenses</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-end space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Spending Breakdown (Debit)</p>
                                        <p className="text-xs font-mono text-white/40">CALC: {totalDebit > 0 ? 'ACTIVE' : 'IDLE'}</p>
                                    </div>
                                    <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden flex border border-white/10 p-1">
                                        {Object.entries(DEBIT_CATEGORIES).map(([cat, config]) => {
                                            const amount = categoryDebitTotals[cat];
                                            const percentage = totalDebit > 0 ? (amount / totalDebit) * 100 : 0;
                                            if (percentage === 0) return null;
                                            return (
                                                <motion.div
                                                    key={cat}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 1, ease: 'easeOut' }}
                                                    style={{ backgroundColor: config.color }}
                                                    className="h-full first:rounded-l-full last:rounded-r-full shadow-[0_0_15px_rgba(255,255,255,0.1)] relative group"
                                                >
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                        {cat}: {percentage.toFixed(0)}%
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {Object.entries(DEBIT_CATEGORIES).map(([cat, config]) => (
                                        <div key={cat} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{cat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Log Transaction Form */}
                    <section className="lg:col-span-1 glass-dark rounded-[2.5rem] p-8 border border-white/10 space-y-8">
                        <h3 className="text-xl font-black italic tracking-tighter uppercase">Log Transaction</h3>

                        <form onSubmit={handleAddTransaction} className="space-y-6">
                            {/* Type Toggle */}
                            <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
                                <button
                                    type="button"
                                    onClick={() => setType('debit')}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                        type === 'debit' ? "bg-white/10 text-white border border-white/10" : "text-gray-500"
                                    )}
                                >
                                    Debit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setType('credit')}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                        type === 'credit' ? "bg-white/10 text-white border border-white/10" : "text-gray-500"
                                    )}
                                >
                                    Credit
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">Item Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Salary, Rent, Netflix"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#FF71CD] transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">Amount ($)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#FF71CD] transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">Category</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {Object.keys(activeCategories).map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setCategory(cat)}
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-2xl border transition-all text-sm",
                                                category === cat
                                                    ? "bg-[#FF71CD]/10 border-[#FF71CD] text-white"
                                                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                {React.createElement((activeCategories as any)[cat].icon, { size: 18 })}
                                                <span className="font-bold">{cat}</span>
                                            </div>
                                            {category === cat && <Check size={14} className="text-[#FF71CD]" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !itemName || !amount}
                                className="w-full py-4 bg-gradient-to-r from-[#FF71CD] to-[#9D50BB] text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? 'Syncing...' : 'Log Transaction'}
                            </button>
                        </form>
                    </section>

                    {/* Recent Transactions List */}
                    <section className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black italic tracking-tighter uppercase flex items-center gap-3">
                                <History size={24} className="text-[#FF71CD]" />
                                Recent History
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {isLoading ? (
                                <div className="p-10 text-center text-gray-500 animate-pulse uppercase tracking-[0.2em] font-black">Syncing Node...</div>
                            ) : transactions.length === 0 ? (
                                <div className="p-10 text-center text-gray-400 border border-white/5 border-dashed rounded-[2rem]">Empty block. Start logging.</div>
                            ) : (
                                transactions.map((t, i) => {
                                    const categoryConfig = (ALL_CATEGORIES as any)[t.category] || { icon: Wallet, color: '#fff', gradient: 'bg-white/5' };
                                    const CategoryIcon = categoryConfig.icon;
                                    const isCredit = t.type === 'credit';
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={t.id}
                                            className="group glass-dark p-5 rounded-[2rem] border border-white/10 flex items-center justify-between hover:border-white/20 transition-all"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={cn(
                                                    "w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-105 transition-transform",
                                                    isCredit ? "bg-green-500/10" : "bg-red-500/10"
                                                )}>
                                                    <CategoryIcon size={24} className={isCredit ? "text-green-400" : "text-red-400"} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-base text-white">{t.item_name}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md bg-white/5 text-gray-400">
                                                            {t.category}
                                                        </span>
                                                        <span className="text-[10px] text-gray-500">
                                                            {new Date(t.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={cn(
                                                    "text-xl font-black italic tracking-tighter",
                                                    isCredit ? "text-green-400" : "text-white"
                                                )}>
                                                    {isCredit ? '+' : '-'}${t.amount.toLocaleString()}
                                                </div>
                                                <div className={cn(
                                                    "flex items-center justify-end gap-1 text-[9px] uppercase font-black tracking-widest",
                                                    isCredit ? "text-green-400" : "text-red-500"
                                                )}>
                                                    {isCredit ? <ArrowDownLeft size={10} /> : <ArrowUpRight size={10} />}
                                                    {isCredit ? 'Credit' : 'Debit'}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
