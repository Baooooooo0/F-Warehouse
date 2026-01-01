import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../api/auth.api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authAPI.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    // Mock authentication - tài khoản mẫu để test
    const mockUsers = [
      { email: 'admin@company.com', password: 'admin123', name: 'Admin User', role: 'admin' },
      { email: 'user@company.com', password: 'user123', name: 'Regular User', role: 'user' },
    ];

    // Tìm user phù hợp
    const user = mockUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Giả lập response từ API
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockResponse = {
      token: mockToken,
      user: { name: user.name, email: user.email, role: user.role }
    };

    localStorage.setItem('token', mockResponse.token);
    setUser(mockResponse.user);

    // Uncomment dòng dưới khi đã có backend thật
    // const response = await authAPI.login(credentials);
    // localStorage.setItem('token', response.token);
    // setUser(response.user);
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
