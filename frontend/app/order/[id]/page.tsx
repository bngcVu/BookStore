"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { userAPI } from "@/lib/api-mock";
import { Order } from "@/types";
import { ChevronLeft, Package, MapPin, Truck, AlertCircle, CheckCircle2, Clock, XCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { formatCurrency, cn } from "@/lib/utils";
import { RefundRequestModal } from "@/components/features/RefundRequestModal";

export default function OrderDetailPage() {
    const params = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

    useEffect(() => {
        async function loadOrder() {
            if (!params.id) return;
            // Ensure params.id is treated as a number since our mock API expects a number
            const orderData = await userAPI.getOrderById(Number(params.id));
            setOrder(orderData);
            setLoading(false);
        }
        loadOrder();
    }, [params.id]);

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Đang tải...</div>;
    if (!order) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Không tìm thấy đơn hàng</div>;

    const timeline = [
        { status: "pending", label: "Đặt hàng thành công", date: order.created_at, done: true },
        { status: "processing", label: "Đã xác nhận", date: order.created_at, done: ['processing', 'shipping', 'delivered'].includes(order.status) },
        { status: "shipping", label: "Đang giao hàng", date: null, done: ['shipping', 'delivered'].includes(order.status) },
        { status: "delivered", label: "Giao thành công", date: null, done: order.status === 'delivered' }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return "text-emerald-500 bg-emerald-50 border-emerald-100";
            case 'shipping': return "text-blue-500 bg-blue-50 border-blue-100";
            case 'cancelled': return "text-red-500 bg-red-50 border-red-100";
            default: return "text-amber-500 bg-amber-50 border-amber-100";
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-24">
                <div className="max-w-5xl mx-auto">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-8">
                        <Link href="/profile" className="flex items-center gap-1 text-slate-500 hover:text-primary font-bold text-sm">
                            <ChevronLeft className="w-4 h-4" />
                            Quay lại
                        </Link>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-900 font-bold text-sm">Chi tiết đơn hàng #{order.order_number}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Status Card */}
                            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={cn("px-4 py-1.5 rounded-full font-black uppercase tracking-wider text-xs border flex items-center gap-2", getStatusColor(order.status))}>
                                        {order.status === 'delivered' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                        {order.status === 'delivered' ? "Giao thành công" :
                                            order.status === 'shipping' ? "Đang vận chuyển" :
                                                "Đang xử lý"}
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-auto">
                                        Ngày đặt: {new Date(order.created_at).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>

                                {/* Timeline */}
                                <div className="relative flex justify-between">
                                    {/* Connecting Line */}
                                    <div className="absolute top-3 left-0 right-0 h-0.5 bg-slate-100 -z-10"></div>

                                    {timeline.map((step, index) => (
                                        <div key={index} className="flex flex-col items-center gap-2">
                                            <div className={cn(
                                                "w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white z-10 transition-colors",
                                                step.done ? "border-primary bg-primary text-white" : "border-slate-200 text-slate-300"
                                            )}>
                                                {step.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                                            </div>
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider text-center max-w-[80px]",
                                                step.done ? "text-slate-900" : "text-slate-300"
                                            )}>
                                                {step.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                                    <h3 className="font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                                        <Package className="w-5 h-5 text-primary" />
                                        Sản phẩm ({order.items.length})
                                    </h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-20 h-28 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                                                <img src={item.book.primary_image} alt={item.book.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2">{item.book.title}</h4>
                                                <p className="text-xs text-slate-500 mb-2">Tác giả: {item.book.authors}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-slate-500">x{item.quantity}</span>
                                                    <span className="text-sm font-black text-slate-900">{formatCurrency(item.price)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">

                            {/* Shipping Info */}
                            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm space-y-4">
                                <h3 className="font-heading font-black text-slate-900 text-sm uppercase tracking-wider mb-2">Thông tin nhận hàng</h3>

                                <div className="flex gap-3">
                                    <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Nguyễn Văn A</p>
                                        <p className="text-xs text-slate-500">0987654321</p>
                                        <p className="text-xs text-slate-500 mt-1">{order.shipping_address}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-slate-50">
                                    <Truck className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Giao hàng tiêu chuẩn</p>
                                        <p className="text-xs text-slate-500">Giao hàng bởi Viettel Post</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Summary */}
                            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                                <h3 className="font-heading font-black text-slate-900 text-sm uppercase tracking-wider mb-4">Thanh toán</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-slate-500">
                                        <span>Tổng tiền hàng</span>
                                        <span className="font-medium text-slate-900">{formatCurrency(order.total_amount)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Phí vận chuyển</span>
                                        <span className="font-medium text-slate-900">{formatCurrency(30000)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Giảm giá</span>
                                        <span className="font-medium text-emerald-500">-{formatCurrency(0)}</span>
                                    </div>
                                    <div className="pt-3 mt-3 border-t border-slate-50 flex justify-between items-end">
                                        <span className="font-bold text-slate-900">Tổng cộng</span>
                                        <span className="text-xl font-black text-rose-500">{formatCurrency(order.total_amount + 30000)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            {order.status === 'delivered' && (
                                <button
                                    onClick={() => setIsRefundModalOpen(true)}
                                    className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-50 hover:text-rose-500 transition-colors flex items-center justify-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Yêu cầu hoàn tiền / Trả hàng
                                </button>
                            )}

                        </div>

                    </div>

                </div>
            </main>

            <Footer />

            <RefundRequestModal
                isOpen={isRefundModalOpen}
                onClose={() => setIsRefundModalOpen(false)}
                onSubmit={(data) => console.log(data)}
                orderId={order.id}
            />
        </div>
    );
}
