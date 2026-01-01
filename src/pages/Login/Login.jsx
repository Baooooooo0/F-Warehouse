import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex h-screen w-full flex-row overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0a0f18] flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Modern warehouse shelving with dramatic blue lighting and depth"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDVQkbBKutMJsam_ZhrwnBxD8dyKNOvsB3cS_fqOyLHpiWqfmNMwo5fPPU3NBjRpmJlmwI2nnHugEkyJZJ-gR3tJ8LVoU_FjrRa150xjxsV7mA24umE4v1IGbvRq-V3TaLbDLcw1lmethgu3R16ZdMTyThSrQbqYi1EYPGpAk1AnAKEFCAAallhs50EsOtAbJGD2pq-LE6M3jasuJdwW5gvGC9O4WCtNroRk_BE2mQqAeKmjd66aKaq-xMB0UNweUekuG3sVx2ifIF"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101622] via-[#101622]/80 to-[#135bec]/20 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-[#135bec] text-white shadow-lg shadow-[#135bec]/30">
            <span className="material-symbols-outlined text-[24px]">inventory_2</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Inventory Manager</h1>
        </div>
        
        <div className="relative z-10 max-w-md">
          <blockquote className="text-xl font-medium leading-relaxed text-white">
            "Streamline your logistics, track every item, and optimize your warehouse efficiency with our next-gen dashboard."
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-px w-8 bg-[#135bec]"></div>
            <p className="text-sm text-slate-400">System v4.2.0</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center px-6 py-12 lg:px-20 xl:px-32 bg-white overflow-y-auto">
        <div className="w-full max-w-[480px] flex flex-col gap-8">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-4 text-slate-900">
            <div className="flex items-center justify-center size-8 rounded bg-[#135bec] text-white">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
            <span className="text-lg font-bold">Inventory Manager</span>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black leading-tight tracking-[-0.033em] text-slate-900">Welcome Back</h2>
            <p className="text-slate-500 text-base font-normal">
              Enter your credentials to access your warehouse dashboard.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-900">Email Address</span>
              <div className="relative">
                <input
                  className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-[#135bec]/50 border border-slate-300 bg-white focus:border-[#135bec] h-12 placeholder:text-slate-400 px-4 text-base font-normal transition-all"
                  placeholder="user@company.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
              </div>
            </label>

            {/* Password Field */}
            <label className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-900">Password</span>
                <a className="text-sm font-semibold text-[#135bec] hover:text-[#135bec]/80 transition-colors" href="#">
                  Forgot Password?
                </a>
              </div>
              <div className="flex w-full items-stretch rounded-lg group focus-within:ring-2 focus-within:ring-[#135bec]/50 transition-all">
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 focus:outline-0 focus:ring-0 border border-slate-300 bg-white focus:border-[#135bec] h-12 placeholder:text-slate-400 px-4 border-r-0 text-base font-normal"
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div
                  className="flex items-center justify-center px-4 rounded-r-lg border border-l-0 border-slate-300 bg-white cursor-pointer hover:bg-slate-50 text-slate-500 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </div>
              </div>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-[#135bec] hover:bg-[#135bec]/90 text-white text-base font-bold tracking-[0.015em] transition-all shadow-lg shadow-[#135bec]/20 active:scale-[0.98] mt-2"
            >
              <span>Log In</span>
            </button>
          </form>

          {/* Footer */}
          <div className="flex flex-col gap-6 items-center text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?
              <button className="font-bold text-[#135bec] hover:underline ml-1 cursor-pointer">
                Request Access
              </button>
            </p>

            <div className="w-full flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200"></div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Help &amp; Support</span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700 transition-colors">
                <span className="material-symbols-outlined text-[18px]">contact_support</span>
                <span>Contact Admin</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-center text-slate-400 mt-8 lg:mt-12">
            © 2024 Inventory Systems Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
