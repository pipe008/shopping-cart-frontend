import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../../shared/components/Layout";
import ProductsPage from "../../features/products/pages/ProductsPage";
import CartPage from "../../features/cart/pages/CartPage";
import CheckoutPage from "../../features/checkout/pages/CheckoutPage";
import OrdersPage from "../../features/orders/pages/OrdersPage";
import AdminProductsPage from "../../features/products/pages/AdminProductsPage";
import CreateProductPage from "../../features/products/pages/CreateProductPage";
import EditProductPage from "../../features/products/pages/EditProductPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="admin/products" element={<AdminProductsPage />} />
        <Route path="admin/products/new" element={<CreateProductPage />} />
        <Route path="admin/products/edit/:id" element={<EditProductPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;