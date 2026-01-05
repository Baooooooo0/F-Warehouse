import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductAdd = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        barcode: '',
        description: '',
        isActive: true,
        category: [],
        warehouseId: '',
        quantity: 150,
        supplier: '',
        basePrice: '',
        costPrice: '',
        discount: '',
        images: []
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleQuantityChange = (delta) => {
        setFormData(prev => ({
            ...prev,
            quantity: Math.max(0, prev.quantity + delta)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.name || !formData.warehouseId) {
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

            alert('Product created successfully!');
            navigate('/inventory/products');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product');
        }
    };

    const handleCancel = () => {
        navigate('/inventory/products');
    };

    const addCategory = (categoryName) => {
        if (!formData.category.includes(categoryName)) {
            setFormData(prev => ({
                ...prev,
                category: [...prev.category, categoryName]
            }));
        }
    };

    const removeCategory = (categoryName) => {
        setFormData(prev => ({
            ...prev,
            category: prev.category.filter(cat => cat !== categoryName)
        }));
    };

    return (
        <div className="flex flex-col gap-6 pb-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleCancel}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined text-slate-600">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
                        <p className="text-sm text-slate-500">Inventory Management &gt; Products &gt; New</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[20px]">save</span>
                        Save Product
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Basic Information & Media */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Basic Information</h2>
                                <p className="text-sm text-slate-500">Enter the primary details for the product identification.</p>
                            </div>
                            <span className="material-symbols-outlined text-primary text-[24px]">inventory_2</span>
                        </div>

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
                                    placeholder="e.g., Wireless Noise-Cancelling Headphones"
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* SKU & Barcode */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="sku" className="block text-sm font-medium text-slate-700 mb-2">
                                        SKU
                                    </label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">tag</span>
                                        <input
                                            type="text"
                                            id="sku"
                                            name="sku"
                                            value={formData.sku}
                                            onChange={handleInputChange}
                                            placeholder="e.g., WH-1000XM5"
                                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="barcode" className="block text-sm font-medium text-slate-700 mb-2">
                                        Barcode (ISBN/UPC)
                                    </label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">qr_code_scanner</span>
                                        <input
                                            type="text"
                                            id="barcode"
                                            name="barcode"
                                            value={formData.barcode}
                                            onChange={handleInputChange}
                                            placeholder="Scan or enter barcode"
                                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                                    Description
                                </label>
                                <div className="border border-slate-200 rounded-lg overflow-hidden">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-slate-200">
                                        <button type="button" className="p-1 hover:bg-slate-200 rounded">
                                            <span className="material-symbols-outlined text-[18px] text-slate-600">format_bold</span>
                                        </button>
                                        <button type="button" className="p-1 hover:bg-slate-200 rounded">
                                            <span className="material-symbols-outlined text-[18px] text-slate-600">format_italic</span>
                                        </button>
                                        <button type="button" className="p-1 hover:bg-slate-200 rounded">
                                            <span className="material-symbols-outlined text-[18px] text-slate-600">format_underlined</span>
                                        </button>
                                        <button type="button" className="p-1 hover:bg-slate-200 rounded">
                                            <span className="material-symbols-outlined text-[18px] text-slate-600">format_list_bulleted</span>
                                        </button>
                                        <button type="button" className="p-1 hover:bg-slate-200 rounded">
                                            <span className="material-symbols-outlined text-[18px] text-slate-600">link</span>
                                        </button>
                                    </div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe the product features, specifications, and key selling points..."
                                        rows="4"
                                        className="w-full px-4 py-3 focus:outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Media */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Product Media</h2>
                                <p className="text-sm text-slate-500">Upload images or videos of the product.</p>
                            </div>
                            <a href="#" className="text-sm text-primary font-medium hover:underline">Guidelines</a>
                        </div>

                        {/* Upload Area */}
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center mb-4">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-[24px]">cloud_upload</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                                    <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                </div>
                            </div>
                        </div>

                        {/* Image Thumbnails */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-20 h-20 bg-orange-200 rounded-lg overflow-hidden flex items-center justify-center">
                                <span className="text-4xl">🎧</span>
                                <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-slate-900 text-white text-[10px] font-medium rounded">Main</span>
                            </div>
                            <div className="w-20 h-20 bg-orange-200 rounded-lg overflow-hidden flex items-center justify-center">
                                <span className="text-4xl">🎧</span>
                            </div>
                            <button type="button" className="w-20 h-20 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors">
                                <span className="material-symbols-outlined text-slate-400 text-[24px]">add</span>
                            </button>
                        </div>
                    </div>

                    {/* Pricing Information */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Pricing Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="basePrice" className="block text-sm font-medium text-slate-700 mb-2">
                                    Base Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                                    <input
                                        type="number"
                                        id="basePrice"
                                        name="basePrice"
                                        value={formData.basePrice}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        className="w-full pl-7 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="costPrice" className="block text-sm font-medium text-slate-700 mb-2">
                                    Cost Price (COGS)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                                    <input
                                        type="number"
                                        id="costPrice"
                                        name="costPrice"
                                        value={formData.costPrice}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        className="w-full pl-7 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="discount" className="block text-sm font-medium text-slate-700 mb-2">
                                    Discount (%)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="discount"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                        max="100"
                                        className="w-full pr-7 pl-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Organization */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Organization</h2>

                        <div className="space-y-4">
                            {/* Active Status */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-900">Active Status</p>
                                    <p className="text-xs text-slate-500">Product visibility in store</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.isActive ? 'bg-primary' : 'bg-slate-300'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                                    onChange={(e) => {
                                        if (e.target.value) addCategory(e.target.value);
                                        e.target.value = '';
                                    }}
                                >
                                    <option value="">Select category...</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="New Arrival">New Arrival</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Stationery">Stationery</option>
                                </select>

                                {/* Selected Categories */}
                                {formData.category.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.category.map((cat, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                                            >
                                                {cat}
                                                <button
                                                    type="button"
                                                    onClick={() => removeCategory(cat)}
                                                    className="hover:text-blue-900"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Warehouse Location */}
                            <div>
                                <label htmlFor="warehouseId" className="block text-sm font-medium text-slate-700 mb-2">
                                    Warehouse Location <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">warehouse</span>
                                    <select
                                        id="warehouseId"
                                        name="warehouseId"
                                        value={formData.warehouseId}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                                        required
                                    >
                                        <option value="">Main Warehouse (NY)</option>
                                        <option value="1">North Logistics Center</option>
                                        <option value="2">West Warehouse</option>
                                        <option value="3">South Distribution</option>
                                        <option value="4">East Warehouse</option>
                                    </select>
                                </div>
                            </div>

                            {/* Quantity on Hand */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Quantity on Hand
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">remove</span>
                                    </button>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        className="flex-1 text-center px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        min="0"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">add</span>
                                    </button>
                                </div>
                            </div>

                            {/* Supplier */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Supplier
                                </label>
                                <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 text-sm font-medium">TC</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-900">TechCorp Inc.</p>
                                        <p className="text-xs text-slate-500">ID: SUP-006</p>
                                    </div>
                                    <button type="button" className="p-1 hover:bg-slate-100 rounded">
                                        <span className="material-symbols-outlined text-slate-400 text-[20px]">edit</span>
                                    </button>
                                </div>
                                <button type="button" className="w-full mt-2 text-sm text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                                    Change Supplier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductAdd;
