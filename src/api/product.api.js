import axiosClient from './axiosClient';

export const productAPI = {
  // Get all products with filters and pagination
  getAll: (params) => {
    return axiosClient.get('/product/list', { params });
  },

  // Get product by ID 
  getById: async (id) => {
    const response = await axiosClient.get('/product/list');
    if (response.code === 'success' && response.data) {
      // Filter by ID on frontend
      const product = response.data.find(p => p.id === Number(id));
      return {
        ...response,
        data: product ? [product] : []
      };
    }
    return response;
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
};
