"use client";

import React, { useState } from 'react';
import {
    Zap,
    Calendar,
    Clock,
    Plus,
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    Trash2,
    Edit2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_FLASH_SALES = [
    { id: "FS-001", name: "Sale Giữa Tháng 15/3", startTime: "15/03/2024 10:00", endTime: "15/03/2024 14:00", status: 'upcoming', totalItems: 45, discount: "Lên đến 50%" },
    { id: "FS-002", name: "Săn Deal Cuối Tuần", startTime: "10/03/2024 20:00", endTime: "10/03/2024 23:59", status: 'active', totalItems: 12, discount: "Đồng giá 9K" },
    { id: "FS-003", name: "Back to School", startTime: "01/03/2024 08:00", endTime: "02/03/2024 23:59", status: 'ended', totalItems: 120, discount: "Lên đến 30%" },
];

export default function FlashSaleManagementPage() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Zap className="text-amber-500 fill-amber-500" /> Quản lý Flash Sale
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Lên lịch và cấu hình sản phẩm cho các khung giờ Flash Sale</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="font-bold border-slate-200 gap-2">
                        <Calendar size={16} /> Lịch Sale
                    </Button>
                    <Button className="font-bold bg-amber-500 hover:bg-amber-600 text-white gap-2 shadow-lg shadow-amber-500/20">
                        <Plus size={16} /> Tạo Flash Sale mới
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200">
                {[
                    { id: 'all', label: 'Tất cả Chiến dịch' },
                    { id: 'active', label: 'Đang diễn ra' },
                    { id: 'upcoming', label: 'Sắp tới' },
                    { id: 'ended', label: 'Đã kết thúc' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={cn(
                            "px-6 py-3 font-bold text-sm tracking-tight border-b-2 flex items-center gap-2 transition-colors",
                            activeTab === tab.id
                                ? "border-amber-500 text-amber-600"
                                : "border-transparent text-slate-500 hover:text-slate-900"
                        )}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Campaigns Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                    <div className="relative w-full sm:w-80 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Tìm tên chiến dịch..."
                            className="w-full pl-10 pr-4 h-10 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto h-10 gap-2 font-bold text-slate-600 border-slate-200">
                            <Filter size={16} /> Lọc trạng thái
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 uppercase text-[10px] font-black tracking-widest text-slate-400">
                            <tr>
                                <th className="p-4 w-[250px]">Tên Campaign (Chiến dịch)</th>
                                <th className="p-4 text-center">Trạng thái</th>
                                <th className="p-4">Thời gian / Khung giờ</th>
                                <th className="p-4 text-center">Sản phẩm (SKUs)</th>
                                <th className="p-4 text-center">Khuyến mãi</th>
                                <th className="p-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_FLASH_SALES.filter(fs => activeTab === 'all' || fs.status === activeTab).map((fs, idx) => (
                                <tr key={idx} className="hover:bg-amber-50/30 transition-colors group">
                                    <td className="p-4">
                                        <p className="font-black text-slate-900 text-sm">{fs.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Mã: {fs.id}</p>
                                    </td>
                                    <td className="p-4 text-center">
                                        {fs.status === 'active' && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 border border-emerald-200 animate-pulse">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ĐANG CHẠY
                                            </span>
                                        )}
                                        {fs.status === 'upcoming' && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-100 border border-amber-200">
                                                <Clock size={12} className="text-amber-500" /> SẮP TỚI
                                            </span>
                                        )}
                                        {fs.status === 'ended' && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 border border-slate-200">
                                                <CheckCircle2 size={12} className="text-slate-400" /> ĐÃ KẾT THÚC
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded w-max">
                                                <Calendar size={12} className="text-slate-400" /> Bắt đầu: {fs.startTime}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 px-2 w-max">
                                                Kết thúc: <span className="text-slate-400">{fs.endTime}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <Button variant="link" className="font-bold text-amber-600 p-0 h-auto">
                                            {fs.totalItems} SP
                                        </Button>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded inline-block text-[11px]">{fs.discount}</span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-slate-400 hover:text-amber-600 hover:bg-amber-50" title="Chỉnh sửa">
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50" title="Xóa">
                                                <Trash2 size={16} />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                                                <MoreVertical size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
