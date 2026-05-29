import React from 'react';
import { brands } from '../../data/cars';
import { useNavigate } from 'react-router-dom';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const BrandSection = () => {
  const navigate = useNavigate();
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="brands-section" ref={ref}>
      <div className="container">
        <h2 className={`section-title animate-on-scroll fade-in-up ${isVisible ? 'is-visible' : ''}`}>Explore <span>Brands</span></h2>
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className={`brand-item animate-on-scroll fade-in-up ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => navigate(`/cars?brand=${brand.name.toLowerCase()}`)}
            >
              <img src={brand.logo} alt={brand.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
