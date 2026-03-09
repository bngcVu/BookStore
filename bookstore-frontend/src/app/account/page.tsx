"use client";

import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    Calendar,
    ShieldCheck,
    Edit3,
    Camera,
    CheckCircle2,
    Settings,
    Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function AccountInfoPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSave = () => {
        setIsEditing(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
    };

    return (
        <div className="space-y-6">
            {/* 1. Header Area */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Thông tin tài khoản</h1>
                    <p className="text-sm text-slate-500 mt-1">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>
                {!isEditing ? (
                    <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="rounded-xl border-slate-200 font-bold gap-2"
                    >
                        <Edit3 size={16} /> Chỉnh sửa
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button
                            onClick={() => setIsEditing(false)}
                            variant="ghost"
                            className="rounded-xl font-bold"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="rounded-xl font-bold shadow-lg shadow-primary/20"
                        >
                            Lưu thay đổi
                        </Button>
                    </div>
                )}
            </div>

            {isSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 text-emerald-600 text-sm animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 size={18} />
                    <p>Cập nhật thông tin tài khoản thành công!</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 2. Avatar / Profile Summary */}
                <div className="lg:col-span-1 flex flex-col items-center gap-6 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit">
                    <div className="relative">
                        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-4xl border-4 border-white shadow-xl">
                            NA
                        </div>
                        <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary transition-colors">
                            <Camera size={18} />
                        </button>
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-slate-900">Nguyễn Văn A</h2>
                        <p className="text-sm text-slate-500 mt-1">Thành viên từ: 15/05/2023</p>
                    </div>
                    <div className="w-full pt-6 border-t border-slate-50 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-sm px-2">
                            <span className="text-slate-500">Hạng thành viên</span>
                            <span className="font-bold text-accent">Bạc</span>
                        </div>
                        <div className="flex items-center justify-between text-sm px-2">
                            <span className="text-slate-500">Điểm tích lũy</span>
                            <span className="font-bold text-primary">1,250 pts</span>
                        </div>
                    </div>
                </div>

                {/* 3. Detailed Info Form */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Họ và tên</label>
                            <Input
                                disabled={!isEditing}
                                defaultValue="Nguyễn Văn A"
                                className={cn(
                                    "h-12 rounded-xl border-slate-100",
                                    !isEditing ? "bg-slate-50 italic text-slate-500" : "bg-white"
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Số điện thoại</label>
                            <Input
                                disabled={!isEditing}
                                defaultValue="0912 345 678"
                                className={cn(
                                    "h-12 rounded-xl border-slate-100",
                                    !isEditing ? "bg-slate-50 italic text-slate-500" : "bg-white"
                                )}
                            />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <label className="text-sm font-bold text-slate-700">Email (Không thể thay đổi)</label>
                            <div className="relative">
                                <Input
                                    disabled={true}
                                    defaultValue="admin@gmail.com"
                                    className="h-12 rounded-xl bg-slate-50 text-slate-500 italic border-slate-100 pr-12"
                                />
                                <ShieldCheck size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Ngày sinh</label>
                            <Input
                                type="date"
                                disabled={!isEditing}
                                className={cn(
                                    "h-12 rounded-xl border-slate-100",
                                    !isEditing ? "bg-slate-50 text-slate-500" : "bg-white"
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Giới tính</label>
                            <div className="flex gap-4 pt-2">
                                {["Nam", "Nữ", "Khác"].map((gender) => (
                                    <label key={gender} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="gender"
                                            disabled={!isEditing}
                                            defaultChecked={gender === "Nam"}
                                            className="w-4 h-4 text-primary focus:ring-primary border-slate-200"
                                        />
                                        <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">{gender}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-100 space-y-4">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <Lock size={18} className="text-primary" /> Bảo mật tài khoản
                        </h3>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div>
                                <p className="font-bold text-sm text-slate-900">Mật khẩu đăng nhập</p>
                                <p className="text-xs text-slate-500">Bạn đã cập nhật mật khẩu cách đây 3 tháng</p>
                            </div>
                            <Button variant="outline" className="rounded-xl border-slate-200 text-xs font-bold whitespace-nowrap">
                                Thay đổi mật khẩu
                            </Button>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div>
                                <p className="font-bold text-sm text-slate-900">Xác thực 2 lớp (2FA)</p>
                                <p className="text-xs text-slate-500">Giúp bảo mật tài khoản tốt hơn bằng SMS/Email</p>
                            </div>
                            <Button variant="outline" className="rounded-xl border-slate-200 text-xs font-bold whitespace-nowrap">
                                Thiết lập ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
