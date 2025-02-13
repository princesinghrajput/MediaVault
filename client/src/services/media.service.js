import api from './httpServices';

const mediaService = {
  uploadMedia: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },

  getAllMedia: async (page = 1, limit = 9) => {
    try {
      const response = await api.get(`/media`, {
        params: { page, limit }
      });
      
      return {
        media: response.data.media,
        hasMore: response.data.hasMore,
        total: response.data.total
      };
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  deleteMedia: async (id) => {
    try {
      const response = await api.delete(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  },

  filterMediaByType: async (type, page = 1, limit = 9) => {
    try {
      const response = await api.get(`/media/filter/${type}`, {
        params: { page, limit }
      });
      
      return {
        media: response.data.media,
        hasMore: response.data.hasMore,
        total: response.data.total
      };
    } catch (error) {
      console.error('Filter error:', error);
      throw error;
    }
  }
};

export default mediaService; 