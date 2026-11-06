# GearPulse E-Commerce Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete React 19 e-commerce Single-Page Application (SPA) named **GearPulse** (Gaming Gear & Tech Gadgets Shop) integrating all core concepts from FER202 Labs 1–6 (Components, useState, Context/Effects, useReducer cart, React Router v7, Formik + Yup validation, Fetch API RESTful CRUD & Admin management) and publish it to a new GitHub repository with automated GitHub Pages deployment.

**Architecture:** Client-side Single Page Application built on React 19, Vite, and Bootstrap 5 with custom modern styling (Light/Dark themes). State is partitioned into focused contexts (`AuthContext` for credentials & theme with `localStorage` persistence, `CartContext` with a pure `cartReducer` for cart calculations & order flow). Network layer uses an isolated `productApi.js` service communicating via Fetch API with mock fallback for seamless offline/online operation. Navigation is orchestrated by React Router v7 supporting dynamic routing and query filters.

**Tech Stack:** React 19, Vite, React Router v7 (`react-router-dom`), React-Bootstrap 5, Bootstrap 5, Formik, Yup, Vitest, React Testing Library, GitHub Actions.

**Spec:** Synthesizes FER202 Labs 1 through 6 into a commercial-grade personal project:
- **Lab 1:** Functional components, props, `map()`, `key`, Container/Presentation pattern, conditional badges (Hot, Sale, New, In Stock).
- **Lab 2:** `useState` hook for Quick View Modal, real-time keyword search, category filter, and sorting.
- **Lab 3:** `AuthContext` + `AuthProvider` with custom `useAuth()` hook, `Aaron` (customer) / `Admin` authentication, Dark/Light theme toggling, and `localStorage` persistence.
- **Lab 4:** `useReducer` for shopping cart (add, update quantity, remove, clear, coupon calculation) and Formik + Yup checkout form with order confirmation.
- **Lab 5:** React Router v7 with multi-page routes (`/`, `/products`, `/products/:category`, `/product/:id`, `/cart`, `/checkout`, `/contact`, `/admin`), active nav pills, `useParams`, and `useSearchParams`.
- **Lab 6:** Fetch API layer with async/await (`GET`, `POST`, `PUT`, `DELETE`), loading/error/feedback state handling, retry capability, and role-protected Admin CRUD console with Formik + Yup product management modal.

---

## Global Constraints

- Standalone project in `E:\FER202\gearpulse-react-shop`, independent of `fer202-react-labs`.
- Pure front-end application with self-contained API fallback (no mandatory external backend required to test or run).
- Full Vietnamese comments and documentation explaining where each Lab 1–6 concept is applied.
- All tests run cleanly with Vitest and test coverage across critical user and admin paths.
- Code style: Modern ES Modules, clean functional components, strict typing-friendly props.

## Review Focus

1. **Zero-state & Empty Cart:** Cart page and checkout buttons must disable gracefully when no items are present.
2. **Network Resilience:** If the remote API fails or is offline, the product service must catch errors, show an error alert, and allow "Retry" without crashing.
3. **Formik & Yup Validation:** Checkout and Admin Product forms must validate required fields, formats, and value ranges before submission.
4. **Theme & Auth Persistence:** Reloading the page must preserve the active theme and logged-in user state from `localStorage`.
5. **Route 404 & Param Fallback:** Navigating to an invalid product ID must display a user-friendly fallback with a link back to catalog.

---

## Task Breakdown

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `.gitignore`
- Create: `src/test/setup.js`
- Create: `public/product-placeholder.svg`

**Interfaces:**
- Produces: Runnable Vite development server and Vitest test runner.

- [ ] **Step 1: Create `package.json` with React 19, React Router v7, Bootstrap, Formik, Yup, and Vitest**
- [ ] **Step 2: Create `vite.config.js`, `index.html`, and `.gitignore`**
- [ ] **Step 3: Create `src/test/setup.js` with `@testing-library/jest-dom/vitest`**
- [ ] **Step 4: Create SVG placeholder asset in `public/product-placeholder.svg`**
- [ ] **Step 5: Run `npm install` in `E:\FER202\gearpulse-react-shop` to verify clean dependencies**

---

### Task 2: Data Models, Initial Products & RESTful API Service (Lab 6)

**Files:**
- Create: `src/data/initialProducts.js`
- Create: `src/config/api.js`
- Create: `src/services/productApi.js`
- Test: `src/services/productApi.test.js`

