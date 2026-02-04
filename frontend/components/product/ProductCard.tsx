import Link from "next/link";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Book } from "@/types";

interface ProductCardProps {
    book: Book;
}

export function ProductCard({ book }: ProductCardProps) {
    const authorName = book.authors && book.authors.length > 0 ? book.authors.join(", ") : "Tác giả ẩn danh";
    const discountPercent = book.original_price && book.base_price < book.original_price
        ? Math.round(((book.original_price - book.base_price) / book.original_price) * 100)
        : 0;

    return (
        <div className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 relative hover:-translate-y-1 h-full flex flex-col">
            {/* Discount / Status Badge */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                {discountPercent > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                        -{discountPercent}%
                    </span>
                )}
                {book.is_featured && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                        HOT
                    </span>
                )}
            </div>

            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm">
                <Heart className="w-4 h-4" />
            </button>

            {/* Image */}
            <div className="relative aspect-[2/3] w-full mb-4 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                    src={book.image_url || "/placeholder-book.jpg"}
                    alt={book.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className="space-y-2 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-1 text-slate-900 font-bold">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{book.avg_rating || 0}</span>
                    </div>
                    {book.sold_count > 0 && (
                        <span>Đã bán {book.sold_count > 1000 ? `${(book.sold_count / 1000).toFixed(1)}k` : book.sold_count}</span>
                    )}
                </div>

                <Link href={`/product/${book.slug}`} className="block grow">
                    <h3 className="font-bold text-slate-900 leading-tight line-clamp-2 hover:text-blue-600 transition-colors h-10">
                        {book.title}
                    </h3>
                </Link>

                <p className="text-sm text-slate-500 line-clamp-1">{authorName}</p>

                <div className="flex items-center justify-between pt-2 mt-auto">
                    <div className="flex flex-col">
                        <span className="text-lg font-black text-slate-900">${book.base_price}</span>
                        {book.original_price && book.original_price > book.base_price && (
                            <span className="text-xs text-slate-400 line-through">${book.original_price}</span>
                        )}
                    </div>
                    <button className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-blue-600/30">
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
