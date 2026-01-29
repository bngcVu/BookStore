'use client';

import React from 'react';
import { WishlistItem } from '@/types';
import { Heart, ShoppingCart, Bell, BellOff, Star, Trash2, TrendingDown, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface WishlistSectionProps {
    items: WishlistItem[];
    onRemove: (id: number) => void;
    onToggleNotify: (id: number) => void;
}

export function WishlistSection({ items, onRemove, onToggleNotify }: WishlistSectionProps) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-[40px] border border-slate-100 shadow-sm">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Danh sách trống</h3>
                <p className="text-slate-500 mb-8 max-w-xs text-center font-medium">Bạn chưa lưu cuốn sách nào vào danh sách yêu thích của mình.</p>
                <Link
                    href="/products"
                    className="px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
                >
                    <span>Khám phá ngay</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    return (
        <section className="space-y-8">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                        <Heart className="w-8 h-8 text-primary fill-primary" />
                        <span>Sách yêu thích của bạn</span>
                    </h2>
                    <p className="text-slate-500 font-medium mt-1">Lưu trữ cảm hứng, đón chờ ưu đãi</p>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-cta/10 text-cta rounded-full text-[10px] font-black uppercase tracking-wider border border-cta/10">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>Chúng tôi sẽ báo khi có giá tốt</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map((item) => (
                    <WishlistCard
                        key={item.id}
                        item={item}
                        onRemove={onRemove}
                        onToggleNotify={onToggleNotify}
                    />
                ))}
            </div>
        </section>
    );
}

function WishlistCard({ item, onRemove, onToggleNotify }: { item: WishlistItem; onRemove: (id: number) => void; onToggleNotify: (id: number) => void }) {
    const { book, added_price, notify_on_price_drop, priority } = item;
    const currentPrice = book.min_price;
    const isPriceDropped = currentPrice < added_price;
    const dropPercentage = isPriceDropped
        ? Math.round(((added_price - currentPrice) / added_price) * 100)
        : 0;

    return (
        <div className="group relative bg-white rounded-[32px] border border-slate-100 p-5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            {/* Header Tags */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
                {priority > 0 && (
                    <div className="px-3 py-1 bg-amber-400 text-white rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-amber-400/30">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Ưu tiên</span>
                    </div>
                )}
                {isPriceDropped && (
                    <div className="ml-auto px-3 py-1 bg-green-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-green-500/30 animate-pulse">
                        <TrendingDown className="w-3 h-3" />
                        <span>Giảm {dropPercentage}%</span>
                    </div>
                )}
            </div>

            {/* Book Info Container */}
            <div className="flex flex-col h-full">
                {/* Image Section */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-slate-50 group-hover:scale-[1.02] transition-transform duration-500">
                    <Image
                        src={book.primary_image}
                        alt={book.title}
                        fill
                        className="object-cover"
                    />

                    {/* Hover Actions Overlay */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                            onClick={(e) => { e.preventDefault(); onRemove(item.id); }}
                            className="w-12 h-12 bg-white text-red-500 rounded-full flex items-center justify-center shadow-xl hover:bg-red-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 pointer-events-auto"
                            title="Xóa khỏi danh sách"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                            className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-xl hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 pointer-events-auto"
                            title="Thêm vào giỏ hàng"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 space-y-3">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{book.authors}</p>
                    <h3 className="text-base font-black text-slate-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        <Link href={`/product/${book.slug}`}>{book.title}</Link>
                    </h3>

                    {/* Price Section */}
                    <div className="pt-2 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-primary tracking-tight">
                                {currentPrice.toLocaleString('vi-VN')}đ
                            </span>
                            {isPriceDropped && (
                                <span className="text-[10px] text-slate-400 line-through font-bold">
                                    {added_price.toLocaleString('vi-VN')}đ
                                </span>
                            )}
                        </div>
                        {isPriceDropped && (
                            <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider flex items-center gap-1">
                                <span>Tiết kiệm {(added_price - currentPrice).toLocaleString('vi-VN')}đ</span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between">
                    <button
                        onClick={() => onToggleNotify(item.id)}
                        className={cn(
                            "flex items-center gap-2 text-[10px] font-black uppercase tracking-wider transition-all",
                            notify_on_price_drop ? "text-primary" : "text-slate-400"
                        )}
                    >
                        {notify_on_price_drop ? (
                            <>
                                <Bell className="w-4 h-4 fill-primary/10" />
                                <span>Thông báo: Bật</span>
                            </>
                        ) : (
                            <>
                                <BellOff className="w-4 h-4" />
                                <span>Thông báo: Tắt</span>
                            </>
                        )}
                    </button>

                    <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">
                        {new Date(item.created_at).toLocaleDateString('vi-VN')}
                    </span>
                </div>
            </div>
        </div>
    );
}
