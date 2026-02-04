"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Book } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductCarouselProps {
    books: Book[];
    className?: string;
}

export function ProductCarousel({ books, className }: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeft(scrollLeft > 10);
        setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [books]);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const scrollAmount = scrollRef.current.clientWidth * 0.8;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className={cn("relative group/carousel", className)}>
            {/* Navigation Buttons */}
            {showLeft && (
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            )}

            {showRight && (
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            )}

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-6 px-4"
            >
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="w-[160px] sm:w-[180px] md:w-[200px] shrink-0 snap-start"
                    >
                        <ProductCard book={book} />
                    </div>
                ))}
            </div>
        </div>
    );
}
