'use client';

import React, { useState } from 'react';
import { Ticket, Copy, CheckCircle, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Voucher } from '@/types';

interface VoucherCollectorProps {
    vouchers: Voucher[];
}

export function VoucherCollector({ vouchers }: VoucherCollectorProps) {
    const [collectedIds, setCollectedIds] = useState<number[]>([]);

    const handleCollect = (id: number) => {
        setCollectedIds(prev => [...prev, id]);
        // TODO: Call API to save voucher to user wallet
        // userAPI.collectVoucher(id)...
    };

    if (!vouchers || vouchers.length === 0) return null;

    return (
        <div className="space-y-3 py-4 border-t border-b border-slate-100 my-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Ticket className="w-4 h-4 text-rose-500" />
                <span>Mã giảm giá dành cho sản phẩm này</span>
            </div>

            <div className="flex flex-wrap gap-3">
                {vouchers.map((voucher) => {
                    const isCollected = collectedIds.includes(voucher.id);

                    return (
                        <div
                            key={voucher.id}
                            className="group relative flex items-center bg-white border border-rose-100 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
                        >
                            {/* Left Ticket Stub */}
                            <div className="bg-rose-50 px-3 py-2 border-r border-dashed border-rose-200 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{voucher.code}</span>
                            </div>

                            {/* Center Info */}
                            <div className="px-3 py-2">
                                <p className="text-xs font-bold text-slate-700">Giảm {voucher.discount_value.toLocaleString('vi-VN')}đ</p>
                                <p className="text-[10px] text-slate-400">Đơn từ {voucher.min_order_value.toLocaleString('vi-VN')}đ</p>
                            </div>

                            {/* Right Action */}
                            <button
                                onClick={() => !isCollected && handleCollect(voucher.id)}
                                disabled={isCollected}
                                className={cn(
                                    "px-3 self-stretch flex items-center justify-center text-[10px] font-black uppercase tracking-wider transition-colors",
                                    isCollected
                                        ? "bg-slate-100 text-slate-400 cursor-default"
                                        : "bg-rose-500 text-white hover:bg-rose-600 active:scale-95"
                                )}
                            >
                                {isCollected ? 'Đã Lưu' : 'Lưu'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
