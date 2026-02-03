"use client";

import React, { useState } from 'react';
import { Star, Camera, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ReviewForm() {
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1000));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Cảm ơn đánh giá của bạn!</h3>
                <p className="text-green-700">Nhận xét của bạn đang được duyệt và sẽ hiển thị sớm nhất.</p>
                <button
                    onClick={() => { setSubmitted(false); setTitle(''); setComment(''); setRating(5); }}
                    className="mt-6 text-sm font-bold text-green-700 hover:text-green-800 underline"
                >
                    Viết đánh giá khác
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">Viết nhận xét của bạn</h3>

            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Đánh giá chung</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                className="focus:outline-none transition-transform active:scale-95 hover:scale-110"
                            >
                                <Star
                                    className={cn(
                                        "w-8 h-8 transition-colors",
                                        (hoverRating || rating) >= star ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-200"
                                    )}
                                />
                            </button>
                        ))}
                        <span className="ml-3 text-sm font-bold text-slate-700 py-1.5">
                            {hoverRating || rating === 5 ? 'Tuyệt vời' :
                                hoverRating || rating === 4 ? 'Hài lòng' :
                                    hoverRating || rating === 3 ? 'Bình thường' :
                                        hoverRating || rating === 2 ? 'Không thích' : 'Rất tệ'}
                        </span>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tiêu đề nhận xét</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Tóm tắt ngắn gọn trải nghiệm của bạn..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Chia sẻ cảm nhận</label>
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Bạn thích (hoặc không thích) điều gì ở cuốn sách này? Chi tiết càng tốt nhé..."
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all resize-none"
                        required
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button type="button" className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all">
                        <Camera className="w-4 h-4" />
                        Thêm ảnh
                    </button>
                    <span className="text-xs text-slate-400 font-medium">Tối đa 5 ảnh (JPEG, PNG)</span>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary bg-primary text-white font-black py-4 rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi Nhận Xét'}
                </button>
            </div>
        </form>
    );
}
