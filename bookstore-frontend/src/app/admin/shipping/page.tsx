"use client";

import React, { useState } from 'react';
import {
    Truck,
    MapPin,
    Edit3,
    Search,
    CheckCircle2,
    Package,
    Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_CARRIERS = [
    { id: "GHTK", name: "Giao Hàng Tiết Kiệm", code: "ghtk", active: true, baseFee: 25000, freeShip: 150000, logo: "🚚" },
    { id: "GHN", name: "Giao Hàng Nhanh", code: "ghn", active: true, baseFee: 30000, freeShip: 200000, logo: "🚀" },
    { id: "VNPOST", name: "Bưu Điện Việt Nam", code: "vnpost", active: false, baseFee: 20000, freeShip: 300000, logo: "📮" }
];

export default function ShippingManagementPage() {
    const [activeTab, setActiveTab] = useState('carriers');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Đối tác Vận chuyển</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Quản lý Bảng giá (Rates) và Tích hợp API vận chuyển</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="font-bold border-slate-200">Test API</Button>
                    <Button className="font-bold bg-primary hover:bg-primary/90 text-white gap-2">
                        <Plus size={16} /> Thêm Đối Tác
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200">
                {[
                    { id: 'carriers', label: 'Tất cả Đơn vị', count: 3 },
                    { id: 'rates', label: 'Cấu hình Fees/Rates' },
                    { id: 'provinces', label: 'Khu vực (Provinces)' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={cn(
                            "px-6 py-3 font-bold text-sm tracking-tight border-b-2 flex items-center gap-2 transition-colors",
                            activeTab === tab.id
                                ? "border-primary text-primary"
                                : "border-transparent text-slate-500 hover:text-slate-900"
                        )}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className={cn("ml-1 px-1.5 py-0.5 rounded-md text-[10px]", activeTab === tab.id ? "bg-primary/10" : "bg-slate-100")}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {activeTab === 'carriers' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_CARRIERS.map(carrier => (
                        <div key={carrier.id} className={cn(
                            "bg-white rounded-3xl p-6 border transition-all hover:shadow-xl group",
                            carrier.active ? "border-primary/30 shadow-sm" : "border-slate-100 opacity-60 grayscale hover:grayscale-0"
                        )}>
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
                                    {carrier.logo}
                                </div>
                                <div className="flex items-center gap-2">
                                    {carrier.active ? (
                                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
                                        </span>
                                    ) : (
                                        <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Disabled</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-black text-slate-900 leading-tight">{carrier.name}</h3>
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1 mb-6">Mã API: {carrier.code}</p>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Package size={16} /> <span className="text-xs font-bold">Phí cơ bản</span>
                                        </div>
                                        <span className="font-black text-slate-900">{carrier.baseFee.toLocaleString('vi-VN')} đ</span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-primary/5 border border-primary/10 rounded-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2"></div>
                                        <div className="flex items-center gap-2 text-primary relative z-10">
                                            <Truck size={16} /> <span className="text-xs font-black uppercase tracking-wider">Freeship từ</span>
                                        </div>
                                        <span className="font-black text-primary relative z-10">{carrier.freeShip.toLocaleString('vi-VN')} đ</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <Button variant="outline" size="sm" className="font-bold border-slate-200 gap-2 w-full hover:border-primary/30 hover:text-primary transition-all">
                                        <Edit3 size={14} /> Cấu hình API & Giá
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab !== 'carriers' && (
                <div className="py-24 text-center">
                    <h3 className="text-lg font-bold text-slate-400 animate-pulse">Tính năng cấu hình tỷ lệ vùng miền đang cập nhật...</h3>
                </div>
            )}
        </div>
    );
}
