import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const placeholder = `${import.meta.env.BASE_URL || '/'}product-placeholder.svg`;

export default function ProductCard({ product, onQuickView, onAddToCart }) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = placeholder;
  }

  return (
    <article className="gp-product-card">
      <div className="gp-product-card__thumb-wrap">
        {/* Lab 5: Link to Detail */}
        <Link to={`/product/${product.id}`} className="gp-product-card__image-link">
          <img
            src={product.image}
            alt={product.name}
            onError={handleImageError}
            loading="lazy"
          />
        </Link>

        {/* Badges: Hot / New / Sale / Out of stock */}
        <div className="gp-product-card__badges">
          {product.isHot && <span className="badge-pill badge-pill--hot">HOT</span>}
          {product.isNew && <span className="badge-pill badge-pill--new">NEW</span>}
          {hasDiscount && <span className="badge-pill badge-pill--sale">-{discountPercent}%</span>}
          {!product.inStock && <span className="badge-pill badge-pill--out">Hết hàng</span>}
        </div>

        {/* Lab 2: Quick View Modal Trigger */}
        <button
          type="button"
          className="gp-product-card__quickview-btn"
          aria-label={`Quick view ${product.name}`}
          onClick={() => onQuickView && onQuickView(product)}
        >
          Quick View
        </button>
      </div>

      <div className="gp-product-card__body">
        <div className="gp-product-card__meta">
          <span className="gp-product-card__category">{product.category}</span>
          <span className="gp-product-card__rating" aria-label={`Rating ${product.rating} / 5`}>
            ★ {product.rating}.0
          </span>
        </div>

        <h3 className="gp-product-card__title">
          <Link to={`/product/${product.id}`} title={product.name}>
            {product.name}
          </Link>
        </h3>

        <div className="gp-product-card__pricing">
          <span className="current-price">${product.price}</span>
          {hasDiscount && <span className="original-price">${product.originalPrice}</span>}
        </div>

        <div className="gp-product-card__actions">
          {/* Lab 4: Add to cart trigger */}
          <Button
            variant="dark"
            size="sm"
            className="w-100 gp-btn-add"
            disabled={!product.inStock}
            onClick={() => onAddToCart && onAddToCart(product)}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </article>
  );
}
