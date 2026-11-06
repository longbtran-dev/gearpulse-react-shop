import { useEffect, useState } from 'react';
import WishlistContext from './WishlistContext';

const WISHLIST_KEY = 'gearpulse-wishlist';

function readStoredWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(readStoredWishlist);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => String(item.id) === String(product.id));
      if (exists) {
        return current.filter((item) => String(item.id) !== String(product.id));
      } else {
        return [...current, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => String(item.id) === String(productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        totalWishlist: wishlist.length,
        toggleWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
