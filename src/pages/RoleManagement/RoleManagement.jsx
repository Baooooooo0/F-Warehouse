import React, { useState } from 'react';
import { useToast } from '../../components/Toast/Toast';

// Mock data 
const mockRoles = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Toàn quyền truy cập mọi module và thiết lập hệ thống.',
    users: [
      { id: 1, name: 'Admin User', avatar: 'A' },
      { id: 2, name: 'John Doe', avatar: 'J' }
    ],
    userCount: 1,
    status: true,
    lastModified: 'Oct 24, 2023'
  },
  {
    id: 2,
    name: 'Warehouse Manager',
    description: 'Quản lý tồn kho, xem báo cáo nhưng không quản lý người dùng.',
    users: [
      { id: 3, name: 'Mike Wilson', avatar: 'M' },
      { id: 4, name: 'Sarah Johnson', avatar: 'S' }
    ],
    userCount: 6,
    status: true,
    lastModified: 'Oct 22, 2023'
  },
  {
    id: 3,
    name: 'Inventory Clerk',
    description: 'Cập nhật tồn kho và tham gia kiểm kê.',
    users: [
      { id: 5, name: 'Tom Brown', avatar: 'T' }
    ],
    userCount: 12,
    status: true,
    lastModified: 'Sep 15, 2023'
  },
  {
    id: 4,
    name: 'Viewer',
    description: 'Chỉ xem bảng điều khiển tồn kho.',
    users: [
      { id: 6, name: 'Lisa Chen', avatar: 'L' }
    ],
    userCount: 4,
    status: false,
    lastModified: 'Aug 30, 2023'
  },
  {
    id: 5,
    name: 'Intern',
    description: 'Quyền hạn hạn chế để hỗ trợ quản lý kho.',
    users: [
      { id: 7, name: 'David Kim', avatar: 'D' }
    ],
    userCount: 2,
    status: false,
    lastModified: 'Aug 10, 2023'
  },
  {
    id: 6,
    name: 'Auditor',
    description: 'Xem toàn bộ dữ liệu và tạo báo cáo tuân thủ.',
    users: [
      { id: 8, name: 'Emma Davis', avatar: 'E' }
    ],
    userCount: 3,
    status: true,
    lastModified: 'Jul 18, 2023'
  },
  {
    id: 7,
    name: 'Supplier',
    description: 'Quyền giới hạn để xem và cập nhật tồn kho sản phẩm của họ.',
    users: [
      { id: 9, name: 'Robert Lee', avatar: 'R' }
    ],
    userCount: 8,
    status: true,
    lastModified: 'Jul 05, 2023'
  },
  {
    id: 8,
    name: 'Customer Service',
    description: 'Xem tồn kho và hỗ trợ khách hàng về hàng hóa.',
    users: [
      { id: 10, name: 'Nancy White', avatar: 'N' }
    ],
    userCount: 5,
    status: false,
    lastModified: 'Jun 22, 2023'
  },
  {
    id: 9,
    name: 'Logistics Coordinator',
    description: 'Quản lý giao hàng và theo dõi luân chuyển hàng hóa.',
    users: [
      { id: 11, name: 'Kevin Martinez', avatar: 'K' }
    ],
    userCount: 7,
    status: true,
    lastModified: 'Jun 10, 2023'
  },
  {
    id: 10,
    name: 'Quality Control',
    description: 'Kiểm tra hàng hóa và cảnh báo vấn đề chất lượng.',
    users: [
      { id: 12, name: 'Amy Taylor', avatar: 'A' }
    ],
    userCount: 4,
    status: true,
    lastModified: 'May 28, 2023'
  },
  {
    id: 11,
    name: 'Finance Analyst',
    description: 'Truy cập báo cáo giá trị và chi phí hàng tồn.',
    users: [
      { id: 13, name: 'Chris Anderson', avatar: 'C' }
    ],
    userCount: 2,
    status: false,
    lastModified: 'May 15, 2023'
  },
  {
    id: 12,
    name: 'IT Support',
    description: 'Quyền hỗ trợ kỹ thuật cho việc bảo trì hệ thống.',
    users: [
      { id: 14, name: 'Jessica Moore', avatar: 'J' }
    ],
    userCount: 3,
    status: true,
    lastModified: 'Apr 30, 2023'
  }
];

