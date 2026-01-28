/**
 * LAYOUT RENDERER
 * Injects Header and Footer into pages
 */

const HEADER_HTML = `
<nav class="fixed top-4 left-4 right-4 z-50 transition-all duration-300">
    <div class="glass rounded-full px-6 py-3 flex items-center justify-between max-w-7xl mx-auto backdrop-blur-md bg-white/80 border border-white/40 shadow-lg">
        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-2 group">
            <div class="w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
                B
            </div>
            <span class="font-display font-bold text-xl text-slate-800 tracking-tight">BookStore</span>
        </a>

        <!-- Search -->
        <div class="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input type="text" placeholder="Tìm kiếm sách, tác giả..." 
                class="w-full bg-slate-100/50 border-none rounded-full py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-violet-500/50 transition-all placeholder:text-slate-400">
            <svg class="w-5 h-5 text-slate-500 absolute left-4 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4">
            <a href="products.html" class="hidden lg:block text-slate-600 hover:text-violet-600 font-medium text-sm transition-colors">Sách</a>
            <a href="#" class="hidden lg:block text-slate-600 hover:text-violet-600 font-medium text-sm transition-colors">Khuyến mãi</a>
            
            <div class="h-6 w-px bg-slate-200 hidden lg:block"></div>

            <a href="cart.html" class="relative p-2 text-slate-600 hover:text-violet-600 transition-colors">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span id="cart-count" class="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">0</span>
            </a>

            <a href="account.html" class="flex items-center gap-2 pl-2">
                <img src="${MOCK_DATA.user.avatar_url}" alt="User" class="w-9 h-9 rounded-full border-2 border-white shadow-sm ring-2 ring-violet-500/20">
                <div class="hidden sm:block text-left leading-tight">
                    <p class="text-xs font-bold text-slate-700">${MOCK_DATA.user.full_name}</p>
                    <p class="text-[10px] text-amber-600 font-medium">${MOCK_DATA.user.tier}</p>
                </div>
            </a>
        </div>
    </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="mt-20 pt-16 pb-8 bg-white/50 backdrop-blur-sm border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div class="col-span-1 md:col-span-1">
                <div class="flex items-center gap-2 mb-4">
                    <div class="w-8 h-8 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
                    <span class="font-display font-bold text-lg text-slate-800">BookStore</span>
                </div>
                <p class="text-slate-500 text-sm leading-relaxed mb-6">
                    Nền tảng mua sách trực tuyến hàng đầu với hàng ngàn đầu sách hấp dẫn và ưu đãi mỗi ngày.
                </p>
                <div class="flex gap-4">
                    <!-- Social Icons (Placeholder) -->
                    <div class="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-violet-100 hover:text-violet-600 transition-colors cursor-pointer">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </div>
                </div>
            </div>
            
            <div>
                <h4 class="font-bold text-slate-800 mb-6">Khám phá</h4>
                <ul class="space-y-4 text-sm text-slate-500">
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Sách bán chạy</a></li>
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Sách mới</a></li>
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Combo ưu đãi</a></li>
                </ul>
            </div>

            <div>
                <h4 class="font-bold text-slate-800 mb-6">Hỗ trợ</h4>
                <ul class="space-y-4 text-sm text-slate-500">
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Chính sách đổi trả</a></li>
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Phí vận chuyển</a></li>
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Phương thức thanh toán</a></li>
                </ul>
            </div>

            <div>
                <h4 class="font-bold text-slate-800 mb-6">Đăng ký nhận tin</h4>
                <p class="text-sm text-slate-500 mb-4">Nhận thông tin sách mới và khuyến mãi sớm nhất.</p>
                <form class="flex gap-2">
                    <input type="email" placeholder="Email của bạn" class="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none">
                    <button class="bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">Gửi</button>
                </form>
            </div>
        </div>
        <div class="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-xs text-slate-500">© 2026 BookStore Inc. All rights reserved.</p>
            <div class="flex gap-4">
                <span class="text-xs text-slate-400">Điều khoản sử dụng</span>
                <span class="text-xs text-slate-400">Chính sách bảo mật</span>
            </div>
        </div>
    </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
    // Inject Header
    const headerEl = document.getElementById('header-placeholder');
    if (headerEl) headerEl.innerHTML = HEADER_HTML;

    // Inject Footer
    const footerEl = document.getElementById('footer-placeholder');
    if (footerEl) footerEl.innerHTML = FOOTER_HTML;

    // Update Cart Count
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl && window.MOCK_DATA) {
        cartCountEl.textContent = window.MOCK_DATA.user.cart_count || 0;
    }
});
