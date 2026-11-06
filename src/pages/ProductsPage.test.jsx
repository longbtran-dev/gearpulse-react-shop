import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProductsPage from './ProductsPage';
import CartProvider from '../context/CartProvider';

const testProducts = [
  {
    id: '1',
    name: 'CyberBlade Pro 75%',
    category: 'Keyboard',
    brand: 'VortexTech',
    price: 189,
    originalPrice: 219,
    rating: 5,
    inStock: true,
    image: 'kb.svg',
    description: 'Bàn phím cơ cao cấp'
  },
  {
    id: '2',
    name: 'ViperStrike 4K Wireless Mouse',
    category: 'Mouse',
    brand: 'AeroPulse',
    price: 99,
    originalPrice: 129,
    rating: 4,
    inStock: true,
    image: 'mouse.svg',
    description: 'Chuột gaming PAW3395'
  },
  {
    id: '3',
    name: 'AcoustiGear Apex Spatial Headset',
    category: 'Headset',
    brand: 'AcoustiGear',
    price: 249,
    originalPrice: 289,
    rating: 5,
    inStock: true,
    image: 'headset.svg',
    description: 'Tai nghe chụp tai'
  }
];

function renderProductsPage(props = {}) {
  return render(
    <MemoryRouter>
      <CartProvider>
        <ProductsPage
          products={testProducts}
          loading={false}
          error={null}
          onRetry={vi.fn()}
          {...props}
        />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('ProductsPage (Lab 2 - useState Search/Filter & Lab 5 - Routing)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders all products and filters by search query', async () => {
    const user = userEvent.setup();
    renderProductsPage();

    expect(screen.getByText('CyberBlade Pro 75%')).toBeInTheDocument();
    expect(screen.getByText('ViperStrike 4K Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByText('AcoustiGear Apex Spatial Headset')).toBeInTheDocument();

    const searchInput = screen.getByRole('searchbox', { name: /tìm kiếm sản phẩm/i });
    await user.type(searchInput, 'CyberBlade');

    expect(screen.getByText('CyberBlade Pro 75%')).toBeInTheDocument();
    expect(screen.queryByText('ViperStrike 4K Wireless Mouse')).not.toBeInTheDocument();
  });

  it('filters by category button selection', async () => {
    const user = userEvent.setup();
    renderProductsPage();

    const mousePill = screen.getByRole('button', { name: 'Mouse' });
    await user.click(mousePill);

    expect(screen.getByText('ViperStrike 4K Wireless Mouse')).toBeInTheDocument();
    expect(screen.queryByText('CyberBlade Pro 75%')).not.toBeInTheDocument();
  });
});
