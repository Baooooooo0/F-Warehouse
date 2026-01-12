import axiosClient from './axiosClient';

export const productAPI = {
  // Get all products with filters and pagination
  getAll: (params) => {
    return axiosClient.get('/product/list', { params });
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
