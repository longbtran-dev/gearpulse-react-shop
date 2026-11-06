import { describe, expect, it } from 'vitest';
import { cartInitialState, cartReducer } from './cartReducer';

describe('cartReducer (Lab 4 - useReducer Cart Management)', () => {
  const sampleProduct = {
    id: '1',
    name: 'CyberBlade Pro 75%',
    price: 189,
    image: 'test.svg'
  };

  it('adds a new item to cart and calculates subtotal and totals', () => {
    const state = cartReducer(cartInitialState, {
      type: 'ADD_ITEM',
      payload: { product: sampleProduct, quantity: 2 }
    });

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.totalItems).toBe(2);
    expect(state.subtotal).toBe(378);
    expect(state.finalTotal).toBe(378);
  });

  it('increments quantity when adding same item multiple times', () => {
    let state = cartReducer(cartInitialState, {
      type: 'ADD_ITEM',
      payload: { product: sampleProduct, quantity: 1 }
    });
    state = cartReducer(state, {
      type: 'ADD_ITEM',
      payload: { product: sampleProduct, quantity: 2 }
    });

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
    expect(state.totalItems).toBe(3);
    expect(state.subtotal).toBe(567);
  });

  it('updates quantity and removes item when quantity is 0', () => {
    let state = cartReducer(cartInitialState, {
      type: 'ADD_ITEM',
      payload: { product: sampleProduct, quantity: 3 }
    });

    state = cartReducer(state, {
      type: 'UPDATE_QTY',
      payload: { id: '1', quantity: 5 }
    });
    expect(state.items[0].quantity).toBe(5);
    expect(state.subtotal).toBe(945);

    state = cartReducer(state, {
      type: 'UPDATE_QTY',
      payload: { id: '1', quantity: 0 }
    });
    expect(state.items).toHaveLength(0);
    expect(state.totalItems).toBe(0);
    expect(state.subtotal).toBe(0);
  });

  it('removes item by id with REMOVE_ITEM', () => {
    let state = cartReducer(cartInitialState, {
      type: 'ADD_ITEM',
      payload: { product: sampleProduct, quantity: 1 }
    });

    state = cartReducer(state, {
      type: 'REMOVE_ITEM',
      payload: { id: '1' }
    });
    expect(state.items).toHaveLength(0);
  });

  it('applies valid discount coupon GEAR10 (10% off) and rejects invalid coupon', () => {
    let state = cartReducer(cartInitialState, {
      type: 'ADD_ITEM',
      payload: { product: sampleProduct, quantity: 1 } // $189
    });

    state = cartReducer(state, {
      type: 'APPLY_COUPON',
      payload: { code: 'GEAR10' }
    });
    expect(state.coupon.code).toBe('GEAR10');
    expect(state.coupon.percent).toBe(10);
    expect(state.discount).toBe(18.9);
    expect(state.finalTotal).toBe(170.1);

    // Invalid coupon
    state = cartReducer(state, {
      type: 'APPLY_COUPON',
      payload: { code: 'INVALID' }
    });
    expect(state.coupon.error).toBe('Mã giảm giá không hợp lệ');
  });

  it('clears cart with CLEAR_CART', () => {
    let state = cartReducer(cartInitialState, {
      type: 'ADD_ITEM',
      payload: { product: sampleProduct, quantity: 2 }
    });

    state = cartReducer(state, { type: 'CLEAR_CART' });
    expect(state.items).toHaveLength(0);
    expect(state.totalItems).toBe(0);
    expect(state.subtotal).toBe(0);
    expect(state.finalTotal).toBe(0);
  });
});
