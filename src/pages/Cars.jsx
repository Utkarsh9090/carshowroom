import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchFilter from '../components/SearchFilter/SearchFilter';
import CarCard from '../components/CarCard/CarCard';
import { getCars } from '../services/carService';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Sorting State
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity');
  const itemsPerPage = 4; // Using 4 items per page to demonstrate pagination
  
  const location = useLocation();
  
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams(location.search);
      const brand = queryParams.get('brand');
      
      const filters = brand ? { brand } : {};
      const fetchedCars = await getCars(filters);
      
      setCars(fetchedCars);
      setLoading(false);
      setCurrentPage(1);
    };
    
    fetchCars();
  }, [location.search]);

  const handleFilter = async (filters) => {
    setLoading(true);
    const fetchedCars = await getCars(filters);
    setCars(fetchedCars);
    setLoading(false);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // 1. Sort Cars
  const sortedCars = [...cars].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'popularity') return (b.popularity || 0) - (a.popularity || 0);
    return 0;
  });

  // 2. Paginate Cars
  const totalPages = Math.ceil(sortedCars.length / itemsPerPage);
  const paginatedCars = sortedCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        <h1 className="section-title">Our <span>Inventory</span></h1>
        
        <SearchFilter onFilter={handleFilter} />
        
        {/* Showing Count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ color: 'var(--text-secondary)' }}>
            Showing {paginatedCars.length} of {sortedCars.length} vehicles
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading premium vehicles...</div>
        ) : paginatedCars.length > 0 ? (
          <>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '30px',
              marginBottom: '40px'
            }}>
              {paginatedCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '60px', flexWrap: 'wrap' }}>
                <button 
                  className="btn-outline" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  style={{ padding: '8px 16px', opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={currentPage === index + 1 ? 'btn-primary' : 'btn-outline'}
                    onClick={() => setCurrentPage(index + 1)}
                    style={{ padding: '8px 16px', minWidth: '40px' }}
                  >
                    {index + 1}
                  </button>
                ))}

                <button 
                  className="btn-outline" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  style={{ padding: '8px 16px', opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>
            No vehicles match your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;
