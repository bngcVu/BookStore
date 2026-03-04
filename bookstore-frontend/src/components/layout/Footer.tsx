import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 mt-auto">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand & Vibe */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
                                <span className="text-white font-bold text-lg leading-none">B</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight">BookStore</span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed mt-2">
                            Sứ mệnh của chúng tôi là mang tới những cuốn sách chất lượng nhất với trải nghiệm mua sắm không giới hạn.
                        </p>
                    </div>

                    {/* Sitemaps */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 tracking-tight">Dịch Vụ</h3>
                        <ul className="flex flex-col gap-3 text-sm text-slate-600">
                            <li><Link href="/about" className="hover:text-primary transition-colors">Điều khoản dịch vụ</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Chính sách bảo mật</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Giao hàng & Đổi trả</Link></li>
                            <li><Link href="/loyalty" className="hover:text-primary transition-colors">BookStore Loyalty</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 tracking-tight">Khám Phá</h3>
                        <ul className="flex flex-col gap-3 text-sm text-slate-600">
                            <li><Link href="/category/literature" className="hover:text-primary transition-colors">Văn Học Tác Phẩm</Link></li>
                            <li><Link href="/category/economy" className="hover:text-primary transition-colors">Kinh Tế - Kinh Doanh</Link></li>
                            <li><Link href="/category/psychology" className="hover:text-primary transition-colors">Tâm Lý Học</Link></li>
                            <li><Link href="/category/children" className="hover:text-primary transition-colors">Sách Thiếu Nhi</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 tracking-tight">Liên Hệ</h3>
                        <ul className="flex flex-col gap-3 text-sm text-slate-600">
                            <li>📞 1900 1234 567</li>
                            <li>✉️ cskh@bookstore.vn</li>
                            <li>📍 123 Đường Nam Kỳ Khởi Nghĩa, Q3, TP.HCM</li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                    <p>© {new Date().getFullYear()} BookStore E-commerce. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <span>ZaloPay</span>
                        <span>MoMo</span>
                        <span>Visa</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
