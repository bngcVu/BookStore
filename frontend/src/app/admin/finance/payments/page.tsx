"use client";

import React, { useState } from 'react';
import {
    CreditCard,
    Search,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    RefreshCw,
    Eye,
    Wallet,
    Building,
    Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MOCK_PAYMENTS = [
    { id: "TXN_VN_0912384", order: "BS888201", type: "vnpay", status: 'success', amount: 580000, date: "12/03/2024 14:32", bank: "Ngân hàng ACB" },
    { id: "TXN_MM_8283111", order: "BS772390", type: "momo", status: 'success', amount: 245000, date: "12/03/2024 10:16", bank: "Ví điện tử MoMo" },
    { id: "TXN_VN_2391023", order: "BS110293", type: "vnpay", status: 'failed', amount: 1200000, date: "11/03/2024 09:05", bank: "Ngân hàng VCB", error: "Vượt quá hạn mức giao dịch / Thẻ chưa đăng ký Internet Banking" },
    { id: "TXN_MM_4918237", order: "BS992123", type: "momo", status: 'pending', amount: 150000, date: "10/03/2024 16:47", bank: "Ví điện tử MoMo" },
];

export default function FinancePaymentsPage() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Đối soát & Thanh toán (Finance)</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Lưu vết và tra cứu transaction_id từ cổng thanh toán</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Nhập mã Giao dịch, Order ID..."
                            className="w-full pl-10 pr-4 h-10 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        />
                    </div>
                    <Button variant="outline" className="font-bold border-slate-200 gap-2" onClick={() => alert("Đang kết xuất tệp đối soát...")}>
                        Xuất Excel CSV
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200">
                {[
                    { id: 'all', label: 'Tất cả Giao dịch' },
                    { id: 'vnpay', label: 'Cổng VNPAY' },
                    { id: 'momo', label: 'Ví MoMo' }
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
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50/50 uppercase text-[10px] font-black tracking-widest text-slate-500 border-b border-slate-100">
                            <tr>
                                <th className="p-4 w-10 text-center"><input type="checkbox" className="rounded border-slate-300" /></th>
                                <th className="p-4">Mã Giao dịch (TXN)</th>
                                <th className="p-4 text-center">Đơn hàng (Order)</th>
                                <th className="p-4 text-right">Số tiền GD</th>
                                <th className="p-4">Ngân hàng / Loại thẻ</th>
                                <th className="p-4 text-center">Trạng thái Cổng</th>
                                <th className="p-4 text-right">Ngày giờ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_PAYMENTS.filter(p => activeTab === 'all' || p.type === activeTab).map((txn, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-4 text-center"><input type="checkbox" className="rounded border-slate-300" /></td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0",
                                                txn.type === 'vnpay' ? "bg-blue-600" : "bg-[#a50064]"
                                            )}>
                                                {txn.type === 'vnpay' ? <Building size={16} /> : <Wallet size={16} />}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-sm tracking-tight">{txn.id}</p>
                                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                                                    {txn.type === 'vnpay' ? "Cổng Thanh Toán VNPay" : "Cổng Ví MOMO"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <Button variant="link" className="font-bold text-primary p-0 h-auto gap-1">
                                            #{txn.order} <Eye size={14} />
                                        </Button>
                                    </td>
                                    <td className="p-4 text-right font-black text-slate-900 border-l border-slate-50 bg-slate-50/30">
                                        {txn.amount.toLocaleString('vi-VN')} đ
                                    </td>
                                    <td className="p-4">
                                        <p className="font-bold text-slate-700">{txn.bank}</p>
                                    </td>
                                    <td className="p-4 text-center">
                                        {txn.status === 'success' && (
                                            <span className="inline-flex items-center justify-center min-w-[100px] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100/50 border border-emerald-200 gap-1.5">
                                                <CheckCircle2 size={14} className="text-emerald-500" /> THÀNH CÔNG
                                            </span>
                                        )}
                                        {txn.status === 'failed' && (
                                            <span className="inline-flex items-center justify-center min-w-[100px] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-rose-700 bg-rose-100/50 border border-rose-200 gap-1.5" title={txn.error}>
                                                <XCircle size={14} className="text-rose-500" /> THẤT BẠI
                                            </span>
                                        )}
                                        {txn.status === 'pending' && (
                                            <span className="inline-flex items-center justify-center min-w-[100px] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-100/50 border border-amber-200 gap-1.5">
                                                <Clock size={14} className="text-amber-500" /> PENDING
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <p className="font-bold text-slate-600 text-xs">{txn.date}</p>
                                        {txn.status === 'pending' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 mt-2 text-[10px] font-bold text-primary hover:bg-primary/10 gap-1"
                                                onClick={() => alert(`Đang đồng bộ trạng thái thực tế từ cổng ${txn.type.toUpperCase()}...`)}
                                            >
                                                <RefreshCw size={12} /> Sync
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {MOCK_PAYMENTS.filter(p => activeTab === 'all' || p.type === activeTab).length === 0 && (
                        <div className="py-24 text-center text-slate-400">
                            <AlertTriangle size={48} className="mx-auto mb-4 opacity-30 text-slate-400" />
                            <p className="font-bold text-slate-500">KhÔNG tìm thấy Giao dịch nào của cổng này!</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
