import api from './api';
import { storage } from '../utils/storage';

export const authService = {
  register: async (email, password, username) => {
    const response = await api.post('/auth/register', { email, password, username });
    const { user, accessToken, refreshToken } = response.data.data;
    
    storage.setToken(accessToken);
    storage.setRefreshToken(refreshToken);
    storage.setUser(user);
    
    
    return user;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { user, accessToken, refreshToken } = response.data.data;
    
    storage.setToken(accessToken);
    storage.setRefreshToken(refreshToken);
    storage.setUser(user);
    
    
    return user;
  },

  logout: () => {
    storage.clear();
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    const user = response.data.data;
    storage.setUser(user);
    return user;
  },

  isAuthenticated: () => {
    return !!storage.getToken();
  },
};