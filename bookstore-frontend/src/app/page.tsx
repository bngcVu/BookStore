"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { BannerCarousel } from "@/components/ui/BannerCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, ShieldCheck, Truck, Headphones, MessageSquare } from "lucide-react";
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

  useEffect(() => {
    setIsMounted(true);
    // Simulate initial data fetch
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
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
    </main>
  );
}
