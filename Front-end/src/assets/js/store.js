const KEY = 'bookstore_cart';

function read() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}
function write(items) { localStorage.setItem(KEY, JSON.stringify(items)); }

export const Cart = {
  all() { return read(); },
  add(item) {
    const items = read();
    const found = items.find(i => i.id === item.id);
    if (found) found.qty += item.qty || 1; else items.push({ ...item, qty: item.qty || 1 });
    write(items);
  },
  update(id, qty) {
    const items = read().map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i);
    write(items);
  },
  remove(id) {
    write(read().filter(i => i.id !== id));
  },
  clear() { write([]); },
  total() { return read().reduce((sum, i) => sum + i.price * i.qty, 0); }
};
