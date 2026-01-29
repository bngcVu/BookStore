"use client";

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
    Bell, Package, Tag, Award, Info,
    CheckCircle2, Clock, Trash2, Filter,
    ChevronRight, ArrowLeft
} from "lucide-react";
import { Notification } from "@/types";
import { notificationAPI } from "@/lib/api-mock";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<'all' | 'order' | 'promotion' | 'reward' | 'system'>('all');

    useEffect(() => {
        const loadNotifications = async () => {
            setLoading(true);
            try {
                const data = await notificationAPI.getNotifications();
                setNotifications(data);
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            } finally {
                setLoading(false);
            }
        };
        loadNotifications();
    }, []);

    const markAsRead = async (id: number) => {
        await notificationAPI.markAsRead(id);
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    };

    const markAllRead = async () => {
        await notificationAPI.markAllAsRead();
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    };

    const handleDelete = (id: number) => {
        // In a real app, call a delete API
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const filteredNotifications = useMemo(() => {
        if (activeFilter === 'all') return notifications;
        return notifications.filter(n => n.type === activeFilter);
    }, [notifications, activeFilter]);

    const getIcon = (type: string) => {
        switch (type) {
            case 'order': return <Package className="w-5 h-5" />;
            case 'promotion': return <Tag className="w-5 h-5" />;
            case 'reward': return <Award className="w-5 h-5" />;
            default: return <Info className="w-5 h-5" />;
        }
    };

    const getColorClass = (type: string) => {
        switch (type) {
            case 'order': return "bg-blue-50 text-blue-500 border-blue-100";
            case 'promotion': return "bg-orange-50 text-orange-500 border-orange-100";
            case 'reward': return "bg-amber-50 text-amber-500 border-amber-100";
            default: return "bg-slate-50 text-slate-500 border-slate-100";
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const filters = [
        { id: 'all', label: 'Tất cả', count: notifications.length },
        { id: 'order', label: 'Đơn hàng', count: notifications.filter(n => n.type === 'order').length },
        { id: 'promotion', label: 'Khuyến mãi', count: notifications.filter(n => n.type === 'promotion').length },
        { id: 'reward', label: 'Ưu đãi', count: notifications.filter(n => n.type === 'reward').length },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-24">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb / Back */}
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-xs uppercase tracking-widest mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Quay lại trang chủ
                    </Link>

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-primary">
                                    <Bell className="w-6 h-6" />
                                </div>
                                Trung tâm <span className="text-primary italic">Thông báo</span>
                            </h1>
                            <p className="text-slate-500 font-medium mt-2">Theo dõi ưu đãi và hành trình đơn hàng của bạn</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={markAllRead}
                                className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:border-primary hover:text-primary transition-all shadow-sm"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Đọc tất cả
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-6 scrollbar-hide mb-4">
                        <div className="flex items-center gap-2 bg-white p-1.5 rounded-[20px] border border-slate-100 shadow-sm">
                            {filters.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setActiveFilter(f.id as any)}
                                    className={cn(
                                        "px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.1em] transition-all flex items-center gap-2",
                                        activeFilter === f.id
                                            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                                            : "text-slate-500 hover:bg-slate-50"
                                    )}
                                >
                                    {f.label}
                                    <span className={cn(
                                        "px-1.5 py-0.5 rounded-md text-[9px]",
                                        activeFilter === f.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                                    )}>
                                        {f.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Section */}
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-24 bg-white rounded-3xl border border-slate-100 animate-pulse"></div>
                            ))}
                        </div>
                    ) : filteredNotifications.length > 0 ? (
                        <div className="space-y-4">
                            {filteredNotifications.map((n) => (
                                <div
                                    key={n.id}
                                    className={cn(
                                        "group relative bg-white rounded-[32px] border transition-all duration-300 flex items-start gap-6 p-6 md:p-8",
                                        n.is_read ? "border-slate-100 opacity-70" : "border-primary/20 shadow-xl shadow-primary/5 ring-1 ring-primary/5"
                                    )}
                                >
                                    {/* Unread indicator */}
                                    {!n.is_read && (
                                        <div className="absolute top-8 left-0 w-1.5 h-8 bg-primary rounded-r-full shadow-[2px_0_8px_rgba(var(--primary-rgb),0.3)]"></div>
                                    )}

                                    {/* Icon Container */}
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 md:w-16 md:h-16",
                                        getColorClass(n.type)
                                    )}>
                                        {getIcon(n.type)}
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 space-y-2">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <h3 className={cn(
                                                "text-lg transition-colors group-hover:text-primary",
                                                n.is_read ? "font-bold text-slate-700" : "font-black text-slate-900"
                                            )}>
                                                {n.title}
                                            </h3>
                                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                <Clock className="w-3.5 h-3.5" />
                                                {formatTime(n.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 leading-relaxed font-medium">
                                            {n.content}
                                        </p>

                                        {/* Action Links based on reference */}
                                        <div className="pt-4 flex items-center gap-3">
                                            {!n.is_read && (
                                                <button
                                                    onClick={() => markAsRead(n.id)}
                                                    className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5 hover:underline"
                                                >
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Đánh dấu đã đọc
                                                </button>
                                            )}
                                            {n.reference_type === 'book' && (
                                                <Link
                                                    href={`/product/${n.reference_id}`}
                                                    className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5 hover:text-primary group/link"
                                                >
                                                    Xem chi tiết sách
                                                    <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                                                </Link>
                                            )}
                                            {n.reference_type === 'order' && (
                                                <Link
                                                    href={`/account/orders/${n.reference_id}`}
                                                    className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5 hover:text-primary group/link"
                                                >
                                                    Kiểm tra đơn hàng
                                                    <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    {/* Item Options */}
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleDelete(n.id)}
                                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                            title="Xóa thông báo"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[40px] border border-slate-100 p-24 flex flex-col items-center justify-center text-center shadow-sm">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8">
                                <Bell className="w-12 h-12 text-slate-200" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Hộp thư trống</h2>
                            <p className="text-slate-500 max-w-sm font-medium mb-10">Bạn chưa có bất kỳ thông báo nào. Hãy tiếp tục mua sắm và theo dõi thêm các tác phẩm tuyệt vời!</p>
                            <Link
                                href="/products"
                                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-lg shadow-slate-900/10 active:scale-95"
                            >
                                Khám phá ngay
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
