import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authService } from '../../services/authService';
import '../../styles/auth.css';

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      verifyAccount(token);
    } else {
      setError('Invalid verification link');
      setLoading(false);
    }
  }, [searchParams]);

  const verifyAccount = async (token) => {
    try {
      const response = await authService.verify(token);
      setMessage(response.message || 'Account verified successfully!');
    } catch (err) {
      setError('Verification failed. Token may be expired or invalid.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="logo">
          <h1>🎓 CampusTrack</h1>
          <p>Intelligent Lost and Found Locator</p>
        </div>
        
        <h2>Account Verification</h2>
        
        <div className="verification-container">
          {loading && (
            <div>
              <div className="icon">🔄</div>
              <p>Verifying your account...</p>
            </div>
          )}
          
          {error && (
            <div>
              <div className="icon error-icon">❌</div>
              <div className="error">{error}</div>
            </div>
          )}
          
          {message && (
            <div>
              <div className="icon success-icon">✅</div>
              <div className="success">{message}</div>
            </div>
          )}
        </div>
        
        {!loading && (
          <div className="auth-links">
            <a href="/login">Continue to Login</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;