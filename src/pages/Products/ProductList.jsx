import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../../api/product.api';
import { categoryAPI } from '../../api/category.api';
import { warehouseAPI } from '../../api/warehouse.api';

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageQuantity, setPageQuantity] = useState(1);

  // Filters
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Statistics
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0,
  });

  // Fetch categories and warehouses on mount
  useEffect(() => {
    fetchCategories();
    fetchWarehouses();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery, selectedWarehouse, selectedCategory, selectedStatus, sortBy]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      if (response.code === 'success') {
        setCategories(response.data || []);
        console.log('ProductList - Fetched categories:', response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  const fetchWarehouses = async () => {
    try {
      const response = await warehouseAPI.getAll();
      if (response.code === 'success') {
        setWarehouses(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
      };

      if (searchQuery) params.search = searchQuery;
      if (selectedWarehouse) params.warehouseId = selectedWarehouse;
      if (selectedCategory) params.categoryId = selectedCategory;
      if (selectedStatus !== '') params.isActive = selectedStatus;
      if (sortBy) params.quantity = sortBy;

      const response = await productAPI.getAll(params);

      if (response.code === 'success') {
        setProducts(response.data || []);
        setPageQuantity(response.pageQuantity || 1);

        // Calculate stats
        const allProducts = response.data || [];
        const totalProducts = allProducts.length;
        const totalValue = allProducts.reduce((sum, p) => sum + (p.price * p.quantity || 0), 0);
        const lowStock = allProducts.filter(p => p.quantity > 0 && p.quantity < 100).length;
        const outOfStock = allProducts.filter(p => p.quantity === 0).length;

        setStats({
          totalProducts,
          totalValue: `$${totalValue.toLocaleString()}`,
          lowStock,
          outOfStock,
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLockProduct = async (id, currentStatus) => {
    try {
      const response = await productAPI.lock(id, currentStatus);
      if (response.code === 'success') {
        fetchProducts(); // Refresh the list
      }
    } catch (error) {
      console.error('Error locking product:', error);
      alert('Failed to update product status');
    }
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) {
      return { text: 'Out of Stock', color: 'text-red-600' };
    } else if (quantity < 100) {
      return { text: 'Low Stock', color: 'text-orange-600' };
    } else {
      return { text: 'In Stock', color: 'text-green-600' };
    }
  };

  const statsConfig = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: 'inventory_2',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600'
    },
    {
      label: 'Total Value',
      value: stats.totalValue,
      icon: 'payments',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600'
    },
    {
      label: 'Low Stock',
      value: stats.lowStock,
      icon: 'warning',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      label: 'Out of Stock',
      value: stats.outOfStock,
      icon: 'error',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/inventory/products" className="hover:text-slate-900">Inventory</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Products</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-slate-900">Products</h1>
          <p className="text-base text-slate-500">Manage your product inventory across all warehouses.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/inventory/products/low-stock"
            className="flex items-center gap-2 h-11 px-4 rounded-lg border border-orange-200 bg-orange-50 text-sm font-bold text-orange-700 hover:bg-orange-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">warning</span>
            View Low Stock
          </Link>
          <Link
            to="/inventory/products/add"
            className="flex items-center gap-2 h-11 px-4 rounded-lg bg-primary text-sm font-bold text-white hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Product
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.iconBg}`}>
              <span className={`material-symbols-outlined text-[24px] ${stat.iconColor}`}>
                {stat.icon}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-slate-500">{stat.label}</span>
              <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by name, SKU, or tag"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <select
            value={selectedWarehouse}
            onChange={(e) => {
              setSelectedWarehouse(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 px-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
          >
            <option value="">All Warehouses</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 px-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 px-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
          >
            <option value="">Sort by: Default</option>
            <option value="asc">Sort by: Stock (Low to High)</option>
            <option value="desc">Sort by: Stock (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Warehouse
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const stockStatus = getStockStatus(product.quantity);
                  return (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 overflow-hidden">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-slate-400">inventory_2</span>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900">{product.name}</span>
                            <span className="text-xs text-slate-500">ID: {product.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {product.categoryIds && product.categoryIds.length > 0 ? (
                            product.categoryIds.map((cat, idx) => (
                              <span key={idx} className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                {cat.categoryName}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-slate-400">No category</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{product.warehouseName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-900">{product.quantity}</span>
                          <span className={`text-xs font-medium ${stockStatus.color}`}>
                            ● {stockStatus.text}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-900">${product.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${product.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                          }`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleLockProduct(product.id, product.isActive)}
                            className={`p-2 rounded-lg transition-colors ${product.isActive
                              ? 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                              : 'text-slate-400 hover:text-green-600 hover:bg-green-50'
                              }`}
                            title={product.isActive ? 'Deactivate' : 'Activate'}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {product.isActive ? 'lock' : 'lock_open'}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Showing page {currentPage} of {pageQuantity}
          </p>
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            {[...Array(Math.min(pageQuantity, 5))].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-semibold transition-colors ${currentPage === pageNum
                    ? 'bg-primary text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {pageQuantity > 5 && <span className="px-2 text-slate-500">...</span>}
            <button
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === pageQuantity}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
