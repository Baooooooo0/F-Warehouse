import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/dashboard.css';
import { dashboardAPI } from '../../api/dashboard.api';
import { productAPI } from '../../api/product.api';

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalInventoryValue, seTtotalInventoryValue] = useState(0);
  const [totalLowQuantityProduct, setTotalLowQuantityProduct] = useState(0);
  const [totalWarehouse, setTotalWarehouse] = useState(0);
  const [lowStockItems, setLowStockItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editQuantity, setEditQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTotalProducts();
    fetchLowStockProducts();
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
      console.error('Error fetching total products:', error);
      setTotalProducts('8');
    } finally {
      setLoading(false);
    }
  };

  const fetchLowStockProducts = async () => {
    try {
      const response = await dashboardAPI.getLowStock();
      console.log('Low stock products response:', response.data);
      // Log first item to see all fields
      if (response.data && response.data.length > 0) {
        // console.log('📋 First product fields:', Object.keys(response.data[0]));
        // console.log('📊 First product data:', response.data[0]);
      }
      // response.data is the array of low stock products
      setLowStockItems(response.data || []);
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      setLowStockItems([]);
    }
  };

  const openEditModal = (product) => {
    // console.log('📋 Opening edit modal for product:', product);
    // console.log('🔍 Available fields:', Object.keys(product));
    // console.log('📊 Product ID:', product.id, 'Type:', typeof product.id);
    // console.log('🏢 Product warehouseId:', product.warehouseId);
    // console.log('📦 Product warehouse:', product.warehouse);
    setEditingProduct(product);
    setEditQuantity(product.quantity);
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
      console.log('🚀 Updating product:', editingProduct.id);
      console.log('🔍 ID Type:', typeof editingProduct.id);
      console.log('🔍 ID Value (raw):', JSON.stringify(editingProduct.id));
      console.log('🔍 ID Length:', String(editingProduct.id).length);
      console.log('📊 Product object:', editingProduct);

      // Create FormData with all required fields like ProductEdit does
      const submitData = new FormData();
      submitData.append('name', editingProduct.name || '');
      submitData.append('warehouseId', editingProduct.warehouseId || '');
      submitData.append('quantity', editQuantity);
      submitData.append('price', editingProduct.price || 0);
      submitData.append('threshold', editingProduct.threshold || 0);
      
      // Add categoryId if available
      if (editingProduct.categoryIds && editingProduct.categoryIds.length > 0) {
        const categoryIds = editingProduct.categoryIds.map(c => c.categoryId || c.id || c);
        submitData.append('categoryId', JSON.stringify(categoryIds));
        console.log('📦 CategoryId:', categoryIds);
      }
      
      console.log('📤 Submitting FormData to update product ID:', editingProduct.id);
      console.log('📝 Fields being sent:');
      console.log('  - name:', editingProduct.name);
      console.log('  - warehouseId:', editingProduct.warehouseId);
      console.log('  - quantity:', editQuantity);
      console.log('  - price:', editingProduct.price);
      console.log('  - threshold:', editingProduct.threshold);
      
      // Log all FormData entries
      console.log('📋 FormData entries:');
      for (let [key, value] of submitData.entries()) {
        console.log(`    ${key}: ${value}`);
      }
      
      const response = await productAPI.orderItem(editingProduct.id, editQuantity);
      console.log('✅ API Response:', response);

      if (response.code === 'success') {
        console.log('Product updated successfully');
        // Update the local state
        setLowStockItems(prevItems =>
          prevItems.map(item =>
            item.id === editingProduct.id ? { ...item, quantity: editQuantity } : item
          )
        );
        // Refresh total products
        fetchTotalProducts();
        closeEditModal();
        alert('Cập nhật số lượng thành công!');
      } else {
        console.error('❌ Response error:', response);
        alert(response.message || 'Cập nhật thất bại');
      }
    } catch (error) {
      console.error('💥 Error updating quantity:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      alert(error.response?.data?.message || 'Lỗi khi cập nhật số lượng');
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

  const bestSelling = [];

  const leastSelling = [];

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
                        <td className="px-6 py-4 font-medium text-slate-900">
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
                              <span>{item.name}</span>
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
                          ) : item.quantity <= item.threshold * 0.2 ? (
                            <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset bg-red-500/10 text-red-600 ring-red-600/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                              Nguy cấp
                            </span>
                          ) : item.quantity <= item.threshold * 0.5 ? (
                            <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset bg-orange-500/10 text-orange-600 ring-orange-600/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                              Sắp hết
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset bg-green-500/10 text-green-600 ring-green-600/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                              Bình thường
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => openEditModal(item)}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-300 focus:ring-2 focus:ring-primary focus:ring-offset-2">
                            Đặt thêm
                          </button>
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
                <div className="flex flex-col gap-4">
                  {bestSelling.map((product, index) => (
                    <div key={index} className="flex items-center gap-3 border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                      <div
                        className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-100 bg-cover bg-center"
                        style={{ backgroundImage: `url('${product.image}')` }}
                      />
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-medium text-slate-900">{product.name}</span>
                        <span className="text-xs text-slate-500">{product.units}</span>
                      </div>
                      <span className="text-sm font-bold text-green-600">{product.revenue}</span>
                    </div>
                  ))}
                </div>
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
                Cập nhật số lượng mới
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
                />
                <button
                  type="button"
                  onClick={() => setEditQuantity(editQuantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">Thay đổi: {editQuantity - editingProduct.quantity > 0 ? '+' : ''}{editQuantity - editingProduct.quantity}</p>
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
