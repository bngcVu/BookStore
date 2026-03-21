"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Minus, Plus, Trash2, ArrowRight, Ticket, ShieldCheck, Truck, Package, PlusCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock Cart Data
const initialCart = [
    {
        id: "cart-1",
        bookId: "1",
        title: "Nghệ Thuật Tư Duy Rành Mạch",
        author: "Rolf Dobelli",
        price: 145000,
        originalPrice: 190000,
        quantity: 1,
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300",
    },
    {
        id: "cart-2",
        bookId: "2",
        title: "Nhà Giả Kim",
        author: "Paulo Coelho",
        price: 99000,
        originalPrice: 150000,
        quantity: 2,
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300",
    }
];

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCart);
    const [voucher, setVoucher] = useState("");
    const [discount, setDiscount] = useState(0);

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const applyVoucher = () => {
        if (voucher.toUpperCase() === "BOOKSTORE20") {
            setDiscount(20000);
            alert("Áp dụng mã giảm giá 20K thành công!");
        } else {
            alert("Mã giảm giá không hợp lệ");
            setDiscount(0);
        }
    };

    const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const total = Math.max(0, subTotal - discount);

    // Phase 3: Smart Fulfillment Logic
    const freeShippingTarget = 300000;
    const remainingForFreeShipping = Math.max(0, freeShippingTarget - subTotal);
    const shippingProgress = Math.min((subTotal / freeShippingTarget) * 100, 100);

    const crossSellItems = [
        { id: "cs-1", name: "Bookmark Từ Đứng Form", price: 15000, img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=150" },
        { id: "cs-2", name: "Sổ Tay Bìa Da Basic", price: 45000, img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=150" }
    ];

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
                <div className="w-48 h-48 mb-6 opacity-50 grayscale flex items-center justify-center">
                    {/* Empty cart placeholder */}
                    <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="text-6xl">🛒</span>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Giỏ hàng của bạn đang trống</h2>
                <p className="text-slate-500 mb-8 max-w-sm">Hãy khám phá hàng ngàn tựa sách cực hay đang chờ bạn tại BookStore.</p>
                <Link href="/">
                    <Button size="lg" className="px-8 font-semibold">Tiếp tục mua sắm</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-[80vh] py-8 md:py-12">
            <div className="container mx-auto px-4">

                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Giỏ hàng <span className="text-slate-500 font-normal text-lg hidden sm:inline-block">({cartItems.length} sản phẩm)</span></h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Main Cart Items */}
                    <div className="w-full lg:w-2/3 space-y-6">

                        {/* 1. Free Shipping Progress Bar (Phase 3) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-primary/10 rounded-full text-primary shrink-0">
                                    <Truck size={20} />
                                </div>
                                <div className="flex-1">
                                    {remainingForFreeShipping > 0 ? (
                                        <p className="text-sm font-bold text-slate-800">
                                            Mua thêm <span className="text-primary">{remainingForFreeShipping.toLocaleString('vi-VN')}đ</span> để được <span className="text-emerald-500 uppercase tracking-tighter">Miễn phí giao hàng</span>
                                        </p>
                                    ) : (
                                        <p className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                                            🎉 Chúc mừng! Đơn hàng của bạn đã đủ điều kiện Freeship
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Progress value={shippingProgress} className="h-2.5 bg-slate-100" />
                        </div>

                        {/* 2. Cart Items Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">

                            {/* Table Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-slate-100 text-sm font-semibold text-slate-500 tracking-wide uppercase">
                                <div className="col-span-6">Sản phẩm</div>
                                <div className="col-span-2 text-center">Đơn giá</div>
                                <div className="col-span-2 text-center">Số lượng</div>
                                <div className="col-span-2 text-right">Thành tiền</div>
                            </div>

                            {/* Items */}
                            <div className="divide-y divide-slate-100">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="py-6 flex flex-col md:grid md:grid-cols-12 gap-4 md:items-center">

                                        {/* Product Info */}
                                        <div className="col-span-6 flex gap-4">
                                            <div className="relative w-24 h-32 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-200">
                                                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                                            </div>
                                            <div className="flex flex-col justify-center gap-1.5">
                                                <span className="text-xs text-slate-500">{item.author}</span>
                                                <Link href={`/product/${item.bookId}`} className="font-semibold text-slate-900 leading-snug hover:text-primary transition-colors line-clamp-2">
                                                    {item.title}
                                                </Link>
                                                {/* Mobile Price */}
                                                <div className="md:hidden mt-2 flex items-center gap-2">
                                                    <span className="font-bold text-slate-900">{item.price.toLocaleString('vi-VN')}đ</span>
                                                    <span className="text-xs text-slate-400 line-through">{item.originalPrice.toLocaleString('vi-VN')}đ</span>
                                                </div>
                                                {/* Remove Action */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 font-medium mt-auto md:mt-2 w-fit transition-colors"
                                                >
                                                    <Trash2 size={14} /> Xóa
                                                </button>
                                            </div>
                                        </div>

                                        {/* Desktop Price */}
                                        <div className="hidden md:flex flex-col items-center justify-center col-span-2">
                                            <span className="font-bold text-slate-900">{item.price.toLocaleString('vi-VN')}đ</span>
                                            <span className="text-xs text-slate-400 line-through">{item.originalPrice.toLocaleString('vi-VN')}đ</span>
                                        </div>

                                        {/* Quantity */}
                                        <div className="col-span-2 flex justify-center md:justify-center">
                                            <div className="flex items-center border border-slate-200 rounded-lg p-1 w-fit bg-slate-50">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded transition-colors disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-10 text-center font-medium text-slate-900 text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="hidden md:flex justify-end col-span-2">
                                            <span className="font-bold text-primary">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Cross-sell / Bundles (Phase 3) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                    <Package size={20} className="text-accent" /> Mua thêm phụ kiện
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {crossSellItems.map(item => (
                                    <div key={item.id} className="flex gap-4 p-3 border border-slate-100 rounded-xl hover:border-primary/50 transition-colors group">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                                            <Image src={item.img} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-col justify-center flex-1">
                                            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                                            <span className="text-accent font-semibold text-sm">{item.price.toLocaleString('vi-VN')}đ</span>
                                        </div>
                                        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all self-center">
                                            <PlusCircle size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Support Message */}
                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                            <ShieldCheck className="text-primary mt-0.5 shrink-0" size={20} />
                            <p className="text-sm text-slate-700 leading-relaxed">
                                <span className="font-semibold text-slate-900">Cam kết chính hãng:</span> Hoàn tiền 200% nếu phát hiện hàng giả nội dung. Đổi trả miễn phí trong vòng 7 ngày đối với các lỗi liên quan tới nhà xuất bản.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-24">
                        {/* Voucher Box */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Ticket className="text-accent shrink-0" size={20} />
                                <h3 className="font-bold text-slate-900">Mã khuyến mãi</h3>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Nhập mã giảm giá..."
                                    value={voucher}
                                    onChange={(e) => setVoucher(e.target.value)}
                                    className="flex-1 h-11 border border-slate-200 rounded-lg px-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary uppercase transition-colors"
                                />
                                <Button
                                    onClick={applyVoucher}
                                    variant="outline"
                                    className="h-11 font-semibold border-primary/20 text-primary hover:bg-primary/5 px-6 shrink-0"
                                >
                                    Áp dụng
                                </Button>
                            </div>
                            {/* Suggested Vouchers */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                <button onClick={() => { setVoucher("BOOKSTORE20"); setDiscount(20000); }} className="text-xs px-3 py-1.5 rounded bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors border border-primary/20">BOOKSTORE20</button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <h3 className="font-bold text-slate-900 mb-6 text-lg">Tổng quan đơn hàng</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between text-slate-600 text-sm">
                                    <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                                    <span className="font-medium text-slate-900">{subTotal.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-600 text-sm">
                                    <span>Phí giao hàng</span>
                                    <span className="font-medium text-slate-400">Chưa tính</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex items-center justify-between text-green-600 text-sm font-medium">
                                        <span>Khuyến mãi</span>
                                        <span>-{discount.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-slate-100 pt-4 mb-8">
                                <div className="flex items-end justify-between">
                                    <span className="font-semibold text-slate-900">Tổng cộng</span>
                                    <div className="flex flex-col items-end">
                                        <span className="text-2xl font-bold text-primary">{total.toLocaleString('vi-VN')}đ</span>
                                        <span className="text-xs text-slate-400">(Đã bao gồm VAT nếu có)</span>
                                    </div>
                                </div>
                            </div>

                            <Link href="/checkout" className="block w-full">
                                <Button size="lg" className="w-full text-base font-semibold h-14">
                                    Tiến hành thanh toán <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
