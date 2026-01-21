import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/dashboard.css';
import { dashboardAPI } from '../../api/dashboard.api';
import { productAPI } from '../../api/product.api';
import { productListAPI } from '../../api/warehouse.api';
import { useToast } from '../../components/Toast/Toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalInventoryValue, seTtotalInventoryValue] = useState(0);
  const [totalLowQuantityProduct, setTotalLowQuantityProduct] = useState(0);
  const [totalWarehouse, setTotalWarehouse] = useState(0);
  const [lowStockItems, setLowStockItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [bestSelling, setBestSelling] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editQuantity, setEditQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchTotalProducts();
    fetchLowStockProducts();
    fetchBestSellingProducts();
  }, []);

  const fetchTotalProducts = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getTotal();
      setTotalProducts(response.data.totalProduct);
      seTtotalInventoryValue(response.data.totalInventoryValue);
      setTotalLowQuantityProduct(response.data.totalLowQuantityProduct);
      setTotalWarehouse(response.data.totalWarehouse);
    } catch (error) {
      setTotalProducts('8');
    } finally {
      setLoading(false);
    }
  };

  const fetchLowStockProducts = async () => {
    try {
      const response = await dashboardAPI.getLowStock();
      setLowStockItems(response.data || []);
    } catch (error) {
      setLowStockItems([]);
    }
  };

  const fetchBestSellingProducts = async () => {
    try {
      const params = {
        search: '',
        quantity: 'desc',
        isActive: '',
        warehouseId: '',
        categoryId: '',
        page: 1
      };
      const response = await productListAPI.getList(params);
      const products = response.data || [];
      // Display top 5 products
      setBestSelling(products.slice(0, 5).map(product => ({
        id: product.id,
        name: product.name,
        image: product.image,
        units: `${product.quantity} đơn vị`,
        revenue: `₫${(product.price * product.quantity).toLocaleString('vi-VN')}`
      })));
    } catch (error) {
      setBestSelling([]);
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditQuantity(0); // Mặc định là 0, user nhập bao nhiêu thì đặt thêm bấy nhiêu
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    setEditQuantity(0);
  };

  const handleSaveQuantity = async () => {
    if (!editingProduct) return;

    try {
      setSubmitting(true);

      const response = await productAPI.orderItem(editingProduct.id, editQuantity);

      if (response.code === 'success') {
        // Refresh lại danh sách tồn kho thấp từ server để cập nhật chính xác
        fetchLowStockProducts();
        fetchTotalProducts();
        closeEditModal();
        toast.success('Cập nhật số lượng thành công!');
      } else {
        toast.error(response.message || 'Cập nhật thất bại');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi cập nhật số lượng');
    } finally {
      setSubmitting(false);
    }
  };

  const statsCards = [
    {
      title: 'Tổng giá trị tồn kho',
      value: totalInventoryValue,
      change: '+12%',
      changeType: 'positive',
      icon: 'trending_up',
      iconColor: 'text-green-500'
    },
    {
      title: 'Kho đang hoạt động',
      value: totalWarehouse,
      change: 'Ổn định',
      changeType: 'neutral',
      icon: 'warehouse',
      iconColor: 'text-primary'
    },
    {
      title: 'Mặt hàng sắp hết',
      value: totalLowQuantityProduct,
      change: '+5%',
      changeType: 'warning',
      icon: 'warning',
      iconColor: 'text-orange-500'
    },
    {
      title: 'Tổng sản phẩm',
      value: totalProducts,
      change: '-2%',
      changeType: 'negative',
      icon: 'local_shipping',
      iconColor: 'text-blue-400'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat, index) => (
            <div key={index} className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <span className={`material-symbols-outlined ${stat.iconColor}`}>{stat.icon}</span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <span className={`mb-1 text-xs font-medium ${stat.changeType === 'positive' ? 'text-green-500' :
                  stat.changeType === 'warning' ? 'text-orange-500' :
                    stat.changeType === 'negative' ? 'text-red-400' :
                      'text-slate-500'
                  }`}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* Low Stock Alerts Table */}
          <div className="flex flex-col gap-4 xl:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="material-symbols-outlined text-orange-500">warning</span>
                Cảnh báo tồn kho thấp
              </h3>
              <Link to="/inventory/products/low-stock" className="group flex items-center gap-1 text-sm font-medium text-primary hover:text-blue-600 transition-colors">
                Xem tất cả cảnh báo
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_right_alt</span>
              </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-medium">Tên sản phẩm</th>
                      <th className="px-6 py-4 font-medium">Số lượng</th>
                      <th className="px-6 py-4 font-medium">Ngưỡng</th>
                      <th className="px-6 py-4 font-medium">Trạng thái</th>
                      <th className="px-6 py-4 font-medium text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {lowStockItems.map((item, index) => (
                      <tr key={index} className="group hover:bg-slate-50 transition-colors">
                        <td
                          onClick={() => navigate(`/chart?id=${item.id}`)}
                          className="px-6 py-4 font-medium text-slate-900 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <div
                                className="h-10 w-10 rounded-lg bg-slate-100 bg-cover bg-center border border-slate-200"
                                style={{ backgroundImage: `url('${item.image}')` }}
                              />
                            )}
                            {!item.image && (
                              <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-400">image</span>
                              </div>
                            )}
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="hover:text-primary transition-colors">{item.name}</span>
                                <span className="material-symbols-outlined text-slate-400 text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                              </div>
                              <span className="text-xs font-normal text-slate-500">ID: {item.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-base font-bold text-slate-900">{item.quantity}</span>
                          <span className="text-xs text-slate-500 ml-1">đơn vị</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          <span className="text-sm">{item.threshold}</span>
                        </td>
                        <td className="px-6 py-4">
                          {item.quantity === 0 ? (
                            <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset bg-red-500/10 text-red-600 ring-red-600/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                              Hết hàng
                            </span>
                          ) : item.quantity === item.threshold ? (
                            <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset bg-orange-500/10 text-orange-600 ring-orange-600/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                              Sắp hết
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset bg-yellow-500/10 text-yellow-600 ring-yellow-600/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                              Nguy cấp
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/chart?id=${item.id}`);
                              }}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                              title="Xem biểu đồ"
                            >
                              <span className="material-symbols-outlined text-[16px]">show_chart</span>
                              Biểu đồ
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(item);
                              }}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-300 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                              Đặt thêm
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-6 xl:col-span-1">
            {/* Best Selling Products */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-900">Sản phẩm bán chạy</h3>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                {bestSelling.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                    <span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
                    <p className="text-sm">Chưa có dữ liệu</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {bestSelling.map((product, index) => (
                      <button
                        key={index}
                        onClick={() => navigate(`/chart?id=${product.id}`)}
                        className="flex items-center gap-3 border-b border-slate-200 pb-3 last:border-0 last:pb-0 hover:bg-slate-50 px-2 py-1 rounded-lg transition-colors text-left w-full"
                      >
                        {product.image ? (
                          <div
                            className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-100 bg-cover bg-center border border-slate-200"
                            style={{ backgroundImage: `url('${product.image}')` }}
                          />
                        ) : (
                          <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-400 text-[20px]">image</span>
                          </div>
                        )}
                        <div className="flex flex-1 flex-col">
                          <span className="text-sm font-medium text-slate-900">{product.name}</span>
                          <span className="text-xs text-slate-500">{product.units}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-green-600">{product.revenue}</span>
                          <span className="material-symbols-outlined text-slate-400 text-[16px]">chevron_right</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Edit Quantity Modal */}
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Cập nhật số lượng</h2>
              <button
                onClick={closeEditModal}
                className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Product Info */}
            <div className="mb-6 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                {editingProduct.image && (
                  <div
                    className="h-12 w-12 rounded-lg bg-slate-100 bg-cover bg-center border border-slate-200"
                    style={{ backgroundImage: `url('${editingProduct.image}')` }}
                  />
                )}
                {!editingProduct.image && (
                  <div className="h-12 w-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400">image</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <p className="font-medium text-slate-900">{editingProduct.name}</p>
                  <p className="text-sm text-slate-500">ID: {editingProduct.id}</p>
                </div>
              </div>
            </div>

            {/* Quantity Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Số lượng hiện tại: <span className="text-primary font-bold">{editingProduct.quantity}</span>
              </label>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Số lượng đặt thêm
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditQuantity(Math.max(0, editQuantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
                <input
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(Math.max(0, Number(e.target.value)))}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  min="0"
                  placeholder="Nhập số lượng..."
                />
                <button
                  type="button"
                  onClick={() => setEditQuantity(editQuantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">Sau khi đặt: <span className="font-bold text-green-600">{editingProduct.quantity + editQuantity}</span> đơn vị</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={closeEditModal}
                disabled={submitting}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveQuantity}
                disabled={submitting}
                className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    Lưu
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
