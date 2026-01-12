import axiosClient from './axiosClient';

export const warehouseAPI = {
    // Get all warehouses
    getAll: (params) => {
        return axiosClient.get('/warehouse/list', { params });
    },

    // Create new warehouse (with FormData for image upload)
    create: (formData) => {
        return axiosClient.post('/warehouse/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // Update warehouse (with FormData for image upload)
    update: (id, formData) => {
        return axiosClient.put(`/warehouse/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // Lock/unlock warehouse
    lock: (id, isActive) => {
        return axiosClient.put(`/warehouse/lock/${id}`, { isActive });
    },
};
