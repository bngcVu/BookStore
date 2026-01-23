/**
 * Admin Sidebar Component
 * Eliminates HTML duplication across 10 admin pages
 * Auto-detects active page and applies active state
 */

const SIDEBAR_HTML = `
<aside class="admin-sidebar">
    <div class="admin-sidebar-header">
        <a href="index.html" class="admin-logo">
            <div class="admin-logo-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>
            <span class="admin-logo-text">Nhà Sách</span>
            <span class="admin-logo-badge">Admin</span>
        </a>
    </div>

    <nav class="admin-nav">
        <div class="admin-nav-section">
            <p class="admin-nav-label">Menu chính</p>
            <ul class="admin-nav-list">
                <li>
                    <a href="index.html" class="admin-nav-link" data-page="index.html" aria-label="Trang Dashboard">
                        <svg class="admin-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="products.html" class="admin-nav-link" data-page="products.html" aria-label="Quản lý sản phẩm">
                        <svg class="admin-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span>Sản phẩm</span>
                    </a>
                </li>
                <li>
                    <a href="orders.html" class="admin-nav-link" data-page="orders.html" aria-label="Quản lý đơn hàng">
                        <svg class="admin-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <span>Đơn hàng</span>
                        <span class="admin-nav-badge">12</span>
                    </a>
                </li>
                <li>
                    <a href="customers.html" class="admin-nav-link" data-page="customers.html" aria-label="Quản lý khách hàng">
                        <svg class="admin-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>Khách hàng</span>
                    </a>
                </li>
            </ul>
        </div>

        <div class="admin-nav-section">
            <p class="admin-nav-label">Marketing</p>
            <ul class="admin-nav-list">
                <li>
                    <a href="flash-sales.html" class="admin-nav-link" data-page="flash-sales.html" aria-label="Quản lý Flash Sale">
                        <svg class="admin-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Flash Sale</span>
                    </a>
                </li>
                <li>
                    <a href="vouchers.html" class="admin-nav-link" data-page="vouchers.html" aria-label="Quản lý Vouchers">
                        <svg class="admin-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span>Vouchers</span>
                    </a>
                </li>
            </ul>
        </div>

        <div class="admin-nav-section">
            <p class="admin-nav-label">Hệ thống</p>
            <ul class="admin-nav-list">
                <li>
                    <a href="reports.html" class="admin-nav-link" data-page="reports.html" aria-label="Báo cáo và Thống kê">
                        <svg class="admin-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Báo cáo</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="admin-nav-link" data-page="settings.html" aria-label="Cài đặt hệ thống">
                        <svg class="admin-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Cài đặt</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="admin-sidebar-footer">
        <a href="#" class="admin-profile-link" aria-label="Tài khoản Admin">
            <img src="../assets/images/admin-avatar.jpg" alt="Admin Avatar" class="admin-avatar"
                onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%233B82F6%22%3E%3Cpath d=%22M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z%22/%3E%3C/svg%3E'">
            <div class="admin-profile-info">
                <p class="admin-profile-name">Admin User</p>
                <p class="admin-profile-email">admin@nhasach.com</p>
            </div>
        </a>
    </div>
</aside>
`;

/**
 * Initialize sidebar component
 * Mounts sidebar HTML and applies active state
 */
function initAdminSidebar() {
    const sidebarPlaceholder = document.getElementById('admin-sidebar-mount');

    if (!sidebarPlaceholder) {
        console.warn('[AdminSidebar] Mount point #admin-sidebar-mount not found');
        return;
    }

    // Inject sidebar HTML
    sidebarPlaceholder.innerHTML = SIDEBAR_HTML;

    // Auto-detect current page and apply active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.admin-nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');

        // Match current page or special case for add-product.html -> products.html
        if (linkPage === currentPage ||
            (currentPage === 'add-product.html' && linkPage === 'products.html') ||
            (currentPage === 'order-detail.html' && linkPage === 'orders.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    console.log(`[AdminSidebar] Initialized. Active page: ${currentPage}`);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminSidebar);
} else {
    initAdminSidebar();
}

// Export for manual initialization if needed
window.initAdminSidebar = initAdminSidebar;
