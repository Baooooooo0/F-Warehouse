import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryAPI } from '../../api/category.api';

const CategoryManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageQuantity, setPageQuantity] = useState(1);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    // Fetch categories on mount and when search/page changes
    useEffect(() => {
        fetchCategories();
    }, [currentPage, searchQuery]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
            };

            if (searchQuery) params.search = searchQuery;

            const response = await categoryAPI.getAll(params);

            if (response.code === 'success') {
                setCategories(response.data || []);
                setPageQuantity(response.pageQuantity || 1);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle create category
    const handleCreateCategory = () => {
        setIsModalOpen(true);
        setFormData({ name: '', description: '' });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.name.trim()) {
            alert('Please enter a category name');
            return;
        }

        if (!formData.description.trim()) {
            alert('Please enter a category description');
            return;
        }

        try {
            console.log('🚀 Creating category...');
            console.log('📝 Form data:', formData);
            console.log('📤 Sending to API:', { name: formData.name });

            const response = await categoryAPI.create(formData);
            console.log('✅ API Response:', response);

            if (response.code === 'success') {
                // Close modal and reset form
                setIsModalOpen(false);
                setFormData({ name: '', description: '' });

                // Refresh categories list
                fetchCategories();

                alert('Category created successfully!');
            } else {
                console.error('❌ Response error:', response);
                alert(response.message || 'Failed to create category');
            }
        } catch (error) {
            console.error('💥 Error creating category:', error);
            console.error('Error response:', error.response);
            console.error('Error data:', error.response?.data);
            console.error('Error message:', error.response?.data?.message);
            alert(error.response?.data?.message || 'Failed to create category');
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

    // Handle lock/unlock category
    const handleLockCategory = async (id, currentStatus) => {
        try {
            const response = await categoryAPI.lock(id, currentStatus);
            if (response.code === 'success') {
                fetchCategories(); // Refresh the list
            } else {
                alert(response.message || 'Failed to update category status');
            }
        } catch (error) {
            console.error('Error locking category:', error);
            alert('Failed to update category status');
        }
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
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                <div className="flex gap-3 items-center">
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
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Created By
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Updated By
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
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                                        Loading categories...
                                    </td>
                                </tr>
                            ) : categories.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                                        No categories found
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-slate-900">{category.name}</span>
                                                <span className="text-xs text-slate-500">ID: {category.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${category.isActive
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${category.isActive ? 'bg-green-600' : 'bg-slate-400'
                                                    }`}></span>
                                                {category.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">{category.createdBy}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">{category.updatedBy}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">{category.updatedAt}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleLockCategory(category.id, category.isActive)}
                                                    className={`p-2 rounded-lg transition-colors ${category.isActive
                                                        ? 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                                                        : 'text-slate-400 hover:text-green-600 hover:bg-green-50'
                                                        }`}
                                                    title={category.isActive ? 'Deactivate' : 'Activate'}
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        {category.isActive ? 'lock' : 'lock_open'}
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
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

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Gadgets, phones & laptops"
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
