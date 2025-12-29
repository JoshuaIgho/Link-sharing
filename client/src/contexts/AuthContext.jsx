import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { storage } from '../utils/storage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = storage.getToken();
      const storedUser = storage.getUser();

      console.log('🔍 Init Auth - Token:', token ? 'EXISTS' : 'MISSING');
      console.log('🔍 Init Auth - User:', storedUser);

      if (token && storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
        
        // Verify token is still valid
        try {
          const currentUser = await authService.getCurrentUser();
          console.log('✅ Token valid, user:', currentUser);
          setUser(currentUser);
        } catch (error) {
          console.error('❌ Token invalid:', error);
          // Token invalid, clear storage
          storage.clear();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    console.log('🔐 Login attempt...');
    const user = await authService.login(email, password);
    console.log('✅ Login successful:', user);
    console.log('🔑 Token stored:', storage.getToken());
    setUser(user);
    setIsAuthenticated(true);
    return user;
  };

  const register = async (email, password, username) => {
    console.log('📝 Register attempt...');
    const user = await authService.register(email, password, username);
    console.log('✅ Registration successful:', user);
    console.log('🔑 Token stored:', storage.getToken());
    setUser(user);
    setIsAuthenticated(true);
    return user;
  };

  const logout = () => {
    console.log('👋 Logging out...');
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    storage.setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};