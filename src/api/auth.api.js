import axiosClient from './axiosClient';

export const authAPI = {
  login: (credentials) => {
    return axiosClient.post('/authentication/login', credentials);
  },

  register: (userData) => {
    return axiosClient.post('/authentication/register', userData);
  },

  logout: () => {
    return axiosClient.get('/authentication/logout');
  },

  getProfile: () => {
    return axiosClient.get('/authentication/profile');
  },
};
