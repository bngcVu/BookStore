export function q(selector, scope = document) { return scope.querySelector(selector); }
export function qq(selector, scope = document) { return Array.from(scope.querySelectorAll(selector)); }
export function money(value) {
  const n = typeof value === 'number' ? value : parseFloat(value || 0);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}
