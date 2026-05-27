import React, { useState, useEffect } from 'react';
import ComparisonTable from '../components/ComparisonTable/ComparisonTable';
import { getCars } from '../services/carService';
import { Plus } from 'lucide-react';

const Compare = () => {
  const [allCars, setAllCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  
  useEffect(() => {
    const fetchCars = async () => {
      const cars = await getCars();
      setAllCars(cars);
      
      // Pre-select Mahindra cars (Scorpio N and Thar Roxx) if no cars are currently selected
      const scorpio = cars.find(c => c.id === 'm2');
      const tharRoxx = cars.find(c => c.id === 'm5');
      if (scorpio && tharRoxx) {
        setSelectedCars([scorpio, tharRoxx]);
      }
    };
    fetchCars();
  }, []);

  const handleSelectCar = (e) => {
    const carId = e.target.value;
    if (!carId) return;
    
    if (selectedCars.length >= 2) {
      alert('You can only compare up to 2 cars at a time.');
      return;
    }
    
    if (selectedCars.find(c => c.id === carId)) {
      alert('Car is already in comparison.');
      return;
    }
    
    const carToAdd = allCars.find(c => c.id === carId);
    if (carToAdd) {
      setSelectedCars([...selectedCars, carToAdd]);
    }
  };

  const removeCar = (id) => {
    setSelectedCars(selectedCars.filter(c => c.id !== id));
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        <h1 className="section-title">Compare <span>Vehicles</span></h1>
        
        <div className="glass-panel" style={{ padding: '30px', marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '20px' }}>Add Vehicles to Compare</h3>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select className="input-field" onChange={handleSelectCar} value="" style={{ maxWidth: '400px' }}>
              <option value="">Select a vehicle...</option>
              {allCars.map(car => (
                <option key={car.id} value={car.id}>{car.brand} {car.model}</option>
              ))}
            </select>
            <span style={{ color: 'var(--text-secondary)' }}><Plus size={16} style={{ verticalAlign: 'middle' }}/> Select up to 2 vehicles</span>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
            {selectedCars.map(car => (
              <div key={car.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {car.brand} {car.model}
                <button onClick={() => removeCar(car.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}>&times;</button>
              </div>
            ))}
          </div>
        </div>
        
        <ComparisonTable carsToCompare={selectedCars} />
        
      </div>
    </div>
  );
};

export default Compare;
