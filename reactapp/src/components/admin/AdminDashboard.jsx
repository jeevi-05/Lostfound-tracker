import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ManagePosts from './ManagePosts';
import UserManagement from './UserManagement';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const dashboardStyle = {
    minHeight: 'calc(100vh - 80px)',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '3rem 2rem'
  };
  
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };
  
  
  const statsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  };
  
  const cardStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  };

  const tabsStyle = {
    display: 'flex',
    background: 'white',
    borderRadius: '15px',
    padding: '0.5rem',
    marginBottom: '2rem',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)'
  };

  const tabStyle = (isActive) => ({
    flex: 1,
    padding: '1rem 2rem',
    border: 'none',
    background: isActive ? '#667eea' : 'transparent',
    color: isActive ? 'white' : '#666',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  });

  const OverviewTab = () => (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '3rem 2rem',
        borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        marginBottom: '3rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%'
        }}></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '1rem',
            borderRadius: '50%',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '3rem' }}>🎓</span>
          </div>
          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>Campus Administration</h1>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '1.5rem',
            opacity: 0.9
          }}>Lost & Found Management Portal</p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '1rem 2rem',
            borderRadius: '50px',
            display: 'inline-block',
            backdropFilter: 'blur(10px)'
          }}>
            <p style={{
              fontSize: '1.1rem',
              margin: 0,
              fontWeight: '500'
            }}>Administrator: <strong>{currentUser?.email.split('@')[0].toUpperCase()}</strong></p>
          </div>
        </div>
      </div>
      
      <div style={statsStyle}>
        <div style={cardStyle} onClick={() => setActiveTab('posts')}>
          <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>📝 Manage Posts</h3>
          <p>View and manage all lost/found reports</p>
          <div style={{ fontSize: '2rem', color: '#667eea', marginTop: '1rem' }}>25</div>
          <small style={{ color: '#7f8c8d' }}>Active Posts</small>
        </div>
        
        <div style={cardStyle} onClick={() => setActiveTab('users')}>
          <h3 style={{ color: '#51cf66', marginBottom: '1rem' }}>👥 User Management</h3>
          <p>Manage student accounts and verification</p>
          <div style={{ fontSize: '2rem', color: '#51cf66', marginTop: '1rem' }}>150</div>
          <small style={{ color: '#7f8c8d' }}>Registered Users</small>
        </div>
        
        <div style={cardStyle}>
          <h3 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>📊 Analytics</h3>
          <p>View system statistics and reports</p>
          <div style={{ fontSize: '2rem', color: '#ff6b6b', marginTop: '1rem' }}>85%</div>
          <small style={{ color: '#7f8c8d' }}>Success Rate</small>
        </div>
      </div>
    </div>
  );

  return (
    <div style={dashboardStyle}>
      <div style={containerStyle}>
        <div style={tabsStyle}>
          <button style={tabStyle(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>🏠 Overview</button>
          <button style={tabStyle(activeTab === 'posts')} onClick={() => setActiveTab('posts')}>📝 Manage Posts</button>
          <button style={tabStyle(activeTab === 'users')} onClick={() => setActiveTab('users')}>👥 User Management</button>
        </div>

        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'posts' && <ManagePosts />}
        {activeTab === 'users' && <UserManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;