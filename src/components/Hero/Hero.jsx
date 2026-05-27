import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg"></div>
      <div className="container">
        <div className="hero-content glass-panel" style={{ padding: '40px', background: 'rgba(10,10,10,0.5)' }}>
          <span className="hero-subtitle">Premium Auto Dealership</span>
          <h1 className="hero-title">
            Discover Your <br />
            <span className="text-gradient">Dream Vehicle</span>
          </h1>
          <p className="hero-desc">
            Experience the thrill of driving with our exclusive collection of premium and luxury vehicles. Redefining your journey with uncompromised quality.
          </p>
          <div className="hero-actions">
            <Link to="/cars" className="btn-primary">
              Explore Inventory <ArrowRight size={20} />
            </Link>
            <button className="btn-outline">
              <Play size={20} /> View Showroom
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
