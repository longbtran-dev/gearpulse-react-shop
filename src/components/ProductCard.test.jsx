import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ProductCard from './ProductCard';
import WishlistProvider from '../context/WishlistProvider';

describe('ProductCard component (Lab 1 - Components & Props)', () => {
  const sampleProduct = {
    id: '1',
    name: 'CyberBlade Pro 75%',
    category: 'Keyboard',
    brand: 'VortexTech',
    price: 189,
    originalPrice: 219,
    rating: 5,
    isHot: true,
    isNew: true,
    inStock: true,
    image: 'test-image.svg'
  };

  it('renders product details, pricing, discount, and status badges', () => {
    render(
      <MemoryRouter>
        <WishlistProvider>
          <ProductCard product={sampleProduct} onQuickView={vi.fn()} onAddToCart={vi.fn()} />
        </WishlistProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('CyberBlade Pro 75%')).toBeInTheDocument();
    expect(screen.getByText('$189')).toBeInTheDocument();
    expect(screen.getByText('$219')).toBeInTheDocument();
    expect(screen.getByText(/HOT/i)).toBeInTheDocument();
    expect(screen.getByText(/NEW/i)).toBeInTheDocument();
    expect(screen.getByText('Keyboard')).toBeInTheDocument();
  });

  it('triggers quick view modal and add to cart callbacks', async () => {
    const user = userEvent.setup();
    const handleQuickView = vi.fn();
    const handleAddToCart = vi.fn();

    render(
      <MemoryRouter>
        <WishlistProvider>
          <ProductCard
            product={sampleProduct}
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
          />
        </WishlistProvider>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /quick view/i }));
    expect(handleQuickView).toHaveBeenCalledWith(sampleProduct);

    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(handleAddToCart).toHaveBeenCalledWith(sampleProduct);
  });
});
