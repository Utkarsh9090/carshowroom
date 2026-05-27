import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, Fuel, Settings2 } from 'lucide-react';

const CarCard = ({ car }) => {
  return (
    <Link to={`/car/${car.id}`} className="card hover-lift car-card">
      <img src={car.image} alt={`${car.brand} ${car.model}`} className="car-card-image" />
      <div className="car-card-content">
        <span className="car-brand">{car.brand}</span>
        <h3 className="car-model">{car.model}</h3>
        <div className="car-price">₹ {(car.price / 100000).toFixed(2)} Lakh</div>
        
        <div className="car-features">
          <div className="car-feature">
            <Gauge size={16} />
            <span>{car.mileage || car.range}</span>
          </div>
          <div className="car-feature">
            <Fuel size={16} />
            <span>{car.fuelType}</span>
          </div>
          <div className="car-feature">
            <Settings2 size={16} />
            <span>{car.transmission}</span>
          </div>
        </div>
        
        <div className="btn-outline" style={{ width: '100%', textAlign: 'center' }}>
          View Details
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
