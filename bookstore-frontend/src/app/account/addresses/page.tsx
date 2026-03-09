"use client";

import React, { useState } from 'react';
import {
    MapPin,
    Plus,
    MoreVertical,
    Edit2,
    Trash2,
    CheckCircle2,
    Home,
    Briefcase,
    Globe,
    Compass,
    Map
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_ADDRESSES = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        phone: "0345 678 901",
        addressLine: "Số 123, Đường Lê Lợi, Phường Bến Thành",
        cityDistrict: "Quận 1, TP. Hồ Chí Minh",
        isDefault: true,
        type: "home",
        typeLabel: "Nhà riêng",
        icon: Home
    },
    {
        id: 2,
        name: "Nguyễn Văn A (Văn phòng)",
        phone: "0912 345 678",
        addressLine: "Tòa nhà Landmark 81, số 720A Điện Biên Phủ",
        cityDistrict: "Quận Bình Thạnh, TP. Hồ Chí Minh",
        isDefault: false,
        type: "office",
        typeLabel: "Văn phòng",
        icon: Briefcase
    }
];

export default function AddressBookPage() {
    const [addresses, setAddresses] = useState(MOCK_ADDRESSES);

    return (
        <div className="space-y-6">
            {/* 1. Header Area */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sổ địa chỉ</h1>
                    <p className="text-sm text-slate-500 mt-1">Lưu trữ địa chỉ nhận hàng để thanh toán nhanh hơn</p>
                </div>
                <Button className="rounded-xl font-bold gap-2 shadow-lg shadow-primary/20 h-11 px-6">
                    <Plus size={18} /> Thêm địa chỉ mới
                </Button>
            </div>

            {/* 2. Visual Map Background (Decoration) */}
            <div className="relative h-48 bg-slate-200 rounded-3xl overflow-hidden border border-slate-100 group">
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i14!2i13076!3i8455!2m3!1e0!2sm!3i407105151!3m8!2sen!3suk!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-2 mb-1">
                        <Compass className="animate-spin-slow" size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest opacity-80">Định vị địa chỉ</span>
                    </div>
                    <h3 className="text-lg font-black tracking-tight">Vị trí giao hàng nhanh nhất</h3>
                </div>
                <Map className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20" size={120} />
            </div>

            {/* 3. Addresses List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => {
                    const Icon = addr.icon;
                    return (
                        <div
                            key={addr.id}
                            className={cn(
                                "relative bg-white rounded-3xl border p-6 flex flex-col gap-4 transition-all hover:shadow-xl hover:shadow-slate-200/50 group",
                                addr.isDefault ? "border-primary/30 ring-1 ring-primary/10 shadow-lg shadow-primary/5" : "border-slate-100"
                            )}
                        >
                            {/* Card Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm",
                                        addr.isDefault ? "bg-primary text-white" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                                    )}>
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">{addr.typeLabel}</span>
                                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                            {addr.name}
                                            {addr.isDefault && (
                                                <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-black border border-emerald-200 ring-4 ring-emerald-50 shadow-sm">
                                                    <CheckCircle2 size={10} /> Mặc định
                                                </span>
                                            )}
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                                        <Edit2 size={16} />
                                    </button>
                                    {!addr.isDefault && (
                                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="space-y-2 mt-2">
                                <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50/50 p-2 rounded-xl border border-slate-50">
                                    <Globe size={14} className="text-slate-400 shrink-0" />
                                    <p className="font-medium truncate">{addr.addressLine}</p>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50/50 p-2 rounded-xl border border-slate-50">
                                    <MapPin size={14} className="text-slate-400 shrink-0" />
                                    <p className="font-medium truncate">{addr.cityDistrict}</p>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="mt-2 pt-4 border-t border-slate-50 flex items-center justify-between">
                                <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> {addr.phone}
                                </p>
                                {!addr.isDefault && (
                                    <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-4">
                                        Đặt làm mặc định
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* 4. Empty Slot / Call to Action */}
                <button className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all min-h-[220px] group">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus size={32} />
                    </div>
                    <p className="font-black uppercase tracking-widest text-xs">Thêm địa chỉ giao hàng</p>
                </button>
            </div>
        </div>
    );
}
