import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import useCart from '../hooks/useCart';
import { fetchProductById } from '../services/productApi';

const placeholder = `${import.meta.env.BASE_URL || '/'}product-placeholder.svg`;

export default function ProductDetailPage({ products = [] }) {
  // Lab 5: useParams reading :id
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Lab 4: Cart Context integration
  const { addItem } = useCart();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // Try finding in passed products prop first for instant load
    const cached = products.find((p) => String(p.id) === String(id));
    if (cached) {
      setProduct(cached);
      setLoading(false);
      return;
    }

    // Lab 6: Otherwise fetch via RESTful API service
    fetchProductById(id)
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Không tìm thấy thông tin sản phẩm.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, products]);

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = placeholder;
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="gp-status-alert my-5" role="status">
        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
        <span>Đang tải thông số sản phẩm #{id}...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="gp-error-box my-5" role="alert">
        <h2>Không tìm thấy sản phẩm</h2>
        <p>{error || 'Sản phẩm này có thể đã ngừng kinh doanh hoặc đường dẫn không hợp lệ.'}</p>
        <Link to="/products" className="btn btn-primary">
          &larr; Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  // Lab 1: Related products from same category
  const relatedProducts = products
    .filter((p) => String(p.id) !== String(product.id) && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="gp-detail-page">
      {/* Lab 5: Breadcrumbs Navigation */}
      <nav className="gp-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span className="active">{product.name}</span>
      </nav>

      {/* Main Detail Grid */}
      <div className="gp-detail-grid">
        {/* Media Column */}
        <div className="gp-detail-media">
          <div className="main-image-wrap">
            <img src={product.image} alt={product.name} onError={handleImageError} />
            <div className="media-badges">
              {product.isHot && <span className="badge-pill badge-pill--hot">HOT</span>}
              {product.isNew && <span className="badge-pill badge-pill--new">NEW</span>}
              {hasDiscount && (
                <span className="badge-pill badge-pill--sale">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Info Column */}
        <div className="gp-detail-info">
          <div className="detail-tags">
            <span className="badge-category">{product.category}</span>
            <span className="badge-brand">Hãng: {product.brand || 'GearPulse'}</span>
            <span className="badge-rating">★ {product.rating}.0 / 5.0</span>
          </div>

          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-pricing">
            <span className="price-big">${product.price}</span>
            {hasDiscount && <span className="price-struck">${product.originalPrice}</span>}
            <span className={`stock-pill ${product.inStock ? 'in' : 'out'}`}>
              {product.inStock ? `Còn hàng (${product.stock || 20} chiếc)` : 'Tạm hết hàng'}
            </span>
          </div>

          <p className="detail-description">{product.description}</p>

          {/* Technical Specs Table */}
          {product.specs && (
            <div className="detail-specs-card">
              <h5>Bảng thông số kỹ thuật chi tiết:</h5>
              <table className="table table-sm specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <th scope="row">{key}</th>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Lab 2: Quantity picker & Lab 4: Add to cart */}
          {product.inStock && (
            <div className="detail-purchase-row">
              <div className="qty-picker">
                <button
                  type="button"
                  aria-label="Giảm số lượng"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  aria-label="Số lượng đặt mua"
                  min="1"
                  max={product.stock || 99}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                />
                <button
                  type="button"
                  aria-label="Tăng số lượng"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <Button
                variant="dark"
                size="lg"
                className="gp-btn-add-cart"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng (${product.price * quantity})
              </Button>
            </div>
          )}

          {addedNotice && (
            <div className="gp-added-toast" role="status">
              ✓ Đã thêm <strong>{quantity}x {product.name}</strong> vào giỏ hàng thành công!
              <Link to="/cart" className="ms-2 text-white text-decoration-underline">
                Xem giỏ hàng
              </Link>
            </div>
          )}

          <div className="detail-perks">
            <div>
              <span>⚡</span> Miễn phí vận chuyển toàn quốc cho đơn từ $100
            </div>
            <div>
              <span>🛡️</span> Bảo hành đổi mới trong 30 ngày nếu phát sinh lỗi kỹ thuật
            </div>
            <div>
              <span>🎁</span> Tặng kèm bộ phụ kiện vệ sinh chuyên dụng
            </div>
          </div>
        </div>
      </div>

      {/* Lab 1 & 5: Related Products */}
      {relatedProducts.length > 0 && (
        <section className="detail-related-section mt-5" aria-labelledby="related-heading">
          <div className="section-head mb-4">
            <h3 id="related-heading">Sản Phẩm Cùng Danh Mục</h3>
            <p className="text-muted">Các thiết bị gaming được cộng đồng lựa chọn phổ biến</p>
          </div>

          <div className="row g-4">
            {relatedProducts.map((p) => (
              <div key={p.id} className="col-12 col-sm-6 col-lg-3">
                <ProductCard product={p} onAddToCart={addItem} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
