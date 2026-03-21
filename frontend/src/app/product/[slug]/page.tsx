"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Heart, Star, Truck, ShieldCheck, RefreshCw, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ALL_BOOKS } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    // Find product from mock data
    const product = ALL_BOOKS.find(b => b.slug === slug) || ALL_BOOKS[0];

    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(product.imageUrl);

    // Sync state when product changes (if navigation occurs)
    useEffect(() => {
        if (product) {
            setSelectedVariant(product.variants[0]);
            setMainImage(product.imageUrl);
            setQuantity(1);
        }
    }, [product]);

    if (!product) {
        return <div className="container mx-auto p-20 text-center">Sản phẩm không tồn tại</div>;
    }

    const currentPrice = (product.salePrice || product.originalPrice) + selectedVariant.priceOffset;
    const oldPrice = product.originalPrice + selectedVariant.priceOffset;
    const discountPercent = Math.round((1 - currentPrice / oldPrice) * 100);

    // Scarcity logic
    const isLowStock = selectedVariant.stock < 5 && selectedVariant.stock > 0;
    const soldQty = product.soldQuantity || 0;
    const totalQty = product.totalQuantity || 100;
    const soldPercent = totalQty > 0 ? (soldQty / totalQty) * 100 : 0;

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="container mx-auto px-4 py-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
                    <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                    <span>/</span>
                    <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">{product.category}</Link>
                    <span>/</span>
                    <span className="text-slate-900 truncate max-w-[200px] md:max-w-none">{product.title}</span>
                </div>

                {/* Main Product Section - White Box */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-10 mb-8 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Left: Product Images Gallery */}
                        <div className="lg:col-span-5 flex flex-col gap-4">
                            {/* Main Image View */}
                            <div className="aspect-[3/4] bg-slate-100 rounded-xl relative border border-slate-200 overflow-hidden group">
                                <Image
                                    src={mainImage}
                                    alt={product.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    priority
                                />
                            </div>
                            {/* Thumbnails */}
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {product.images?.map((img, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setMainImage(img)}
                                        className={cn(
                                            "w-20 aspect-[3/4] bg-slate-100 rounded-lg cursor-pointer relative overflow-hidden transition-all border-2",
                                            mainImage === img ? "border-primary" : "border-transparent hover:border-slate-300"
                                        )}
                                    >
                                        <Image src={img} alt={`${product.title} ${i + 1}`} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Product Info & Actions */}
                        <div className="lg:col-span-7 flex flex-col">
                            {/* Manufacturer/Author Info */}
                            <div className="flex items-center gap-4 text-sm mb-2">
                                <span className="text-slate-500">Tác giả: <span className="text-primary font-medium hover:underline cursor-pointer">{product.author}</span></span>
                                <span className="text-slate-300">|</span>
                                <span className="text-slate-500">Nhà xuất bản: <span className="text-primary font-medium hover:underline cursor-pointer">{product.publisher}</span></span>
                            </div>

                            <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-4">{product.title}</h1>

                            {/* Ratings */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn("w-4 h-4", i < Math.floor(product.rating || 0) ? "fill-current" : "text-slate-300")}
                                        />
                                    ))}
                                </div>
                                <span className="text-amber-500 font-bold">{product.rating}</span>
                                <span className="text-slate-500 text-sm">({product.reviewsCount} Đánh giá)</span>
                                <span className="text-slate-300">|</span>
                                <span className="text-slate-500 text-sm">Đã bán {(product.soldQuantity || 5000).toLocaleString('vi-VN')}</span>
                            </div>

                            {/* Price Block & Scarcity */}
                            <div className="bg-slate-50 rounded-xl p-5 mb-8 border border-slate-100 flex flex-col gap-4">
                                <div className="flex items-end gap-4">
                                    <span className="text-4xl font-bold text-accent tracking-tight">{currentPrice.toLocaleString('vi-VN')}đ</span>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-slate-400 line-through">{oldPrice.toLocaleString('vi-VN')}đ</span>
                                        <span className="text-xs font-bold text-white bg-accent px-2 py-0.5 rounded-sm inline-block w-max mt-1">Giảm {discountPercent}%</span>
                                    </div>
                                </div>

                                {isLowStock && (
                                    <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-2 rounded-lg border border-red-100 animate-pulse w-max">
                                        <Flame size={16} className="shrink-0" />
                                        <span className="text-xs font-bold">Chỉ còn {selectedVariant.stock} sản phẩm cuối cùng!</span>
                                    </div>
                                )}

                                {product.isFlashSale && (
                                    <div className="flex flex-col gap-1.5 mt-2">
                                        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                                            <span className="uppercase tracking-wider flex items-center gap-1">
                                                <Flame size={14} className="text-accent" /> Đang bán chạy
                                            </span>
                                            <span className="text-accent">Đã bán {soldQty}/{totalQty}</span>
                                        </div>
                                        <Progress value={soldPercent} className="h-2 bg-slate-200" />
                                    </div>
                                )}
                            </div>

                            {/* Variants Section */}
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Phiên bản: <span className="font-bold text-primary">{selectedVariant.name}</span></h3>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.map(variant => (
                                        <button
                                            key={variant.id}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={cn(
                                                "px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                                                selectedVariant.id === variant.id
                                                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                                                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                            )}
                                        >
                                            {variant.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity & CTA */}
                            <div className="flex flex-wrap items-end gap-4 border-t border-slate-100 pt-8 mt-auto">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700">Số lượng</label>
                                    <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-white h-12">
                                        <button className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                        <input type="text" className="w-12 h-full text-center font-medium text-slate-900 focus:outline-none" value={quantity} readOnly />
                                        <button className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50" onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}>+</button>
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    onClick={() => router.push('/checkout')}
                                    className="flex-1 min-w-[150px] h-12 text-base shadow-md font-semibold bg-accent hover:bg-accent-hover text-white"
                                >
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

                {/* Benefits Strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-10">
                    <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"><ShieldCheck /></div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Cam Kết Chính Hãng</h4>
                            <p className="text-xs text-slate-500">100% sách có bản quyền</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0"><Truck /></div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Giao Hàng Miễn Phí</h4>
                            <p className="text-xs text-slate-500">Cho đơn hàng từ 150.000đ</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0"><RefreshCw /></div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Đổi Trả Dễ Dàng</h4>
                            <p className="text-xs text-slate-500">Từ 7 ngày đối với lỗi NSX</p>
                        </div>
                    </div>
                </div>

                {/* Tabs Section for Description & Reviews */}
                <div className="max-w-6xl mx-auto">
                    <ProductTabs description={product.description} product={product} />
                </div>

            </div>
        </div>
    );
}
