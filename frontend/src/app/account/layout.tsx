"use client";

import Link from "next/link";
import { User, ShoppingBag, Heart, MapPin, Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const NAV_ITEMS = [
        { href: "/account", label: "Thông tin tài khoản", icon: User },
        { href: "/account/orders", label: "Quản lý đơn hàng", icon: ShoppingBag },
        { href: "/account/wishlist", label: "Sách yêu thích", icon: Heart },
        { href: "/account/addresses", label: "Sổ địa chỉ", icon: MapPin },
        { href: "/account/notifications", label: "Thông báo", icon: Bell, hasBadge: true },
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Account Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                                    NA
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-900">Nguyễn Văn A</h2>
                                    <p className="text-sm text-slate-500">Thành viên Bạc</p>
                                </div>
                            </div>

                            <nav className="space-y-1">
                                {NAV_ITEMS.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                                                isActive
                                                    ? "bg-primary/5 text-primary border border-primary/10 font-bold"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                                            )}
                                        >
                                            <div className="relative">
                                                <Icon size={20} className={cn(isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} />
                                                {item.hasBadge && (
                                                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                                    </span>
                                                )}
                                            </div>
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
