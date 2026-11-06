import * as Yup from 'yup';

export const contactInitialValues = {
  name: '',
  email: '',
  phone: '',
  topic: 'Tư vấn sản phẩm',
  message: '',
  agreeToPolicy: false
};

export const contactValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
    .required('Vui lòng nhập họ và tên'),
  email: Yup.string()
    .trim()
    .email('Địa chỉ email không hợp lệ')
    .required('Vui lòng nhập địa chỉ email'),
  phone: Yup.string()
    .trim()
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)')
    .required('Vui lòng nhập số điện thoại'),
  topic: Yup.string().required('Vui lòng chọn chủ đề liên hệ'),
  message: Yup.string()
    .trim()
    .min(10, 'Nội dung tin nhắn phải có ít nhất 10 ký tự')
    .max(500, 'Nội dung tối đa 500 ký tự')
    .required('Vui lòng nhập nội dung cần hỗ trợ'),
  agreeToPolicy: Yup.boolean().oneOf([true], 'Bạn phải đồng ý với chính sách bảo mật')
});
