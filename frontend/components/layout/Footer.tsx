"use client";

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, BookOpen, Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Newsletter Section */}
                <div className="bg-primary/5 rounded-[32px] p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-md">
                        <h3 className="text-3xl font-heading font-black text-slate-900 mb-2">Đăng ký nhận tin</h3>
                        <p className="text-slate-500 font-medium">Nhận ngay voucher giảm giá 10% cho đơn hàng đầu tiên của bạn.</p>
                    </div>
                    <div className="w-full max-w-md relative group">
                        <input
                            type="email"
                            placeholder="Email của bạn..."
                            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-6 pr-16 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all"
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-5 rounded-xl hover:bg-cta transition-colors shadow-lg">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <span className="font-heading font-black text-2xl text-slate-900 tracking-tighter uppercase">
                                Book<span className="text-primary italic">Store</span>
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            Kiến tạo cộng đồng yêu sách tại Việt Nam. Mang tri thức đến mọi nhà với dịch vụ tận tâm và trải nghiệm mua sắm hiện đại nhất.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white hover:shadow-lg transition-all"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white hover:shadow-lg transition-all"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white hover:shadow-lg transition-all"><Twitter className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-heading font-black text-slate-900 mb-8 uppercase tracking-widest text-xs">Danh mục</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-bold">
                            <li><a href="#" className="hover:text-primary transition-colors">Sách Văn Học</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Kinh Tế - Kỹ Năng</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Sách Thiếu Nhi</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Văn Phòng Phẩm</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-black text-slate-900 mb-8 uppercase tracking-widest text-xs">Chăm sóc khách hàng</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-bold">
                            <li><a href="#" className="hover:text-primary transition-colors">Câu hỏi thường gặp</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Điều khoản dịch vụ</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Liên hệ hợp tác</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading font-black text-slate-900 mb-8 uppercase tracking-widest text-xs">Liên hệ</h4>
                        <ul className="space-y-5 text-slate-500 text-sm font-medium">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary shrink-0"><MapPin className="w-5 h-5" /></div>
                                <span>123 Đường Sách, Phường Bến Nghé, Quận 1, TP. HCM</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary shrink-0"><Phone className="w-5 h-5" /></div>
                                <span>Hotline: 1900 1234</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary shrink-0"><Mail className="w-5 h-5" /></div>
                                <span>support@bookstore.vn</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-end items-center gap-6">
                    <div className="flex gap-10 items-center">
                        <img src="/vnpay_logo.jpg" className="h-8" alt="VNPAY" />
                        <img src="/momo_logo.webp" className="h-10" alt="MoMo" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
