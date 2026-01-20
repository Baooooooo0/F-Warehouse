import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../../api/product.api';
import { categoryAPI } from '../../api/category.api';
import { warehouseAPI } from '../../api/warehouse.api';
import { useToast } from '../../components/Toast/Toast';

const ProductAdd = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const toast = useToast();

    const [formData, setFormData] = useState({
        name: '',
        warehouseId: '',
        quantity: 0,
        price: '',
        threshold: '',
        categoryId: [],
        image: null,
    });

    useEffect(() => {
        fetchCategories();
        fetchWarehouses();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await categoryAPI.getAll({ isActive: true });
            if (response.code === 'success') {
                setCategories(response.data || []);
            }
        } catch (error) {
            // Silent fail
        }
    };

    const fetchWarehouses = async () => {
        try {
            const response = await warehouseAPI.getAll();
            if (response.code === 'success') {
                setWarehouses(response.data || []);
            }
        } catch (error) {
            // Silent fail
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleQuantityChange = (delta) => {
        setFormData(prev => ({
            ...prev,
            quantity: Math.max(0, prev.quantity + delta)
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
        }
    };

    const addCategory = (categoryId) => {
        if (categoryId && !formData.categoryId.includes(Number(categoryId))) {
            setFormData(prev => ({
                ...prev,
                categoryId: [...prev.categoryId, Number(categoryId)]
            }));
        }
    };

    const removeCategory = (categoryId) => {
        setFormData(prev => ({
            ...prev,
            categoryId: prev.categoryId.filter(id => id !== categoryId)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.warehouseId) {
            toast.warning('Vui lòng điền đầy đủ các trường bắt buộc (Tên và Kho hàng)');
            return;
        }

        try {
            setLoading(true);

            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('warehouseId', formData.warehouseId);
            submitData.append('quantity', formData.quantity);
            submitData.append('price', formData.price || 0);
            if (formData.threshold !== '') {
                submitData.append('threshold', formData.threshold);
            }

            if (formData.categoryId.length > 0) {
                const categoryIdJson = JSON.stringify(formData.categoryId);
                submitData.append('categoryId', categoryIdJson);
            }

            if (formData.image) {
                submitData.append('image', formData.image);
            }

            const response = await productAPI.create(submitData);

            if (response.code === 'success') {
                toast.success('Tạo sản phẩm thành công!');
                navigate('/inventory/products');
            } else {
                toast.error(response.message || 'Không thể tạo sản phẩm');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Không thể tạo sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/inventory/products');
    };

    const getSelectedCategoryNames = () => {
        return formData.categoryId.map(id => {
            const cat = categories.find(c => c.id === id);
            return cat ? cat.name : '';
        }).filter(Boolean);
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
                        <h1 className="text-2xl font-bold text-slate-900">Thêm Sản Phẩm Mới</h1>
                        <p className="text-sm text-slate-500">Quản lý Kho &gt; Sản phẩm &gt; Thêm mới</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        disabled={loading}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                        disabled={loading}
                    >
                        <span className="material-symbols-outlined text-[20px]">save</span>
                        {loading ? 'Đang lưu...' : 'Lưu Sản Phẩm'}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Basic Information */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Thông Tin Cơ Bản</h2>
                                <p className="text-sm text-slate-500">Nhập thông tin chi tiết để nhận dạng sản phẩm.</p>
                            </div>
                            <span className="material-symbols-outlined text-primary text-[24px]">inventory_2</span>
                        </div>

                        <div className="space-y-4">
                            {/* Product Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                    Tên Sản Phẩm <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="VD: Tai nghe không dây chống ồn"
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
                                    Giá
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₫</span>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        className="w-full pl-7 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Media */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Hình Ảnh Sản Phẩm</h2>
                                <p className="text-sm text-slate-500">Tải lên hình ảnh của sản phẩm.</p>
                            </div>
                        </div>

                        {/* Upload Area */}
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <label htmlFor="image" className="cursor-pointer flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-[24px]">cloud_upload</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">Nhấp để tải lên hoặc kéo thả</p>
                                    <p className="text-xs text-slate-500">PNG, JPG hoặc GIF (tối đa 10MB)</p>
                                </div>
                            </label>
                        </div>

                        {/* Image Preview */}
                        {formData.image && (
                            <div className="mt-4 flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <span className="material-symbols-outlined text-green-600">check_circle</span>
                                <span className="text-sm text-slate-700 flex-1">{formData.image.name}</span>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                                    className="text-slate-400 hover:text-red-600"
                                >
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Organization */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Phân Loại</h2>

                        <div className="space-y-4">
                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                                    Danh Mục
                                </label>
                                <select
                                    id="category"
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            addCategory(e.target.value);
                                            e.target.value = '';
                                        }
                                    }}
                                >
                                    <option value="">Chọn danh mục...</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Selected Categories */}
                                {formData.categoryId.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {getSelectedCategoryNames().map((name, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                                            >
                                                {name}
                                                <button
                                                    type="button"
                                                    onClick={() => removeCategory(formData.categoryId[index])}
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
                                    Vị Trí Kho <span className="text-red-500">*</span>
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
                                        <option value="">Chọn kho...</option>
                                        {warehouses.map((warehouse) => (
                                            <option key={warehouse.id} value={warehouse.id}>
                                                {warehouse.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Quantity on Hand */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Số Lượng Tồn Kho
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

                            {/* Threshold - Low Stock Warning */}
                            <div>
                                <label htmlFor="threshold" className="block text-sm font-medium text-slate-700 mb-2">
                                    Ngưỡng cảnh báo
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">warning</span>
                                    <input
                                        type="number"
                                        id="threshold"
                                        name="threshold"
                                        value={formData.threshold}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: 10"
                                        min="0"
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Khi số lượng tồn thấp hơn ngưỡng này, sản phẩm sẽ được đánh dấu là sắp hết hàng.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductAdd;
