import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const [lost, found] = await Promise.all([
          adminService.getLostItems(null, null, null),
          adminService.getFoundItems(null, null, null)
        ]);
        setPostCount(lost.length + found.length);
      } catch (error) {
        console.error('Error fetching post count:', error);
      }
    };
    fetchPostCount();
  }, []);

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
        <div 
          style={cardStyle} 
          onClick={() => navigate('/admin/manage-posts')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(33, 150, 243, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
          }}
        >
          <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>📝 Manage Posts</h3>
          <p>View and manage all lost/found reports</p>
          <div style={{ fontSize: '2rem', color: '#667eea', marginTop: '1rem' }}>{postCount}</div>
          <small style={{ color: '#7f8c8d' }}>Active Posts</small>
        </div>
        
        <div 
          style={cardStyle} 
          onClick={() => navigate('/admin/user-management')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(33, 150, 243, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
          }}
        >
          <h3 style={{ color: '#51cf66', marginBottom: '1rem' }}>👥 User Management</h3>
          <p>Manage student accounts and verification</p>
          <div style={{ fontSize: '2rem', color: '#51cf66', marginTop: '1rem' }}>150</div>
          <small style={{ color: '#7f8c8d' }}>Registered Users</small>
        </div>
        
        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(33, 150, 243, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
          }}
        >
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
        <OverviewTab />
      </div>
    </div>
  );
};

export default AdminDashboard;