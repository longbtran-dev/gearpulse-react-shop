import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';

export default function Navbar({ products = [] }) {
  const { user, isAdmin, loginCustomer, loginAdmin, logout, theme, toggleTheme } = useAuth();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const navigate = useNavigate();

  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showWishlistDrawer, setShowWishlistDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);

  // Search autocomplete
  const searchResults = searchQuery.trim()
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          (p.brand && p.brand.toLowerCase().includes(searchQuery.trim().toLowerCase()))
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSearchItem = (id) => {
    setShowSearchDropdown(false);
    setSearchQuery('');
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="gp-announcement-bar">
        <div className="announcement-content">
          <span>🔥 <strong>TUẦN LỄ GAMING GEAR:</strong> Nhập mã <code>PRO20</code> giảm ngay 20% cho đơn từ $150</span>
          <span className="announcement-divider">•</span>
          <span>⚡ Miễn phí vận chuyển toàn quốc cho đơn từ $100</span>
          <span className="announcement-divider">•</span>
          <span>📞 Hotline tư vấn: <strong>1900 6868</strong> (08:30 - 21:30)</span>
        </div>
      </div>

      <header className="gp-navbar">
        <div className="gp-navbar__container">
          {/* Brand */}
          <NavLink to="/" className="gp-navbar__brand">
            <span className="brand-dot" aria-hidden="true">◆</span>
            <span className="brand-title">GearPulse</span>
            <span className="brand-badge">STUDIO</span>
          </NavLink>

          {/* Navigation Links */}
          <nav className="gp-navbar__nav" aria-label="Main Navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `gp-nav-link ${isActive ? 'gp-nav-link--active' : ''}`}
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) => `gp-nav-link ${isActive ? 'gp-nav-link--active' : ''}`}
            >
              Cửa hàng
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => `gp-nav-link ${isActive ? 'gp-nav-link--active' : ''}`}
            >
              Liên hệ
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) => `gp-nav-link ${isActive ? 'gp-nav-link--active' : ''}`}
            >
              Admin CRUD {isAdmin && <span className="admin-status-dot" aria-label="Admin logged in">●</span>}
            </NavLink>
          </nav>

          {/* Quick Search Autocomplete */}
          <div className="gp-nav-search" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                type="search"
                placeholder="Tìm gear, switch, hãng..."
                value={searchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                className="nav-search-input"
              />
            </form>

            {showSearchDropdown && searchResults.length > 0 && (
              <div className="search-dropdown-results">
                <div className="search-results-header">Gợi ý sản phẩm ({searchResults.length})</div>
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="search-result-item"
                    onClick={() => handleSelectSearchItem(item.id)}
                  >
                    <img src={item.image} alt={item.name} />
                    <div className="search-result-info">
                      <span className="result-name">{item.name}</span>
                      <span className="result-cat">{item.category} · ${item.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons & Controls */}
          <div className="gp-navbar__actions">
            {/* Wishlist Pill */}
            <button
              type="button"
              className="gp-action-pill"
              aria-label={`Yêu thích (${totalWishlist} món)`}
              onClick={() => setShowWishlistDrawer(true)}
            >
              <span className="action-icon" aria-hidden="true">❤️</span>
              <span className="action-count">{totalWishlist}</span>
            </button>

            {/* Cart Pill */}
            <button
              type="button"
              className="gp-cart-pill"
              aria-label={`Shopping cart with ${totalItems} items`}
              onClick={() => setShowCartDrawer(true)}
            >
              <span className="cart-icon" aria-hidden="true">🛒</span>
              <span className="cart-count">{totalItems}</span>
            </button>

            {/* Theme switch */}
            <Button
              variant="outline-secondary"
              size="sm"
              className="gp-theme-toggle"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              onClick={toggleTheme}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </Button>

            {/* User Auth control */}
            {user ? (
              <div className="gp-user-dropdown">
                <span className="user-greeting">
                  Xin chào, <strong>{user.username}</strong>
                </span>
                <Button variant="outline-danger" size="sm" onClick={logout}>
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="gp-auth-btn-group">
                <Button variant="outline-secondary" size="sm" onClick={loginCustomer}>
                  Khách
                </Button>
                <Button variant="dark" size="sm" onClick={loginAdmin}>
                  Admin
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Slide-out Drawers */}
      <CartDrawer show={showCartDrawer} onHide={() => setShowCartDrawer(false)} />
      <WishlistDrawer show={showWishlistDrawer} onHide={() => setShowWishlistDrawer(false)} />
    </>
  );
}
