import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      // Redirect will be handled by App.js
    } catch (err) {
      setError('Login failed. Please check your credentials.');
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
        
        <h2>Welcome Back</h2>
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          {/* <label>University Email</label> */}
          <input
            type="email"
            placeholder="Enter your university email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          {/* <label>Password</label> */}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading && <span className="loading-spinner"></span>}
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        
        <div className="auth-links">
          <p>New to CampusTrack? <a href="/register">Create your account</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;