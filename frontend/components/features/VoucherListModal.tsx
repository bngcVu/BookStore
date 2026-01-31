"use client";

import { useEffect } from "react";
import { Voucher } from "@/types";
import { X, Ticket, CheckCircle, AlertCircle } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";

interface VoucherListModalProps {
    isOpen: boolean;
    onClose: () => void;
    vouchers: Voucher[];
    cartTotal: number;
    onApply: (voucher: Voucher) => void;
    currentVoucherCode?: string;
}

export function VoucherListModal({ isOpen, onClose, vouchers, cartTotal, onApply, currentVoucherCode }: VoucherListModalProps) {
    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    // Phân loại voucher
    const validVouchers = vouchers.filter(v => cartTotal >= v.min_order_value);
    const invalidVouchers = vouchers.filter(v => cartTotal < v.min_order_value);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200 z-10 border border-slate-100">
                {/* Header */}
                <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100 shrink-0">
                    <h3 className="font-heading font-black text-lg text-slate-900">Chọn Voucher</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Input Search (Optional) */}
                <div className="p-4 bg-white border-b border-slate-100 shrink-0">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Nhập mã voucher"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all uppercase placeholder:normal-case"
                            />
                        </div>
                        <button className="px-4 py-2 bg-slate-200 text-slate-600 rounded-xl font-bold text-sm uppercase hover:bg-slate-300 transition-colors">
                            Áp dụng
                        </button>
                    </div>
                </div>

                {/* Voucher List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">

                    {/* Valid Vouchers */}
                    {validVouchers.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Mã có thể dùng ({validVouchers.length})</h4>
                            {validVouchers.map(voucher => (
                                <div key={voucher.id} className="group flex bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:border-primary/50 transition-all cursor-pointer" onClick={() => onApply(voucher)}>
                                    {/* Left Stub */}
                                    <div className="w-24 bg-primary/5 flex flex-col items-center justify-center p-3 border-r border-dashed border-primary/20 relative">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
                                            <Image src="https://cdn-icons-png.flaticon.com/512/726/726448.png" width={24} height={24} alt="icon" />
                                        </div>
                                        <span className="text-[10px] font-black text-primary uppercase text-center break-all">{voucher.code}</span>
                                        {/* Circles for ticket effect */}
                                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-slate-50 rounded-full"></div>
                                        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-slate-50 rounded-full"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-3 flex flex-col justify-between relative">
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm line-clamp-1">{voucher.name}</p>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-1">{voucher.description}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Sắp hết hạn</span>
                                            </div>
                                        </div>

                                        {/* Selection Indicator */}
                                        {currentVoucherCode === voucher.code && (
                                            <div className="absolute top-3 right-3">
                                                <CheckCircle className="w-5 h-5 text-primary fill-primary/10" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Invalid Vouchers */}
                    {invalidVouchers.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Chưa đủ điều kiện ({invalidVouchers.length})</h4>
                            {invalidVouchers.map(voucher => (
                                <div key={voucher.id} className="group flex bg-slate-50 rounded-xl overflow-hidden border border-slate-100 opacity-70 grayscale hover:grayscale-0 transition-all">
                                    {/* Left Stub */}
                                    <div className="w-24 bg-slate-100 flex flex-col items-center justify-center p-3 border-r border-dashed border-slate-200 relative">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 opacity-50">
                                            <Ticket className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase text-center break-all">{voucher.code}</span>
                                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-slate-50 rounded-full"></div>
                                        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-slate-50 rounded-full"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-3 flex flex-col justify-center">
                                        <p className="font-bold text-slate-500 text-sm line-clamp-1">{voucher.name}</p>
                                        <p className="text-xs text-slate-400 mt-1">{voucher.description}</p>
                                        <div className="mt-2 flex items-center gap-1.5 text-rose-500 text-[11px] font-medium">
                                            <AlertCircle className="w-3 h-3" />
                                            Mua thêm {formatCurrency(Math.max(0, voucher.min_order_value - cartTotal))}
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mt-2 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-rose-400"
                                                style={{ width: `${(cartTotal / voucher.min_order_value) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-white p-4 border-t border-slate-100 shrink-0">
                    <button onClick={onClose} className="w-full bg-slate-100 text-slate-600 py-3 rounded-xl font-bold uppercase hover:bg-slate-200 transition-colors">
                        Đóng lại
                    </button>
                </div>
            </div>
        </div>
    );
}
