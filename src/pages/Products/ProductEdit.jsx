import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { productAPI } from '../../api/product.api';
import { categoryAPI } from '../../api/category.api';
import { warehouseAPI } from '../../api/warehouse.api';
import { useToast } from '../../components/Toast/Toast';

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetchingProduct, setFetchingProduct] = useState(true);
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
        currentImage: '', // To display existing image
    });

    useEffect(() => {
        fetchProductDetails();
        fetchCategories();
        fetchWarehouses();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            setFetchingProduct(true);
            console.log('🔍 Fetching product details for ID:', id);

            const response = await productAPI.getById(id);
            console.log('📦 Product API Response:', response);

            if (response.code === 'success' && response.data && response.data.length > 0) {
                const product = response.data[0];
                console.log('✨ Product data:', product);

                // Pre-fill form with product data
                setFormData({
                    name: product.name || '',
                    warehouseId: product.warehouseId || '',
                    quantity: product.quantity || 0,
                    price: product.price || '',
                    threshold: product.threshold || '',
                    categoryId: product.categoryIds ? product.categoryIds.map(c => c.categoryId) : [],
                    image: null,
                    currentImage: product.image || '',
                });

                console.log('✅ Form pre-filled with product data');
            } else {
                toast.error('Không tìm thấy sản phẩm');
                navigate('/inventory/products');
            }
        } catch (error) {
            console.error('💥 Error fetching product:', error);
            toast.error('Không thể tải thông tin sản phẩm');
            navigate('/inventory/products');
        } finally {
            setFetchingProduct(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryAPI.getAll({});
            if (response.code === 'success') {
                setCategories(response.data || []);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchWarehouses = async () => {
        try {
            const response = await warehouseAPI.getAll({});
            if (response.code === 'success') {
                setWarehouses(response.data || []);
            }
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
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
            console.log('🚀 Updating product...');
            console.log('📝 Form data:', formData);

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
                console.log('📦 CategoryId JSON:', categoryIdJson);
            }

            // Only append image if new image selected
            if (formData.image) {
                submitData.append('image', formData.image);
                console.log('🖼️ New image file:', formData.image.name);
            } else {
                console.log('📷 Keeping existing image');
            }

            console.log('📤 Submitting FormData to update product ID:', id);

            const response = await productAPI.update(id, submitData);
            console.log('✅ API Response:', response);

            if (response.code === 'success') {
                toast.success('Cập nhật sản phẩm thành công!');
                navigate('/inventory/products');
            } else {
                console.error('❌ Response error:', response);
                toast.error(response.message || 'Không thể cập nhật sản phẩm');
            }
        } catch (error) {
            console.error('💥 Error updating product:', error);
            console.error('Error response:', error.response);
            console.error('Error data:', error.response?.data);
            toast.error(error.response?.data?.message || 'Không thể cập nhật sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (delta) => {
        setFormData(prev => ({
            ...prev,
            quantity: Math.max(0, prev.quantity + delta)
        }));
    };

    if (fetchingProduct) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-slate-600">Đang tải thông tin sản phẩm...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500">
                <Link to="/dashboard" className="hover:text-slate-900">Trang chủ</Link>
                <span>/</span>
                <Link to="/inventory/products" className="hover:text-slate-900">Kho hàng</Link>
                <span>/</span>
                <Link to="/inventory/products" className="hover:text-slate-900">Sản phẩm</Link>
                <span>/</span>
                <span className="text-slate-900 font-medium">Chỉnh sửa sản phẩm</span>
            </nav>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold text-slate-900">Chỉnh sửa sản phẩm</h1>
                    <p className="text-base text-slate-500">Cập nhật thông tin sản phẩm và chi tiết tồn kho.</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        to="/inventory/products"
                        className="flex items-center gap-2 h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                        Hủy
                    </Link>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 h-11 px-4 rounded-lg bg-primary text-sm font-bold text-white hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                                Đang cập nhật...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[20px]">save</span>
                                Cập nhật sản phẩm
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Basic Information */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Thông tin cơ bản</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                    Tên sản phẩm <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Nhập tên sản phẩm"
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
                                    Giá
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Media */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Hình ảnh sản phẩm</h2>
                        <div className="space-y-4">
                            {/* Current Image Preview */}
                            {formData.currentImage && !formData.image && (
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-slate-700 mb-2">Hình ảnh hiện tại:</p>
                                    <img
                                        src={formData.currentImage}
                                        alt="Current product"
                                        className="w-32 h-32 object-cover rounded-lg border border-slate-200"
                                    />
                                </div>
                            )}

                            {/* New Image Preview */}
                            {formData.image && (
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-slate-700 mb-2">Hình ảnh mới:</p>
                                    <img
                                        src={URL.createObjectURL(formData.image)}
                                        alt="New product"
                                        className="w-32 h-32 object-cover rounded-lg border border-slate-200"
                                    />
                                </div>
                            )}

                            <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-primary transition-colors">
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <label htmlFor="image" className="cursor-pointer">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary text-[24px]">cloud_upload</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">
                                                {formData.image ? 'Thay đổi hình ảnh' : 'Nhấp để tải lên hình ảnh mới'}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">PNG, JPG hoặc GIF (tối đa 10MB)</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Organization */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Phân loại</h2>

                        <div className="space-y-4">
                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                                    Danh mục
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
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {formData.categoryId.map((catId) => {
                                            const category = categories.find(c => c.id === catId);
                                            return category ? (
                                                <span
                                                    key={catId}
                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                                >
                                                    {category.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeCategory(catId)}
                                                        className="hover:bg-primary/20 rounded-full p-0.5"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                                    </button>
                                                </span>
                                            ) : null;
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Warehouse */}
                            <div>
                                <label htmlFor="warehouseId" className="block text-sm font-medium text-slate-700 mb-2">
                                    Vị trí kho hàng <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="warehouseId"
                                    name="warehouseId"
                                    value={formData.warehouseId}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                                    required
                                >
                                    <option value="">Chọn kho hàng...</option>
                                    {warehouses.map((warehouse) => (
                                        <option key={warehouse.id} value={warehouse.id}>
                                            {warehouse.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Quantity */}
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-2">
                                    Số lượng tồn kho
                                </label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">remove</span>
                                    </button>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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

export default ProductEdit;
