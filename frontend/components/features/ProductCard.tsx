"use client";

import { Star, ShoppingCart, Eye, Calendar, BookOpen as BookIcon, Maximize } from "lucide-react";
import { Book } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";
import { WishlistButton } from "@/components/ui/WishlistButton";
import Link from "next/link";

interface ProductCardProps {
    book: Book;
    className?: string;
    onWishlistToggle?: (isWishlisted: boolean) => void;
}

export function ProductCard({ book, className, onWishlistToggle }: ProductCardProps) {
    const isDiscounted = !!book.discount_percent && book.discount_percent > 0;
    const productLink = `/product/${book.slug || book.id}`;

    return (
        <div className={cn("group card relative p-0 overflow-hidden flex flex-col h-full bg-white border-slate-100 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/5", className)}>
            {/* BADGES & RIBBONS */}
            <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-1">
                {/* 1. Flash Sale / Discount Ribbon */}
                {(book.is_flash_sale || isDiscounted) && (
                    <span className={cn(
                        "text-[10px] font-black px-2 py-0.5 rounded-r-md shadow-sm uppercase tracking-tight relative -left-2 pl-3",
                        book.is_flash_sale ? "bg-rose-600 text-white" : "bg-cta text-white"
                    )}>
                        {book.is_flash_sale ? '⚡ Flash' : `Save ${book.discount_percent}%`}
                        <div className={cn(
                            "absolute top-full left-0 w-2 h-2",
                            book.is_flash_sale ? "bg-rose-800" : "bg-orange-600"
                        )} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
                    </span>
                )}

                {/* 2. Custom Badges (Buy 2 Get 1, etc.) */}
                {book.badges && book.badges.map((badge, idx) => (
                    <span key={idx} className="bg-slate-900/90 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/10 shadow-lg flex items-center gap-1">
                        <Star className="w-2 h-2 text-yellow-400 fill-yellow-400" />
                        {badge}
                    </span>
                ))}
            </div>

            {/* Wishlist Button - Scaled down */}
            <div className="absolute top-2 right-2 z-20 scale-90">
                <WishlistButton
                    bookId={book.id}
                    size="sm"
                    onToggle={onWishlistToggle}
                />
            </div>

            {/* Image Section - Standardized Aspect */}
            <div className="relative aspect-[1/1.3] bg-slate-50 overflow-hidden border-b border-slate-50">
                <Link href={productLink}>
                    <img
                        src={book.primary_image}
                        alt={book.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                    />
                </Link>

                {/* Metadata Overlay - Hidden by default, shown on hover */}
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-slate-900/80 to-transparent z-10 pointer-events-none">
                    <div className="flex items-center gap-3 text-[10px] text-white font-medium">
                        {book.pages && (
                            <div className="flex items-center gap-1">
                                <BookIcon className="w-3 h-3 text-primary-light" />
                                <span>{book.pages} trang</span>
                            </div>
                        )}
                        {book.publication_year && (
                            <div className="flex items-center gap-1 border-l border-white/20 pl-3">
                                <Calendar className="w-3 h-3 text-primary-light" />
                                <span>{book.publication_year}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Overlay Actions - Smaller circles */}
                <div className="absolute inset-x-0 top-0 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[1px] z-20 pointer-events-none">
                    <Link href={productLink} className="pointer-events-auto w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300">
                        <Maximize className="w-5 h-5" />
                    </Link>
                    <button className="pointer-events-auto w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-[50ms]">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content Section - Compact Spacing */}
            <div className="p-3.5 flex flex-col flex-1 gap-1.5">
                <Link
                    href={`/author/${book.authors}`}
                    className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate hover:text-primary transition-colors inline-block"
                >
                    {book.authors}
                </Link>

                <Link href={productLink} className="group-hover:text-primary transition-colors mb-auto">
                    <h3 className="font-heading font-black text-[14px] text-slate-800 line-clamp-2 min-h-[40px] leading-snug">
                        {book.title}
                    </h3>
                </Link>

                {/* Rating - Tiny */}
                <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        "w-2.5 h-2.5 fill-current",
                                        i < Math.floor(book.avg_rating) ? "text-amber-400" : "text-slate-200"
                                    )}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold">{book.avg_rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">Đã bán {book.sold_count}</span>
                </div>

                {/* Price Section - Premium Elevation */}
                <div className="pt-2 mt-1 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-cta font-black text-base leading-none">
                            {formatCurrency(book.min_price)}
                        </span>
                        {isDiscounted && (
                            <span className="text-[10px] text-slate-300 line-through font-medium mt-0.5">
                                {formatCurrency(book.base_price)}
                            </span>
                        )}
                    </div>

                    {/* Tiny stock indicator */}
                    <div className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded uppercase tracking-tighter">
                        Còn hàng
                    </div>
                </div>
            </div>
        </div>
    );
}
