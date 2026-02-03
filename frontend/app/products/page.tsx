"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/features/ProductCard";
import { homeAPI, MOCK_BOOKS, wishlistAPI, MOCK_CATEGORIES } from "@/lib/api-mock";
import { Book, Category } from "@/types";
import { Filter, ChevronDown, Check, SlidersHorizontal, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProductsPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState<number[]>([]);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState("newest");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // Mock fetching all books - in a real app this would be paginated API
            // For now we duplicate mock books to have more data to show
            const allBooks = [
                ...MOCK_BOOKS,
                ...MOCK_BOOKS.map(b => ({ ...b, id: b.id + 100, title: b.title + " (Tái bản)" })),
                ...MOCK_BOOKS.map(b => ({ ...b, id: b.id + 200, title: b.title + " (Bìa cứng)", cover_type: "Bìa cứng", base_price: b.base_price * 1.5 }))
            ];

            setBooks(allBooks);
            setCategories(MOCK_CATEGORIES);

            // Get wishlist
            const wList = await wishlistAPI.getWishlist(1);
            setWishlist(wList.map(i => i.book_id));

            setLoading(false);
        };
        fetchData();
    }, []);

    const toggleWishlist = async (bookId: number, isWishlisted: boolean) => {
        if (isWishlisted) {
            await wishlistAPI.removeFromWishlist(1, bookId);
            setWishlist(prev => prev.filter(id => id !== bookId));
        } else {
            await wishlistAPI.addToWishlist(1, bookId);
            setWishlist(prev => [...prev, bookId]);
        }
    };

    // Filter Logic
    const filteredBooks = books.filter(book => {
        // Category
        if (selectedCategory && book.category_slug !== selectedCategory) return false;
        // Price
        if (book.min_price < priceRange[0] || book.min_price > priceRange[1]) return false;
        // Rating
        if (ratingFilter && book.avg_rating < ratingFilter) return false;
        return true;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'price_asc': return a.min_price - b.min_price;
            case 'price_desc': return b.min_price - a.min_price;
            case 'top_rated': return b.avg_rating - a.avg_rating;
            case 'best_selling': return b.sold_count - a.sold_count;
            default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-24">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Tất cả sách</h1>
                        <p className="text-slate-500 text-sm">Hiển thị {filteredBooks.length} kết quả</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-700 flex items-center gap-2 hover:bg-slate-50"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Bộ lọc
                        </button>

                        <div className="relative group z-20">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:border-slate-300"
                            >
                                <option value="newest">Mới nhất</option>
                                <option value="best_selling">Bán chạy nhất</option>
                                <option value="top_rated">Đánh giá cao</option>
                                <option value="price_asc">Giá thấp đến cao</option>
                                <option value="price_desc">Giá cao đến thấp</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-8 items-start">

                    {/* Sidebar Filter - Desktop */}
                    <aside className={cn(
                        "lg:w-64 shrink-0 space-y-8 lg:block",
                        showFilters ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden scrollbar-hide"
                    )}>
                        {showFilters && (
                            <div className="flex items-center justify-between mb-6 lg:hidden">
                                <h3 className="font-black text-xl text-slate-900">Bộ lọc</h3>
                                <button onClick={() => setShowFilters(false)} className="p-2 bg-slate-100 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {/* Categories */}
                        <div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Danh mục</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={cn(
                                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                                        !selectedCategory ? "bg-primary text-white font-bold shadow-md shadow-primary/30" : "text-slate-600 hover:bg-slate-100"
                                    )}
                                >
                                    Tất cả
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.slug)}
                                        className={cn(
                                            "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group",
                                            selectedCategory === cat.slug ? "bg-primary text-white font-bold shadow-md shadow-primary/30" : "text-slate-600 hover:bg-slate-100"
                                        )}
                                    >
                                        {cat.name}
                                        {selectedCategory === cat.slug && <Check className="w-3.5 h-3.5" />}
                                    </button>
                                ))}
                            </div>
                        </div>


                        {/* Authors (Mock) */}
                        <div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Tác giả</h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                                {["Nguyễn Nhật Ánh", "Paulo Coelho", "J.K. Rowling", "Haruki Murakami"].map((author, idx) => (
                                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" className="peer appearance-none w-5 h-5 border border-slate-300 rounded-md checked:bg-primary checked:border-primary transition-all" />
                                            <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                                        </div>
                                        <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">{author}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-slate-100"></div>

                        {/* Publishers (Mock) */}
                        <div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Nhà xuất bản</h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                                {["NXB Trẻ", "Nhã Nam", "NXB Kim Đồng", "NXB Văn Học"].map((pub, idx) => (
                                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" className="peer appearance-none w-5 h-5 border border-slate-300 rounded-md checked:bg-primary checked:border-primary transition-all" />
                                            <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                                        </div>
                                        <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">{pub}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-slate-100"></div>

                        {/* Price Range */}
                        <div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Khoảng giá</h3>
                            <div className="space-y-4">
                                <div className="flex gap-2 text-sm text-slate-600">
                                    <span className="font-bold">{priceRange[0].toLocaleString()}đ</span>
                                    <span>-</span>
                                    <span className="font-bold">{priceRange[1].toLocaleString()}đ</span>
                                </div>
                                <input
                                    type="range"
                                    min="0" max="1000000" step="10000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex gap-2">
                                    {[0, 200000, 500000].map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setPriceRange([0, p])}
                                            className="px-2 py-1 text-[10px] bg-slate-100 rounded border border-slate-200 hover:border-slate-300"
                                        >
                                            &lt; {p / 1000}k
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100"></div>

                        {/* Rating */}
                        <div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Đánh giá</h3>
                            <div className="space-y-2">
                                {[5, 4, 3].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => setRatingFilter(ratingFilter === star ? null : star)}
                                        className={cn(
                                            "w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                                            ratingFilter === star ? "bg-amber-50 border border-amber-200" : "hover:bg-slate-50"
                                        )}
                                    >
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={cn("w-3.5 h-3.5", i < star ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                            ))}
                                        </div>
                                        <span className={cn("text-sm font-medium", ratingFilter === star ? "text-amber-700" : "text-slate-600")}>
                                            trở lên
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredBooks.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6">
                                {filteredBooks.map((book) => (
                                    <div key={book.id}>
                                        <ProductCard
                                            book={book}
                                            onWishlistToggle={(val) => toggleWishlist(book.id, val)}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">Không tìm thấy kết quả</h3>
                                <p className="text-slate-500 max-w-xs mx-auto mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setPriceRange([0, 1000000]);
                                        setRatingFilter(null);
                                    }}
                                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                        )}

                        {/* Pagination (Mock) */}
                        {filteredBooks.length > 0 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-300 hover:text-slate-600 disabled:opacity-50" disabled>
                                    &lt;
                                </button>
                                <button className="w-10 h-10 rounded-xl bg-primary text-white font-bold flex items-center justify-center shadow-lg shadow-primary/30">1</button>
                                <button className="w-10 h-10 rounded-xl border border-slate-200 font-medium text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors">2</button>
                                <button className="w-10 h-10 rounded-xl border border-slate-200 font-medium text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors">3</button>
                                <span className="text-slate-400 px-2">...</span>
                                <button className="w-10 h-10 rounded-xl border border-slate-200 font-medium text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors">12</button>
                                <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:border-primary hover:text-primary transition-colors">
                                    &gt;
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
