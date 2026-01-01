import axiosClient from './axiosClient';

export const authAPI = {
  login: (credentials) => {
    return axiosClient.post('/auth/login', credentials);
  },
  
  logout: () => {
    return axiosClient.post('/auth/logout');
  },
  
  getCurrentUser: () => {
    return axiosClient.get('/auth/me');
  },
  
  refreshToken: () => {
    return axiosClient.post('/auth/refresh');
  },
};