**Interfaces:**
- Produces: `fetchProducts()`, `fetchProductById(id)`, `createProduct(payload)`, `updateProduct(id, payload)`, `deleteProduct(id)`.

- [ ] **Step 1: Write failing test for `productApi.js` (GET, POST, PUT, DELETE with mock fetch)**
- [ ] **Step 2: Run test to verify RED state**
- [ ] **Step 3: Implement `initialProducts.js` (12 curated tech/gaming products with SVG data URIs, categories, ratings, prices, tags)**
- [ ] **Step 4: Implement `src/config/api.js` and `src/services/productApi.js` with Fetch API and localStorage memory-sync fallback**
- [ ] **Step 5: Run test to verify GREEN state**

---

### Task 3: Auth & Theme Context with Persistence (Lab 3)

**Files:**
- Create: `src/context/AuthContext.js`
- Create: `src/context/AuthProvider.jsx`
- Create: `src/hooks/useAuth.js`
- Test: `src/context/AuthProvider.test.jsx`

**Interfaces:**
- Produces: `useAuth()` hook providing `{ user, isAdmin, loginCustomer, loginAdmin, logout, theme, toggleTheme }`.

- [ ] **Step 1: Write failing test verifying customer login, admin login, logout, theme toggling, and `localStorage` sync**
- [ ] **Step 2: Run test to verify RED state**
- [ ] **Step 3: Implement `AuthContext.js`, `AuthProvider.jsx`, and `useAuth.js`**
- [ ] **Step 4: Run test to verify GREEN state**

---

### Task 4: Cart State Management with `useReducer` (Lab 4)

**Files:**
- Create: `src/context/CartContext.js`
- Create: `src/context/cartReducer.js`
- Create: `src/context/CartProvider.jsx`
- Create: `src/hooks/useCart.js`
- Test: `src/context/cartReducer.test.js`

**Interfaces:**
- Produces: `useCart()` hook with `{ items, totalItems, subtotal, discount, finalTotal, coupon, addItem, removeItem, updateQty, applyCoupon, clearCart }`.

