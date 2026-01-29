"use client";

import { useEffect, useState } from "react";
import { homeAPI } from "@/lib/api-mock";
import { Book, Category, FlashSaleItem, Voucher, CustomerTier } from "@/types";
import { ProductCard } from "@/components/features/ProductCard";
import { FlashSaleSection } from "@/components/features/FlashSaleSection";
import { ProductCarousel } from "@/components/features/ProductCarousel";
import { VoucherSection } from "@/components/features/VoucherSection";
import { VIPMembershipBanner } from "@/components/features/VIPMembershipBanner";
import { TestimonialSection } from "@/components/features/TestimonialSection";
import { Sparkles, ArrowRight, ShieldCheck, Truck, Trophy, Bookmark } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<{
    categories: Category[];
    vouchers: Voucher[];
    tiers: CustomerTier[];
    flashSales: FlashSaleItem[];
    featuredBooks: Book[];
    bestsellers: Book[];
    newArrivals: Book[];
  } | null>(null);

  useEffect(() => {
    async function loadData() {
      const res = await homeAPI.getHomeData();
      setData(res);
    }
    loadData();
  }, []);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <main className="min-h-screen pb-24 bg-background pt-20">
      {/* 1. Hero Section - Primary Viewport */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10 blur-3xl"></div>

        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Thế giới tri thức trong tầm tay</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-slate-900 leading-tight tracking-normal mb-8 uppercase">
                Khám phá <br />
                <span className="text-primary font-extrabold italic">Sách mới</span> <br />
                Mỗi <span className="text-cta font-extrabold uppercase">Ngày</span>
              </h1>

              <div className="flex flex-wrap gap-4 mb-10">
                <button className="btn-primary flex items-center gap-2 text-xs font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all uppercase tracking-wider">
                  Mua Sách Ngay <ArrowRight className="w-4 h-4" />
                </button>
                <button className="btn-secondary flex items-center gap-2 text-xs font-bold px-7 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all uppercase tracking-wider">
                  Xem Khuyến Mãi
                </button>
              </div>

              <div className="flex items-center gap-8 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                    <Truck className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Vận chuyển</span>
                    <span className="text-[11px] font-bold text-slate-700">Giao nhanh 2h</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Cam kết</span>
                    <span className="text-[11px] font-bold text-slate-700">100% Sách Thật</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative hidden lg:flex justify-end">
              <div className="relative w-[380px] h-[480px] bg-slate-100 rounded-[32px] rotate-2 overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800"
                  className="w-full h-full object-cover -rotate-2 scale-110"
                  alt="Hero Book"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Voucher Section - Promotion Stack */}
      <VoucherSection vouchers={data.vouchers || []} />

      {/* 3. Flash Sale Section - Clean Spacing - No Conflict */}
      <section className="container mx-auto px-4 py-8 relative z-10">
        <FlashSaleSection items={data.flashSales} />
      </section>

      {/* 4. Featured Products - ProductCarousel */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-3">
              <Bookmark className="w-5 h-5 fill-current" />
              Gợi ý cho bạn
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              SÁCH <span className="bg-primary/10 text-primary px-3 py-1 rounded-xl italic">NỔI BẬT</span>
            </h2>
          </div>
        </div>

        <ProductCarousel books={data.featuredBooks} />
      </section>

      {/* 5. Bestsellers Section - ProductCarousel */}
      <section className="bg-cta/[0.03] py-24 border-y border-cta/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-cta font-bold uppercase tracking-widest text-[10px] mb-3">
                <Trophy className="w-4 h-4 fill-current" />
                Được yêu thích nhất
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                BÁN <span className="bg-cta/10 text-cta px-3 py-1 rounded-xl italic">CHẠY</span> NHẤT
              </h2>
            </div>
            <button className="text-cta hover:text-slate-900 transition-colors font-bold text-xs uppercase tracking-widest flex items-center gap-2 group">
              Xem bảng xếp hạng <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>

          <ProductCarousel books={data.bestsellers} />
        </div>
      </section>

      {/* VIP Membership Banner - Subscription Drive */}
      <VIPMembershipBanner tiers={data.tiers || []} />

      {/* 6. New Arrivals - ProductCarousel */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            MỚI <span className="bg-primary/10 text-primary px-3 py-1 rounded-xl italic">CẬP NHẬT</span>
          </h2>
          <button className="text-primary hover:text-cta transition-colors font-black text-sm uppercase tracking-widest flex items-center gap-2 group">
            Xem tất cả sách mới <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </button>
        </div>

        <ProductCarousel books={data.newArrivals} />
      </section>

      <TestimonialSection />
    </main>
  );
}
