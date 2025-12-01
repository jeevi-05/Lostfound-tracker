import api from './api';
import { AUTH_ENDPOINTS } from '../utils/constants';

export const authService = {
  login: async (email, password) => {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, { email, password });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
    }
    return response;
  },

  register: async (name, email, password) => {
    return await api.post(AUTH_ENDPOINTS.REGISTER, { name, email, password });
  },

  verify: async (token) => {
    return await api.get(`${AUTH_ENDPOINTS.VERIFY}?token=${token}`);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};