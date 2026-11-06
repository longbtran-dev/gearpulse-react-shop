# GearPulse · Gaming Gear & Premium Tech Shop

> **Dự án cá nhân thương mại điện tử React 19** tổng hợp toàn bộ kiến thức chuyên sâu từ 6 bài thực hành (Labs 1–6) môn **FER202 (Front-End Web Development with React)**.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3?logo=bootstrap)
![React Router](https://img.shields.io/badge/React_Router-v7-red?logo=reactrouter)
![Tests](https://img.shields.io/badge/Vitest-26%2F26_passed-success?logo=vitest)

---

## 🌟 Demo trực tuyến & Mã nguồn

- **GitHub Repository:** [https://github.com/longbtran-dev/gearpulse-react-shop](https://github.com/longbtran-dev/gearpulse-react-shop)
- **Trang trực tuyến (GitHub Pages):** [https://longbtran-dev.github.io/gearpulse-react-shop/](https://longbtran-dev.github.io/gearpulse-react-shop/)

---

## 🎯 Bản đồ kiến thức FER202 áp dụng trong dự án

Dự án áp dụng và kết hợp chặt chẽ kiến thức từ toàn bộ 6 bài thực hành:

| Bài Lab | Kiến thức áp dụng | Cách triển khai cụ thể trong GearPulse |
|---|---|---|
| **Lab 1: Components & Props** | • Functional Components<br>• `map()` & `key`<br>• Container / Presentation pattern<br>• Conditional Rendering | • Chia tách các khối giao diện độc lập: `ProductCard`, `ProductGrid`, `Navbar`, `Footer`.<br>• Container truyền mảng sản phẩm qua props xuống `ProductGrid`, dùng `.map()` hiển thị danh sách.<br>• Hiển thị huy hiệu trạng thái có điều kiện: `HOT`, `NEW`, `-Sale%`, `Hết hàng` và xử lý ảnh lỗi tự động bằng `onError`. |
| **Lab 2: State Hook (useState) & Modal** | • Hook `useState`<br>• Event Handling & Derived State<br>• React Bootstrap `Modal` | • Quản lý từ khóa tìm kiếm (`searchQuery`), danh mục lọc (`selectedCategory`), tiêu chí sắp xếp giá/đánh giá (`sortBy`).<br>• Hộp thoại xem nhanh **Quick View Modal** (`QuickViewModal.jsx`) mở khi bấm "Quick View" trên thẻ sản phẩm, có bộ tăng giảm số lượng mua hàng. |
| **Lab 3: Context, Effect & Storage** | • `createContext`, `useContext`<br>• Custom Hook `useAuth`<br>• `useEffect` & `localStorage` | • `AuthContext` & `AuthProvider`: Quản lý tài khoản đăng nhập (Khách hàng `Aaron` / Quản trị viên `GearPulse Admin`) và chế độ Dark/Light mode.<br>• Tự động đồng bộ và khôi phục trạng thái người dùng & giao diện tối/sáng qua `localStorage`. |
| **Lab 4: useReducer, Formik & Yup** | • `useReducer` cho giỏ hàng phức tạp<br>• Formik form management<br>• Yup Validation Schema | • `CartContext` vận hành bằng `cartReducer` thuần túy: thêm sản phẩm, cập nhật số lượng, xóa sản phẩm, áp dụng mã coupon giảm giá (`GEAR10`, `PRO20`, `VIP30`), xóa giỏ hàng.<br>• Trang thanh toán `CheckoutPage.jsx` kiểm tra hợp lệ nghiêm ngặt với `Yup` (`fullName`, `email`, `phone`, `address`, `city`, điều khoản) và xuất hóa đơn xác nhận đơn hàng (**Order Confirmation Summary**). |
| **Lab 5: React Router (v7)** | • `BrowserRouter`, `Routes`, `Route`<br>• `NavLink` & `Link`<br>• `useParams` & `useSearchParams` | • Định tuyến Single Page Application đa trang mượt mà không tải lại HTML:<br>&nbsp;&nbsp;- `/`: Trang chủ nổi bật<br>&nbsp;&nbsp;- `/products`: Cửa hàng kèm tìm kiếm, lọc danh mục và sắp xếp<br>&nbsp;&nbsp;- `/product/:id`: Chi tiết kỹ thuật sản phẩm đọc tham số qua `useParams`<br>&nbsp;&nbsp;- `/cart`: Giỏ hàng chi tiết<br>&nbsp;&nbsp;- `/checkout`: Điền thông tin đặt hàng<br>&nbsp;&nbsp;- `/contact`: Biểu mẫu liên hệ hỗ trợ Formik + Yup<br>&nbsp;&nbsp;- `/admin`: Bảng điều khiển quản trị CRUD<br>• Menu `NavLink` tự động phát sáng thẻ khi đang ở trang tương ứng (`isActive`). |
| **Lab 6: Fetch API & MockAPI CRUD** | • `fetch()` với `async/await`<br>• Các phương thức `GET`, `POST`, `PUT`, `DELETE`<br>• Quản lý `loading`, `error`, `feedback`<br>• Phân quyền Admin | • Tầng dịch vụ `productApi.js` giao tiếp trực tiếp với RESTful endpoint bằng Fetch API.<br>• Hiển thị trạng thái đang tải, thông báo lỗi mạng kèm nút **Thử lại (Retry)**.<br>• Trang `/admin` bảo vệ bằng quyền Admin: Cho phép thêm mới sản phẩm (`POST`), chỉnh sửa (`PUT`) qua modal Formik + Yup và xóa sản phẩm (`DELETE`) kèm đồng bộ tức thì lên giao diện. |

---

## 🛠️ Cấu trúc thư mục dự án

```text
gearpulse-react-shop/
├── .github/workflows/
│   └── deploy.yml              # CI/CD tự động test, build và deploy lên GitHub Pages
├── public/
│   └── product-placeholder.svg # Ảnh SVG dự phòng khi mạng lỗi
├── src/
│   ├── components/
│   │   ├── Footer.jsx          # Chân trang thông tin & liên kết nhanh
│   │   ├── Navbar.jsx          # Thanh điều hướng, giỏ hàng mini, theme toggle, auth
│   │   ├── ProductCard.jsx     # Thẻ sản phẩm với giá, rating, badges, quick view
│   │   ├── ProductGrid.jsx     # Lưới hiển thị danh sách sản phẩm
│   │   ├── ProductFormModal.jsx# Modal thêm/sửa sản phẩm bằng Formik + Yup
│   │   └── QuickViewModal.jsx  # Modal xem nhanh sản phẩm với bộ chọn số lượng
│   ├── config/
│   │   └── api.js              # Cấu hình địa chỉ endpoint RESTful API
│   ├── context/
│   │   ├── AuthContext.js      # Ngữ cảnh xác thực người dùng & giao diện
│   │   ├── AuthProvider.jsx    # Provider quản lý login/logout/theme và localStorage
│   │   ├── CartContext.js      # Ngữ cảnh giỏ hàng
│   │   ├── CartProvider.jsx    # Provider giỏ hàng kết hợp useReducer
│   │   └── cartReducer.js      # Reducer xử lý ADD, UPDATE, REMOVE, COUPON, CLEAR
│   ├── data/
│   │   └── initialProducts.js  # 12 sản phẩm gaming gear mẫu với đồ họa SVG tự chứa
│   ├── hooks/
│   │   ├── useAuth.js          # Custom hook đọc AuthContext
│   │   └── useCart.js          # Custom hook đọc CartContext
│   ├── pages/
│   │   ├── AdminPage.jsx       # Bảng quản trị CRUD (Thêm, Sửa, Xóa) dành riêng cho Admin
│   │   ├── CartPage.jsx        # Trang giỏ hàng, bảng sản phẩm và mã giảm giá
│   │   ├── CheckoutPage.jsx    # Biểu mẫu thanh toán Formik + Yup và hóa đơn
│   │   ├── ContactPage.jsx     # Biểu mẫu liên hệ & chăm sóc khách hàng Formik + Yup
│   │   ├── HomePage.jsx        # Trang chủ, hero banner, danh mục, sản phẩm hot/mới
│   │   ├── ProductDetailPage.jsx# Trang chi tiết sản phẩm, thông số kỹ thuật, đánh giá
│   │   └── ProductsPage.jsx    # Trang danh mục cửa hàng, tìm kiếm và lọc
│   ├── services/
│   │   └── productApi.js       # Gọi Fetch API (GET, POST, PUT, DELETE) kèm offline fallback
│   ├── test/
│   │   └── setup.js            # Thiết lập môi trường kiểm thử Vitest + DOM matchers
│   ├── validation/
│   │   ├── checkoutSchema.js   # Yup schema cho form thanh toán
│   │   ├── contactSchema.js    # Yup schema cho form liên hệ
│   │   └── productSchema.js    # Yup schema cho form thêm/sửa sản phẩm Admin
│   ├── App.jsx                 # Routing chính và đồng bộ dữ liệu state cấp cao
│   ├── main.jsx                # Điểm khởi động bọc BrowserRouter, AuthProvider, CartProvider
│   └── styles.css              # Toàn bộ CSS giao diện Light & Dark mode responsive
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Hướng dẫn cài đặt và khởi chạy

### 1. Yêu cầu hệ thống
- **Node.js:** Phiên bản 20.19+, 22+ hoặc 24+
- **Trình quản lý gói:** `npm` (đi kèm Node.js)

### 2. Cài đặt và chạy
```bash
# Clone repository
git clone https://github.com/longbtran-dev/gearpulse-react-shop.git
cd gearpulse-react-shop

# Cài đặt các thư viện phụ thuộc
npm install

# Khởi chạy máy chủ phát triển
npm run dev
```
Trình duyệt sẽ tự động mở ứng dụng tại `http://localhost:5173`.

### 3. Chạy kiểm thử tự động
```bash
npm test
```
Toàn bộ 8 bộ kiểm thử (26 bài test) sẽ được thực thi và xác nhận hoạt động chuẩn xác.

### 4. Đóng gói sản phẩm (Build)
```bash
npm run build
```

---

## 🔑 Tài khoản mẫu & Mã giảm giá trải nghiệm

### 1. Tài khoản đăng nhập (trên thanh Navbar)
- **Demo Khách hàng:** Đăng nhập dưới tên `Aaron` để tự động điền sẵn thông tin khi mua hàng.
- **Admin Login:** Đăng nhập dưới quyền `GearPulse Admin` để mở khóa trang quản trị CRUD tại `/admin`.

### 2. Mã giảm giá thử nghiệm (nhập tại giỏ hàng)
- `GEAR10`: Giảm **10%** tổng giá trị đơn hàng
- `PRO20`: Giảm **20%** tổng giá trị đơn hàng
- `VIP30`: Giảm **30%** tổng giá trị đơn hàng
