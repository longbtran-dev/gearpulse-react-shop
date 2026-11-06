import { PRODUCTS_API_URL } from '../config/api';
import { initialProducts } from '../data/initialProducts';

const STORAGE_KEY = 'gearpulse-products-cache';

function getLocalStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
      return initialProducts.map((p) => ({ ...p }));
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialProducts;
  } catch {
    return initialProducts.map((p) => ({ ...p }));
  }
}

function saveLocalStore(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

function normalizeProduct(item) {
  return {
    ...item,
    id: String(item.id),
    price: Number(item.price) || 0,
    originalPrice: Number(item.originalPrice) || Number(item.price) || 0,
    rating: Number(item.rating) || 5,
    stock: Number(item.stock) ?? 10,
    inStock: Boolean(item.inStock ?? (Number(item.stock) > 0)),
    isHot: Boolean(item.isHot),
    isNew: Boolean(item.isNew),
    reviewsCount: Number(item.reviewsCount) || 10
  };
}

export async function fetchProducts() {
  try {
    const response = await fetch(PRODUCTS_API_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      const normalized = data.map(normalizeProduct);
      saveLocalStore(normalized);
      return normalized;
    }
    return getLocalStore().map(normalizeProduct);
  } catch {
    // Fallback to local persistent cache
    return getLocalStore().map(normalizeProduct);
  }
}

export async function fetchProductById(id) {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    return normalizeProduct(data);
  } catch {
    const local = getLocalStore();
    const found = local.find((p) => String(p.id) === String(id));
    if (!found) throw new Error(`Product not found with ID ${id}`);
    return normalizeProduct(found);
  }
}

export async function createProduct(payload) {
  const normalized = normalizeProduct({
    ...payload,
    id: String(Date.now())
  });

  try {
    const response = await fetch(PRODUCTS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    const result = normalizeProduct(data);
    const store = getLocalStore();
    saveLocalStore([...store, result]);
    return result;
  } catch {
    const store = getLocalStore();
    saveLocalStore([...store, normalized]);
    return normalized;
  }
}

export async function updateProduct(id, payload) {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    const result = normalizeProduct(data);
    const store = getLocalStore().map((item) =>
      String(item.id) === String(id) ? { ...item, ...result } : item
    );
    saveLocalStore(store);
    return result;
  } catch {
    const store = getLocalStore().map((item) =>
      String(item.id) === String(id) ? normalizeProduct({ ...item, ...payload }) : item
    );
    saveLocalStore(store);
    const updated = store.find((item) => String(item.id) === String(id));
    return updated;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    const store = getLocalStore().filter((item) => String(item.id) !== String(id));
    saveLocalStore(store);
    return data || { id };
  } catch {
    const store = getLocalStore().filter((item) => String(item.id) !== String(id));
    saveLocalStore(store);
    return { id };
  }
}
