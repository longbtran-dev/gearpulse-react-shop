import * as Yup from 'yup';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';

export const ADMIN_CATEGORIES = PRODUCT_CATEGORIES.filter((c) => c !== 'All');

export function getProductInitialValues(product = null) {
  return {
    name: product?.name ?? '',
    category: product?.category ?? 'Keyboard',
    brand: product?.brand ?? '',
    price: product?.price ?? '',
    originalPrice: product?.originalPrice ?? '',
    rating: product?.rating ?? 5,
    stock: product?.stock ?? 10,
    image: product?.image ?? '',
    description: product?.description ?? '',
    isHot: Boolean(product?.isHot),
    isNew: Boolean(product?.isNew),
    inStock: Boolean(product?.inStock ?? true)
  };
}

export const productValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, 'Tên sản phẩm phải có ít nhất 3 ký tự')
    .max(100, 'Tên sản phẩm tối đa 100 ký tự')
    .required('Tên sản phẩm là bắt buộc'),
  category: Yup.string()
    .oneOf(ADMIN_CATEGORIES, 'Vui lòng chọn danh mục hợp lệ')
    .required('Danh mục là bắt buộc'),
  brand: Yup.string()
    .trim()
    .min(2, 'Hãng sản xuất phải có ít nhất 2 ký tự')
    .required('Hãng sản xuất là bắt buộc'),
  price: Yup.number()
    .typeError('Giá bán phải là chữ số')
    .min(1, 'Giá bán phải lớn hơn 0')
    .required('Giá bán là bắt buộc'),
  originalPrice: Yup.number()
    .typeError('Giá gốc phải là chữ số')
    .min(0, 'Giá gốc không được âm'),
  rating: Yup.number()
    .typeError('Đánh giá phải từ 1 đến 5')
    .min(1, 'Tối thiểu 1 sao')
    .max(5, 'Tối đa 5 sao')
    .required('Đánh giá là bắt buộc'),
  stock: Yup.number()
    .typeError('Số lượng kho phải là số nguyên')
    .min(0, 'Số lượng không được âm')
    .required('Số lượng tồn kho là bắt buộc'),
  image: Yup.string().trim(),
  description: Yup.string()
    .trim()
    .min(10, 'Mô tả chi tiết phải có ít nhất 10 ký tự')
    .required('Mô tả là bắt buộc'),
  isHot: Yup.boolean(),
  isNew: Yup.boolean(),
  inStock: Yup.boolean()
});
