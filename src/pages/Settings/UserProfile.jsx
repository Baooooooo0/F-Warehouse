import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/Toast/Toast';
import '../../styles/settings.css';

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@stockmaster.com',
    phone: '+1 (555) 123-4567',
    role: 'Warehouse Manager',
    bio: 'Responsible for overseeing daily warehouse operations, inventory accuracy, and team safety.',
    language: 'English (US)',
    timezone: 'Pacific Time (US & Canada)',
    twoFactorEnabled: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = () => {
    toast.success('Cập nhật thông tin thành công!');
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
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save Changes
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
                  <h3 className="text-xl font-bold text-slate-900">Jane Doe</h3>
                  <p className="text-sm font-medium text-primary">Warehouse Manager</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      <span className="mr-1.5 size-1.5 rounded-full bg-green-600"></span>
                      Active
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                      Admin
                    </span>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="mt-6 border-t border-slate-200 pt-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                      jane.doe@stockmaster.com
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-[20px]">phone</span>
                      +1 (555) 123-4567
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-[20px]">location_on</span>
                      San Francisco, CA
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-[20px]">schedule</span>
                      PDT (UTC-07:00)
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
            {/* Personal Information */}
            {activeTab === 'general' && (
              <>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
                      <p className="text-sm text-slate-500">Update your personal details and public profile.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="firstName">
                        First Name
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

                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="lastName">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="email">
                        Email Address
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
                        Phone Number
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
                        Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        disabled
                        className="mt-1 block w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
                      />
                      <p className="mt-1 text-xs text-slate-500">Contact admin to change role.</p>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="bio">
                        Bio
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
                    <h3 className="text-lg font-bold text-slate-900">Preferences</h3>
                    <p className="text-sm text-slate-500">Manage your regional settings.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="language">
                        Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>Vietnamese</option>
                      </select>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-slate-700" htmlFor="timezone">
                        Timezone
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
                      <h3 className="text-lg font-bold text-slate-900">Security</h3>
                      <p className="text-sm text-slate-500">Password and authentication settings.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('security')}
                      className="text-sm font-medium text-primary hover:text-blue-600"
                    >
                      Manage Security
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                          <span className="material-symbols-outlined text-slate-600">key</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Password</p>
                          <p className="text-xs text-slate-500">Last changed 3 months ago</p>
                        </div>
                      </div>
                      <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        Change
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                          <span className="material-symbols-outlined text-slate-600">smartphone</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">2-Step Verification</p>
                          <p className="text-xs text-green-600">Enabled</p>
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
                  <h3 className="text-lg font-bold text-slate-900">Security Settings</h3>
                  <p className="text-sm text-slate-500">Manage your account security and authentication.</p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">Security settings coming soon...</p>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Notification Preferences</h3>
                  <p className="text-sm text-slate-500">Choose how you want to be notified.</p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">Notification settings coming soon...</p>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Billing Information</h3>
                  <p className="text-sm text-slate-500">Manage your subscription and payment methods.</p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">Billing information coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
