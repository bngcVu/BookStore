"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Heart, Star, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductTabs } from "@/components/product/ProductTabs";

// Mock Data
const PRODUCT = {
    id: "book-1",
    title: "Muôn Kiếp Nhân Sinh - Tập 1",
    author: "Nguyên Phong",
    publisher: "First News",
    category: "Tâm linh",
    originalPrice: 168000,
    salePrice: 120000,
    rating: 4.8,
    reviewsCount: 1250,
    description: "Muôn kiếp nhân sinh là một bức tranh kỳ vĩ về luật Nhân quả và Luân hồi của vũ trụ, được kể lại qua những trải nghiệm tiền kiếp có thật của doanh nhân Thomas – một người bạn tâm giao lâu đời của tác giả Nguyên Phong.",
    variants: [
        { id: "v1", name: "Bìa Mềm", priceOffset: 0, stock: 15 },
        { id: "v2", name: "Bìa Cứng (Bản Đặc Biệt)", priceOffset: 50000, stock: 3 }
    ],
    images: ["img1", "img2", "img3"]
};

export default function ProductDetailPage() {
    const [selectedVariant, setSelectedVariant] = useState(PRODUCT.variants[0]);
    const [quantity, setQuantity] = useState(1);

    const currentPrice = (PRODUCT.salePrice || PRODUCT.originalPrice) + selectedVariant.priceOffset;
    const oldPrice = PRODUCT.originalPrice + selectedVariant.priceOffset;
    const discountPercent = Math.round((1 - currentPrice / oldPrice) * 100);

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="container mx-auto px-4 py-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
                    <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                    <span>/</span>
                    <Link href={`/category/tam-linh`} className="hover:text-primary transition-colors">Tâm linh</Link>
                    <span>/</span>
                    <span className="text-slate-900 truncate max-w-[200px] md:max-w-none">{PRODUCT.title}</span>
                </div>

                {/* Main Product Section - White Box */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-10 mb-8 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Left: Product Images Gallery */}
                        <div className="lg:col-span-5 flex flex-col gap-4">
                            {/* Main Image View */}
                            <div className="aspect-[3/4] bg-slate-100 rounded-xl relative border border-slate-200 flex items-center justify-center">
                                <span className="text-slate-400 font-bold text-xl uppercase tracking-widest">Sách {PRODUCT.title}</span>
                            </div>
                            {/* Thumbnails */}
                            <div className="flex gap-3">
                                {PRODUCT.images.map((img, i) => (
                                    <div key={i} className={`w-20 aspect-[3/4] bg-slate-100 rounded-lg cursor-pointer border-2 ${i === 0 ? 'border-primary' : 'border-transparent hover:border-slate-300'} transition-all`}></div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Product Info & Actions */}
                        <div className="lg:col-span-7 flex flex-col">
                            {/* Manufacturer/Author Info */}
                            <div className="flex items-center gap-4 text-sm mb-2">
                                <span className="text-slate-500">Tác giả: <span className="text-primary font-medium hover:underline cursor-pointer">{PRODUCT.author}</span></span>
                                <span className="text-slate-300">|</span>
                                <span className="text-slate-500">Nhà xuất bản: <span className="text-primary font-medium hover:underline cursor-pointer">{PRODUCT.publisher}</span></span>
                            </div>

                            <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-4">{PRODUCT.title}</h1>

                            {/* Ratings */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center text-accent">
                                    <Star className="fill-accent w-4 h-4" />
                                    <Star className="fill-accent w-4 h-4" />
                                    <Star className="fill-accent w-4 h-4" />
                                    <Star className="fill-accent w-4 h-4" />
                                    <Star className="w-4 h-4" />
                                </div>
                                <span className="text-accent font-bold">{PRODUCT.rating}</span>
                                <span className="text-slate-500 text-sm">({PRODUCT.reviewsCount} Đánh giá)</span>
                                <span className="text-slate-300">|</span>
                                <span className="text-slate-500 text-sm">Đã bán 5k+</span>
                            </div>

                            {/* Price Block */}
                            <div className="bg-slate-50 rounded-xl p-5 mb-8 border border-slate-100">
                                <div className="flex items-end gap-4">
                                    <span className="text-4xl font-bold text-accent tracking-tight">{currentPrice.toLocaleString('vi-VN')}đ</span>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-slate-400 line-through">{oldPrice.toLocaleString('vi-VN')}đ</span>
                                        <span className="text-xs font-bold text-white bg-accent px-2 py-0.5 rounded-sm inline-block w-max mt-1">Giảm {discountPercent}%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Variants Section */}
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Phiên bản: <span className="font-bold text-primary">{selectedVariant.name}</span></h3>
                                <div className="flex flex-wrap gap-3">
                                    {PRODUCT.variants.map(variant => (
                                        <button
                                            key={variant.id}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${selectedVariant.id === variant.id
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            {variant.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity & CTA */}
                            <div className="flex items-end gap-6 border-t border-slate-100 pt-8 mt-auto">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">Số lượng</label>
                                    <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-white">
                                        <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                        <input type="text" className="w-12 h-10 text-center font-medium text-slate-900 focus:outline-none" value={quantity} readOnly />
                                        <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50" onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}>+</button>
                                    </div>
                                </div>

                                <Button size="lg" className="flex-1 h-12 text-base shadow-md font-semibold bg-accent hover:bg-accent-hover text-white pt-1">
                                    Mua Ngay
                                </Button>

                                <Button size="icon" variant="outline" className="h-12 w-12 rounded-lg border-primary text-primary hover:bg-primary/5 shrink-0" title="Thêm vào giỏ hàng">
                                    <ShoppingCart />
                                </Button>

                                <Button size="icon" variant="ghost" className="h-12 w-12 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 bg-slate-50 shrink-0" title="Yêu thích">
                                    <Heart />
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Benefits Strip below main prod */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-10">
                    <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0"><ShieldCheck /></div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Cam Kết Chính Hãng</h4>
                            <p className="text-xs text-slate-500">100% sách có bản quyền</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0"><Truck /></div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Giao Hàng Miễn Phí</h4>
                            <p className="text-xs text-slate-500">Cho đơn hàng từ 150.000đ</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0"><RefreshCw /></div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Đổi Trả Dễ Dàng</h4>
                            <p className="text-xs text-slate-500">Từ 7 ngày đối với lỗi NSX</p>
                        </div>
                    </div>
                </div>

                {/* Tabs Section for Description & Reviews */}
                <ProductTabs description={PRODUCT.description} />

            </div>
        </div>
    );
}
