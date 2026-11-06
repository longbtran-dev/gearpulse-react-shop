import { useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { PRODUCT_BRANDS, PRODUCT_CATEGORIES } from '../data/initialProducts';
import useCart from '../hooks/useCart';

export default function ProductsPage({ products = [], loading = false, error = null, onRetry }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'All';
  const urlSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(600);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
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

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedBrands([]);
    setMaxPrice(600);
    setInStockOnly(false);
    setMinRating(0);
    searchParams.delete('category');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  // Filter pipeline
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }
      // Search query filter
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand && product.brand.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        const matchDesc = product.description && product.description.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchCat && !matchDesc) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, selectedBrands, maxPrice, inStockOnly, minRating, searchQuery]);

  // Sort pipeline
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') return list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating-desc') return list.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'name-asc') return list.sort((a, b) => a.name.localeCompare(b.name));
    return list; // featured default
  }, [filteredProducts, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedBrands.length > 0 ||
    maxPrice < 600 ||
    inStockOnly ||
    minRating > 0 ||
    searchQuery.trim().length > 0;

  return (
    <div className="gp-products-page">
      {/* Page Header */}
      <header className="gp-page-header">
        <div className="gp-page-header__content">
          <span className="eyebrow-pill">Kho Gaming Gear & Tech Studio</span>
          <h1>Bộ Sưu Tập Thiết Bị Chuyên Nghiệp</h1>
          <p>
            Trải nghiệm các dòng bàn phím cơ, chuột thi đấu, tai nghe âm học và phụ kiện bàn làm việc đỉnh cao từ các thương hiệu hàng đầu thế giới.
          </p>
        </div>
      </header>

      {/* Main Two-Column Layout: Sidebar Filters + Products Grid */}
      <div className="gp-catalog-layout">
        {/* Left Sidebar Filter */}
        <aside className="gp-filter-sidebar" aria-label="Bộ lọc sản phẩm">
          <div className="sidebar-header">
            <h4>Bộ Lọc Tìm Kiếm</h4>
            {hasActiveFilters && (
              <button type="button" className="btn-clear-filters" onClick={handleClearFilters}>
                Đặt lại
              </button>
            )}
          </div>

          {/* Search box inside sidebar */}
          <div className="filter-group">
            <label htmlFor="sidebar-search">Từ khóa tìm kiếm:</label>
            <input
              id="sidebar-search"
              type="search"
              role="searchbox"
              aria-label="Tìm kiếm sản phẩm"
              placeholder="Gõ tên, loại gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control form-control-sm"
            />
          </div>

          {/* Categories list */}
          <div className="filter-group">
            <label>Danh mục thiết bị:</label>
            <div className="category-sidebar-pills">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="filter-group">
            <label>Hãng sản xuất:</label>
            <div className="filter-checkbox-list">
              {PRODUCT_BRANDS.map((brand) => (
                <label key={brand} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="filter-group">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label htmlFor="price-range" className="mb-0">Mức giá tối đa:</label>
              <strong className="text-primary">${maxPrice}</strong>
            </div>
            <input
              id="price-range"
              type="range"
              min="20"
              max="600"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="form-range"
            />
            <div className="d-flex justify-content-between text-muted small">
              <span>$20</span>
              <span>$600+</span>
            </div>
          </div>

          {/* Stock only toggle */}
          <div className="filter-group">
            <label className="filter-toggle-label">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span>Chỉ hiển thị hàng có sẵn</span>
            </label>
          </div>

          {/* Rating filter */}
          <div className="filter-group">
            <label htmlFor="rating-select">Đánh giá tối thiểu:</label>
            <select
              id="rating-select"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="form-select form-select-sm"
            >
              <option value="0">Tất cả đánh giá</option>
              <option value="4">Từ 4 sao trở lên (★ 4.0+)</option>
              <option value="5">Chỉ 5 sao xuất sắc (★ 5.0)</option>
            </select>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="gp-catalog-content">
          {/* Top Controls Bar */}
          <div className="gp-catalog-topbar">
            <div className="catalog-count">
              Tìm thấy <strong>{sortedProducts.length}</strong> sản phẩm phù hợp
            </div>

            <div className="catalog-controls-right">
              {/* Sort by dropdown */}
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="catalog-sort" className="text-nowrap small text-muted">Sắp xếp:</label>
                <select
                  id="catalog-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select form-select-sm sort-select"
                >
                  <option value="featured">Nổi bật nhất</option>
                  <option value="price-asc">Giá: Thấp &rarr; Cao</option>
                  <option value="price-desc">Giá: Cao &rarr; Thấp</option>
                  <option value="rating-desc">Đánh giá cao nhất</option>
                  <option value="name-asc">Tên: A &rarr; Z</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="view-mode-toggle" role="group" aria-label="Chế độ hiển thị">
                <button
                  type="button"
                  className={`btn-view ${viewMode === 'grid' ? 'active' : ''}`}
                  aria-label="Grid view"
                  onClick={() => setViewMode('grid')}
                >
                  ⊞
                </button>
                <button
                  type="button"
                  className={`btn-view ${viewMode === 'list' ? 'active' : ''}`}
                  aria-label="List view"
                  onClick={() => setViewMode('list')}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="active-filters-row">
              {selectedCategory !== 'All' && (
                <span className="active-badge">
                  Danh mục: {selectedCategory}
                  <button type="button" onClick={() => handleCategoryChange('All')}>&times;</button>
                </span>
              )}
              {selectedBrands.map((b) => (
                <span key={b} className="active-badge">
                  Hãng: {b}
                  <button type="button" onClick={() => handleBrandToggle(b)}>&times;</button>
                </span>
              ))}
              {maxPrice < 600 && (
                <span className="active-badge">
                  Dưới ${maxPrice}
                  <button type="button" onClick={() => setMaxPrice(600)}>&times;</button>
                </span>
              )}
              {inStockOnly && (
                <span className="active-badge">
                  Còn hàng
                  <button type="button" onClick={() => setInStockOnly(false)}>&times;</button>
                </span>
              )}
              {minRating > 0 && (
                <span className="active-badge">
                  ★ {minRating}+ sao
                  <button type="button" onClick={() => setMinRating(0)}>&times;</button>
                </span>
              )}
              {searchQuery && (
                <span className="active-badge">
                  "{searchQuery}"
                  <button type="button" onClick={() => setSearchQuery('')}>&times;</button>
                </span>
              )}
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="gp-status-alert my-4" role="status">
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
              <span>Đang tải danh sách thiết bị từ server API...</span>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="gp-error-alert my-4" role="alert">
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

          {/* Products List or Grid */}
          {!loading && !error && (
            <>
              {sortedProducts.length === 0 ? (
                <div className="gp-empty-state my-4" role="status">
                  <span className="empty-icon">🔍</span>
                  <h4>Không tìm thấy sản phẩm phù hợp</h4>
                  <p>Hãy thử giảm bớt các tiêu chí lọc hoặc tìm kiếm bằng từ khóa khác.</p>
                  <Button variant="outline-primary" size="sm" onClick={handleClearFilters}>
                    Xóa tất cả bộ lọc
                  </Button>
                </div>
              ) : (
                <div className={`gp-product-grid ${viewMode === 'list' ? 'gp-product-grid--list' : ''}`}>
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setQuickViewProduct(p)}
                      onAddToCart={(p, qty) => addItem(p, qty)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        show={Boolean(quickViewProduct)}
        onHide={() => setQuickViewProduct(null)}
        onAddToCart={(p, qty) => addItem(p, qty)}
      />
    </div>
  );
}
