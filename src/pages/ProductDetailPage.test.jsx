import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import ProductDetailPage from './ProductDetailPage';
import CartProvider from '../context/CartProvider';

const testGear = [
  {
    id: '1',
    name: 'CyberBlade Pro 75%',
    category: 'Keyboard',
    brand: 'VortexTech',
    price: 189,
    originalPrice: 219,
    rating: 5,
    inStock: true,
    image: 'kb-main.svg',
    specs: {
      Layout: '75% (82 phím)',
      Mount: 'Gasket Mount'
    },
    description: 'Bàn phím cơ thiết kế gasket mount êm ái'
  }
];

function renderDetailPage(productId = '1') {
  return render(
    <MemoryRouter initialEntries={[`/product/${productId}`]}>
      <CartProvider>
        <Routes>
          <Route
            path="/product/:id"
            element={<ProductDetailPage products={testGear} />}
          />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  );
}

describe('ProductDetailPage (Lab 5 - Routing & Lab 2/4 - State/Cart)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders product specifications, pricing, and specs table', async () => {
    renderDetailPage('1');

    expect(await screen.findByRole('heading', { level: 1, name: 'CyberBlade Pro 75%' })).toBeInTheDocument();
    expect(screen.getByText('Hãng: VortexTech')).toBeInTheDocument();
    expect(screen.getByText('$189')).toBeInTheDocument();
    expect(screen.getByText('Gasket Mount')).toBeInTheDocument();
  });

  it('allows increasing quantity and adding to cart with success notification', async () => {
    const user = userEvent.setup();
    renderDetailPage('1');

    await screen.findByRole('heading', { level: 1, name: 'CyberBlade Pro 75%' });

    const increaseBtn = screen.getByRole('button', { name: /tăng số lượng/i });
    await user.click(increaseBtn);

    const addToCartBtn = screen.getByRole('button', { name: /thêm vào giỏ hàng/i });
    await user.click(addToCartBtn);

    expect(await screen.findByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/đã thêm/i)).toBeInTheDocument();
  });
});
