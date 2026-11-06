import { ErrorMessage, Field, Form, Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  ADMIN_CATEGORIES,
  getProductInitialValues,
  productValidationSchema
} from '../validation/productSchema';

export default function ProductFormModal({
  show,
  editingProduct,
  onHide,
  onSubmitProduct,
  apiError
}) {
  const isEditing = Boolean(editingProduct);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="gp-modal">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? `Chỉnh sửa: ${editingProduct.name}` : 'Thêm sản phẩm mới'}</Modal.Title>
      </Modal.Header>

      <Formik
        enableReinitialize
        initialValues={getProductInitialValues(editingProduct)}
        validationSchema={productValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await onSubmitProduct(values);
            onHide();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form noValidate>
            <Modal.Body className="gp-form">
              {apiError && (
                <div className="alert alert-danger mb-3" role="alert">
                  {apiError}
                </div>
              )}

              <div className="form-group mb-3">
                <label htmlFor="prod-name">Tên sản phẩm *</label>
                <Field
                  id="prod-name"
                  name="name"
                  type="text"
                  placeholder="CyberBlade Pro 75% Mechanical Keyboard"
                  className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="name" component="div" className="field-error" />
              </div>

              <div className="row mb-3">
                <div className="col-md-6 form-group">
                  <label htmlFor="prod-category">Danh mục *</label>
                  <Field
                    as="select"
                    id="prod-category"
                    name="category"
                    className={`form-select ${touched.category && errors.category ? 'is-invalid' : ''}`}
                  >
                    {ADMIN_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="div" className="field-error" />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="prod-brand">Hãng sản xuất *</label>
                  <Field
                    id="prod-brand"
                    name="brand"
                    type="text"
                    placeholder="VortexTech"
                    className={`form-control ${touched.brand && errors.brand ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="brand" component="div" className="field-error" />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4 form-group">
                  <label htmlFor="prod-price">Giá bán ($) *</label>
                  <Field
                    id="prod-price"
                    name="price"
                    type="number"
                    min="1"
                    placeholder="189"
                    className={`form-control ${touched.price && errors.price ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="price" component="div" className="field-error" />
                </div>

                <div className="col-md-4 form-group">
                  <label htmlFor="prod-orig-price">Giá gốc ($)</label>
                  <Field
                    id="prod-orig-price"
                    name="originalPrice"
                    type="number"
                    min="0"
                    placeholder="219"
                    className={`form-control ${touched.originalPrice && errors.originalPrice ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="originalPrice" component="div" className="field-error" />
                </div>

                <div className="col-md-4 form-group">
                  <label htmlFor="prod-stock">Số lượng tồn kho *</label>
                  <Field
                    id="prod-stock"
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="25"
                    className={`form-control ${touched.stock && errors.stock ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="stock" component="div" className="field-error" />
                </div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="prod-image">Đường dẫn ảnh (URL hoặc để trống dùng mẫu tự động)</label>
                <Field
                  id="prod-image"
                  name="image"
                  type="text"
                  placeholder="https://example.com/gear.png"
                  className="form-control"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="prod-description">Mô tả sản phẩm *</label>
                <Field
                  as="textarea"
                  id="prod-description"
                  name="description"
                  rows={3}
                  placeholder="Mô tả các đặc điểm kỹ thuật nổi bật của thiết bị..."
                  className={`form-control ${touched.description && errors.description ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="description" component="div" className="field-error" />
              </div>

              <div className="row mb-2">
                <div className="col-md-4">
                  <label className="checkbox-label" htmlFor="prod-hot">
                    <Field type="checkbox" id="prod-hot" name="isHot" />
                    <span>Sản phẩm HOT</span>
                  </label>
                </div>
                <div className="col-md-4">
                  <label className="checkbox-label" htmlFor="prod-new">
                    <Field type="checkbox" id="prod-new" name="isNew" />
                    <span>Sản phẩm MỚI</span>
                  </label>
                </div>
                <div className="col-md-4">
                  <label className="checkbox-label" htmlFor="prod-instock">
                    <Field type="checkbox" id="prod-instock" name="inStock" />
                    <span>Còn hàng trong kho</span>
                  </label>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="outline-secondary" onClick={onHide} disabled={isSubmitting}>
                Hủy bỏ
              </Button>
              <Button variant="dark" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang lưu...' : isEditing ? 'Cập nhật sản phẩm' : 'Lưu sản phẩm'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
