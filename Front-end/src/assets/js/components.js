import { money } from './utils.js';

export function renderProductCard(book) {
  const { id, title, author, price, condition, seller, image } = book;
  return `
    <a class="product-card" href="/user/product.html?id=${id}" aria-label="View ${title} by ${author}">
      <img src="${image}" alt="${title} cover" loading="lazy" />
      <h3 class="product-card__title">${title}</h3>
      <p class="product-card__author">by ${author}</p>
      <p class="product-card__price">${money(price)}</p>
      <span class="badge-fine">${condition}</span>
      <p class="product-card__seller">Seller: ${seller}</p>
    </a>
  `;
}
