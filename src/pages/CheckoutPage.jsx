import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import { checkoutInitialValues, checkoutValidationSchema } from '../validation/checkoutSchema';

export default function CheckoutPage() {
  const { items, totalItems, subtotal, discount, finalTotal, coupon, clearCart } = useCart();
  const { user } = useAuth();
  const [completedOrder, setCompletedOrder] = useState(null);

  const shippingFee = finalTotal >= 100 || finalTotal === 0 ? 0 : 10;
  const grandTotal = Math.round((finalTotal + shippingFee) * 100) / 100;

  const initialFormValues = {
    ...checkoutInitialValues,
    fullName: user?.username === 'Aaron' ? 'Aaron Vance' : '',
    email: user?.email || '',
    phone: user?.username === 'Aaron' ? '0912345678' : ''
  };

  if (completedOrder) {
    return (
      <div className="gp-order-confirmed-page">
        <div className="confirmation-card" role="status" aria-label="Order confirmation">
          <div className="confirmation-header">
            <span className="check-badge" aria-hidden="true">✓</span>
            <h2>Đặt hàng thành công!</h2>
            <p className="order-id">Mã đơn hàng: <strong>#{completedOrder.id}</strong></p>
            <p className="order-thankyou">
              Cảm ơn bạn <strong>{completedOrder.customer.fullName}</strong>. Đơn hàng của bạn đã được tiếp nhận và nhân viên sẽ liên hệ qua SĐT <strong>{completedOrder.customer.phone}</strong> trước khi giao.
            </p>
          </div>

          <div className="confirmation-details">
            <div className="details-col">
              <h6>Thông tin nhận hàng</h6>
              <p><strong>Người nhận:</strong> {completedOrder.customer.fullName}</p>
              <p><strong>Email:</strong> {completedOrder.customer.email}</p>
              <p><strong>Số điện thoại:</strong> {completedOrder.customer.phone}</p>
              <p><strong>Địa chỉ:</strong> {completedOrder.customer.address}, {completedOrder.customer.city}</p>
              <p><strong>Phương thức:</strong> {completedOrder.customer.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}</p>
            </div>

            <div className="details-col">
              <h6>Chi tiết sản phẩm đã đặt ({completedOrder.items.length})</h6>
              <ul className="confirmed-items-list">
                {completedOrder.items.map((item) => (
                  <li key={item.id}>
                    <span>{item.quantity}x {item.name}</span>
                    <strong>${Math.round(item.price * item.quantity * 100) / 100}</strong>
                  </li>
                ))}
              </ul>
              <div className="confirmed-totals">
                <div><span>Tạm tính:</span> <span>${completedOrder.subtotal}</span></div>
                {completedOrder.discount > 0 && (
                  <div><span>Giảm giá ({completedOrder.couponCode}):</span> <span className="text-success">-${completedOrder.discount}</span></div>
                )}
                <div><span>Phí vận chuyển:</span> <span>${completedOrder.shippingFee === 0 ? 'Miễn phí' : '$10.00'}</span></div>
                <div className="grand-total-row"><span>Tổng cộng:</span> <strong>${completedOrder.grandTotal}</strong></div>
              </div>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/" className="btn btn-outline-secondary">
              Về trang chủ
            </Link>
            <Link to="/products" className="btn btn-primary">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="gp-cart-empty">
        <div className="empty-card">
          <h2>Không có sản phẩm để thanh toán</h2>
          <p>Giỏ hàng của bạn đang trống. Vui lòng chọn sản phẩm trước khi thanh toán.</p>
          <Link to="/products" className="btn btn-primary">
            Quay lại cửa hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="gp-checkout-page">
      <header className="gp-page-header">
        <div className="gp-page-header__content">
          <span className="eyebrow-pill">Xác nhận & Đặt hàng</span>
          <h1>Thanh Toán Đơn Hàng</h1>
        </div>
      </header>

      <div className="gp-checkout-grid">
        {/* Formik Checkout Form */}
        <div className="gp-checkout-form-panel">
          <Formik
            initialValues={initialFormValues}
            validationSchema={checkoutValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const orderData = {
                id: Math.floor(100000 + Math.random() * 900000),
                customer: values,
                items: [...items],
                subtotal,
                discount,
                couponCode: coupon?.code,
                shippingFee,
                grandTotal,
                createdAt: new Date().toISOString()
              };
              setCompletedOrder(orderData);
              clearCart();
              setSubmitting(false);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form noValidate className="gp-form">
                <div className="form-section-title">
                  <h5>1. Thông tin người nhận</h5>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="fullName">Họ và tên *</label>
                  <Field
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className={`form-control ${touched.fullName && errors.fullName ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="fullName" component="div" className="field-error" />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6 form-group">
                    <label htmlFor="email">Địa chỉ Email *</label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@domain.com"
                      className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="email" component="div" className="field-error" />
                  </div>

                  <div className="col-md-6 form-group">
                    <label htmlFor="phone">Số điện thoại *</label>
                    <Field
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="0912345678"
                      className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="phone" component="div" className="field-error" />
                  </div>
                </div>

                <div className="form-section-title mt-4">
                  <h5>2. Địa chỉ giao nhận</h5>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="address">Địa chỉ giao hàng chi tiết *</label>
                  <Field
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Số nhà, tên đường, phường / xã"
                    className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="address" component="div" className="field-error" />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="city">Tỉnh / Thành phố *</label>
                  <Field
                    as="select"
                    id="city"
                    name="city"
                    className={`form-select ${touched.city && errors.city ? 'is-invalid' : ''}`}
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Khác">Tỉnh thành khác</option>
                  </Field>
                  <ErrorMessage name="city" component="div" className="field-error" />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="notes">Ghi chú giao hàng (Tùy chọn)</label>
                  <Field
                    as="textarea"
                    id="notes"
                    name="notes"
                    rows={2}
                    placeholder="Giao giờ hành chính, gọi trước khi đến..."
                    className="form-control"
                  />
                </div>

                <div className="form-section-title mt-4">
                  <h5>3. Phương thức thanh toán</h5>
                </div>

                <div className="payment-options mb-3" role="radiogroup" aria-label="Phương thức thanh toán">
                  <label className="payment-radio-label">
                    <Field type="radio" name="paymentMethod" value="cod" />
                    <div>
                      <strong>Thanh toán khi nhận hàng (COD)</strong>
                      <p>Nhận hàng, kiểm tra gear và thanh toán tiền mặt trực tiếp cho bưu tá.</p>
                    </div>
                  </label>

                  <label className="payment-radio-label">
                    <Field type="radio" name="paymentMethod" value="bank" />
                    <div>
                      <strong>Chuyển khoản ngân hàng (QR Code 24/7)</strong>
                      <p>Quét mã QR VietQR tự động xác nhận sau 30 giây.</p>
                    </div>
                  </label>
                </div>

                <div className="form-group mb-4">
                  <label className="checkbox-label" htmlFor="agreeToTerms">
                    <Field type="checkbox" id="agreeToTerms" name="agreeToTerms" />
                    <span>Tôi đồng ý với điều khoản mua hàng và chính sách bảo hành của GearPulse *</span>
                  </label>
                  <ErrorMessage name="agreeToTerms" component="div" className="field-error" />
                </div>

                <Button
                  type="submit"
                  variant="dark"
                  size="lg"
                  className="w-100 btn-submit-order"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang xử lý đơn hàng...' : `Đặt hàng ngay ($${grandTotal})`}
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Mini Order Summary */}
        <div className="gp-checkout-sidebar">
          <div className="summary-card">
            <h4>Đơn hàng ({totalItems} món)</h4>
            <div className="checkout-mini-list">
              {items.map((item) => (
                <div key={item.id} className="mini-item-row">
                  <img src={item.image} alt={item.name} />
                  <div className="mini-item-info">
                    <span className="mini-item-name">{item.name}</span>
                    <span className="mini-item-qty">Số lượng: {item.quantity}</span>
                  </div>
                  <strong className="mini-item-price">
                    ${Math.round(item.price * item.quantity * 100) / 100}
                  </strong>
                </div>
              ))}
            </div>

            <hr />

            <div className="summary-row">
              <span>Tạm tính</span>
              <span>${subtotal}</span>
            </div>

            {discount > 0 && (
              <div className="summary-row discount-row">
                <span>Khuyến mãi ({coupon.code})</span>
                <span className="text-success">-${discount}</span>
              </div>
            )}

            <div className="summary-row">
              <span>Phí vận chuyển</span>
              <span>{shippingFee === 0 ? 'Miễn phí' : '$10.00'}</span>
            </div>

            <hr />

            <div className="summary-row summary-total">
              <span>Tổng thanh toán</span>
              <span className="total-amount">${grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
