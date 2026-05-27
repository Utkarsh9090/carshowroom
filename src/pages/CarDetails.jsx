import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCarById } from '../services/carService';
import { Check, Calendar, Settings, Zap, Fuel, ArrowLeft, Truck, ChevronDown } from 'lucide-react';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      const fetchedCar = await getCarById(id);
      setCar(fetchedCar);
      setLoading(false);
    };
    fetchCar();
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '100vh' }}>Loading details...</div>;
  if (!car) return <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '100vh' }}>Vehicle not found.</div>;

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#fff', width: '100%', overflowX: 'hidden' }}>
      
      {/* Back Button (Fixed) */}
      <Link to="/cars" style={{ position: 'fixed', top: '90px', left: '30px', zIndex: 1000, display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', padding: '10px 15px', borderRadius: '20px', backdropFilter: 'blur(10px)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }} className="hover-lift">
        <ArrowLeft size={18} /> Back to Inventory
      </Link>

      {/* Hero Section */}
      <section id="overview" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${car.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.5)' }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, #0a0a0a 100%)' }}></div>
        
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', marginTop: '40px' }}>
          <div style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '10px', color: 'var(--accent-primary)' }}>{car.brand}</div>
          <h1 style={{ fontSize: '5rem', fontWeight: '800', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '2px', lineHeight: 1.1 }}>
            {car.model}
          </h1>
          <p style={{ fontSize: '1.8rem', fontWeight: '300', marginBottom: '40px', letterSpacing: '1px', color: '#ddd' }}>
            {car.tagline || 'Experience Premium Mobility'}
          </p>
          <div style={{ fontSize: '2.2rem', fontWeight: '700', marginBottom: '40px', display: 'inline-block', padding: '15px 30px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
            Starts at ₹ {(car.price / 100000).toFixed(2)} <span style={{ fontSize: '1.2rem', fontWeight: '400', color: '#aaa' }}>Lakh</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button className="btn-primary" style={{ padding: '16px 45px', fontSize: '1.1rem', borderRadius: '30px' }}>Book Now</button>
            <button className="btn-outline" style={{ padding: '16px 45px', fontSize: '1.1rem', borderRadius: '30px', backgroundColor: 'rgba(255,255,255,0.05)' }}>Test Drive</button>
          </div>
        </div>
        
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)' }}>
          <a href="#360-view" style={{ color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', opacity: 0.7, textDecoration: 'none' }} className="hover-lift">
            <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Scroll Down</span>
            <ChevronDown size={32} />
          </a>
        </div>
      </section>

      {/* Sticky Nav */}
      <nav style={{ position: 'sticky', top: '70px', backgroundColor: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)', zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '15px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
          <a href="#overview" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1.5px' }} onMouseOver={(e)=>e.target.style.color='#fff'} onMouseOut={(e)=>e.target.style.color='#aaa'}>Overview</a>
          <a href="#360-view" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1.5px' }} onMouseOver={(e)=>e.target.style.color='#fff'} onMouseOut={(e)=>e.target.style.color='#aaa'}>360° View</a>
          {car.sections && <a href="#features" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1.5px' }} onMouseOver={(e)=>e.target.style.color='#fff'} onMouseOut={(e)=>e.target.style.color='#aaa'}>Features</a>}
          <a href="#specs" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1.5px' }} onMouseOver={(e)=>e.target.style.color='#fff'} onMouseOut={(e)=>e.target.style.color='#aaa'}>Specs & Variants</a>
        </div>
      </nav>

      {/* 360 View Section */}
      <section id="360-view" style={{ padding: '120px 0', backgroundColor: '#0a0a0a' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: '700' }}>Explore Every Angle</h2>
            <p style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
              Interact with the 3D model below to see the stunning design from every perspective. Drag to rotate.
            </p>
          </div>
          <div style={{ maxWidth: '1000px', margin: '0 auto', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#111', height: '600px' }}>
            <iframe 
              src={car.brand === 'Mahindra' ? `https://auto.mahindra.com/360-view?cid=${car.model.replace(/\s+/g, '')}` : 'https://auto.mahindra.com/360-view?cid=ScorpioN'} 
              width="100%" 
              height="100%" 
              style={{ border: 'none' }} 
              title="360 Viewer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Rich Features Sections */}
      {car.sections && (
        <section id="features">
          {car.sections.map((section, index) => (
            <div key={section.id} style={{ 
              display: 'flex', 
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
              minHeight: '70vh',
              alignItems: 'stretch',
              backgroundColor: index % 2 === 0 ? '#111' : '#0a0a0a',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: '1 1 500px', padding: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: 'rgba(170, 59, 255, 0.1)', color: 'var(--accent-primary)', borderRadius: '30px', fontWeight: '600', fontSize: '0.9rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px', width: 'fit-content' }}>
                  {section.id}
                </div>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '30px', lineHeight: 1.1, fontWeight: '700' }}>{section.title}</h2>
                <p style={{ fontSize: '1.3rem', color: '#aaa', lineHeight: 1.7, maxWidth: '600px' }}>{section.content}</p>
              </div>
              
              <div style={{ 
                flex: '1 1 500px', 
                minHeight: '400px', 
                backgroundImage: `url(${section.image || car.image})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                filter: 'brightness(0.8)',
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: index % 2 === 0 ? 'linear-gradient(to right, #111 0%, transparent 20%)' : 'linear-gradient(to left, #0a0a0a 0%, transparent 20%)' }}></div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Specifications & Variants */}
      <section id="specs" style={{ padding: '120px 0', backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: '700' }}>Technical Specifications</h2>
            <p style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Everything you need to know about the {car.model}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '100px' }}>
            <div className="glass-panel" style={{ padding: '40px 30px', textAlign: 'center', borderRadius: '24px', background: 'rgba(25,25,25,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Zap size={48} color="var(--accent-primary)" style={{ margin: '0 auto 20px' }} />
              <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px' }}>{car.power}</div>
              <div style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Maximum Power</div>
            </div>
            <div className="glass-panel" style={{ padding: '40px 30px', textAlign: 'center', borderRadius: '24px', background: 'rgba(25,25,25,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Fuel size={48} color="var(--accent-primary)" style={{ margin: '0 auto 20px' }} />
              <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px' }}>{car.mileage}</div>
              <div style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Fuel Efficiency</div>
            </div>
            <div className="glass-panel" style={{ padding: '40px 30px', textAlign: 'center', borderRadius: '24px', background: 'rgba(25,25,25,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Settings size={48} color="var(--accent-primary)" style={{ margin: '0 auto 20px' }} />
              <div style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px' }}>{car.transmission}</div>
              <div style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Transmission</div>
            </div>
            <div className="glass-panel" style={{ padding: '40px 30px', textAlign: 'center', borderRadius: '24px', background: 'rgba(25,25,25,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Calendar size={48} color="var(--accent-primary)" style={{ margin: '0 auto 20px' }} />
              <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px' }}>{car.year}</div>
              <div style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Model Year</div>
            </div>
          </div>

          {car.variants && car.variants.length > 0 && (
            <div style={{ backgroundColor: 'rgba(20,20,20,0.8)', padding: '60px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <h3 style={{ fontSize: '2.2rem', marginBottom: '40px', textAlign: 'center', fontWeight: '700' }}>Explore Available Variants</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {car.variants.map((variant, i) => (
                  <div key={i} className="hover-lift" style={{ 
                    padding: '20px 35px', 
                    background: 'linear-gradient(145deg, rgba(40,40,40,1) 0%, rgba(20,20,20,1) 100%)', 
                    borderRadius: '40px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                  }}>
                    {variant} 
                    <span style={{ fontSize: '0.8rem', padding: '4px 10px', backgroundColor: 'rgba(170, 59, 255, 0.2)', border: '1px solid var(--accent-primary)', borderRadius: '20px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {car.fuelType}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CarDetails;
