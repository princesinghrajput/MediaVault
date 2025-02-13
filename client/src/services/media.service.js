import api from './httpServices';

const mediaService = {
  uploadMedia: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await api.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  },

  getAllMedia: async (page = 1, limit = 9) => {
    const response = await api.get(`/media?page=${page}&limit=${limit}`);
    return {
      media: response.data.media || response.data,
      hasMore: response.data.hasMore || false,
      total: response.data.total || 0
    };
  },

  deleteMedia: async (id) => {
    const response = await api.delete(`/media/${id}`);
    return response.data;
  },

  filterMediaByType: async (type, page = 1, limit = 9) => {
    const response = await api.get(`/media/filter/${type}?page=${page}&limit=${limit}`);
    return {
      media: response.data.media || response.data,
      hasMore: response.data.hasMore || false,
      total: response.data.total || 0
    };
  }
};

export default mediaService; 