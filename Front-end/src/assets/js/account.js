function currentKey() {
  const p = location.pathname.replace(/\\/g, '/');
  if (p.endsWith('/user/account/profile.html')) return 'profile';
  if (p.endsWith('/user/account/addresses.html')) return 'addresses';
  if (p.endsWith('/user/account/orders.html')) return 'orders';
  if (p.endsWith('/user/account/order.html')) return 'orders';
  return 'index';
}

export function renderAccountSidebar(containerId = 'account-sidebar') {
  const container = document.getElementById(containerId);
  if (!container) return;
  const items = [
    { key: 'index', label: 'Tổng quan', href: '/user/account/index.html' },
    { key: 'profile', label: 'Hồ sơ', href: '/user/account/profile.html' },
    { key: 'addresses', label: 'Địa chỉ', href: '/user/account/addresses.html' },
    { key: 'orders', label: 'Đơn hàng', href: '/user/account/orders.html' }
  ];
  const active = currentKey();
  container.classList.add('account-sidebar');
  container.innerHTML = `
    <nav class="nav" aria-label="Tài khoản">
      <ul class="nav-list">
        ${items.map(i => `
          <li>
            <a class="nav-link ${i.key === active ? 'active' : ''}" href="${i.href}" ${i.key === active ? 'aria-current="page"' : ''}>${i.label}</a>
          </li>
        `).join('')}
      </ul>
    </nav>
  `;
}

window.addEventListener('DOMContentLoaded', () => renderAccountSidebar());
