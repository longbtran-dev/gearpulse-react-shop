import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';

export default function WishlistDrawer({ show, onHide }) {
  const { wishlist, toggleWishlist, totalWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (product) => {
    addItem(product, 1);
    toggleWishlist(product);
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="gp-cart-drawer">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <span>Danh Sách Yêu Thích ❤️</span>
          <span className="drawer-count-badge">({totalWishlist} món)</span>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="gp-cart-drawer__body">
        {wishlist.length === 0 ? (
          <div className="drawer-empty-state">
            <span className="drawer-empty-icon" aria-hidden="true">🤍</span>
            <h5>Chưa có sản phẩm yêu thích</h5>
            <p>Bấm biểu tượng trái tim trên các sản phẩm bạn quan tâm để lưu lại tại đây.</p>
            <Link to="/products" className="btn btn-primary btn-sm" onClick={onHide}>
              Khám phá sản phẩm ngay &rarr;
            </Link>
          </div>
        ) : (
          <div className="drawer-items-list">
            {wishlist.map((item) => (
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
                  <div className="mt-2">
                    <Button
                      variant="dark"
                      size="sm"
                      className="py-1 px-2 text-nowrap"
                      disabled={!item.inStock}
                      onClick={() => handleMoveToCart(item)}
                    >
                      {item.inStock ? '+ Thêm vào giỏ' : 'Hết hàng'}
                    </Button>
                  </div>
                </div>

                <button
                  type="button"
                  className="drawer-remove-btn"
                  aria-label={`Bỏ yêu thích ${item.name}`}
                  onClick={() => toggleWishlist(item)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </Offcanvas.Body>

      {wishlist.length > 0 && (
        <div className="gp-cart-drawer__footer">
          <Button variant="outline-danger" size="sm" className="w-100" onClick={clearWishlist}>
            Xóa danh sách yêu thích
          </Button>
        </div>
      )}
    </Offcanvas>
  );
}
