"use client";
import Link from 'next/link';
import { Coffee, CloudRain, Zap, BookOpen } from 'lucide-react';

const moods = [
    {
        id: 1,
        title: "Sách & Cafe",
        subtitle: "Nhẹ nhàng sáng Chủ Nhật",
        icon: <Coffee className="w-6 h-6 text-amber-700" />,
        color: "bg-amber-100 text-amber-900 border-amber-200",
        hoverColor: "hover:border-amber-400 hover:shadow-amber-100",
        href: "/collections/coffee-books"
    },
    {
        id: 2,
        title: "Ngày Mưa Đọc Gì?",
        subtitle: "Trinh thám & Ly kỳ",
        icon: <CloudRain className="w-6 h-6 text-slate-700" />,
        color: "bg-slate-100 text-slate-900 border-slate-200",
        hoverColor: "hover:border-slate-400 hover:shadow-slate-100",
        href: "/collections/rainy-day"
    },
    {
        id: 3,
        title: "Nâng Cấp Bản Thân",
        subtitle: "Kinh tế & Kỹ năng",
        icon: <Zap className="w-6 h-6 text-blue-700" />,
        color: "bg-blue-50 text-blue-900 border-blue-200",
        hoverColor: "hover:border-blue-400 hover:shadow-blue-100",
        href: "/collections/self-growth"
    },
    {
        id: 4,
        title: "Góc Chữa Lành",
        subtitle: "Tâm lý & Thiền",
        icon: <BookOpen className="w-6 h-6 text-emerald-700" />,
        color: "bg-emerald-50 text-emerald-900 border-emerald-200",
        hoverColor: "hover:border-emerald-400 hover:shadow-emerald-100",
        href: "/collections/healing"
    }
];

export function MoodCollections() {
    return (
        <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Đọc gì hôm nay?</h2>
                <span className="text-sm text-slate-500 font-medium px-3 py-1 bg-slate-100 rounded-full">Gợi ý theo tâm trạng</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {moods.map((mood) => (
                    <Link key={mood.id} href={mood.href} className="group">
                        <div className={`
                            h-full p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
                            flex flex-col gap-3 ${mood.color} ${mood.hoverColor}
                        `}>
                            <div className="bg-white/60 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform">
                                {mood.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight">{mood.title}</h3>
                                <p className="text-xs opacity-80 mt-1 font-medium">{mood.subtitle}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
