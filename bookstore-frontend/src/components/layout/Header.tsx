"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, ChevronDown } from 'lucide-react';
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

export function Header() {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        }
    }, [])

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
                        <Button variant="ghost" className="h-10 flex items-center gap-2 text-slate-600 hover:text-primary hover:bg-slate-50 font-medium rounded-full px-4">
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
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-primary transition-all">
                        <Search size={16} />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-auto">
                    {/* Mobile Category & Search Toggles */}
                    <button className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <Menu size={20} className="text-slate-600" />
                    </button>
                    <button className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <Search size={20} className="text-slate-600" />
                    </button>

                    {/* User Account */}
                    <Link href="/login">
                        <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-primary hover:bg-primary/5 font-medium rounded-full">
                            <User size={18} />
                            <span>Đăng nhập</span>
                        </Button>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-primary/5 hover:text-primary transition-colors h-10 w-10">
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
