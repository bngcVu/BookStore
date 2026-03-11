"use client";

import React, { useState } from 'react';
import {
    ShieldCheck,
    Lock,
    Key,
    UserPlus,
    MoreVertical,
    ChevronRight,
    ShieldAlert,
    Edit2,
    Trash2,
    Eye,
    Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_ROLES = [
    { id: "R-1", name: "Super Admin", count: 2, permissions: "Full Access", color: "bg-slate-900", icon: ShieldCheck },
    { id: "R-2", name: "Content Editor", count: 5, permissions: "Catalog, Blogs, Reviews", color: "bg-blue-600", icon: Edit2 },
    { id: "R-3", name: "Order Manager", count: 3, permissions: "Orders, Refunds, Inventory", color: "bg-emerald-600", icon: Key },
    { id: "R-4", name: "Marketing Specialist", count: 2, permissions: "Promotions, Push, CRM", color: "bg-amber-600", icon: ShieldAlert },
];

const MOCK_ADMINS = [
    { name: "Admin_Master", email: "master@bookstore.vn", role: "Super Admin", lastActive: "Bây giờ", status: "online" },
    { name: "Nguyen Van Bien_Tap", email: "editor1@gmail.com", role: "Content Editor", lastActive: "15 phút trước", status: "offline" },
    { name: "Hoang Order", email: "orders@bookstore.vn", role: "Order Manager", lastActive: "2 giờ trước", status: "offline" },
];

export default function AdminRolesPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Lock className="text-rose-600" /> Phân quyền Quản trị viên
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Cấp quyền truy cập cho nhân viên theo các module chức năng</p>
                </div>
                <Button
                    className="font-bold bg-rose-600 hover:bg-rose-700 text-white gap-2 shadow-lg shadow-rose-500/20"
                    onClick={() => alert("Tính năng quản lý Nhân sự Admin đang được khởi tạo...")}
                >
                    <UserPlus size={16} /> Thêm tài khoản Admin
                </Button>
            </div>

            {/* Role Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_ROLES.map((role) => (
                    <div key={role.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", role.color)}>
                                <role.icon size={24} />
                            </div>
                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100">
                                <MoreVertical size={16} />
                            </Button>
                        </div>
                        <h3 className="font-black text-slate-900 text-lg">{role.name}</h3>
                        <p className="text-xs font-bold text-slate-400 mt-1">{role.count} tài khoản</p>
                        <div className="mt-4 pt-4 border-t border-slate-50">
                            <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-2 text-center">Tóm tắt Quyền</p>
                            <p className="text-[10px] font-bold text-slate-600 text-center line-clamp-1">{role.permissions}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Admin List */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="font-black text-slate-900 text-sm">Danh sách Nhân sự Admin</h3>
                    </div>
                    <div className="overflow-x-auto divide-y divide-slate-50">
                        {MOCK_ADMINS.map((admin, idx) => (
                            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 border border-slate-200 uppercase">
                                            {admin.name[0]}
                                        </div>
                                        <span className={cn(
                                            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                                            admin.status === 'online' ? "bg-emerald-500" : "bg-slate-300"
                                        )} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{admin.name}</p>
                                        <p className="text-[10px] font-medium text-slate-500">{admin.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Cấp bậc</p>
                                        <span className="text-[10px] font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{admin.role}</span>
                                    </div>
                                    <div className="text-right w-24">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Truy cập</p>
                                        <p className="text-[10px] font-bold text-slate-500">{admin.lastActive}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-slate-400">
                                        <ChevronRight size={18} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full p-4 text-center font-black text-xs text-rose-600 hover:bg-rose-50 transition-colors uppercase tracking-widest border-t border-slate-100">
                        Cấu hình Nhóm quyền (Custom Groups)
                    </button>
                </div>

                {/* Security Audit Log */}
                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-900/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center gap-2 text-rose-400 mb-6">
                            <ShieldAlert size={20} />
                            <h3 className="font-black text-sm uppercase tracking-widest">Logs Bảo mật</h3>
                        </div>

                        <div className="space-y-4 flex-1">
                            {[
                                { action: "Failed login attempt", user: "IP 42.112.x.x", time: "10:32" },
                                { action: "Đã xóa 120 SKUs", user: "admin1", time: "Hôm qua" },
                                { action: "Thay đổi phân quyền", user: "Master", time: "05/03" }
                            ].map((log, i) => (
                                <div key={i} className="flex gap-3 items-start p-3 bg-white/5 rounded-xl border border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-200">{log.action}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">{log.user} • {log.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button className="mt-8 bg-white text-slate-900 hover:bg-slate-100 font-bold w-full rounded-2xl gap-2 shadow-lg shadow-white/10">
                            <Eye size={16} /> Xem Audit Logs Toàn bộ
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
