import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1.5rem 2rem',
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

  const navLinkStyle = (isActive) => ({
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.6rem 1.5rem',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
    background: isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)'
  });

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <a href="/" style={logoStyle}>
          🎓 CampusTrack
        </a>
        
        {currentUser ? (
          <div style={navStyle}>
            {currentUser.role === 'ADMIN' && (location.pathname.startsWith('/admin')) && (
              <>
                <a href="/admin/manage-posts" style={navLinkStyle(location.pathname === '/admin/manage-posts')}>Manage Posts</a>
                <a href="/admin/user-management" style={navLinkStyle(location.pathname === '/admin/user-management')}>User Management</a>
                <a href="/admin/analytics" style={navLinkStyle(location.pathname === '/admin/analytics')}>Analytics</a>
              </>
            )}
            {(location.pathname === '/report-lost' || location.pathname === '/report-found') && (
              <>
                <a href="/report-lost" style={navLinkStyle(location.pathname === '/report-lost')}>Report Lost</a>
                <a href="/report-found" style={navLinkStyle(location.pathname === '/report-found')}>Report Found</a>
              </>
            )}
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
              <button onClick={handleLogout} style={logoutButtonStyle}>
                Logout
              </button>
            </div>
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