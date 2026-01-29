'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { WishlistSection } from '@/components/features/WishlistSection';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WishlistItem } from '@/types';
import { wishlistAPI } from '@/lib/api-mock';

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        async function loadWishlist() {
            setLoading(true);
            try {
                // Giả lập user ID = 1
                const data = await wishlistAPI.getWishlist(1);
                setWishlist(data);
            } catch (error) {
                console.error("Failed to load wishlist", error);
            } finally {
                setLoading(false);
            }
        }
        loadWishlist();
    }, []);

    const handleRemove = async (id: number) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    const handleToggleNotify = (id: number) => {
        setWishlist(prev => prev.map(item =>
            item.id === id ? { ...item, notify_on_price_drop: !item.notify_on_price_drop } : item
        ));
    };

    const handleAddAllToCart = () => {
        alert("Đã thêm tất cả sách yêu thích vào giỏ hàng!");
    };

    const filteredWishlist = useMemo(() => {
        let result = [...wishlist];

        if (filter === 'dropped') {
            result = result.filter(item => item.book.min_price < item.added_price);
        } else if (filter === 'priority') {
            result = result.filter(item => item.priority > 0);
        } else if (filter === 'recent') {
            result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }

        return result;
    }, [wishlist, filter]);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="container mx-auto px-4 pt-40 pb-24">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-[3/5] bg-slate-100 rounded-[32px] animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <WishlistSection
                            items={filteredWishlist}
                            onRemove={handleRemove}
                            onToggleNotify={handleToggleNotify}
                            onAddAllToCart={handleAddAllToCart}
                            filter={filter}
                            onFilterChange={setFilter}
                        />
                    )}

                    {/* Discovery Section - Suggest more books if wishlist is empty or small */}
                    {wishlist.length < 4 && !loading && (
                        <div className="mt-24 pt-24 border-t border-slate-200">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4">Khám phá thêm đầu sách hay</h2>
                                <p className="text-slate-500 font-medium">Bổ sung ngay vào bộ sưu tập của bạn những tác phẩm bestseller mới nhất</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
