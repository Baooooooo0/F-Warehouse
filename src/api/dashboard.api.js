import axiosClient from './axiosClient';

export const dashboardAPI = {
  // Get total products
  getTotal: () => {
    return axiosClient.get('/dashboard/total');
  },

  // Get dashboard stats
  getStats: () => {
    return axiosClient.get('/dashboard/stats');
  },

  // Get low stock items
  getLowStock: (params = {}) => {
    return axiosClient.get('/dashboard/lowProduct', { params: { page: 1, ...params } });
  },

  // Get best selling products
  getBestSelling: () => {
    return axiosClient.get('/dashboard/best-selling');
  },

  // Get least selling products
  getLeastSelling: () => {
    return axiosClient.get('/dashboard/least-selling');
  },
};
