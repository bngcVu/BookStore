"use client";

import React, { useState } from 'react';
import {
    MessageSquare,
    Star,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Flag,
    User,
    Image as ImageIcon,
    ChevronRight,
    Reply,
    EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BEST_SELLERS } from '@/lib/mockData';

const MOCK_REVIEWS = [
    {
        id: "REV-101",
        user: "Trần Thế Vinh",
        bookTitle: "Đắc Nhân Tâm",
        rating: 5,
        comment: "Sách rất hay, đóng gói cẩn thận, shipper nhiệt tình. Sẽ ủng hộ shop dài dài!",
        date: "12/03/2024",
        status: "visible",
        hasImages: true,
        avatar: "V"
    },
    {
        id: "REV-102",
        user: "Lê Minh Tuấn",
        bookTitle: "Nhà Giả Kim",
        rating: 2,
        comment: "Giao hàng hơi chậm, sách bị móp góc một chút. Mong shop cải thiện khâu vận chuyển.",
        date: "11/03/2024",
        status: "pending",
        hasImages: false,
        avatar: "T"
    },
    {
        id: "REV-103",
        user: "Nguyễn Thị Mai",
        bookTitle: "Harry Potter",
        rating: 5,
        comment: "Tuyệt vời, bản in đẹp, dịch hay. Bé nhà mình rất thích.",
        date: "10/03/2024",
        status: "visible",
        hasImages: true,
        avatar: "M"
    },
    {
        id: "REV-104",
        user: "Nick Name",
        bookTitle: "Fake News Book",
        rating: 1,
        comment: "Spam content, lừa đảo, không nên mua nha mọi người!!!!",
        date: "09/03/2024",
        status: "hidden",
        hasImages: false,
        avatar: "N"
    },
];

export default function ReviewsManagementPage() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <MessageSquare className="text-blue-500" /> Quản lý Đánh giá
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Duyệt nội dung bình luận, ẩn đánh giá tiêu cực hoặc spam</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                        <div className="flex items-center gap-1 text-amber-500 font-black">
                            <Star size={16} className="fill-amber-500" /> 4.8
                        </div>
                        <div className="w-px h-4 bg-slate-200" />
                        <p className="text-xs font-bold text-slate-500 italic">Dựa trên 1,240 đánh giá</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200">
                {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'pending', label: 'Chờ duyệt', count: 1 },
                    { id: 'flagged', label: 'Bị báo cáo', count: 0 }
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={cn(
                            "px-6 py-3 font-bold text-sm tracking-tight border-b-2 flex items-center gap-2 transition-colors",
                            activeTab === tab.id
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-slate-500 hover:text-slate-900"
                        )}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className={cn("ml-1 px-1.5 py-0.5 rounded-md text-[10px]", activeTab === tab.id ? "bg-blue-100" : "bg-slate-100")}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Grid of Reviews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {MOCK_REVIEWS.filter(r => activeTab === 'all' || (activeTab === 'pending' && r.status === 'pending')).map((rev) => (
                    <div key={rev.id} className={cn(
                        "bg-white rounded-2xl border transition-all overflow-hidden",
                        rev.status === 'hidden' ? "opacity-60 grayscale border-slate-200" : "border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md"
                    )}>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500 text-xs border border-slate-200">
                                        {rev.avatar}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 text-sm">{rev.user}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{rev.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={cn(i < rev.rating ? "text-amber-500 fill-amber-500" : "text-slate-200")} />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded tracking-tighter">Sách</span>
                                    <p className="text-sm font-bold text-slate-800 line-clamp-1 italic">"{rev.bookTitle}"</p>
                                </div>

                                <p className="text-sm text-slate-600 leading-relaxed font-medium line-clamp-3">
                                    {rev.comment}
                                </p>

                                {rev.hasImages && (
                                    <div className="flex gap-2 pt-1">
                                        <div
                                            className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-slate-300 cursor-pointer hover:border-blue-300"
                                            onClick={() => alert("Mở trình xem ảnh đầy đủ...")}
                                        >
                                            <ImageIcon size={18} />
                                            <span className="text-[8px] font-black mt-0.5 uppercase tracking-tighter">View</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {rev.status === 'pending' ? (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 px-3 text-emerald-600 hover:bg-emerald-50 font-bold gap-1 text-[11px] uppercase tracking-wider"
                                            onClick={() => alert(`Đã phê duyệt đánh giá của ${rev.user}`)}
                                        >
                                            <CheckCircle2 size={14} /> Duyệt
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 px-3 text-rose-500 hover:bg-rose-50 font-bold gap-1 text-[11px] uppercase tracking-wider"
                                            onClick={() => alert(`Đã ẩn đánh giá của ${rev.user}`)}
                                        >
                                            <XCircle size={14} /> Ẩn đi
                                        </Button>
                                    </>
                                ) : rev.status === 'visible' ? (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 px-3 text-blue-600 hover:bg-blue-50 font-bold gap-1 text-[11px] uppercase tracking-wider"
                                            onClick={() => alert(`Mở khung phản hồi đến ${rev.user}...`)}
                                        >
                                            <Reply size={14} /> Phản hồi
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 px-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 font-bold gap-1 text-[11px] uppercase tracking-wider"
                                            onClick={() => confirm(`Bạn muốn ẩn đánh giá này khỏi trang sản phẩm?`) && alert("Đã ẩn (Mô phỏng)")}
                                        >
                                            <EyeOff size={14} /> Ẩn
                                        </Button>
                                    </>
                                ) : (
                                    <span className="text-[10px] font-black uppercase text-slate-400 px-3">Bình luận bị ẩn</span>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0 text-slate-300 hover:text-slate-500"
                                onClick={() => alert("Gửi báo cáo vi phạm nội dung đến hệ thống quản trị nội dung nâng cao...")}
                            >
                                <Flag size={14} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
