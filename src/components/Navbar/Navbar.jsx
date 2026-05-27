import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
          <Link to="/login" className={isTransparent && !mobileMenuOpen ? "btn btn-primary" : "btn btn-outline"}>
            Login
          </Link>
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
