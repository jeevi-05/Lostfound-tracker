import React, { useState, useEffect } from 'react';
import { lostItemService } from '../../services/lostItemService';

const CategorySelect = ({ value, onChange, error }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...');
      const data = await lostItemService.getCategories();
      console.log('Categories received:', data);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback categories if backend is not available
      const fallbackCategories = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Books' },
        { id: 3, name: 'Clothing' },
        { id: 4, name: 'Documents' },
        { id: 5, name: 'Other' }
      ];
      setCategories(fallbackCategories);
      alert('Using offline categories. Please start the backend for full functionality.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="category">Category *</label>
      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`form-control ${error ? 'error' : ''}`}
        disabled={loading}
      >
        <option value="">{loading ? 'Loading categories...' : 'Select a category'}</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {categories.length === 0 && !loading && (
        <small style={{color: 'red'}}>No categories found. Check backend connection.</small>
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default CategorySelect;