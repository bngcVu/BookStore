"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Zap } from "lucide-react";
import { FlashSaleItem } from "@/types";

interface FlashSaleProps {
    items: FlashSaleItem[];
}

export function FlashSale({ items }: FlashSaleProps) {
    // Countdown Timer Logic
    const [timeLeft, setTimeLeft] = useState({ hours: 3, mins: 12, secs: 45 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
                if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const getBgColor = (id: number) => {
        const colors = ["bg-[#F3E6D5]", "bg-[#D6E6DA]", "bg-[#D1E8E2]", "bg-[#FADadd]"];
        return colors[id % colors.length];
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 bg-red-100 rounded-full text-red-500 animate-pulse">
                            <Zap className="w-6 h-6 fill-red-500" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Flash Sale</h2>
                    </div>
                    <p className="text-slate-500 font-medium">Nhanh tay! Ưu đãi sắp kết thúc.</p>
                </div>

                {/* Countdown */}
                <div className="flex items-center gap-3">
                    <TimeBox value={timeLeft.hours} label="GIỜ" />
                    <span className="text-2xl font-black text-slate-300">:</span>
                    <TimeBox value={timeLeft.mins} label="PHÚT" />
                    <span className="text-2xl font-black text-slate-300">:</span>
                    <TimeBox value={timeLeft.secs} label="GIÂY" bg="bg-orange-500" />
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="group relative">
                        {/* Card Background */}
                        <div className={`aspect-[3/4] rounded-2xl ${getBgColor(item.id)} relative p-6 pt-12 flex flex-col items-center shadow-sm transition-transform hover:-translate-y-1`}>
                            {/* Discount Badge */}
                            <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md">
                                -{item.discount_percent || Math.round((1 - item.sale_price / item.original_price) * 100)}%
                            </span>

                            {/* Book Cover (Floating) */}
                            <div className="w-32 shadow-xl shadow-slate-900/10 rounded-lg overflow-hidden mb-6 transform group-hover:scale-105 transition-transform duration-500">
                                <img src={item.book.image_url} alt={item.book.title} className="w-full h-auto object-cover aspect-[2/3]" />
                            </div>

                            {/* Info */}
                            <div className="text-center w-full mt-auto">
                                <h3 className="font-bold text-slate-900 line-clamp-1 text-sm mb-1">{item.book.title}</h3>
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <span className="text-orange-600 font-black text-lg">${item.sale_price}</span>
                                    <span className="text-slate-400 text-sm line-through">${item.original_price}</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-white/50 h-1.5 rounded-full overflow-hidden mb-1">
                                    <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(item.sold_count / (item.sold_count + 10)) * 100}%` }}></div>
                                </div>
                                <p className="text-[10px] text-slate-500 font-medium text-left">
                                    {item.sold_count > 40 ? "Sắp hết!" : `Đã bán ${item.sold_count}`}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TimeBox({ value, label, bg = "bg-slate-900" }: { value: number, label: string, bg?: string }) {
    return (
        <div className={`flex flex-col items-center justify-center w-14 h-14 ${bg} rounded-xl text-white shadow-lg`}>
            <span className="text-xl font-black leading-none">{value.toString().padStart(2, '0')}</span>
            <span className="text-[9px] font-bold opacity-60 mt-0.5">{label}</span>
        </div>
    );
}
