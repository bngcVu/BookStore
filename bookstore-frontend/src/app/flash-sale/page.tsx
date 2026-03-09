"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Zap, Clock, Calendar, ChevronRight, Filter, SortAsc } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// More Mock Data for the dedicated page
const ALL_FLASH_SALES = [
    {
        id: "fs-1",
        slug: "nghe-thuat-tu-duy",
        title: "Nghệ Thuật Tư Duy Rành Mạch",
        author: "Rolf Dobelli",
        category: "Kỹ năng sống",
        originalPrice: 190000,
        salePrice: 145000,
        imageUrl: "",
        isFlashSale: true,
        soldQuantity: 85,
        totalQuantity: 100,
        status: "active"
    },
    {
        id: "fs-2",
        slug: "nha-gia-kim",
        title: "Nhà Giả Kim",
        author: "Paulo Coelho",
        category: "Tiểu thuyết",
        originalPrice: 150000,
        salePrice: 99000,
        imageUrl: "",
        isFlashSale: true,
        soldQuantity: 150,
        totalQuantity: 200,
        status: "active"
    },
    {
        id: "fs-3",
        slug: "tuoi-tre-dang-gia-bao-nhieu",
        title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
        author: "Rosie Nguyễn",
        category: "Kỹ năng sống",
        originalPrice: 120000,
        salePrice: 65000,
        imageUrl: "",
        isFlashSale: true,
        soldQuantity: 98,
        totalQuantity: 100,
        status: "active"
    },
    {
        id: "fs-4",
        slug: "dac-nhan-tam",
        title: "Đắc Nhân Tâm",
        author: "Dale Carnegie",
        category: "Tâm lý",
        originalPrice: 135000,
        salePrice: 85000,
        imageUrl: "",
        isFlashSale: true,
        soldQuantity: 250,
        totalQuantity: 500,
        status: "active"
    },
    {
        id: "fs-5",
        slug: "su-luoc-ve-loai-nguoi",
        title: "Sapiens: Lược Sử Loài Người",
        author: "Yuval Noah Harari",
        category: "Lịch sử",
        originalPrice: 250000,
        salePrice: 180000,
        imageUrl: "",
        isFlashSale: true,
        soldQuantity: 62,
        totalQuantity: 150,
        status: "active"
    },
    {
        id: "fs-6",
        slug: "muon-kiep-nhan-sinh",
        title: "Muôn Kiếp Nhân Sinh",
        author: "Nguyên Phong",
        category: "Tâm linh",
        originalPrice: 168000,
        salePrice: 135000,
        imageUrl: "",
        isFlashSale: true,
        soldQuantity: 0,
        totalQuantity: 100,
        status: "upcoming"
    },
    {
        id: "fs-7",
        slug: "kheo-an-kheo-noi",
        title: "Khéo Ăn Khéo Nói Sẽ Có Được Thiên Hạ",
        author: "Trác Nhã",
        category: "Kỹ năng",
        originalPrice: 110000,
        salePrice: 77000,
        imageUrl: "",
        isFlashSale: true,
        soldQuantity: 0,
        totalQuantity: 200,
        status: "upcoming"
    }
];

