"use client";

import Link from "next/link";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryBarProps {
    categories: Category[];
}

export function CategoryBar({ categories }: CategoryBarProps) {
    return (
        <div className="bg-white border-b border-slate-100 overflow-x-auto no-scrollbar">
            <div className="container mx-auto px-4 flex items-center justify-between py-4">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        className="flex flex-col items-center gap-2 group min-w-[90px] shrink-0"
                    >
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center p-2.5 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:-rotate-3 border border-transparent group-hover:border-primary/20">
                            {cat.image_url ? (
                                <img src={cat.image_url} alt={cat.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                            ) : (
                                <div className="w-7 h-7 bg-slate-200 rounded-lg animate-pulse"></div>
                            )}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 group-hover:text-primary uppercase tracking-widest transition-colors text-center">
                            {cat.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
