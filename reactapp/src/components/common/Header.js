import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const headerStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1rem 2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  };

  const logoStyle = {
    color: 'white',
    fontSize: '1.8rem',
    fontWeight: '700',
    textDecoration: 'none'
  };

  const profileContainerStyle = {
    position: 'relative'
  };

  const profileButtonStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    transition: 'background 0.3s ease'
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '55px',
    right: '0',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    padding: '1rem',
    minWidth: '200px',
    display: showDropdown ? 'block' : 'none'
  };

  const dropdownItemStyle = {
    padding: '0.5rem 0',
    borderBottom: '1px solid #f0f0f0',
    color: '#333'
  };

  const logoutButtonStyle = {
    background: '#ff6b6b',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '0.5rem'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'background 0.3s ease'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <a href="/" style={logoStyle}>
          🎓 CampusTrack
        </a>
        
        {currentUser ? (
          <div style={profileContainerStyle}>
            <button 
              style={profileButtonStyle}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              👤
            </button>
            
            <div style={dropdownStyle}>
              <div style={dropdownItemStyle}>
                <strong>{currentUser.email.split('@')[0]}</strong>
              </div>
              <div style={dropdownItemStyle}>
                Role: {currentUser.role}
              </div>
              <button onClick={logout} style={logoutButtonStyle}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <a href="/login" style={linkStyle}>Login</a>
            <a href="/register" style={linkStyle}>Register</a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;