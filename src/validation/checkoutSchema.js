import * as Yup from 'yup';

export const checkoutInitialValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: 'Hà Nội',
  paymentMethod: 'cod',
  notes: '',
  agreeToTerms: false
};

export const checkoutValidationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ và tên không được vượt quá 50 ký tự')
    .required('Họ và tên là bắt buộc'),
  email: Yup.string()
    .trim()
    .email('Địa chỉ email không đúng định dạng')
    .required('Email là bắt buộc'),
  phone: Yup.string()
    .trim()
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)')
    .required('Số điện thoại là bắt buộc'),
  address: Yup.string()
    .trim()
    .min(5, 'Địa chỉ nhận hàng phải có ít nhất 5 ký tự')
    .required('Địa chỉ nhận hàng là bắt buộc'),
  city: Yup.string().required('Vui lòng chọn Tỉnh / Thành phố'),
  paymentMethod: Yup.string().required('Vui lòng chọn phương thức thanh toán'),
  notes: Yup.string().max(200, 'Ghi chú tối đa 200 ký tự'),
  agreeToTerms: Yup.boolean().oneOf([true], 'Bạn phải đồng ý với điều khoản mua hàng')
});
