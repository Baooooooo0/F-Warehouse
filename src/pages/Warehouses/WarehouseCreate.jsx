import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { warehouseAPI } from '../../api/warehouse.api';
import { useToast } from '../../components/Toast/Toast';

const WarehouseCreate = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim()) {
      toast.warning('Vui lòng nhập tên kho hàng');
      return;
    }

    if (!formData.address.trim()) {
      toast.warning('Vui lòng nhập địa chỉ kho hàng');
      return;
    }

    try {
      setLoading(true);

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('address', formData.address);

      // Append image if selected
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      const response = await warehouseAPI.create(submitData);

      if (response.code === 'success') {
        toast.success('Tạo kho hàng thành công!');
        navigate('/warehouses');
      } else {
        toast.error(response.message || 'Không thể tạo kho hàng');
      }
    } catch (error) {
      console.error('Error creating warehouse:', error);
      toast.error(error.response?.data?.message || 'Không thể tạo kho hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 px-8 pt-6">
        <Link to="/dashboard" className="hover:text-slate-900">Trang chủ</Link>
        <span>/</span>
        <Link to="/warehouses" className="hover:text-slate-900">Kho hàng</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Thêm mới</span>
      </nav>

      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/warehouses')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-slate-600">arrow_back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Thêm kho hàng mới</h1>
              <p className="text-sm text-slate-500 mt-0.5">Tạo kho hàng mới trong hệ thống</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/warehouses')}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                  Đang lưu...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  Lưu kho hàng
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Thông tin cơ bản</h2>
                <p className="text-sm text-slate-500 mt-1">Nhập thông tin kho hàng</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tên kho hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="VD: Kho Hà Nội, Kho Hồ Chí Minh..."
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="VD: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh"
                    rows="3"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Hình ảnh kho</h2>
                <p className="text-sm text-slate-500 mt-1">Tải lên hình ảnh kho hàng (tùy chọn)</p>
              </div>
              <div className="p-6">
                {/* Image Preview */}
                {formData.image && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Xem trước:</p>
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-slate-200"
                    />
                  </div>
                )}

                <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="image" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-[24px]">cloud_upload</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {formData.image ? 'Thay đổi hình ảnh' : 'Nhấn để tải lên hình ảnh'}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">PNG, JPG hoặc GIF (tối đa 10MB)</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Preview Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm sticky top-24">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Xem trước</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Tên kho:</span>
                    <span className="font-medium text-slate-900 text-right max-w-[60%] truncate">
                      {formData.name || 'Chưa nhập'}
                    </span>
                  </div>
                  <div className="flex items-start justify-between text-sm">
                    <span className="text-slate-500">Địa chỉ:</span>
                    <span className="font-medium text-slate-900 text-right max-w-[60%]">
                      {formData.address || 'Chưa nhập'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Hình ảnh:</span>
                    <span className="font-medium text-slate-900">
                      {formData.image ? 'Đã chọn' : 'Chưa có'}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="material-symbols-outlined text-blue-600 text-[20px]">info</span>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Đảm bảo điền đầy đủ các trường bắt buộc (*) trước khi lưu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseCreate;
