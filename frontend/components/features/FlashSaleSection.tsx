"use client";

import { useEffect, useState } from "react";
import { FlashSaleItem } from "@/types";
import { ProductCard } from "./ProductCard";
import { Zap, Timer, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FlashSaleSectionProps {
    items: FlashSaleItem[];
}

export function FlashSaleSection({ items }: FlashSaleSectionProps) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const end = new Date(items[0]?.end_time || "").getTime();
            const distance = end - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [items]);

    if (!items || items.length === 0) return null;

    return (
        <section className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-slate-50 relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cta/5 rounded-full blur-3xl group-hover:bg-cta/10 transition-colors duration-700"></div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-cta rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cta/20 animate-pulse">
                            <Zap className="w-6 h-6 fill-current" />
                        </div>
                        <h2 className="text-3xl font-heading font-black text-slate-900 tracking-tighter uppercase italic">
                            Flash <span className="text-cta">Sale</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 font-medium pl-1">Săn deal chớp nhoáng, số lượng có hạn!</p>
                </div>

                <div className="flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-[28px] shadow-xl">
                    <div className="flex items-center gap-2 text-primary-light">
                        <Timer className="w-5 h-5" />
                        <span className="text-xs font-black uppercase tracking-widest opacity-70">Kết thúc sau:</span>
                    </div>
                    <div className="flex items-center gap-3 font-heading font-black text-2xl tracking-tight">
                        <div className="flex flex-col items-center">
                            <span className="w-10 text-center">{timeLeft.hours.toString().padStart(2, '0')}</span>
                        </div>
                        <span className="text-primary opacity-50">:</span>
                        <div className="flex flex-col items-center">
                            <span className="w-10 text-center">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                        </div>
                        <span className="text-primary opacity-50">:</span>
                        <div className="flex flex-col items-center text-cta">
                            <span className="w-10 text-center">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {items.slice(0, 6).map((item) => (
                    <div key={item.item_id} className="space-y-3">
                        <ProductCard
                            book={{ ...item.book!, is_flash_sale: true, min_price: item.sale_price, base_price: item.original_price }}
                        />
                        {/* Sold Progress Bar */}
                        <div className="space-y-1.5 px-1">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
                                <span className="text-slate-400">Đã bán {item.sold_count}</span>
                                <span className="text-cta">{Math.round((item.sold_count / item.quantity_limit) * 100)}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                                <div
                                    className="h-full bg-cta rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,59,48,0.3)]"
                                    style={{ width: `${(item.sold_count / item.quantity_limit) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <Link href="/flash-sale" className="group flex items-center gap-3 bg-white border-2 border-slate-100 hover:border-cta hover:text-cta px-10 py-4 rounded-2xl transition-all duration-300 font-black text-sm uppercase tracking-widest shadow-sm hover:shadow-xl hover:shadow-cta/10">
                    Xem tất cả deal
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
