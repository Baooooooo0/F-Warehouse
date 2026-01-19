import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { warehouseAPI } from '../../api/warehouse.api';
import { useToast } from '../../components/Toast/Toast';
import '../../styles/warehouse.css';

const WarehouseList = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageQuantity, setPageQuantity] = useState(1);

  // Fetch warehouses on mount and when filters change
  useEffect(() => {
    fetchWarehouses();
  }, [currentPage, searchTerm, filterStatus]);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
      };

      if (searchTerm) params.search = searchTerm;
      if (filterStatus === 'active') params.isActive = 'true';
      else if (filterStatus === 'inactive') params.isActive = 'false';

      const response = await warehouseAPI.getAll(params);

      if (response.code === 'success') {
        setWarehouses(response.data || []);
        setPageQuantity(response.pageQuantity || 1);
      }
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      toast.error('Không thể tải danh sách kho hàng');
      setWarehouses([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle lock/unlock warehouse
  const handleLockWarehouse = async (id, currentStatus) => {
    try {
      const response = await warehouseAPI.lock(id, currentStatus);
      if (response.code === 'success') {
        toast.success(currentStatus ? 'Tạm ngưng kho hàng thành công!' : 'Kích hoạt kho hàng thành công!');
        fetchWarehouses(); // Refresh the list
      } else {
        toast.error(response.message || 'Không thể cập nhật trạng thái kho hàng');
      }
    } catch (error) {
      console.error('Error locking warehouse:', error);
      toast.error('Không thể cập nhật trạng thái kho hàng');
    }
  };

  // Filter warehouses based on search (for client-side filtering)
  const filteredWarehouses = warehouses;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/dashboard" className="hover:text-slate-900">Trang chủ</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Kho hàng</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-slate-900">Danh sách kho hàng</h1>
          <p className="text-base text-slate-500">Quản lý các kho hàng trong hệ thống.</p>
        </div>
        <Link
          to="/warehouses/create"
          className="flex items-center gap-2 h-11 px-4 rounded-lg bg-primary text-sm font-bold text-white hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Thêm kho hàng
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm shadow-sm"
            placeholder="Tìm kho theo tên hoặc địa điểm"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
          <button
            onClick={() => {
              setFilterStatus('all');
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === 'all'
                ? 'bg-primary/10 border border-primary/20 text-primary'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
          >
            Tất cả trạng thái
          </button>
          <button
            onClick={() => {
              setFilterStatus('active');
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === 'active'
                ? 'bg-primary/10 border border-primary/20 text-primary'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
          >
            Đang hoạt động
          </button>
          <button
            onClick={() => {
              setFilterStatus('inactive');
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === 'inactive'
                ? 'bg-primary/10 border border-primary/20 text-primary'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
          >
            Ngưng hoạt động
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 w-16">Hình ảnh</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Tên kho</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Địa chỉ</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Người tạo</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Cập nhật</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Trạng thái</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : filteredWarehouses.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                    Không tìm thấy kho hàng nào
                  </td>
                </tr>
              ) : (
                filteredWarehouses.map((warehouse) => (
                  <tr key={warehouse.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6">
                      <div
                        className={`w-10 h-10 rounded-lg bg-cover bg-center shadow-sm flex items-center justify-center bg-slate-100 ${!warehouse.isActive ? 'grayscale opacity-70' : ''
                          }`}
                        style={warehouse.image ? { backgroundImage: `url('${warehouse.image}')` } : {}}
                      >
                        {!warehouse.image && (
                          <span className="material-symbols-outlined text-slate-400">warehouse</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className={`text-sm font-semibold ${!warehouse.isActive ? 'text-slate-500' : 'text-slate-900'
                          }`}>
                          {warehouse.name}
                        </span>
                        <span className="text-xs text-slate-500">ID: {warehouse.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`flex items-center gap-1.5 ${!warehouse.isActive ? 'text-slate-500' : 'text-slate-600'
                        }`}>
                        <span className="material-symbols-outlined text-[16px] text-slate-400">location_on</span>
                        <span className="text-sm">{warehouse.address || 'Chưa có địa chỉ'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-600">{warehouse.createdBy || '-'}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-600">{warehouse.updatedAt || '-'}</span>
                    </td>
                    <td className="py-4 px-6">
                      {warehouse.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Đang hoạt động
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          Ngưng hoạt động
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => navigate(`/warehouses/edit/${warehouse.id}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          onClick={() => handleLockWarehouse(warehouse.id, warehouse.isActive)}
                          className={`p-1.5 rounded-lg transition-colors ${warehouse.isActive
                              ? 'text-slate-400 hover:text-red-500 hover:bg-red-500/10'
                              : 'text-slate-400 hover:text-green-500 hover:bg-green-500/10'
                            }`}
                          title={warehouse.isActive ? 'Tạm ngưng' : 'Kích hoạt'}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {warehouse.isActive ? 'lock' : 'lock_open'}
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
        <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Trang {currentPage} / {pageQuantity}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              onClick={() => setCurrentPage(prev => Math.min(pageQuantity, prev + 1))}
              disabled={currentPage === pageQuantity}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseList;
