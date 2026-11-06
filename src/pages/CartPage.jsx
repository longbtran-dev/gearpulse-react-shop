import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

export default function CartPage() {
  const {
    items,
    totalItems,
    subtotal,
    discount,
    finalTotal,
    coupon,
    updateQty,
    removeItem,
    applyCoupon,
    clearCart
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="gp-cart-empty">
        <div className="empty-card">
          <span className="empty-icon" aria-hidden="true">🛒</span>
          <h2>Giỏ hàng của bạn đang trống</h2>
          <p>Chưa có sản phẩm nào được chọn. Hãy ghé qua cửa hàng để tìm món gear ưng ý nhé!</p>
          <Link to="/products" className="btn btn-primary">
            Khám phá sản phẩm ngay &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="gp-cart-page">
      <header className="gp-page-header">
        <div className="gp-page-header__content">
          <span className="eyebrow-pill">Giỏ Hàng Của Bạn</span>
          <h1>Quản lý sản phẩm ({totalItems})</h1>
        </div>
      </header>

      <div className="gp-cart-grid">
        {/* Table of items */}
        <div className="gp-cart-items-panel">
          <div className="table-responsive">
            <table className="table gp-cart-table">
              <thead>
                <tr>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Đơn giá</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Thành tiền</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="cart-product-cell">
                        <img src={item.image} alt={item.name} />
                        <div>
                          <Link to={`/product/${item.id}`} className="cart-item-title">
                            {item.name}
                          </Link>
                          <span className="cart-item-cat">{item.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">${item.price}</td>
                    <td className="align-middle">
                      <div className="cart-qty-stepper">
                        <button
                          type="button"
                          aria-label={`Giảm số lượng ${item.name}`}
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Tăng số lượng ${item.name}`}
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="align-middle fw-bold">
                      ${Math.round(item.price * item.quantity * 100) / 100}
                    </td>
                    <td className="align-middle">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        aria-label={`Xóa ${item.name} khỏi giỏ`}
                        onClick={() => removeItem(item.id)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-table-footer">
            <Link to="/products" className="btn btn-outline-secondary">
              &larr; Tiếp tục chọn thêm đồ
            </Link>
            <Button variant="outline-danger" onClick={clearCart}>
              Xóa sạch giỏ hàng
            </Button>
          </div>
        </div>

        {/* Order Summary & Coupon box */}
        <div className="gp-cart-summary-panel">
          <div className="summary-card">
            <h4>Tóm tắt đơn hàng</h4>

            <div className="summary-row">
              <span>Tạm tính ({totalItems} món)</span>
              <strong>${subtotal}</strong>
            </div>

            {coupon.code && (
              <div className="summary-row discount-row">
                <span>Mã giảm giá ({coupon.code} -{coupon.percent}%)</span>
                <strong className="text-success">-${discount}</strong>
              </div>
            )}

            <div className="summary-row">
              <span>Phí vận chuyển</span>
              <strong>{finalTotal >= 100 ? 'Miễn phí' : '$10.00'}</strong>
            </div>

            <hr />

            <div className="summary-row summary-total">
              <span>Tổng thanh toán</span>
              <span className="total-amount">
                ${finalTotal >= 100 ? finalTotal : Math.round((finalTotal + 10) * 100) / 100}
              </span>
            </div>

            {/* Coupon input form */}
            <form onSubmit={handleApplyCoupon} className="coupon-box">
              <label htmlFor="coupon-input">Mã khuyến mãi (thử GEAR10, PRO20, VIP30):</label>
              <div className="input-group">
                <input
                  id="coupon-input"
                  type="text"
                  placeholder="Nhập mã giảm giá..."
                  className="form-control"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <Button variant="dark" type="submit">
                  Áp dụng
                </Button>
              </div>
              {coupon.error && <p className="coupon-error">{coupon.error}</p>}
              {coupon.code && <p className="coupon-success">✓ Đã áp dụng mã {coupon.code} thành công!</p>}
            </form>

            <Link to="/checkout" className="btn btn-primary btn-lg w-100 btn-checkout">
              Tiến hành thanh toán &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
