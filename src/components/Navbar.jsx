import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';

export default function Navbar() {
  // Lab 3: Auth Context & Theme
  const { user, isAdmin, loginCustomer, loginAdmin, logout, theme, toggleTheme } = useAuth();
  // Lab 4: Cart Context
  const { totalItems } = useCart();

  return (
    <header className="gp-navbar">
      <div className="gp-navbar__container">
        {/* Lab 1 & 5: Brand Link */}
        <NavLink to="/" className="gp-navbar__brand">
          <span className="brand-dot" aria-hidden="true">◆</span>
          <span className="brand-title">GearPulse</span>
          <span className="brand-badge">PRO</span>
        </NavLink>

        {/* Lab 5: Main Navigation Links */}
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
            Quản trị {isAdmin && <span className="admin-status-dot" aria-label="Admin logged in">●</span>}
          </NavLink>
        </nav>

        {/* Controls: Cart, Theme Toggle & User Auth */}
        <div className="gp-navbar__actions">
          {/* Lab 5: NavLink to Cart Page */}
          <NavLink
            to="/cart"
            className="gp-cart-pill"
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <span className="cart-icon" aria-hidden="true">🛒</span>
            <span className="cart-count">{totalItems}</span>
          </NavLink>

          {/* Lab 3: Theme Toggle */}
          <Button
            variant="outline-secondary"
            size="sm"
            className="gp-theme-toggle"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </Button>

          {/* Lab 3: Role-based Auth Controls */}
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
  );
}
