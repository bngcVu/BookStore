import { money } from './utils.js';

export function renderProductCard(book) {
  const { id, title, author, price, condition, seller, image } = book;
  return `
    <a class="product-card" href="product.html?id=${id}" aria-label="View ${title} by ${author}" style="position:relative;">
      <button class="wishlist-btn" aria-label="Thêm vào yêu thích" data-id="${id}" data-title="${title}" data-image="${image}" data-price="${price}" style="position:absolute;top:8px;right:8px;padding:6px 8px;border:1px solid var(--color-gray-100);border-radius:16px;background:#fff;color:#b22222;cursor:pointer;">♥</button>
      <img src="${image}" alt="${title} cover" loading="lazy" />
      <h3 class="product-card__title">${title}</h3>
      <p class="product-card__author">by ${author}</p>
      <p class="product-card__price">${money(price)}</p>
      <span class="badge-fine">${condition}</span>
      <p class="product-card__seller">Seller: ${seller}</p>
    </a>
  `;
}
