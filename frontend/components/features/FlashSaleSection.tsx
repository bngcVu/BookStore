import { useRef, useState, useEffect } from "react";
import { Zap, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { FlashSaleItem } from "@/types";
import Link from "next/link";

interface FlashSaleSectionProps {
    items: FlashSaleItem[];
}

export function FlashSaleSection({ items }: FlashSaleSectionProps) {
    const [timeLeft, setTimeLeft] = useState({ hours: "05", minutes: "42", seconds: "10" });
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeft(scrollLeft > 10);
        setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [items]);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const scrollAmount = scrollRef.current.clientWidth * 0.8;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            // Simulate countdown for demo
            setTimeLeft((prev: { hours: string; minutes: string; seconds: string }) => {
                let s = parseInt(prev.seconds) - 1;
                let m = parseInt(prev.minutes);
                let h = parseInt(prev.hours);

                if (s < 0) { s = 59; m -= 1; }
                if (m < 0) { m = 59; h -= 1; }
                if (h < 0) { h = 0; m = 0; s = 0; }

                return {
                    hours: h.toString().padStart(2, '0'),
                    minutes: m.toString().padStart(2, '0'),
                    seconds: s.toString().padStart(2, '0')
                };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white rounded-[32px] border border-cta/10 overflow-hidden shadow-xl shadow-cta/5 px-6 py-8 md:px-10 md:py-8 group/flash">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2.5 bg-cta text-white px-4 py-2 rounded-xl shadow-lg shadow-cta/20">
                        <Zap className="w-5 h-5 fill-current animate-pulse" />
                        <span className="font-heading font-black text-lg uppercase tracking-tighter italic">FLASH SALE</span>
                    </div>

                    <div className="flex items-center gap-2 font-heading font-black text-xl text-slate-900">
                        <span className="bg-slate-900 text-white w-10 h-10 flex items-center justify-center rounded-lg">{timeLeft.hours}</span>
                        <span className="text-slate-300">:</span>
                        <span className="bg-slate-900 text-white w-10 h-10 flex items-center justify-center rounded-lg">{timeLeft.minutes}</span>
                        <span className="text-slate-300">:</span>
                        <span className="bg-slate-900 text-white w-10 h-10 flex items-center justify-center rounded-lg">{timeLeft.seconds}</span>
                    </div>
                </div>

                <Link href="/flash-sale" className="text-cta hover:text-slate-900 font-bold uppercase tracking-widest text-[11px] flex items-center gap-1.5 transition-colors">
                    Xem tất cả <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="relative">
                {/* Navigation Buttons */}
                {showLeft && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-cta hover:bg-cta hover:text-white transition-all opacity-0 group-hover/flash:opacity-100 hidden md:flex"
                    >
                        <ChevronLeft className="w-7 h-7" />
                    </button>
                )}

                {showRight && (
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-cta hover:bg-cta hover:text-white transition-all opacity-0 group-hover/flash:opacity-100 hidden md:flex"
                    >
                        <ChevronRight className="w-7 h-7" />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 px-1"
                >
                    {items.map((item) => (
                        <div key={item.item_id} className="w-[180px] md:w-[220px] shrink-0 snap-start group flex flex-col gap-4">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 group-hover:shadow-xl transition-all duration-500">
                                <img src={item.book?.primary_image} alt={item.book_title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 left-3 bg-cta text-white font-black px-2 py-1 rounded-lg text-[10px] shadow-lg">
                                    -{item.discount_percent}%
                                </div>
                            </div>

                            <div className="space-y-3 px-1">
                                <h4 className="font-heading font-extrabold text-slate-800 text-sm line-clamp-1 group-hover:text-cta transition-colors">
                                    {item.book_title}
                                </h4>
                                <div className="flex items-end gap-2">
                                    <span className="text-cta font-black text-lg leading-none">{formatCurrency(item.sale_price)}</span>
                                    <span className="text-slate-300 text-[10px] line-through font-bold">{formatCurrency(item.original_price)}</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                                    <div
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-cta to-orange-400 rounded-full transition-all duration-1000"
                                        style={{ width: `${(item.sold_count / item.quantity_limit) * 100}%` }}
                                    ></div>
                                    <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white uppercase tracking-widest drop-shadow-sm">
                                        Đã bán {item.sold_count}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
