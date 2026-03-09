"use client";

import { useState, useEffect } from "react";
import { Star, ThumbsUp, MessageSquare, ShieldCheck, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const TABS = [
    { id: "description", label: "Mô tả sản phẩm" },
    { id: "details", label: "Thông tin chi tiết" },
    { id: "reviews", label: "Đánh giá từ khách hàng" }
];

interface ProductTabsProps {
    description: string;
}

export function ProductTabs({ description }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const [isWritingReview, setIsWritingReview] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState(2);
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewImages, setReviewImages] = useState<string[]>([]);

    // Handle hash routing for reviews
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === '#review' || hash === '#reviews') {
                setActiveTab('reviews');
                setIsWritingReview(true);

                // Smooth scroll to the tabs section
                const element = document.getElementById('product-tabs');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        // Check hash on initial load
        handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Mock user submit review
    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedRating === 0) {
            alert("Vui lòng chọn số sao đánh giá!");
            return;
        }
        alert("Cảm ơn bạn đã đánh giá! (Tính năng Submit thực tế sẽ hoàn thiện ở Phase 4)");
        setIsWritingReview(false);
        setReviewImages([]);
        setSelectedRating(0);
    };

    const handleUploadMock = () => {
        if (reviewImages.length >= 3) return alert("Chỉ được tải lên tối đa 3 ảnh/video");
        setReviewImages(prev => [...prev, "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300"]);
    };

    return (
        <div id="product-tabs" className="bg-white rounded-2xl shadow-sm border border-slate-100 max-w-6xl mx-auto overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-slate-100 overflow-x-auto custom-scrollbar bg-slate-50/50">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-8 py-5 text-sm font-semibold whitespace-nowrap transition-colors relative ${activeTab === tab.id
                            ? "text-primary"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-10">

                {/* Description Tab */}
                {activeTab === "description" && (
                    <div className="prose prose-slate max-w-none">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Về cuốn sách này</h3>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line text-[15px]">
                            {description}
                        </p>
                    </div>
                )}

                {/* Details Tab */}
                {activeTab === "details" && (
                    <div className="max-w-2xl">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Đặc tính kỹ thuật</h3>
                        <table className="w-full text-sm text-left">
                            <tbody className="divide-y divide-slate-100 border-t border-slate-100">
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 font-medium text-slate-900 w-1/3">Công ty phát hành</td>
                                    <td className="py-4 text-slate-600">First News - Trí Việt</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 font-medium text-slate-900 w-1/3">Ngày xuất bản</td>
                                    <td className="py-4 text-slate-600">2020-05-15</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 font-medium text-slate-900 w-1/3">Kích thước</td>
                                    <td className="py-4 text-slate-600">14.5 x 20.5 cm</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 font-medium text-slate-900 w-1/3">Loại bìa</td>
                                    <td className="py-4 text-slate-600">Bìa mềm</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 font-medium text-slate-900 w-1/3">Số trang</td>
                                    <td className="py-4 text-slate-600">424</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                    <div className="space-y-10">
                        {/* Review Summary */}
                        <div className="flex flex-col md:flex-row gap-10 items-center justify-between bg-slate-50 rounded-xl p-8 border border-slate-100">
                            <div className="text-center md:text-left flex flex-col items-center md:items-start gap-1">
                                <span className="text-5xl font-bold text-slate-900">4.8</span>
                                <div className="flex items-center text-accent my-2">
                                    <Star className="fill-accent w-5 h-5" />
                                    <Star className="fill-accent w-5 h-5" />
                                    <Star className="fill-accent w-5 h-5" />
                                    <Star className="fill-accent w-5 h-5" />
                                    <Star className="w-5 h-5" />
                                </div>
                                <span className="text-sm text-slate-500">Dựa trên 1,250 đánh giá</span>
                            </div>

                            <div className="flex-1 w-full max-w-sm space-y-2">
                                {[5, 4, 3, 2, 1].map((star, i) => (
                                    <div key={star} className="flex items-center gap-3 text-sm">
                                        <span className="w-8 flex items-center justify-end gap-1 font-medium text-slate-700">{star} <Star className="w-3 h-3 fill-slate-400 text-slate-400" /></span>
                                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent" style={{ width: `${star === 5 ? 85 : star === 4 ? 10 : 2}%` }}></div>
                                        </div>
                                        <span className="w-10 text-right text-slate-500">{star === 5 ? '1k+' : star === 4 ? '150' : '10'}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center w-full md:w-auto">
                                <Button
                                    variant={isWritingReview ? "outline" : "accent"}
                                    size="lg"
                                    className="w-full font-semibold"
                                    onClick={() => setIsWritingReview(!isWritingReview)}
                                >
                                    {isWritingReview ? "Hủy đánh giá" : "Viết đánh giá"}
                                </Button>
                            </div>
                        </div>

                        {/* Toggled Review Form */}
                        {isWritingReview && (
                            <form onSubmit={handleSubmitReview} className="bg-white p-6 border border-slate-200 rounded-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                <h4 className="font-bold text-slate-900">Đánh giá của bạn</h4>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm font-medium text-slate-700">Chất lượng:</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star
                                                key={s}
                                                onClick={() => setSelectedRating(s)}
                                                onMouseEnter={() => setHoverRating(s)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className={`w-6 h-6 cursor-pointer transition-colors ${s <= (hoverRating || selectedRating)
                                                    ? 'text-accent fill-accent'
                                                    : 'text-slate-200 fill-slate-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm font-semibold text-accent">
                                        {selectedRating === 5 ? "Tuyệt vời" : selectedRating === 4 ? "Tốt" : selectedRating === 3 ? "Bình thường" : selectedRating === 2 ? "Tệ" : selectedRating === 1 ? "Rất tệ" : ""}
                                    </span>
                                </div>
                                <textarea
                                    rows={4}
                                    placeholder="Chia sẻ cảm nhận của bạn về cuốn sách này..."
                                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y"
                                    required
                                ></textarea>

                                {/* Image Upload Component */}
                                <div className="pt-2">
                                    <div className="flex flex-wrap gap-3">
                                        {reviewImages.map((img, i) => (
                                            <div key={i} className="relative w-20 h-20 rounded-lg border border-slate-200 overflow-hidden group">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={img} alt="review image" className="object-cover w-full h-full" />
                                                <button
                                                    type="button"
                                                    onClick={() => setReviewImages(prev => prev.filter((_, idx) => idx !== i))}
                                                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        {reviewImages.length < 3 && (
                                            <button
                                                type="button"
                                                onClick={handleUploadMock}
                                                className="w-20 h-20 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-500 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                                            >
                                                <ImageIcon size={20} className="mb-1" />
                                                <span className="text-[10px] font-medium leading-tight">Thêm ảnh<br />(Tối đa 3)</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <Button type="submit" variant="default">Gửi đánh giá</Button>
                                </div>
                            </form>
                        )}

                        {/* Review List */}
                        <div className="space-y-6">
                            {Array.from({ length: visibleReviews }).map((_, idx) => (
                                <div key={idx} className="flex gap-4 border-b border-slate-100 pb-6 last:border-0">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                                        A{idx + 1}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-slate-900 text-sm">Người dùng ẩn danh #{idx + 1}</h4>
                                                <div className="flex items-center text-accent mt-1">
                                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="fill-accent w-3 h-3" />)}
                                                    <span className="text-green-600 px-2 py-0.5 bg-green-50 text-[10px] font-bold rounded flex items-center gap-1 ml-3"><ShieldCheck size={10} /> Đã mua hàng</span>
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-400">{idx * 2 + 1} ngày trước</span>
                                        </div>
                                        <h5 className="font-bold text-slate-900 text-sm">Trải nghiệm tuyệt vời</h5>
                                        <p className="text-slate-600 text-sm leading-relaxed">Sách nội dung sâu sắc, bìa đẹp, giao hàng cực kỳ nhanh chóng. Rất hài lòng với dịch vụ của BookStore!</p>

                                        {/* Mock Images for the first review */}
                                        {idx === 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <div className="w-20 h-20 rounded border border-slate-200 overflow-hidden cursor-pointer hover:border-primary transition-colors">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200" alt="mock review" className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-4 mt-3 pt-3">
                                            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors font-medium">
                                                <ThumbsUp size={14} /> Hữu ích ({12 - idx})
                                            </button>
                                            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors font-medium">
                                                <MessageSquare size={14} /> Thảo luận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {visibleReviews < 10 && (
                                <div className="pt-4 text-center">
                                    <Button
                                        variant="outline"
                                        className="text-primary border-primary/20 hover:bg-primary/5"
                                        onClick={() => setVisibleReviews(prev => prev + 2)}
                                    >
                                        Xem thêm đánh giá cũ hơn...
                                    </Button>
                                </div>
                            )}
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
