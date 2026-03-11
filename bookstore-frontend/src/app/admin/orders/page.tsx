"use client";

import React, { useState } from 'react';
import {
    Package,
    Truck,
    CheckCircle2,
    Clock,
    Search,
    Filter,
    MapPin,
    Printer,
    ArrowRight,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_ADMIN_ORDERS = [
    { id: "BS888201", user: "Nguyễn Văn A", date: "12/03/2024 14:30", total: 580000, status: 'processing', address: "Quận 1, TP. HCM", items: 3 },
    { id: "BS772390", user: "Trần Thị B", date: "12/03/2024 10:15", total: 245000, status: 'shipping', address: "Bình Thạnh, TP. HCM", items: 1 },
    { id: "BS110293", user: "Lê Văn C", date: "11/03/2024 09:00", total: 1200000, status: 'completed', address: "Cầu Giấy, Hà Nội", items: 5 },
    { id: "BS992123", user: "Phạm D", date: "10/03/2024 16:45", total: 150000, status: 'processing', address: "Hải Châu, Đà Nẵng", items: 2 },
];

const COLUMNS = [
    { id: 'processing', title: 'Chờ xác nhận', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    { id: 'shipping', title: 'Đang giao hàng', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { id: 'completed', title: 'Đã hoàn thành', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
];

export default function AdminOrdersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState(MOCK_ADMIN_ORDERS);

    const handleMoveStatus = (id: string, currentStatus: string) => {
        const nextStatus = currentStatus === 'processing' ? 'shipping' : 'completed';
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: nextStatus } : o));
    };

    return (
        <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Quản lý Đơn hàng (Fulfillment)</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Kéo thả thẻ đơn hàng hoặc nhấn nút chuyển trạng thái</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Tìm ID đơn, tên khách..."
                            className="w-full pl-10 pr-4 h-10 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="font-bold border-slate-200 gap-2 h-10">
                        <Filter size={16} /> Lọc
                    </Button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
                <div className="flex gap-6 h-full min-w-[900px]">
                    {COLUMNS.map(col => {
                        const colOrders = orders.filter(o => o.status === col.id && (o.user.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.toLowerCase().includes(searchQuery.toLowerCase())));

                        return (
                            <div key={col.id} className="flex-1 flex flex-col bg-slate-100/50 rounded-2xl border border-slate-200 overflow-hidden">
                                <div className={cn("p-4 border-b border-dashed flex items-center justify-between", col.bg, col.border)}>
                                    <div className="flex items-center gap-2">
                                        <col.icon size={18} className={col.color} />
                                        <h3 className="font-bold text-slate-900">{col.title}</h3>
                                    </div>
                                    <span className="w-6 h-6 rounded-full bg-white text-xs font-black flex items-center justify-center shadow-sm">
                                        {colOrders.length}
                                    </span>
                                </div>

                                {/* Scrollable Column Content */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                                    {colOrders.map(order => (
                                        <div
                                            key={order.id}
                                            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/40 cursor-grab transform transition-all hover:-translate-y-1 group"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <p className="text-[11px] font-black tracking-widest uppercase text-slate-400 mb-1">ID: #{order.id}</p>
                                                    <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{order.user}</p>
                                                </div>
                                                <p className="font-black text-primary">{order.total.toLocaleString('vi-VN')} đ</p>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                    <Clock size={12} className="text-slate-400" /> {order.date}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                    <Package size={12} className="text-slate-400" /> {order.items} sản phẩm
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                    <MapPin size={12} className="text-slate-400" /> {order.address}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-bold text-slate-500 hover:text-primary gap-1">
                                                    <Printer size={14} /> In phiếu
                                                </Button>
                                                {order.status !== 'completed' && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 px-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 gap-1 border border-transparent hover:border-emerald-100"
                                                        onClick={() => handleMoveStatus(order.id, order.status)}
                                                    >
                                                        Tiếp tục <ArrowRight size={14} />
                                                    </Button>
                                                )}
                                                {order.status === 'completed' && (
                                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-bold text-slate-500 hover:text-primary gap-1">
                                                        Chi tiết <ChevronRight size={14} />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {colOrders.length === 0 && (
                                        <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                                            <p className="text-sm font-medium">Trống</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
