import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/settingsMenu.css';

const SettingsMenu = () => {
  const navigate = useNavigate();

  const settingsOptions = [
    {
      id: 'profile',
      title: 'Hồ sơ người dùng',
      description: 'Quản lý thông tin cá nhân và tùy chọn của bạn',
      icon: 'account_circle',
      path: '/settings/profile',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'security',
      title: 'Bảo mật & quyền riêng tư',
      description: 'Mật khẩu, 2FA và các thiết lập riêng tư',
      icon: 'shield',
      path: '/settings/security',
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 'notifications',
      title: 'Thông báo',
      description: 'Thiết lập thông báo email và đẩy',
      icon: 'notifications',
      path: '/settings/notifications',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'billing',
      title: 'Thanh toán & gói cước',
      description: 'Quản lý gói dịch vụ và phương thức thanh toán',
      icon: 'credit_card',
      path: '/settings/billing',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      id: 'appearance',
      title: 'Giao diện',
      description: 'Tùy chỉnh chủ đề, ngôn ngữ và hiển thị',
      icon: 'palette',
      path: '/settings/appearance',
      color: 'bg-pink-50 text-pink-600'
    },
    {
      id: 'integrations',
      title: 'Tích hợp',
      description: 'Kết nối ứng dụng và dịch vụ bên thứ ba',
      icon: 'extension',
      path: '/settings/integrations',
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

  return (
    <div className="w-full">

      {/* Settings Options Grid */}
      <div className="mx-auto w-full max-w-6xl px-6 pb-12 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => navigate(option.path)}
              className="settings-card group cursor-pointer rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`flex size-12 items-center justify-center rounded-lg ${option.color} group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-[24px]">{option.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {option.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                    {option.description}
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Cần hỗ trợ?</h3>
              <p className="mt-1 text-sm text-slate-600">
                Xem tài liệu hoặc liên hệ đội hỗ trợ để được giúp đỡ
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-[20px]">description</span>
                Tài liệu
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
                Liên hệ hỗ trợ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