- [ ] **Step 1: Write failing test for `cartReducer` actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY`, `APPLY_COUPON`, `CLEAR_CART`**
- [ ] **Step 2: Run test to verify RED state**
- [ ] **Step 3: Implement `cartReducer.js`, `CartContext.js`, `CartProvider.jsx`, and `useCart.js`**
- [ ] **Step 4: Run test to verify GREEN state**

---

### Task 5: Presentation & Modal Components (Lab 1 & Lab 2)

**Files:**
- Create: `src/components/Navbar.jsx`
- Create: `src/components/Footer.jsx`
- Create: `src/components/ProductCard.jsx`
- Create: `src/components/ProductGrid.jsx`
- Create: `src/components/QuickViewModal.jsx`
- Test: `src/components/ProductCard.test.jsx`

**Interfaces:**
- Consumes: `useAuth()`, `useCart()`.
- Produces: Reusable UI cards, grid layout, quick view modal with Add to Cart trigger.

- [ ] **Step 1: Write failing test for `ProductCard` rendering props, badges, rating, and quick view trigger**
- [ ] **Step 2: Run test to verify RED state**
- [ ] **Step 3: Implement `ProductCard.jsx`, `ProductGrid.jsx`, `QuickViewModal.jsx`, `Navbar.jsx`, and `Footer.jsx`**
- [ ] **Step 4: Run test to verify GREEN state**

---

### Task 6: Catalog, Search, Filtering & Product Detail Pages (Lab 2 & Lab 5)

**Files:**
- Create: `src/pages/HomePage.jsx`
- Create: `src/pages/ProductsPage.jsx`
- Create: `src/pages/ProductDetailPage.jsx`
- Test: `src/pages/ProductsPage.test.jsx`

**Interfaces:**
- Consumes: `productApi`, `useCart()`, `useParams()`, `useSearchParams()`.
- Produces: Interactive catalog with real-time keyword search, category filter pill navigation, sorting, and dynamic detail route `/product/:id`.

- [ ] **Step 1: Write failing test for `ProductsPage` search and category filtering**
- [ ] **Step 2: Run test to verify RED state**
- [ ] **Step 3: Implement `HomePage.jsx` (Hero banner, featured products, categories banner)**
- [ ] **Step 4: Implement `ProductsPage.jsx` (Search, sort, filter toolbar, active badge count)**
- [ ] **Step 5: Implement `ProductDetailPage.jsx` (Gallery, technical specs, stock status, qty picker, Add to Cart)**
- [ ] **Step 6: Run test to verify GREEN state**

---

### Task 7: Cart, Formik + Yup Checkout & Contact Pages (Lab 4 & Lab 5)

**Files:**
- Create: `src/validation/checkoutSchema.js`
- Create: `src/validation/contactSchema.js`
- Create: `src/pages/CartPage.jsx`
- Create: `src/pages/CheckoutPage.jsx`
- Create: `src/pages/ContactPage.jsx`
- Test: `src/pages/CheckoutPage.test.jsx`

**Interfaces:**
- Consumes: `useCart()`, `useAuth()`.
- Produces: Shopping cart summary, Formik + Yup validated checkout, Order confirmation receipt, Contact form.

- [ ] **Step 1: Write failing test for `CheckoutPage` Formik & Yup validation and order placement**
- [ ] **Step 2: Run test to verify RED state**
- [ ] **Step 3: Implement `checkoutSchema.js` and `contactSchema.js`**
- [ ] **Step 4: Implement `CartPage.jsx` (item table, qty controls, coupon input `GEAR10`, order summary)**
- [ ] **Step 5: Implement `CheckoutPage.jsx` (shipping form, payment selector, order confirmation modal/receipt)**
- [ ] **Step 6: Implement `ContactPage.jsx` (support inquiry with Formik + Yup)**
- [ ] **Step 7: Run test to verify GREEN state**

---

### Task 8: Admin CRUD Management Console with Formik & Yup (Lab 6)

**Files:**
- Create: `src/validation/productSchema.js`
- Create: `src/components/ProductFormModal.jsx`
- Create: `src/pages/AdminPage.jsx`
- Test: `src/pages/AdminPage.test.jsx`

**Interfaces:**
- Consumes: `useAuth()`, `productApi`.
- Produces: Protected `/admin` route, product table, Formik + Yup Add/Edit modal, Delete action, live state sync.

- [ ] **Step 1: Write failing test for `AdminPage` gatekeeping and CRUD operations**
- [ ] **Step 2: Run test to verify RED state**
- [ ] **Step 3: Implement `productSchema.js` (name, price, category, brand, rating, stock, description, image validation)**
- [ ] **Step 4: Implement `ProductFormModal.jsx` (Formik + Yup Add/Edit modal with `enableReinitialize`)**
- [ ] **Step 5: Implement `AdminPage.jsx` (Role check banner, search filter, data table, action buttons, API feedback banner)**
- [ ] **Step 6: Run test to verify GREEN state**

---

### Task 9: App Router Assembly & Styling

**Files:**
- Create: `src/App.jsx`
- Create: `src/main.jsx`
- Create: `src/styles.css`
- Test: `src/App.test.jsx`

**Interfaces:**
- Produces: Complete SPA routing tree, global theme tokens (Light & Dark), responsive layout.

- [ ] **Step 1: Implement `src/styles.css` with responsive styling and CSS variables for Light & Dark mode**
- [ ] **Step 2: Implement `src/App.jsx` with `<Routes>` and full path definitions**
- [ ] **Step 3: Implement `src/main.jsx` wrapping with `BrowserRouter`, `AuthProvider`, `CartProvider`**
- [ ] **Step 4: Write integration test in `src/App.test.jsx` verifying top-level navigation**
- [ ] **Step 5: Run tests and verify full suite passes**

---

### Task 10: Documentation, GitHub Repository Creation & CI/CD Deployment

**Files:**
- Create: `README.md` (comprehensive documentation with Lab 1–6 knowledge map and screenshots/guide)
- Create: `.github/workflows/deploy.yml` (GitHub Actions CI/CD for GitHub Pages)

**Interfaces:**
- Produces: Public GitHub repository `longbtran-dev/gearpulse-react-shop` and live GitHub Pages site.

- [ ] **Step 1: Create `README.md` explaining the project, features, and detailed mapping to Labs 1–6**
- [ ] **Step 2: Create `.github/workflows/deploy.yml` configured for Vite build and GitHub Pages deployment**
- [ ] **Step 3: Run `npm test` and `npm run build` locally to verify 0 errors**
- [ ] **Step 4: Initialize git repository, commit all files, create GitHub repo via `gh repo create` and push to `origin main`**
