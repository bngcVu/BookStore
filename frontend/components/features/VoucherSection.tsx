"use client";

import { Voucher } from "@/types";
import { Ticket, Clock, CheckCircle2, Copy } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useState } from "react";

interface VoucherSectionProps {
    vouchers: Voucher[];
}

export function VoucherSection({ vouchers = [] }: VoucherSectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const safeVouchers = Array.isArray(vouchers) ? vouchers : [];

    // Limit to 4 items for preview
    const PREVIEW_LIMIT = 4;
    const displayedVouchers = safeVouchers.slice(0, PREVIEW_LIMIT);
    const hasMore = safeVouchers.length > PREVIEW_LIMIT;

    return (
        <>
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
                    {hasMore && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-sm font-bold text-cta hover:text-slate-900 transition-colors flex items-center gap-1"
                        >
                            Xem tất cả ({safeVouchers.length}) &rarr;
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayedVouchers.length > 0 ? (
                        displayedVouchers.map((voucher) => (
                            <VoucherCard key={voucher.id} voucher={voucher} />
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center text-slate-400 font-medium">
                            Không có mã giảm giá nào khả dụng lúc này.
                        </div>
                    )}
                </div>
            </section>

            {/* View All Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-5xl rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                            <div>
                                <h3 className="text-2xl font-heading font-black text-slate-900">Kho Voucher</h3>
                                <p className="text-sm text-slate-500 font-medium">Săn mã giảm giá, mua sắm thả ga</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                                <span className="sr-only">Close</span>
                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {safeVouchers.map((voucher) => (
                                    <VoucherCard key={voucher.id} voucher={voucher} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
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
            <div className="relative flex w-24 flex-col items-center justify-center bg-cta p-2 text-white overflow-hidden shrink-0">
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
            <div className="flex flex-1 flex-col justify-between p-3.5 min-w-0">
                <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading font-black text-[13px] text-slate-800 leading-tight uppercase line-clamp-1 truncate">
                            {voucher.name}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter shrink-0 bg-slate-50 px-1 rounded">
                            {voucher.code}
                        </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                        {voucher.description}
                    </p>
                </div>

                <div className="flex items-end justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold">HSD: 31/12/2025</span>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saved}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all active:scale-95 shadow-sm shrink-0",
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
            <div className="absolute top-0 right-0 p-1 pointer-events-none">
                <div className="w-1 h-1 bg-slate-100 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 right-0 p-1 pointer-events-none">
                <div className="w-1 h-1 bg-slate-100 rounded-full"></div>
            </div>
        </div>
    );
}
