import React, { useState } from 'react';
import '../../styles/warehouse.css';

const WarehouseList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const warehouses = [
    {
      id: 'W-1024',
      name: 'North Star Distribution',
      address: '123 Logistics Way, Seattle, WA',
      totalStock: '45,000 Units',
      status: 'active',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC8wgpWfpzGAuWyumPdELjQhGQP8XqRepf-vQgmr5mmOMKwfLiFV3hGqB1GBFVeNd-klyaHZ8NyETqonBA2Idg8QBIBja4DYRJ35FZT9vaI4udyyGliB358KDPiYI_0RsrsyLc6ZjNQIHBb3OcnnrobFmDrGXpK-RVyi0FB8ffDkZivx82vUxovfID-mbP14iLe8NiBeEPRobskKyKc7gxDWJ4kayFYiZxjTVvYH-orRdSXn0sYIvPNQYr-CjCqOU0hvPPARSfmAn6'
    },
    {
      id: 'W-2055',
      name: 'East Coast Hub',
      address: '45 Industrial Blvd, Newark, NJ',
      totalStock: '12,500 Units',
      status: 'active',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS0gS5sON9EnoB4Y0L9TmfTjOACbGSsH38CbdPOZSJrIMKHKcGHd1cUr7v2RCq2-ywVmfuLH4nqThhYOw4sA42ZNy8_YeTucEdjcFzJ1GhsRqwYC-QmKAeQ5jNMP1UNxh-liAcV2xGTr-wk4SLqeR6BQELcBXkJOgDjKZH227ucwOxUBxVZZTjNnsk26Wy482_CrmTAKb-2vM7jOCR1ooQjoZpjFQu-pp5_OJOdQ1Yo3MBw7BILWv86Tqse22BvghE6YIn0p5lm2GP'
    },
    {
      id: 'W-3011',
      name: 'Southern Depot (Closed)',
      address: '889 Sunny Ln, Austin, TX',
      totalStock: '0 Units',
      status: 'inactive',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjTRa1ADeCoPEMiqp0uSceaZ7T5qJyh3tPPTEKD5QfIujMjGuVw8717nS4SXRsFb0bIB-zu7vi4RNL5tGKJN2L0s1hkqQDl6w27-s8zNYrUhqh2YOXGZDlKsMNAXaruVee6Lf-_qrGq8dhUfeUC5I1m6JIDAxLXl_Qkq15bH3Pmzx6sTE-7ckHCiaa7YNK1x5Uxswg1fRAWvkjzKEzlw3hAgKBqTXqhHQE9ZH5Jaq8a7TuUXYT5YHeerR79jaxvpKYpe_-3jRDmXgu'
    },
    {
      id: 'W-4099',
      name: 'West Coast Annex',
      address: '772 Ocean Dr, San Diego, CA',
      totalStock: '8,100 Units',
      status: 'active',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9PF553aSObr4DNkWALLWQqPo10ZDjyy6sUXtE_cGzVjTGlLTSM1KXpIMUNFHkiY03HaetV52u42uyZzXneedoEV2C_KpSFK0EQjg480FiAw2cpp5lXPLsDPP3AxEMY4OWSIhsXFweEOKAuJS69006n3-rmQe-F7o_5NYtzRVaZO0eClLJyxzZnypBX7hp4tYoUpbWE6cSXoI3uqUZqmFWoqszqovOFS7by3LGOMztcsDVPhuGQUx3evndMMHIP2MH1HnNj4vir3r5'
    },
    {
      id: 'W-5120',
      name: 'Midwest Center',
      address: '554 Plains Rd, Omaha, NE',
      totalStock: '22,000 Units',
      status: 'active',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATUOIFrpcGNV8XnnvedAP3bIhcO8xNGVd8H0uWJQfSCuKenCgZy6sHJEWAh1szIxVFPbCy-gt9qsEuSI_d-PaQvXZWXvO85ZOCrH-n7PtLxjajv5qVy2wPDqOEJK_aCInRj9g7FSlkkCBOWbz_DmLJCxunzO68BAmSDpzMJAn3C9EgGR4_Cbwatu73rWZRlc7R1t_3hNdVeJmykMEOD90N1vZkEDoR5Effxpv2T-7cYVQZax6bkrkaMCqu5sFhVdK5TFo-CJddh4fu'
    }
  ];

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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
          <button
            onClick={() => setFilterStatus('all')}
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
            onClick={() => setFilterStatus('active')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filterStatus === 'active'
                ? 'bg-primary/10 border border-primary/20 text-primary'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đang hoạt động
          </button>
          <button
            onClick={() => setFilterStatus('inactive')}
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
                        className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Xóa"
                      >
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
        <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredWarehouses.length}</span> trong <span className="font-medium">{warehouses.length}</span> kết quả
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
                >
                  <span className="sr-only">Trước</span>
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-primary/10 text-sm font-medium text-primary z-10 border-primary"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
                >
                  3
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
                >
                  <span className="sr-only">Tiếp</span>
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseList;
