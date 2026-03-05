"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageSquare, ShieldCheck } from "lucide-react";
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

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 max-w-6xl mx-auto overflow-hidden">
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
                                <Button variant="accent" size="lg" className="w-full font-semibold">Viết đánh giá</Button>
                            </div>
                        </div>

                        {/* Review List */}
                        <div className="space-y-6">
                            {[1, 2].map(i => (
                                <div key={i} className="flex gap-4 border-b border-slate-100 pb-6 last:border-0">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                                        A{i}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-slate-900 text-sm">Nguyễn Văn A</h4>
                                                <div className="flex items-center text-accent mt-1">
                                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="fill-accent w-3 h-3" />)}
                                                    <span className="text-green-600 px-2 py-0.5 bg-green-50 text-[10px] font-bold rounded flex items-center gap-1 ml-3"><ShieldCheck size={10} /> Đã mua hàng</span>
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-400">2 ngày trước</span>
                                        </div>
                                        <h5 className="font-bold text-slate-900 text-sm">Cực kỳ ý nghĩa</h5>
                                        <p className="text-slate-600 text-sm leading-relaxed">Sách nội dung sâu sắc, bìa đẹp, giao hàng cực kỳ nhanh chóng. Rất hài lòng với dịch vụ của BookStore!</p>
                                        <div className="flex items-center gap-4 mt-3 pt-3">
                                            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors font-medium">
                                                <ThumbsUp size={14} /> Hữu ích (12)
                                            </button>
                                            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors font-medium">
                                                <MessageSquare size={14} /> Thảo luận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="pt-4 text-center">
                                <Button variant="outline" className="text-primary border-primary/20 hover:bg-primary/5">Xem toàn bộ 1,250 đánh giá</Button>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
