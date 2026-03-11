"use client";

import React, { useState } from 'react';
import {
    Send,
    Clock,
    Smartphone,
    Bell,
    Plus,
    Target,
    Users,
    ChevronRight,
    BarChart3,
    Calendar,
    MoreVertical,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_PUSH = [
    { id: "PUSH-881", title: "Khuyến mãi Flash Sale!", description: "⚡ Sách đồng giá 9K sắp bắt đầu. Đừng bỏ lỡ!", scheduled: "15/03/2024 10:00", target: "All Users", status: "scheduled", sent: 0, openRate: 0 },
    { id: "PUSH-772", title: "Có sách mới trong Wishlist", description: "📚 Cuốn sách bạn quan tâm đã có hàng trở lại.", scheduled: "12/03/2024 14:30", target: "Loyalty Gold", status: "sent", sent: 1240, openRate: 24.5 },
    { id: "PUSH-110", title: "Chào mừng 8/3", description: "🌸 Tặng voucher 50% cho người dùng nữ!", scheduled: "08/03/2024 08:00", target: "Female Users", status: "sent", sent: 5400, openRate: 18.2 },
];

export default function PushNotificationsPage() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Send className="text-indigo-500" /> Thông báo Push (APP/Web)
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Gửi thông báo Marketing hoặc thông báo hệ thống tự động</p>
                </div>
                <Button
                    className="font-bold bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-500/20"
                    onClick={() => alert("Mở trình soạn thảo thông báo PUSH...")}
                >
                    <Plus size={16} /> Soạn thông báo mới
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left: Quick Form / Templates */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="font-black text-slate-900 text-sm mb-4 uppercase tracking-widest flex items-center gap-2">
                            <Target size={16} className="text-indigo-500" /> Segment Đối tượng
                        </h3>
                        <div className="space-y-2">
                            {[
                                { label: "Tất cả User", count: "4,250", active: true },
                                { label: "Hạng Gold/Platinum", count: "840", active: false },
                                { label: "30 ngày chưa login", count: "1,120", active: false },
                            ].map((s, i) => (
                                <button
                                    key={i}
                                    className={cn(
                                        "w-full text-left p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between",
                                        s.active ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-white"
                                    )}
                                    onClick={() => alert(`Đã chọn segment: ${s.label}`)}
                                >
                                    {s.label}
                                    <span className="opacity-60">{s.count}</span>
                                </button>
                            ))}
                        </div>
                        <Button
                            variant="link"
                            className="w-full mt-4 text-[10px] uppercase font-black text-indigo-600 border-t border-slate-50 pt-4 rounded-none"
                            onClick={() => alert("Chuyển hướng đến trang Quản lý Đối tượng (Segments)...")}
                        >
                            Quản lý Segment <ChevronRight size={12} />
                        </Button>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-5 rounded-2xl text-white shadow-xl">
                        <Smartphone className="opacity-30 mb-4" size={24} />
                        <h3 className="font-black text-sm">Preview UI Mobile</h3>
                        <p className="text-[10px] opacity-80 mt-1 leading-relaxed">
                            Xem trước giao dịch hiện thực trên Android/iOS trước khi gửi.
                        </p>
                        <Button
                            className="w-full mt-6 bg-white/20 hover:bg-white/30 text-white border-0 font-bold text-xs ring-1 ring-white/30 shadow-none"
                            onClick={() => alert("Đang gửi thông báo thử nghiệm đến các thiết bị nội bộ...")}
                        >
                            Gửi máy test (Internal)
                        </Button>
                    </div>
                </div>

                {/* Right: History List */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-black text-slate-900 text-sm italic">Chiến dịch gần đây</h3>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 font-bold text-[10px] rounded-lg"
                                    onClick={() => alert("Mở bộ lọc thời gian...")}
                                >
                                    Tháng này
                                </Button>
                            </div>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {MOCK_PUSH.map((push) => (
                                <div key={push.id} className="p-5 hover:bg-slate-50/50 transition-colors group">
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                                                push.status === 'scheduled' ? "bg-amber-100 text-amber-600" : "bg-indigo-100 text-indigo-600"
                                            )}>
                                                {push.status === 'scheduled' ? <Clock size={20} /> : <CheckCircle2 size={20} />}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 text-base">{push.title}</h4>
                                                <p className="text-sm font-medium text-slate-500 mt-0.5">{push.description}</p>

                                                <div className="flex items-center gap-4 mt-4">
                                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                                                        <Calendar size={12} /> {push.scheduled}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                                                        <Users size={12} /> {push.target}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right flex flex-col items-end gap-2">
                                            {push.status === 'sent' && (
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 justify-end">
                                                        <BarChart3 size={14} className="text-emerald-500" />
                                                        <span className="text-xs font-black text-slate-900">{push.openRate}% Open</span>
                                                    </div>
                                                    <p className="text-[10px] font-bold text-slate-400">Đã gửi {push.sent.toLocaleString()} thiết bị</p>
                                                </div>
                                            )}
                                            {push.status === 'scheduled' && (
                                                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full">Chưa gửi</span>
                                            )}
                                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreVertical size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="w-full p-4 text-center font-black text-xs text-indigo-600 hover:bg-indigo-50 transition-colors uppercase tracking-widest border-t border-slate-100"
                            onClick={() => alert("Đang tải dữ liệu lưu trữ cũ hơn...")}
                        >
                            Xem lịch sử thông báo lưu trữ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
