"use client";

import React, { useState } from 'react';
import {
    Archive,
    ArrowDownToLine,
    ArrowUpFromLine,
    Search,
    Filter,
    RefreshCw,
    AlertTriangle,
    History,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BEST_SELLERS } from '@/lib/mockData';

// Generate mock inventory data based on books
const MOCK_INVENTORY = BEST_SELLERS.map((b, i) => ({
    id: `BS-${2024 + i}`,
    sku: `SKU-PRINT-${b.title.substring(0, 3).toUpperCase()}`,
    name: b.title,
    image: b.imageUrl,
    category: i % 2 === 0 ? "Kinh tế" : "Văn học",
    quantity: Math.floor(Math.random() * 100), // Tổng tồn
    reserved_quantity: Math.floor(Math.random() * 15), // Đang tạm giữ (chờ giao)
    min_stock_level: 10,
    last_restocked: "10/03/2024",
}));

export default function InventoryManagementPage() {
    const [activeTab, setActiveTab] = useState('stock');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Quản lý Kho hàng</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Kiểm soát tồn kho, phiếu nhập và phiếu xuất</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="font-bold border-slate-200 gap-2"
                        onClick={() => alert("Đang chuẩn bị form Xuất Kho...")}
                    >
                        <ArrowUpFromLine size={16} /> Xuất Kho
                    </Button>
                    <Button
                        className="font-bold bg-primary hover:bg-primary/90 text-white gap-2"
                        onClick={() => alert("Đang chuẩn bị form Nhập Kho...")}
                    >
                        <ArrowDownToLine size={16} /> Lập Phiếu Nhập
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200">
                {[
                    { id: 'stock', label: 'Tồn kho hiện tại', icon: Archive },
                    { id: 'history', label: 'Lịch sử Nhập/Xuất', icon: History },
                    { id: 'warnings', label: 'Cảnh báo hết hàng', icon: AlertTriangle, count: 3 }
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={cn(
                            "px-6 py-3 font-bold text-sm tracking-tight border-b-2 flex items-center gap-2 transition-colors",
                            activeTab === tab.id
                                ? "border-primary text-primary"
                                : "border-transparent text-slate-500 hover:text-slate-900"
                        )}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <tab.icon size={16} /> {tab.label}
                        {tab.count && (
                            <span className={cn("ml-1 px-1.5 py-0.5 rounded-md text-[10px]", activeTab === tab.id ? "bg-primary/10" : "bg-slate-100")}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Table Toolbar */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Nhập mã SKU hoặc Tên sản phẩm..."
                            className="w-full pl-10 pr-4 h-10 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="h-10 gap-2 font-bold text-slate-600 border-slate-200">
                            <Filter size={16} /> Lọc trạng thái
                        </Button>
                        <Button variant="ghost" className="h-10 w-10 p-0 text-slate-400 hover:text-primary">
                            <RefreshCw size={16} />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'stock' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50/50 uppercase text-[10px] font-black tracking-widest text-slate-500">
                                <tr>
                                    <th className="p-4 w-10 text-center"><input type="checkbox" className="rounded" /></th>
                                    <th className="p-4 w-[280px]">Sản phẩm / SKU</th>
                                    <th className="p-4 text-center">Tồn hệ thống<br /><span className="lowercase font-bold text-slate-400">(quantity)</span></th>
                                    <th className="p-4 text-center">Đang giữ/Chờ giao<br /><span className="lowercase font-bold text-amber-400 opacity-60">(reserved)</span></th>
                                    <th className="p-4 text-center">Có thể bán<br /><span className="lowercase font-bold text-emerald-400 opacity-60">(available)</span></th>
                                    <th className="p-4 text-center">Định mức<br /><span className="lowercase font-bold text-slate-400">(min_stock)</span></th>
                                    <th className="p-4 text-right">Nhập gần nhất</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {MOCK_INVENTORY.map((item, idx) => {
                                    const available = item.quantity - item.reserved_quantity;
                                    const isLowStock = available <= item.min_stock_level;

                                    return (
                                        <tr key={idx} className={cn("transition-colors group", isLowStock ? "bg-rose-50/30 hover:bg-rose-50" : "hover:bg-slate-50")}>
                                            <td className="p-4 text-center"><input type="checkbox" className="rounded border-slate-300" /></td>
                                            <td className="p-4">
                                                <div className="flex gap-3 items-center">
                                                    <img src={item.image} alt={item.name} className="w-10 h-14 rounded object-cover shadow-sm" />
                                                    <div>
                                                        <p className="font-bold text-slate-900 text-sm line-clamp-1">{item.name}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded tracking-widest uppercase">{item.sku}</span>
                                                            <span className="text-[10px] font-bold text-slate-400">{item.category}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="font-bold text-slate-700">{item.quantity}</span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">{item.reserved_quantity}</span>
                                            </td>
                                            <td className="p-4 text-center relative group/tooltip">
                                                <span className={cn(
                                                    "font-black text-lg px-3 py-1 rounded-lg",
                                                    isLowStock ? "text-rose-600 bg-rose-100 ring-1 ring-rose-200" : "text-emerald-700 bg-emerald-50"
                                                )}>
                                                    {available > 0 ? available : 0}
                                                </span>
                                                {isLowStock && (
                                                    <div className="absolute left-1/2 -top-1 -translate-x-1/2 -translate-y-full opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded w-max z-10 hidden sm:block">
                                                        Cảnh báo: Dưới định mức tối thiểu
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="font-bold text-slate-400">{item.min_stock_level}</span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <p className="font-bold text-slate-600 text-xs">{item.last_restocked}</p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Cảnh báo Section Mock */}
                {activeTab === 'warnings' && (
                    <div className="p-12 text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-4">
                            <AlertTriangle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Cần nhập hàng (3)</h3>
                        <p className="text-sm font-medium text-slate-500 mt-2 max-w-sm">Có 3 sản phẩm có số lượng <strong className="text-slate-900">Có thể bán</strong> giảm xuống dưới mức tối thiểu. Vui lòng lập phiếu nhập kho.</p>
                        <Button className="mt-6 font-bold bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/20 px-8">Xử lý ngay</Button>
                    </div>
                )}

                {/* Lịch sử Mock */}
                {activeTab === 'history' && (
                    <div className="p-12 text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-4 rotate-12">
                            <Archive size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Sổ tay Kho (Thẻ Kho)</h3>
                        <p className="text-sm font-medium text-slate-500 mt-2 max-w-sm">Ghi nhận mọi biến động Số lượng theo thời gian thực (Nhập, Xuất, Điều chỉnh số dư).</p>
                        <div className="flex gap-2 mt-6">
                            <Button variant="outline" className="font-bold border-slate-200">Tra cứu mã Phiếu</Button>
                            <Button variant="outline" className="font-bold border-slate-200">Xuất báo cáo (CSV)</Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
