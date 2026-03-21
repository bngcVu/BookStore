"use client";

import { cn } from "@/lib/utils";

export function ProductSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-col gap-3 bg-white border border-slate-100 rounded-xl p-3 animate-pulse", className)}>
            {/* Image Skeleton */}
            <div className="aspect-[3/4] bg-slate-100 rounded-lg w-full" />

            {/* Content Skeleton */}
            <div className="flex flex-col gap-2 mt-1">
                <div className="h-3 bg-slate-100 rounded w-1/3" />
                <div className="h-5 bg-slate-100 rounded w-full" />
                <div className="h-5 bg-slate-100 rounded w-3/4" />

                <div className="flex items-center gap-2 mt-2">
                    <div className="h-6 bg-slate-100 rounded w-24" />
                    <div className="h-4 bg-slate-100 rounded w-16" />
                </div>

                <div className="h-9 bg-slate-100 rounded-lg w-full mt-2" />
            </div>
        </div>
    );
}

export function ProductCarouselSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
            {[...Array(5)].map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    );
}
