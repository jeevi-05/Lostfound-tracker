const API_BASE_URL = 'http://localhost:8080/api';

export const foundItemService = {
  // Create found item
  createFoundItem: async (foundItemData) => {
    console.log('Submitting found item data:', foundItemData);
    const response = await fetch(`${API_BASE_URL}/found-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foundItemData),
    });
    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to create found item: ${response.status} - ${errorText}`);
    }
    const result = await response.json();
    console.log('Success response:', result);
    return result;
  },

  // Get categories (reuse from lost items)
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

  // Upload photo (reuse from lost items)
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