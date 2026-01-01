import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import UserList from '../pages/Users/UserList';
import UserCreate from '../pages/Users/UserCreate';
import ProductList from '../pages/Products/ProductList';
import ProductCreate from '../pages/Products/ProductCreate';
import Login from '../pages/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <UserList />,
      },
      {
        path: 'users/create',
        element: <UserCreate />,
      },
      {
        path: 'products',
        element: <ProductList />,
      },
      {
        path: 'products/create',
        element: <ProductCreate />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
