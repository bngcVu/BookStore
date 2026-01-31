"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { cn, formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface CartItemProps {
    item: any;
    selected: boolean;
    onSelect: (id: number) => void;
    onUpdateQuantity: (id: number, newQuantity: number) => void;
    onRemove: (id: number) => void;
}

export function CartItem({ item, selected, onSelect, onUpdateQuantity, onRemove }: CartItemProps) {
    return (
        <div className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm relative group overflow-hidden">
            {/* Selection Checkbox */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onSelect(item.id)}
                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer accent-primary"
                />
            </div>

            {/* Image */}
            <Link href={`/product/${item.slug}`} className="relative w-24 aspect-[3/4] rounded-lg overflow-hidden border border-slate-100 shrink-0">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </Link>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <Link href={`/product/${item.slug}`} className="font-heading font-bold text-slate-900 line-clamp-1 hover:text-primary transition-colors">
                            {item.title}
                        </Link>
                        <p className="text-xs text-slate-500 font-medium">{item.author}</p>
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-end justify-between mt-2">
                    {/* Price */}
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-black text-rose-500 text-lg">
                                {formatCurrency(item.price)}
                            </span>
                            {item.original_price > item.price && (
                                <span className="text-xs text-slate-400 line-through font-medium">
                                    {formatCurrency(item.original_price)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 h-9">
                        <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm rounded-l-lg transition-all"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-slate-900">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm rounded-r-lg transition-all"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
