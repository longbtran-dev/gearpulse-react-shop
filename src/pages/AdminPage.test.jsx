import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminPage from './AdminPage';
import AuthProvider from '../context/AuthProvider';

const initialItems = [
  {
    id: '1',
    name: 'CyberBlade Pro 75%',
    category: 'Keyboard',
    brand: 'VortexTech',
    price: 189,
    originalPrice: 219,
    rating: 5,
    stock: 20,
    inStock: true,
    image: 'kb.svg',
    description: 'Bàn phím cơ gõ đầm tay'
  },
  {
    id: '2',
    name: 'ViperStrike 4K Mouse',
    category: 'Mouse',
    brand: 'AeroPulse',
    price: 99,
    originalPrice: 129,
    rating: 4,
    stock: 15,
    inStock: true,
    image: 'mouse.svg',
    description: 'Chuột siêu nhẹ PAW3395'
  }
];

function renderAdmin(props = {}) {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <AdminPage
          products={initialItems}
          loading={false}
          error={null}
          feedback={null}
          onRetry={vi.fn()}
          onCreateProduct={vi.fn().mockResolvedValue({ id: '3', name: 'New Headset' })}
          onUpdateProduct={vi.fn().mockResolvedValue({ id: '1', name: 'CyberBlade RGB' })}
          onDeleteProduct={vi.fn().mockResolvedValue({ id: '2' })}
          {...props}
        />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('AdminPage & ProductFormModal (Lab 6 - RESTful CRUD & Role Check)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('protects route when guest and displays Admin Login Required', async () => {
    renderAdmin();

    expect(screen.getByRole('heading', { name: /yêu cầu đăng nhập quản trị viên/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /thêm sản phẩm mới/i })).not.toBeInTheDocument();
  });

  it('reveals CRUD console upon Admin login', async () => {
    const user = userEvent.setup();
    renderAdmin();

    const loginBtn = screen.getByRole('button', { name: /đăng nhập quyền admin/i });
    await user.click(loginBtn);

    expect(await screen.findByRole('button', { name: /\+ thêm sản phẩm mới/i })).toBeInTheDocument();
    expect(screen.getByText('CyberBlade Pro 75%')).toBeInTheDocument();
    expect(screen.getByText('ViperStrike 4K Mouse')).toBeInTheDocument();
  });

  it('opens Formik modal and validates required fields with Yup', async () => {
    const user = userEvent.setup();
    renderAdmin();

    await user.click(screen.getByRole('button', { name: /đăng nhập quyền admin/i }));
    await user.click(await screen.findByRole('button', { name: /\+ thêm sản phẩm mới/i }));

    const dialog = await screen.findByRole('dialog');
    const submitBtn = screen.getByRole('button', { name: /lưu sản phẩm/i });
    await user.click(submitBtn);

    expect(await screen.findByText(/tên sản phẩm là bắt buộc/i)).toBeInTheDocument();
    expect(screen.getByText(/giá bán là bắt buộc/i)).toBeInTheDocument();
    expect(screen.getByText(/mô tả là bắt buộc/i)).toBeInTheDocument();
  });
});
