import { q, qq, money } from './utils.js';
import { API } from './api.js';
import { Cart } from './store.js';
import { renderProductCard } from './components.js';

function renderFeatured() {
  const grid = q('#featured-grid');
  if (!grid) return;
  const books = API.getFeaturedBooks(8);
  grid.innerHTML = books.map(renderProductCard).join('');
}

function renderSearch() {
  const grid = q('#search-grid');
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const term = params.get('q') || '';
  const input = q('#search-input');
  if (input) input.value = term;
  const results = API.searchBooks(term);
  grid.innerHTML = results.map(renderProductCard).join('');
  if (input) {
    input.addEventListener('input', () => {
      const r = API.searchBooks(input.value);
      grid.innerHTML = r.map(renderProductCard).join('');
    });
  }
}

function renderProduct() {
  const root = q('#product-detail');
  if (!root) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 1;
  const book = API.getBookById(id);
  if (!book) { root.innerHTML = '<p>Không tìm thấy sản phẩm.</p>'; return; }
  root.innerHTML = `
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
        <div>
          <img src="${book.image}" alt="${book.title} cover" />
        </div>
        <div>
          <h1 style="margin:0 0 8px;">${book.title}</h1>
          <p class="meta" style="margin:0 0 8px;">by ${book.author}</p>
          <p class="product-card__price" style="margin:0 0 8px;">${money(book.price)}</p>
          <p><span class="badge-fine">${book.condition}</span></p>
          <p class="meta" style="margin:8px 0 16px;">Seller: ${book.seller}</p>
          <p style="margin:0 0 16px;">${book.description || ''}</p>
          <div style="display:flex;gap:8px;align-items:center;margin:16px 0;">
            <label for="qty" class="visually-hidden">Số lượng</label>
            <input id="qty" type="number" min="1" value="1" style="width:80px;padding:8px;border:1px solid var(--color-gray-100);border-radius:4px;" />
            <button id="add-to-cart" class="btn-primary">Add to Basket</button>
          </div>
        </div>
      </div>
    </div>
  `;
  const btn = q('#add-to-cart');
  const qtyEl = q('#qty');
  if (btn) btn.addEventListener('click', () => {
    const qty = Math.max(1, parseInt(qtyEl.value || '1', 10));
    Cart.add({ id: book.id, title: book.title, price: book.price, image: book.image, qty });
    btn.textContent = 'Added!';
    setTimeout(() => (btn.textContent = 'Add to Basket'), 1200);
  });
}

function renderCart() {
  const list = q('#cart-items');
  if (!list) return;
  const items = Cart.all();
  if (!items.length) { list.innerHTML = '<p>Giỏ hàng trống.</p>'; const sum = q('#cart-total'); if (sum) sum.textContent = money(0); return; }
  list.innerHTML = items.map(i => `
    <div class="product-card" data-id="${i.id}" style="display:grid;grid-template-columns:80px 1fr auto;gap:12px;align-items:center;">
      <img src="${i.image}" alt="${i.title}" style="width:80px;height:80px;object-fit:cover;border-radius:4px;" />
      <div>
        <div class="product-card__title">${i.title}</div>
        <div class="product-card__price">${money(i.price)}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <input class="qty" type="number" min="1" value="${i.qty}" style="width:72px;padding:6px;border:1px solid var(--color-gray-100);border-radius:4px;" />
        <button class="remove btn-primary" style="background:#eee;color:#333;border-color:#ddd;">Remove</button>
      </div>
    </div>
  `).join('');
  const totalEl = q('#cart-total');
  if (totalEl) totalEl.textContent = money(Cart.total());
  qq('.qty', list).forEach(input => {
    input.addEventListener('change', e => {
      const parent = e.target.closest('[data-id]');
      const id = Number(parent.getAttribute('data-id'));
      const qty = Math.max(1, parseInt(e.target.value || '1', 10));
      Cart.update(id, qty);
      if (totalEl) totalEl.textContent = money(Cart.total());
    });
  });
  qq('.remove', list).forEach(btn => {
    btn.addEventListener('click', e => {
      const parent = e.target.closest('[data-id]');
      const id = Number(parent.getAttribute('data-id'));
      Cart.remove(id);
      renderCart();
    });
  });
}

function renderCheckout() {
  const form = q('#checkout-form');
  if (!form) return;
  const summary = q('#checkout-summary');
  if (summary) summary.textContent = money(Cart.total());
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!Cart.all().length) { alert('Giỏ hàng trống'); return; }
    Cart.clear();
    alert('Đặt hàng thành công!');
    window.location.href = '/user/index.html';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderSearch();
  renderProduct();
  renderCart();
  renderCheckout();
});
