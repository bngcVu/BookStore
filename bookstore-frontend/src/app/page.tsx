"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { BannerCarousel } from "@/components/ui/BannerCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, ShieldCheck, Truck, Headphones, MessageSquare, Sparkles, Clock, X, Gift } from "lucide-react";
import Link from "next/link";
import { FLASH_SALE_BOOKS, BEST_SELLERS } from "@/lib/mockData";
import { ProductCarouselSkeleton } from "@/components/product/ProductSkeleton";
import { useState, useEffect } from "react";

// Target flash sale end date: 24h from now
const targetDate = new Date();
targetDate.setHours(targetDate.getHours() + 24);

export default function Home() {
  const { hours, minutes, seconds } = useCountdown(targetDate);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showGamificationBanner, setShowGamificationBanner] = useState(true);
  const [showStickyViewed, setShowStickyViewed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Simulate initial data fetch
    const timer = setTimeout(() => setIsLoading(false), 1200);

    // Show sticky widget after scroll
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyViewed(true);
      } else {
        setShowStickyViewed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Helper for 2 digits format
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <main className="flex-1">
      {/* Hidden H1 for SEO Enhancement */}
      <h1 className="sr-only">BookStore - Sàn thương mại điện tử mua sách trực tuyến uy tín hàng đầu Việt Nam</h1>

      <div className="flex flex-col gap-16 pb-20 bg-[#fdfaf6]">
        {/* 1. Hero Carousel */}
        <BannerCarousel />

        {/* 3. Flash Sale Block */}
        <section className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-2xl p-6 lg:p-8 overflow-hidden relative shadow-xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Zap className="text-accent h-8 w-8 fill-accent animate-pulse" />
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Flash Sale</h2>
                </div>
                {/* Countdown Timer */}
                <div className="flex items-center gap-2">
                  <div className="bg-white/10 text-white font-mono font-bold px-3 py-1.5 rounded-md backdrop-blur-sm border border-white/20">
                    {isMounted ? pad(hours) : "00"}
                  </div>
                  <span className="text-white/50 font-bold">:</span>
                  <div className="bg-white/10 text-white font-mono font-bold px-3 py-1.5 rounded-md backdrop-blur-sm border border-white/20">
                    {isMounted ? pad(minutes) : "00"}
                  </div>
                  <span className="text-white/50 font-bold">:</span>
                  <div className="bg-white/10 text-accent font-mono font-bold px-3 py-1.5 rounded-md backdrop-blur-sm border border-white/20">
                    {isMounted ? pad(seconds) : "00"}
                  </div>
                </div>
              </div>
              <Link href="/flash-sale">
                <Button variant="outline" className="text-white border-white/30 hover:bg-white hover:text-slate-900 font-semibold h-10 px-6">
                  Xem tất cả deal
                </Button>
              </Link>
            </div>

            {/* Product Carousel */}
            <div className="relative z-10 min-h-[400px]">
              {isLoading ? <ProductCarouselSkeleton /> : <ProductCarousel products={FLASH_SALE_BOOKS} showArrows={true} />}
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          </div>
        </section>

        {/* 4. Best Sellers */}
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Sách Bán Chạy Nhất</h2>
            <Button variant="ghost" className="text-slate-500 hover:text-primary gap-1 px-0">
              Khám phá thêm <ArrowRight size={16} />
            </Button>
          </div>

          <div className="min-h-[400px]">
            {isLoading ? <ProductCarouselSkeleton /> : <ProductCarousel products={BEST_SELLERS} showArrows={true} />}
          </div>
        </section>

        {/* Phase 4: AI Recommendations (For You) */}
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 border-b border-rose-100 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Sparkles size={24} className="text-rose-500" /> Dành Riêng Cho Bạn
            </h2>
          </div>

          <div className="min-h-[400px]">
            {isLoading ? <ProductCarouselSkeleton /> : <ProductCarousel products={[...BEST_SELLERS].reverse()} showArrows={true} />}
          </div>
        </section>

        {/* 5. Benefits Bar */}
        <section className="bg-primary/5 py-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Chính hãng 100%", desc: "Sách được nhập trực tiếp" },
              { icon: Truck, title: "Freeship đơn 150k", desc: "Giao hàng nhanh toàn quốc" },
              { icon: Headphones, title: "Hỗ trợ 24/7", desc: "Giải đáp mọi thắc mắc" },
              { icon: MessageSquare, title: "Cộng đồng lớn", desc: "Chia sẻ niềm tin yêu sách" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Newsletter */}
        <section className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-4 max-w-lg">
              <h2 className="text-3xl font-bold text-white">Tham gia cộng đồng yêu sách</h2>
              <p className="text-white/60">Đăng ký để nhận thông báo về sách mới, mã giảm giá và những chương trình khuyến mãi đặc biệt sớm nhất.</p>
            </div>
            <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Địa chỉ email..." className="h-14 px-6 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent min-w-[300px]" />
              <Button className="h-14 px-10 bg-accent hover:bg-accent-hover text-white font-bold text-lg">Đăng ký ngay</Button>
            </div>
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2" />
          </div>
        </section>
      </div>

      {/* Phase 4: Gamification Onboarding Popup */}
      {showGamificationBanner && (
        <div className="fixed bottom-6 left-6 z-50 bg-white rounded-2xl shadow-2xl border border-amber-100 p-5 max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-500">
          <button
            onClick={() => setShowGamificationBanner(false)}
            className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors"
          >
            <X size={18} />
          </button>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex justify-center items-center text-amber-500 shrink-0 shadow-inner">
              <Gift size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1 leading-tight">Hoàn thiện hồ sơ nhận thưởng!</h4>
              <p className="text-xs text-slate-500 mb-3">Cập nhật ngay ngày sinh và số điện thoại để nhận 50 điểm thưởng (tương đương 500.000đ).</p>
              <Link href="/account">
                <Button size="sm" className="w-full text-xs box-border font-bold bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-500/20">Cập nhật ngay</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Phase 4: Sticky Recently Viewed Widget */}
      <div className={`fixed top-1/2 right-4 -translate-y-1/2 z-40 transition-all duration-500 ${showStickyViewed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'}`}>
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 flex flex-col items-center gap-2 group">
          <div className="py-2 px-1 border-b border-slate-100 text-[10px] font-bold text-slate-400 writing-vertical-rl rotate-180 uppercase tracking-widest text-center flex gap-2">
            Vừa xem <Clock size={12} className="rotate-90 inline-block mb-1 mx-auto text-primary" />
          </div>
          {/* Mock recent items */}
          <Link href="/product/nghe-thuat-tu-duy" className="relative w-12 h-16 rounded overflow-hidden hover:ring-2 hover:ring-primary transition-all">
            <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=150" alt="Recent 1" className="w-full h-full object-cover" />
          </Link>
          <Link href="/product/dac-nhan-tam" className="relative w-12 h-16 rounded overflow-hidden hover:ring-2 hover:ring-primary transition-all">
            <img src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=150" alt="Recent 2" className="w-full h-full object-cover" />
          </Link>
        </div>
      </div>

    </main>
  );
}
