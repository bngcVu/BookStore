"use client";

import { useState, useEffect } from "react";
import { Star, ThumbsUp, MessageSquare, PenTool, CheckCircle2, XCircle, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
    description: string;
    product?: any; // Dữ liệu sản phẩm thực tế
}

export function ProductTabs({ description, product }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState("description");
    const [isWritingReview, setIsWritingReview] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Tự động chuyển tab nếu URL có hash #review
    useEffect(() => {
        const hash = window.location.hash;
        if (hash === '#review' || hash === '#reviews') {
            setActiveTab("reviews");
            setIsWritingReview(true);

            const element = document.getElementById('product-tabs-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    const tabs = [
        { id: "description", label: "Mô tả sản phẩm" },
        { id: "details", label: "Thông số chi tiết" },
        { id: "reviews", label: `Đánh giá (${product?.reviewsCount || 0})` },
    ];

    const reviews = product?.reviews || [];

    return (
        <div id="product-tabs-section" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden max-w-6xl mx-auto">
            {/* Tab Headers */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-6 lg:px-10 py-5 text-sm font-bold transition-all relative whitespace-nowrap",
                            activeTab === tab.id
                                ? "text-primary bg-white"
                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 lg:p-10">
                {activeTab === "description" && (
                    <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {description}
                        </p>
                    </div>
                )}

                {activeTab === "details" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                        {[
                            { label: "Nhà xuất bản", value: product?.publisher || "Đang cập nhật" },
                            { label: "Tác giả", value: product?.author || "Đang cập nhật" },
                            { label: "Ngày xuất bản", value: "2024" },
                            { label: "Kích thước", value: "14.5 x 20.5 cm" },
                            { label: "Số trang", value: "320" },
                            { label: "Loại bìa", value: "Bìa mềm" },
                            { label: "Ngôn ngữ", value: "Tiếng Việt" },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between py-3 border-b border-slate-50">
                                <span className="text-slate-500 text-sm font-medium">{item.label}</span>
                                <span className="text-slate-900 text-sm font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div className="flex flex-col gap-8">
                        {/* Summary */}
                        <div className="flex flex-col md:flex-row gap-8 items-center bg-slate-50 rounded-xl p-8 border border-slate-100">
                            <div className="text-center">
                                <div className="text-5xl font-black text-slate-900 mb-1">{product?.rating || 0}</div>
                                <div className="flex justify-center text-amber-400 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} className={cn(i < Math.floor(product?.rating || 0) ? "fill-amber-400" : "")} />
                                    ))}
                                </div>
                                <div className="text-xs text-slate-500 font-medium">({product?.reviewsCount || 0} đánh giá)</div>
                            </div>

                            <div className="flex-1 flex flex-col gap-2 w-full max-w-xs">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-slate-600 w-4">{star}</span>
                                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-amber-400 rounded-full"
                                                style={{ width: star === 5 ? "85%" : star === 4 ? "10%" : "5%" }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="md:border-l border-slate-200 md:pl-8 flex flex-col items-center md:items-start gap-3">
                                <div className="text-sm font-medium text-slate-600 text-center md:text-left">
                                    Bạn đã mua sản phẩm này? Hãy chia sẻ đánh giá của bạn nhé!
                                </div>
                                <Button
                                    onClick={() => setIsWritingReview(!isWritingReview)}
                                    className="bg-primary hover:bg-primary-hover text-white font-bold gap-2"
                                >
                                    <PenTool size={18} />
                                    {isWritingReview ? "Đóng form" : "Viết đánh giá"}
                                </Button>
                            </div>
                        </div>

                        {/* List */}
                        <div className="flex flex-col gap-6">
                            {reviews.length > 0 ? (
                                reviews.map((review: any) => (
                                    <div key={review.id} className="border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">
                                                    {review.user.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-slate-900 text-sm">{review.user}</h4>
                                                        {review.isVerified && (
                                                            <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full font-bold">
                                                                Đã mua hàng
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex text-amber-400 my-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={12} className={i < review.rating ? "fill-amber-400" : ""} />
                                                        ))}
                                                    </div>
                                                    <p className="text-xs text-slate-400">{review.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-14 flex flex-col gap-3">
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                {review.comment}
                                            </p>

                                            {/* Pros / Cons Section */}
                                            {(review.pros?.length > 0 || review.cons?.length > 0) && (
                                                <div className="flex flex-col gap-1.5 bg-slate-50 p-3 rounded-lg border border-slate-100 w-fit">
                                                    {review.pros?.length > 0 && review.pros.map((pro: string, idx: number) => (
                                                        <div key={`pro-${idx}`} className="flex items-center gap-2 text-xs text-slate-700 font-medium tracking-tight">
                                                            <CheckCircle2 size={14} className="text-green-500 shrink-0" /> <span className="text-slate-500 font-normal">Ưu điểm:</span> {pro}
                                                        </div>
                                                    ))}
                                                    {review.cons?.length > 0 && review.cons.map((con: string, idx: number) => (
                                                        <div key={`con-${idx}`} className="flex items-center gap-2 text-xs text-slate-700 font-medium tracking-tight">
                                                            <XCircle size={14} className="text-slate-400 shrink-0" /> <span className="text-slate-500 font-normal">Nhược điểm:</span> {con}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Review Images */}
                                            {review.images?.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {review.images.map((img: string, idx: number) => (
                                                        <div
                                                            key={idx}
                                                            className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:border-primary transition-colors"
                                                            onClick={() => setSelectedImage(img)}
                                                        >
                                                            <Image src={img} alt={`Review Image ${idx + 1}`} fill className="object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-slate-500">
                                    Chưa có đánh giá nào.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Image Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-red-400 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    >
                        <X size={24} />
                    </button>
                    <div
                        className="relative w-[90vw] h-[80vh] max-w-4xl"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
                    >
                        <Image
                            src={selectedImage}
                            alt="Phóng to ảnh đánh giá"
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 90vw, 1024px"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
