import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative w-full rounded-3xl overflow-hidden bg-[#B4ACA3] h-[400px] shadow-lg">
            {/* Background Image / Texture mockup */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-600/80 to-transparent z-10" />

            {/* In a real app, use an Image component here for the books background */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-stone-300 relative">
                    {/* Placeholder for the books stack image */}
                    <div className="absolute right-0 bottom-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2998&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply opacity-80"></div>
                </div>
            </div>

            <div className="relative z-20 h-full flex flex-col justify-center px-12 max-w-2xl text-white">
                <span className="inline-block px-4 py-1.5 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg mb-4 w-fit shadow-md">
                    Ưu Đãi Mùa Hè
                </span>
                <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                    Lễ Hội Đọc Sách <br /> Mùa Hè 2024
                </h1>
                <p className="text-lg md:text-xl font-medium text-white/90 mb-8 max-w-md leading-relaxed">
                    Giảm giá lên đến <span className="font-bold text-white">50%</span> cho các tựa sách trinh thám, tiểu thuyết bán chạy nhất.
                </p>
                <div className="flex items-center gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                        Mua Ngay
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                        Xem Sách Bán Chạy
                    </button>
                </div>
            </div>
        </section>
    );
}
