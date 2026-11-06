import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ProductFormModal from '../components/ProductFormModal';
import { PRODUCTS_API_URL } from '../config/api';
import useAuth from '../hooks/useAuth';

export default function AdminPage({
  products = [],
  loading = false,
  error = null,
  feedback = null,
  onRetry,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct
}) {
  const { isAdmin, loginAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setModalError(null);
    setShowModal(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setModalError(null);
    setShowModal(true);
  };

  const handleSubmit = async (values) => {
    setModalError(null);
    try {
      if (editingProduct) {
        await onUpdateProduct(editingProduct.id, values);
      } else {
        await onCreateProduct(values);
      }
      setShowModal(false);
    } catch (err) {
      setModalError(err.message || 'Lỗi lưu thông tin sản phẩm lên server');
    }
  };

  const handleDelete = async (product) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`)) {
      setDeletingId(product.id);
      try {
        await onDeleteProduct(product.id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Lab 3: Role check - Protected Admin Route
  if (!isAdmin) {
    return (
      <div className="gp-admin-gate">
        <div className="gate-card">
          <span className="gate-icon" aria-hidden="true">🔒</span>
          <h2>Yêu Cầu Đăng Nhập Quản Trị Viên</h2>
          <p>
            Trang quản trị chỉ dành riêng cho Admin có quyền thực hiện các thao tác <code>POST</code>,{' '}
            <code>PUT</code> và <code>DELETE</code> lên hệ thống RESTful API.
          </p>
          <Button variant="dark" size="lg" onClick={loginAdmin}>
            Đăng nhập quyền Admin
          </Button>
        </div>
      </div>
    );
  }

  const query = searchTerm.trim().toLowerCase();
  const filteredList = products.filter(
    (p) =>
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.brand && p.brand.toLowerCase().includes(query))
  );

  return (
    <div className="gp-admin-page">
      <header className="gp-page-header">
        <div className="gp-page-header__content">
          <span className="eyebrow-pill">Lab 6 · RESTful CRUD Console</span>
          <h1>Quản Trị Danh Mục Sản Phẩm</h1>
          <p className="text-muted">
            Kết nối máy chủ API tại <code>{PRODUCTS_API_URL}</code>
          </p>
        </div>
        <div className="gp-page-header__actions">
          <Button variant="outline-secondary" className="me-2" onClick={onRetry} disabled={loading}>
            Làm mới dữ liệu
          </Button>
          <Button variant="dark" onClick={handleOpenAdd}>
            + Thêm sản phẩm mới
          </Button>
        </div>
      </header>

      {/* Action feedback banner */}
      {feedback && (
        <div className="alert alert-success alert-dismissible fade show" role="status">
          ✓ {feedback}
        </div>
      )}

      {loading && (
        <div className="gp-status-alert my-3" role="status">
          <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
          <span>Đang đồng bộ dữ liệu với server MockAPI...</span>
        </div>
      )}

      {!loading && error && (
        <div className="gp-error-alert my-3" role="alert">
          <div>
            <h5>Lỗi kết nối RESTful API</h5>
            <p>{error}</p>
          </div>
          <Button variant="danger" size="sm" onClick={onRetry}>
            Thử lại
          </Button>
        </div>
      )}

      {/* Data Table */}
      {!loading && !error && (
        <div className="admin-table-container">
          <div className="admin-table-toolbar">
            <input
              type="search"
              placeholder="Lọc theo tên sản phẩm, hãng, danh mục..."
              className="form-control admin-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="admin-table-count">
              Tổng số: <strong>{filteredList.length}</strong> sản phẩm
            </span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover admin-product-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Danh mục</th>
                  <th scope="col">Hãng</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Kho</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((p) => (
                  <tr key={p.id}>
                    <td className="align-middle text-muted">#{p.id}</td>
                    <td className="align-middle">
                      <div className="admin-prod-cell">
                        <img src={p.image} alt={p.name} />
                        <div>
                          <strong>{p.name}</strong>
                          <span className="d-block text-muted small">★ {p.rating}.0 / 5.0</span>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">{p.category}</td>
                    <td className="align-middle">{p.brand}</td>
                    <td className="align-middle fw-bold">${p.price}</td>
                    <td className="align-middle">{p.stock}</td>
                    <td className="align-middle">
                      <div className="admin-status-badges">
                        {p.inStock ? (
                          <span className="badge bg-success">Còn hàng</span>
                        ) : (
                          <span className="badge bg-secondary">Hết hàng</span>
                        )}
                        {p.isHot && <span className="badge bg-danger ms-1">Hot</span>}
                        {p.isNew && <span className="badge bg-info ms-1">Mới</span>}
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="btn-group btn-group-sm">
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleOpenEdit(p)}
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="outline-danger"
                          disabled={deletingId === p.id}
                          onClick={() => handleDelete(p)}
                        >
                          {deletingId === p.id ? 'Đang xóa...' : 'Xóa'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Formik + Yup Modal */}
      <ProductFormModal
        show={showModal}
        editingProduct={editingProduct}
        onHide={() => setShowModal(false)}
        onSubmitProduct={handleSubmit}
        apiError={modalError}
      />
    </div>
  );
}
