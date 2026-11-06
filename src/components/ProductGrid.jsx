import ProductCard from './ProductCard';

export default function ProductGrid({ products, onQuickView, onAddToCart, emptyMessage }) {
  if (!products || products.length === 0) {
    return (
      <div className="gp-empty-state" role="status">
        <p>{emptyMessage || 'Không tìm thấy sản phẩm nào phù hợp.'}</p>
      </div>
    );
  }

  return (
    <div className="gp-product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
