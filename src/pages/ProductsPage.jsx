import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import QuickViewModal from '../components/QuickViewModal';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';
import useCart from '../hooks/useCart';

export default function ProductsPage({ products = [], loading = false, error = null, onRetry }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { addItem } = useCart();

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Lab 2: Derived state for filtering and sorting
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      (product.brand && product.brand.toLowerCase().includes(query)) ||
      product.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <div className="gp-products-page">
      <header className="gp-page-header">
        <div className="gp-page-header__content">
          <span className="eyebrow-pill">Kho Gaming Gear & Tech</span>
          <h1>Bộ Sưu Tập Sản Phẩm</h1>
          <p>
            Duyệt qua các thiết bị công nghệ chọn lọc. Lọc theo danh mục, mức giá và tìm kiếm sản phẩm bạn yêu thích.
          </p>
        </div>
      </header>

      {/* Lab 2: Filter Toolbar */}
      <section className="gp-toolbar" aria-label="Tìm kiếm và bộ lọc sản phẩm">
        <div className="gp-toolbar__search">
          <label htmlFor="shop-search-input" className="visually-hidden">
            Tìm kiếm sản phẩm
          </label>
          <input
            id="shop-search-input"
            type="search"
            role="searchbox"
            aria-label="Tìm kiếm sản phẩm"
            placeholder="Tìm theo tên sản phẩm, hãng, loại gear..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="gp-toolbar__sort">
          <label htmlFor="shop-sort-select">Sắp xếp:</label>
          <select
            id="shop-sort-select"
            aria-label="Sắp xếp sản phẩm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
          >
            <option value="featured">Nổi bật nhất</option>
            <option value="price-asc">Giá: Thấp &rarr; Cao</option>
            <option value="price-desc">Giá: Cao &rarr; Thấp</option>
            <option value="rating-desc">Đánh giá cao nhất</option>
          </select>
        </div>
      </section>

      {/* Category Pills */}
      <div className="gp-category-pills" role="group" aria-label="Lọc theo danh mục">
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-pill ${selectedCategory === cat ? 'category-pill--active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading state (Lab 6) */}
      {loading && (
        <div className="gp-status-alert" role="status">
          <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
          <span>Đang tải danh sách thiết bị từ server API...</span>
        </div>
      )}

      {/* Error state with retry (Lab 6) */}
      {!loading && error && (
        <div className="gp-error-alert" role="alert">
          <div>
            <h5>Không thể kết nối đến máy chủ</h5>
            <p>{error}</p>
          </div>
          {onRetry && (
            <Button variant="danger" size="sm" onClick={onRetry}>
              Thử lại
            </Button>
          )}
        </div>
      )}

      {/* Product Grid (Lab 1) */}
      {!loading && !error && (
        <>
          <div className="gp-result-count">
            Hiển thị <strong>{sortedProducts.length}</strong> sản phẩm
            {selectedCategory !== 'All' && ` trong mục "${selectedCategory}"`}
            {searchQuery && ` khớp với từ khóa "${searchQuery}"`}
          </div>

          <ProductGrid
            products={sortedProducts}
            onQuickView={(product) => setQuickViewProduct(product)}
            onAddToCart={(product, qty) => addItem(product, qty)}
            emptyMessage="Không có sản phẩm nào khớp với tìm kiếm của bạn. Hãy thử từ khóa khác!"
          />
        </>
      )}

      {/* Quick View Modal (Lab 2) */}
      <QuickViewModal
        product={quickViewProduct}
        show={Boolean(quickViewProduct)}
        onHide={() => setQuickViewProduct(null)}
        onAddToCart={(product, qty) => addItem(product, qty)}
      />
    </div>
  );
}
