import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: ''
    });

    // Mock data for categories
    const categories = [
        {
            id: 'CAT-001',
            name: 'Electronics',
            description: 'Gadgets, phones & laptops',
            productCount: 154,
            status: 'Active',
            lastUpdated: 'Oct 27, 2023',
            icon: '📱',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600'
        },
        {
            id: 'CAT-003',
            name: 'Furniture',
            description: 'Office desks and chairs',
            productCount: 42,
            status: 'Active',
            lastUpdated: 'Oct 20, 2023',
            icon: '🪑',
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-600'
        },
        {
            id: 'CAT-004',
            name: 'Clothing',
            description: 'Apparel & uniforms',
            productCount: 310,
            status: 'Inactive',
            lastUpdated: 'Sep 15, 2023',
            icon: '👕',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600'
        },
        {
            id: 'CAT-005',
            name: 'Office Supplies',
            description: 'Paper, ink, pens',
            productCount: 89,
            status: 'Active',
            lastUpdated: 'Oct 25, 2023',
            icon: '🖨️',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600'
        },
    ];

    const totalResults = 12;
    const resultsPerPage = 4;

    // Handle create category
    const handleCreateCategory = () => {
        setIsModalOpen(true);
        setFormData({ name: '' });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.name.trim()) {
            alert('Please enter a category name');
            return;
        }

        try {
            // TODO: Replace with actual API endpoint
            console.log('Sending to backend:', formData);

            // Example API call (uncomment when backend is ready):
            // const response = await fetch('/api/categories', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData)
            // });
            // const data = await response.json();

            // Close modal and reset form
            setIsModalOpen(false);
            setFormData({ name: '' });

            alert('Category created successfully!');
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Failed to create category');
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
                <Link to="/dashboard" className="hover:text-slate-900">Home</Link>
                <span>/</span>
                <Link to="/inventory/products" className="hover:text-slate-900">Inventory</Link>
                <span>/</span>
                <span className="text-slate-900 font-medium">Categories</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold text-slate-900">Category Management</h1>
                <p className="text-base text-slate-500">Manage and organize your product categories.</p>
            </div>

            {/* Search and Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-md w-full">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <button className="flex items-center gap-2 h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">sort</span>
                        Sort
                    </button>
                    <button className="flex items-center gap-2 h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">filter_list</span>
                        Filter
                    </button>
                    <button
                        onClick={handleCreateCategory}
                        className="flex items-center gap-2 h-11 px-4 rounded-lg bg-primary text-sm font-bold text-white hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
                    >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Add Category
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Category Name
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Product Count
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Last Updated
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.iconBg}`}>
                                                <span className="text-2xl">{category.icon}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-slate-900">{category.name}</span>
                                                <span className="text-xs text-slate-500">ID: {category.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">{category.description}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-900">{category.productCount}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${category.status === 'Active'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${category.status === 'Active' ? 'bg-green-600' : 'bg-slate-400'
                                                }`}></span>
                                            {category.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">{category.lastUpdated}</span>
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
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Create Category Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900">Add New Category</h2>
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
                                {/* Category Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                        Category Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Electronics"
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
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryManagement;
