import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchFilter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [category, setCategory] = useState('');

  // Use a timeout to debounce text input for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilter({
        search: searchTerm,
        brand,
        price,
        fuelType,
        transmission,
        category
      });
    }, 300); // 300ms debounce
    
    return () => clearTimeout(timer);
  }, [searchTerm, brand, price, fuelType, transmission, category]);

  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px', borderRadius: '12px' }}>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* Search */}
        <div style={{ flex: '1 1 250px', position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '15px', top: '12px', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search by model or keyword..." 
            style={{ paddingLeft: '45px', width: '100%' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
