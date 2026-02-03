"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { formatCurrency } from "@/lib/utils";
import { MapPin, CreditCard, Truck, ChevronRight, ShieldCheck, CheckCircle2, Copy, Sparkles, Plus } from "lucide-react";
import Link from "next/link";
import { cartAPI, MOCK_ADDRESSES } from "@/lib/api-mock";
import Image from "next/image";
import { AddressListModal } from "@/components/features/AddressListModal";

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [shippingMethod, setShippingMethod] = useState("standard");
    const [usePoints, setUsePoints] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Address State
    const [selectedAddress, setSelectedAddress] = useState(MOCK_ADDRESSES[0]);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    // Mock calculations
    const SHIPPING_FEE = shippingMethod === 'express' ? 50000 : 30000;
    const DISCOUNT = 20000; // Mock voucher discount
    const POINTS_DISCOUNT = usePoints ? 15000 : 0;

    useEffect(() => {
        async function loadCart() {
            try {
                const data = await cartAPI.getCart();
                setCartItems(data);
            } catch (error) {
                console.error("Failed to load checkout data", error);
            } finally {
                setLoading(false);
            }
        }
        loadCart();
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + SHIPPING_FEE - DISCOUNT - POINTS_DISCOUNT;

    const handlePlaceOrder = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setOrderSuccess(true);
            setLoading(false);
        }, 1500);
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full border border-slate-100 animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 mb-2">Đặt hàng thành công!</h1>
                        <p className="text-slate-500 mb-8">Cảm ơn bạn đã mua sắm tại BookStore. Mã đơn hàng của bạn là <span className="font-bold text-slate-900">#ORD-8829</span></p>

                        <div className="flex flex-col gap-3">
                            <Link href="/profile" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold uppercase tracking-wide hover:bg-slate-800 transition-all">
                                Quản lý đơn hàng
                            </Link>
                            <Link href="/" className="w-full bg-slate-100 text-slate-600 py-3.5 rounded-xl font-bold uppercase tracking-wide hover:bg-slate-200 transition-all">
                                Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="container mx-auto px-4 py-8 md:py-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                    <Link href="/cart" className="hover:text-primary">Giỏ hàng</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900 font-medium">Thanh toán</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Information */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Section: Delivery Address - REFACTORED */}
                        <div className="bg-white p-6 md:p-8 rounded-[24px] border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-black text-slate-900">Địa chỉ nhận hàng</h2>
                                </div>
                                <button
                                    onClick={() => setIsAddressModalOpen(true)}
                                    className="text-primary font-bold text-sm hover:underline"
                                >
                                    Thay đổi
                                </button>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-bold text-slate-900 text-lg">{selectedAddress?.recipient}</span>
                                        <span className="text-slate-300">|</span>
                                        <span className="font-bold text-slate-700">{selectedAddress?.phone}</span>
                                        {selectedAddress?.isDefault && (
                                            <span className="ml-2 px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded tracking-wider border border-red-100">Mặc định</span>
                                        )}
                                    </div>
                                    <p className="text-slate-600 mb-1">{selectedAddress?.address}</p>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-2">{selectedAddress?.name}</p>
                                </div>
                            </div>

                            <AddressListModal
                                isOpen={isAddressModalOpen}
                                onClose={() => setIsAddressModalOpen(false)}
                                addresses={MOCK_ADDRESSES}
                                selectedId={selectedAddress?.id}
                                onSelect={setSelectedAddress}
                            />
                        </div>

                        {/* Section: Shipping Method - Added based on table `shipping_carriers` */}
                        <div className="bg-white p-6 md:p-8 rounded-[24px] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-black text-slate-900">Phương thức vận chuyển</h2>
                            </div>

                            <div className="space-y-4">
                                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}>
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="standard"
                                        checked={shippingMethod === 'standard'}
                                        onChange={() => setShippingMethod('standard')}
                                        className="w-5 h-5 accent-primary"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-slate-900">Giao Hàng Tiêu Chuẩn</span>
                                                <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold border border-blue-100 uppercase tracking-wider">
                                                    <Truck className="w-3 h-3" />
                                                    PRO
                                                </div>
                                            </div>
                                            <span className="font-bold text-slate-900">{formatCurrency(30000)}</span>
                                        </div>
                                        <p className="text-xs text-slate-500">Dự kiến giao: 3-5 ngày</p>
                                    </div>
                                </label>

                                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}>
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="express"
                                        checked={shippingMethod === 'express'}
                                        onChange={() => setShippingMethod('express')}
                                        className="w-5 h-5 accent-primary"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-slate-900">Giao Hàng Hỏa Tốc</span>
                                                <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-bold border border-amber-100 uppercase tracking-wider">
                                                    <Sparkles className="w-3 h-3" />
                                                    FAST
                                                </div>
                                            </div>
                                            <span className="font-bold text-slate-900">{formatCurrency(50000)}</span>
                                        </div>
                                        <p className="text-xs text-slate-500">Dự kiến giao: 1-2 ngày</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Section: Loyalty Points - Added based on table `reward_points` */}
                        <div className="bg-white p-6 md:p-8 rounded-[24px] border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900">Điểm thưởng</h2>
                                        <p className="text-sm text-slate-500">Bạn có <span className="font-bold text-amber-600">1,500 điểm</span> (Trị giá 15.000đ)</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={usePoints} onChange={(e) => setUsePoints(e.target.checked)} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Section: Payment Method */}
                        <div className="space-y-4">
                            {/* COD */}
                            <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                    className="w-5 h-5 accent-primary"
                                />
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900">Thanh toán khi nhận hàng (COD)</p>
                                    <p className="text-xs text-slate-500">Bạn chỉ phải thanh toán khi đã nhận được hàng.</p>
                                </div>
                                <Truck className="w-6 h-6 text-slate-400" />
                            </label>

                            {/* Banking */}
                            <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'banking' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="banking"
                                    checked={paymentMethod === 'banking'}
                                    onChange={() => setPaymentMethod('banking')}
                                    className="w-5 h-5 accent-primary"
                                />
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900">Chuyển khoản ngân hàng (VietQR)</p>
                                    <p className="text-xs text-slate-500">Quét mã QR, tự động điền số tiền và nội dung.</p>
                                </div>
                                <div className="flex -space-x-2">

                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-[10px] font-bold shadow-sm">QR</div>
                                </div>
                            </label>

                            {paymentMethod === 'banking' && (
                                <div className="ml-9 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm shrink-0">
                                            {/* Dynamic VietQR Image */}
                                            <div className="w-40 h-40 relative">
                                                <Image
                                                    src={`https://img.vietqr.io/image/MB-999988886666-compact2.png?amount=${total}&addInfo=ORD8829&accountName=BOOKSTORE VN`}
                                                    alt="VietQR Payment"
                                                    fill
                                                    className="object-contain rounded-lg"
                                                    unoptimized // Required for external CDN if not configured
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-3 text-sm w-full">
                                            <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-xs leading-relaxed border border-blue-100">
                                                <span className="font-bold">💡 Lưu ý:</span> Vui lòng giữ nguyên nội dung chuyển khoản để hệ thống tự động xác nhận đơn hàng.
                                            </div>
                                            <div className="flex justify-between border-b border-slate-200 pb-2 border-dashed">
                                                <span className="text-slate-500">Ngân hàng</span>
                                                <span className="font-bold text-slate-900">MB Bank</span>
                                            </div>
                                            <div className="flex justify-between border-b border-slate-200 pb-2 border-dashed">
                                                <span className="text-slate-500">Số tài khoản</span>
                                                <span className="font-bold text-slate-900 flex items-center gap-2 group cursor-pointer" onClick={() => navigator.clipboard.writeText("999988886666")}>
                                                    999988886666
                                                    <Copy className="w-3 h-3 text-slate-400 group-hover:text-primary transition-colors" />
                                                </span>
                                            </div>
                                            <div className="flex justify-between border-b border-slate-200 pb-2 border-dashed">
                                                <span className="text-slate-500">Chủ tài khoản</span>
                                                <span className="font-bold text-slate-900">BOOKSTORE VN</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500">Số tiền</span>
                                                <span className="font-black text-lg text-primary">{formatCurrency(total)}</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-yellow-50 p-2 rounded border border-yellow-100">
                                                <span className="text-slate-600 text-xs">Nội dung</span>
                                                <span className="font-bold text-slate-900">ORD8829</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-4 space-y-6 sticky top-24">
                    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-lg shadow-slate-200/50">
                        <h3 className="font-black text-slate-900 text-lg mb-6">Đơn hàng của bạn</h3>

                        {/* Mini Items List */}
                        <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                            {loading ? (
                                <div className="text-center py-4 text-slate-400 text-sm">Đang tải...</div>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="w-14 h-20 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-slate-900 text-sm line-clamp-2 leading-relaxed">{item.title}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-xs text-slate-500">SL: x{item.quantity}</span>
                                                <span className="text-xs font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="h-px bg-slate-100 mb-6"></div>

                        {/* Summary Numbers */}
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Tạm tính</span>
                                <span className="font-medium text-slate-900">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Phí vận chuyển</span>
                                <span className="font-medium text-slate-900">{formatCurrency(SHIPPING_FEE)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Giảm giá</span>
                                <span className="font-bold text-emerald-500">-{formatCurrency(DISCOUNT)}</span>
                            </div>
                            <div className="h-px bg-slate-100 my-2"></div>
                            <div className="flex justify-between items-end">
                                <span className="font-bold text-slate-900">Tổng thanh toán</span>
                                <span className="text-2xl font-black text-rose-500 tracking-tight">{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg shadow-primary/30 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? 'Đang xử lý...' : 'Đặt hàng ngay'}
                        </button>

                        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4" />
                            Bảo mật & An toàn tuyệt đối
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
