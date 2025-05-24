
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user'>('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          const role = profile?.role === 'admin' ? 'admin' : 'user';
          setUserRole(role);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUserRole('user');
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        const role = profile?.role === 'admin' ? 'admin' : 'user';
        setUserRole(role);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/auth" element={
          isAuthenticated ? 
            <Navigate to={userRole === 'admin' ? "/admin/dashboard" : "/home"} replace /> : 
            <AuthPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />
        } />
        
        {/* User Routes */}
        <Route path="/" element={<UserLayout isAuthenticated={isAuthenticated} />}>
          <Route path="home" element={<Homepage />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="dashboard" element={isAuthenticated ? <UserDashboard /> : <Navigate to="/auth" />} />
          <Route path="upload" element={isAuthenticated ? <UploadProduct /> : <Navigate to="/auth" />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          isAuthenticated && userRole === 'admin' ? 
            <AdminLayout /> : 
            <Navigate to="/auth" />
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="listings" element={<ListingsManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="reports" element={<ReportsManagement />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
};

export default Index;
