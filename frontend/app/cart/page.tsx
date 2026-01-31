"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VoucherListModal } from '@/components/features/VoucherListModal';
import { CartItem } from "@/components/features/CartItem";
import { ProductCard } from "@/components/features/ProductCard"; // For Cross-sell
import { cartAPI, MOCK_BOOKS } from "@/lib/api-mock";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag, Ticket, ArrowRight, Truck, ShieldCheck, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [availableVouchers, setAvailableVouchers] = useState<any[]>([]);
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

    // Legacy state kept for compatibility if needed, but primary flow is now via modal
    const [voucherCode, setVoucherCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [voucherError, setVoucherError] = useState("");

    const FREESHIP_THRESHOLD = 250000;
    const SHIPPING_FEE = 30000;

    // Cross-sell items (simulating from user_book_interactions recomendations)
    const suggestedBooks = MOCK_BOOKS.slice(0, 4);

    useEffect(() => {
        async function loadCart() {
            setLoading(true);
            try {
                const [cartData, voucherData] = await Promise.all([
                    cartAPI.getCart(),
                    cartAPI.getAvailableVouchers()
                ]);

                // Data augmentation for Variants + Stock simulation
                const enhancedData = cartData.map(item => ({
                    ...item,
                    variant_name: Math.random() > 0.5 ? 'Bìa cứng' : 'Bìa mềm', // Simulated from book_variants
                    stock: Math.floor(Math.random() * 10) + 1 // Simulated from inventory
                }));
                setCartItems(enhancedData);
                setSelectedIds(cartData.map((item: any) => item.id));
                setAvailableVouchers(voucherData);
            } catch (error) {
                console.error("Failed to load cart", error);
            } finally {
                setLoading(false);
            }
        }
        loadCart();
    }, []);

    const handleUpdateQuantity = (id: number, newQty: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                // Available Stock Check
                if (newQty > item.stock) {
                    alert(`Xin lỗi, chỉ còn ${item.stock} sản phẩm trong kho!`);
                    return item;
                }
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const handleRemove = (id: number) => {
        if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            setCartItems(prev => prev.filter(item => item.id !== id));
            setSelectedIds(prev => prev.filter(sid => sid !== id));
        }
    };

    const handleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === cartItems.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(cartItems.map(item => item.id));
        }
    };

    const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Smart Voucher Logic linked to DB schema concepts (min_order_value)
    const handleApplyVoucher = () => {
        setVoucherError("");
        setDiscount(0);

        const code = voucherCode.toUpperCase().trim();

        if (!code) return;

        // Mock Voucher Logic simulating backend check against 'vouchers' table
        if (code === "WELCOME20") {
            if (subtotal < 100000) {
                setVoucherError("Đơn hàng tối thiểu 100k để dùng mã này.");
                return;
            }
            setDiscount(20000);
            alert("Áp dụng mã WELCOME20 thành công!");
        } else if (code === "FREESHIP") {
            if (subtotal < 200000) {
                setVoucherError("Đơn hàng tối thiểu 200k để freeship.");
                return;
            }
            setDiscount(SHIPPING_FEE);
            alert("Áp dụng mã Freeship thành công!");
        } else {
            setVoucherError("Mã giảm giá không tồn tại hoặc đã hết hạn.");
        }
    };

    const shipping = subtotal >= FREESHIP_THRESHOLD ? 0 : (selectedItems.length > 0 ? SHIPPING_FEE : 0);
    // If voucher covers shipping (FREESHIP code logic), we need to ensure we don't double discount if already qualified
    // But for simplicity here, discount is just subtracted from total.

    const finalTotal = Math.max(0, subtotal + shipping - discount);
    const percentToFreeship = Math.min(100, (subtotal / FREESHIP_THRESHOLD) * 100);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium">Đang tải giỏ hàng...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="container mx-auto px-4 py-8 md:py-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                    <Link href="/" className="hover:text-primary">Trang chủ</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900 font-medium">Giỏ hàng</span>
                </div>

                <div className="flex items-end justify-between mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <ShoppingBag className="w-8 h-8 text-primary" />
                        Giỏ hàng <span className="text-lg font-medium text-slate-400">({cartItems.length} sản phẩm)</span>
                    </h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-slate-100 shadow-sm text-center">
                        <ShoppingBag className="w-20 h-20 text-slate-200 mb-6" />
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Giỏ hàng trống</h2>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">Có vẻ như bạn chưa thêm cuốn sách nào vào giỏ hàng. Hãy khám phá kho sách khổng lồ của chúng tôi ngay!</p>
                        <Link href="/" className="px-8 py-4 bg-primary text-white rounded-xl font-black uppercase tracking-widest hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95">
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Cart Items */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* FreeShip Progress */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <Truck className="w-5 h-5 text-emerald-500" />
                                    <div className="flex-1">
                                        {subtotal >= FREESHIP_THRESHOLD ? (
                                            <p className="text-sm font-bold text-emerald-600">Bạn đã đủ điều kiện Miễn Phí Vận Chuyển!</p>
                                        ) : (
                                            <p className="text-sm font-medium text-slate-600">Mua thêm <span className="font-bold text-slate-900">{formatCurrency(FREESHIP_THRESHOLD - subtotal)}</span> để được <span className="text-emerald-500 font-bold">Freeship</span></p>
                                        )}
                                    </div>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                        style={{ width: `${percentToFreeship}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Select All Header */}
                            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.length === cartItems.length && cartItems.length > 0}
                                    onChange={handleSelectAll}
                                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer accent-primary"
                                />
                                <span className="text-sm font-bold text-slate-700">Chọn tất cả ({cartItems.length})</span>
                            </div>

                            {/* Items List */}
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="relative">
                                        <CartItem
                                            item={item}
                                            selected={selectedIds.includes(item.id)}
                                            onSelect={handleSelect}
                                            onUpdateQuantity={handleUpdateQuantity}
                                            onRemove={handleRemove}
                                        />
                                        {/* Variant & Stock Info Overlay/Badge could go here */}
                                        {item.stock < 5 && (
                                            <div className="absolute top-4 right-12 text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded">
                                                Chỉ còn {item.stock} sp
                                            </div>
                                        )}
                                        {/* Display Variant Name inside Item if supported, 
                                            currently CartItem logic needs update or pass as prop 
                                            NOTE: Modifying CartItem inside the loop via props only */}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="lg:col-span-4 space-y-6 sticky top-24">
                            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-lg shadow-slate-200/50">
                                <h3 className="font-black text-slate-900 text-lg mb-6">Tổng đơn hàng</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Tạm tính</span>
                                        <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Giảm giá</span>
                                        <span className={discount > 0 ? "font-bold text-emerald-500" : "font-bold text-slate-900"}>
                                            -{formatCurrency(discount)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Phí vận chuyển</span>
                                        <span className="font-bold text-slate-900">{formatCurrency(shipping)}</span>
                                    </div>
                                    <div className="h-px bg-slate-100 my-2"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="font-bold text-slate-900">Tổng cộng</span>
                                        <div className="text-right">
                                            <span className="block text-2xl font-black text-rose-500 tracking-tight">{formatCurrency(finalTotal)}</span>
                                            <span className="text-xs text-slate-400 font-medium">(Đã bao gồm VAT)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Voucher Selector */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Ticket className="w-4 h-4 text-primary" />
                                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Mã giảm giá</span>
                                    </div>

                                    {voucherCode ? (
                                        <div className="flex items-center justify-between bg-white border border-primary/30 p-3 rounded-xl shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                                    <Ticket className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm">{voucherCode}</p>
                                                    <p className="text-xs text-emerald-600 font-bold">Đã áp dụng</p>
                                                </div>
                                            </div>
                                            <button onClick={() => { setVoucherCode(""); setDiscount(0); }} className="text-slate-400 hover:text-rose-500 p-1">
                                                <span className="sr-only">Xóa</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setIsVoucherModalOpen(true)}
                                            className="w-full bg-white border border-dashed border-slate-300 hover:border-primary hover:text-primary text-slate-500 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                                        >
                                            <Ticket className="w-4 h-4" />
                                            Chọn hoặc nhập mã
                                        </button>
                                    )}
                                </div>



                                <Link href="/checkout" className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 transition-all active:scale-95 group">
                                    Thanh toán ngay <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    <ShieldCheck className="w-4 h-4" />
                                    Bảo mật thanh toán 100%
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cross-Sell / Recommendations Section */}
                <div className="mt-20 border-t border-slate-100 pt-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-heading font-black text-slate-900 uppercase tracking-tight">
                            Có thể bạn muốn mua kèm
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                        {suggestedBooks.map(book => (
                            <ProductCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </main>

            <VoucherListModal
                isOpen={isVoucherModalOpen}
                onClose={() => setIsVoucherModalOpen(false)}
                vouchers={availableVouchers}
                cartTotal={subtotal}
                currentVoucherCode={voucherCode}
                onApply={(voucher) => {
                    setVoucherCode(voucher.code);
                    // Simple discount logic based on type
                    if (voucher.discount_type === 'percent') {
                        const d = Math.min(voucher.max_discount || Infinity, subtotal * (voucher.discount_value / 100));
                        setDiscount(d);
                    } else {
                        setDiscount(voucher.discount_value);
                    }
                    setIsVoucherModalOpen(false);
                }}
            />

            <Footer />
        </div>
    );
}
