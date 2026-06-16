import React, { createContext, useContext, useState, useEffect } from "react";
import api, { login as apiLogin, logout as apiLogout } from "../../../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (identifier, password) => {
    const data = await apiLogin(identifier, password);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const authFetch = async (url, options = {}) => {
    const method = options.method || 'GET';
    const config = {
      method: method.toLowerCase(),
      url,
      data: options.body ? JSON.parse(options.body) : undefined,
      headers: options.headers || {},
    };

    try {
      const response = await api(config);
      return {
        ok: response.status >= 200 && response.status < 300,
        status: response.status,
        json: async () => response.data,
      };
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
      }
      return {
        ok: false,
        status: error.response?.status || 500,
        json: async () => error.response?.data || { error: error.message },
      };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateUser, 
      authFetch, 
      isAdmin: user?.role === "admin",
      isStaff: user?.role === "staff" || user?.role === "admin",
      isCustomer: user?.role === "customer",
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
