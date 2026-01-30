'use client';

import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Clock, History } from 'lucide-react';
import { cn } from '@/lib/utils';

// Loại này tạm thời define ở đây, sau sẽ chuyển vào types/index.ts nếu cần dùng chung
interface LoyaltyTransaction {
    id: number;
    points: number;
    type: 'earn' | 'redeem' | 'expire' | 'adjust';
    description: string;
    created_at: string;
    reference_id?: number;
}

interface PointsHistoryTableProps {
    transactions: LoyaltyTransaction[];
}

export function PointsHistoryTable({ transactions }: PointsHistoryTableProps) {
    if (transactions.length === 0) {
        return (
            <div className="py-12 text-center text-slate-500">
                <History className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Chưa có lịch sử giao dịch điểm</p>
            </div>
        );
    }

    return (
        <div className="rounded-[24px] border border-slate-100 bg-white overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-400" />
                    Lịch sử điểm thưởng
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                        <tr>
                            <th className="px-6 py-4 font-black tracking-wider">Thời gian</th>
                            <th className="px-6 py-4 font-black tracking-wider">Giao dịch</th>
                            <th className="px-6 py-4 font-black tracking-wider text-right">Số điểm</th>
                            <th className="px-6 py-4 font-black tracking-wider text-right">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                                    {new Date(tx.created_at).toLocaleDateString('vi-VN', {
                                        day: '2-digit', month: '2-digit', year: 'numeric',
                                        hour: '2-digit', minute: '2-digit'
                                    })}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                            tx.type === 'earn' ? "bg-green-50 text-green-600" :
                                                tx.type === 'redeem' ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500"
                                        )}>
                                            {tx.type === 'earn' ? <ArrowDownLeft className="w-4 h-4" /> :
                                                tx.type === 'redeem' ? <ArrowUpRight className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{tx.description}</p>
                                            {tx.reference_id && <p className="text-xs text-slate-400">Ref: #{tx.reference_id}</p>}
                                        </div>
                                    </div>
                                </td>
                                <td className={cn(
                                    "px-6 py-4 text-right font-black text-base whitespace-nowrap",
                                    tx.type === 'earn' ? "text-green-600" :
                                        tx.type === 'redeem' ? "text-rose-600" : "text-slate-400"
                                )}>
                                    {tx.type === 'earn' ? '+' : ''}{tx.points}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-50 text-green-700">
                                        Thành công
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
