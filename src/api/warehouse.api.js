import axiosClient from './axiosClient';

export const warehouseAPI = {
    // Get all warehouses
    getAll: (params) => {
        return axiosClient.get('/warehouse/list', { params });
    },

    // Create new warehouse
    create: (data) => {
        return axiosClient.post('/warehouse/create', data);
    },

    // Get warehouse by ID
    getById: (id) => {
        return axiosClient.get(`/warehouse/detail/${id}`);
    },

    // Update warehouse
    update: (id, data) => {
        return axiosClient.put(`/warehouse/update/${id}`, data);
    },

    // Delete warehouse
    delete: (id) => {
        return axiosClient.delete(`/warehouse/delete/${id}`);
    },

    // Lock/unlock warehouse
    lock: (id, isActive) => {
        return axiosClient.put(`/warehouse/lock/${id}`, { isActive });
    },
};
