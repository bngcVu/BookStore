"use client";

import React from 'react';
import { Star, ThumbsUp, CheckCircle, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Review {
    id: number;
    user_name: string;
    avatar_url?: string;
    rating: number;
    title: string;
    comment: string;
    is_verified: boolean;
    created_at: string;
    helpful_count: number;
    images?: string[];
}

interface ReviewListProps {
    reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">Chưa có đánh giá nào. Hãy là người đầu tiên nhận xét về cuốn sách này!</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {reviews.map((review) => (
                <div key={review.id} className="group border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden relative border border-slate-200">
                                {review.avatar_url ? (
                                    <Image src={review.avatar_url} alt={review.user_name} fill className="object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-primary/10 text-primary font-bold">
                                        {review.user_name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-slate-900 text-sm">{review.user_name}</h4>
                                    {review.is_verified && (
                                        <span className="flex items-center gap-1 text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-green-100">
                                            <CheckCircle className="w-3 h-3" /> Đã mua hàng
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={cn("w-3.5 h-3.5", i < review.rating ? "fill-current" : "text-slate-200 fill-slate-200")} />
                                        ))}
                                    </div>
                                    <span className="text-xs text-slate-400 font-medium">{review.created_at}</span>
                                </div>
                            </div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-50 rounded-full text-slate-400">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="pl-14">
                        <h5 className="font-bold text-slate-900 mb-1">{review.title}</h5>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">{review.comment}</p>

                        {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mb-4">
                                {review.images.map((img, idx) => (
                                    <div key={idx} className="w-20 h-20 rounded-lg border border-slate-100 relative overflow-hidden cursor-zoom-in hover:opacity-90 transition-opacity">
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors group/like">
                                <ThumbsUp className="w-4 h-4 group-hover/like:fill-current" />
                                Hữu ích ({review.helpful_count})
                            </button>
                            <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                Gửi trả lời
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
