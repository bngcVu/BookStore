import { q, qq, money } from './utils.js';
import { API } from './api.js';
import { Cart, Wishlist } from './store.js';
import { renderProductCard } from './components.js';

function renderFeatured() {
  const grid = q('#featured-grid');
  if (!grid) return;
  const books = API.getFeaturedBooks(8);
  grid.innerHTML = books.map(renderProductCard).join('');
  attachWishlistButtons(grid);
}

function renderSearch() {
  const grid = q('#search-grid');
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const term = params.get('q') || '';
  const input = q('#search-input');
  if (input) input.value = term;
  const all = API.getBooks();
  function applyFilters() {
    const category = q('#filter-category')?.value || '';
    const author = q('#filter-author')?.value || '';
    const publisher = q('#filter-publisher')?.value || '';
    const minPrice = parseFloat(q('#filter-min-price')?.value || '0');
    const maxPrice = parseFloat(q('#filter-max-price')?.value || '0');
    const t = (q('#search-input')?.value || '').toLowerCase();
    let list = all.filter(b =>
      (!t || b.title.toLowerCase().includes(t) || b.author.toLowerCase().includes(t)) &&
      (!category || b.category === category) &&
      (!author || b.author === author) &&
      (!publisher || API.getPublishers().find(p => p.id === b.publisher_id)?.name === publisher) &&
      (!minPrice || b.price >= minPrice) &&
      (!maxPrice || b.price <= maxPrice)
    );
    const sort = q('#sort-by')?.value || 'relevance';
    if (sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
    else if (sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
    else if (sort === 'title-asc') list.sort((a,b)=>a.title.localeCompare(b.title));
    grid.innerHTML = list.map(renderProductCard).join('');
    attachWishlistButtons(grid);
  }
  applyFilters();
  if (input) {
    input.addEventListener('input', () => {
      const newTerm = input.value.trim();
      params.set('q', newTerm);
      history.replaceState(null, '', `?${params.toString()}`);
      applyFilters();
    });
  }
  // Filters
  ['filter-category','filter-min-price','filter-max-price'].forEach(id => {
    const el = q(`#${id}`);
    if (el) el.addEventListener('change', applyFilters);
    if (el) el.addEventListener('input', applyFilters);
  });
  ['filter-author','filter-publisher','sort-by'].forEach(id => {
    const el = q(`#${id}`);
    if (el) el.addEventListener('change', applyFilters);
  });
  // Populate author/publisher options
  const authorSel = q('#filter-author');
  const publisherSel = q('#filter-publisher');
  if (authorSel && authorSel.options.length <= 1) {
    API.getAuthors().forEach(a => {
      const opt = document.createElement('option'); opt.value = a.name; opt.textContent = a.name; authorSel.appendChild(opt);
    });
  }
  if (publisherSel && publisherSel.options.length <= 1) {
    API.getPublishers().forEach(p => {
      const opt = document.createElement('option'); opt.value = p.name; opt.textContent = p.name; publisherSel.appendChild(opt);
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
  const variants = API.getVariantsByBook(book.id);
  const imgs = API.getImagesByBook(book.id);
  const activeVariant = variants[0] || null;
  const priceText = activeVariant ? money(activeVariant.price) : money(book.price);
  const compareText = activeVariant && activeVariant.compare_at_price ? money(activeVariant.compare_at_price) : '';
  const mainImg = activeVariant?.cover_image_url || imgs[0]?.image_url || book.image;
  root.innerHTML = `
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
        <div>
          <img id="main-image" src="${mainImg}" alt="${book.title} cover" />
          <div style="display:flex;gap:8px;margin-top:8px;">
            ${(imgs.length ? imgs : [{ image_url: mainImg }]).map(i => `
              <img class="thumb" src="${i.image_url}" alt="thumb" style="width:72px;height:72px;object-fit:cover;border:1px solid var(--color-border);border-radius:4px;cursor:pointer;" />
            `).join('')}
          </div>
        </div>
        <div>
          <h1 style="margin:0 0 8px;">${book.title}</h1>
          <p class="meta" style="margin:0 0 8px;">by ${book.author}</p>
          <div style="display:flex;gap:8px;align-items:baseline;">
            <p id="price" class="product-card__price" style="margin:0;">${priceText}</p>
            ${compareText ? `<small class="meta" style="text-decoration:line-through;">${compareText}</small>` : ''}
          </div>
          <p><span class="badge-fine">${book.condition}</span></p>
          <p class="meta" style="margin:8px 0 16px;">Seller: ${book.seller}</p>
          <p style="margin:0 0 16px;">${book.description || ''}</p>
          <div style="margin:12px 0;">
            <label for="variant" class="meta" style="display:block;margin-bottom:6px;">Phiên bản (Variant)</label>
            <select id="variant" style="width:100%;padding:10px;border:1px solid var(--color-border);border-radius:4px;">
              ${variants.map(v => `<option value="${v.id}" ${v.id===activeVariant?.id?'selected':''}>${v.edition} • ${v.cover_type} • ${v.sku}</option>`).join('')}
            </select>
            <div id="stock" class="meta" style="margin-top:6px;"></div>
          </div>
          <div style="display:flex;gap:8px;align-items:center;margin:16px 0;">
            <label for="qty" class="visually-hidden">Số lượng</label>
            <input id="qty" type="number" min="1" value="1" style="width:80px;padding:8px;border:1px solid var(--color-border);border-radius:4px;" />
            <button id="add-to-cart" class="btn-primary">Add to Basket</button>
            <button id="add-to-wishlist" class="btn-primary" style="background:#eee;color:#333;border-color:#ddd;">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  `;
  const btn = q('#add-to-cart');
  const qtyEl = q('#qty');
  const wlBtn = q('#add-to-wishlist');
  const priceEl = q('#price');
  const mainImgEl = q('#main-image');
  const variantSelect = q('#variant');
  const stockEl = q('#stock');
  function updateStockAndPrice(variantId) {
    const v = variants.find(x => String(x.id) === String(variantId));
    if (!v) return;
    if (priceEl) priceEl.textContent = money(v.price);
    if (mainImgEl && v.cover_image_url) mainImgEl.src = v.cover_image_url;
    const qty = API.getInventoryByVariant(v.id);
    if (qty <= 0) {
      stockEl.innerHTML = '<span class="badge-error">Hết hàng</span>';
      if (btn) { btn.setAttribute('disabled', 'true'); btn.style.opacity = '0.6'; }
    } else if (qty <= 5) {
      stockEl.innerHTML = `<span class="badge-warning">Sắp hết: ${qty}</span>`;
      if (btn) { btn.removeAttribute('disabled'); btn.style.opacity = '1'; }
    } else {
      stockEl.innerHTML = `<span class="badge-success">Còn hàng: ${qty}</span>`;
      if (btn) { btn.removeAttribute('disabled'); btn.style.opacity = '1'; }
    }
  }
  if (variantSelect) {
    updateStockAndPrice(variantSelect.value);
    variantSelect.addEventListener('change', e => updateStockAndPrice(e.target.value));
  }
  // thumbs
  qq('.thumb').forEach(t => t.addEventListener('click', e => {
    if (mainImgEl) mainImgEl.src = e.target.src;
  }));
  if (btn) btn.addEventListener('click', () => {
    const variantId = variantSelect && variantSelect.value ? Number(variantSelect.value) : null;
    const v = variantId ? variants.find(x => x.id === variantId) : null;
    const qtyAvail = v ? API.getInventoryByVariant(v.id) : 999;
    const qty = Math.max(1, parseInt(qtyEl.value || '1', 10));
    if (qty > qtyAvail) { alert('Số lượng vượt quá tồn kho'); return; }
    const item = v ? { id: v.id, title: `${book.title} (${v.edition}, ${v.cover_type})`, price: v.price, image: v.cover_image_url || book.image, qty } : { id: book.id, title: book.title, price: book.price, image: book.image, qty };
    Cart.add(item);
    btn.textContent = 'Added!';
    setTimeout(() => (btn.textContent = 'Add to Basket'), 1200);
  });
  if (wlBtn) wlBtn.addEventListener('click', () => {
    const variantId = variantSelect && variantSelect.value ? Number(variantSelect.value) : null;
    const v = variantId ? variants.find(x => x.id === variantId) : null;
    const item = v ? { id: v.id, title: `${book.title} (${v.edition}, ${v.cover_type})`, image: v.cover_image_url || book.image, price: v.price } : { id: book.id, title: book.title, image: book.image, price: book.price };
    Wishlist.add(item);
    wlBtn.textContent = '♥ Added';
    setTimeout(() => (wlBtn.textContent = 'Add to Wishlist'), 1200);
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
        <input class="qty" type="number" min="1" value="${i.qty}" style="width:72px;padding:6px;border:1px solid var(--color-border);border-radius:4px;" />
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
  const voucherInput = q('#voucher-code');
  const voucherMsg = q('#voucher-msg');
  const voucherDiscountEl = q('#voucher-discount');
  const grandTotalEl = q('#grand-total');
  function recalcTotals() {
    const total = Cart.total();
    if (summary) summary.textContent = money(total);
    const code = voucherInput ? voucherInput.value.trim() : '';
    const res = API.validateVoucher(code, total);
    const discount = res.valid ? res.discount : 0;
    if (voucherMsg) voucherMsg.textContent = res.message;
    if (voucherDiscountEl) voucherDiscountEl.textContent = `-${money(discount)}`;
    if (grandTotalEl) grandTotalEl.textContent = money(Math.max(0, total - discount));
  }
  if (voucherInput) {
    voucherInput.addEventListener('input', recalcTotals);
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!Cart.all().length) { alert('Giỏ hàng trống'); return; }
    Cart.clear();
    alert('Đặt hàng thành công!');
    window.location.href = '/user/index.html';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  markCurrentNav();
  renderFeatured();
  renderSearch();
  renderProduct();
  renderCart();
  renderCheckout();
  renderWishlist();
});

function markCurrentNav() {
  const links = qq('.header__nav a');
  const current = location.pathname;
  links.forEach(a => {
    const href = a.getAttribute('href');
    const path = new URL(href, location.href).pathname;
    if (path === current) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function attachWishlistButtons(scope=document) {
  qq('.wishlist-btn', scope).forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const id = Number(btn.getAttribute('data-id'));
      const title = btn.getAttribute('data-title');
      const image = btn.getAttribute('data-image');
      const price = Number(btn.getAttribute('data-price'));
      Wishlist.add({ id, title, image, price });
      btn.textContent = '♥ Added';
      setTimeout(() => (btn.textContent = '♥'), 1200);
    });
  });
}

function renderWishlist() {
  const root = q('#wishlist-page');
  if (!root) return;
  const items = Wishlist.all();
  if (!items.length) { root.innerHTML = '<p>Danh sách yêu thích trống.</p>'; return; }
  root.innerHTML = items.map(i => `
    <div class="product-card" data-id="${i.id}" style="display:grid;grid-template-columns:80px 1fr auto;gap:12px;align-items:center;">
      <img src="${i.image}" alt="${i.title}" style="width:80px;height:80px;object-fit:cover;border-radius:4px;" />
      <div>
        <div class="product-card__title">${i.title}</div>
        <div class="product-card__price">${money(i.price)}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <a href="/user/product.html?id=${i.id}" class="btn-primary" style="background:#eee;color:#333;border-color:#ddd;">View</a>
        <button class="remove-wl btn-primary" style="background:#eee;color:#333;border-color:#ddd;">Remove</button>
      </div>
    </div>
  `).join('');
  qq('.remove-wl', root).forEach(btn => btn.addEventListener('click', e => {
    const parent = e.target.closest('[data-id]');
    const id = Number(parent.getAttribute('data-id'));
    Wishlist.remove(id);
    renderWishlist();
  }));
}
