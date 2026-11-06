import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';
import AuthProvider from './context/AuthProvider';
import CartProvider from './context/CartProvider';

function renderApp(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('GearPulse App Navigation (Integration)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders navbar brand, links, and home page hero', async () => {
    renderApp('/');
    expect(screen.getAllByText(/gearpulse/i).length).toBeGreaterThanOrEqual(1);

    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(within(nav).getByRole('link', { name: /^trang chủ$/i })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: /^cửa hàng$/i })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: /^liên hệ$/i })).toBeInTheDocument();
  });

  it('navigates to contact page and displays contact form', async () => {
    const user = userEvent.setup();
    renderApp('/');

    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    await user.click(within(nav).getByRole('link', { name: /^liên hệ$/i }));
    expect(await screen.findByRole('heading', { name: /trung tâm chăm sóc khách hàng/i })).toBeInTheDocument();
  });

  it('navigates to cart page and displays empty cart when no items selected', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByLabelText(/shopping cart/i));
    expect(await screen.findByRole('heading', { name: /giỏ hàng của bạn đang trống/i })).toBeInTheDocument();
  });
});
