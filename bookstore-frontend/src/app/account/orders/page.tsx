"use client";

import React, { useState } from 'react';
import {
    ShoppingBag,
    Search,
    ChevronRight,
    Package,
    Truck,
    CheckCircle2,
    XCircle,
    Clock,
    Filter,
    Calendar,
    ExternalLink,
    MapPin,
    ArrowRight,
    Loader2,
    Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const ORDER_STATUSES = [
    { id: "all", label: "Tất cả", icon: ShoppingBag },
    { id: "processing", label: "Chờ xác nhận", icon: Clock },
    { id: "shipping", label: "Đang giao", icon: Truck },
    { id: "completed", label: "Đã giao", icon: CheckCircle2 },
    { id: "cancelled", label: "Đã hủy", icon: XCircle },
];

const MOCK_ORDERS = [
    {
        id: "BS888201",
        date: "12/03/2024",
        status: "shipping",
        total: 580000,
        itemsCount: 3,
        items: [
            { name: "Dune: Hành Tinh Cát", qty: 1, price: 180000, image: "📚", slug: "dune-hanh-tinh-cat" },
            { name: "Tư Duy Ngược", qty: 1, price: 120000, image: "📓", slug: "tu-duy-nguoc" }
        ],
        statusLabel: "Đang giao hàng",
        color: "text-amber-500",
        bg: "bg-amber-50",
        address: "123 Lê Lợi, P. Bến Thành, Quận 1, TP. HCM",
        tracking: [
            { time: "14:30 - 12/03", status: "Đang giao hàng", detail: "Shipper Nguyễn Văn B đang giao gói hàng đến bạn.", active: true },
            { time: "09:15 - 12/03", status: "Đến kho trung chuyển", detail: "Đơn hàng đã đến kho Quận 1.", active: false },
            { time: "20:00 - 11/03", status: "Đã rời kho", detail: "Đơn hàng đã rời kho tổng BookStore.", active: false },
            { time: "10:00 - 11/03", status: "Đã xác nhận", detail: "Gói hàng đang được chuẩn bị.", active: false },
        ]
    },
    {
        id: "BS772390",
        date: "01/03/2024",
        status: "completed",
        total: 245000,
        itemsCount: 1,
        items: [
            { name: "Nhà Giả Kim", qty: 1, price: 245000, image: "🧪", slug: "nha-gia-kim" }
        ],
        statusLabel: "Hoàn thành",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        address: "720A Điện Biên Phủ, P. 22, Q. Bình Thạnh, TP. HCM"
    },
    {
        id: "BS110293",
        date: "15/02/2024",
        status: "cancelled",
        total: 1200000,
        itemsCount: 5,
        items: [
            { name: "Combo Harry Potter (Trọn bộ)", qty: 1, price: 1200000, image: "⚡", slug: "combo-harry-potter" }
        ],
        statusLabel: "Đã hủy",
        color: "text-red-500",
        bg: "bg-red-50",
        address: "123 Lê Lợi, P. Bến Thành, Quận 1, TP. HCM"
    }
];

export default function OrderManagementPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'list' | 'detail' | 'tracking'>('list');
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const filteredOrders = MOCK_ORDERS.filter(order => {
        const matchesTab = activeTab === "all" || order.status === activeTab;
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesTab && matchesSearch;
    });

    const handleAction = (orderId: string, type: 'detail' | 'tracking' | 'review') => {
        const order = MOCK_ORDERS.find(o => o.id === orderId);
        if (!order) return;

        setActionLoading(`${orderId}-${type}`);

        // Simulate loading feedback
        setTimeout(() => {
            if (type === 'review') {
                // Navigate to the first product of the order for review
                router.push(`/product/${order.items[0].slug}#review`);
                setActionLoading(null);
                return;
            }

            setSelectedOrder(order);
            if (type === 'detail') setViewMode('detail');
            if (type === 'tracking') setViewMode('tracking');

            setActionLoading(null);
        }, 600);
    };

    return (
        <div className="space-y-6">
            {viewMode === 'list' ? (
                <>
                    {/* 1. Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Đơn hàng của tôi</h1>
                            <p className="text-sm text-slate-500 mt-1">Theo dõi quá trình vận chuyển và lịch sử đơn hàng</p>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                            <Button variant="ghost" size="sm" className="rounded-lg text-xs font-bold bg-white shadow-sm">Tất cả đơn</Button>
                            <Button variant="ghost" size="sm" className="rounded-lg text-xs font-bold text-slate-500">Mua lại nhiều nhất</Button>
                        </div>
                    </div>

                    {/* 2. Status Navigation Tabs */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-1 overflow-x-auto no-scrollbar">
                        <div className="flex items-center min-w-max">
                            {ORDER_STATUSES.map((status) => {
                                const Icon = status.icon;
                                const isActive = activeTab === status.id;
                                return (
                                    <button
                                        key={status.id}
                                        onClick={() => setActiveTab(status.id)}
                                        className={cn(
                                            "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                                            isActive
                                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                : "text-slate-500 hover:text-primary hover:bg-primary/5"
                                        )}
                                    >
                                        <Icon size={16} />
                                        {status.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. Search Bar for Orders */}
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Tìm theo mã đơn hàng hoặc tên sách..."
                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-100 bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm shadow-sm group-hover:border-slate-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>

                    {/* 4. Orders List */}
                    <div className="space-y-4">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:border-primary/30 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                                >
                                    {/* Order Header */}
                                    <div className="px-6 py-4 border-b border-slate-50 flex flex-wrap items-center justify-between gap-4 bg-slate-50/30">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 bg-white shadow-sm rounded-xl text-primary font-black text-xs ring-1 ring-slate-100">
                                                ID
                                            </div>
                                            <div>
                                                <h3 className="font-black text-slate-900 leading-none">#{order.id}</h3>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1">
                                                    <Calendar size={10} /> Đặt ngày {order.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest", order.bg, order.color)}>
                                            {order.statusLabel}
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-6">
                                        <div className="flex flex-col gap-4">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4 group/item">
                                                    <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-3xl shrink-0 group-hover/item:scale-105 transition-transform duration-300">
                                                        {item.image}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-slate-800 text-sm truncate group-hover/item:text-primary transition-colors">{item.name}</h4>
                                                        <p className="text-xs text-slate-500 mt-1 font-medium">Số lượng: x{item.qty}</p>
                                                        <p className="text-sm font-black text-slate-900 mt-1">{item.price.toLocaleString('vi-VN')} đ</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {order.itemsCount > order.items.length && (
                                            <p className="mt-4 text-[11px] font-bold text-slate-400 bg-slate-50 inline-block px-3 py-1 rounded-full italic">
                                                + {order.itemsCount - order.items.length} sản phẩm khác trong kiện hàng này
                                            </p>
                                        )}
                                    </div>

                                    {/* Order Footer */}
                                    <div className="px-6 py-4 bg-white border-t border-slate-50 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex flex-col">
                                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Tổng thanh toán</p>
                                            <p className="text-xl font-black text-primary">{order.total.toLocaleString('vi-VN')} đ</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                className="rounded-xl border-slate-200 text-xs font-bold gap-2 h-10 px-4 hover:border-primary/30 hover:text-primary transition-all"
                                                onClick={() => handleAction(order.id, 'detail')}
                                                disabled={!!actionLoading}
                                            >
                                                {actionLoading === `${order.id}-detail` ? <Loader2 className="animate-spin" size={14} /> : <ExternalLink size={14} />}
                                                Chi tiết
                                            </Button>
                                            {order.status === "shipping" && (
                                                <Button
                                                    className="rounded-xl font-bold text-xs ring-4 ring-primary/5 shadow-lg shadow-primary/20 h-10 px-5 gap-2"
                                                    onClick={() => handleAction(order.id, 'tracking')}
                                                    disabled={!!actionLoading}
                                                >
                                                    {actionLoading === `${order.id}-tracking` ? <Loader2 className="animate-spin" size={14} /> : <Truck size={14} />}
                                                    Theo dõi
                                                </Button>
                                            )}
                                            {order.status === "completed" && (
                                                <Button
                                                    className="rounded-xl font-bold text-xs ring-4 ring-primary/5 shadow-lg shadow-primary/20 h-10 px-5 gap-2"
                                                    onClick={() => handleAction(order.id, 'review')}
                                                    disabled={!!actionLoading}
                                                >
                                                    {actionLoading === `${order.id}-review` ? <Loader2 className="animate-spin" size={14} /> : <Star size={14} />}
                                                    Đánh giá
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <ShoppingBag size={40} className="text-slate-200" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">Không tìm thấy đơn hàng</h3>
                                <p className="text-slate-400 mt-2 text-sm max-w-[280px] mx-auto italic">Bạn chưa có đơn hàng nào hoặc tiêu chí tìm kiếm không khớp.</p>
                                <Button className="mt-8 rounded-xl font-bold px-8 h-12 shadow-md shadow-primary/20" onClick={() => { setActiveTab("all"); setSearchQuery(""); }}>
                                    Quay lại tất cả
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            ) : viewMode === 'detail' && selectedOrder ? (
                /* DETAIL VIEW */
                <div className="animate-in slide-in-from-right duration-300">
                    <Button
                        variant="ghost"
                        onClick={() => setViewMode('list')}
                        className="mb-6 hover:bg-slate-100 rounded-xl font-bold text-slate-600 gap-2"
                    >
                        <ArrowRight className="rotate-180" size={16} /> Quay lại danh sách
                    </Button>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                        <div className="p-8 bg-slate-900 text-white">
                            <div className="flex flex-col sm:flex-row justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-3xl font-black tracking-tighter">Đơn hàng #{selectedOrder.id}</h2>
                                        <span className={cn("px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/20 text-white border border-white/10")}>
                                            {selectedOrder.statusLabel}
                                        </span>
                                    </div>
                                    <p className="text-white/60 font-medium">Ngày đặt hàng: {selectedOrder.date} | 15:45</p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Tổng cộng dự kiến</p>
                                    <p className="text-4xl font-black text-accent">{selectedOrder.total.toLocaleString('vi-VN')} đ</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100">
                            <div className="bg-white p-8 space-y-6">
                                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                    <MapPin size={16} className="text-primary" /> Thông tin nhận hàng
                                </h3>
                                <div>
                                    <p className="font-bold text-slate-900 text-lg">Nguyễn Văn A</p>
                                    <p className="text-slate-500 mt-2 font-medium leading-relaxed">{selectedOrder.address}</p>
                                    <p className="text-slate-900 font-bold mt-2">SĐT: 0345 678 901</p>
                                </div>
                            </div>
                            <div className="bg-white p-8 space-y-6">
                                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-primary" /> Phương thức thanh toán
                                </h3>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                    <p className="font-bold text-slate-900">Thanh toán khi nhận hàng (COD)</p>
                                    <p className="text-slate-500 text-sm mt-1">Phí thu hộ: Miễn phí</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-white border-t border-slate-100">
                            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-6">Sản phẩm trong đơn</h3>
                            <div className="space-y-4">
                                {selectedOrder.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                                        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-sm border border-slate-100">
                                            {item.image}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{item.name}</h4>
                                            <p className="text-slate-500 font-bold">Số lượng: {item.qty}</p>
                                        </div>
                                        <p className="text-xl font-black text-slate-900">{item.price.toLocaleString('vi-VN')} đ</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : viewMode === 'tracking' && selectedOrder ? (
                /* TRACKING VIEW */
                <div className="animate-in slide-in-from-bottom duration-300">
                    <Button
                        variant="ghost"
                        onClick={() => setViewMode('list')}
                        className="mb-6 hover:bg-slate-100 rounded-xl font-bold text-slate-600 gap-2"
                    >
                        <ArrowRight className="rotate-180" size={16} /> Quay lại danh sách
                    </Button>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Truck size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Hành trình đơn hàng #{selectedOrder.id}</h2>
                                <p className="text-sm font-bold text-emerald-500">Dự kiến giao: 14/03/2024</p>
                            </div>
                        </div>

                        <div className="relative pl-8 space-y-12 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                            {selectedOrder.tracking?.map((step: any, idx: number) => (
                                <div key={idx} className="relative group">
                                    <div className={cn(
                                        "absolute -left-8 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm z-10 transition-colors duration-300",
                                        step.active ? "bg-primary ring-4 ring-primary/20 scale-125" : "bg-slate-300"
                                    )} />
                                    <div>
                                        <p className={cn("text-sm font-black tracking-widest uppercase mb-1", step.active ? "text-primary" : "text-slate-400")}>
                                            {step.status}
                                        </p>
                                        <p className="text-lg font-bold text-slate-900">{step.detail}</p>
                                        <p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-2">
                                            <Clock size={12} /> {step.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 bg-slate-900 rounded-2xl text-white">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <MapPin size={24} className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Điểm giao cuối</p>
                                    <p className="font-bold text-sm tracking-tight">{selectedOrder.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
