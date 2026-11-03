import { API_URL, REQUEST_TIMEOUT_MS } from '../apiConfig';

const pick = (obj, keys, fallback = '') => {
  for (const k of keys) if (obj && obj[k] !== undefined && obj[k] !== null) return obj[k];
  return fallback;
};

// Convert one raw JSON record to the app's own shape. Tolerates common field-name variants.
export function normalizeItem(raw, index) {
  const price = parseFloat(String(pick(raw, ['price', 'amount', 'cost'], NaN)).replace(/[^0-9.]/g, ''));
  return {
    id: String(pick(raw, ['id', '_id', 'itemId'], `item-${index}`)),
    name: String(pick(raw, ['name', 'item', 'itemName', 'product', 'title'], 'Unnamed item')),
    category: String(pick(raw, ['category', 'type'], 'Other')),
    store: String(pick(raw, ['store', 'retailer', 'shop'], 'Unknown store')),
    province: String(pick(raw, ['province', 'region'], 'Unknown province')),
    area: String(pick(raw, ['area', 'location', 'suburb'], 'Unknown area')),
    price,
  };
}

export function normalizeResponse(json) {
  const list = Array.isArray(json)
    ? json
    : pick(json, ['items', 'basket', 'products', 'data', 'groceries'], []);
  if (!Array.isArray(list)) throw new Error('Unexpected data format from server.');
  return list.map(normalizeItem).filter((i) => Number.isFinite(i.price));
}

export async function fetchBasket() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(API_URL, { signal: controller.signal });
    if (!response.ok) throw new Error(`Server responded with status ${response.status}.`);
    const json = await response.json();
    const items = normalizeResponse(json);
    if (items.length === 0) throw new Error('Server returned no basket items.');
    return items;
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('The request timed out.');
    throw e;
  } finally {
    clearTimeout(timer);
  }
}
