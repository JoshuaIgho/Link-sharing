import api from './api';

export const publicService = {
  getPublicProfile: async (username) => {
    const response = await api.get(`/public/${username}`);
    return response.data.data;
  },

  trackLinkClick: async (username, linkId) => {
    const response = await api.post(`/public/${username}/links/${linkId}/click`);
    return response.data.data;
  },
};