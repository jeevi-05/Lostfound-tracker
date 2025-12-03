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
import './App.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [showReportLost, setShowReportLost] = useState(false);
  
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
    background: 'white',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    marginBottom: '2rem'
  };
  
  const titleStyle = {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '1rem',
    fontWeight: '700'
  };
  
  const subtitleStyle = {
    fontSize: '1.2rem',
    color: '#7f8c8d',
    marginBottom: '2rem'
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
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };
  
  return (
    <div style={dashboardStyle}>
      <div style={containerStyle}>
        <div style={welcomeStyle}>
          <h1 style={titleStyle}>Welcome to CampusTrack! 🎓</h1>
          <p style={subtitleStyle}>Intelligent Lost and Found Locator for Your Campus</p>
          <p style={{ color: '#34495e', fontSize: '1.1rem' }}>
            Hello, <strong>{currentUser?.email.split('@')[0]}</strong> ({currentUser?.role})
          </p>
        </div>
        
        <div style={statsStyle}>
          <div style={cardStyle}>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>🔍 Find Items</h3>
            <p>Search for lost items reported by other students</p>
          </div>
          
          <div 
            style={cardStyle}
            onClick={() => setShowReportLost(true)}
          >
            <h3 style={{ color: '#51cf66', marginBottom: '1rem' }}>📝 Report Lost</h3>
            <p>Report items you've lost on campus</p>
          </div>
          
          <div style={cardStyle}>
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