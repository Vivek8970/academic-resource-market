
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../components/admin/AdminDashboard";
import UserManagement from "../components/admin/UserManagement";
import ListingsManagement from "../components/admin/ListingsManagement";
import CategoryManagement from "../components/admin/CategoryManagement";
import ReportsManagement from "../components/admin/ReportsManagement";
import AdminLayout from "../components/admin/AdminLayout";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin" element={<AdminLayout />}>
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
