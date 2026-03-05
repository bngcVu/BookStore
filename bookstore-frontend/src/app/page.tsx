"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { ProductCard } from "@/components/product/ProductCard";
import { BannerCarousel } from "@/components/ui/BannerCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

// Mock data based on schema
const FLASH_SALE_BOOKS = [
  { id: "1", slug: "nghe-thuat-tu-duy", title: "Nghệ Thuật Tư Duy Rành Mạch", author: "Rolf Dobelli", category: "Kỹ năng sống", originalPrice: 190000, salePrice: 145000, imageUrl: "", isFlashSale: true, soldQuantity: 85, totalQuantity: 100 },
  { id: "2", slug: "nha-gia-kim", title: "Nhà Giả Kim", author: "Paulo Coelho", category: "Tiểu thuyết", originalPrice: 150000, salePrice: 99000, imageUrl: "", isFlashSale: true, soldQuantity: 150, totalQuantity: 200 },
  { id: "3", slug: "tuoi-tre-dang-gia-bao-nhieu", title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", author: "Rosie Nguyễn", category: "Kỹ năng sống", originalPrice: 120000, salePrice: 65000, imageUrl: "", isFlashSale: true, soldQuantity: 98, totalQuantity: 100 },
  { id: "4", slug: "dac-nhan-tam", title: "Đắc Nhân Tâm", author: "Dale Carnegie", category: "Tâm lý", originalPrice: 135000, salePrice: 85000, imageUrl: "", isFlashSale: true, soldQuantity: 250, totalQuantity: 500 },
  { id: "5", slug: "su-luoc-ve-loai-nguoi", title: "Sapiens: Lược Sử Loài Người", author: "Yuval Noah Harari", category: "Lịch sử", originalPrice: 250000, salePrice: 180000, imageUrl: "", isFlashSale: true, soldQuantity: 62, totalQuantity: 150 },
];

const BEST_SELLERS = [
  { id: "6", slug: "muon-kiep-nhan-sinh", title: "Muôn Kiếp Nhân Sinh", author: "Nguyên Phong", category: "Tâm linh", originalPrice: 168000, imageUrl: "" },
  { id: "7", slug: "thi-pham-nam-cao", title: "Tuyển Tập Nam Cao", author: "Nam Cao", category: "Văn học Việt Nam", originalPrice: 185000, salePrice: 160000, imageUrl: "" },
  { id: "8", slug: "cha-giau-cha-ngheo", title: "Cha Giàu Cha Nghèo", author: "Robert T. Kiyosaki", category: "Kinh doanh", originalPrice: 140000, imageUrl: "" },
  { id: "9", slug: "di-tim-le-song", title: "Đi Tìm Lẽ Sống", author: "Viktor E. Frankl", category: "Tâm lý", originalPrice: 120000, salePrice: 95000, imageUrl: "" },
  { id: "10", slug: "suoi-nguon", title: "Suối Nguồn", author: "Ayn Rand", category: "Tiểu thuyết", originalPrice: 320000, salePrice: 280000, imageUrl: "" },
];



// Target flash sale end date: 24h from now
const targetDate = new Date();
targetDate.setHours(targetDate.getHours() + 24);

export default function Home() {
  const { hours, minutes, seconds } = useCountdown(targetDate);

  // Helper for 2 digits format
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex flex-col gap-16 pb-20">
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
                  {pad(hours)}
                </div>
                <span className="text-white/50 font-bold">:</span>
                <div className="bg-white/10 text-white font-mono font-bold px-3 py-1.5 rounded-md backdrop-blur-sm border border-white/20">
                  {pad(minutes)}
                </div>
                <span className="text-white/50 font-bold">:</span>
                <div className="bg-white/10 text-accent font-mono font-bold px-3 py-1.5 rounded-md backdrop-blur-sm border border-white/20">
                  {pad(seconds)}
                </div>
              </div>
            </div>
            <Button variant="outline" className="text-white border-white/30 hover:bg-white hover:text-slate-900 font-semibold h-10 px-6">
              Xem tất cả deal
            </Button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 relative z-10">
            {FLASH_SALE_BOOKS.map((book) => (
              <ProductCard key={book.id} {...book} className="bg-white border-none" />
            ))}
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        </div>
      </section>

      {/* 4. Best Sellers (Standard Grid) */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Sách Bán Chạy Nhất</h2>
          <Button variant="ghost" className="text-slate-500 hover:text-primary gap-1 px-0">
            Khám phá thêm <ArrowRight size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {BEST_SELLERS.map((book) => (
            <ProductCard key={book.id} {...book} />
          ))}
        </div>
      </section>
    </div>
  );
}
