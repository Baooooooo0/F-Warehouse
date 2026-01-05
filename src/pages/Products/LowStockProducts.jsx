import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LowStockProducts = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [warehouseFilter, setWarehouseFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Mock data for low stock products
    const lowStockProducts = [
        {
            id: 1,
            name: 'Wireless Mouse',
            sku: 'WM-001',
            image: '🖱️',
            category: 'Electronics',
            warehouse: 'Main HQ',
            quantity: 5,
            threshold: 15,
            status: 'Critical',
            statusColor: 'bg-red-100 text-red-700'
        },
        {
            id: 2,
            name: 'USB-C Cable',
            sku: 'UC-299',
            image: '🔌',
            category: 'Accessories',
            warehouse: 'North Depot',
            quantity: 2,
            threshold: 20,
            status: 'Critical',
            statusColor: 'bg-red-100 text-red-700'
        },
        {
            id: 3,
            name: 'Monitor Stand',
            sku: 'MS-550',
            image: '🖥️',
            category: 'Office Furniture',
            warehouse: 'Main HQ',
            quantity: 8,
            threshold: 12,
            status: 'Low Stock',
            statusColor: 'bg-orange-100 text-orange-700'
        },
        {
            id: 4,
            name: 'HDMI Adapter',
            sku: 'HA-101',
            image: '📺',
            category: 'Accessories',
            warehouse: 'East Wing',
            quantity: 0,
            threshold: 30,
            status: 'Depleted',
            statusColor: 'bg-red-100 text-red-700'
        },
        {
            id: 5,
            name: 'Ergo Keyboard',
            sku: 'EK-888',
            image: '⌨️',
            category: 'Electronics',
            warehouse: 'North Depot',
            quantity: 4,
            threshold: 10,
            status: 'Low Stock',
            statusColor: 'bg-orange-100 text-orange-700'
        },
    ];

    const totalResults = 45;
    const resultsPerPage = 5;

    return (
        <div className="flex flex-col gap-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500">
                <Link to="/inventory/products" className="hover:text-slate-900">Inventory</Link>
                <span>›</span>
                <Link to="/inventory/products" className="hover:text-slate-900">Products</Link>
                <span>›</span>
                <span className="text-primary font-medium">Low Stock</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold text-slate-900">All Low Stock Products</h1>
                <p className="text-base text-slate-500">
                    Review all products currently below the low stock threshold or depleted. Prioritize restocking based on status.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    Export List
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                    Create Order
                </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="relative flex-1 max-w-md w-full">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Search by product name, SKU..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                <div className="flex gap-3 items-center flex-wrap">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="h-11 px-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                    >
                        <option value="all">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="accessories">Accessories</option>
                        <option value="furniture">Office Furniture</option>
                    </select>
                    <select
                        value={warehouseFilter}
                        onChange={(e) => setWarehouseFilter(e.target.value)}
                        className="h-11 px-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                    >
                        <option value="all">All Warehouses</option>
                        <option value="main">Main HQ</option>
                        <option value="north">North Depot</option>
                        <option value="east">East Wing</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-11 px-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                    >
                        <option value="all">All Statuses</option>
                        <option value="critical">Critical</option>
                        <option value="low">Low Stock</option>
                        <option value="depleted">Depleted</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Image
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Warehouse
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    QTY
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Threshold
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
                            {lowStockProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-2xl">
                                            {product.image}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-slate-900">{product.name}</span>
                                            <span className="text-xs text-slate-500">SKU: {product.sku}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">{product.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">{product.warehouse}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-sm font-bold ${product.quantity === 0 ? 'text-red-600' : 'text-slate-900'}`}>
                                            {product.quantity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">{product.threshold}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${product.statusColor}`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${product.status === 'Critical' || product.status === 'Depleted' ? 'bg-red-600' : 'bg-orange-600'}`}></span>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="View details">
                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                            </button>
                                            <button className="px-3 py-1.5 text-xs font-bold text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors">
                                                Order More
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
                            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === 1}
                        >
                            Previous
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
                        <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-700 rounded-lg transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LowStockProducts;
