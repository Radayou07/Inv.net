import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./pages/protected/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import Login from "./pages/auth/Login";

// Customer Pages
import CustomerHome from "./pages/protected/customer/Home";
import Products from "./pages/protected/customer/Products";
import ProductDetail from "./pages/protected/customer/ProductDetail";
import Inventories from "./pages/protected/customer/Inventories";
import Customers from "./pages/protected/customer/Customers";
import Suppliers from "./pages/protected/customer/Suppliers";
import Orders from "./pages/protected/customer/Orders";
import Profile from "./pages/protected/customer/Profile";
import Staff from "./pages/protected/customer/Staff";
import Analysis from "./pages/protected/customer/Analysis";

// Employee Pages (keeping for reference or fallback)
import EmployeeHome from "./pages/protected/employee/Home";

// Components
import Sidebar from "./components/Sidebar";

function AppContent() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f9fb] antialiased">
      <Sidebar 
        onLogout={logout}
        avatarText={user.name.substring(0, 2).toUpperCase()}
        employeeName={user.name}
        employeeId={user.id.toString()}
      />

      <div className="flex-1 ml-64 flex flex-col h-full overflow-hidden">
        {/* We can keep the header here or move it into a Layout component */}
        <main className="flex-grow overflow-y-auto p-0 bg-[#f7f9fb]">
          <Routes>
            {/* Dashboard / Home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <CustomerHome />
              </ProtectedRoute>
            } />

            {/* Products */}
            <Route path="/products" element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            } />
            <Route path="/products/:id" element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            } />

            {/* Inventory */}
            <Route path="/inventory" element={
              <ProtectedRoute>
                <Inventories />
              </ProtectedRoute>
            } />

            {/* Customers */}
            <Route path="/customer" element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            } />

            {/* Suppliers */}
            <Route path="/supplier" element={
              <ProtectedRoute>
                <Suppliers />
              </ProtectedRoute>
            } />

            {/* Orders */}
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />

            {/* Profile / Account */}
            <Route path="/account" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* Admin / Staff */}
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <Staff />
              </ProtectedRoute>
            } />

            {/* Analysis */}
            <Route path="/analysis" element={
              <ProtectedRoute>
                <Analysis />
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
