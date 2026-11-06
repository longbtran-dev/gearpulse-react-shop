import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { contactInitialValues, contactValidationSchema } from '../validation/contactSchema';

export default function ContactPage() {
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <div className="gp-contact-page">
      <header className="gp-page-header">
        <div className="gp-page-header__content">
          <span className="eyebrow-pill">Hỗ Trợ & Liên Hệ</span>
          <h1>Trung Tâm Chăm Sóc Khách Hàng</h1>
          <p>
            Bạn cần tư vấn cấu hình phím cơ, chọn mắt đọc chuột phù hợp kích thước tay, hay khiếu nại bảo hành?
            Điền biểu mẫu bên dưới, chuyên viên GearPulse sẽ phản hồi trong 15 phút.
          </p>
        </div>
      </header>

      <div className="gp-contact-grid">
        <div className="gp-contact-info-panel">
          <h3>Thông tin liên hệ trực tiếp</h3>
          <p>Trải nghiệm thực tế các mẫu phím cơ gõ thử tại showroom GearPulse Studio.</p>

          <dl className="contact-meta-list">
            <div>
              <dt>📍 Địa chỉ Showroom</dt>
              <dd>Tòa nhà GearPulse Studio, Khu Công Nghệ Cao Hòa Lạc, Thạch Thất, Hà Nội</dd>
            </div>
            <div>
              <dt>📞 Tổng đài hỗ trợ kỹ thuật</dt>
              <dd>1900 6868 (Bấm phím 1 gặp CSKH, phím 2 gặp kỹ thuật lube phím)</dd>
            </div>
            <div>
              <dt>✉️ Hòm thư điện tử</dt>
              <dd>support@gearpulse.io (Phản hồi 24/7)</dd>
            </div>
            <div>
              <dt>⏰ Giờ mở cửa đón khách</dt>
              <dd>Thứ Hai – Chủ Nhật: 08:30 – 21:30</dd>
            </div>
          </dl>
        </div>

        <div className="gp-contact-form-panel">
          {submittedData && (
            <div className="gp-contact-success-banner" role="status" aria-label="Contact confirmation">
              <h4>✓ Tin nhắn đã được gửi thành công!</h4>
              <p>
                Cảm ơn bạn <strong>{submittedData.name}</strong> ({submittedData.email}). Chuyên viên kỹ thuật sẽ liên hệ lại qua SĐT <strong>{submittedData.phone}</strong> về chủ đề <strong>"{submittedData.topic}"</strong> trong thời gian sớm nhất.
              </p>
            </div>
          )}

          <Formik
            initialValues={contactInitialValues}
            validationSchema={contactValidationSchema}
            onSubmit={(values, { resetForm }) => {
              setSubmittedData(values);
              resetForm();
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form noValidate className="gp-form">
                <div className="form-group mb-3">
                  <label htmlFor="contact-name">Họ và tên *</label>
                  <Field
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="name" component="div" className="field-error" />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6 form-group">
                    <label htmlFor="contact-email">Địa chỉ Email *</label>
                    <Field
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@domain.com"
                      className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="email" component="div" className="field-error" />
                  </div>

                  <div className="col-md-6 form-group">
                    <label htmlFor="contact-phone">Số điện thoại *</label>
                    <Field
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="0912345678"
                      className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="phone" component="div" className="field-error" />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="contact-topic">Chủ đề cần hỗ trợ *</label>
                  <Field
                    as="select"
                    id="contact-topic"
                    name="topic"
                    className={`form-select ${touched.topic && errors.topic ? 'is-invalid' : ''}`}
                  >
                    <option value="Tư vấn sản phẩm">Tư vấn chọn sản phẩm gaming gear</option>
                    <option value="Dịch vụ Mod & Lube">Dịch vụ Mod phím cơ & Lube switch</option>
                    <option value="Bảo hành & Kỹ thuật">Bảo hành & Xử lý lỗi kỹ thuật</option>
                    <option value="Hợp tác đại lý">Hợp tác kinh doanh & Báo giá sỉ</option>
                  </Field>
                  <ErrorMessage name="topic" component="div" className="field-error" />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="contact-message">Nội dung tin nhắn *</label>
                  <Field
                    as="textarea"
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Mô tả chi tiết câu hỏi hoặc yêu cầu hỗ trợ của bạn..."
                    className={`form-control ${touched.message && errors.message ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="message" component="div" className="field-error" />
                </div>

                <div className="form-group mb-4">
                  <label className="checkbox-label" htmlFor="contact-agree">
                    <Field type="checkbox" id="contact-agree" name="agreeToPolicy" />
                    <span>Tôi đồng ý cho phép GearPulse liên hệ qua SĐT / Email theo chính sách bảo mật *</span>
                  </label>
                  <ErrorMessage name="agreeToPolicy" component="div" className="field-error" />
                </div>

                <Button
                  type="submit"
                  variant="dark"
                  size="lg"
                  className="w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang gửi tin nhắn...' : 'Gửi Yêu Cầu Hỗ Trợ'}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
