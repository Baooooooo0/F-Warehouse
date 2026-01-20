import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../../api/product.api';
import { categoryAPI } from '../../api/category.api';
import { warehouseAPI } from '../../api/warehouse.api';
import { useToast } from '../../components/Toast/Toast';

const LowStockProducts = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [warehouseFilter, setWarehouseFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    // State cho modal nhập hàng
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderQuantity, setOrderQuantity] = useState('');
    const [orderLoading, setOrderLoading] = useState(false);

    const toast = useToast();

    const THRESHOLD = 100; // Ngưỡng mặc định cho hàng tồn kho thấp

    useEffect(() => {
        fetchCategories();
        fetchWarehouses();
    }, []);

    useEffect(() => {
        fetchLowStockProducts();
    }, [searchQuery, categoryFilter, warehouseFilter, statusFilter, currentPage]);

    const fetchCategories = async () => {
        try {
            const response = await categoryAPI.getAll({ isActive: true });
            if (response.code === 'success') {
                setCategories(response.data || []);
            }
        } catch (error) {
            console.error('Lỗi khi tải danh mục:', error);
        }
    };

    const fetchWarehouses = async () => {
        try {
            const response = await warehouseAPI.getAll();
            if (response.code === 'success') {
                setWarehouses(response.data || []);
            }
        } catch (error) {
            console.error('Lỗi khi tải kho hàng:', error);
        }
    };

    const fetchLowStockProducts = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
            };

            if (searchQuery) params.search = searchQuery;
            if (warehouseFilter !== 'all') params.warehouseId = warehouseFilter;
            if (categoryFilter !== 'all') params.categoryId = categoryFilter;

            const response = await productAPI.getAll(params);

            if (response.code === 'success') {
                // Lọc sản phẩm có số lượng < THRESHOLD
                let filtered = (response.data || []).filter(p => p.quantity < THRESHOLD);

                // Áp dụng bộ lọc trạng thái
                if (statusFilter === 'critical') {
                    filtered = filtered.filter(p => p.quantity > 0 && p.quantity <= 10);
                } else if (statusFilter === 'low') {
                    filtered = filtered.filter(p => p.quantity > 10 && p.quantity < THRESHOLD);
                } else if (statusFilter === 'depleted') {
                    filtered = filtered.filter(p => p.quantity === 0);
                }

                setLowStockProducts(filtered);
            }
        } catch (error) {
            console.error('Lỗi khi tải sản phẩm tồn kho thấp:', error);
            setLowStockProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const getProductStatus = (quantity) => {
        if (quantity === 0) {
            return { text: 'Hết hàng', color: 'bg-red-100 text-red-700' };
        } else if (quantity <= 10) {
            return { text: 'Nghiêm trọng', color: 'bg-red-100 text-red-700' };
        } else {
            return { text: 'Tồn kho thấp', color: 'bg-orange-100 text-orange-700' };
        }
    };

    const handleOpenOrderModal = (product) => {
        setSelectedProduct(product);
        setOrderQuantity('');
        setShowOrderModal(true);
    };

    const handleCloseOrderModal = () => {
        setShowOrderModal(false);
        setSelectedProduct(null);
        setOrderQuantity('');
    };

    const handleOrderSubmit = async () => {
        if (!orderQuantity || Number(orderQuantity) <= 0) {
            toast.warning('Vui lòng nhập số lượng hợp lệ');
            return;
        }

        try {
            setOrderLoading(true);
            const response = await productAPI.orderItem(selectedProduct.id, Number(orderQuantity));

            if (response.code === 'success') {
                toast.success(response.message || 'Nhập hàng thành công!');
                handleCloseOrderModal();
                fetchLowStockProducts(); // Refresh danh sách
            } else {
                toast.error(response.message || 'Có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Lỗi khi nhập hàng:', error);
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi nhập hàng');
        } finally {
            setOrderLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500">
                <Link to="/inventory/products" className="hover:text-slate-900">Kho hàng</Link>
                <span>›</span>
                <Link to="/inventory/products" className="hover:text-slate-900">Sản phẩm</Link>
                <span>›</span>
                <span className="text-primary font-medium">Tồn kho thấp</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold text-slate-900">Tất cả sản phẩm tồn kho thấp</h1>
                <p className="text-base text-slate-500">
                    Xem tất cả sản phẩm hiện đang dưới ngưỡng tồn kho thấp ({THRESHOLD}) hoặc đã hết hàng. Ưu tiên nhập hàng dựa trên trạng thái.
                </p>
            </div>



            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="relative flex-1 max-w-md w-full">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên sản phẩm, SKU..."
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
                        <option value="all">Tất cả danh mục</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={warehouseFilter}
                        onChange={(e) => setWarehouseFilter(e.target.value)}
                        className="h-11 px-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                    >
                        <option value="all">Tất cả kho hàng</option>
                        {warehouses.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                                {warehouse.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-11 px-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="critical">Nghiêm trọng</option>
                        <option value="low">Tồn kho thấp</option>
                        <option value="depleted">Hết hàng</option>
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
                                    Hình ảnh
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Tên sản phẩm
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Danh mục
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Kho hàng
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    SL
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Ngưỡng
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                                        Đang tải sản phẩm tồn kho thấp...
                                    </td>
                                </tr>
                            ) : lowStockProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                                        Không tìm thấy sản phẩm tồn kho thấp
                                    </td>
                                </tr>
                            ) : (
                                lowStockProducts.map((product) => {
                                    const status = getProductStatus(product.quantity);
                                    return (
                                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 overflow-hidden">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="material-symbols-outlined text-slate-400">inventory_2</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-slate-900">{product.name}</span>
                                                    <span className="text-xs text-slate-500">ID: {product.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {product.categoryIds && product.categoryIds.length > 0 ? (
                                                        product.categoryIds.map((cat, idx) => (
                                                            <span key={idx} className="text-sm text-slate-600">
                                                                {cat.categoryName}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-slate-400">Không có danh mục</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-600">{product.warehouseName}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-sm font-bold ${product.quantity === 0 ? 'text-red-600' : 'text-slate-900'}`}>
                                                    {product.quantity}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-600">{THRESHOLD}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${status.text === 'Nghiêm trọng' || status.text === 'Hết hàng' ? 'bg-red-600' : 'bg-orange-600'}`}></span>
                                                    {status.text}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleOpenOrderModal(product)}
                                                        className="px-3 py-1.5 text-xs font-bold text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors"
                                                    >
                                                        Đặt thêm
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
                        Đang hiển thị {lowStockProducts.length} sản phẩm tồn kho thấp (ngưỡng: {THRESHOLD})
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === 1}
                        >
                            Trước
                        </button>
                        <button className="min-w-[40px] h-10 px-3 rounded-lg bg-primary text-sm font-semibold text-white">
                            1
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-700 rounded-lg transition-colors">
                            Sau
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal nhập hàng */}
            {showOrderModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Nhập thêm hàng</h3>
                            <button
                                onClick={handleCloseOrderModal}
                                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-500">close</span>
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-slate-600 mb-2">Sản phẩm:</p>
                            <p className="font-semibold text-slate-900">{selectedProduct?.name}</p>
                            <p className="text-sm text-slate-500">Số lượng hiện tại: {selectedProduct?.quantity}</p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Số lượng nhập thêm <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={orderQuantity}
                                onChange={(e) => setOrderQuantity(e.target.value)}
                                placeholder="Nhập số lượng..."
                                min="1"
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleCloseOrderModal}
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                disabled={orderLoading}
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleOrderSubmit}
                                className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                disabled={orderLoading}
                            >
                                {orderLoading ? 'Đang xử lý...' : 'Xác nhận'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LowStockProducts;
