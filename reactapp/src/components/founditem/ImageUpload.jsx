import React, { useState } from 'react';
import { foundItemService } from '../../services/foundItemService';
import './ImageUpload.css';

const ImageUpload = ({ onImageUpload, currentImage }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);
  const [error, setError] = useState('');

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const result = await foundItemService.uploadPhoto(file);
      onImageUpload(result.url);
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Failed to upload image. Please try again.');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUpload('');
    setError('');
  };

  return (
    <div className="image-upload">
      <label className="upload-label">Photo (Optional)</label>
      
      {!preview ? (
        <label className="upload-area">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="upload-input"
          />
          <div className="upload-content">
            <div className="upload-icon">📷</div>
            <p className="upload-text">
              {uploading ? 'Uploading...' : 'Click to upload photo'}
            </p>
            <p className="upload-hint">PNG, JPG up to 5MB</p>
          </div>
        </label>
      ) : (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="preview-image" />
          <button
            type="button"
            onClick={removeImage}
            className="remove-button"
            disabled={uploading}
          >
            ✕
          </button>
        </div>
      )}
      
      {error && <div className="upload-error">{error}</div>}
    </div>
  );
};

export default ImageUpload;