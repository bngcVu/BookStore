"use client";

import { useState, useEffect } from "react";
import { Bell, Package, Tag, Award, Info, CheckCircle2, Clock } from "lucide-react";
import { Notification } from "@/types";
import { notificationAPI } from "@/lib/api-mock";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NotificationDropdown() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const unreadCount = notifications.filter(n => !n.is_read).length;

    useEffect(() => {
        const loadNotifications = async () => {
            const data = await notificationAPI.getNotifications();
            setNotifications(data);
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

    const getIcon = (type: string) => {
        switch (type) {
            case 'order': return <Package className="w-4 h-4" />;
            case 'promotion': return <Tag className="w-4 h-4" />;
            case 'reward': return <Award className="w-4 h-4" />;
            default: return <Info className="w-4 h-4" />;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'order': return "bg-blue-50 text-blue-500 border-blue-100";
            case 'promotion': return "bg-cta/5 text-cta border-cta/10";
            case 'reward': return "bg-amber-50 text-amber-500 border-amber-100";
            default: return "bg-slate-50 text-slate-500 border-slate-100";
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHrs = Math.floor((now.getTime() - date.getTime()) / 3600000);

        if (diffInHrs < 1) return "Vừa xong";
        if (diffInHrs < 24) return `${diffInHrs} giờ trước`;
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2.5 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all group"
            >
                <Bell className="w-5 h-5 group-hover:animate-ring" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-cta text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white ring-2 ring-cta/10">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute top-full right-0 mt-4 w-96 bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                        {/* Header */}
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                            <h3 className="font-heading font-black text-slate-900 uppercase tracking-tighter text-lg">Thông báo</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllRead}
                                    className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1.5"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Đọc tất cả
                                </button>
                            )}
                        </div>

                        {/* List */}
                        <div className="max-h-[400px] overflow-y-auto scrollbar-hide py-2">
                            {notifications.length > 0 ? (
                                notifications.map((n) => (
                                    <div
                                        key={n.id}
                                        onClick={() => markAsRead(n.id)}
                                        className={cn(
                                            "p-4 mx-2 rounded-2xl transition-all cursor-pointer flex gap-4 group relative mb-1",
                                            n.is_read ? "opacity-60 hover:opacity-100 hover:bg-slate-50/50" : "bg-primary/[0.03] hover:bg-primary/[0.06]"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                                            getColor(n.type)
                                        )}>
                                            {getIcon(n.type)}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <h4 className={cn(
                                                    "text-[13px] leading-tight group-hover:text-primary transition-colors",
                                                    n.is_read ? "font-medium text-slate-600" : "font-black text-slate-900"
                                                )}>
                                                    {n.title}
                                                </h4>
                                                {!n.is_read && <span className="w-2 h-2 rounded-full bg-primary mt-1 shrink-0 shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"></span>}
                                            </div>
                                            <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                                                {n.content}
                                            </p>
                                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-300 uppercase tracking-widest pt-1">
                                                <Clock className="w-3 h-3" />
                                                {formatTime(n.created_at)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-12 flex flex-col items-center justify-center text-center px-8">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                        <Bell className="w-8 h-8 text-slate-200" />
                                    </div>
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Bạn không có thông báo nào</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-slate-50/50 border-t border-slate-50">
                            <Link
                                href="/notifications"
                                onClick={() => setIsOpen(false)}
                                className="w-full py-3 bg-white border border-slate-200 rounded-xl text-center text-xs font-black text-slate-900 uppercase tracking-widest hover:border-primary hover:text-primary transition-all block shadow-sm"
                            >
                                Xem tất cả thông báo
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
