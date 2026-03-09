"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductCard, ProductCardProps } from './ProductCard';

interface ProductCarouselProps {
    products: ProductCardProps[];
    title?: string;
    showArrows?: boolean;
}

export function ProductCarousel({ products, title, showArrows = true }: ProductCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
    });

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="relative group/carousel px-4 lg:px-0">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 lg:gap-6 ml-[-1rem]">
                    {products.map((product) => (
                        <div key={product.id} className="flex-[0_0_75%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_20%] pl-4 lg:pl-6 min-w-0">
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </div>

            {showArrows && (
                <>
                    <button
                        onClick={scrollPrev}
                        disabled={!prevBtnEnabled}
                        className={cn(
                            "absolute left-[-15px] lg:left-[-25px] top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl border border-slate-100 text-slate-600 transition-all z-30",
                            prevBtnEnabled ? "opacity-0 group-hover/carousel:opacity-100 hover:bg-primary hover:text-white" : "opacity-0 pointer-events-none"
                        )}
                        aria-label="Previous products"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={scrollNext}
                        disabled={!nextBtnEnabled}
                        className={cn(
                            "absolute right-[-15px] lg:right-[-25px] top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl border border-slate-100 text-slate-600 transition-all z-30",
                            nextBtnEnabled ? "opacity-0 group-hover/carousel:opacity-100 hover:bg-primary hover:text-white" : "opacity-0 pointer-events-none"
                        )}
                        aria-label="Next products"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}
        </div>
    );
}
