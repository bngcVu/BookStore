"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { wishlistAPI } from "@/lib/api-mock";

interface WishlistButtonProps {
    bookId: number;
    initialState?: boolean;
    size?: 'sm' | 'md' | 'lg';
    onToggle?: (isWishlisted: boolean) => void;
}

export function WishlistButton({
    bookId,
    initialState = false,
    size = 'md',
    onToggle
}: WishlistButtonProps) {
    const [isWishlisted, setIsWishlisted] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoading) return;
        setIsLoading(true);

        try {
            if (isWishlisted) {
                await wishlistAPI.removeFromWishlist(1, bookId);
            } else {
                await wishlistAPI.addToWishlist(1, bookId);
            }
            const newState = !isWishlisted;
            setIsWishlisted(newState);
            onToggle?.(newState);
        } catch (error) {
            console.error('Failed to toggle wishlist:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={cn(
                sizeClasses[size],
                "rounded-full flex items-center justify-center",
                "bg-white/80 backdrop-blur-md shadow-md",
                "hover:bg-white hover:scale-110",
                "transition-all duration-300",
                "border border-slate-100",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "group cursor-pointer z-20"
            )}
            aria-label={isWishlisted ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
        >
            <Heart
                className={cn(
                    iconSizes[size],
                    "transition-all duration-300",
                    isWishlisted
                        ? "fill-red-500 text-red-500 scale-110"
                        : "text-slate-300 group-hover:text-red-400 group-hover:scale-110"
                )}
            />
        </button>
    );
}
