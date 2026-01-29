const HEADER_HTML = `
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav" id="main-nav">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-[80px] flex items-center justify-between gap-4">
        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-2 group flex-shrink-0">
            <div class="w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
                B
            </div>
            <span class="font-display font-bold text-2xl text-slate-800 tracking-tight hidden sm:block">BookStore</span>
        </a>

        <!-- Search (Hidden on Mobile initially) -->
        <div class="hidden md:flex flex-1 max-w-lg relative group">
            <input type="text" placeholder="Tìm kiếm sách, tác giả..." class="w-full bg-slate-100 border-none rounded-full px-6 py-3 pl-12 text-sm focus:ring-2 focus:ring-violet-500/50 transition-all outline-none group-hover:bg-white group-hover:shadow-md">
            <svg class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 sm:gap-4">
            <button class="md:hidden p-2 text-slate-600 hover:text-violet-600">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

            <a href="cart.html" class="relative p-2 text-slate-600 hover:text-violet-600 transition-colors group">
                <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-violet-50 transition-colors">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <span id="cart-count" class="absolute top-1 right-0 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm scale-0 transition-transform duration-300">0</span>
            </a>
            
            <a href="account.html" class="flex items-center gap-2 pl-2 border-l border-slate-200">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" class="w-9 h-9 rounded-full border border-slate-200 shadow-sm" alt="User">
                <div class="hidden lg:block text-left">
                    <p class="text-xs text-slate-500 font-medium">Xin chào,</p>
                    <p class="text-sm font-bold text-slate-800 leading-none">Văn A</p>
                </div>
            </a>
        </div>
    </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="mt-20 pt-16 pb-8 bg-white border-t border-slate-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div class="col-span-1 md:col-span-1">
                 <div class="flex items-center gap-2 mb-4">
                    <div class="w-8 h-8 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
                    <span class="font-display font-bold text-xl text-slate-800">BookStore</span>
                </div>
                <p class="text-slate-500 text-sm leading-relaxed mb-6">
                    Nền tảng mua sắm sách trực tuyến hàng đầu, mang tri thức đến mọi nơi với trải nghiệm công nghệ vượt trội.
                </p>
                <div class="flex gap-4">
                    <a href="#" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-violet-600 hover:text-white transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                    <a href="#" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
                </div>
            </div>
            
            <div>
                <h4 class="font-bold text-slate-800 mb-6">Khám phá</h4>
                <ul class="space-y-3 text-sm text-slate-500">
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Sách Mới</a></li>
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Bán Chạy</a></li>
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Combo Ưu Đãi</a></li>
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Tác Giả</a></li>
                </ul>
            </div>

            <div>
                <h4 class="font-bold text-slate-800 mb-6">Hỗ trợ</h4>
                <ul class="space-y-3 text-sm text-slate-500">
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Chính sách đổi trả</a></li>
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Phương thức vận chuyển</a></li>
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Câu hỏi thường gặp</a></li>
                    <li><a href="#" class="hover:text-violet-600 transition-colors">Liên hệ</a></li>
                </ul>
            </div>

            <div>
                <h4 class="font-bold text-slate-800 mb-6">Đăng ký nhận tin</h4>
                <p class="text-xs text-slate-500 mb-4">Nhận thông báo về sách mới và ưu đãi đặc biệt.</p>
                <form class="flex gap-2">
                    <input type="email" placeholder="Email của bạn" class="flex-1 bg-slate-100 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-violet-500 outline-none">
                    <button class="bg-violet-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-violet-700 transition-colors">→</button>
                </form>
            </div>
        </div>
        
        <div class="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-xs text-slate-500">© 2026 BookStore Inc. All rights reserved.</p>
            <div class="flex gap-6">
                <a href="#" class="text-xs text-slate-400 hover:text-slate-600">Privacy Policy</a>
                <a href="#" class="text-xs text-slate-400 hover:text-slate-600">Terms of Service</a>
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

    // Update Cart Badge
    setTimeout(() => {
        const cartCountEl = document.getElementById('cart-count');
        if (cartCountEl && window.MOCK_DATA) {
            cartCountEl.textContent = window.MOCK_DATA.user.cart_count || 0;
            cartCountEl.classList.remove('scale-0');
        }
    }, 100);
});
