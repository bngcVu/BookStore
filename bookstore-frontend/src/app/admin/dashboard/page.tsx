"use client";

import React from 'react';
import {
    TrendingUp,
    ShoppingBag,
    Users,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    PackageX
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BEST_SELLERS } from '@/lib/mockData';

const WIDGETS = [
    { title: "Doanh thu hôm nay", value: "12,540,000 đ", prefix: "+", trend: "+12.5%", isUp: true, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Đơn hàng mới", value: "45 đơn", prefix: "", trend: "+5.2%", isUp: true, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Khách hàng mới", value: "12 người", prefix: "+", trend: "-2.1%", isUp: false, icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "Cảnh báo hết hàng", value: "3 SKU", prefix: "", trend: "-1.0%", isUp: true, icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
];

const LOW_STOCK_ITEMS = [
    { id: "SKU1029", name: "Đắc Nhân Tâm - Bìa Cứng", stock: 5, min_stock: 10 },
    { id: "SKU3911", name: "Nhà Giả Kim (Tái bản 2024)", stock: 2, min_stock: 20 },
    { id: "SKU8822", name: "Harry Potter Tập 1", stock: 0, min_stock: 5 },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Tổng quan Cửa hàng</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Hôm nay là Thứ Tư, 12/03/2024</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="font-bold rounded-lg h-9 shadow-sm">
                        24h qua
                    </Button>
                    <Button className="font-bold rounded-lg h-9 shadow-sm bg-primary hover:bg-primary/90 text-white">
                        Tải báo cáo
                    </Button>
                </div>
            </div>

            {/* Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {WIDGETS.map((w, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 hover:border-primary/20 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", w.bg, w.color)}>
                                <w.icon size={20} />
                            </div>
                            <div className={cn("flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md",
                                w.isUp ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                            )}>
                                {w.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {w.trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 font-bold text-sm">{w.title}</p>
                            <h3 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">{w.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts & Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Placeholder Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-900">Biểu đồ Doanh thu (Tuần)</h3>
                        <select className="text-sm font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-primary/20">
                            <option>7 ngày qua</option>
                            <option>30 ngày qua</option>
                        </select>
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center min-h-[300px]">
                        {/* Mock Chart Visualization */}
                        <div className="flex items-end gap-4 h-48 w-full max-w-md px-4 relative">
                            <div className="w-full bg-slate-200 h-full absolute left-0 bottom-0 opacity-10 rounded-xl" />
                            {[40, 60, 30, 80, 50, 90, 100].map((h, i) => (
                                <div key={i} className="flex-1 group relative flex justify-center">
                                    <div
                                        className="w-full bg-primary/20 rounded-t-sm group-hover:bg-primary transition-colors cursor-pointer"
                                        style={{ height: `${h}%` }}
                                    />
                                    <div className="absolute -bottom-6 text-xs font-bold text-slate-400">T{i + 2}</div>
                                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-black py-1 px-2 rounded tracking-widest pointer-events-none z-10">
                                        {h}Tr
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Cảnh báo Không đủ tồn kho */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-0 flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-50 flex flex-col items-center justify-center text-rose-500">
                            <PackageX size={20} />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-900 leading-tight">Cần nhập hàng</h3>
                            <p className="text-xs font-bold text-slate-400">3 SKU dưới định mức</p>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-[350px]">
                        {LOW_STOCK_ITEMS.map((item, idx) => (
                            <div key={idx} className="p-4 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div>
                                    <p className="font-bold text-sm text-slate-800 line-clamp-1">{item.name}</p>
                                    <p className="text-[11px] font-black text-slate-400 tracking-wider mt-1 uppercase">{item.id}</p>
                                </div>
                                <div className="text-right shrink-0 ml-4">
                                    <p className={cn("font-black text-lg", item.stock === 0 ? "text-rose-500" : "text-amber-500")}>
                                        {item.stock} <span className="text-xs text-slate-400 font-bold">cuốn</span>
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">Min: {item.min_stock}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-100">
                        <Button variant="outline" className="w-full font-bold text-primary border-primary/20 hover:bg-primary hover:text-white">
                            Lên phiếu nhập kho
                        </Button>
                    </div>
                </div>

            </div>

            {/* Top Best Sellers */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-black text-slate-900">Top Sách Bán Chạy (Tuần)</h3>
                    <Button variant="link" className="font-bold text-primary">Xem tất cả</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {BEST_SELLERS.slice(0, 4).map((book, i) => (
                        <div key={i} className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:border-primary/30 transition-colors group">
                            <div className="w-16 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                                <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="font-bold text-sm text-slate-800 line-clamp-2 leading-snug">{book.title}</p>
                                <p className="text-xs font-bold text-slate-400 mt-2">Đã bán: <span className="text-emerald-500">{book.soldQuantity}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
