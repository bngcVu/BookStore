"use client";

import React, { useState, useRef } from 'react';
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
import { USER_PROFILE } from '@/lib/mockData';

export default function AccountInfoPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
                // Hiển thị toast thành công
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            };
            reader.readAsDataURL(file);
        }
    };

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
                <div className="lg:col-span-1 flex flex-col items-center gap-6 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit relative overflow-hidden">
                    {/* Decorative background based on tier */}
                    <div className={cn("absolute top-0 w-full h-32 opacity-20 -z-10", USER_PROFILE.loyalty.bg)}></div>

                    <div className="relative mt-2">
                        <div className={cn("w-32 h-32 rounded-full flex items-center justify-center font-black text-4xl border-4 border-white shadow-xl relative z-10 bg-white overflow-hidden", USER_PROFILE.loyalty.color)}>
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                            ) : (
                                USER_PROFILE.name.charAt(0)
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary transition-colors z-20 cursor-pointer"
                        >
                            <Camera size={18} />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="text-center">
                        <h2 className="text-xl font-bold text-slate-900">{USER_PROFILE.name}</h2>
                        <p className="text-sm text-slate-500 mt-1">Thành viên từ: {USER_PROFILE.joinDate}</p>
                    </div>

                    {/* Loyalty Tier Dashboard */}
                    <div className="w-full pt-6 border-t border-slate-100 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-500 text-sm font-medium">Hạng hiện tại</span>
                            <div className={cn("px-3 py-1 rounded-full text-xs font-bold font-mono", USER_PROFILE.loyalty.bg, USER_PROFILE.loyalty.color)}>
                                Lvl. {USER_PROFILE.loyalty.tier}
                            </div>
                        </div>

                        {/* Progress Bar (Goal Gradient Effect) */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Đã chi: {(USER_PROFILE.loyalty.currentSpend).toLocaleString('vi-VN')}đ</span>
                                <span>{(USER_PROFILE.loyalty.targetSpend).toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={cn("h-full rounded-full transition-all duration-1000", USER_PROFILE.loyalty.bg.replace('100', '500') || "bg-amber-400")}
                                    style={{ width: `${(USER_PROFILE.loyalty.currentSpend / USER_PROFILE.loyalty.targetSpend) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-[11px] text-center text-slate-500 pt-1">
                                Mua thêm <span className="font-bold text-slate-800">{((USER_PROFILE.loyalty.targetSpend - USER_PROFILE.loyalty.currentSpend)).toLocaleString('vi-VN')}đ</span> để thăng hạng {USER_PROFILE.loyalty.nextTier}
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 mt-2 border border-slate-100 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-600 font-medium">Điểm thưởng hiện có</span>
                                <span className="font-bold text-primary flex items-center gap-1">
                                    {USER_PROFILE.loyalty.points.toLocaleString('vi-VN')} <span className="text-[10px] text-slate-400 font-normal">pts</span>
                                </span>
                            </div>
                            <div className="pt-2 border-t border-slate-200">
                                <p className="text-xs text-slate-500 font-medium mb-2">Đặc quyền hạng {USER_PROFILE.loyalty.tier}:</p>
                                <ul className="text-[11px] text-slate-600 space-y-1 pl-4 list-disc marker:text-amber-400">
                                    <li>Giảm {USER_PROFILE.loyalty.discountPercent}% áp dụng cho mọi đơn hàng.</li>
                                    <li>Tích lũy X2 điểm thưởng vào ngày Lễ.</li>
                                    <li>Miễn phí vận chuyển đơn từ 150k.</li>
                                </ul>
                            </div>
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
                            <Button
                                variant="outline"
                                className="rounded-xl border-slate-200 text-xs font-bold whitespace-nowrap"
                                onClick={() => alert("Tính năng Thay đổi mật khẩu đang được phát triển và thiết lập kết nối Backend (Bảo mật).")}
                            >
                                Thay đổi mật khẩu
                            </Button>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div>
                                <p className="font-bold text-sm text-slate-900">Xác thực 2 lớp (2FA)</p>
                                <p className="text-xs text-slate-500">Giúp bảo mật tài khoản tốt hơn bằng SMS/Email</p>
                            </div>
                            <Button
                                variant="outline"
                                className="rounded-xl border-slate-200 text-xs font-bold whitespace-nowrap"
                                onClick={() => alert("Hệ thống gửi mã OTP xác thực 2 bước (2FA) đang được xây dựng!")}
                            >
                                Thiết lập ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
