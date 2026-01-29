"use client";

import { Star, ShoppingCart, Eye } from "lucide-react";
import { Book } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";
import { WishlistButton } from "@/components/ui/WishlistButton";

interface ProductCardProps {
    book: Book;
    className?: string;
    onWishlistToggle?: (isWishlisted: boolean) => void;
}

export function ProductCard({ book, className, onWishlistToggle }: ProductCardProps) {
    const isDiscounted = !!book.discount_percent && book.discount_percent > 0;

    return (
        <div className={cn("group card relative p-0 overflow-hidden flex flex-col h-full bg-white border-slate-100 rounded-xl", className)}>
            {/* Badge Flash Sale / Discount - Smaller & Slimmer */}
            {(book.is_flash_sale || isDiscounted) && (
                <span className="absolute top-2 left-2 z-10 bg-cta text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm uppercase tracking-tight">
                    {book.is_flash_sale ? 'Flash' : `-${book.discount_percent}%`}
                </span>
            )}

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
                <img
                    src={book.primary_image}
                    alt={book.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay Actions - Smaller circles */}
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[1px]">
                    <button className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-all shadow-md">
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content Section - Compact Spacing */}
            <div className="p-2.5 flex flex-col flex-1 gap-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{book.authors}</p>

                <h3 className="font-heading font-bold text-[13px] text-slate-800 line-clamp-2 min-h-[32px] group-hover:text-primary transition-colors leading-tight mb-auto">
                    {book.title}
                </h3>

                {/* Rating - Tiny */}
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
                    <span className="text-[9px] text-slate-400 font-bold">({book.sold_count})</span>
                </div>

                {/* Price Section - Fahasa Style */}
                <div className="pt-1.5 border-t border-slate-50 flex flex-wrap items-end gap-x-2 gap-y-0.5">
                    <span className="text-cta font-black text-sm leading-none">
                        {formatCurrency(book.min_price)}
                    </span>
                    {isDiscounted && (
                        <span className="text-[10px] text-slate-300 line-through font-medium">
                            {formatCurrency(book.base_price)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
