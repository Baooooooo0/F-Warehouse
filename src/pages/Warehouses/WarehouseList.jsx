import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/warehouse.css';
import { warehouseAPI } from '../../api/warehouse.api';

const WarehouseList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        search: searchTerm,
        isActive: filterStatus === 'all' ? '' : filterStatus === 'active',
        page: 1
      };
      const response = await warehouseAPI.getAll(params);
      setWarehouses(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load warehouses');
      console.error('Error fetching warehouses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa kho hàng này?')) {
      return;
    }

    setDeleting(id);
    try {
      await warehouseAPI.delete(id);
      setWarehouses(warehouses.filter(w => w.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete warehouse');
      console.error('Error deleting warehouse:', err);
    } finally {
      setDeleting(null);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const filteredWarehouses = warehouses.filter(warehouse => {
    const matchesSearch = warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warehouse.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || warehouse.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 overflow-y-auto">
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
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
          <button
            onClick={() => handleFilterChange('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filterStatus === 'all'
                ? 'bg-primary/10 border border-primary/20 text-primary'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Tất cả trạng thái
            <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
          </button>
          <button
            onClick={() => handleFilterChange('active')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filterStatus === 'active'
                ? 'bg-primary/10 border border-primary/20 text-primary'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đang hoạt động
          </button>
          <button
            onClick={() => handleFilterChange('inactive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filterStatus === 'inactive'
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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin mb-4">
                <span className="material-symbols-outlined text-[40px] text-primary">hourglass_empty</span>
              </div>
              <p className="text-slate-600">Đang tải kho hàng...</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-50 mb-4">
              <span className="material-symbols-outlined text-red-600">error</span>
            </div>
            <h3 className="text-sm font-medium text-slate-900 mb-1">Lỗi tải dữ liệu</h3>
            <p className="text-sm text-slate-600 mb-4">{error}</p>
            <button
              onClick={fetchWarehouses}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Thử lại
            </button>
          </div>
        ) : warehouses.length === 0 ? (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 mb-4">
              <span className="material-symbols-outlined text-slate-400">warehouse</span>
            </div>
            <h3 className="text-sm font-medium text-slate-900 mb-1">Không có kho hàng</h3>
            <p className="text-sm text-slate-600">Chưa có kho hàng nào được tạo</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 w-16">Hình ảnh</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Tên kho</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Địa chỉ</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Tổng tồn</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Trạng thái</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredWarehouses.map((warehouse) => (
                    <tr key={warehouse.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-4 px-6">
                        <div
                          className={`w-10 h-10 rounded-lg bg-cover bg-center shadow-sm ${
                            warehouse.status === 'inactive' ? 'grayscale opacity-70' : ''
                          }`}
                          style={{ backgroundImage: `url('${warehouse.image}')` }}
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className={`text-sm font-semibold ${
                            warehouse.status === 'inactive' ? 'text-slate-500' : 'text-slate-900'
                          }`}>
                            {warehouse.name}
                          </span>
                          <span className="text-xs text-slate-500">ID: {warehouse.id}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className={`flex items-center gap-1.5 ${
                          warehouse.status === 'inactive' ? 'text-slate-500' : 'text-slate-600'
                        }`}>
                          <span className="material-symbols-outlined text-[16px] text-slate-400">location_on</span>
                          <span className="text-sm">{warehouse.address}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-sm font-medium ${
                          warehouse.status === 'inactive' ? 'text-slate-500' : 'text-slate-900'
                        }`}>
                          {warehouse.totalStock}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {warehouse.status === 'active' ? (
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
                            onClick={() => handleDelete(warehouse.id)}
                            disabled={deleting === warehouse.id}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                            title="Xóa"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {deleting === warehouse.id ? 'hourglass_empty' : 'delete'}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredWarehouses.length}</span> trong <span className="font-medium">{warehouses.length}</span> kết quả
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WarehouseList;
