'use client';

import React, { useState, useEffect } from 'react';
import { WishlistSection } from '@/components/features/WishlistSection';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WishlistItem } from '@/types';
import { wishlistAPI } from '@/lib/api-mock';

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

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
        // Trong thực tế sẽ gọi API xóa bằng book_id, ở đây demo local
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    const handleToggleNotify = (id: number) => {
        setWishlist(prev => prev.map(item =>
            item.id === id ? { ...item, notify_on_price_drop: !item.notify_on_price_drop } : item
        ));
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-24">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-48">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <WishlistSection
                            items={wishlist}
                            onRemove={handleRemove}
                            onToggleNotify={handleToggleNotify}
                        />
                    )}

                    {/* Discovery Section - Suggest more books if wishlist is empty or small */}
                    {wishlist.length < 4 && !loading && (
                        <div className="mt-24 pt-24 border-t border-slate-200">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4">Khám phá thêm đầu sách hay</h2>
                                <p className="text-slate-500 font-medium">Bổ sung ngay vào bộ sưu tập của bạn những tác phẩm bestseller mới nhất</p>
                            </div>
                            {/* Ở đây có thể render thêm ProductCarousel nếu cần */}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
