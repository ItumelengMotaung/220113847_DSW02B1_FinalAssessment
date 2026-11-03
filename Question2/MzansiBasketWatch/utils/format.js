export const formatRand = (n) => `R${Number(n).toFixed(2)}`;

export const average = (list) =>
  list.length === 0 ? 0 : list.reduce((sum, i) => sum + i.price, 0) / list.length;


export function applyFilters(items, { search, category, maxPrice }) {
  const q = search.trim().toLowerCase();
  const max = parseFloat(maxPrice);
  const hasMax = maxPrice.trim() !== '' && !Number.isNaN(max);
  return items.filter(
    (i) =>
      (q === '' || i.name.toLowerCase().includes(q)) &&
      (category === 'All' || i.category === category) &&
      (!hasMax || i.price <= max)
  );
}
