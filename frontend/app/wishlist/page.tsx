"use client";

import { useEffect, useState } from "react";
import { wishlistAPI } from "@/lib/api-mock";
import { WishlistItem } from "@/types";
import { ProductCard } from "@/components/features/ProductCard";
import { Heart, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadWishlist = async () => {
        setIsLoading(true);
        try {
            const data = await wishlistAPI.getWishlist(1); // Mock user ID 1
            setItems(data);
        } catch (error) {
            console.error("Failed to load wishlist:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadWishlist();
    }, []);

    const handleToggleWishlist = () => {
        // Refresh list when an item is removed
        loadWishlist();
    };

    return (
        <main className="min-h-screen pt-28 pb-24 bg-slate-50">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest mb-4 group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Quay lại trang chủ
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight flex items-center gap-4">
                            DANH SÁCH <span className="bg-primary/10 text-primary px-4 py-1 rounded-2xl italic">YÊU THÍCH</span>
                        </h1>
                    </div>

                    <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <Heart className="w-6 h-6 fill-current" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tổng cộng</p>
                            <p className="text-xl font-bold text-slate-900">{items.length} cuốn sách</p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Đang tải danh sách...</p>
                    </div>
                ) : items.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
                        {items.map((item) => (
                            <div key={item.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <ProductCard
                                    book={item.book}
                                    onWishlistToggle={handleToggleWishlist}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-md mx-auto text-center py-24 px-8 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center gap-6 animate-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 relative mb-4">
                            <Heart className="w-12 h-12 fill-current" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center animate-bounce">
                                ?
                            </div>
                        </div>
                        <h2 className="text-2xl font-heading font-black text-slate-900 tracking-tight">Trống trải quá!</h2>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Dường như bạn chưa "phải lòng" cuốn sách nào. <br />
                            Hãy lướt qua kho tàng tri thức của chúng tôi nhé!
                        </p>
                        <Link
                            href="/"
                            className="btn-primary flex items-center gap-2 mt-4 px-8 py-4 rounded-2xl shadow-xl shadow-primary/20"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Khám Phá Sách Ngay
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
