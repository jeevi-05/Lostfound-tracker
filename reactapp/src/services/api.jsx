import { API_BASE_URL } from '../utils/constants';

const api = {
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || result.error || 'Request failed');
    }
    return result;
  },

  get: async (endpoint, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });
    
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || result.error || 'Request failed');
    }
    return result;
  }
};

export default api;