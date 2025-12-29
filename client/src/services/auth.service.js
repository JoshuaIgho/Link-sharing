import api from './api';
import { storage } from '../utils/storage';

export const authService = {
  register: async (email, password, username) => {
    console.log('📝 authService.register called');
    const response = await api.post('/auth/register', { email, password, username });
    const { user, accessToken, refreshToken } = response.data.data;
    
    console.log('💾 Storing tokens...');
    storage.setToken(accessToken);
    storage.setRefreshToken(refreshToken);
    storage.setUser(user);
    
    console.log('✅ Tokens stored');
    console.log('🔑 Access Token:', accessToken.substring(0, 20) + '...');
    
    return user;
  },

  login: async (email, password) => {
    console.log('🔐 authService.login called');
    const response = await api.post('/auth/login', { email, password });
    const { user, accessToken, refreshToken } = response.data.data;
    
    console.log('💾 Storing tokens...');
    storage.setToken(accessToken);
    storage.setRefreshToken(refreshToken);
    storage.setUser(user);
    
    console.log('✅ Tokens stored');
    console.log('🔑 Access Token:', accessToken.substring(0, 20) + '...');
    
    return user;
  },

  logout: () => {
    console.log('👋 authService.logout called');
    storage.clear();
  },

  getCurrentUser: async () => {
    console.log('👤 authService.getCurrentUser called');
    const response = await api.get('/auth/me');
    const user = response.data.data;
    storage.setUser(user);
    return user;
  },

  isAuthenticated: () => {
    return !!storage.getToken();
  },
};