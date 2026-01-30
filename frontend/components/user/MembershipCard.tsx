'use client';

import React from 'react';
import { CustomerTier, User } from '@/types';
import { Crown, Gift, TrendingUp, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MembershipCardProps {
    user: User;
    nextTier?: CustomerTier;
}

export function MembershipCard({ user, nextTier }: MembershipCardProps) {
    const tierName = user.tier?.name || 'Thành viên mới';
    const currentPoints = user.reward_points;
    const totalSpent = user.total_spent;

    // Tính toán progress
    const nextTierMin = nextTier?.min_spent || totalSpent; // Nếu max level thì full bar
    const progress = nextTier
        ? Math.min((totalSpent / nextTierMin) * 100, 100)
        : 100;

    const remaining = nextTier ? nextTierMin - totalSpent : 0;

    // Theme màu dựa trên hạng
    const getTheme = () => {
        switch (tierName.toLowerCase()) {
            case 'vàng': return 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-amber-500/30';
            case 'kim cương': return 'bg-gradient-to-br from-sky-400 to-indigo-600 text-white shadow-indigo-500/30';
            default: return 'bg-gradient-to-br from-slate-400 to-slate-600 text-white shadow-slate-500/30';
        }
    };

    return (
        <div className={cn(
            "relative overflow-hidden rounded-[32px] p-8 shadow-2xl transition-all duration-300 hover:scale-[1.01]",
            getTheme()
        )}>
            {/* Background Decor */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                {/* Left: User Info */}
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                        <Crown className="w-8 h-8 text-white fill-white/20" />
                    </div>
                    <div>
                        <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">Hạng thành viên</p>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-white drop-shadow-sm">
                            {tierName}
                        </h2>
                    </div>
                </div>

                {/* Right: Points */}
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                        <Gift className="w-5 h-5 text-white/90" />
                        <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Điểm thưởng</span>
                    </div>
                    <p className="text-4xl font-black text-white drop-shadow-sm">
                        {currentPoints.toLocaleString('vi-VN')}
                    </p>
                </div>
            </div>

            {/* Progress Section */}
            <div className="relative z-10 mt-8 pt-8 border-t border-white/20">
                <div className="flex justify-between items-end mb-3">
                    <div className="text-sm font-medium text-white/90 flex items-center gap-2">
                        {nextTier ? (
                            <>
                                <TrendingUp className="w-4 h-4" />
                                <span>Chi tiêu thêm <strong className="text-white">{remaining.toLocaleString('vi-VN')}đ</strong> để lên hạng <strong>{nextTier.name}</strong></span>
                            </>
                        ) : (
                            <span>Bạn đã đạt hạng cao nhất!</span>
                        )}
                    </div>
                    <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                        {Math.round(progress)}%
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                        className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <button className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors">
                <Info className="w-5 h-5" />
            </button>
        </div>
    );
}
