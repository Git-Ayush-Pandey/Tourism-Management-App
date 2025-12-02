// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../services/authService";
import { STORAGE_KEYS } from "../utils/constants";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [adminMode, setAdminMode] = useState(false);

  // -------------------------------------------------------
  // LOAD FROM LOCAL STORAGE
  // -------------------------------------------------------
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);

    setLoading(false);
  }, []);

  // -------------------------------------------------------
  // LOGIN
  // -------------------------------------------------------
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);

      if (data?.token && data?.user) {
        setToken(data.token);
        setUser(data.user);

        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: "Login failed" };
    }
  };

  // -------------------------------------------------------
  // SIGNUP
  // -------------------------------------------------------
  const signup = async (payload) => {
    try {
      const data = await authService.signup(payload);

      if (data?.token && data?.user) {
        setToken(data.token);
        setUser(data.user);

        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: "Signup failed" };
    }
  };

  // -------------------------------------------------------
  // LOGOUT
  // -------------------------------------------------------
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

    setToken(null);
    setUser(null);
  };

  // -------------------------------------------------------
  // BECOME ADMIN
  // -------------------------------------------------------
  const becomeAdmin = async () => {
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/become-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const updatedUser = { ...user, role: "admin" };

        setUser(updatedUser);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));

        alert("🎉 You are now an Admin!");
      } else {
        alert(data.message || "Failed to upgrade role");
      }
    } catch (err) {
      console.error("Become Admin Error:", err);
      alert("Server error");
    }
  };

  const toggleAdminMode = () => {
    if (user?.role !== "admin") return;
    setAdminMode((prev) => !prev);
  };

  // -------------------------------------------------------
  const isAuthenticated = () => !!user && !!token;
  const isAdmin = () => user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated,
        isAdmin,
        becomeAdmin,
        adminMode,
        toggleAdminMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);
