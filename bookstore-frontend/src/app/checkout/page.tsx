"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Truck, ShieldCheck, MapPin, Plus, Edit2 } from "lucide-react";
import Image from "next/image";

const cartItems = [
    { id: "1", title: "Nghệ Thuật Tư Duy Rành Mạch", price: 145000, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" },
    { id: "2", title: "Nhà Giả Kim", price: 99000, quantity: 2, imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" }
];

const initialAddresses = [
    {
        id: "addr-1",
        name: "Nguyễn Văn A",
        phone: "0987654321",
        street: "123 Đường Số 1, Phường Tân Phú",
        city: "Quận 7, TP. Hồ Chí Minh",
        isDefault: true
    },
    {
        id: "addr-2",
        name: "Nguyễn Văn B (Văn phòng)",
        phone: "0912345678",
        street: "Tòa nhà Bitexco, 2 Hải Triều, Bến Nghé",
        city: "Quận 1, TP. Hồ Chí Minh",
        isDefault: false
    }
];

export default function CheckoutPage() {
    const [savedAddresses, setSavedAddresses] = useState(initialAddresses);
    const [shippingMethod, setShippingMethod] = useState("standard");
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [selectedAddressId, setSelectedAddressId] = useState("addr-1");
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
    const [addressForm, setAddressForm] = useState({ name: "", phone: "", street: "", city: "" });

    const openAddForm = () => {
        setAddressForm({ name: "", phone: "", street: "", city: "" });
        setEditingAddressId(null);
        setIsAddressFormOpen(true);
    };

    const openEditForm = (e: React.MouseEvent, addr: typeof initialAddresses[0]) => {
        e.preventDefault();
        setAddressForm({ name: addr.name, phone: addr.phone, street: addr.street, city: addr.city });
        setEditingAddressId(addr.id);
        setIsAddressFormOpen(true);
    };

    const handleSaveAddress = () => {
        if (editingAddressId) {
            setSavedAddresses(prev => prev.map(a => a.id === editingAddressId ? { ...a, ...addressForm } : a));
        } else {
            const newAddr = {
                id: `addr-${Date.now()}`,
                ...addressForm,
                isDefault: savedAddresses.length === 0
            };
            setSavedAddresses(prev => [...prev, newAddr]);
            setSelectedAddressId(newAddr.id);
        }
        setIsAddressFormOpen(false);
    };

    const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shippingFee = shippingMethod === "express" ? 35000 : 15000;
    const total = subTotal + shippingFee - 20000; // Assuming 20k discount carried over

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-200 w-10 h-10 transition-colors">
                            <ChevronLeft size={20} className="text-slate-600" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Thanh toán an toàn</h1>
                    <div className="ml-auto flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-xs font-semibold">
                        <ShieldCheck size={14} /> Mọi giao dịch đều được mã hóa SSL 256-bit
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Checkout Form */}
                    <div className="w-full lg:w-2/3 space-y-6">

                        {/* 1. Address Section */}
                        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</div>
                                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">Địa chỉ giao hàng</h2>
                                </div>
                                {!isAddressFormOpen && (
                                    <Button variant="ghost" size="sm" onClick={openAddForm} className="text-primary hover:bg-primary/5 hover:text-primary">
                                        <Plus size={16} className="mr-1" /> Thêm địa chỉ mới
                                    </Button>
                                )}
                            </div>

                            {/* Saved Addresses List */}
                            {!isAddressFormOpen ? (
                                <div className="grid gap-4">
                                    {savedAddresses.map(addr => (
                                        <label key={addr.id} className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm hover:border-primary/50 transition-colors ${selectedAddressId === addr.id ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : 'border-slate-200'}`}>
                                            <input type="radio" name="address" value={addr.id} className="sr-only" checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} />
                                            <div className="flex w-full items-start gap-3">
                                                <MapPin className={selectedAddressId === addr.id ? 'text-primary mt-0.5' : 'text-slate-400 mt-0.5'} size={20} />
                                                <div className="flex flex-col flex-1">
                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                        <span className="font-semibold text-slate-900">{addr.name}</span>
                                                        <span className="text-slate-300">|</span>
                                                        <span className="font-medium text-slate-600">{addr.phone}</span>
                                                        {addr.isDefault && (
                                                            <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 px-2 py-0.5 rounded border border-green-200">Mặc định</span>
                                                        )}
                                                    </div>
                                                    <span className="text-sm text-slate-600">{addr.street}</span>
                                                    <span className="text-sm text-slate-500">{addr.city}</span>
                                                </div>
                                                <button
                                                    onClick={(e) => openEditForm(e, addr)}
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-primary transition-colors shrink-0"
                                                    title="Sửa địa chỉ"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                /* Add/Edit Address Form */
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <h3 className="font-semibold text-slate-900 mb-2">{editingAddressId ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Họ và tên</label>
                                            <input type="text" value={addressForm.name} onChange={e => setAddressForm({ ...addressForm, name: e.target.value })} placeholder="Nhập họ và tên..." className="w-full h-11 px-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Số điện thoại</label>
                                            <input type="tel" value={addressForm.phone} onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })} placeholder="Nhập số điện thoại..." className="w-full h-11 px-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-slate-700">Tỉnh/Thành phố, Quận/Huyện</label>
                                            <input type="text" value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} placeholder="Ví dụ: Quận 7, TP. HCM" className="w-full h-11 px-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-slate-700">Địa chỉ cụ thể (Số nhà, tên đường)</label>
                                            <input type="text" value={addressForm.street} onChange={e => setAddressForm({ ...addressForm, street: e.target.value })} placeholder="Ví dụ: 123 Đường Vành Đai" className="w-full h-11 px-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 justify-end pt-2">
                                        <Button variant="outline" onClick={() => setIsAddressFormOpen(false)}>Hủy bỏ</Button>
                                        <Button variant="default" onClick={handleSaveAddress}>{editingAddressId ? "Cập nhật" : "Lưu địa chỉ & Chọn"}</Button>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* 2. Shipping Options */}
                        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</div>
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">Phương thức giao hàng</h2>
                            </div>

                            <div className="grid gap-4">
                                <label className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm hover:border-primary/50 transition-colors ${shippingMethod === 'standard' ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : 'border-slate-200'}`}>
                                    <input type="radio" name="shipping" value="standard" className="sr-only" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} />
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Truck className={shippingMethod === 'standard' ? 'text-primary' : 'text-slate-400'} size={24} />
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900">Giao hàng tiêu chuẩn</span>
                                                <span className="text-sm text-slate-500">Dự kiến giao hàng trong 2-3 ngày làm việc</span>
                                            </div>
                                        </div>
                                        <span className="font-bold text-slate-900">15.000đ</span>
                                    </div>
                                </label>

                                <label className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm hover:border-accent/50 transition-colors ${shippingMethod === 'express' ? 'border-accent ring-1 ring-accent/20 bg-accent/5' : 'border-slate-200'}`}>
                                    <input type="radio" name="shipping" value="express" className="sr-only" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} />
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <Truck className={shippingMethod === 'express' ? 'text-accent' : 'text-slate-400'} size={24} />
                                                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/40 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900">Giao hàng hỏa tốc (2H)</span>
                                                <span className="text-sm text-slate-500">Chỉ áp dụng tại khu vực nội thành TP.HCM</span>
                                            </div>
                                        </div>
                                        <span className="font-bold text-slate-900">35.000đ</span>
                                    </div>
                                </label>
                            </div>
                        </section>

                        {/* 3. Payment Methods */}
                        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">3</div>
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">Phương thức thanh toán</h2>
                            </div>

                            <div className="grid gap-4">
                                <label className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm hover:border-primary/50 transition-colors ${paymentMethod === 'cod' ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : 'border-slate-200'}`}>
                                    <input type="radio" name="payment" value="cod" className="sr-only" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                                    <div className="flex w-full items-center gap-3">
                                        <div className="w-10 h-10 rounded bg-green-100 text-green-600 flex items-center justify-center font-bold">COD</div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900">Thanh toán khi nhận hàng (C.O.D)</span>
                                            <span className="text-sm text-slate-500">Thanh toán bằng tiền mặt/chuyển khoản cho shipper</span>
                                        </div>
                                    </div>
                                </label>

                                <label className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm hover:border-primary/50 transition-colors ${paymentMethod === 'vnpay' ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : 'border-slate-200'}`}>
                                    <input type="radio" name="payment" value="vnpay" className="sr-only" checked={paymentMethod === 'vnpay'} onChange={() => setPaymentMethod('vnpay')} />
                                    <div className="flex w-full items-center gap-3">
                                        <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-xs px-1 text-center">VNPay</div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900">Thẻ ATM / Internet Banking</span>
                                            <span className="text-sm text-slate-500">Công cáng qua VNPAY an toàn, bảo mật nội bộ</span>
                                        </div>
                                    </div>
                                </label>

                                <label className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm hover:border-primary/50 transition-colors ${paymentMethod === 'momo' ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : 'border-slate-200'}`}>
                                    <input type="radio" name="payment" value="momo" className="sr-only" checked={paymentMethod === 'momo'} onChange={() => setPaymentMethod('momo')} />
                                    <div className="flex w-full items-center gap-3">
                                        <div className="w-10 h-10 rounded bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">MoMo</div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900">Ví điện tử MoMo</span>
                                            <span className="text-sm text-slate-500">Quét mã QR qua app MoMo liền tay</span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                            <h3 className="font-bold text-slate-900 mb-6 text-lg border-b border-slate-100 pb-4">Đơn hàng của bạn {cartItems.length} sản phẩm</h3>

                            {/* Items List (Minimized) */}
                            <div className="space-y-4 mb-6">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-3 items-center">
                                        <div className="relative w-12 h-16 bg-slate-100 rounded border border-slate-200 overflow-hidden shrink-0">
                                            <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                                            <span className="absolute -top-2 -right-2 bg-slate-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">x{item.quantity}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-slate-900 line-clamp-2">{item.title}</h4>
                                            <p className="text-sm text-slate-500">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cost Calculations */}
                            <div className="space-y-3 mb-6 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between text-slate-600 text-sm">
                                    <span>Tạm tính</span>
                                    <span className="font-medium text-slate-900">{subTotal.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-600 text-sm">
                                    <span>Phí giao dịch</span>
                                    <span className="font-medium text-slate-900">{shippingFee.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <div className="flex items-center justify-between text-green-600 text-sm font-medium">
                                    <span>Khuyến mãi (BOOKSTORE20)</span>
                                    <span>-20.000đ</span>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <span className="font-bold text-slate-900 block text-sm">Tổng thanh toán</span>
                                        <span className="text-xs text-slate-500">Đã bao gồm VAT</span>
                                    </div>
                                    <span className="text-2xl font-bold text-primary">{total.toLocaleString('vi-VN')}đ</span>
                                </div>
                            </div>

                            <Button size="lg" className="w-full text-base font-semibold h-14" onClick={() => alert("Chuyển hướng Payment Gateway. (Chức năng Demo)")}>
                                Đặt hàng ngay
                            </Button>
                            <p className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
                                Bằng việc &quot;Đặt hàng ngay&quot;, bạn đồng ý với Điều khoản và dịch vụ của chúng tôi.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
