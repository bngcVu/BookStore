'use client';

import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Reward {
    id: number;
    name: string;
    description: string;
    points_cost: number;
    image_url: string;
}

interface RedeemSectionProps {
    rewards: Reward[];
    userPoints: number;
    onRedeem: (id: number) => void;
}

export function RedeemSection({ rewards, userPoints, onRedeem }: RedeemSectionProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-rose-500" />
                    Đổi điểm nhận quà
                </h3>
                <span className="text-sm text-slate-500 font-medium">Bạn có <span className="text-primary font-black">{userPoints.toLocaleString('vi-VN')}</span> điểm</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {rewards.map((reward) => {
                    const canRedeem = userPoints >= reward.points_cost;

                    return (
                        <div key={reward.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col gap-3 group relative overflow-hidden transition-all hover:shadow-lg hover:border-slate-200">
                            {/* Image Part */}
                            <div className="relative aspect-square rounded-xl bg-slate-50 overflow-hidden p-4">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src={reward.image_url}
                                        alt={reward.name}
                                        className="w-2/3 h-2/3 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold text-white">
                                    {reward.points_cost.toLocaleString('vi-VN')} pts
                                </div>
                            </div>

                            {/* Content Part */}
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900 line-clamp-1">{reward.name}</h4>
                                <p className="text-xs text-slate-500 line-clamp-2 mt-1 min-h-[2.5em]">{reward.description}</p>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => canRedeem && onRedeem(reward.id)}
                                disabled={!canRedeem}
                                className={cn(
                                    "w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all",
                                    canRedeem
                                        ? "bg-slate-900 text-white hover:bg-primary hover:shadow-lg hover:shadow-primary/30 active:scale-95"
                                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                )}
                            >
                                {canRedeem ? (
                                    <>
                                        Đổi ngay <ArrowRight className="w-3 h-3" />
                                    </>
                                ) : (
                                    <>Thiếu {(reward.points_cost - userPoints).toLocaleString('vi-VN')} điểm</>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
