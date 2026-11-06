import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import ProductDetailPage from './ProductDetailPage';
import CartProvider from '../context/CartProvider';
import WishlistProvider from '../context/WishlistProvider';

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
    salesCount: 890,
    reviewsCount: 42,
    image: 'kb-main.svg',
    gallery: ['kb-main.svg', 'kb-side.svg', 'kb-top.svg'],
    variants: {
      switches: ['Gateron Oil King (Linear)', 'TTC Holy Panda (Tactile)'],
      colors: ['Obsidian Black', 'Cyber Cyan']
    },
    specs: {
      Layout: '75% (82 phím)',
      Mount: 'Gasket Mount'
    },
    reviews: [
      { id: 'r1', author: 'Đức Huy', rating: 5, date: '2 ngày trước', comment: 'Âm thanh gõ đầm thock cực kỳ đã tai!' }
    ],
    description: 'Bàn phím cơ thiết kế gasket mount êm ái'
  }
];

function renderDetailPage(productId = '1') {
  return render(
    <MemoryRouter initialEntries={[`/product/${productId}`]}>
      <WishlistProvider>
        <CartProvider>
          <Routes>
            <Route
              path="/product/:id"
              element={<ProductDetailPage products={testGear} />}
            />
          </Routes>
        </CartProvider>
      </WishlistProvider>
    </MemoryRouter>
  );
}

describe('ProductDetailPage (Commercial UI/UX Showcase)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders product specifications, gallery thumbnails, and initial review', async () => {
    renderDetailPage('1');

    expect(await screen.findByRole('heading', { level: 1, name: 'CyberBlade Pro 75%' })).toBeInTheDocument();
    expect(screen.getByText('Hãng: VortexTech')).toBeInTheDocument();
    expect(screen.getByText('Đã bán 890+')).toBeInTheDocument();
    expect(screen.getByText('$189')).toBeInTheDocument();
    expect(screen.getByText('Gasket Mount')).toBeInTheDocument();
    expect(screen.getByText('Đức Huy')).toBeInTheDocument();
    expect(screen.getByText('Âm thanh gõ đầm thock cực kỳ đã tai!')).toBeInTheDocument();
  });

  it('allows selecting switch variant and submitting a new customer review', async () => {
    const user = userEvent.setup();
    renderDetailPage('1');

    await screen.findByRole('heading', { level: 1, name: 'CyberBlade Pro 75%' });

    // Click switch variant
    const tactileSwitchBtn = screen.getByRole('button', { name: 'TTC Holy Panda (Tactile)' });
    await user.click(tactileSwitchBtn);
    expect(tactileSwitchBtn).toHaveClass('active');

    // Fill review form
    const authorInput = screen.getByLabelText(/họ và tên của bạn/i);
    const commentInput = screen.getByLabelText(/nội dung nhận xét/i);
    const submitBtn = screen.getByRole('button', { name: /gửi đánh giá/i });

    await user.type(authorInput, 'Trần Minh Quân');
    await user.type(commentInput, 'Sản phẩm hoàn thiện siêu đẹp, switch tactile nảy rất thích!');
    await user.click(submitBtn);

    // Verify success banner and new review rendered
    await waitFor(() => {
      expect(screen.getByText(/cảm ơn bạn! đánh giá đã được ghi nhận/i)).toBeInTheDocument();
    });
    expect(screen.getByText('Trần Minh Quân')).toBeInTheDocument();
    expect(screen.getByText('Sản phẩm hoàn thiện siêu đẹp, switch tactile nảy rất thích!')).toBeInTheDocument();
  });
});
