import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { lostItemService } from '../../services/lostItemService';
import CategorySelect from './CategorySelect';
import ImageUpload from './ImageUpload';
import './ReportLostForm.css';

const ReportLostForm = ({ onClose, onSuccess }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    categoryId: '',
    lostLocation: '',
    lostDate: '',
    photoUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }

    if (!formData.lostLocation.trim()) {
      newErrors.lostLocation = 'Lost location is required';
    }

    if (!formData.lostDate) {
      newErrors.lostDate = 'Lost date is required';
    } else {
      console.log('Validating date:', formData.lostDate);
      const selectedDate = new Date(formData.lostDate);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // Set to end of today
      if (selectedDate > today) {
        newErrors.lostDate = 'Lost date cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Convert date to YYYY-MM-DD format
      let convertedDate = formData.lostDate;
      if (formData.lostDate) {
        if (formData.lostDate.includes('/')) {
          // Handle MM/DD/YYYY format
          const [month, day, year] = formData.lostDate.split('/');
          convertedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } else if (formData.lostDate.includes('-') && formData.lostDate.length === 10) {
          // Already in YYYY-MM-DD format
          convertedDate = formData.lostDate;
        }
      }
      
      const submitData = {
        ...formData,
        lostDate: convertedDate,
        categoryId: parseInt(formData.categoryId),
        reporterEmail: currentUser.email,
        reporterName: currentUser.email.split('@')[0]
      };

      console.log('Original date:', formData.lostDate);
      console.log('Converted date:', convertedDate);
      console.log('Final submit data:', submitData);
      await lostItemService.createLostItem(submitData);
      
      // Success feedback
      alert('Lost item reported successfully!');
      
      // Reset form
      setFormData({
        itemName: '',
        description: '',
        categoryId: '',
        lostLocation: '',
        lostDate: '',
        photoUrl: ''
      });
      
      if (onSuccess) onSuccess();
      if (onClose) onClose();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Failed to report lost item: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="report-lost-overlay">
      <div className="report-lost-modal">
        <div className="modal-header">
          <h2>📝 Report Lost Item</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label htmlFor="itemName">Item Name *</label>
            <input
              type="text"
              id="itemName"
              value={formData.itemName}
              onChange={(e) => handleInputChange('itemName', e.target.value)}
              className={`form-control ${errors.itemName ? 'error' : ''}`}
              placeholder="e.g., iPhone 13, Blue Backpack"
              maxLength={100}
            />
            {errors.itemName && <span className="error-message">{errors.itemName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="form-control"
              placeholder="Describe your item in detail (color, brand, distinctive features...)"
              rows={3}
              maxLength={500}
            />
            <small className="char-count">{formData.description.length}/500</small>
          </div>

          <CategorySelect
            value={formData.categoryId}
            onChange={(value) => handleInputChange('categoryId', value)}
            error={errors.categoryId}
          />

          <div className="form-group">
            <label htmlFor="lostLocation">Lost Location *</label>
            <input
              type="text"
              id="lostLocation"
              value={formData.lostLocation}
              onChange={(e) => handleInputChange('lostLocation', e.target.value)}
              className={`form-control ${errors.lostLocation ? 'error' : ''}`}
              placeholder="e.g., Library 2nd Floor, Cafeteria, Parking Lot A"
              maxLength={200}
            />
            {errors.lostLocation && <span className="error-message">{errors.lostLocation}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lostDate">Lost Date *</label>
            <input
              type="date"
              id="lostDate"
              value={formData.lostDate}
              onChange={(e) => {
                console.log('Date input value:', e.target.value);
                console.log('Date input type:', typeof e.target.value);
                handleInputChange('lostDate', e.target.value);
              }}
              className={`form-control ${errors.lostDate ? 'error' : ''}`}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.lostDate && <span className="error-message">{errors.lostDate}</span>}
          </div>

          <ImageUpload
            onImageUpload={(url) => handleInputChange('photoUrl', url)}
            currentImage={formData.photoUrl}
          />

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Reporting...' : 'Report Lost Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportLostForm;