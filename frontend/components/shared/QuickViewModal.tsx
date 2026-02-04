"use client";
import { X, Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { Book } from "@/types";
import { useState, useEffect } from 'react';

interface QuickViewModalProps {
    book: Book | null;
    isOpen: boolean;
    onClose: () => void;
}

export function QuickViewModal({ book, isOpen, onClose }: QuickViewModalProps) {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsClosing(false);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 200);
    };

    if (!isOpen || !book) return null;

    const discountPercent = book.original_price && book.base_price < book.original_price
        ? Math.round(((book.original_price - book.base_price) / book.original_price) * 100)
        : 0;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                onClick={handleClose}
            ></div>

            {/* Modal Content */}
            <div className={`
                relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden
                flex flex-col md:flex-row transition-all duration-300 transform
                ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
            `}>
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur-md rounded-full text-slate-500 hover:bg-slate-100 hover:text-red-500 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left: Image Gallery (Single Image for now) */}
                <div className="w-full md:w-2/5 md:bg-slate-50 flex items-center justify-center p-8 relative">
                    {discountPercent > 0 && (
                        <span className="absolute top-8 left-8 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm z-10">
                            -{discountPercent}%
                        </span>
                    )}
                    <div className="relative w-48  md:w-64 shadow-2xl shadow-slate-900/20 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
                        <img
                            src={book.image_url}
                            alt={book.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-3/5 p-8 flex flex-col">
                    <div className="mb-1">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{book.publisher_name || "Nhà xuất bản"}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 leading-tight">
                        {book.title}
                    </h2>
                    <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                        {book.authors && <span>Tác giả: <span className="text-slate-900 font-medium">{book.authors.join(", ")}</span></span>}
                        <div className="flex items-center gap-1 text-slate-900 font-bold bg-yellow-50 px-2 py-0.5 rounded-md border border-yellow-100">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span>{book.avg_rating}</span>
                            <span className="text-slate-400 font-normal">({book.review_count} đánh giá)</span>
                        </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-8 line-clamp-4">
                        {book.description || "Cuốn sách tuyệt vời này sẽ mang đến cho bạn những trải nghiệm thú vị..."}
                    </p>

                    {/* Price & Cart Actions */}
                    <div className="mt-auto p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex flex-wrap items-end gap-3 mb-6">
                            <span className="text-3xl font-black text-slate-900">${book.base_price}</span>
                            {book.original_price && book.original_price > book.base_price && (
                                <span className="text-lg text-slate-400 line-through mb-1">${book.original_price}</span>
                            )}
                            {discountPercent > 0 && (
                                <span className="text-sm font-medium text-red-500 mb-1.5">Tiết kiệm {discountPercent}%</span>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                                <ShoppingCart className="w-5 h-5" />
                                Thêm vào giỏ
                            </button>
                            <button className="px-4 py-3.5 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 rounded-xl transition-all">
                                <Heart className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-xs font-medium text-green-600">
                            <Check className="w-4 h-4" />
                            <span>Còn hàng tại kho</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
