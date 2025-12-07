import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/common/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import VerifyAccount from './components/auth/VerifyAccount';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import ReportLostForm from './components/lostitem/ReportLostForm';
import ReportFoundForm from './components/founditem/ReportFoundForm';
import './App.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [showReportLost, setShowReportLost] = useState(false);
  const [showReportFound, setShowReportFound] = useState(false);
  
  const dashboardStyle = {
    minHeight: 'calc(100vh - 80px)',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '3rem 2rem'
  };
  
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };
  
  const welcomeStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '3rem 2rem',
    borderRadius: '20px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    marginBottom: '3rem',
    color: 'white',
    position: 'relative',
    overflow: 'hidden'
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
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease'
  };
  
  const getCardStyle = (isActive) => ({
    ...cardStyle,
    background: isActive ? '#e3f2fd' : 'white',
    border: isActive ? '2px solid #2196f3' : '2px solid transparent',
    transform: isActive ? 'translateY(-5px)' : 'none',
    boxShadow: isActive ? '0 10px 30px rgba(33, 150, 243, 0.3)' : '0 5px 20px rgba(0, 0, 0, 0.1)'
  });
  
  return (
    <div style={dashboardStyle}>
      <div style={containerStyle}>
        <div style={welcomeStyle}>
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
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              color: 'white'
            }}>Welcome to CampusTrack!</h1>
            <p style={{
              fontSize: '1.3rem',
              marginBottom: '1.5rem',
              opacity: 0.9,
              color: 'white'
            }}>Intelligent Lost and Found Locator for Your Campus</p>
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
                fontWeight: '500',
                color: 'white'
              }}>Student: <strong>{currentUser?.email.split('@')[0].toUpperCase()}</strong></p>
            </div>
          </div>
        </div>
        
        <div style={statsStyle}>
          <div 
            style={cardStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 10px 30px rgba(33, 150, 243, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            }}
          >
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>🔍 Find Items</h3>
            <p>Search for lost items reported by other students</p>
          </div>
          
          <div 
            style={getCardStyle(showReportLost)}
            onClick={() => setShowReportLost(true)}
            onMouseEnter={(e) => {
              if (!showReportLost) {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 10px 30px rgba(33, 150, 243, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!showReportLost) {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            <h3 style={{ color: '#51cf66', marginBottom: '1rem' }}>📝 Report Lost</h3>
            <p>Report items you've lost on campus</p>
          </div>
          
          <div 
            style={getCardStyle(showReportFound)}
            onClick={() => setShowReportFound(true)}
            onMouseEnter={(e) => {
              if (!showReportFound) {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 10px 30px rgba(33, 150, 243, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!showReportFound) {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            <h3 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>🎁 Report Found</h3>
            <p>Help others by reporting items you've found</p>
          </div>
        </div>
        
        {showReportLost && (
          <ReportLostForm
            onClose={() => setShowReportLost(false)}
            onSuccess={() => setShowReportLost(false)}
          />
        )}
        
        {showReportFound && (
          <ReportFoundForm
            onClose={() => setShowReportFound(false)}
            onSuccess={() => setShowReportFound(false)}
          />
        )}
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={currentUser ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={currentUser ? <Navigate to="/dashboard" /> : <Register />} 
        />
        <Route path="/verify" element={<VerifyAccount />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <>
                <Header />
                {currentUser?.role === 'ADMIN' ? <AdminDashboard /> : <Dashboard />}
              </>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/" 
          element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;