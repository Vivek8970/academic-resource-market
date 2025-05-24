
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../components/admin/AdminDashboard";
import UserManagement from "../components/admin/UserManagement";
import ListingsManagement from "../components/admin/ListingsManagement";
import CategoryManagement from "../components/admin/CategoryManagement";
import ReportsManagement from "../components/admin/ReportsManagement";
import UserLayout from "../components/user/UserLayout";
import Homepage from "../components/user/Homepage";
import Marketplace from "../components/user/Marketplace";
import ProductDetails from "../components/user/ProductDetails";
import UserDashboard from "../components/user/UserDashboard";
import UploadProduct from "../components/user/UploadProduct";
import AuthPage from "../components/auth/AuthPage";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user'>('user');

  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/auth" element={<AuthPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
        
        {/* User Routes */}
        <Route path="/" element={<UserLayout isAuthenticated={isAuthenticated} />}>
          <Route path="home" element={<Homepage />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="dashboard" element={isAuthenticated ? <UserDashboard /> : <Navigate to="/auth" />} />
          <Route path="upload" element={isAuthenticated ? <UploadProduct /> : <Navigate to="/auth" />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={userRole === 'admin' ? <AdminLayout /> : <Navigate to="/auth" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="listings" element={<ListingsManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="reports" element={<ReportsManagement />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Index;