export default function FlashSalePage() {
    const [activeTab, setActiveTab] = useState<"active" | "upcoming">("active");

    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 12);
    const { hours, minutes, seconds } = useCountdown(targetDate);

    const pad = (n: number) => n.toString().padStart(2, '0');

    const filteredItems = ALL_FLASH_SALES.filter(item => item.status === activeTab);

    return (
        <div className="bg-background min-h-screen">
            {/* 1. Hero / Header Section */}
            <div className="bg-primary pt-12 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 max-w-xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full border border-accent/30 backdrop-blur-sm">
                                <Zap size={16} className="fill-accent" />
                                <span className="text-sm font-bold uppercase tracking-widest">Sự kiện giới hạn</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                                ĐẠI TIỆC <br /> <span className="text-accent underline decoration-4 underline-offset-8">FLASH SALE</span>
                            </h1>
                            <p className="text-white/70 text-lg leading-relaxed">
                                Cơ hội duy nhất trong ngày sở hữu những tựa sách hay nhất với mức giá không tưởng. Đừng bỏ lỡ!
                            </p>
                        </div>

                        {/* Banner Countdown Card */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6 min-w-[320px]">
                            <span className="text-white/60 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                                <Clock size={16} /> Kết thúc sau
                            </span>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="text-6xl font-black text-white">{pad(hours)}</div>
                                    <span className="text-[10px] text-white/50 uppercase font-bold mt-1">Giờ</span>
                                </div>
                                <span className="text-4xl font-light text-white/30 animate-pulse mt-[-20px]">:</span>
                                <div className="flex flex-col items-center">
                                    <div className="text-6xl font-black text-white">{pad(minutes)}</div>
                                    <span className="text-[10px] text-white/50 uppercase font-bold mt-1">Phút</span>
                                </div>
                                <span className="text-4xl font-light text-white/30 animate-pulse mt-[-20px]">:</span>
                                <div className="flex flex-col items-center">
                                    <div className="text-6xl font-black text-accent">{pad(seconds)}</div>
                                    <span className="text-[10px] text-accent/50 uppercase font-bold mt-1">Giây</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
            </div>

            {/* 2. Navigation & Filters */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Tabs */}
                    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl w-full md:w-auto">
                        <button
                            onClick={() => setActiveTab("active")}
                            className={cn(
                                "flex-1 md:flex-none px-8 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
                                activeTab === "active" ? "bg-white text-primary shadow-sm" : "hover:text-primary/70 text-slate-400"
                            )}
                        >
                            <Zap size={18} className={activeTab === "active" ? "fill-primary" : ""} />
                            ĐANG DIỄN RA
                        </button>
                        <button
                            onClick={() => setActiveTab("upcoming")}
                            className={cn(
                                "flex-1 md:flex-none px-8 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
                                activeTab === "upcoming" ? "bg-white text-primary shadow-sm" : "hover:text-primary/70 text-slate-400"
                            )}
                        >
                            <Calendar size={18} />
                            SẮP DIỄN RA
                        </button>
                    </div>

                    {/* Filters (Desktop Only for now) */}
                    <div className="hidden sm:flex items-center gap-2">
                        <Button variant="ghost" className="text-slate-600 font-semibold gap-2">
                            <Filter size={18} /> Lọc
                        </Button>
                        <Button variant="ghost" className="text-slate-600 font-semibold gap-2">
                            <SortAsc size={18} /> Giá thấp-cao
                        </Button>
                    </div>
                </div>
            </div>

            {/* 3. Product Grid */}
            <div className="container mx-auto px-4 py-16">
                {activeTab === "upcoming" && (
                    <div className="mb-8 p-4 bg-accent/5 border border-accent/20 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center animate-bounce">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">Chuẩn bị sẵn sàng!</p>
                            <p className="text-sm text-slate-600 italic">Bấm "Nhận thông báo" để không bỏ lỡ đợt săn hot deal này.</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {filteredItems.map((book) => (
                        <div key={book.id} className="relative">
                            <ProductCard {...book} />
                            {activeTab === "upcoming" && (
                                <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[2px] rounded-xl flex items-center justify-center pointer-events-none">
                                    <div className="bg-white shadow-lg border border-slate-100 p-4 rounded-xl text-center">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bắt đầu sau</p>
                                        <p className="text-lg font-black text-primary">02:45:12</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <Zap size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900">Hiện không có deal nào</h3>
                        <p className="text-slate-500 mt-2">Vui lòng quay lại sau ít phút hoặc xem các mục ưu đãi khác.</p>
                        <Link href="/">
                            <Button className="mt-8" variant="outline">Quay về trang chủ</Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* 4. Footer CTA */}
            <div className="container mx-auto px-4 pb-20">
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                        <h2 className="text-3xl font-bold">Chưa tìm thấy cuốn sách bạn cần?</h2>
                        <p className="text-white/60 max-w-lg mx-auto">
                            Đừng lo, chúng tôi liên tục cập nhật các deal hời mỗi giờ. Nhập Email để nhận ngay danh sách hot deal tiếp theo!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                            <input
                                type="email"
                                placeholder="Email của bạn..."
                                className="flex-1 h-12 rounded-xl bg-white/10 border border-white/20 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <Button className="bg-accent hover:bg-accent-hover h-12 px-8 font-bold text-white">
                                Nhận tin deal
                            </Button>
                        </div>
                    </div>
                    {/* BG Decor */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(15,118,110,0.2),transparent)]" />
                </div>
            </div>
        </div>
    );
}
