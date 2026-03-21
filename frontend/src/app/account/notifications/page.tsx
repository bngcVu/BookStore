"use client";

import React, { useState } from 'react';
import {
    Bell,
    BadgePercent,
    Package,
    Info,
    CheckCircle2,
    Search,
    Filter,
    MoreVertical,
    Trash2,
    Calendar,
    ChevronDown,
    Zap,
    Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// Mock Notifications for the dedicated page
const ALL_NOTIFICATIONS = [
    {
        id: 1,
        title: "Sách yêu thích giảm giá!",
        message: "Cuốn 'Dune: Hành Tinh Cát' mà bạn đang quan tâm đã giảm sâu 20%. Mua ngay để không bỏ lỡ đợt cuối năm này!",
        time: "10 phút trước",
        isRead: false,
        type: "discount",
        icon: BadgePercent,
        color: "text-red-500",
        bg: "bg-red-50",
        link: "/product/dune-hanh-tinh-cat"
    },
    {
        id: 2,
        title: "Đơn hàng đang giao",
        message: "Kiện hàng của bạn đơn #VN123456 (3 sản phẩm) đã rời kho và đang trên đường giao đến bạn bởi shipper Nguyễn Văn B.",
        time: "2 giờ trước",
        isRead: false,
        type: "order",
        icon: Package,
        color: "text-primary",
        bg: "bg-primary/10",
        link: "/account/orders"
    },
    {
        id: 3,
        title: "Thăng hạng thành công",
        message: "Chúc mừng Nguyễn Văn A! Bạn đã chính thức đạt hạng Bạc. Bạn đã được cộng 500 điểm thưởng và hưởng ưu đãi giảm 5% cho mọi đơn hàng.",
        time: "1 ngày trước",
        isRead: true,
        type: "system",
        icon: Info,
        color: "text-accent",
        bg: "bg-accent/10"
    },
    {
        id: 4,
        title: "Mã giảm giá hết hạn",
        message: "Mã GIFT20K của bạn sẽ hết hạn sau 4 tiếng nữa. Đừng quên sử dụng khi thanh toán nhé!",
        time: "2 ngày trước",
        isRead: true,
        type: "discount",
        icon: Zap,
        color: "text-amber-500",
        bg: "bg-amber-50"
    },
    {
        id: 5,
        title: "Sách mới lên kệ",
        message: "Siêu phẩm 'Tư Duy Ngược' vừa mới có mặt tại kho. Hãy là một trong những người sở hữu sớm nhất!",
        time: "3 ngày trước",
        isRead: true,
        type: "promotion",
        icon: Bell,
        color: "text-indigo-500",
        bg: "bg-indigo-50",
        link: "/product/tu-duy-nguoc"
    },
    {
        id: 6,
        title: "Đơn hàng đã giao thành công",
        message: "Đơn hàng #VN888999 đã được giao thành công. Hãy dành ít phút để đánh giá sản phẩm nhé!",
        time: "1 tuần trước",
        isRead: true,
        type: "order",
        icon: CheckCircle2,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        link: "/product/dune-hanh-tinh-cat#review"
    }
];

const TABS = [
    { id: "all", label: "Tất cả", count: 6 },
    { id: "unread", label: "Chưa đọc", count: 2 },
    { id: "order", label: "Đơn hàng", count: 2 },
    { id: "promotion", label: "Khuyến mãi", count: 2 }
];

export default function NotificationsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredNotifications = ALL_NOTIFICATIONS.filter(n => {
        if (activeTab === "unread") return !n.isRead;
        if (activeTab !== "all" && n.type !== activeTab) return false;
        if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const handleNotifClick = (notif: any) => {
        if (notif.link) {
            router.push(notif.link);
        }
    };

    return (
        <div className="space-y-6">
            {/* 1. Header & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Thông báo của tôi</h1>
                    <p className="text-sm text-slate-500 mt-1">Quản lý và cập nhật những thông tin mới nhất từ BookStore</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-xs font-semibold rounded-xl border-slate-200">
                        <CheckCircle2 size={14} className="mr-2" /> Đánh dấu đã đọc tất cả
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs font-semibold rounded-xl border-slate-200 text-red-500 hover:text-red-600">
                        <Trash2 size={14} className="mr-2" /> Xóa toàn bộ
                    </Button>
                </div>
            </div>

            {/* 2. Filter & Search Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 sm:p-3">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 shrink-0",
                                    activeTab === tab.id
                                        ? "bg-white text-primary shadow-sm ring-1 ring-slate-200/50"
                                        : "hover:text-primary/70 text-slate-400"
                                )}
                            >
                                {tab.label}
                                {tab.count > 0 && (
                                    <span className={cn(
                                        "text-[10px] w-5 h-5 flex items-center justify-center rounded-full leading-none",
                                        activeTab === tab.id ? "bg-primary text-white" : "bg-slate-200 text-slate-500"
                                    )}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-[280px]">
                        <input
                            type="text"
                            placeholder="Tìm kiếm thông báo..."
                            className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>
            </div>

            {/* 3. Notifications List */}
            <div className="space-y-3">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notif) => {
                        const Icon = notif.icon;
                        return (
                            <div
                                key={notif.id}
                                onClick={() => handleNotifClick(notif)}
                                className={cn(
                                    "group relative bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 flex gap-4 sm:gap-6 transition-all hover:bg-slate-50 cursor-pointer overflow-hidden",
                                    !notif.isRead && "ring-1 ring-primary/20 shadow-sm"
                                )}
                            >
                                {/* Unread Indicator */}
                                {!notif.isRead && (
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                )}

                                {/* Icon wrapper */}
                                <div className={cn(
                                    "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                                    notif.bg,
                                    notif.color
                                )}>
                                    <Icon size={24} />
                                </div>

                                {/* Content wrapper */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h4 className={cn(
                                            "text-base sm:text-lg font-bold text-slate-900 leading-tight transition-colors group-hover:text-primary pr-8 sm:pr-0",
                                            !notif.isRead && "font-black"
                                        )}>
                                            {notif.title}
                                        </h4>
                                        <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-400 whitespace-nowrap bg-slate-100/50 px-2 py-1 rounded-lg">
                                            <Calendar size={12} /> {notif.time}
                                        </span>
                                    </div>
                                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-3">
                                        {notif.message}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {notif.link && (
                                                <Button size="sm" className="h-8 px-4 text-xs font-bold rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                                                    {notif.link.includes('#review') ? "Đánh giá ngay" : "Xem chi tiết"}
                                                </Button>
                                            )}
                                            {!notif.isRead && !notif.link && (
                                                <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg border border-primary/10">
                                                    Đánh giá đã đọc
                                                </Button>
                                            )}
                                            <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-slate-500 hover:text-red-500 rounded-lg">
                                                Xóa
                                            </Button>
                                        </div>
                                        <div className="sm:hidden text-[10px] font-bold text-slate-400">
                                            {notif.time}
                                        </div>
                                    </div>
                                </div>

                                {/* Menu action */}
                                <button className="absolute top-4 right-2 sm:right-4 w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-200 transition-all opacity-0 group-hover:opacity-100">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        );
                    })
                ) : (
                    /* 4. Empty State */
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Bell size={40} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Không tìm thấy thông báo</h3>
                        <p className="text-slate-500 mt-2">Hiện tại danh sách lọc của bạn không có thông báo nào phù hợp.</p>
                        <Button
                            className="mt-8 rounded-xl font-bold px-8 h-12 shadow-md shadow-primary/20"
                            onClick={() => { setActiveTab("all"); setSearchQuery(""); }}
                        >
                            Quay lại tất cả
                        </Button>
                    </div>
                )}
            </div>

            {/* 5. Suggestions / Recommendations Section (Phase X Style) */}
            <div className="pt-8">
                <div className="flex items-center gap-3 mb-6">
                    <Heart className="text-red-500 animate-pulse fill-red-500" size={24} />
                    <h2 className="text-xl font-bold text-slate-900">Khám phá sách bạn yêu thích</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-2xl border border-primary/10 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="font-bold text-slate-900 mb-2">Deal dành riêng cho bạn!</h3>
                            <p className="text-sm text-slate-600 mb-4">Chúng tôi vừa cập nhật danh sách giảm giá 30% cho tủ sách Kinh tế.</p>
                            <Button size="sm" onClick={() => router.push('/')} className="bg-primary hover:bg-primary-hover shadow-lg shadow-primary/25 rounded-xl font-bold">Xem ngay</Button>
                        </div>
                        <BadgePercent size={80} className="absolute -bottom-4 -right-4 text-primary opacity-5 rotate-12 transition-transform group-hover:scale-110" />
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-transparent p-6 rounded-2xl border border-accent/10 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="font-bold text-slate-900 mb-2">Thông tin thăng hạng?</h3>
                            <p className="text-sm text-slate-600 mb-4">Bạn chỉ còn cách hạng Vàng 120 điểm nữa thôi. Mua sắm tiếp nào!</p>
                            <Button size="sm" onClick={() => router.push('/account')} variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white rounded-xl font-bold">Xem tiêu chí</Button>
                        </div>
                        <Zap size={80} className="absolute -bottom-4 -right-4 text-accent opacity-5 -rotate-12 transition-transform group-hover:scale-110" />
                    </div>
                </div>
            </div>
        </div>
    );
}
