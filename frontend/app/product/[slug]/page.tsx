'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_BOOKS, MOCK_VOUCHERS, wishlistAPI } from '@/lib/api-mock'; // TODO: Replace with real API
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { VoucherCollector } from '@/components/features/VoucherCollector';
import { ProductCard } from '@/components/features/ProductCard';
import { Star, ShoppingCart, Heart, Share2, ChevronRight, Truck, ShieldCheck, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

// Giả lập lấy data theo slug
async function getProduct(slug: string) {
    // Trong thực tế, gọi API backend
    await new Promise(r => setTimeout(r, 500));
    const book = MOCK_BOOKS.find(b => b.slug === slug) || MOCK_BOOKS[0];
    return book;
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    // Unwrapping params for Next.js 15+ compatibility if needed, but standard prop access works for 14
    const { slug } = params;

    // State
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState('');
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const data = await getProduct(slug);
                setBook(data);
                setMainImage(data.primary_image);
                // Check wishlist status
                const wished = await wishlistAPI.isInWishlist(1, data.id);
                setIsWishlisted(wished);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-pulse space-y-4 text-center">
                    <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto"></div>
                    <div className="h-4 w-32 bg-slate-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!book) return <div className="text-center py-20">Không tìm thấy sách</div>;

    const discount = book.discount_percent || 0;
    const currentPrice = book.min_price || book.base_price;
    const oldPrice = book.base_price;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="container mx-auto px-4 py-20">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 pt-6">
                    <Link href="/" className="hover:text-primary">Trang chủ</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/category/${book.category_slug}`} className="hover:text-primary">{book.category_name}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900 font-medium truncate max-w-[200px]">{book.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Column: Images (5 cols) */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm group">
                            <Image
                                src={mainImage}
                                alt={book.title}
                                fill
                                className="object-contain" // Contain để không bị cắt sách
                                priority
                            />
                            {discount > 0 && (
                                <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-rose-500/20">
                                    Giảm {discount}%
                                </div>
                            )}
                        </div>
                        {/* Thumbnail gallery placeholders */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(book.primary_image)}
                                    className="relative aspect-square rounded-xl bg-white border border-slate-200 overflow-hidden hover:border-primary transition-colors"
                                >
                                    <Image src={book.primary_image} alt="" fill className="object-cover opacity-80 hover:opacity-100" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Info & Actions (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col h-full bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">

                        {/* Brand & Author */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary mb-2">
                                <span className="bg-primary/10 px-2 py-1 rounded">{book.publisher_name}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span className="text-slate-500">{book.category_name}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">{book.title}</h1>

                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    <span className="font-bold text-slate-900">{book.avg_rating}</span>
                                    <span className="text-slate-400">({book.review_count} đánh giá)</span>
                                </div>
                                <div className="w-px h-4 bg-slate-200"></div>
                                <div className="text-slate-500">
                                    Đã bán <span className="font-bold text-slate-900">{book.sold_count.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100 w-full my-4"></div>

                        {/* Price Section */}
                        <div className="mb-6">
                            <div className="flex items-end gap-3 mb-2">
                                <span className="text-4xl font-black text-rose-500 tracking-tight">{currentPrice.toLocaleString('vi-VN')}đ</span>
                                {discount > 0 && (
                                    <span className="text-lg text-slate-400 line-through font-medium mb-1">{oldPrice.toLocaleString('vi-VN')}đ</span>
                                )}
                            </div>

                            {/* Voucher Collector Component Added Here */}
                            <VoucherCollector vouchers={MOCK_VOUCHERS.slice(0, 3)} />
                        </div>

                        {/* Specs Short Info */}
                        <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 mb-8">
                            <p>Tác giả: <span className="font-bold text-slate-900">{book.authors}</span></p>
                            <p>Hình thức: <span className="font-bold text-slate-900">{book.cover_type || 'Bìa mềm'}</span></p>
                            <p>Số trang: <span className="font-bold text-slate-900">{book.pages || 'N/A'}</span></p>
                            <p>Năm XB: <span className="font-bold text-slate-900">{book.publication_year || 'N/A'}</span></p>
                        </div>

                        {/* Actions */}
                        <div className="mt-auto space-y-4">
                            <div className="flex items-center gap-4">
                                {/* Quantity */}
                                <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all font-bold text-slate-500 hover:text-slate-900">-</button>
                                    <span className="w-12 text-center font-bold text-slate-900">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all font-bold text-slate-500 hover:text-slate-900">+</button>
                                </div>

                                <div className="flex-1 flex gap-3">
                                    <button
                                        className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-lg hover:shadow-primary/30 active:scale-95 text-sm"
                                        onClick={() => alert('Đã thêm vào giỏ hàng!')}
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Thêm vào giỏ
                                    </button>
                                    <Link href="/cart" className="flex-1 bg-rose-50 text-rose-600 border border-rose-100 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-rose-100 transition-all active:scale-95 text-sm flex items-center justify-center">
                                        Mua ngay
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={cn("flex items-center gap-2 text-sm font-bold transition-colors", isWishlisted ? "text-rose-500" : "text-slate-400 hover:text-slate-600")}
                                >
                                    <Heart className={cn("w-5 h-5", isWishlisted ? "fill-current" : "")} />
                                    {isWishlisted ? "Đã yêu thích" : "Thêm vào yêu thích"}
                                </button>

                                <div className="flex gap-4 text-xs font-medium text-slate-500">
                                    <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-green-500" /> FreeShip Xtra</span>
                                    <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-primary" /> Chính hãng 100%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description & Details Sections */}
                <div className="mt-16 bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6">Giới thiệu sách</h2>
                    <div className="prose prose-slate max-w-none text-slate-600 leading-loose">
                        <p>{book.description}</p>
                        <p>Nội dung chi tiết đang được cập nhật...</p>
                    </div>
                </div>

                {/* Related Books */}
                <div className="mt-20">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">Có thể bạn sẽ thích</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {MOCK_BOOKS.slice(0, 5).map(b => (
                            <ProductCard key={b.id} book={b} />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
