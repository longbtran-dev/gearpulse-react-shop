import { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct
} from './services/productApi';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Lab 6: Load product collection from RESTful API / Local cache fallback
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Lab 6: CRUD operations synced with state and API
  const handleCreateProduct = async (payload) => {
    const created = await createProduct(payload);
    setProducts((prev) => [...prev, created]);
    setFeedback(`Đã thêm sản phẩm "${created.name}" thành công!`);
    setTimeout(() => setFeedback(null), 4000);
    return created;
  };

  const handleUpdateProduct = async (id, payload) => {
    const updated = await updateProduct(id, payload);
    setProducts((prev) =>
      prev.map((item) => (String(item.id) === String(id) ? updated : item))
    );
    setFeedback(`Đã cập nhật sản phẩm "${updated.name}" thành công!`);
    setTimeout(() => setFeedback(null), 4000);
    return updated;
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((item) => String(item.id) !== String(id)));
    setFeedback('Đã xóa sản phẩm khỏi hệ thống thành công!');
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="gp-app-shell">
      <Navbar products={products} />

      <main className="gp-main-content">
        {/* Lab 5: React Router Routes definition */}
        <Routes>
          <Route path="/" element={<HomePage products={products} loading={loading} />} />
          <Route
            path="/products"
            element={
              <ProductsPage
                products={products}
                loading={loading}
                error={error}
                onRetry={loadProducts}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetailPage products={products} />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/admin"
            element={
              <AdminPage
                products={products}
                loading={loading}
                error={error}
                feedback={feedback}
                onRetry={loadProducts}
                onCreateProduct={handleCreateProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            }
          />
          {/* Fallback route */}
          <Route
            path="*"
            element={
              <div className="text-center py-5">
                <h2>404 - Trang không tồn tại</h2>
                <p>Địa chỉ bạn truy cập không tồn tại hoặc đã được chuyển đi nơi khác.</p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
