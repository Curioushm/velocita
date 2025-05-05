import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrderPage from './pages/OrderPage';
import AdminProductListPage from './pages/admin/AdminProductListPage';
import AdminProductEditPage from './pages/admin/AdminProductEditPage';
import AdminUserListPage from './pages/admin/AdminUserListPage';
import AdminUserEditPage from './pages/admin/AdminUserEditPage';
import AdminCategoryListPage from './pages/admin/AdminCategoryListPage';
import AdminCategoryEditPage from './pages/admin/AdminCategoryEditPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute'; // Ensure this path is correct and the component handles admin checks + renders <Outlet />
import AdminOrderListPage from './pages/admin/AdminOrderListPage'; // Ensure this path is correct

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes (User must be logged in) */}
        {/* The PrivateRoute component handles authentication checks */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order/:id" element={<OrderPage />} />
        </Route>

        {/* Admin Routes (User must be logged in AND be an admin) */}
        {/* The AdminRoute component handles admin authorization checks. */}
        {/* If '/admin/orderlist' or other admin routes show 'Not Found', */}
        {/* verify that AdminRoute correctly checks admin status and renders <Outlet />. */}
        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/productlist" element={<AdminProductListPage />} />
          <Route path="/admin/productlist/:pageNumber" element={<AdminProductListPage />} />
          <Route path="/admin/product/:id/edit" element={<AdminProductEditPage />} />
          <Route path="/admin/userlist" element={<AdminUserListPage />} />
          <Route path="/admin/user/:id/edit" element={<AdminUserEditPage />} />
          <Route path="/admin/categorylist" element={<AdminCategoryListPage />} />
          <Route path="/admin/category/:id/edit" element={<AdminCategoryEditPage />} />
          {/* The route for the admin order list page */}
          <Route path="/admin/orderlist" element={<AdminOrderListPage />} />
          {/* The route for the paginated admin order list page */}
          <Route path="/admin/orderlist/:pageNumber" element={<AdminOrderListPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;