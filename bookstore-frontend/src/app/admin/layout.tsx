"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    BookOpen,
    Archive,
    ShoppingCart,
    Percent,
    Users,
    Settings,
    LogOut,
    ChevronDown,
    Truck,
    CreditCard,
    RefreshCcw,
    Zap,
    Ticket,
    Bell,
    MessageSquare,
    Send,
    ShieldHalf,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const ADMIN_NAVIGATION = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Danh mục & Sản phẩm', href: '/admin/catalog', icon: BookOpen },
    { name: 'Kho hàng', href: '/admin/inventory/stock', icon: Archive },
    { name: 'Đơn hàng mới', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Hoàn tiền / Đổi trả', href: '/admin/orders/refunds', icon: RefreshCcw },
    { name: 'Nhà vận chuyển', href: '/admin/shipping', icon: Truck },
    { name: 'Đối soát VNPay', href: '/admin/finance/payments', icon: CreditCard },
    { name: 'Flash Sales', href: '/admin/marketing/flash-sales', icon: Zap },
    { name: 'Vouchers & Combo', href: '/admin/marketing/promotions', icon: Ticket },
    { name: 'Khách hàng (CRM)', href: '/admin/crm', icon: Users },
    { name: 'Đánh giá & Bình luận', href: '/admin/content/reviews', icon: MessageSquare },
    { name: 'Thông báo Push', href: '/admin/crm/notifications', icon: Send },
    { name: 'Phân quyền Admin', href: '/admin/settings/roles', icon: ShieldHalf },
    { name: 'Cài đặt hệ thống', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex bg-slate-50 min-h-screen">
            {/* Sidebar */}
            <aside className={cn(
                "fixed md:static inset-y-0 left-0 bg-white border-r border-slate-200 w-64 transition-transform duration-300 z-50",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-100">
                        <Link href="/admin/dashboard" className="flex items-center gap-2">
                            <div className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg leading-none">
                                B
                            </div>
                            <span className="font-black text-xl tracking-tight text-slate-900">BookStore<span className="text-primary">.Admin</span></span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 no-scrollbar">
                        <p className="px-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quản lý</p>
                        {ADMIN_NAVIGATION.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-colors",
                                        isActive
                                            ? "bg-primary text-white shadow-md shadow-primary/20"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    )}
                                >
                                    <Icon size={18} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* User & Logout */}
                    <div className="p-4 border-t border-slate-100">
                        <div
                            className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 cursor-pointer hover:border-slate-300 transition-colors"
                            onClick={() => alert("Chuyển hướng đến trang Profile cá nhân...")}
                        >
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                                A
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-900 truncate">Super Admin</p>
                                <p className="text-xs text-slate-500 truncate">hello@bookstore.vn</p>
                            </div>
                            <button
                                className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    confirm("Bạn có chắc chắn muốn đăng xuất?") && (window.location.href = "/");
                                }}
                            >
                                <LogOut size={16} className="text-slate-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 z-40 sticky top-0">
                    <div className="flex items-center gap-4">
                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                        >
                            <LayoutDashboard size={20} />
                        </button>
                        <div className="hidden sm:flex relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm nhanh (Ctrl+K)"
                                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all w-64"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                        </button>
                        <Link href="/" target="_blank">
                            <Button variant="outline" size="sm" className="hidden sm:flex text-xs font-bold gap-2 rounded-lg">
                                Xem Cửa hàng <ChevronDown size={14} className="rotate-[270deg]" />
                            </Button>
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 md:hidden animate-in fade-in"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
