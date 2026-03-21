import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { ALL_BOOKS, CATEGORIES as MOCK_CATEGORIES } from "@/lib/mockData";

// Filters data
const PUBLISHERS = ["NXB Trẻ", "NXB Kim Đồng", "Nhã Nam", "Alpha Books", "First News", "NXB Hội Nhà Văn", "NXB Văn Học"];
const PRICES = ["Dưới 100.000đ", "100.000đ - 200.000đ", "200.000đ - 500.000đ", "Trên 500.000đ"];

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Format slug to readable name
    const categoryInfo = MOCK_CATEGORIES.find(c => c.slug === slug);
    const categoryName = categoryInfo ? categoryInfo.name : slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Filter books by category
    const filteredBooks = ALL_BOOKS.filter(book =>
        book.category.toLowerCase().replace(/\s+/g, '-') === slug ||
        book.category.toLowerCase() === categoryName.toLowerCase()
    );

    // If no books found for this exact category, show ALL_BOOKS as "All Products" for demo
    const booksToShow = filteredBooks.length > 0 ? filteredBooks : ALL_BOOKS;

    return (
        <div className="bg-slate-50 min-h-screen">
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
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                                Bộ Lọc
                                <button className="text-xs font-medium text-slate-400 hover:text-primary">Xóa lọc</button>
                            </h3>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <h4 className="font-bold text-slate-900 text-sm mb-3">Danh Mục</h4>
                                <ul className="flex flex-col gap-2.5">
                                    {MOCK_CATEGORIES.map((cat, i) => (
                                        <li key={i} className="flex items-center justify-between group cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`cat-${i}`}
                                                    checked={cat.slug === slug}
                                                    readOnly
                                                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                                                />
                                                <label htmlFor={`cat-${i}`} className="text-sm text-slate-600 group-hover:text-primary cursor-pointer transition-colors">
                                                    {cat.name}
                                                </label>
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-1.5 py-0.5 rounded-full">
                                                {ALL_BOOKS.filter(b => b.category === cat.name).length}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-6">
                                <h4 className="font-bold text-slate-900 text-sm mb-3">Khoảng Giá</h4>
                                <ul className="flex flex-col gap-2.5">
                                    {PRICES.map((price, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <input type="radio" name="price" id={`price-${i}`} className="w-4 h-4 border-slate-300 text-primary focus:ring-primary" />
                                            <label htmlFor={`price-${i}`} className="text-sm text-slate-600 cursor-pointer hover:text-primary transition-colors">{price}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Publisher Filter */}
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm mb-3">Nhà Xuất Bản</h4>
                                <ul className="flex flex-col gap-2.5 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                                    {PUBLISHERS.map((pub, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <input type="checkbox" id={`pub-${i}`} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                                            <label htmlFor={`pub-${i}`} className="text-sm text-slate-600 cursor-pointer hover:text-primary transition-colors">{pub}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Banner inside sidebar */}
                        <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 text-center flex flex-col items-center gap-4 shadow-sm group hover:bg-primary/10 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <Zap className="text-accent h-6 w-6 fill-accent animate-pulse" />
                            </div>
                            <div className="space-y-1">
                                <span className="font-bold text-slate-900 block leading-tight">Giao Nhanh 2H</span>
                                <p className="text-xs text-slate-500">Áp dụng cho đơn hàng nội thành Hà Nội & TP.HCM</p>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <main className="flex-1 flex flex-col gap-6">
                        {/* Top Bar (Results count & Sort) */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4 px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                            <h1 className="text-xl font-bold text-slate-900">
                                {categoryName}
                                <span className="text-slate-400 text-sm font-normal ml-2">({booksToShow.length} sản phẩm)</span>
                            </h1>
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <span className="text-sm text-slate-500 shrink-0 font-medium">Sắp xếp:</span>
                                <select className="flex-1 sm:flex-initial text-sm border-slate-200 rounded-lg bg-slate-50 px-4 py-2 focus:ring-primary focus:border-primary outline-none cursor-pointer font-medium text-slate-700">
                                    <option>Bán chạy nhất</option>
                                    <option>Mới nhất</option>
                                    <option>Giá thấp đến cao</option>
                                    <option>Giá cao đến thấp</option>
                                </select>
                            </div>
                        </div>

                        {/* Grid */}
                        {booksToShow.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8 min-h-[500px]">
                                {booksToShow.map((book) => (
                                    <ProductCard key={book.id} {...book} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-20 text-center border border-slate-100 flex flex-col items-center gap-4">
                                <div className="text-slate-300 text-6xl">📖</div>
                                <div className="space-y-1">
                                    <p className="text-lg font-bold text-slate-900">Chưa có sản phẩm nào</p>
                                    <p className="text-slate-500">Chúng tôi đang cập nhật thêm sách cho danh mục này.</p>
                                </div>
                                <Link href="/">
                                    <Button className="mt-4 bg-primary text-white font-bold">Về trang chủ</Button>
                                </Link>
                            </div>
                        )}

                        {/* Pagination */}
                        {booksToShow.length > 0 && (
                            <div className="flex justify-center mt-12 mb-8">
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="w-10 h-10 border-slate-200 text-slate-500 hover:text-primary hover:border-primary" disabled>&lt;</Button>
                                    <Button variant="default" size="icon" className="w-10 h-10 shadow-md font-bold">1</Button>
                                    <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-bold">2</Button>
                                    <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-bold">3</Button>
                                    <span className="px-2 text-slate-400">...</span>
                                    <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-bold">10</Button>
                                    <Button variant="outline" size="icon" className="w-10 h-10 border-slate-200 text-slate-500 hover:text-primary hover:border-primary">&gt;</Button>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
