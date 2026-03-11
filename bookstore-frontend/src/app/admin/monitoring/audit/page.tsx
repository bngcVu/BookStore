"use client";

import React, { useState } from 'react';
import {
    History,
    TrendingDown,
    TrendingUp,
    Package,
    ArrowRightLeft,
    Clock,
    Search,
    Filter,
    User,
    Calendar,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_AUDIT_LOGS = [
    {
        id: "AUD-1001",
        type: "price",
        item: "Đắc Nhân Tâm (Bìa cứng)",
        action: "Thay đổi giá",
        oldValue: "120.000đ",
        newValue: "150.000đ",
        user: "Admin_Master",
        time: "10:30 - 12/03/2024",
        reason: "Tăng giá nhập cuối năm",
        trend: "up"
    },
    {
        id: "AUD-1002",
        type: "inventory",
        item: "Nhà Giả Kim",
        action: "Nhập kho thêm",
        oldValue: "12",
        newValue: "+50",
        user: "Staff_BienTap",
        time: "09:15 - 12/03/2024",
        reason: "Nhập hàng định kỳ",
        trend: "up"
    },
    {
        id: "AUD-1003",
        type: "price",
        item: "Harry Potter Vol 1",
        action: "Giảm giá",
        oldValue: "250.000đ",
        newValue: "199.000đ",
        user: "Marketing_Spec",
        time: "15:45 - 11/03/2024",
        reason: "Chương trình Flash Sale",
        trend: "down"
    },
    {
        id: "AUD-1004",
        type: "inventory",
        item: "Dế Mèn Phiêu Lưu Ký",
        action: "Xuất kho (Lỗi)",
        oldValue: "85",
        newValue: "-5",
        user: "Staff_BienTap",
        time: "14:20 - 11/03/2024",
        reason: "Hàng bị hư hỏng trong kho",
        trend: "down"
    },
];

export default function AuditLogsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <History className="text-indigo-600" /> Nhật ký Kiểm toán (Audit Logs)
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Truy vết lịch sử thay đổi giá và tồn kho toàn hệ thống</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="font-bold border-slate-200 bg-white">
                        <Calendar size={16} className="mr-2" /> Tháng này
                    </Button>
                    <Button className="font-bold bg-slate-900 text-white hover:bg-slate-800">
                        Xuất báo cáo PDF
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200">
                {[
                    { id: 'all', label: 'Tất cả nhật ký', icon: History },
                    { id: 'price', label: 'Biến động giá', icon: TrendingUp },
                    { id: 'inventory', label: 'Lịch sử Kho', icon: Package }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-6 py-3 font-bold text-sm tracking-tight border-b-2 flex items-center gap-2 transition-colors relative",
                            activeTab === tab.id
                                ? "border-indigo-600 text-indigo-700"
                                : "border-transparent text-slate-500 hover:text-slate-900"
                        )}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                        {activeTab === tab.id && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 animate-in fade-in duration-300" />
                        )}
                    </button>
                ))}
            </div>

            {/* Filter & Table Area */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                    <div className="relative w-full sm:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Tìm theo sản phẩm, người thực hiện..."
                            className="w-full pl-10 pr-4 h-10 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-10 gap-2 font-bold text-slate-600 border-slate-200 bg-white">
                            <Filter size={16} /> Lọc nâng cao
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                            <tr>
                                <th className="p-4">Thời gian / ID</th>
                                <th className="p-4">Hạng mục / Sản phẩm</th>
                                <th className="p-4">Hoạt động</th>
                                <th className="p-4">Giá trị cũ/mới</th>
                                <th className="p-4">Người thực hiện</th>
                                <th className="p-4">Lý do thay đổi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_AUDIT_LOGS.filter(log => activeTab === 'all' || log.type === activeTab).map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-4">
                                        <p className="font-bold text-slate-900">{log.time.split(' - ')[0]}</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{log.id}</span>
                                            <Clock size={12} className="text-slate-300" />
                                        </div>
                                    </td>
                                    <td className="p-4 max-w-[250px]">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm border",
                                                log.type === 'price' ? "bg-amber-50 border-amber-100 text-amber-600" : "bg-blue-50 border-blue-100 text-blue-600"
                                            )}>
                                                {log.type === 'price' ? <TrendingUp size={16} /> : <Package size={16} />}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 truncate">{log.item}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{log.time.split(' - ')[1]}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                                            log.trend === 'up' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                        )}>
                                            {log.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2" suppressHydrationWarning>
                                            <span className="text-slate-400 line-through text-xs font-medium">{log.oldValue}</span>
                                            <ArrowRightLeft size={12} className="text-slate-300" />
                                            <span className="font-black text-slate-900">{log.newValue}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex items-center gap-2 bg-slate-100/50 w-fit px-3 py-1.5 rounded-xl border border-slate-200">
                                            <User size={14} className="text-slate-500" />
                                            <p className="text-[11px] font-black text-slate-600">{log.user}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-xs text-slate-500 font-medium italic line-clamp-1 border-l-2 border-slate-200 pl-2">"{log.reason}"</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hiển thị {MOCK_AUDIT_LOGS.length} nhật ký gần nhất</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0"><ChevronLeft size={16} /></Button>
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0 font-black bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200">1</Button>
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0"><ChevronRight size={16} /></Button>
                    </div>
                </div>
            </div>

            {/* Insight Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white overflow-hidden relative group">
                    <TrendingUp className="absolute bottom-[-10%] right-[-5%] w-32 h-32 text-white/5 group-hover:scale-125 transition-transform duration-500" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Quản lý rủi ro</h3>
                    <p className="text-sm font-bold text-slate-200 leading-relaxed mb-6">Có <span className="text-amber-400 font-black">12 lần</span> thay đổi giá đáng nghi ngờ (giảm hơn 50%) trong tuần qua cần được kiểm duyệt bởi Super Admin.</p>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold border rounded-2xl">
                        Xem chi tiết cảnh báo
                    </Button>
                </div>
                <div className="bg-indigo-600 rounded-3xl p-6 text-white overflow-hidden relative group">
                    <Package className="absolute bottom-[-10%] right-[-5%] w-32 h-32 text-white/5 group-hover:scale-125 transition-transform duration-500" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-indigo-200 mb-4">Phân tích tồn kho</h3>
                    <p className="text-sm font-bold text-slate-100 leading-relaxed mb-6">Tốc độ nhập kho tăng <span className="text-white font-black">22%</span> so với tháng trước. 85% các hoạt động nhập kho được thực hiện bởi Staff_BienTap.</p>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold border rounded-2xl">
                        Tải báo cáo vận hành
                    </Button>
                </div>
            </div>
        </div>
    );
}
