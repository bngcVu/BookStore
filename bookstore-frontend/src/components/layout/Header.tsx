"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, ChevronDown, Bell, BadgePercent, Package, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock Categories
const CATEGORIES = [
    { slug: "tieu-thuyet", name: "Tiểu thuyết", icon: "📚", count: 1250 },
    { slug: "kinh-doanh", name: "Kinh tế - Kinh doanh", icon: "📈", count: 850 },
    { slug: "tam-ly-hoc", name: "Tâm lý học", icon: "🧠", count: 640 },
    { slug: "thieu-nhi", name: "Thiếu nhi", icon: "🧸", count: 2100 },
    { slug: "ngoai-ngu", name: "Ngoại ngữ", icon: "🌍", count: 520 },
    { slug: "lich-su", name: "Lịch sử", icon: "🏺", count: 480 },
];

const MOCK_NOTIFICATIONS = [
    { id: 1, title: "Sách yêu thích giảm giá!", message: "Cuốn 'Dune: Hành Tinh Cát' đã giảm 20%. Mua ngay!", time: "10 phút trước", isRead: false, type: "discount", icon: BadgePercent, color: "text-red-500", bg: "bg-red-50" },
    { id: 2, title: "Đơn hàng đang giao", message: "Đơn hàng #VN123456 đang trên đường giao đến bạn.", time: "2 giờ trước", isRead: false, type: "order", icon: Package, color: "text-primary", bg: "bg-primary/10" },
    { id: 3, title: "Thăng hạng thành công", message: "Bạn đã đạt hạng Bạc. Giảm 5% cho mọi đơn hàng.", time: "1 ngày trước", isRead: true, type: "system", icon: Info, color: "text-accent", bg: "bg-accent/10" }
];

