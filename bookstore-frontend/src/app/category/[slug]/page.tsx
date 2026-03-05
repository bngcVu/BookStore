import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

// Mock Data
const BOOKS = Array.from({ length: 12 }).map((_, i) => ({
    id: `book-${i}`,
    slug: `book-${i}`,
    title: `Sách Mẫu - Chiều Sâu Tâm Hồn Tập ${i + 1}`,
    author: "Tác Gỉa X",
    category: "Tâm lý",
    originalPrice: 150000 + i * 10000,
    salePrice: i % 3 === 0 ? 120000 + i * 5000 : undefined,
    imageUrl: "",
}));

// Filters data
const CATEGORIES = ["Tâm lý", "Kỹ năng sống", "Kinh doanh", "Văn học", "Thiếu nhi", "Khoa học"];
const PUBLISHERS = ["NXB Trẻ", "NXB Kim Đồng", "Nhã Nam", "Alpha Books", "First News"];
const PRICES = ["Dưới 100.000đ", "100.000đ - 200.000đ", "200.000đ - 500.000đ", "Trên 500.000đ"];

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Format slug to readable name
    const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
                <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                <span>/</span>
                <span className="text-slate-900">{categoryName}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <h3 className="font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                            Bộ Lọc
                            <button className="text-xs font-medium text-slate-400 hover:text-primary">Xóa lọc</button>
                        </h3>

                        {/* Category Filter */}
                        <div className="mb-6">
                            <h4 className="font-medium text-slate-900 text-sm mb-3">Danh Mục</h4>
                            <ul className="flex flex-col gap-2.5">
                                {CATEGORIES.map((cat, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <input type="checkbox" id={`cat-${i}`} className="w-4 h-4 rounded-sm border-slate-300 text-primary focus:ring-primary" />
                                        <label htmlFor={`cat-${i}`} className="text-sm text-slate-600 cursor-pointer hover:text-slate-900">{cat}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Filter */}
                        <div className="mb-6">
                            <h4 className="font-medium text-slate-900 text-sm mb-3">Khoảng Giá</h4>
                            <ul className="flex flex-col gap-2.5">
                                {PRICES.map((price, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <input type="radio" name="price" id={`price-${i}`} className="w-4 h-4 border-slate-300 text-primary focus:ring-primary" />
                                        <label htmlFor={`price-${i}`} className="text-sm text-slate-600 cursor-pointer hover:text-slate-900">{price}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Publisher Filter */}
                        <div>
                            <h4 className="font-medium text-slate-900 text-sm mb-3">Nhà Xuất Bản</h4>
                            <ul className="flex flex-col gap-2.5 max-h-48 overflow-y-auto custom-scrollbar">
                                {PUBLISHERS.map((pub, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <input type="checkbox" id={`pub-${i}`} className="w-4 h-4 rounded-sm border-slate-300 text-primary focus:ring-primary" />
                                        <label htmlFor={`pub-${i}`} className="text-sm text-slate-600 cursor-pointer hover:text-slate-900">{pub}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Banner inside sidebar */}
                    <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 text-center flex flex-col items-center gap-3">
                        <Zap className="text-accent h-8 w-8" />
                        <span className="font-bold text-slate-900 leading-tight">Giao Nhanh 2H<br />Nội Thành</span>
                    </div>
                </aside>

                {/* Product Grid Area */}
                <main className="flex-1 flex flex-col gap-6">
                    {/* Top Bar (Results count & Sort) */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3 px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <h1 className="text-xl font-bold text-slate-900">{categoryName} <span className="text-slate-500 text-sm font-normal">({BOOKS.length} sản phẩm)</span></h1>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-500">Sắp xếp:</span>
                            <select className="text-sm border-slate-200 rounded-md bg-slate-50 px-3 py-1.5 focus:ring-primary focus:border-primary outline-none cursor-pointer">
                                <option>Bán chạy nhất</option>
                                <option>Giá thấp đến cao</option>
                                <option>Giá cao đến thấp</option>
                                <option>Mới nhất</option>
                            </select>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6">
                        {BOOKS.map((book) => (
                            <ProductCard key={book.id} {...book} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" className="w-10 h-10 border-slate-200 text-slate-500 hover:text-primary" disabled>&lt;</Button>
                            <Button variant="default" size="icon" className="w-10 h-10 shadow-none">1</Button>
                            <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-600 hover:bg-slate-100">2</Button>
                            <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-600 hover:bg-slate-100">3</Button>
                            <span className="px-2 text-slate-400">...</span>
                            <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-600 hover:bg-slate-100">10</Button>
                            <Button variant="outline" size="icon" className="w-10 h-10 border-slate-200 text-slate-500 hover:text-primary">&gt;</Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
