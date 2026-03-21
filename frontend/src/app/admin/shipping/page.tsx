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
    const [searchQuery, setSearchQuery] = useState('');

    const MOCK_PROVINCE_RATES = [
        { code: "VN-HN", name: "Hà Nội", carrier: "GHTK", base_fee: 22000, per_kg: 5000, threshold: 150000 },
        { code: "VN-HCM", name: "TP. Hồ Chí Minh", carrier: "GHN", base_fee: 25000, per_kg: 7000, threshold: 200000 },
        { code: "VN-DN", name: "Đà Nẵng", carrier: "GHTK", base_fee: 28000, per_kg: 6000, threshold: 180000 },
        { code: "VN-HP", name: "Hải Phòng", carrier: "GHN", base_fee: 24000, per_kg: 5500, threshold: 150000 },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Đối tác Vận chuyển</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Quản lý Bảng giá (Rates) và Tích hợp API vận chuyển</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="font-bold border-slate-200"
                        onClick={() => alert("Đang kiểm tra kết nối API với các đơn vị vận chuyển...")}
                    >
                        Test API
                    </Button>
                    <Button
                        className="font-bold bg-primary hover:bg-primary/90 text-white gap-2"
                        onClick={() => alert("Mở form tích hợp Đối tác vận chuyển mới...")}
                    >
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
                                        <span className="font-black text-slate-900" suppressHydrationWarning>{carrier.baseFee.toLocaleString('vi-VN')} đ</span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-primary/5 border border-primary/10 rounded-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2"></div>
                                        <div className="flex items-center gap-2 text-primary relative z-10">
                                            <Truck size={16} /> <span className="text-xs font-black uppercase tracking-wider">Freeship từ</span>
                                        </div>
                                        <span className="font-black text-primary relative z-10" suppressHydrationWarning>{carrier.freeShip.toLocaleString('vi-VN')} đ</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="font-bold border-slate-200 gap-2 w-full hover:border-primary/30 hover:text-primary transition-all"
                                        onClick={() => alert(`Mở bảng cấu hình nâng cao cho đơn vị: ${carrier.name}`)}
                                    >
                                        <Edit3 size={14} /> Cấu hình API & Giá
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab !== 'carriers' && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="relative w-64 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Tìm Tỉnh/Thành..."
                                className="w-full pl-10 pr-4 h-9 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button size="sm" className="font-bold gap-2">
                            Cập nhật hàng loạt
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                                <tr>
                                    <th className="p-4">Khu vực / Tỉnh thành</th>
                                    <th className="p-4">Đối tác mặc định</th>
                                    <th className="p-4">Phí cơ bản (Base)</th>
                                    <th className="p-4">Phụ phí /kg</th>
                                    <th className="p-4">Ngưỡng Freeship</th>
                                    <th className="p-4 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {MOCK_PROVINCE_RATES.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())).map((rate) => (
                                    <tr key={rate.code} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="p-4">
                                            <p className="font-bold text-slate-900">{rate.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{rate.code}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-black">{rate.carrier}</span>
                                        </td>
                                        <td className="p-4">
                                            <input
                                                type="text"
                                                className="w-24 bg-transparent border-b border-transparent focus:border-primary focus:outline-none font-bold text-slate-700"
                                                defaultValue={rate.base_fee.toLocaleString('vi-VN')}
                                                suppressHydrationWarning
                                            /> đ
                                        </td>
                                        <td className="p-4 font-medium text-slate-600" suppressHydrationWarning>
                                            +{rate.per_kg.toLocaleString('vi-VN')} đ
                                        </td>
                                        <td className="p-4">
                                            <span className="font-bold text-emerald-600" suppressHydrationWarning>{rate.threshold.toLocaleString('vi-VN')} đ</span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-primary font-black text-xs hover:bg-primary/10"
                                                onClick={() => alert(`Đã cập nhật cấu hình vận chuyển cho ${rate.name}`)}
                                            >
                                                Lưu
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
