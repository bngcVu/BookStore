"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { BannerCarousel } from "@/components/ui/BannerCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, ShieldCheck, Truck, Headphones, MessageSquare } from "lucide-react";
import Link from "next/link";

// Mock data based on schema
const FLASH_SALE_BOOKS = [
  { id: "1", slug: "nghe-thuat-tu-duy", title: "Nghệ Thuật Tư Duy Rành Mạch", author: "Rolf Dobelli", category: "Kỹ năng sống", originalPrice: 190000, salePrice: 145000, imageUrl: "", isFlashSale: true, soldQuantity: 85, totalQuantity: 100 },
  { id: "2", slug: "nha-gia-kim", title: "Nhà Giả Kim", author: "Paulo Coelho", category: "Tiểu thuyết", originalPrice: 150000, salePrice: 99000, imageUrl: "", isFlashSale: true, soldQuantity: 150, totalQuantity: 200 },
  { id: "3", slug: "tuoi-tre-dang-gia-bao-nhieu", title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", author: "Rosie Nguyễn", category: "Kỹ năng sống", originalPrice: 120000, salePrice: 65000, imageUrl: "", isFlashSale: true, soldQuantity: 98, totalQuantity: 100 },
  { id: "4", slug: "dac-nhan-tam", title: "Đắc Nhân Tâm", author: "Dale Carnegie", category: "Tâm lý", originalPrice: 135000, salePrice: 85000, imageUrl: "", isFlashSale: true, soldQuantity: 250, totalQuantity: 500 },
  { id: "5", slug: "su-luoc-ve-loai-nguoi", title: "Sapiens: Lược Sử Loài Người", author: "Yuval Noah Harari", category: "Lịch sử", originalPrice: 250000, salePrice: 180000, imageUrl: "", isFlashSale: true, soldQuantity: 62, totalQuantity: 150 },
  { id: "11", slug: "cay-cam-ngot-cua-toi", title: "Cây Cam Ngọt Của Tôi", author: "José Mauro de Vasconcelos", category: "Văn học", originalPrice: 108000, salePrice: 85000, imageUrl: "", isFlashSale: true, soldQuantity: 45, totalQuantity: 100 },
  { id: "12", slug: "con-chut-gi-de-nho", title: "Còn Chút Gì Để Nhớ", author: "Nguyễn Nhật Ánh", category: "Văn học Việt Nam", originalPrice: 95000, salePrice: 70000, imageUrl: "", isFlashSale: true, soldQuantity: 30, totalQuantity: 50 },
];

const BEST_SELLERS = [
  { id: "6", slug: "muon-kiep-nhan-sinh", title: "Muôn Kiếp Nhân Sinh", author: "Nguyên Phong", category: "Tâm linh", originalPrice: 168000, imageUrl: "" },
  { id: "7", slug: "thi-pham-nam-cao", title: "Tuyển Tập Nam Cao", author: "Nam Cao", category: "Văn học Việt Nam", originalPrice: 185000, salePrice: 160000, imageUrl: "" },
  { id: "8", slug: "cha-giau-cha-ngheo", title: "Cha Giàu Cha Nghèo", author: "Robert T. Kiyosaki", category: "Kinh doanh", originalPrice: 140000, imageUrl: "" },
  { id: "9", slug: "di-tim-le-song", title: "Đi Tìm Lẽ Sống", author: "Viktor E. Frankl", category: "Tâm lý", originalPrice: 120000, salePrice: 95000, imageUrl: "" },
  { id: "10", slug: "suoi-nguon", title: "Suối Nguồn", author: "Ayn Rand", category: "Tiểu thuyết", originalPrice: 320000, salePrice: 280000, imageUrl: "" },
  { id: "13", slug: "tu duy thinh vuong", title: "Bí Mật Tư Duy Triệu Phú", author: "T. Harv Eker", category: "Kinh doanh", originalPrice: 120000, imageUrl: "" },
  { id: "14", slug: "chien-thang-con-quy-trong-ban", title: "Chiến Thắng Con Quỷ Trong Bạn", author: "Napoleon Hill", category: "Phát triển bản thân", originalPrice: 145000, salePrice: 110000, imageUrl: "" },
];

// Target flash sale end date: 24h from now
const targetDate = new Date();
targetDate.setHours(targetDate.getHours() + 24);

import { ProductCarouselSkeleton } from "@/components/product/ProductSkeleton";
import { useState, useEffect } from "react";

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
