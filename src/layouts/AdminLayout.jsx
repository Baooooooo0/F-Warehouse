import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inventoryExpanded, setInventoryExpanded] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/warehouses', label: 'Warehouses', icon: 'warehouse' },
    {
      label: 'Inventory',
      icon: 'inventory_2',
      isExpandable: true,
      children: [
        { path: '/inventory/products', label: 'Products', icon: 'package_2' },
        { path: '/inventory/categories', label: 'Category Management', icon: 'category' },
      ]
    },
    { path: '/role-management', label: 'Role Management', icon: 'admin_panel_settings' },
    { path: '/users', label: 'Users', icon: 'group' },
    { path: '/settings', label: 'Settings', icon: 'settings' },
  ];

  const isActive = (path) => location.pathname === path;
  const isInventoryActive = () => location.pathname.startsWith('/inventory');

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined text-[24px]">inventory_2</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-bold leading-normal text-slate-900">Inventory Mgr</h1>
                <p className="text-sm font-normal leading-normal text-slate-500">Admin Console</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.isExpandable ? (
                    <>
                      <button
                        onClick={() => setInventoryExpanded(!inventoryExpanded)}
                        className={`group flex items-center justify-between w-full gap-3 rounded-lg px-3 py-2 transition-colors ${isInventoryActive()
                          ? 'bg-primary/10 text-primary'
                          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                          <p className={`text-sm leading-normal ${isInventoryActive() ? 'font-bold' : 'font-medium'}`}>
                            {item.label}
                          </p>
                        </div>
                        <span className={`material-symbols-outlined text-[20px] transition-transform ${inventoryExpanded ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      {inventoryExpanded && (
                        <div className="ml-6 mt-1 flex flex-col gap-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isActive(child.path)
                                ? 'bg-primary/10 text-primary'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                              <span className="material-symbols-outlined text-[20px]">{child.icon}</span>
                              <p className={`text-sm leading-normal ${isActive(child.path) ? 'font-bold' : 'font-medium'}`}>
                                {child.label}
                              </p>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isActive(item.path)
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                    >
                      <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                      <p className={`text-sm leading-normal ${isActive(item.path) ? 'font-bold' : 'font-medium'}`}>
                        {item.label}
                      </p>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Menu */}
          <div className="flex flex-col gap-2 border-t border-slate-200 pt-4">
            <Link
              to="/settings"
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">settings</span>
              <p className="text-sm font-medium leading-normal">Settings</p>
            </Link>
            <button
              onClick={handleLogout}
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors w-full text-left"
            >
              <span className="material-symbols-outlined text-[24px]">logout</span>
              <p className="text-sm font-medium leading-normal">Logout</p>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col h-full overflow-hidden relative bg-[#f8fafc]">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div className="flex items-center gap-4 lg:hidden">
            <button
              className="text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-lg font-bold text-slate-900">Dashboard</h2>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-slate-900">
              {(() => {
                // Check for inventory sub-pages
                const inventoryItem = menuItems.find(item => item.isExpandable && item.label === 'Inventory');
                if (inventoryItem && location.pathname.startsWith('/inventory')) {
                  const activeChild = inventoryItem.children.find(child => child.path === location.pathname);
                  return activeChild?.label || 'Inventory';
                }
                // Check for regular menu items
                const activeItem = menuItems.find(item => item.path === location.pathname);
                return activeItem?.label || 'Dashboard';
              })()}
            </h2>
            <div className="relative flex w-64 items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-500">search</span>
              <input
                className="h-10 w-full rounded-lg border-none bg-slate-100 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-primary"
                placeholder="Search inventory..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {location.pathname === '/warehouses' && (
              <button className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white transition-colors hover:bg-blue-600 shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span className="hidden sm:inline">Add Warehouse</span>
              </button>
            )}
            {location.pathname === '/dashboard' && (
              <button className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white transition-colors hover:bg-blue-600">
                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                <span className="hidden sm:inline">Reorder Stock</span>
              </button>
            )}
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors relative hover:bg-slate-100">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div
              className="h-10 w-10 rounded-full bg-center bg-cover border border-slate-200 cursor-pointer shadow-sm"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXD0uPj9cJ5otvYXvEmJ43xjNvY5bKhLUO9lOurWBrtcYPGj2s96xohpGyqoOjN6m3HQywuAumJiZiWWlDwr0gY52WWYp0nbPlt3WdFEUcpQZItk-cfCxROHh67w5qnxMROk54-xiOPRtKvUHVJYgwQkgYL_q7jhaBePFUTCi9ZJ2fgfv39nlM1IYD2xuS0XeVULIw5407HBOP_1QmPP--ThCyn5h2_KTgdut4E7pblvtI1dYbegRLn52yWYijBQWylSoxHDHkxS2d')" }}
              title={user?.name || 'User'}
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
