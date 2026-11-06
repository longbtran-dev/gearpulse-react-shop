import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import CheckoutPage from './CheckoutPage';
import AuthProvider from '../context/AuthProvider';
import CartProvider from '../context/CartProvider';

function renderCheckoutWithItems() {
  const initialCartState = {
    items: [
      {
        id: '1',
        name: 'CyberBlade Pro 75%',
        price: 189,
        quantity: 1,
        image: 'test.svg'
      }
    ],
    totalItems: 1,
    subtotal: 189,
    discount: 0,
    finalTotal: 189,
    coupon: { code: null, percent: 0, error: null }
  };
  localStorage.setItem('gearpulse-cart-data', JSON.stringify(initialCartState));

  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <CheckoutPage />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('CheckoutPage (Lab 4 - Formik & Yup Validation + Order Summary)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('validates required fields with Yup and displays error messages on empty submit', async () => {
    const user = userEvent.setup();
    renderCheckoutWithItems();

    const submitBtn = screen.getByRole('button', { name: /đặt hàng ngay/i });
    await user.click(submitBtn);

    expect(await screen.findByText(/họ và tên là bắt buộc/i)).toBeInTheDocument();
    expect(screen.getByText(/email là bắt buộc/i)).toBeInTheDocument();
    expect(screen.getByText(/số điện thoại là bắt buộc/i)).toBeInTheDocument();
    expect(screen.getByText(/địa chỉ nhận hàng là bắt buộc/i)).toBeInTheDocument();
  });

  it('submits valid form and displays Order Confirmation Summary', async () => {
    const user = userEvent.setup();
    renderCheckoutWithItems();

    await user.type(screen.getByLabelText(/họ và tên/i), 'Trần Bảo Long');
    await user.type(screen.getByLabelText(/địa chỉ email/i), 'longtm@fpt.edu.vn');
    await user.type(screen.getByLabelText(/số điện thoại/i), '0912345678');
    await user.type(screen.getByLabelText(/địa chỉ giao hàng/i), 'Khu Công Nghệ Cao Hòa Lạc');
    await user.selectOptions(screen.getByLabelText(/tỉnh \/ thành phố/i), 'Hà Nội');
    await user.click(screen.getByLabelText(/tôi đồng ý với điều khoản/i));

    const submitBtn = screen.getByRole('button', { name: /đặt hàng ngay/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /đặt hàng thành công/i })).toBeInTheDocument();
    });
    expect(screen.getAllByText(/trần bảo long/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/longtm@fpt.edu.vn/i)).toBeInTheDocument();
  });
});
