import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createProduct,
  deleteProduct,
  fetchProductById,
  fetchProducts,
  updateProduct
} from './productApi';

describe('productApi REST service (Lab 6 - Fetch API)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('fetches products list via GET', async () => {
    const mockProducts = [
      { id: '1', name: 'CyberBlade Pro 75%', category: 'Keyboard', price: 189, rating: 5 }
    ];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockProducts
    }));

    const products = await fetchProducts();
    expect(products).toHaveLength(1);
    expect(products[0].name).toBe('CyberBlade Pro 75%');
  });

  it('fetches single product by id via GET', async () => {
    const mockItem = { id: '2', name: 'ViperStrike Wireless', category: 'Mouse', price: 99 };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockItem
    }));

    const product = await fetchProductById('2');
    expect(product.name).toBe('ViperStrike Wireless');
  });

  it('creates new product via POST', async () => {
    const newProduct = {
      name: 'SonicWave Studio Pro',
      category: 'Headset',
      price: 249,
      rating: 5,
      brand: 'AcoustiGear',
      stock: 15
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ id: '101', ...newProduct })
    });
    vi.stubGlobal('fetch', fetchMock);

    const created = await createProduct(newProduct);
    expect(created.id).toBe('101');
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/products'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
    );
  });

  it('updates product via PUT', async () => {
    const updatePayload = { name: 'CyberBlade Pro RGB', price: 199 };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: '1', ...updatePayload })
    });
    vi.stubGlobal('fetch', fetchMock);

    const updated = await updateProduct('1', updatePayload);
    expect(updated.name).toBe('CyberBlade Pro RGB');
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/products/1'),
      expect.objectContaining({ method: 'PUT' })
    );
  });

  it('deletes product via DELETE', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: '1' })
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await deleteProduct('1');
    expect(result.id).toBe('1');
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/products/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});
