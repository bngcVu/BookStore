"use client";

import React, { useState } from "react";
import { Order } from "@/types";
import { Package, Truck, CheckCircle2, Clock, ChevronRight, RefreshCw, XCircle, AlertCircle } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface OrderHistoryListProps {
    orders: Order[];
}

export function OrderHistoryList({ orders }: OrderHistoryListProps) {
    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-slate-100 shadow-sm text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Package className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Chưa có đơn hàng nào</h3>
                <p className="text-slate-500 mb-8 max-w-xs mx-auto">Hãy đặt mua cuốn sách đầu tiên của bạn ngay hôm nay.</p>
                <Link
                    href="/"
                    className="px-8 py-3.5 bg-primary text-white rounded-xl font-bold uppercase tracking-wider text-xs hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
                >
                    Khám phá sách hay
                </Link>
            </div>
        );
    }

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'pending': return { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', label: 'Chờ xử lý' };
            case 'shipping': return { icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', label: 'Đang giao hàng' };
            case 'delivered': return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', label: 'Giao thành công' };
            case 'cancelled': return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', label: 'Đã hủy' };
            case 'refunded': return { icon: RefreshCw, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100', label: 'Hoàn tiền' };
            default: return { icon: AlertCircle, color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-100', label: status };
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {orders.map((order) => {
                const status = getStatusConfig(order.status);
                const Icon = status.icon;

                // Mock first item for display
                const firstItem = order.items?.[0] || { title: "Sách chưa xác định", image: "https://placehold.co/400x600", quantity: 1, price: 0 };
                const otherItemsCount = (order.items?.length || 0) - 1;

                return (
                    <div key={order.id} className="bg-white rounded-[24px] border border-slate-100 p-5 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 group">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-4">
                            <div className="flex items-center gap-3">
                                <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border", status.bg, status.color, status.border)}>
                                    <Icon className="w-3 h-3" />
                                    {status.label}
                                </div>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">
                                    {new Date(order.created_at).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <span className="font-bold text-slate-900 text-sm">#{order.order_number}</span>
                        </div>

                        {/* Content */}
                        <div className="flex gap-4 items-center">
                            <div className="w-16 h-20 bg-slate-50 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                                {/* Use mock image if item image missing */}
                                <img
                                    src={firstItem.book?.primary_image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"}
                                    alt={firstItem.book?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-900 line-clamp-1 mb-1">{firstItem.book?.title}</h4>
                                <p className="text-xs text-slate-500 mb-2">
                                    {firstItem.quantity} x {formatCurrency(firstItem.price)}
                                </p>
                                {otherItemsCount > 0 && (
                                    <p className="text-[10px] text-slate-400 font-medium italic">
                                        ...và {otherItemsCount} sản phẩm khác
                                    </p>
                                )}
                            </div>
                            <div className="text-right pl-4 border-l border-slate-100">
                                <p className="text-xs text-slate-500 font-medium mb-1">Tổng tiền</p>
                                <p className="text-lg font-black text-rose-500 tracking-tight">{formatCurrency(order.total_amount)}</p>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-end gap-3">
                            <Link
                                href={`/order/${order.id}`}
                                className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors flex items-center gap-2 group-hover:bg-primary group-hover:text-white"
                            >
                                Chi tiết
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
