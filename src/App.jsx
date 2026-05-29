import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Compare from './pages/Compare';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { Car } from 'lucide-react';

// import { subscribeToAuthChanges } removed

const GlobalLoader = () => (
  <div className="global-loader">
    <div className="loader-content">
      <Car size={64} color="var(--accent-primary)" className="loader-icon" />
      <div className="loader-text">AutoHub <span style={{ color: 'var(--accent-primary)' }}>India</span></div>
      <div className="loading-bar">
        <div className="loading-progress"></div>
      </div>
    </div>
  </div>
);

// Layout wrapper to conditionally hide Navbar/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

// Admin Route Wrapper
const AdminRoute = ({ children, user, isLoading }) => {
  if (isLoading) return <GlobalLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { currentUser: user, loading: isLoading } = useAuth();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin/*" 
            element={
              <AdminRoute user={user} isLoading={isLoading}>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
