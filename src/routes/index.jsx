import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import WarehouseList from '../pages/Warehouses/WarehouseList';
import WarehouseCreate from '../pages/Warehouses/WarehouseCreate';
import UserList from '../pages/Users/UserList';
import UserCreate from '../pages/Users/UserCreate';
import SettingsMenu from '../pages/Settings/SettingsMenu';
import UserProfile from '../pages/Settings/UserProfile';
import ProductList from '../pages/Products/ProductList';
import ProductCreate from '../pages/Products/ProductCreate';
import CategoryManagement from '../pages/Inventory/CategoryManagement';
import RoleManagement from '../pages/RoleManagement/RoleManagement';
import Login from '../pages/Login/Login';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'warehouses',
        element: <WarehouseList />,
      },
      {
        path: 'warehouses/create',
        element: <WarehouseCreate />,
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
      {
        path: 'inventory/products',
        element: <ProductList />,
      },
      {
        path: 'inventory/categories',
        element: <CategoryManagement />,
      },
      {
        path: 'role-management',
        element: <RoleManagement />,
      },
      {
        path: 'settings',
        element: <SettingsMenu />,
      },
      {
        path: 'settings/profile',
        element: <UserProfile />,
      },],
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
