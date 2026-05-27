import React, { useState, useEffect } from 'react';
import CarCard from '../CarCard/CarCard';
import { getFeaturedCars } from '../../services/carService';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const FeaturedCars = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  
  useEffect(() => {
    const fetchCars = async () => {
      const cars = await getFeaturedCars();
      setFeaturedCars(cars);
    };
    fetchCars();
  }, []);

  return (
    <section 
      ref={ref} 
      className={`featured-cars-section animate-on-scroll fade-in-up ${isVisible ? 'is-visible' : ''}`} 
      style={{ padding: '80px 0' }}
    >
      <div className="container">
        <h2 className="section-title">Featured <span>Vehicles</span></h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {featuredCars.map((car, index) => (
            <div key={car.id} style={{ transitionDelay: `${index * 150}ms` }} className={`animate-on-scroll fade-in-up ${isVisible ? 'is-visible' : ''}`}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
