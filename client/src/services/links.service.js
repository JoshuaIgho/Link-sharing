import api from './api';

export const linksService = {
  getLinks: async () => {
    const response = await api.get('/links');
    return response.data.data;
  },

  createLink: async (data) => {
    const response = await api.post('/links', data);
    return response.data.data;
  },

  updateLink: async (id, data) => {
    const response = await api.put(`/links/${id}`, data);
    return response.data.data;
  },

  deleteLink: async (id) => {
    const response = await api.delete(`/links/${id}`);
    return response.data.data;
  },

  uploadIcon: async (id, file) => {
    const formData = new FormData();
    formData.append('icon', file);
    
    const response = await api.post(`/links/${id}/icon`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  reorderLinks: async (linkId, newPosition) => {
    console.log('📤 Sending reorder request:', { linkId, newPosition });
    
    const response = await api.put('/links/reorder', { 
      linkId, 
      newPosition 
    });
    
    console.log('✅ Reorder response:', response.data);
    return response.data.data;
  },

  toggleLink: async (id) => {
    const response = await api.put(`/links/${id}/toggle`);
    return response.data.data;
  },
};