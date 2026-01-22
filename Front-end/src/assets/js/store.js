const KEY = 'bookstore_cart';
const WL_KEY = 'bookstore_wishlist';

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

function wlRead() {
  try { return JSON.parse(localStorage.getItem(WL_KEY) || '[]'); } catch { return []; }
}
function wlWrite(items) { localStorage.setItem(WL_KEY, JSON.stringify(items)); }

export const Wishlist = {
  all() { return wlRead(); },
  add(item) {
    const items = wlRead();
    if (!items.find(i => i.id === item.id)) { items.push(item); wlWrite(items); }
  },
  remove(id) { wlWrite(wlRead().filter(i => i.id !== id)); },
  clear() { wlWrite([]); },
  has(id) { return !!wlRead().find(i => i.id === id); }
};
