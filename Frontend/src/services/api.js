import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectAPI = {
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  create: async formData => {
    const response = await api.post('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const clientAPI = {
  getAll: async () => {
    const response = await api.get('/clients');
    return response.data;
  },

  create: async formData => {
    const response = await api.post('/clients', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const contactAPI = {
  getAll: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  create: async data => {
    const response = await api.post('/contact', data);
    return response.data;
  },
};

export const newsletterAPI = {
  getAll: async () => {
    const response = await api.get('/newsletter');
    return response.data;
  },

  subscribe: async data => {
    const response = await api.post('/newsletter', data);
    return response.data;
  },
};

export default api;
