"use client";

import React, { useState } from 'react';
import {
    Ticket,
    Percent,
    TrendingDown,
    Gift,
    Plus,
    Search,
    Filter,
    Users,
    CalendarDays,
    CheckCircle2,
    Copy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_VOUCHERS = [
    { id: "VC-WELCOME", code: "WELCOME50", type: "percent", value: 50, maxDiscount: 50000, minOrder: 150000, usageLimit: 1000, used: 845, status: "active", expire: "31/12/2024" },
    { id: "VC-FREESHIP", code: "FREESHIPMAX", type: "shipping", value: 30000, maxDiscount: 30000, minOrder: 0, usageLimit: 500, used: 500, status: "ended", expire: "01/03/2024" },
    { id: "VC-LOYALTY", code: "VIPGIAM100K", type: "fixed", value: 100000, maxDiscount: 100000, minOrder: 500000, usageLimit: 50, used: 12, status: "active", expire: "15/04/2024" },
];

export default function PromotionsManagementPage() {
    const [activeTab, setActiveTab] = useState('vouchers');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Ticket className="text-violet-500" /> Quản lý Khuyến mãi
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Tạo Mã giảm giá (Vouchers) và cấu hình Combo mua sắm</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button className="font-bold bg-violet-600 hover:bg-violet-700 text-white gap-2 shadow-lg shadow-violet-500/20">
                        <Plus size={16} /> Tạo Combo Buy X Get Y
                    </Button>
                    <Button className="font-bold bg-slate-900 hover:bg-slate-800 text-white gap-2 shadow-lg shadow-slate-900/20">
                        <Plus size={16} /> Tạo Voucher Mới
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200">
                {[
                    { id: 'vouchers', label: 'Mã Giảm giá (Vouchers)' },
                    { id: 'combo', label: 'Combo Mua Kèm' },
                    { id: 'tiers', label: 'Khuyến mãi Hạng thẻ' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={cn(
                            "px-6 py-3 font-bold text-sm tracking-tight border-b-2 flex items-center gap-2 transition-colors",
                            activeTab === tab.id
                                ? "border-violet-600 text-violet-700"
                                : "border-transparent text-slate-500 hover:text-slate-900"
                        )}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'vouchers' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                        <div className="relative w-full sm:w-80 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Tìm mã Voucher, ID..."
                                className="w-full pl-10 pr-4 h-10 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button variant="outline" className="w-full sm:w-auto h-10 gap-2 font-bold text-slate-600 border-slate-200">
                                <Filter size={16} /> Lọc Loại mã
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 uppercase text-[10px] font-black tracking-widest text-slate-400">
                                <tr>
                                    <th className="p-4 w-[250px]">Mã Voucher (Code)</th>
                                    <th className="p-4">Loại Khuyến mãi</th>
                                    <th className="p-4 text-center">Giới hạn / Đã dùng</th>
                                    <th className="p-4 text-center">Trạng thái</th>
                                    <th className="p-4 text-center">Thời gian sử dụng</th>
                                    <th className="p-4 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {MOCK_VOUCHERS.map((v, idx) => (
                                    <tr key={idx} className="hover:bg-violet-50/30 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-black text-slate-900 text-sm tracking-widest border border-dashed border-slate-300 rounded px-2 py-1 bg-slate-50">{v.code}</span>
                                                <Button variant="ghost" size="sm" className="w-6 h-6 p-0 text-slate-400 hover:text-violet-600 shrink-0">
                                                    <Copy size={12} />
                                                </Button>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">ID: {v.id}</p>
                                        </td>
                                        <td className="p-4">
                                            {v.type === 'percent' && (
                                                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                                                    <Percent size={14} className="text-emerald-500" /> Giảm {v.value}% (Max {v.maxDiscount.toLocaleString('vi-VN')}đ)
                                                </p>
                                            )}
                                            {v.type === 'fixed' && (
                                                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                                                    <TrendingDown size={14} className="text-violet-500" /> Trừ thẳng {v.value.toLocaleString('vi-VN')}đ
                                                </p>
                                            )}
                                            {v.type === 'shipping' && (
                                                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                                                    <Gift size={14} className="text-blue-500" /> Miễn phí Vận chuyển (Tối đa {v.maxDiscount.toLocaleString('vi-VN')}đ)
                                                </p>
                                            )}
                                            <p className="text-[11px] font-medium text-slate-500 mt-1">Đơn tối thiểu: {v.minOrder === 0 ? "0đ" : v.minOrder.toLocaleString('vi-VN') + "đ"}</p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-full max-w-[120px] bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                                                    <div
                                                        className={cn("h-full rounded-full transition-all duration-1000", v.used >= v.usageLimit ? "bg-rose-500" : "bg-violet-600")}
                                                        style={{ width: `${(v.used / v.usageLimit) * 100}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs font-bold text-slate-700">
                                                    <span className={cn(v.used >= v.usageLimit ? "text-rose-600" : "")}>{v.used}</span> / {v.usageLimit} <Users size={12} className="inline text-slate-400 ml-1" />
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            {v.status === 'active' && v.used < v.usageLimit ? (
                                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1 w-max mx-auto">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Đang chạy
                                                </span>
                                            ) : (
                                                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1 w-max mx-auto border border-slate-200">
                                                    <CheckCircle2 size={12} className="text-slate-400" /> Hết hạn / Hết lượt
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <p className="text-xs font-bold text-slate-600 flex items-center gap-2 justify-center">
                                                <CalendarDays size={14} className="text-slate-400" /> HSD: {v.expire}
                                            </p>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button variant="link" className="font-bold text-violet-600 p-0 h-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                Cấu hình
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab !== 'vouchers' && (
                <div className="py-24 text-center">
                    <h3 className="text-lg font-bold text-slate-400 animate-pulse">Giao diện này đang được thiết kế...</h3>
                </div>
            )}

        </div>
    );
}
