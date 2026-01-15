import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../api/user.api';

const UserCreate = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'manager',
    requirePasswordReset: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: 'slate' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    const labels = ['Yếu', 'Trung bình', 'Tốt', 'Mạnh'];
    const colors = ['red', 'orange', 'yellow', 'green'];
    
    return {
      strength,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || 'slate'
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    try {
      const { confirmPassword, requirePasswordReset, ...userData } = formData;
      await userAPI.create(userData);
      navigate('/users');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Tạo người dùng thất bại. Vui lòng thử lại.');
    }
  };

  const roles = [
    {
      value: 'viewer',
      label: 'Chỉ xem',
      icon: '👁️',
      description: 'Chỉ xem tồn kho, kho hàng và báo cáo; không được chỉnh sửa.'
    },
    {
      value: 'manager',
      label: 'Quản lý',
      icon: '📝',
      description: 'Có thể thêm/sửa sản phẩm, quản lý tồn kho và xem tất cả báo cáo.'
    },
    {
      value: 'admin',
      label: 'Quản trị',
      icon: '🛡️',
      description: 'Toàn quyền hệ thống, quản lý người dùng, thanh toán và cấu hình.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Đăng ký người dùng mới</h1>
        <p className="text-slate-500 text-base">Tạo tài khoản cho nhân sự kho và gán quyền phù hợp.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          {/* Account Details Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="text-blue-600">👤</span>
              Thông tin tài khoản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Họ và tên</label>
                <div className="relative">
                  <input
                    className="w-full h-11 bg-slate-50 border border-slate-300 rounded-lg px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600 transition-all"
                    placeholder="Ví dụ: Jane Doe"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Tên đăng nhập</label>
                <div className="relative group">
                  <input
                    className="w-full h-11 bg-slate-50 border border-slate-300 rounded-lg pl-4 pr-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600 transition-all"
                    placeholder="Ví dụ: jdoe_admin"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    📧
                  </span>
                  <input
                    className="w-full h-11 bg-slate-50 border border-slate-300 rounded-lg pl-11 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600 transition-all"
                    placeholder="jane.doe@congty.com"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="text-blue-600">🔒</span>
              Bảo mật
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Mật khẩu</label>
                <div className="relative">
                  <input
                    className="w-full h-11 bg-slate-50 border border-slate-300 rounded-lg px-4 pr-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600 transition-all"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {formData.password && (
                  <>
                    <div className="flex gap-1 h-1 mt-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 rounded-full ${
                            level <= passwordStrength.strength
                              ? `bg-${passwordStrength.color}-500`
                              : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs text-${passwordStrength.color}-600 mt-1`}>
                      Mật khẩu {passwordStrength.label}
                    </p>
                  </>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Xác nhận mật khẩu</label>
                <div className="relative">
                  <input
                    className="w-full h-11 bg-slate-50 border border-slate-300 rounded-lg px-4 pr-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600 transition-all"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1">Mật khẩu không khớp</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    checked={formData.requirePasswordReset}
                    className="size-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox"
                    name="requirePasswordReset"
                    onChange={handleChange}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">Yêu cầu đổi mật khẩu</span>
                    <span className="text-xs text-slate-500">Người dùng sẽ phải đổi mật khẩu trong lần đăng nhập đầu tiên.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Role Assignment Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="text-blue-600">⚙️</span>
              Phân quyền
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map((role) => (
                <label key={role.value} className="cursor-pointer group">
                  <input
                    className="peer sr-only"
                    name="role"
                    type="radio"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={handleChange}
                  />
                  <div className="h-full p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-500/50 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:ring-1 peer-checked:ring-blue-600 relative transition-all">
                    <div className="absolute top-4 right-4 text-blue-600 opacity-0 peer-checked:opacity-100 transition-opacity">
                      ✓
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="bg-slate-200 w-fit p-2 rounded-lg text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors text-xl">
                        {role.icon}
                      </div>
                      <span className="text-base font-bold text-slate-900">{role.label}</span>
                      <p className="text-xs text-slate-500 leading-relaxed">{role.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
            type="button"
            onClick={() => navigate('/users')}
          >
            Hủy
          </button>
          <button
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
            type="submit"
          >
            <span>➕</span>
            Tạo tài khoản
          </button>
        </div>
      </form>

      <p className="text-center text-xs text-slate-400 py-4">
        © 2024 InvManager System. Mọi thao tác đều được ghi nhận.
      </p>
    </div>
  );
};

export default UserCreate;
