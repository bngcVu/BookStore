import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
        <div className="relative w-full h-[400px] bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 group">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-400 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
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

            {/* Decorative Image */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-12 w-[500px] h-[500px] hidden lg:block transform group-hover:scale-105 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" alt="Book cover" className="w-full h-full object-cover rounded-l-3xl shadow-2xl rotate-[-5deg] border-8 border-white/10" />
            </div>
        </div>
    );
}
