'use client';

import React from 'react';
import { Ticket, Copy, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Voucher } from '@/types';

interface MyVouchersProps {
    vouchers: Voucher[];
}

export function MyVouchers({ vouchers }: MyVouchersProps) {
    const [copiedId, setCopiedId] = React.useState<number | null>(null);

    const handleCopy = (code: string, id: number) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (vouchers.length === 0) {
        return (
            <div className="py-12 text-center bg-slate-50 rounded-[24px]">
                <Ticket className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-slate-500 font-medium">Bạn chưa có mã giảm giá nào.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vouchers.map((voucher) => (
                <div key={voucher.id} className="relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex group hover:shadow-md transition-shadow">
                    {/* Left Part: Decor & Icon */}
                    <div className="bg-gradient-to-br from-rose-500 to-orange-500 w-24 flex items-center justify-center text-white relative overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 w-4 h-4 bg-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                        <div className="border-[2px] border-white/20 rounded-xl p-2">
                            <Ticket className="w-6 h-6" />
                        </div>
                        <div className="absolute right-0 top-2 bottom-2 border-r-2 border-dashed border-white/30"></div>
                    </div>

                    {/* Right Part: Info */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-full">
                                    {voucher.code}
                                </span>
                                {voucher.discount_type === 'percent' && (
                                    <span className="text-xs font-bold text-slate-400">-{voucher.discount_value}%</span>
                                )}
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-tight">{voucher.name}</h4>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-1">{voucher.description}</p>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-medium">HSD: {new Date(voucher.end_date).toLocaleDateString('vi-VN')}</span>
                            <button
                                onClick={() => handleCopy(voucher.code, voucher.id)}
                                className={cn(
                                    "text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all",
                                    copiedId === voucher.id
                                        ? "bg-green-100 text-green-700"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                )}
                            >
                                {copiedId === voucher.id ? (
                                    <>
                                        <CheckCircle className="w-3 h-3" /> Đã chép
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3 h-3" /> Sao chép
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
