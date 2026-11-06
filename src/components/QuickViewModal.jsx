import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const placeholder = `${import.meta.env.BASE_URL || '/'}product-placeholder.svg`;

export default function QuickViewModal({ product, show, onHide, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = placeholder;
  }

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
      onHide();
      setQuantity(1);
    }
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="gp-modal">
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="quickview-grid">
          <div className="quickview-media">
            <img src={product.image} alt={product.name} onError={handleImageError} />
          </div>

          <div className="quickview-info">
            <div className="quickview-meta">
              <span className="badge-tag">{product.category}</span>
              <span className="brand-tag">Hãng: {product.brand || 'GearPulse'}</span>
              <span className="rating-tag">★ {product.rating}.0 / 5.0</span>
            </div>

            <div className="quickview-price">
              <span className="price-main">${product.price}</span>
              {hasDiscount && <span className="price-old">${product.originalPrice}</span>}
              <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                {product.inStock ? `Còn hàng (${product.stock} chiếc)` : 'Tạm hết hàng'}
              </span>
            </div>

            <p className="quickview-desc">{product.description}</p>

            {product.specs && (
              <div className="quickview-specs">
                <h6>Thông số nổi bật:</h6>
                <ul>
                  {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {val}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.inStock && (
              <div className="quickview-qty-row">
                <label htmlFor="quickview-qty">Số lượng:</label>
                <div className="qty-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <input
                    id="quickview-qty"
                    type="number"
                    min="1"
                    max={product.stock || 99}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="quickview-actions">
              <Button
                variant="dark"
                className="w-100"
                disabled={!product.inStock}
                onClick={handleAdd}
              >
                {product.inStock ? `Thêm vào giỏ hàng ($${product.price * quantity})` : 'Hết hàng'}
              </Button>
              <Link
                to={`/product/${product.id}`}
                className="btn btn-outline-secondary w-100"
                onClick={onHide}
              >
                Xem chi tiết sản phẩm &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
