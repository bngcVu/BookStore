"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Bell, ShoppingBag, Tag, Star, Clock, CheckCircle2, ChevronRight, Package } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Notification Data
const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        title: "Đơn hàng #ORD-8829 đang được giao",
        message: "Đơn hàng của bạn đã được bàn giao cho đơn vị vận chuyển Viettel Post. Dự kiến giao hàng vào ngày mai.",
        type: "order",
        is_read: false,
        created_at: "2024-02-03T08:30:00Z",
        link: "/profile?tab=orders"
    },
    {
        id: 2,
        title: "Săn sale giờ vàng - Giảm 50%",
        message: "Duy nhất khung giờ 12h-14h hôm nay. Nhập mã FLASH50 để được giảm 50% tối đa 100k.",
        type: "promotion",
        is_read: false,
        created_at: "2024-02-03T07:00:00Z",
        link: "/flash-sale"
    },
    {
        id: 3,
        title: "Bạn nhận được 500 điểm thưởng",
        message: "Chúc mừng bạn đã hoàn thành thử thách 'Đọc sách mỗi ngày'. Điểm đã được cộng vào ví.",
        type: "reward",
        is_read: true,
        created_at: "2024-02-02T20:15:00Z",
        link: "/profile?tab=membership"
    },
    {
        id: 4,
        title: "Sách 'Nhà Giả Kim' đang giảm giá sâu",
        message: "Sản phẩm trong Wishlist của bạn đang có giá tốt nhất lịch sử. Mua ngay kẻo lỡ!",
        type: "price_drop",
        is_read: true,
        created_at: "2024-02-01T10:00:00Z",
        link: "/product/nha-gia-kim"
    },
    {
        id: 5,
        title: "Tài khoản của bạn đã được nâng hạng Vàng",
        message: "Cảm ơn bạn đã gắn bó. Tận hưởng ưu đãi freeship và giảm 10% trọn đời.",
        type: "system",
        is_read: true,
        created_at: "2024-01-30T09:00:00Z",
        link: "/profile?tab=membership"
    }
];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const [filter, setFilter] = useState("all");

    const getIcon = (type: string) => {
        switch (type) {
            case "order": return <Package className="w-5 h-5 text-blue-500" />;
            case "promotion": return <Tag className="w-5 h-5 text-rose-500" />;
            case "reward": return <Star className="w-5 h-5 text-amber-500" />;
            case "price_drop": return <ShoppingBag className="w-5 h-5 text-emerald-500" />;
            default: return <Bell className="w-5 h-5 text-slate-500" />;
        }
    };

    const getColors = (type: string) => {
        switch (type) {
            case "order": return "bg-blue-50 border-blue-100";
            case "promotion": return "bg-rose-50 border-rose-100";
            case "reward": return "bg-amber-50 border-amber-100";
            case "price_drop": return "bg-emerald-50 border-emerald-100";
            default: return "bg-slate-50 border-slate-100";
        }
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    };

    const handleRead = (id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    };

    const filtered = filter === "all" ? notifications : notifications.filter(n => n.type === filter);
    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-24">
                <div className="max-w-4xl mx-auto">

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Link href="/" className="text-slate-500 hover:text-primary transition-colors text-sm font-bold">Trang chủ</Link>
                                <ChevronRight className="w-4 h-4 text-slate-300" />
                                <span className="text-slate-900 text-sm font-bold">Thông báo</span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                                <Bell className="w-8 h-8 text-slate-900" />
                                Thông báo của tôi
                                {unreadCount > 0 && (
                                    <span className="inline-flex items-center justify-center px-2.5 py-1 text-sm font-bold text-white bg-red-500 rounded-full align-middle transform translate-y-[-2px]">
                                        {unreadCount}
                                    </span>
                                )}
                            </h1>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleMarkAllRead}
                                className="px-5 py-2.5 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-50 hover:text-primary transition-all shadow-sm"
                            >
                                Đánh dấu đã xem
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 items-start">

                        {/* Filter Sidebar */}
                        <div className="w-full lg:w-64 shrink-0 space-y-2 sticky top-28">
                            {[
                                { id: "all", label: "Tất cả", icon: Bell },
                                { id: "order", label: "Đơn hàng", icon: Package },
                                { id: "promotion", label: "Khuyến mãi", icon: Tag },
                                { id: "reward", label: "Điểm thưởng", icon: Star },
                                { id: "system", label: "Hệ thống", icon: CheckCircle2 },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setFilter(item.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                        filter === item.id
                                            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                                            : "bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-100"
                                    )}
                                >
                                    <item.icon className={cn("w-4 h-4", filter === item.id ? "text-white" : "text-slate-400")} />
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Notification List */}
                        <div className="flex-1 space-y-4 w-full">
                            {filtered.length > 0 ? (
                                filtered.map((notification) => (
                                    <Link
                                        href={notification.link}
                                        key={notification.id}
                                        onClick={() => handleRead(notification.id)}
                                        className={cn(
                                            "group block p-5 rounded-[24px] border transition-all duration-300 relative overflow-hidden",
                                            notification.is_read
                                                ? "bg-white border-slate-100 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                                                : "bg-white border-primary/20 shadow-md shadow-primary/5 hover:shadow-xl hover:shadow-primary/10"
                                        )}
                                    >
                                        <div className="flex gap-5">
                                            {/* Icon Box */}
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110",
                                                getColors(notification.type)
                                            )}>
                                                {getIcon(notification.type)}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0 pt-0.5">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className={cn(
                                                        "text-base leading-tight pr-4 transition-colors",
                                                        notification.is_read ? "font-bold text-slate-700 group-hover:text-primary" : "font-black text-slate-900 group-hover:text-primary"
                                                    )}>
                                                        {notification.title}
                                                    </h3>
                                                    {!notification.is_read && (
                                                        <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 animate-pulse" title="Chưa xem"></span>
                                                    )}
                                                </div>
                                                <p className={cn(
                                                    "text-sm mb-3 line-clamp-2",
                                                    notification.is_read ? "text-slate-400" : "text-slate-600 font-medium"
                                                )}>
                                                    {notification.message}
                                                </p>
                                                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(notification.created_at).toLocaleDateString("vi-VN", { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-slate-100 border-dashed">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                        <Bell className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Không có thông báo</h3>
                                    <p className="text-slate-400 text-sm">Bạn chưa có thông báo nào trong mục này.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
