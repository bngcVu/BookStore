"use client";

import { Voucher } from "@/types";
import { Ticket, Clock, CheckCircle2, Copy } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useState } from "react";

interface VoucherSectionProps {
    vouchers: Voucher[];
}

export function VoucherSection({ vouchers = [] }: VoucherSectionProps) {
    const safeVouchers = Array.isArray(vouchers) ? vouchers : [];
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cta/10 rounded-xl flex items-center justify-center text-cta">
                        <Ticket className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-heading font-black text-slate-900 uppercase tracking-tight">
                            Mã giảm giá <span className="text-cta italic">độc quyền</span>
                        </h2>
                        <p className="text-slate-500 text-xs font-medium">Lưu ngay mã ưu đãi để nhận giá hời nhất</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {safeVouchers.length > 0 ? (
                    safeVouchers.map((voucher) => (
                        <VoucherCard key={voucher.id} voucher={voucher} />
                    ))
                ) : (
                    <div className="col-span-full py-10 text-center text-slate-400 font-medium">
                        Không có mã giảm giá nào khả dụng lúc này.
                    </div>
                )}
            </div>
        </section>
    );
}

function VoucherCard({ voucher }: { voucher: Voucher }) {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        // Simulate saving
        setTimeout(() => {
            // alert('Đã lưu mã ' + voucher.code);
        }, 300);
    };

    const isPercent = voucher.discount_type === 'percent';
    const displayValue = isPercent
        ? `${voucher.discount_value}%`
        : formatCurrency(voucher.discount_value).replace('₫', '');

    return (
        <div className="group relative flex h-32 w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            {/* Left Section - Discount Info */}
            <div className="relative flex w-24 flex-col items-center justify-center bg-cta p-2 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-8 h-full bg-cta/20 rotate-12 -z-0"></div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1 leading-none">Giảm</span>
                <span className="text-2xl font-black leading-none">{displayValue}</span>
                {isPercent && <span className="text-[10px] font-bold mt-1 opacity-90 truncate max-w-full">Tối đa 100K</span>}
                {!isPercent && <span className="text-[10px] font-black mt-1">GIẢM THẲNG</span>}

                {/* Dotted Line / Perforation Effect */}
                <div className="absolute right-0 top-0 bottom-0 flex flex-col items-center justify-around py-2">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-white rounded-full -mr-[0.75px]"></div>
                    ))}
                </div>
            </div>

            {/* Right Section - Content */}
            <div className="flex flex-1 flex-col justify-between p-3.5">
                <div className="space-y-1">
                    <div className="flex items-start justify-between">
                        <h4 className="font-heading font-black text-[13px] text-slate-800 leading-tight uppercase line-clamp-1">
                            {voucher.name}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter">
                            {voucher.code}
                        </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                        {voucher.description}
                    </p>
                </div>

                <div className="flex items-end justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold">HSD: 31/12/2025</span>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saved}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all active:scale-95 shadow-sm",
                            saved
                                ? "bg-green-50 text-green-600 border border-green-100"
                                : "bg-slate-900 text-white hover:bg-cta hover:shadow-cta/20"
                        )}
                    >
                        {saved ? (
                            <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Đã Lưu</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Lưu Mã</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Corner Decorative Dots */}
            <div className="absolute top-0 right-0 p-1">
                <div className="w-1 h-1 bg-slate-100 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 right-0 p-1">
                <div className="w-1 h-1 bg-slate-100 rounded-full"></div>
            </div>
        </div>
    );
}
