import axiosClient from './axiosClient';

export const userAPI = {
  getAll: (params) => {
    return axiosClient.get('/user/list', { params });
  },
  
  getById: (id) => {
    return axiosClient.get(`/user/detail/${id}`);
  },
  
  create: (data) => {
    return axiosClient.post('/user/create', data);
  },
  
  update: (id, data) => {
    return axiosClient.put(`/user/update/${id}`, data);
  },
  
  delete: (id) => {
    return axiosClient.delete(`/user/delete/${id}`);
  },
};