const RoleManagement = () => {
  const [roles, setRoles] = useState(mockRoles);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const toast = useToast();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    isActive: true
  });

  // Filter roles based on search and status
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && role.status) ||
      (statusFilter === 'inactive' && !role.status);
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRoles = filteredRoles.slice(startIndex, endIndex);

  // Toggle role status
  const toggleRoleStatus = (roleId) => {
    setRoles(roles.map(role =>
      role.id === roleId ? { ...role, status: !role.status } : role
    ));
  };

  // Handle edit role
  const handleEdit = (roleId) => {
    // TODO: Implement edit functionality
  };

  // Handle delete role
  const handleDelete = (roleId) => {
    // TODO: Implement delete functionality
  };

  // Handle create role
  const handleCreateRole = () => {
    setIsModalOpen(true);
    setFormData({ name: '', isActive: true });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name.trim()) {
      toast.warning('Vui lòng nhập tên vai trò');
      return;
    }

    try {
      // TODO: Replace with actual API endpoint

      // Example API call (uncomment when backend is ready):
      // const response = await fetch('/api/roles', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();

      // Close modal and reset form
      setIsModalOpen(false);
      setFormData({ name: '', isActive: true });

      toast.success('Tạo vai trò thành công!');
    } catch (error) {
      toast.error('Tạo vai trò thất bại');
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Avatar colors
  const avatarColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-yellow-500',
    'bg-red-500'
  ];

  const getAvatarColor = (index) => {
    return avatarColors[index % avatarColors.length];
  };

  return (
    <div className="w-full">
      {/* Breadcrumb and Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <span>Cài đặt</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-slate-900 font-medium">Quản lý vai trò</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Quản lý vai trò</h1>
            <p className="text-slate-500 mt-1">Thiết lập quyền truy cập và phân quyền cho thành viên.</p>
          </div>
          <button
            onClick={handleCreateRole}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Tạo vai trò
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Tìm kiếm vai trò..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none pl-4 pr-10 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Ngừng hoạt động</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">expand_more</span>
        </div>
        <button className="p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <span className="material-symbols-outlined text-slate-600 text-[20px]">tune</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Tên vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Cập nhật cuối
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {currentRoles.map((role, index) => (
                <tr key={role.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{role.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 max-w-md">{role.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {role.users.slice(0, 2).map((user, idx) => (
                          <div
                            key={user.id}
                            className={`w-8 h-8 rounded-full ${getAvatarColor(idx)} flex items-center justify-center text-white text-xs font-medium border-2 border-white`}
                            title={user.name}
                          >
                            {user.avatar}
                          </div>
                        ))}
                      </div>
                      {role.userCount > 2 && (
                        <span className="text-sm text-slate-600 font-medium">+{role.userCount - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleRoleStatus(role.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${role.status ? 'bg-primary' : 'bg-slate-300'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${role.status ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">{role.lastModified}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(role.id)}
                        className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded transition-colors"
                        title="Chỉnh sửa vai trò"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(role.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Xóa vai trò"
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
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredRoles.length)} / {filteredRoles.length} vai trò
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === 1
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-100'
                }`}
            >
              Trước
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === totalPages
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-white bg-primary hover:bg-blue-700'
                }`}
            >
              Tiếp
            </button>
          </div>
        </div>
      </div>

      {/* Create Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Tạo vai trò mới</h2>
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
                {/* Role Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Tên vai trò <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Quản lý kho"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                {/* Is Active */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
                    Trạng thái hoạt động
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Tạo vai trò
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
