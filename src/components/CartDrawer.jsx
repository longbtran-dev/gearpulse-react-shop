import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

export default function CartDrawer({ show, onHide }) {
  const { items, totalItems, subtotal, discount, finalTotal, updateQty, removeItem } = useCart();

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="gp-cart-drawer">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <span>Giỏ Hàng Của Bạn</span>
          <span className="drawer-count-badge">({totalItems} món)</span>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="gp-cart-drawer__body">
        {items.length === 0 ? (
          <div className="drawer-empty-state">
            <span className="drawer-empty-icon" aria-hidden="true">🛒</span>
            <h5>Giỏ hàng đang trống</h5>
            <p>Hãy thêm các thiết bị gaming gear bạn yêu thích vào giỏ nhé.</p>
            <Link to="/products" className="btn btn-primary btn-sm" onClick={onHide}>
              Xem sản phẩm ngay &rarr;
            </Link>
          </div>
        ) : (
          <div className="drawer-items-list">
            {items.map((item) => (
              <div key={item.id} className="drawer-item-row">
                <img src={item.image} alt={item.name} className="drawer-item-thumb" />
                <div className="drawer-item-details">
                  <Link
                    to={`/product/${item.id}`}
                    className="drawer-item-name"
                    onClick={onHide}
                  >
                    {item.name}
                  </Link>
                  <span className="drawer-item-price">${item.price}</span>

                  <div className="drawer-qty-stepper">
                    <button
                      type="button"
                      aria-label="Giảm"
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Tăng"
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="drawer-remove-btn"
                  aria-label={`Xóa ${item.name}`}
                  onClick={() => removeItem(item.id)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </Offcanvas.Body>

      {items.length > 0 && (
        <div className="gp-cart-drawer__footer">
          <div className="drawer-totals">
            <div className="drawer-subtotal-row">
              <span>Tạm tính:</span>
              <strong>${subtotal}</strong>
            </div>
            {discount > 0 && (
              <div className="drawer-discount-row text-success">
                <span>Giảm giá:</span>
                <strong>-${discount}</strong>
              </div>
            )}
            <div className="drawer-final-row">
              <span>Tổng thanh toán:</span>
              <span className="final-price">${finalTotal}</span>
            </div>
          </div>

          <div className="drawer-cta-group">
            <Link
              to="/checkout"
              className="btn btn-primary w-100 btn-drawer-checkout"
              onClick={onHide}
            >
              Thanh toán ngay &rarr;
            </Link>
            <Link
              to="/cart"
              className="btn btn-outline-secondary w-100 btn-drawer-cart"
              onClick={onHide}
            >
              Xem chi tiết giỏ hàng
            </Link>
          </div>
        </div>
      )}
    </Offcanvas>
  );
}