export function Header() {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const notifTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Xử lý mở khi hover (delay nhỏ để tránh chớp nhoáng)
    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsCategoryOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsCategoryOpen(false);
        }, 150);
    };

    // Cleanup timeout when unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (notifTimeoutRef.current) clearTimeout(notifTimeoutRef.current);
        }
    }, [])

    const handleNotifEnter = () => {
        if (notifTimeoutRef.current) clearTimeout(notifTimeoutRef.current);
        setIsNotifOpen(true);
    };

    const handleNotifLeave = () => {
        notifTimeoutRef.current = setTimeout(() => {
            setIsNotifOpen(false);
        }, 150);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center gap-4 lg:gap-8">
                {/* Logo & Category Section */}
                <div className="flex items-center gap-6 shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg leading-none">B</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden sm:block text-slate-900">
                            BookStore
                        </span>
                    </Link>

                    {/* Category Dropdown Toggle */}
                    <div
                        className="hidden md:block relative group h-full flex items-center"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Button
                            variant="ghost"
                            className="h-10 flex items-center gap-2 text-slate-600 hover:text-primary hover:bg-slate-50 font-medium rounded-full px-4"
                            aria-expanded={isCategoryOpen}
                            aria-haspopup="true"
                            aria-label="Danh mục sản phẩm"
                        >
                            <Menu size={18} />
                            <span>Danh mục</span>
                            <ChevronDown size={14} className={cn("transition-transform duration-200", isCategoryOpen && "rotate-180")} />
                        </Button>

                        {/* Absolute wrapper for invisible bridge to avoid hover loss */}
                        {isCategoryOpen && <div className="absolute top-10 left-0 w-full h-6" />}

                        {/* Dropdown Menu */}
                        <div
                            className={cn(
                                "absolute top-[calc(100%+10px)] left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 transition-all duration-300 origin-top-left",
                                isCategoryOpen ? "opacity-100 scale-100 visible translate-y-0" : "opacity-0 scale-95 invisible -translate-y-2"
                            )}
                        >
                            <div className="grid grid-cols-1 gap-1">
                                {CATEGORIES.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={`/category/${cat.slug}`}
                                        className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors group/item"
                                        onClick={() => setIsCategoryOpen(false)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg opacity-80 grayscale group-hover/item:grayscale-0 transition-all">{cat.icon}</span>
                                            <span className="font-medium text-sm text-slate-700 group-hover/item:text-primary">{cat.name}</span>
                                        </div>
                                        <span className="text-xs text-slate-400 group-hover/item:text-primary/60 font-semibold">{cat.count.toLocaleString('vi-VN')}</span>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-2 pt-2 border-t border-slate-100">
                                <Link
                                    href="/category/all"
                                    className="flex items-center justify-center gap-2 p-3 text-sm font-semibold text-primary hover:bg-primary/5 rounded-xl transition-colors"
                                >
                                    Xem tất cả danh mục <ChevronDown size={14} className="-rotate-90" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl hidden md:flex items-center relative group">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sách, tác giả, nhà xuất bản..."
                        className="w-full h-11 pl-5 pr-12 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-sm shadow-sm"
                    />
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-primary transition-all"
                        aria-label="Thực hiện tìm kiếm"
                    >
                        <Search size={16} />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-auto">
                    {/* Mobile Category & Search Toggles */}
                    <button
                        className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
                        aria-label="Mở menu danh mục mobile"
                    >
                        <Menu size={20} className="text-slate-600" />
                    </button>
                    <button
                        className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
                        aria-label="Mở thanh tìm kiếm mobile"
                    >
                        <Search size={20} className="text-slate-600" />
                    </button>

                    {/* Notification Hub */}
                    <div
                        className="relative hidden sm:block h-full flex items-center"
                        onMouseEnter={handleNotifEnter}
                        onMouseLeave={handleNotifLeave}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full relative hover:bg-slate-100 transition-colors h-10 w-10"
                            aria-label={`Thông báo (${MOCK_NOTIFICATIONS.filter(n => !n.isRead).length} tin mới)`}
                            aria-expanded={isNotifOpen}
                            aria-haspopup="true"
                        >
                            <Bell size={20} className="text-slate-600" />
                            {/* Unread dot */}
                            <span className="absolute top-1 right-2 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                            </span>
                        </Button>

                        {/* Bridge */}
                        {isNotifOpen && <div className="absolute top-10 left-0 w-full h-6" />}

                        {/* Notification Dropdown */}
                        <div
                            className={cn(
                                "absolute top-[calc(100%+10px)] right-0 w-[360px] bg-white rounded-2xl shadow-xl border border-slate-100 pt-3 pb-2 transition-all duration-300 origin-top-right",
                                isNotifOpen ? "opacity-100 scale-100 visible translate-y-0" : "opacity-0 scale-95 invisible -translate-y-2"
                            )}
                        >
                            <div className="flex items-center justify-between px-4 pb-3 border-b border-slate-100">
                                <h3 className="font-bold text-slate-900">Thông báo</h3>
                                <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                                    <CheckCircle2 size={12} /> Đánh dấu đã đọc
                                </button>
                            </div>

                            <div className="max-h-[70vh] overflow-y-auto">
                                {MOCK_NOTIFICATIONS.map((notif) => {
                                    const Icon = notif.icon;
                                    return (
                                        <div key={notif.id} className={cn("flex gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0", !notif.isRead && "bg-primary/5 hover:bg-primary/10")}>
                                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1", notif.bg, notif.color)}>
                                                <Icon size={18} />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <h4 className="text-sm font-semibold text-slate-900 leading-tight">{notif.title}</h4>
                                                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{notif.message}</p>
                                                <span className="text-[10px] font-medium text-slate-400">{notif.time}</span>
                                            </div>
                                            {!notif.isRead && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="mt-2 pt-2 border-t border-slate-100 px-2">
                                <Link
                                    href="/account/notifications"
                                    className="flex items-center justify-center gap-2 block w-full text-center p-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-xl transition-colors"
                                    onClick={() => setIsNotifOpen(false)}
                                >
                                    Xem tất cả thông báo
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* User Account */}
                    <Link href="/login">
                        <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-primary hover:bg-primary/5 font-medium rounded-full">
                            <User size={18} />
                            <span>Đăng nhập</span>
                        </Button>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full relative hover:bg-primary/5 hover:text-primary transition-colors h-10 w-10"
                            aria-label="Giỏ hàng của bạn (3 sản phẩm)"
                        >
                            <ShoppingCart size={22} className="text-slate-600" />
                            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center border-2 border-white box-content shadow-sm">
                                3
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
