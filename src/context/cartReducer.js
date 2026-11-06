export const VALID_COUPONS = {
  GEAR10: 10,
  PRO20: 20,
  VIP30: 30
};

export const cartInitialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  discount: 0,
  finalTotal: 0,
  coupon: {
    code: null,
    percent: 0,
    error: null
  }
};

function calculateTotals(items, coupon) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = Math.round(rawSubtotal * 100) / 100;

  let discount = 0;
  if (coupon && coupon.percent > 0) {
    discount = Math.round(((subtotal * coupon.percent) / 100) * 100) / 100;
  }

  const finalTotal = Math.max(0, Math.round((subtotal - discount) * 100) / 100);

  return {
    totalItems,
    subtotal,
    discount,
    finalTotal
  };
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => String(item.id) === String(product.id)
      );

      let newItems;
      if (existingIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            id: String(product.id),
            name: product.name,
            price: Number(product.price),
            originalPrice: Number(product.originalPrice || product.price),
            image: product.image,
            category: product.category,
            brand: product.brand,
            quantity: Math.max(1, quantity)
          }
        ];
      }

      const totals = calculateTotals(newItems, state.coupon);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case 'UPDATE_QTY': {
      const { id, quantity } = action.payload;
      const targetQty = Number(quantity);

      let newItems;
      if (targetQty <= 0) {
        newItems = state.items.filter((item) => String(item.id) !== String(id));
      } else {
        newItems = state.items.map((item) =>
          String(item.id) === String(id) ? { ...item, quantity: targetQty } : item
        );
      }

      const totals = calculateTotals(newItems, state.coupon);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case 'REMOVE_ITEM': {
      const { id } = action.payload;
      const newItems = state.items.filter((item) => String(item.id) !== String(id));
      const totals = calculateTotals(newItems, state.coupon);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case 'APPLY_COUPON': {
      const rawCode = (action.payload.code || '').trim().toUpperCase();
      const percent = VALID_COUPONS[rawCode];

      if (!percent) {
        return {
          ...state,
          coupon: {
            code: null,
            percent: 0,
            error: 'Mã giảm giá không hợp lệ'
          },
          discount: 0,
          finalTotal: state.subtotal
        };
      }

      const newCoupon = {
        code: rawCode,
        percent,
        error: null
      };
      const totals = calculateTotals(state.items, newCoupon);
      return {
        ...state,
        coupon: newCoupon,
        ...totals
      };
    }

    case 'CLEAR_CART':
      return {
        ...cartInitialState
      };

    default:
      return state;
  }
}
