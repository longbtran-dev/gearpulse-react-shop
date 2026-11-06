import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import { fetchProductById } from '../services/productApi';

const placeholder = `${import.meta.env.BASE_URL || '/'}product-placeholder.svg`;

const reviewSchema = Yup.object().shape({
  author: Yup.string()
    .trim()
    .min(2, 'Tên người đánh giá tối thiểu 2 ký tự')
    .max(40, 'Tên tối đa 40 ký tự')
    .required('Vui lòng nhập họ và tên của bạn'),
  rating: Yup.number()
    .min(1, 'Đánh giá tối thiểu 1 sao')
    .max(5, 'Đánh giá tối đa 5 sao')
    .required('Vui lòng chọn số sao đánh giá'),
  comment: Yup.string()
    .trim()
    .min(8, 'Nhận xét phải có ít nhất 8 ký tự')
    .max(500, 'Nhận xét tối đa 500 ký tự')
    .required('Vui lòng nhập nội dung đánh giá của bạn')
});

export default function ProductDetailPage({ products = [] }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [selectedSwitch, setSelectedSwitch] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [reviewsList, setReviewsList] = useState([]);
  const [reviewNotice, setReviewNotice] = useState(false);

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const initProduct = (prod) => {
      setProduct(prod);
      setActiveImage(prod.image);
      setReviewsList(prod.reviews || []);
      if (prod.variants?.switches?.length) {
        setSelectedSwitch(prod.variants.switches[0]);
      }
      if (prod.variants?.colors?.length) {
        setSelectedColor(prod.variants.colors[0]);
      }
      setLoading(false);
    };

    const cached = products.find((p) => String(p.id) === String(id));
    if (cached) {
      initProduct(cached);
      return;
    }

    fetchProductById(id)
      .then((data) => {
        if (isMounted) {
          initProduct(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Không tìm thấy thông tin sản phẩm.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, products]);

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = placeholder;
  }

  const handleAddToCart = () => {
    if (product) {
      // Pass variant attributes along with item
      const itemToAdd = {
        ...product,
        selectedSwitch: selectedSwitch || undefined,
        selectedColor: selectedColor || undefined
      };
      addItem(itemToAdd, quantity);
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 3000);
    }
  };

  const handleAddReview = (values, { resetForm }) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      author: values.author,
      rating: Number(values.rating),
      date: 'Vừa xong',
      comment: values.comment
    };
    setReviewsList((prev) => [newRev, ...prev]);
    resetForm();
    setReviewNotice(true);
    setTimeout(() => setReviewNotice(false), 4000);
  };

  if (loading) {
    return (
      <div className="gp-status-alert my-5" role="status">
        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
        <span>Đang tải thông số kỹ thuật sản phẩm #{id}...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="gp-error-box my-5" role="alert">
        <h2>Không tìm thấy sản phẩm</h2>
        <p>{error || 'Sản phẩm này có thể đã ngừng kinh doanh hoặc đường dẫn không hợp lệ.'}</p>
        <Link to="/products" className="btn btn-primary">
          &larr; Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const isFavorite = isInWishlist(product.id);
  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  // Related products from the same category or brand
  const relatedProducts = products
    .filter((p) => String(p.id) !== String(product.id) && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  // Review statistics calculation
  const totalReviews = reviewsList.length;
  const averageRating = totalReviews > 0
    ? (reviewsList.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : product.rating || '5.0';

  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviewsList.forEach((r) => {
    if (ratingCounts[r.rating] !== undefined) ratingCounts[r.rating]++;
  });

  return (
    <div className="gp-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="gp-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span className="active">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="gp-detail-grid">
        {/* Gallery Column */}
        <div className="gp-detail-media">
          <div className="main-image-wrap">
            <img
              src={activeImage || product.image}
              alt={product.name}
              onError={handleImageError}
              className="detail-hero-img"
            />
            <div className="media-badges">
              {product.isHot && <span className="badge-pill badge-pill--hot">HOT</span>}
              {product.isNew && <span className="badge-pill badge-pill--new">NEW</span>}
              {hasDiscount && (
                <span className="badge-pill badge-pill--sale">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Favorite button on media */}
            <button
              type="button"
              className={`detail-wishlist-toggle ${isFavorite ? 'active' : ''}`}
              aria-label={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
              onClick={() => toggleWishlist(product)}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Interactive Thumbnails Gallery */}
          {galleryImages.length > 1 && (
            <div className="detail-thumbnail-row" aria-label="Product image gallery thumbnails">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`detail-thumb-btn ${activeImage === imgUrl ? 'active' : ''}`}
                  onClick={() => setActiveImage(imgUrl)}
                >
                  <img src={imgUrl} alt={`${product.name} góc nhìn ${idx + 1}`} onError={handleImageError} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Controls Column */}
        <div className="gp-detail-info">
          <div className="detail-tags">
            <span className="badge-category">{product.category}</span>
            <span className="badge-brand">Hãng: {product.brand || 'GearPulse'}</span>
            <span className="badge-rating">★ {averageRating} ({product.reviewsCount || totalReviews || 12} đánh giá)</span>
            <span className="badge-sales">Đã bán {product.salesCount || 150}+</span>
          </div>

          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-pricing">
            <span className="price-big">${product.price}</span>
            {hasDiscount && <span className="price-struck">${product.originalPrice}</span>}
            <span className={`stock-pill ${product.inStock ? 'in' : 'out'}`}>
              {product.inStock ? `Còn hàng (${product.stock || 20} chiếc)` : 'Tạm hết hàng'}
            </span>
          </div>

          <p className="detail-description">{product.description}</p>

          {/* Variant Selector: Switches */}
          {product.variants?.switches && product.variants.switches.length > 0 && (
            <div className="detail-variant-group">
              <label className="variant-label">
                Tùy chọn Switch: <strong>{selectedSwitch}</strong>
              </label>
              <div className="variant-options">
                {product.variants.switches.map((sw) => (
                  <button
                    key={sw}
                    type="button"
                    className={`variant-pill-btn ${selectedSwitch === sw ? 'active' : ''}`}
                    onClick={() => setSelectedSwitch(sw)}
                  >
                    {sw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variant Selector: Colors */}
          {product.variants?.colors && product.variants.colors.length > 0 && (
            <div className="detail-variant-group">
              <label className="variant-label">
                Màu sắc: <strong>{selectedColor}</strong>
              </label>
              <div className="variant-options">
                {product.variants.colors.map((col) => (
                  <button
                    key={col}
                    type="button"
                    className={`variant-pill-btn ${selectedColor === col ? 'active' : ''}`}
                    onClick={() => setSelectedColor(col)}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity picker & Add to cart */}
          {product.inStock ? (
            <div className="detail-purchase-row">
              <div className="qty-picker">
                <button
                  type="button"
                  aria-label="Giảm số lượng"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  aria-label="Số lượng đặt mua"
                  min="1"
                  max={product.stock || 99}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                />
                <button
                  type="button"
                  aria-label="Tăng số lượng"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <Button
                variant="dark"
                size="lg"
                className="gp-btn-add-cart"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng (${product.price * quantity})
              </Button>

              <Button
                variant={isFavorite ? 'danger' : 'outline-secondary'}
                size="lg"
                className="gp-btn-wishlist-action"
                title={isFavorite ? 'Bỏ khỏi yêu thích' : 'Lưu vào yêu thích'}
                onClick={() => toggleWishlist(product)}
              >
                {isFavorite ? '❤️ Đã thích' : '🤍 Yêu thích'}
              </Button>
            </div>
          ) : (
            <div className="alert alert-secondary my-3">
              Sản phẩm hiện đang tạm hết hàng. Quý khách vui lòng liên hệ hotline <strong>1900 6868</strong> để đặt trước lô hàng mới.
            </div>
          )}

          {addedNotice && (
            <div className="gp-added-toast" role="status">
              ✓ Đã thêm <strong>{quantity}x {product.name}</strong> vào giỏ hàng thành công!
              <Link to="/cart" className="ms-2 text-white text-decoration-underline">
                Xem giỏ hàng
              </Link>
            </div>
          )}

          {/* Technical Specs Table */}
          {product.specs && (
            <div className="detail-specs-card">
              <h5>Bảng thông số kỹ thuật chi tiết:</h5>
              <table className="table table-sm specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <th scope="row">{key}</th>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Commercial Trust & Perks */}
          <div className="detail-perks">
            <div>
              <span>⚡</span> <strong>Miễn phí giao hàng:</strong> Áp dụng cho đơn hàng toàn quốc từ $100.
            </div>
            <div>
              <span>🛡️</span> <strong>Bảo hành chính hãng 24 tháng:</strong> 1 đổi 1 trong 30 ngày nếu phát sinh lỗi kỹ thuật.
            </div>
            <div>
              <span>🔧</span> <strong>Hỗ trợ kỹ thuật trọn đời:</strong> Hướng dẫn mod phím, cân wire, cân chỉnh switch miễn phí.
            </div>
            <div>
              <span>🎁</span> <strong>Quà tặng kèm theo:</strong> Tặng bộ keycap puller thép & cọ phủi bụi chuyên dụng.
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews & Feedback Section */}
      <section className="detail-reviews-section mt-5" aria-labelledby="reviews-heading">
        <h3 id="reviews-heading" className="reviews-section-title">
          Đánh Giá Từ Cộng Đồng Gamer ({totalReviews})
        </h3>

        <div className="reviews-overview-grid">
          {/* Rating Summary Card */}
          <div className="rating-summary-card">
            <div className="overall-score">
              <span className="score-num">{averageRating}</span>
              <span className="score-max">/ 5.0</span>
            </div>
            <div className="score-stars">★★★★★</div>
            <p className="score-caption">Dựa trên {totalReviews} đánh giá thực tế từ khách mua hàng</p>

            <div className="rating-breakdown-bars">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star] || 0;
                const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={star} className="breakdown-bar-row">
                    <span className="star-label">{star} ★</span>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="count-label">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Write a Review Box (Formik + Yup) */}
          <div className="write-review-card">
            <h4>Viết nhận xét của bạn</h4>
            <p className="text-muted small">
              Chia sẻ trải nghiệm sử dụng thiết bị để giúp cộng đồng game thủ chọn được sản phẩm ưng ý nhất!
            </p>

            {reviewNotice && (
              <div className="alert alert-success py-2 small" role="status">
                ✓ Cảm ơn bạn! Đánh giá đã được ghi nhận và hiển thị ngay bên dưới.
              </div>
            )}

            <Formik
              initialValues={{ author: '', rating: 5, comment: '' }}
              validationSchema={reviewSchema}
              onSubmit={handleAddReview}
            >
              {({ isSubmitting }) => (
                <Form className="review-form">
                  <div className="mb-3">
                    <label htmlFor="review-author" className="form-label small fw-bold">
                      Họ và tên của bạn *
                    </label>
                    <Field
                      id="review-author"
                      name="author"
                      type="text"
                      placeholder="VD: Nguyễn Văn A"
                      className="form-control form-control-sm"
                    />
                    <ErrorMessage name="author" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="review-rating" className="form-label small fw-bold">
                      Điểm đánh giá *
                    </label>
                    <Field as="select" id="review-rating" name="rating" className="form-select form-select-sm">
                      <option value={5}>★★★★★ 5 sao (Cực kỳ xuất sắc)</option>
                      <option value={4}>★★★★☆ 4 sao (Rất hài lòng)</option>
                      <option value={3}>★★★☆☆ 3 sao (Bình thường / Tạm ổn)</option>
                      <option value={2}>★★☆☆☆ 2 sao (Chưa hài lòng)</option>
                      <option value={1}>★☆☆☆☆ 1 sao (Kém chất lượng)</option>
                    </Field>
                    <ErrorMessage name="rating" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="review-comment" className="form-label small fw-bold">
                      Nội dung nhận xét *
                    </label>
                    <Field
                      as="textarea"
                      id="review-comment"
                      name="comment"
                      rows={3}
                      placeholder="Cảm nhận về chất lượng build, độ trễ, âm thanh, hoàn thiện..."
                      className="form-control form-control-sm"
                    />
                    <ErrorMessage name="comment" component="div" className="text-danger small mt-1" />
                  </div>

                  <Button type="submit" variant="dark" size="sm" disabled={isSubmitting}>
                    Gửi đánh giá
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Existing Reviews List */}
        <div className="reviews-list-container mt-4">
          {reviewsList.length === 0 ? (
            <p className="text-muted">Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên trải nghiệm và để lại đánh giá!</p>
          ) : (
            <div className="reviews-cards-grid">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="customer-review-card">
                  <div className="review-card-header">
                    <div className="reviewer-avatar">
                      {rev.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="reviewer-meta">
                      <strong className="reviewer-name">{rev.author}</strong>
                      <span className="verified-badge">✓ Đã mua hàng tại GearPulse</span>
                      <span className="review-date">{rev.date}</span>
                    </div>
                    <div className="reviewer-stars">
                      {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                    </div>
                  </div>
                  <p className="review-text">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related / Recommended Gear */}
      {relatedProducts.length > 0 && (
        <section className="detail-related-section mt-5" aria-labelledby="related-heading">
          <div className="section-head mb-4">
            <h3 id="related-heading">Sản Phẩm Cùng Phân Khúc</h3>
            <p className="text-muted">Các thiết bị gaming được nhiều anh em game thủ lựa chọn kết hợp cùng</p>
          </div>

          <div className="row g-4">
            {relatedProducts.map((p) => (
              <div key={p.id} className="col-12 col-sm-6 col-lg-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
