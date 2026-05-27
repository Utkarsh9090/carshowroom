import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './CtaSection.css';

const sliderImages = [
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1503376712341-03f0f5b80456?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800'
];

const CtaSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="cta-section" ref={ref}>
      <div className="container">
        <div className="cta-container">
          <div className={`cta-content animate-on-scroll slide-in-left ${isVisible ? 'is-visible' : ''}`}>
            <h2 className="cta-title">
              Ready to Drive Your <span className="text-gradient">Dream Car?</span>
            </h2>
            <p className="cta-desc">
              Experience the ultimate combination of luxury, performance, and style. 
              Book a test drive today or explore our exclusive collection of premium vehicles.
            </p>
            <div className="cta-actions">
              <Link to="/cars" className="btn-primary cta-btn">
                Explore Cars <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn-outline cta-btn">
                <Phone size={20} /> Contact Us
              </Link>
            </div>
          </div>
          <div className={`cta-slider-wrapper animate-on-scroll slide-in-right ${isVisible ? 'is-visible' : ''}`}>
            <div className="cta-slider-container">
              {sliderImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`cta-slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <img src={img} alt={`Luxury Car ${index + 1}`} />
                </div>
              ))}
              <div className="slider-indicators">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
