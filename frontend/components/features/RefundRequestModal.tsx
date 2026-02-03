"use client";

import React, { useState } from "react";
import { X, UploadCloud, AlertCircle } from "lucide-react";

interface RefundRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    orderId: number | string;
}

export function RefundRequestModal({ isOpen, onClose, onSubmit, orderId }: RefundRequestModalProps) {
    const [reason, setReason] = useState("wrong_item");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState<File[]>([]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            order_id: orderId,
            reason,
            description,
            images: files.map(f => f.name) // Mock images
        });
        onClose();
        alert("Yêu cầu hoàn tiền đã được gửi thành công!");
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 z-10 border border-slate-100 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <h3 className="font-heading font-black text-xl text-slate-900">Yêu cầu hoàn tiền/Trả hàng</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">

                    {/* Notice */}
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-800 leading-relaxed">
                            Yêu cầu sẽ được xử lý trong vòng 24h. Vui lòng giữ nguyên hiện trạng sản phẩm để quá trình đổi trả diễn ra thuận lợi.
                        </p>
                    </div>

                    {/* Reason */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 uppercase tracking-wide">Lý do hoàn tiền</label>
                        <select
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        >
                            <option value="wrong_item">Giao sai sản phẩm</option>
                            <option value="damaged">Sản phẩm bị lỗi/hư hỏng</option>
                            <option value="not_as_described">Không giống mô tả</option>
                            <option value="missing_parts">Thiếu phụ kiện/quà tặng</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 uppercase tracking-wide">Chi tiết vấn đề</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Mô tả chi tiết tình trạng sản phẩm..."
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none min-h-[120px] resize-none"
                            required
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 uppercase tracking-wide">Hình ảnh minh chứng</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                            <UploadCloud className="w-10 h-10 mb-2 group-hover:text-primary transition-colors" />
                            <span className="text-sm font-bold">Kéo thả hoặc click để tải ảnh lên</span>
                            <span className="text-xs mt-1">Hỗ trợ JPG, PNG (Tối đa 5 ảnh)</span>
                        </div>
                    </div>

                </form>

                {/* Footer */}
                <div className="p-6 border-t border-slate-50 bg-slate-50/50 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-white border border-slate-200 rounded-xl font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition-all active:scale-95"
                    >
                        Gửi yêu cầu
                    </button>
                </div>

            </div>
        </div>
    );
}
