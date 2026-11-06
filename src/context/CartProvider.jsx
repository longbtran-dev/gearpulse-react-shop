import { useEffect, useReducer } from 'react';
import CartContext from './CartContext';
import { cartInitialState, cartReducer } from './cartReducer';

const CART_STORAGE_KEY = 'gearpulse-cart-data';

function getStoredCartState() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : cartInitialState;
  } catch {
    return cartInitialState;
  }
}

export default function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, cartInitialState, getStoredCartState);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
    } catch {
      // ignore
    }
  }, [cartState]);

  const addItem = (product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQty = (id, quantity) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } });
  };

  const applyCoupon = (code) => {
    dispatch({ type: 'APPLY_COUPON', payload: { code } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        addItem,
        removeItem,
        updateQty,
        applyCoupon,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
