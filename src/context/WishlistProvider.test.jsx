import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import WishlistProvider from './WishlistProvider';
import useWishlist from '../hooks/useWishlist';

const sampleGear = {
  id: '101',
  name: 'ApexPro TKL Keyboard',
  price: 199,
  category: 'Keyboard'
};

describe('WishlistProvider & useWishlist', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with empty wishlist', () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider
    });

    expect(result.current.wishlist).toEqual([]);
    expect(result.current.totalWishlist).toBe(0);
    expect(result.current.isInWishlist('101')).toBe(false);
  });

  it('toggles item in and out of wishlist and persists to localStorage', () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider
    });

    // Add item
    act(() => {
      result.current.toggleWishlist(sampleGear);
    });

    expect(result.current.totalWishlist).toBe(1);
    expect(result.current.isInWishlist('101')).toBe(true);

    // Remove item
    act(() => {
      result.current.toggleWishlist(sampleGear);
    });

    expect(result.current.totalWishlist).toBe(0);
    expect(result.current.isInWishlist('101')).toBe(false);
  });

  it('clears all items from wishlist', () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider
    });

    act(() => {
      result.current.toggleWishlist(sampleGear);
      result.current.toggleWishlist({ id: '102', name: 'Viper Mouse', price: 89 });
    });

    expect(result.current.totalWishlist).toBe(2);

    act(() => {
      result.current.clearWishlist();
    });

    expect(result.current.totalWishlist).toBe(0);
    expect(result.current.wishlist).toEqual([]);
  });
});
