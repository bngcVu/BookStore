"use client";

import React, { useState } from 'react';
import {
    Users,
    Search,
    Filter,
    Download,
    Mail,
    Star,
    MoreVertical,
    ChevronRight,
    ShieldCheck,
    UserPlus,
    ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_CUSTOMERS = [
    { id: "CUST-001", name: "Nguyễn Văn A", email: "vana@gmail.com", tier: "Gold", points: 2450, totalSpent: 12500000, joinDate: "12/01/2023", status: "active" },
    { id: "CUST-002", name: "Trần Thị B", email: "thib@gmail.com", tier: "Silver", points: 850, totalSpent: 4200000, joinDate: "05/03/2023", status: "active" },
    { id: "CUST-003", name: "Lê Văn C", email: "vanc@yahoo.com", tier: "Platinum", points: 5200, totalSpent: 45000000, joinDate: "20/11/2022", status: "active" },
    { id: "CUST-004", name: "Phạm Thị D", email: "thid@outlook.com", tier: "Bronze", points: 120, totalSpent: 850000, joinDate: "10/02/2024", status: "inactive" },
];

const TIER_COLORS = {
    Platinum: "bg-slate-900 text-white border-slate-700",
    Gold: "bg-amber-100 text-amber-700 border-amber-200",
    Silver: "bg-slate-100 text-slate-600 border-slate-200",
    Bronze: "bg-orange-100 text-orange-700 border-orange-200",
};

export default function CustomerManagementPage() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Users className="text-primary" /> Quản lý Khách hàng (CRM)
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Quản lý hồ sơ người dùng, hạng thẻ Loyalty và lịch sử tích điểm</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="font-bold border-slate-200 gap-2" onClick={() => alert("Đang chuẩn bị dữ liệu CSV...")}>
                        <Download size={16} /> Xuất CSV
                    </Button>
                    <Button className="font-bold bg-primary hover:bg-primary/90 text-white gap-2" onClick={() => alert("Mở form Thêm khách hàng...")}>
                        <UserPlus size={16} /> Thêm khách hàng
                    </Button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Tổng khách hàng", value: "4,250", trend: "+12%" },
                    { label: "Khách hàng VIP", value: "156", trend: "+5%" },
                    { label: "Điểm đã cấp", value: "1.2M", trend: "+8%" },
                    { label: "Tỉ lệ quay lại", value: "32%", trend: "+2%" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        <div className="flex items-end justify-between mt-2">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                            <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                                <ArrowUpRight size={14} /> {stat.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                    <div className="relative w-full sm:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Tìm theo tên, email, số điện thoại..."
                            className="w-full pl-10 pr-4 h-10 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-10 gap-2 font-bold text-slate-600 border-slate-200">
                            <Filter size={16} /> Lọc hạng thẻ
                        </Button>
                        <Button variant="outline" size="sm" className="h-10 gap-2 font-bold text-slate-600 border-slate-200">
                            <ShieldCheck size={16} /> Review Loyalty
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 uppercase text-[10px] font-black tracking-widest text-slate-400">
                            <tr>
                                <th className="p-4">Khách hàng</th>
                                <th className="p-4">Hạng thẻ</th>
                                <th className="p-4 text-center">Tích điểm</th>
                                <th className="p-4 text-right">Tổng chi tiêu</th>
                                <th className="p-4 text-center">Ngày tham gia</th>
                                <th className="p-4 text-center">Trạng thái</th>
                                <th className="p-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_CUSTOMERS.map((cust, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200 uppercase">
                                                {cust.name.split(' ').pop()?.[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{cust.name}</p>
                                                <p className="text-xs text-slate-500 font-medium">{cust.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                            TIER_COLORS[cust.tier as keyof typeof TIER_COLORS]
                                        )}>
                                            {cust.tier}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <p className="font-black text-slate-700">{cust.points.toLocaleString()}</p>
                                    </td>
                                    <td className="p-4 text-right">
                                        <p className="font-black text-slate-900">{cust.totalSpent.toLocaleString()} đ</p>
                                    </td>
                                    <td className="p-4 text-center">
                                        <p className="font-bold text-slate-500 text-xs">{cust.joinDate}</p>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                            cust.status === 'active' ? "text-emerald-700 bg-emerald-100" : "text-slate-500 bg-slate-100"
                                        )}>
                                            {cust.status === 'active' ? "Hoạt động" : "Khóa"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-slate-400 hover:text-primary hover:bg-primary/10">
                                                <Mail size={16} />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-slate-400 hover:text-slate-900 hover:bg-slate-100">
                                                <MoreVertical size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
                    <p>Hiển thị <span className="font-bold text-slate-900">1</span> đến <span className="font-bold text-slate-900">4</span> trong <span className="font-bold text-slate-900">4,250</span> khách hàng</p>
                    <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0 font-bold border-slate-200" disabled>&lt;</Button>
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0 font-black bg-primary text-white border-primary shadow-sm">1</Button>
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0 font-bold border-slate-200 hover:text-primary hover:border-primary/30">2</Button>
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0 font-bold border-slate-200 hover:text-primary hover:border-primary/30">&gt;</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
