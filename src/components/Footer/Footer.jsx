import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="nav-logo" style={{ marginBottom: '20px', display: 'flex' }}>
              <Car size={32} color="#e63946" />
              AutoHub <span>India</span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Experience the pinnacle of automotive luxury. We offer an exclusive collection of premium vehicles tailored to your lifestyle.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" className="btn-icon">FB</a>
              <a href="#" className="btn-icon">TW</a>
              <a href="#" className="btn-icon">IG</a>
              <a href="#" className="btn-icon">YT</a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cars">Our Inventory</Link></li>
              <li><Link to="/compare">Compare Cars</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Brands</h4>
            <ul className="footer-links">
              <li><Link to="/cars?brand=bmw">BMW</Link></li>
              <li><Link to="/cars?brand=mercedes">Mercedes-Benz</Link></li>
              <li><Link to="/cars?brand=audi">Audi</Link></li>
              <li><Link to="/cars?brand=porsche">Porsche</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="footer-links" style={{ color: 'var(--text-secondary)' }}>
              <li>123 Luxury Drive, Worli</li>
              <li>Mumbai, Maharashtra 400018</li>
              <li>Phone: +91 98765 43210</li>
              <li>Email: info@autohub.in</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AutoHub India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
