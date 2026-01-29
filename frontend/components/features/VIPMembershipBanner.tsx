"use client";

import { CustomerTier } from "@/types";
import { Crown, Star, Zap, Gift, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface VIPMembershipBannerProps {
    tiers: CustomerTier[];
}

export function VIPMembershipBanner({ tiers }: VIPMembershipBannerProps) {
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="relative overflow-hidden rounded-[40px] bg-slate-900 px-6 py-16 md:px-16 md:py-20 shadow-2xl">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent -z-0"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cta/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="max-w-3xl mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-white/80 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/5">
                            <Crown className="w-3.5 h-3.5 text-primary" />
                            <span>Đặc quyền thành viên</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-[1.1] mb-6">
                            Nâng cấp trải nghiệm <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-gradient">VIP MEMBERSHIP</span>
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base max-w-xl font-medium leading-relaxed">
                            Trở thành hội viên của BookStore để nhận ngay ưu đãi giảm giá trực tiếp, tích điểm không giới hạn và miễn phí vận chuyển cho mọi đơn hàng.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {tiers.map((tier, index) => (
                            <TierCard key={tier.id} tier={tier} index={index} />
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 border-t border-white/10">
                        <button className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-primary/20 active:scale-95">
                            Đăng ký hội viên ngay
                        </button>
                        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                            Đã có <span className="text-white">10.000+</span> độc giả tham gia
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TierCard({ tier, index }: { tier: CustomerTier; index: number }) {
    const isGold = tier.name === 'Vàng';
    const isDiamond = tier.name === 'Kim cương';

    return (
        <div className={cn(
            "group relative p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2",
            isDiamond
                ? "bg-gradient-to-br from-slate-800 to-slate-900 border-primary/30 shadow-2xl shadow-primary/10"
                : isGold
                    ? "bg-slate-800/50 border-white/10 hover:border-primary/20"
                    : "bg-slate-800/30 border-white/5 hover:border-white/10"
        )}>
            {isDiamond && (
                <div className="absolute -top-3 -right-3 bg-primary text-white p-2 rounded-xl shadow-lg animate-bounce pointer-events-none">
                    <Star className="w-4 h-4 fill-current" />
                </div>
            )}

            <div className="mb-6">
                <h3 className={cn(
                    "text-xl font-black uppercase tracking-tighter mb-1",
                    isDiamond ? "text-primary" : "text-white"
                )}>
                    Hạng {tier.name}
                </h3>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    {tier.min_spent === 0 ? "Bắt đầu ngay" : `Từ ${tier.min_spent.toLocaleString()}đ`}
                </p>
            </div>

            <div className="space-y-4 mb-8">
                {tier.benefits.split(',').map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                            isDiamond ? "bg-primary/20 text-primary" : "bg-white/10 text-white/50"
                        )}>
                            <Zap className="w-3 h-3 fill-current" />
                        </div>
                        <span className="text-slate-300 text-xs font-medium leading-snug">{benefit.trim()}</span>
                    </div>
                ))}
                {tier.discount_percent > 0 && (
                    <div className="flex items-start gap-3">
                        <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                            isDiamond ? "bg-primary/20 text-primary" : "bg-white/10 text-white/50"
                        )}>
                            <Gift className="w-3 h-3 fill-current" />
                        </div>
                        <span className="text-slate-300 text-xs font-medium leading-snug">Giảm thêm {tier.discount_percent}% mọi đơn</span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-white/40 group-hover:text-primary transition-colors cursor-pointer">
                Chi tiết quyền lợi <ArrowRight className="w-3.5 h-3.5" />
            </div>
        </div>
    );
}
