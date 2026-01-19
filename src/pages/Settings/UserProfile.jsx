import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/Toast/Toast';
import { authAPI } from '../../api/auth.api';
import '../../styles/settings.css';
const Settings = () => {
  // const { user } = useAuth();
  // const navigate = useNavigate();
  // const toast = useToast();

  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    bio: '',
    language: 'English (US)',
    timezone: 'Pacific Time (US & Canada)',
    twoFactorEnabled: true
  });

  // useEffect(() => {
  //   fetchProfile();
  // }, []);
  useEffect(() => {
    checkAuth();
  }, []);
  const checkAuth = async () => {
      try {
          const response = await authAPI.getProfile();
          if (response.code === 'success') {
            console.log(response.data);
            setFormData({
              firstName: response.data.userName || '',
              lastName: response.data.lastName || '',
              email: response.data.email || '',
              phone: response.data.phone || '',
              role: response.data.role || '',
              bio: response.data.bio || '',
          });        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await useAuth.getProfile();
      if (response.data) {
        const profileData = response.data;
        setFormData({
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          email: profileData.email || '',
          phone: profileData.phone || '',
          role: profileData.role || '',
          bio: profileData.bio || '',
          language: profileData.language || 'English (US)',
          timezone: profileData.timezone || 'Pacific Time (US & Canada)',
          twoFactorEnabled: profileData.twoFactorEnabled || true
        });
      }
    } catch (error) {
      toast.error('Không thể tải thông tin hồ sơ');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        language: formData.language,
        timezone: formData.timezone,
        twoFactorEnabled: formData.twoFactorEnabled
      };
      
      const response = await accountAPI.updateProfile(updateData);
      if (response.code === 'success') {
        toast.success('Cập nhật thông tin thành công!');
      } else {
        toast.error(response.message || 'Cập nhật thất bại');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi cập nhật thông tin');
    } finally {
      setSubmitting(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General Info' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'billing', label: 'Billing' }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">

        {/* Tabs + Actions */}
        <div className="flex items-center justify-between border-b border-slate-200">

          {/* Tabs (LEFT) */}
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 px-1 py-4 text-sm font-semibold transition-colors ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Save Actions (RIGHT) */}
          <div className="flex items-center gap-3 pb-3">
            <button
              onClick={() => navigate('/settings')}
              className="flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={submitting || loading}
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                  Đang lưu...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Lưu thay đổi
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 pb-12">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {/* Banner */}
              <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

              {/* Profile Picture */}
              <div className="relative px-6 pb-6">
                <div className="-mt-12 mb-4 flex justify-center">
                  <div className="relative">
                    <div
                      className="size-24 rounded-full border-4 border-white bg-cover bg-center shadow-md"
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMt3IZeBcnBoiyvfzFDMjnJsa2f43wJwVaM7gD4s8wyQ5b16dNfV6KhCG7j9SfxIYsJ3xYzl5DyI79jj8Fk_Y3ZenevH-PIl3dHvZwb0ut4EbVawB7OnG1he5-HTJkOVb188G7pMDxzm9Zfzl3UXNcJtz8wkHT_IiaXlUNlBM4EWIQ7J_GmuJsuQF67hWGgtihxEdKPUF2SLDHt9qq60NQTeNnICiYfBdL-OE-kCNhdn6TuheULiHTAT2RGVn50Ar6dcT_hDti1mE-')" }}
                    ></div>
                    <button className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-blue-600 border-2 border-white transition-colors">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-900">{formData.firstName} {formData.lastName}</h3>
                  <p className="text-sm font-medium text-primary">{formData.role || 'User'}</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      <span className="mr-1.5 size-1.5 rounded-full bg-green-600"></span>
                      Active
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                      {formData.role || 'Admin'}
                    </span>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="mt-6 border-t border-slate-200 pt-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                      {formData.email || 'N/A'}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-[20px]">phone</span>
                      {formData.phone || 'N/A'}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-[20px]">language</span>
                      {formData.language || 'N/A'}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-[20px]">schedule</span>
                      {formData.timezone || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delete Account Section */}
            <div className="mt-6 overflow-hidden rounded-xl border border-red-100 bg-red-50 p-6">
              <h4 className="text-sm font-bold text-red-800">Delete Account</h4>
              <p className="mt-2 text-xs text-red-600">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="mt-4 text-sm font-medium text-red-700 hover:text-red-900 underline">
                Delete your account
              </button>
            </div>
          </div>

          {/* Right Column - Form Sections */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {loading ? (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-3">
                  <span className="material-symbols-outlined text-4xl animate-spin text-primary">refresh</span>
                  <p className="text-sm text-slate-500">Đang tải thông tin...</p>
                </div>
              </div>
            ) : (
            <>
            {/* Personal Information */}
            {activeTab === 'general' && (
              <>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Thông tin cá nhân</h3>
                      <p className="text-sm text-slate-500">Cập nhật chi tiết cá nhân và hồ sơ công khai của bạn.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="firstName">
                        Tên
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="email">
                        Email
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="material-symbols-outlined text-[18px] text-slate-400">mail</span>
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="block w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="phone">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="role">
                        Chức vụ
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        disabled
                        className="mt-1 block w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
                      />
                      <p className="mt-1 text-xs text-slate-500">Liên hệ admin để thay đổi chức vụ.</p>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="bio">
                        Tiểu sử
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows="3"
                        value={formData.bio}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Tùy chọn</h3>
                    <p className="text-sm text-slate-500">Quản lý cài đặt khu vực của bạn.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="language">
                        Ngôn ngữ
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option>English (US)</option>
                        <option>Tiếng Việt</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="timezone">
                        Múi giờ
                      </label>
                      <select
                        id="timezone"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option>Pacific Time (US & Canada)</option>
                        <option>Eastern Time (US & Canada)</option>
                        <option>London</option>
                        <option>Asia/Ho_Chi_Minh</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Security Preview */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Bảo mật</h3>
                      <p className="text-sm text-slate-500">Cài đặt mật khẩu và xác thực.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('security')}
                      className="text-sm font-medium text-primary hover:text-blue-600"
                    >
                      Quản lý bảo mật
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                          <span className="material-symbols-outlined text-slate-600">key</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Mật khẩu</p>
                          <p className="text-xs text-slate-500">Thay đổi lần cuối 3 tháng trước</p>
                        </div>
                      </div>
                      <button onClick={() => setActiveTab('security')} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        Thay đổi
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                          <span className="material-symbols-outlined text-slate-600">smartphone</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Xác minh 2 bước</p>
                          <p className="text-xs text-green-600">Đã bật</p>
                        </div>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          name="twoFactorEnabled"
                          checked={formData.twoFactorEnabled}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Cài đặt bảo mật</h3>
                  <p className="text-sm text-slate-500">Quản lý bảo mật tài khoản và xác thực.</p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">Cài đặt bảo mật sẽ sớm có...</p>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Tùy chọn thông báo</h3>
                  <p className="text-sm text-slate-500">Chọn cách bạn muốn được thông báo.</p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">Cài đặt thông báo sẽ sớm có...</p>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Thông tin thanh toán</h3>
                  <p className="text-sm text-slate-500">Quản lý đăng ký và phương thức thanh toán của bạn.</p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">Thông tin thanh toán sẽ sớm có...</p>
                </div>
              </div>
            )}
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
