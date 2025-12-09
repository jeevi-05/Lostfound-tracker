import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { foundItemService } from '../../services/foundItemService';
import CategorySelect from './CategorySelect';
import ImageUpload from './ImageUpload';
import './ReportFoundForm.css';

const ReportFoundForm = ({ onClose, onSuccess }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    categoryId: '',
    foundLocation: '',
    foundDate: '',
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

    if (!formData.foundLocation.trim()) {
      newErrors.foundLocation = 'Found location is required';
    }

    if (!formData.foundDate) {
      newErrors.foundDate = 'Found date is required';
    } else {
      console.log('Validating date:', formData.foundDate);
      const selectedDate = new Date(formData.foundDate);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // Set to end of today
      if (selectedDate > today) {
        newErrors.foundDate = 'Found date cannot be in the future';
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
      let convertedDate = formData.foundDate;
      if (formData.foundDate) {
        if (formData.foundDate.includes('/')) {
          // Handle MM/DD/YYYY format
          const [month, day, year] = formData.foundDate.split('/');
          convertedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } else if (formData.foundDate.includes('-') && formData.foundDate.length === 10) {
          // Already in YYYY-MM-DD format
          convertedDate = formData.foundDate;
        }
      }
      
      const submitData = {
        ...formData,
        foundDate: convertedDate,
        categoryId: parseInt(formData.categoryId),
        finderEmail: currentUser.email,
        finderName: currentUser.email.split('@')[0]
      };

      console.log('Original date:', formData.foundDate);
      console.log('Converted date:', convertedDate);
      console.log('Final submit data:', submitData);
      await foundItemService.createFoundItem(submitData);
      
      // Success feedback
      alert('Found item reported successfully!');
      
      // Reset form
      setFormData({
        itemName: '',
        description: '',
        categoryId: '',
        foundLocation: '',
        foundDate: '',
        photoUrl: ''
      });
      
      if (onSuccess) onSuccess();
      if (onClose) onClose();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Failed to report found item: ${error.message}`);
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
    <div className="report-found-overlay" data-extension-ignore="true">
      <div className="report-found-modal" data-extension-ignore="true">
        <div className="modal-header">
          <h2>Report Found Asset</h2>
        </div>

        <form onSubmit={handleSubmit} className="report-form" data-extension-ignore="true">
          <div className="form-left">
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

            <CategorySelect
              value={formData.categoryId}
              onChange={(value) => handleInputChange('categoryId', value)}
              error={errors.categoryId}
            />

            <div className="form-group">
              <label htmlFor="foundLocation">Found Location *</label>
              <input
                type="text"
                id="foundLocation"
                value={formData.foundLocation}
                onChange={(e) => handleInputChange('foundLocation', e.target.value)}
                className={`form-control ${errors.foundLocation ? 'error' : ''}`}
                placeholder="e.g., Library 2nd Floor, Cafeteria, Parking Lot A"
                maxLength={200}
              />
              {errors.foundLocation && <span className="error-message">{errors.foundLocation}</span>}
            </div>
          </div>

          <div className="form-right">
            <div className="form-group">
              <label htmlFor="foundDate">Found Date *</label>
              <input
                type="date"
                id="foundDate"
                value={formData.foundDate}
                onChange={(e) => {
                  console.log('Date input value:', e.target.value);
                  console.log('Date input type:', typeof e.target.value);
                  handleInputChange('foundDate', e.target.value);
                }}
                className={`form-control ${errors.foundDate ? 'error' : ''}`}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.foundDate && <span className="error-message">{errors.foundDate}</span>}
            </div>

            <ImageUpload
              onImageUpload={(url) => handleInputChange('photoUrl', url)}
              currentImage={formData.photoUrl}
            />
          </div>

          <div className="form-full-width">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="form-control"
                placeholder="Describe the item in detail (color, brand, distinctive features...)"
                rows={4}
                maxLength={500}
              />
              <small className="char-count">{formData.description.length}/500</small>
            </div>
          </div>

          <div className="contact-info form-full-width">
            <h4>Contact Information</h4>
            <div className="contact-fields">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={currentUser?.email || ''}
                  className="form-control"
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={currentUser?.email?.split('@')[0] || ''}
                  className="form-control"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="form-actions form-full-width">
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
              {loading ? 'Reporting...' : 'Report Found Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportFoundForm;