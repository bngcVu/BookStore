"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, TrendingDown, Bell, BellOff, ArrowRight } from "lucide-react";
import Link from "next/link";

const initialWishlist = [
    {
        id: "1",
        productId: "p1",
        title: "Dune: Hành Tinh Cát",
        author: "Frank Herbert",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300",
        addedPrice: 250000,
        currentPrice: 199000,
        inStock: true,
        notifyOnDrop: true
    },
    {
        id: "2",
        productId: "p2",
        title: "Tâm Lý Học Tội Phạm",
        author: "Diệp Hồng Vũ",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300",
        addedPrice: 150000,
        currentPrice: 150000,
        inStock: false,
        notifyOnDrop: false
    },
    {
        id: "3",
        productId: "p3",
        title: "Harry Potter và Hòn Đá Phù Thủy",
        author: "J.K. Rowling",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300",
        addedPrice: 180000,
        currentPrice: 144000, // Giảm 20%
        inStock: true,
        notifyOnDrop: true
    }
];

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState(initialWishlist);

    const toggleNotification = (id: string) => {
        setWishlist(prev => prev.map(item =>
            item.id === id ? { ...item, notifyOnDrop: !item.notifyOnDrop } : item
        ));
    };

    const removeFromWishlist = (id: string) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sách yêu thích của bạn</h1>
                    <p className="text-slate-500 mt-1">Đang theo dõi {wishlist.length} cuốn sách</p>
                </div>
            </div>

            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Chưa có cuốn sách nào</h3>
                    <p className="text-slate-500 mb-6 max-w-sm">Hãy &quot;thả tim&quot; những cuốn sách bạn thích để theo dõi giá và nhận thông báo khuyến mãi nhé!</p>
                    <Link href="/">
                        <Button className="font-semibold px-8">Khám phá ngay sách hay</Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {wishlist.map((item, index) => {
                        const isPriceDropped = item.currentPrice < item.addedPrice;
                        const dropPercentage = isPriceDropped ? Math.round(((item.addedPrice - item.currentPrice) / item.addedPrice) * 100) : 0;

                        return (
                            <div key={item.id} className="group relative flex flex-col md:flex-row gap-6 p-4 rounded-xl border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${index * 50}ms` }}>
                                {/* Product Image */}
                                <div className="relative w-28 h-36 md:w-32 md:h-44 shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    {!item.inStock && (
                                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                                            <span className="bg-slate-900 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">Hết hàng</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content Details */}
                                <div className="flex flex-col flex-1 pl-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <Link href={`/product/${item.productId}`} className="hover:text-primary transition-colors">
                                            <h3 className="font-bold text-slate-900 text-lg md:text-xl line-clamp-2 md:leading-tight">{item.title}</h3>
                                        </Link>
                                        <button
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="text-slate-300 hover:text-red-500 transition-colors p-2 -mr-2 -mt-2 rounded-full hover:bg-slate-50"
                                            title="Xóa khỏi yêu thích"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-4">{item.author}</p>

                                    {/* Price & Smart Badge */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl md:text-2xl font-bold text-primary">{item.currentPrice.toLocaleString('vi-VN')}đ</span>
                                            {isPriceDropped && (
                                                <span className="text-sm text-slate-400 line-through">{item.addedPrice.toLocaleString('vi-VN')}đ</span>
                                            )}
                                        </div>

                                        {isPriceDropped && (
                                            <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200/50 w-fit">
                                                <TrendingDown size={14} className="animate-bounce" />
                                                <span>Giảm {dropPercentage}% so với lúc thêm ({item.addedPrice.toLocaleString('vi-VN')}đ)</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions Bottom */}
                                    <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">

                                        {/* Toggle Notification */}
                                        <label className="flex items-center gap-2 cursor-pointer group/toggle select-none">
                                            <div className={`relative w-10 h-6 transition-colors duration-300 rounded-full flex items-center p-0.5 ${item.notifyOnDrop ? 'bg-primary' : 'bg-slate-200'}`}>
                                                <input
                                                    type="checkbox"
                                                    className="sr-only"
                                                    checked={item.notifyOnDrop}
                                                    onChange={() => toggleNotification(item.id)}
                                                />
                                                <div
                                                    className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 flex items-center justify-center ${item.notifyOnDrop ? 'translate-x-4' : 'translate-x-0'}`}
                                                >
                                                    {item.notifyOnDrop ? <Bell size={10} className="text-primary" /> : <BellOff size={10} className="text-slate-400" />}
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-slate-600 group-hover/toggle:text-slate-900 transition-colors">
                                                Nhận thông báo giảm giá
                                            </span>
                                        </label>

                                        {/* Add to Cart */}
                                        <Button
                                            variant={item.inStock ? "default" : "secondary"}
                                            className={`gap-2 font-semibold ${item.inStock ? 'shadow-sm shadow-primary/20' : ''}`}
                                            disabled={!item.inStock}
                                            onClick={() => alert(`Đã thêm ${item.title} vào giỏ hàng!`)}
                                        >
                                            <ShoppingCart size={16} />
                                            {item.inStock ? "Thêm vào giỏ" : "Hết hàng"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="mt-8 pt-6 border-t border-slate-200 flex justify-center">
                        <Link href="/">
                            <Button variant="outline" className="gap-2 text-primary font-semibold hover:bg-primary/5">
                                Khám phá thêm sách mới <ArrowRight size={16} />
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
