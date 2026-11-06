import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import QuickViewModal from '../components/QuickViewModal';
import useCart from '../hooks/useCart';

export default function HomePage({ products = [], loading = false }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addItem } = useCart();

  const hotProducts = products.filter((p) => p.isHot).slice(0, 4);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="gp-home-page">
      {/* Hero Section */}
      <section className="gp-hero">
        <div className="gp-hero__content">
          <span className="eyebrow-pill">⚡ Trải nghiệm Gaming đỉnh cao</span>
          <h1 className="gp-hero__title">
            Nâng tầm góc máy <br />
            với <span className="text-gradient">GearPulse Pro</span>.
          </h1>
          <p className="gp-hero__lead">
            Bàn phím cơ Rapid Trigger, chuột gaming 4000Hz siêu nhẹ, tai nghe Spatial Sound và màn hình 240Hz Fast-IPS.
            Thiết kế tối giản, công nghệ vượt bậc.
          </p>
          <div className="gp-hero__cta-row">
            <Link to="/products" className="btn btn-primary gp-hero-btn">
              Khám phá toàn bộ Catalog &rarr;
            </Link>
            <Link to="/products?category=Keyboard" className="btn btn-outline-secondary gp-hero-btn">
              Bàn phím cơ Hot
            </Link>
          </div>
        </div>

        <div className="gp-hero__banner-card">
          <div className="hero-feature-pill">🔥 Trending Pick</div>
          <div className="hero-badge-title">CyberBlade 75% Pro</div>
          <p className="hero-badge-sub">Gateron Pro Yellow pre-lubed · Tri-mode Wireless 4000mAh</p>
          <div className="hero-specs-grid">
            <div>
              <span>Layout</span>
              <strong>75% CNC</strong>
            </div>
            <div>
              <span>Polling</span>
              <strong>1000Hz</strong>
            </div>
            <div>
              <span>Pin</span>
              <strong>200h</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Spotlight */}
      <section className="gp-categories-section">
        <div className="section-header">
          <span className="eyebrow-text">Danh mục thiết bị</span>
          <h2>Chọn đồ chơi theo sở thích của bạn</h2>
        </div>
        <div className="category-cards-grid">
          <Link to="/products?category=Keyboard" className="category-card">
            <span className="category-icon">⌨️</span>
            <h3>Bàn phím cơ</h3>
            <p>Layout 60%, 75%, Hall Effect Rapid Trigger</p>
          </Link>
          <Link to="/products?category=Mouse" className="category-card">
            <span className="category-icon">🖱️</span>
            <h3>Chuột Gaming</h3>
            <p>PAW3395 26.000 DPI, siêu nhẹ 49g, 4K Dongle</p>
          </Link>
          <Link to="/products?category=Headset" className="category-card">
            <span className="category-icon">🎧</span>
            <h3>Tai nghe</h3>
            <p>Planar Magnetic, Spatial Audio 7.1 vòm</p>
          </Link>
          <Link to="/products?category=Monitor" className="category-card">
            <span className="category-icon">🖥️</span>
            <h3>Màn hình eSports</h3>
            <p>Fast-IPS 240Hz, WQHD 2K, Ultrawide 1500R</p>
          </Link>
        </div>
      </section>

      {/* Hot Products section */}
      <section className="gp-section">
        <div className="section-header-split">
          <div>
            <span className="eyebrow-text">Bán chạy nhất</span>
            <h2>Sản phẩm nổi bật (Hot Picks)</h2>
          </div>
          <Link to="/products" className="btn btn-outline-secondary btn-sm">
            Xem tất cả &rarr;
          </Link>
        </div>

        <ProductGrid
          products={hotProducts.length > 0 ? hotProducts : products.slice(0, 4)}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p, qty) => addItem(p, qty)}
        />
      </section>

      {/* New Arrivals section */}
      <section className="gp-section gp-section--alt">
        <div className="section-header-split">
          <div>
            <span className="eyebrow-text">Vừa cập bến</span>
            <h2>Thiết bị công nghệ mới ra mắt</h2>
          </div>
          <Link to="/products" className="btn btn-outline-secondary btn-sm">
            Xem catalog &rarr;
          </Link>
        </div>

        <ProductGrid
          products={newProducts.length > 0 ? newProducts : products.slice(4, 8)}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p, qty) => addItem(p, qty)}
        />
      </section>

      {/* Features Banner */}
      <section className="gp-trust-banner">
        <div className="trust-card">
          <span className="trust-icon">🚀</span>
          <h4>Giao nhanh hỏa tốc</h4>
          <p>Nhận hàng trong 2 giờ nội thành, freeship đơn từ $100</p>
        </div>
        <div className="trust-card">
          <span className="trust-icon">🛡️</span>
          <h4>Bảo hành chính hãng 24T</h4>
          <p>1 đổi 1 trong 30 ngày đầu nếu phát sinh lỗi phần cứng</p>
        </div>
        <div className="trust-card">
          <span className="trust-icon">🔧</span>
          <h4>Hỗ trợ mod phím & lube switch</h4>
          <p>Kỹ thuật viên tư vấn build phím cơ theo sở thích âm thanh</p>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        show={Boolean(quickViewProduct)}
        onHide={() => setQuickViewProduct(null)}
        onAddToCart={(p, qty) => addItem(p, qty)}
      />
    </div>
  );
}
