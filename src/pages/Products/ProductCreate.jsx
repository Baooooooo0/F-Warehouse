import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../../api/product.api';

const ProductCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    barcode: '',
    description: '',
    basePrice: '',
    costPrice: '',
    discount: '',
    category: '',
    warehouse: 'Main Warehouse (NY)',
    quantity: 150,
    threshold: 50,
    status: 'active',
    supplier: 'TechCorp Inc.'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 'active' : 'inactive') : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sku) {
      setError('Vui lòng điền tên sản phẩm và SKU');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await productAPI.create(formData);
      if (response.code === 'success') {
        alert('Tạo sản phẩm thành công!');
        navigate('/products');
      } else {
        setError(response.message || 'Lỗi khi tạo sản phẩm');
      }
    } catch (err) {
      console.error('Error creating product:', err);
      setError(err.message || 'Lỗi khi tạo sản phẩm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/products')}
                className="text-slate-500 hover:text-primary transition-colors rounded-full p-1 hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <div>
                <h1 className="text-2xl font-black tracking-[-0.033em] leading-tight text-slate-900">Thêm sản phẩm mới</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Quản lý tồn kho &gt; Sản phẩm &gt; Mới</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/products')}
                className="px-4 h-10 rounded-lg border border-gray-300 text-sm font-bold hover:bg-gray-100 transition-colors text-slate-600"
              >
                Hủy
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 h-10 rounded-lg bg-primary hover:bg-blue-600 disabled:bg-gray-400 text-white text-sm font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">save</span>
                {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-8">
        {error && (
          <div className="max-w-7xl mx-auto mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
            {error}
          </div>
        )}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold mb-1 text-slate-900">Thông tin cơ bản</h2>
                  <p className="text-slate-500 text-sm">Nhập các thông tin chính để nhận diện sản phẩm.</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">edit_document</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">Tên sản phẩm <span className="text-red-500">*</span></label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3.5 text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400 text-slate-900" 
                    placeholder="Ví dụ: Tai nghe chống ồn" 
                    type="text"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">SKU</label>
                    <div className="relative group">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px] group-focus-within:text-primary transition-colors">qr_code_2</span>
                      <input 
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3.5 text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900" 
                        placeholder="Ví dụ: WH-1000XM5" 
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">Mã vạch (ISBN/UPC)</label>
                    <div className="relative group">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px] group-focus-within:text-primary transition-colors">barcode_reader</span>
                      <input 
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3.5 text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900" 
                        placeholder="Quét hoặc nhập mã vạch" 
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">Mô tả</label>
                  <div className="bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
                    <div className="flex items-center gap-1 p-2 border-b border-gray-300 bg-gray-100">
                      <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-slate-500 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">format_bold</span>
                      </button>
                      <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-slate-500 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">format_italic</span>
                      </button>
                      <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-slate-500 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">format_underlined</span>
                      </button>
                      <div className="w-px h-4 bg-gray-300 mx-2"></div>
                      <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-slate-500 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                      </button>
                      <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-slate-500 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">link</span>
                      </button>
                    </div>
                    <textarea 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full bg-transparent border-none p-4 min-h-[140px] text-base focus:ring-0 resize-y text-slate-900 placeholder:text-gray-400" 
                      placeholder="Mô tả tính năng, thông số và điểm bán chính của sản phẩm..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Media */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Hình ảnh sản phẩm</h2>
                  <p className="text-slate-500 text-sm">Tải lên hình ảnh hoặc video của sản phẩm.</p>
                </div>
                <button type="button" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">download</span> Hướng dẫn
                </button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group bg-gray-50">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                </div>
                <p className="text-lg font-bold text-slate-900 mb-1">Nhấn để tải lên hoặc kéo thả</p>
                <p className="text-slate-500 text-sm font-medium">SVG, PNG, JPG hoặc GIF (tối đa 800x400px)</p>
              </div>
              <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                <div className="w-28 h-28 flex-shrink-0 rounded-lg border border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors text-slate-400 hover:text-primary hover:border-primary">
                  <span className="material-symbols-outlined text-3xl">add</span>
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-6 text-slate-900">Thông tin giá</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">Giá niêm yết</label>
                  <div className="relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-primary transition-colors">$</span>
                    <input 
                      name="basePrice"
                      value={formData.basePrice}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-8 pr-4 py-3.5 text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900" 
                      placeholder="0.00" 
                      type="number"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">Giá vốn (COGS)</label>
                  <div className="relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-primary transition-colors">$</span>
                    <input 
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-8 pr-4 py-3.5 text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900" 
                      placeholder="0.00" 
                      type="number"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">Giảm giá (%)</label>
                  <div className="relative group">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-primary transition-colors">%</span>
                    <input 
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3.5 text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900" 
                      placeholder="0" 
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Organization */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-6 text-slate-900">Organization</h2>
              <div className="space-y-6">
                {/* Active Status Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">Trạng thái hiển thị</span>
                    <span className="text-xs text-slate-500">Bật/tắt hiển thị sản phẩm</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.status === 'active'}
                      onChange={handleChange}
                      name="status"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                  </label>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">Danh mục</label>
                  <div className="relative">
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3.5 text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900 appearance-none cursor-pointer"
                    >
                      <option value="">Chọn danh mục...</option>
                      <option>Điện tử</option>
                      <option>Phụ kiện</option>
                      <option>Âm thanh</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined pointer-events-none">expand_more</span>
                  </div>
                </div>

                {/* Warehouse Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">Kho lưu trữ</label>
                  <div className="relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px] group-focus-within:text-primary transition-colors">warehouse</span>
                    <select 
                      name="warehouse"
                      value={formData.warehouse}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3.5 text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900 appearance-none cursor-pointer"
                    >
                      <option>Kho chính (NY)</option>
                      <option>Trung tâm phân phối (CA)</option>
                      <option>Cửa hàng (TX)</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px] pointer-events-none">expand_more</span>
                  </div>
                </div>

                {/* Quantity on Hand */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">Số lượng tồn</label>
                  <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 p-1">
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, quantity: Math.max(0, formData.quantity - 1)})}
                      className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-200 text-slate-500 transition-colors"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input 
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="flex-1 text-center bg-transparent border-none text-base font-bold focus:ring-0 text-slate-900 p-0" 
                      type="number" 
                    />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, quantity: formData.quantity + 1})}
                      className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-200 text-slate-500 transition-colors"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>

                {/* Threshold Alert */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">Ngưỡng cảnh báo</label>
                  <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 p-1">
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, threshold: Math.max(0, formData.threshold - 1)})}
                      className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-200 text-slate-500 transition-colors"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input 
                      name="threshold"
                      value={formData.threshold}
                      onChange={handleChange}
                      className="flex-1 text-center bg-transparent border-none text-base font-bold focus:ring-0 text-slate-900 p-0" 
                      type="number" 
                    />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, threshold: formData.threshold + 1})}
                      className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-200 text-slate-500 transition-colors"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">Khi tồn kho ≤ ngưỡng này, sẽ cảnh báo</p>
                </div>

                <hr className="border-gray-200"/>

                {/* Supplier */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Nhà cung cấp</h3>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 mb-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500 font-bold border border-indigo-500/30 text-sm">
                      TC
                    </div>
                    <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">TechCorp Inc.</p>
                      <p className="text-xs text-slate-500 truncate">ID: SUP-009</p>
                    </div>
                    <button type="button" className="text-slate-400 hover:text-slate-600 p-1 hover:bg-gray-200 rounded">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </div>
                  <button type="button" className="w-full py-2.5 rounded-lg border border-dashed border-gray-300 text-slate-500 text-sm font-bold hover:bg-primary/5 hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    Đổi nhà cung cấp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductCreate;
