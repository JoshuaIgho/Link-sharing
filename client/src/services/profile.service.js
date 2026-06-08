import api from './api';

export const profileService = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/profile', data);
    return response.data.data;
  },

  uploadAvatar: async (file) => {
    
    const formData = new FormData();
    formData.append('avatar', file);
    
    // Log FormData contents
    for (let [key, value] of formData.entries()) {
    }
    
    const response = await api.post('/profile/avatar', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.data;
  },

  deleteAvatar: async () => {
    const response = await api.delete('/profile/avatar');
    return response.data.data;
  },

  checkUsernameAvailability: async (username) => {
    const response = await api.get(`/profile/availability/${username}`);
    return response.data.data.available;
  },
};