import axiosClient from './axiosClient';

export const categoryAPI = {
    // Get all categories
    getAll: (params) => {
        return axiosClient.get('/category/list', { params });
    },

    // Create new category
    create: (data) => {
        return axiosClient.post('/category/create', data);
    },

    // Update category
    update: (id, data) => {
        return axiosClient.put(`/category/update/${id}`, data);
    },

    // Lock/unlock category
    lock: (id, isActive) => {
        return axiosClient.put(`/category/lock/${id}`, { isActive });
    },
};
