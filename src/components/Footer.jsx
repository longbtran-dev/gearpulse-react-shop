import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="gp-footer">
      <div className="gp-footer__container">
        <div className="gp-footer__brand-col">
          <div className="brand-logo">
            <span className="brand-dot">◆</span> GearPulse
          </div>
          <p className="brand-desc">
            Cửa hàng gaming gear & phụ kiện bàn làm việc cao cấp. Dự án tổng hợp 6 bài thực hành FER202:
            Components, useState, Context/Effects, useReducer Cart, React Router v7, Formik & Yup, Fetch API RESTful CRUD.
          </p>
          <p className="copyright">&copy; {new Date().getFullYear()} GearPulse. All rights reserved.</p>
        </div>

        <div className="gp-footer__links-col">
          <h6>Danh mục nhanh</h6>
          <ul>
            <li><Link to="/products?category=Keyboard">Bàn phím cơ</Link></li>
            <li><Link to="/products?category=Mouse">Chuột Gaming</Link></li>
            <li><Link to="/products?category=Headset">Tai nghe Audiophile</Link></li>
            <li><Link to="/products?category=Monitor">Màn hình eSports</Link></li>
            <li><Link to="/products?category=Desk+Gear">Phụ kiện bàn làm việc</Link></li>
          </ul>
        </div>

        <div className="gp-footer__links-col">
          <h6>Điều hướng</h6>
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/products">Tất cả sản phẩm</Link></li>
            <li><Link to="/cart">Giỏ hàng</Link></li>
            <li><Link to="/checkout">Thanh toán</Link></li>
            <li><Link to="/contact">Hỗ trợ & Liên hệ</Link></li>
            <li><Link to="/admin">Trang quản trị Admin</Link></li>
          </ul>
        </div>

        <div className="gp-footer__info-col">
          <h6>Thông tin cửa hàng</h6>
          <p>📍 Showroom: Khu Công Nghệ Cao Hòa Lạc, Hà Nội</p>
          <p>📞 Hotline: 1900 6868 (08:30 - 21:00)</p>
          <p>✉️ Email: contact@gearpulse.io</p>
          <div className="badges-row">
            <span className="badge-secure">🛡️ Bảo hành chính hãng</span>
            <span className="badge-secure">⚡ Giao hàng 2h</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
