import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    warehouseId: '',
    quantity: ''
  });

  // Mock data for products
  const products = [
    {
      id: 1,
      name: 'Wireless Mouse M30',
      sku: 'SKU-1234',
      category: 'Electronics',
      categoryColor: 'bg-blue-100 text-blue-700',
      warehouse: 'North Logistics Center',
      stock: 450,
      stockStatus: 'In Stock',
      stockColor: 'text-green-600',
      price: '$24.00',
      image: '🖱️'
    },
    {
      id: 2,
      name: 'Mechanical Keyboard X1',
      sku: 'SKU-5882',
      category: 'Electronics',
      categoryColor: 'bg-blue-100 text-blue-700',
      warehouse: 'West Warehouse',
      stock: 12,
      stockStatus: 'Low Stock',
      stockColor: 'text-orange-600',
      price: '$89.99',
      image: '⌨️'
    },
    {
      id: 3,
      name: 'ErgoChair Plus',
      sku: 'SKU-3321',
      category: 'Furniture',
      categoryColor: 'bg-purple-100 text-purple-700',
      warehouse: 'South Distribution',
      stock: 0,
      stockStatus: 'Out of Stock',
      stockColor: 'text-red-600',
      price: '$350.00',
      image: '🪑'
    },
    {
      id: 4,
      name: 'Moleskine Notebook',
      sku: 'SKU-9981',
      category: 'Stationery',
      categoryColor: 'bg-yellow-100 text-yellow-700',
      warehouse: 'North Logistics Center',
      stock: 850,
      stockStatus: 'In Stock',
      stockColor: 'text-green-600',
      price: '$18.50',
      image: '📓'
    },
    {
      id: 5,
      name: 'Smart Watch Series 5',
      sku: 'SKU-4452',
      category: 'Electronics',
      categoryColor: 'bg-blue-100 text-blue-700',
      warehouse: 'East Warehouse',
      stock: 42,
      stockStatus: 'In Stock',
      stockColor: 'text-green-600',
      price: '$299.00',
      image: '⌚'
    },
  ];

  const stats = [
    {
      label: 'Total Products',
      value: '1,240',
      icon: 'inventory_2',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600'
    },
    {
      label: 'Total Value',
      value: '$45,200',
      icon: 'payments',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600'
    },
    {
      label: 'Low Stock',
      value: '15',
      icon: 'warning',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      label: 'Out of Stock',
      value: '3',
      icon: 'error',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
  ];

  const totalResults = 1240;
  const resultsPerPage = 5;

  // Handle create product
  const handleCreateProduct = () => {
    setIsModalOpen(true);
    setFormData({ name: '', image: '', warehouseId: '', quantity: '' });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name.trim() || !formData.warehouseId || !formData.quantity) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // TODO: Replace with actual API endpoint
      console.log('Sending to backend:', formData);

      // Example API call (uncomment when backend is ready):
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();

      // Close modal and reset form
      setIsModalOpen(false);
      setFormData({ name: '', image: '', warehouseId: '', quantity: '' });

      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
        <button
          onClick={handleCreateProduct}
          className="flex items-center gap-2 h-11 px-4 rounded-lg bg-primary text-sm font-bold text-white hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Product
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <select className="h-11 px-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat">
            <option>All Warehouses</option>
            <option>North Logistics Center</option>
            <option>West Warehouse</option>
            <option>South Distribution</option>
            <option>East Warehouse</option>
          </select>
          <select className="h-11 px-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Furniture</option>
            <option>Stationery</option>
          </select>
          <select className="h-11 px-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat">
            <option>Sort by: Last Added</option>
            <option>Sort by: Name</option>
            <option>Sort by: Price</option>
            <option>Sort by: Stock</option>
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-2xl">
                        {product.image}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">{product.name}</span>
                        <span className="text-xs text-slate-500">{product.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${product.categoryColor}`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{product.warehouse}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">{product.stock}</span>
                      <span className={`text-xs font-medium ${product.stockColor}`}>
                        {product.stock > 0 ? '● ' : '● '}{product.stockStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-900">{product.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Showing 1 to {resultsPerPage} of {totalResults} results
          </p>
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="min-w-[40px] h-10 px-3 rounded-lg bg-primary text-sm font-semibold text-white">
              1
            </button>
            <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
              2
            </button>
            <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
              3
            </button>
            <span className="px-2 text-slate-500">...</span>
            <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
              12
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Create Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Add New Product</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Wireless Mouse M30"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Warehouse */}
                <div>
                  <label htmlFor="warehouseId" className="block text-sm font-medium text-slate-700 mb-2">
                    Warehouse <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="warehouseId"
                    name="warehouseId"
                    value={formData.warehouseId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                    required
                  >
                    <option value="">Select warehouse</option>
                    <option value="1">North Logistics Center</option>
                    <option value="2">West Warehouse</option>
                    <option value="3">South Distribution</option>
                    <option value="4">East Warehouse</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-2">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
