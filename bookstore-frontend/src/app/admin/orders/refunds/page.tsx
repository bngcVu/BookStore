"use client";

import React, { useState } from 'react';
import {
    AlertTriangle,
    Search,
    CheckCircle2,
    XCircle,
    MessageSquare,
    PackageX,
    Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_REFUNDS = [
    {
        id: "RF-8829-BS",
        orderId: "BS772390",
        customer: "Trần Thị B",
        reason: "Sách rách vỡ / móp méo",
        type: "Hoàn tiền",
        status: "pending",
        date: "12/03/2024",
        bookTitle: "Dune: Hành Tinh Cát",
        amount: 180000,
        desc: "Sách bị gãy gáy và nhăn mép rất nhiều, không giống mô tả.",
        images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=150"]
    },
    {
        id: "RF-1123-BS",
        orderId: "BS992123",
        customer: "Phạm D",
        reason: "Giao sai sản phẩm",
        type: "Đổi hàng",
        status: "approved",
        date: "11/03/2024",
        bookTitle: "Tư Duy Ngược",
        amount: 120000,
        desc: "Shop giao nhầm sách Khéo ăn nói thay vì Tư duy ngược.",
        images: []
    }
];

export default function RefundsManagementPage() {
    const [activeStatus, setActiveStatus] = useState('pending');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Xử lý Đổi trả & Hoàn tiền</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Duyệt các yêu cầu hoàn tiền và kiểm định lỗi sản phẩm</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Tìm mã Yêu cầu, mã Đơn..."
                            className="w-full pl-10 pr-4 h-10 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200">
                {[
                    { id: 'pending', label: 'Cần xử lý', count: 1 },
                    { id: 'approved', label: 'Đã duyệt', count: 1 },
                    { id: 'rejected', label: 'Từ chối', count: 0 }
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={cn(
                            "px-6 py-3 font-bold text-sm tracking-tight border-b-2 flex items-center gap-2 transition-colors",
                            activeStatus === tab.id
                                ? "border-primary text-primary"
                                : "border-transparent text-slate-500 hover:text-slate-900"
                        )}
                        onClick={() => setActiveStatus(tab.id)}
                    >
                        {tab.label}
                        <span className={cn("ml-1 px-1.5 py-0.5 rounded-md text-[10px]", activeStatus === tab.id ? "bg-primary/10" : "bg-slate-100")}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {MOCK_REFUNDS.filter(r => r.status === activeStatus).map((refund) => (
                    <div key={refund.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:border-orange-200 transition-colors">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 inline-block mb-1">Mã YC: {refund.id}</span>
                                <div className="flex items-center gap-2">
                                    <PackageX size={16} className="text-orange-500" />
                                    <h3 className="font-bold text-slate-900">Đơn hàng #{refund.orderId}</h3>
                                </div>
                            </div>
                            <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                refund.type === 'Hoàn tiền' ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                            )}>
                                {refund.type}
                            </span>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Product Info */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-slate-800 text-sm mb-1">{refund.bookTitle}</p>
                                    <p className="text-xs font-bold text-slate-500">Khách: {refund.customer} - {refund.date}</p>
                                </div>
                                <p className="font-black text-rose-500">{refund.amount.toLocaleString('vi-VN')} đ</p>
                            </div>

                            {/* Reason & Desc */}
                            <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                                <p className="font-bold text-orange-900 text-sm flex items-center gap-2 mb-2">
                                    <AlertTriangle size={14} className="text-orange-500" /> Lý do: {refund.reason}
                                </p>
                                <p className="text-sm text-slate-600 italic">"{refund.desc}"</p>
                            </div>

                            {/* Evidence Images */}
                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <ImageIcon size={12} /> Bằng chứng (Hình ảnh/Video)
                                </p>
                                {refund.images.length > 0 ? (
                                    <div className="flex gap-2">
                                        {refund.images.map((img, i) => (
                                            <div key={i} className="w-16 h-16 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-200 cursor-pointer hover:border-primary transition-colors">
                                                <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-400 font-bold italic">Không có hình ảnh đính kèm</p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        {refund.status === 'pending' && (
                            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    placeholder="Nhập ghi chú Admin (nếu có)..."
                                    className="flex-1 h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                />
                                <div className="flex gap-2 shrink-0">
                                    <Button variant="outline" className="h-10 text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300 gap-1 font-bold">
                                        <XCircle size={16} /> Từ chối
                                    </Button>
                                    <Button className="h-10 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 font-bold gap-1">
                                        <CheckCircle2 size={16} /> Duyệt Form
                                    </Button>
                                </div>
                            </div>
                        )}

                        {refund.status === 'approved' && (
                            <div className="p-4 border-t border-slate-100 bg-emerald-50 text-emerald-700 flex items-center justify-between">
                                <p className="text-xs font-bold flex items-center gap-2">
                                    <CheckCircle2 size={14} /> Đã duyệt lúc 10:30 - 13/03/2024
                                </p>
                                <Button variant="link" className="p-0 h-auto text-emerald-700 font-black text-xs gap-1">
                                    <MessageSquare size={14} /> Nhắn tin khách
                                </Button>
                            </div>
                        )}
                    </div>
                ))}

                {MOCK_REFUNDS.filter(r => r.status === activeStatus).length === 0 && (
                    <div className="lg:col-span-2 py-24 text-center text-slate-400">
                        <CheckCircle2 size={48} className="mx-auto mb-4 opacity-50 text-emerald-500" />
                        <p className="font-bold text-slate-500">Tuyệt vời, không có yêu cầu Đổi trả / Hoàn tiền nào!</p>
                    </div>
                )}
            </div>

        </div>
    );
}
