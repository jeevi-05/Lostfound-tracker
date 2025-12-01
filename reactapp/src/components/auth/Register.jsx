import React, { useState } from 'react';
import { authService } from '../../services/authService';
import '../../styles/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await authService.register(formData.name, formData.email, formData.password);
      // Hide token from user, show clean message
      setMessage('Registration successful! Please check your email for verification.');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="logo">
          <h1>🎓 CampusTrack</h1>
          <p>Intelligent Lost and Found Locator</p>
        </div>
        
        <h2>Join CampusTrack</h2>
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
        
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>University Email</label>
          <input
            type="email"
            name="email"
            placeholder="your.name@university.edu"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a secure password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading && <span className="loading-spinner"></span>}
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        
        <div className="auth-links">
          <p>Already have an account? <a href="/login">Sign in here</a> </p>
          
        </div>
      </form>
    </div>
  );
};

export default Register;