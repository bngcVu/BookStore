"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, User, BookOpen, Heart, ChevronDown, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { homeAPI } from "@/lib/api-mock";
import { Category } from "@/types";

export function Header() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    useEffect(() => {
        async function loadCategories() {
            const cats = await homeAPI.getCategories();
            setCategories(cats);
        }
        loadCategories();
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 transition-all duration-300">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
                {/* Logo & Category Button */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center text-white group-hover:bg-cta transition-all duration-300 shadow-lg shadow-primary/20 group-hover:shadow-cta/20 group-hover:rotate-6">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <span className="font-heading font-black text-2xl text-slate-900 tracking-tighter uppercase sm:block hidden">
                            Book<span className="text-primary italic">Store</span>
                        </span>
                    </Link>

                    {/* Category Dropdown Button - Mapping: categories table */}
                    <div className="hidden xl:block relative">
                        <button
                            onMouseEnter={() => setIsCategoryOpen(true)}
                            onMouseLeave={() => setIsCategoryOpen(false)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-bold text-sm uppercase tracking-widest",
                                isCategoryOpen ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            <LayoutGrid className="w-5 h-5" />
                            <span>Danh mục</span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isCategoryOpen && "rotate-180")} />
                        </button>

                        {/* Megamenu Dropdown */}
                        {isCategoryOpen && (
                            <div
                                onMouseEnter={() => setIsCategoryOpen(true)}
                                onMouseLeave={() => setIsCategoryOpen(false)}
                                className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 grid grid-cols-3 gap-8 animate-in fade-in slide-in-from-top-4 duration-300"
                            >
                                {categories.map((cat) => (
                                    <div key={cat.id} className="space-y-4">
                                        <Link href={`/category/${cat.slug}`} className="font-black text-slate-900 hover:text-primary transition-colors block border-b border-slate-50 pb-2">
                                            {cat.name}
                                        </Link>
                                        {cat.sub_categories && (
                                            <ul className="space-y-2">
                                                {cat.sub_categories.map(sub => (
                                                    <li key={sub.id}>
                                                        <Link href={`/category/${sub.slug}`} className="text-sm text-slate-500 hover:text-primary transition-colors">
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="hidden lg:flex flex-1 max-w-xl relative group px-4">
                    <div className="relative w-full">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Bạn muốn đọc gì hôm nay?..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-14 pr-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 focus:bg-white transition-all duration-300 shadow-sm font-medium"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-600 hover:text-primary lg:hidden transition-colors">
                        <Search className="w-6 h-6" />
                    </button>

                    <Link href="/wishlist" className="p-3 hover:bg-slate-50 rounded-2xl text-slate-600 hover:text-red-500 transition-all relative group">
                        <Heart className="w-6 h-6 group-hover:fill-red-500 transition-all" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full ring-4 ring-white shadow-sm transition-transform group-hover:scale-110">2</span>
                    </Link>

                    <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-600 hover:text-primary transition-all relative group">
                        <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-all" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black flex items-center justify-center rounded-full ring-4 ring-white shadow-sm transition-transform group-hover:scale-110">3</span>
                    </button>

                    <div className="w-px h-8 bg-slate-100 mx-1 hidden sm:block"></div>

                    <button className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-2xl hover:bg-primary transition-all shadow-md hover:shadow-primary/20 group">
                        <User className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                        <span className="hidden sm:block font-black text-sm uppercase tracking-widest">Login</span>
                    </button>

                    <button className="lg:hidden p-3 hover:bg-slate-50 rounded-2xl text-slate-600">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
