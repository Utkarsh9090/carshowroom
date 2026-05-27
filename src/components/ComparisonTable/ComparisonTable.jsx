import React from 'react';
import { Check } from 'lucide-react';

const ComparisonTable = ({ carsToCompare }) => {
  if (carsToCompare.length === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No cars selected for comparison.</p>;
  }

  // Dynamic rows configuration
  const rows = [
    { 
      label: 'Price', 
      render: (car) => <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>₹ {(car.price / 100000).toFixed(2)} Lakh</span>
    },
    { 
      label: 'Engine', 
      render: (car) => car.power || 'N/A' 
    },
    { 
      label: 'Mileage', 
      render: (car) => car.mileage || car.range || 'N/A' 
    },
    { 
      label: 'Fuel type', 
      render: (car) => car.fuelType || 'N/A' 
    },
    { 
      label: 'Transmission', 
      render: (car) => car.transmission || 'N/A' 
    },
    { 
      label: 'Safety features', 
      render: (car) => (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', display: 'inline-block' }}>
          {car.features?.map((f, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontSize: '0.9rem' }}>
              <Check size={14} color="var(--accent-primary)" /> {f}
            </li>
          )) || 'N/A'}
        </ul>
      )
    }
  ];

  return (
    <div style={{ overflowX: 'auto', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
      <table className="admin-table" style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ width: '20%', padding: '20px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Features</th>
            {carsToCompare.map(car => (
              <th key={car.id} style={{ width: `${80 / carsToCompare.length}%`, padding: '20px', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
                <img src={car.image} alt={car.model} style={{ width: '100%', maxWidth: '250px', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
                <div style={{ fontSize: '1.2rem' }}>{car.brand} <span style={{ color: 'var(--accent-primary)' }}>{car.model}</span></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} style={{ borderBottom: index === rows.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
              <td style={{ padding: '20px', fontWeight: '600', color: 'var(--text-secondary)', verticalAlign: 'middle' }}>
                {row.label}
              </td>
              {carsToCompare.map(car => (
                <td key={`${car.id}-${index}`} style={{ padding: '20px', textAlign: 'center', verticalAlign: 'middle' }}>
                  {row.render(car)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
