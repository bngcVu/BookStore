"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface BannerSlide {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    imageUrl: string;
    colorClass: string;
}

const BANNERS: BannerSlide[] = [
    {
        id: "slide-1",
        title: "Khai mở tri thức.",
        subtitle: "Đánh thức tiềm năng.",
        description: "Hàng ngàn tựa sách chất lượng cao được tuyển chọn khắt khe. Trải nghiệm mua sắm tối giản và nhanh chóng nhất.",
        ctaText: "Khám phá ngay",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1200",
        colorClass: "bg-slate-50 border-b border-slate-100"
    },
    {
        id: "slide-2",
        title: "Flash Sale Mỗi Ngày.",
        subtitle: "Giảm tới 50%",
        description: "Săn deal sách HOT với giá cực sốc trong khung giờ vàng 12h - 14h hàng ngày. Đừng bỏ lỡ!",
        ctaText: "Săn Deal Ngay",
        imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1200",
        colorClass: "bg-accent/5 border-b border-accent/10"
    },
    {
        id: "slide-3",
        title: "Tủ sách Kinh tế - Kinh doanh",
        subtitle: "Ưu đãi lên tới 35%",
        description: "Ưu đãi lên tới 35% cho các tựa sách khởi nghiệp & đầu tư.",
        ctaText: "Xem ngay",
        imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200",
        colorClass: "bg-primary/5 border-b border-primary/10"
    },
    {
        id: "slide-4",
        title: "Thưởng Thức Sách Trẻ.",
        subtitle: "Phát triển tư duy",
        description: "Tuyển tập sách thiếu nhi hay nhất giúp bé phát triển trí tuệ, rèn luyện nhân cách từ sớm.",
        ctaText: "Đọc tủ sách Bé",
        imageUrl: "https://images.unsplash.com/photo-1585776466986-e82dfed6132d?auto=format&fit=crop&q=80&w=1200",
        colorClass: "bg-stone-50 border-b border-stone-100"
    }
];

export function BannerCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="relative group overflow-hidden">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {BANNERS.map((slide, index) => (
                        <div key={slide.id} className={cn("flex-[0_0_100%] min-w-0 relative flex items-center min-h-[60vh]", slide.colorClass)}>
                            <div className="container mx-auto px-4 lg:grid lg:grid-cols-12 gap-8 items-center relative z-10 w-full">
                                <div className="lg:col-span-6 space-y-6 py-20 px-4">
                                    <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                                        {slide.title}<br />
                                        <span className="text-primary">{slide.subtitle}</span>
                                    </h2>
                                    <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                                        {slide.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 pt-4">
                                        <Button size="lg" className="h-14 px-8 text-base shadow-md">
                                            {slide.ctaText}
                                        </Button>
                                        {index === 0 && (
                                            <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-white/80 backdrop-blur-sm shadow-sm border-slate-200 text-slate-700">
                                                Tra cứu Sách giảm giá
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Image side - only visible on md and up */}
                                <div className="hidden lg:flex lg:col-span-6 justify-center items-center h-full p-8">
                                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                                        <Image
                                            src={slide.imageUrl}
                                            alt={slide.title}
                                            fill
                                            priority={index === 0}
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent" />
                                    </div>
                                </div>
                            </div>

                            {/* Abstract Background Element */}
                            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/5 -skew-x-12 translate-x-16 pointer-events-none border-l border-primary/10 -z-10" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Controls */}
            <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-slate-200 text-slate-600 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-primary z-20"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-slate-200 text-slate-600 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-primary z-20"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                {BANNERS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-300",
                            selectedIndex === index ? "bg-primary w-8" : "bg-slate-300/80 hover:bg-slate-400"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
