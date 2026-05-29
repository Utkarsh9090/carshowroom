import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, Menu, X, LogOut, User, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../services/authService';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path ? 'active' : '';
  
  // Determine transparency based on route and scroll
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className={`navbar ${isTransparent ? 'transparent' : 'scrolled'}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <Car size={32} color="var(--color-red)" />
          AutoHub <span>India</span>
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/cars" className={`nav-link ${isActive('/cars')}`}>Cars</Link>
          <Link to="/compare" className={`nav-link ${isActive('/compare')}`}>Compare</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
          
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {currentUser.role === 'admin' && (
                <Link to="/admin" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-primary)' }}>
                  <ShieldAlert size={16} /> Admin
                </Link>
              )}
              <button 
                onClick={handleLogout} 
                className={isTransparent && !mobileMenuOpen ? "btn btn-outline" : "btn btn-outline"}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px' }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className={isTransparent && !mobileMenuOpen ? "btn btn-primary" : "btn btn-outline"}>
              Login
            </Link>
          )}
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
