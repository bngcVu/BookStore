import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
    id: string;
    slug: string;
    title: string;
    author: string;
    category: string;
    originalPrice: number;
    salePrice?: number;
    imageUrl: string;

    // Flash sale extra features
    isFlashSale?: boolean;
    soldQuantity?: number;
    totalQuantity?: number;

    className?: string;
}

export function ProductCard({
    slug,
    title,
    category,
    originalPrice,
    salePrice,
    imageUrl,
    isFlashSale,
    soldQuantity = 0,
    totalQuantity = 100,
    className
}: ProductCardProps) {

    const discountPercent = salePrice
        ? Math.round((1 - salePrice / originalPrice) * 100)
        : 0;

    const soldPercent = totalQuantity > 0 ? (soldQuantity / totalQuantity) * 100 : 0;
    const isSoldOut = soldQuantity >= totalQuantity;

    return (
        <div className={cn("group flex flex-col gap-3 bg-white border border-slate-100 rounded-xl p-3 transition-all duration-300 hover:shadow-lg hover:border-slate-200 relative", className)}>

            {/* Discount Badge */}
            {discountPercent > 0 && (
                <Badge variant="accent" className="absolute top-4 left-4 z-10 font-bold px-2 py-1 shadow-sm">
                    -{discountPercent}%
                </Badge>
            )}

            {/* Wishlist Button */}
            <button
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                aria-label="Thêm vào danh sách yêu thích"
                title="Thêm vào yêu thích"
            >
                <Heart size={16} />
            </button>

            {/* Image Container */}
            <Link href={`/product/${slug}`} className="aspect-[3/4] bg-slate-50 rounded-lg relative overflow-hidden flex items-center justify-center">
                {/* Placeholder if no image */}
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                ) : (
                    <span className="text-slate-300 font-medium">No Cover</span>
                )}
            </Link>

            {/* Content */}
            <div className="flex flex-col gap-1.5 flex-1 justify-between mt-1">
                <div>
                    <Link href={`/category/${category.toLowerCase()}`} className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold hover:text-primary transition-colors">
                        {category}
                    </Link>
                    <Link href={`/product/${slug}`}>
                        <h3 className="font-medium text-slate-900 leading-tight line-clamp-2 mt-1 group-hover:text-primary transition-colors min-h-[2.5rem]">
                            {title}
                        </h3>
                    </Link>
                </div>

                {/* Pricing */}
                <div className="mt-2 text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-accent text-lg leading-none">
                            {(salePrice || originalPrice).toLocaleString('vi-VN')}đ
                        </span>
                        {salePrice && (
                            <span className="text-xs text-slate-400 line-through leading-none">
                                {originalPrice.toLocaleString('vi-VN')}đ
                            </span>
                        )}
                    </div>
                </div>

                {/* Flash Sale Progress */}
                {isFlashSale && (
                    <div className="mt-3 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[10px] font-medium text-slate-500">
                            <span className="uppercase tracking-wider">
                                {isSoldOut ? "Đã bán hết" : "Đã bán"}
                            </span>
                            <span className="text-accent font-bold">{soldPercent.toFixed(0)}%</span>
                        </div>
                        <Progress value={soldPercent} className="h-1.5" />
                    </div>
                )}

                {/* Action Button */}
                {!isFlashSale && (
                    <Button
                        size="sm"
                        variant="default"
                        className="w-full mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all font-medium"
                        disabled={isSoldOut}
                    >
                        <ShoppingCart size={16} />
                        {isSoldOut ? "Tạm hết hàng" : "Thêm Giỏ Hàng"}
                    </Button>
                )}
            </div>
        </div>
    );
}
