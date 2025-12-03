const API_BASE_URL = 'http://localhost:8080/api';

export const lostItemService = {
  // Create lost item
  createLostItem: async (lostItemData) => {
    console.log('Submitting lost item data:', lostItemData);
    const response = await fetch(`${API_BASE_URL}/lost-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lostItemData),
    });
    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to create lost item: ${response.status} - ${errorText}`);
    }
    const result = await response.json();
    console.log('Success response:', result);
    return result;
  },

  // Get categories
  getCategories: async () => {
    console.log('Making request to:', `${API_BASE_URL}/categories`);
    const response = await fetch(`${API_BASE_URL}/categories`);
    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    const data = await response.json();
    console.log('Categories data:', data);
    return data;
  },

  // Upload photo
  uploadPhoto: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/upload/photo`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to upload photo');
    }
    return response.json();
  }
};