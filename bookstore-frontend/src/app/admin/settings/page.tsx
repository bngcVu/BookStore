"use client";

import React from 'react';
import {
    Settings,
    Globe,
    Bell,
    Mail,
    Database,
    ShieldCheck,
    Monitor,
    ChevronRight,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const SETTINGS_SECTIONS = [
    { id: 'general', name: 'Cấu hình Chung', description: 'Tên cửa hàng, Logo, Thông tin liên hệ, Tiền tệ', icon: Globe },
    { id: 'notifications', name: 'Cài đặt Thông báo', description: 'Cấu hình Email SMTP, Webhook thông báo Telegram/Slack', icon: Bell },
    { id: 'frontend', name: 'Giao diện & Theme', description: 'Chỉnh sửa banner trang chủ, Menu Navigation, Chân trang', icon: Monitor },
    { id: 'backup', name: 'Dữ liệu & Backup', description: 'Sao lưu cơ sở dữ liệu, Lịch sử đồng bộ Elasticsearch', icon: Database },
];

export default function GeneralSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Settings className="text-slate-400" /> Cài đặt hệ thống
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Cấu hình tham số vận hành toàn cục của BookStore</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SETTINGS_SECTIONS.map((section) => (
                    <div
                        key={section.id}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-primary/20 hover:shadow-md transition-all group cursor-pointer"
                        onClick={() => alert(`Đang mở bảng điều khiển: ${section.name}`)}
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                <section.icon size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-black text-slate-900">{section.name}</h3>
                                    <ChevronRight size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                                </div>
                                <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">{section.description}</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-50 flex justify-end">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert(`Đi đến thiết lập: ${section.name}`);
                                }}
                            >
                                Thiết lập ngay
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4 shadow-inner">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Info size={20} />
                </div>
                <div>
                    <h4 className="font-black text-blue-900 inline-flex items-center gap-2">Chế độ Bảo trì (Maintenance Mode) <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded ml-2">Tắt</span></h4>
                    <p className="text-sm text-blue-700 mt-1 font-medium leading-relaxed">
                        Kích hoạt chế độ này sẽ tạm thời đóng trang Frontend BookStore để bảo trì hệ thống. Chỉ người dùng có tài khoản Admin mới có thể truy cập qua URL đặc biệt.
                    </p>
                    <Button
                        size="sm"
                        className="mt-4 bg-blue-600 hover:bg-blue-700 font-bold border-0 shadow-lg shadow-blue-500/20"
                        onClick={() => confirm("Bạn có chắc chắn muốn BẬT chế độ bảo trì? Trang web chính sẽ tạm thời ngừng hoạt động đối với khách hàng.") && alert("Đã kích hoạt chế độ bảo trì (Mô phỏng)")}
                    >
                        Bật chế độ bảo trì
                    </Button>
                </div>
            </div>
        </div>
    );
}
