import axiosClient from './axiosClient';

export const productAPI = {
  // Get all products with filters and pagination
  getAll: (params) => {
    return axiosClient.get('/product/list', { params });
  },

  // Get product by ID 
  getById: async (id) => {
    try {
      // Fetch all pages to find the product
      let allProducts = [];
      let pageNum = 1;
      let totalPages = 1;
      
      while (pageNum <= totalPages) {
        const response = await axiosClient.get('/product/list', { 
          params: { 
            page: pageNum
          } 
        });
        
        if (response.code === 'success' && response.data && Array.isArray(response.data)) {
          allProducts = allProducts.concat(response.data);
          totalPages = response.pageQuantity || 1;
          pageNum++;
        } else {
          break;
        }
      }
      
      // Find the product by ID
      const product = allProducts.find(p => String(p.id) === String(id));
      
      return {
        code: 'success',
        data: product ? [product] : []
      };
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
      return {
        code: 'error',
        data: []
      };
    }
  },

  // Create new product (with FormData for image upload)
  create: (formData) => {
    return axiosClient.post('/product/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update product (with FormData for image upload)
  update: (id, formData) => {
    return axiosClient.put(`/product/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Lock/unlock product
  lock: (id, isActive) => {
    return axiosClient.put(`/product/lock/${id}`, { isActive });
  },

  // Order more items for a product
  orderItem: (id, quantity) => {
    return axiosClient.post(`/product/order_item/${id}`, { quantity });
  },
};
