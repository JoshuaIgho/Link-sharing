import api from './api';

export const analyticsService = {
  getOverview: async () => {
    const response = await api.get('/analytics/overview');
    return response.data.data;
  },

  getLinkAnalytics: async () => {
    const response = await api.get('/analytics/links');
    return response.data.data;
  },
};