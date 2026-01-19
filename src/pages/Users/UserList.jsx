import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../api/user.api';
import { useToast } from '../../components/Toast/Toast';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await userAPI.getAll();
      setUsers(response.data || []);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load users';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      return;
    }

    setDeleting(id);
    try {
      await userAPI.delete(id);
      setUsers(users.filter(u => u.id !== id));
      toast.success('Xóa người dùng thành công!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Không thể xóa người dùng');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Người dùng</h1>
        <button onClick={() => navigate('/users/create')} className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-700">
          Tạo tài khoản
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <span className="material-symbols-outlined text-red-600 flex-shrink-0">error</span>
          <div>
            <h3 className="text-sm font-medium text-red-900">Lỗi</h3>
            <p className="text-sm text-red-700 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin mb-4">
                <span className="material-symbols-outlined text-[40px] text-primary">hourglass_empty</span>
              </div>
              <p className="text-slate-600">Đang tải người dùng...</p>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 mb-4">
              <span className="material-symbols-outlined text-slate-400">people</span>
            </div>
            <h3 className="text-sm font-medium text-slate-900 mb-1">Không có người dùng</h3>
            <p className="text-sm text-slate-600">Chưa có người dùng nào được tạo</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">ID</th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Tên</th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Email</th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Vai trò</th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-600">{user.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-slate-900">{user.name}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-600">{user.email}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => navigate(`/users/edit/${user.id}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={deleting === user.id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                          title="Xóa"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {deleting === user.id ? 'hourglass_empty' : 'delete'}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
