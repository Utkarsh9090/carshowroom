import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar/AdminSidebar';
import { Edit, Trash2, Plus, X, Upload } from 'lucide-react';
import { getCars, addCar, updateCar, deleteCar } from '../services/carService';
import { getUsers, deleteUser } from '../services/authService';
import { getOrders, updateOrderStatus } from '../services/orderService';
import { useAuth } from '../contexts/AuthContext';
const DashboardOverview = () => {
  const [totalCars, setTotalCars] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const cars = await getCars();
      setTotalCars(cars.length);

      const users = await getUsers();
      setTotalUsers(users.length);

      const orders = await getOrders();
      setTotalOrders(orders.length);

      const revenue = orders.reduce((sum, order) => sum + (Number(order.price) || 0), 0);
      setTotalRevenue(revenue);

      setRecentOrders(orders.slice(0, 5));
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#ffb703';
      case 'Processing': return '#00b4d8';
      case 'Delivered': return '#06d6a0';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Dashboard Overview</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="Admin" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          <div>
            <div style={{ fontWeight: '600' }}>{currentUser?.name || 'Admin User'}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{currentUser?.email || 'admin@example.com'}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Cars</h3>
          <div className="value">{totalCars}</div>
        </div>
        <div className="stat-card">
          <h3>Users</h3>
          <div className="value">{totalUsers}</div>
        </div>
        <div className="stat-card">
          <h3>Orders</h3>
          <div className="value">{totalOrders}</div>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <div className="value">₹ {(totalRevenue / 100000).toFixed(2)} L</div>
        </div>
      </div>

      <h3>Recent Orders</h3>
      <div className="admin-table-container" style={{ marginTop: '20px' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.carModel}</td>
                <td>₹ {(order.price / 100000).toFixed(2)} L</td>
                <td><span style={{ color: getStatusColor(order.status), fontWeight: '500' }}>{order.status}</span></td>
              </tr>
            ))}
            {recentOrders.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No recent orders.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  const initialFormState = {
    brand: '', model: '', price: '', category: 'Luxury',
    description: '', year: new Date().getFullYear(),
    mileage: '', fuelType: 'Petrol', transmission: 'Automatic',
    power: '', image: '', images: [], features: []
  };
  const [formData, setFormData] = useState(initialFormState);

  const fetchCars = async () => {
    const fetchedCars = await getCars();
    setCars(fetchedCars);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      await deleteCar(id);
      fetchCars();
    }
  };

  const handleOpenModal = (car = null) => {
    if (car) {
      setEditingCar(car);
      setFormData({
        brand: car.brand || '',
        model: car.model || '',
        price: car.price || '',
        category: car.category || 'Luxury',
        description: car.description || '',
        year: car.year || new Date().getFullYear(),
        mileage: car.mileage || car.range || '',
        fuelType: car.fuelType || 'Petrol',
        transmission: car.transmission || 'Automatic',
        power: car.power || '',
        image: car.image || '',
        images: car.images || [],
        features: car.features || []
      });
    } else {
      setEditingCar(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
    setEditingCar(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeaturesChange = (e) => {
    const featuresArray = e.target.value.split(',').map(f => f.trim()).filter(f => f);
    setFormData({ ...formData, features: featuresArray });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      price: Number(formData.price),
      year: Number(formData.year)
    };

    if (editingCar) {
      await updateCar(editingCar.id, submitData);
    } else {
      await addCar(submitData);
    }
    handleCloseModal();
    fetchCars();
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Vehicles</h2>
        <button className="btn-primary" onClick={() => handleOpenModal()}><Plus size={18} /> Add New Vehicle</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id}>
                <td style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img src={car.image} alt={car.model} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  <span style={{ fontWeight: '500' }}>{car.model}</span>
                </td>
                <td>{car.brand}</td>
                <td>₹ {(car.price / 100000).toFixed(2)} L</td>
                <td>{car.category}</td>
                <td>
                  <div className="action-btns">
                    <button className="btn-icon" onClick={() => handleOpenModal(car)}><Edit size={16} /></button>
                    <button className="btn-icon" style={{ color: '#9a0002' }} onClick={() => handleDelete(car.id)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '30px', position: 'relative' }}>
            <button
              onClick={handleCloseModal}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
            ><X size={24} /></button>

            <h2 style={{ marginBottom: '20px' }}>{editingCar ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Brand</label>
                  <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Model</label>
                  <input type="text" name="model" value={formData.model} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="input-field">
                    <option>Luxury</option>
                    <option>Sports</option>
                    <option>SUV</option>
                    <option>Electric</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Year</label>
                  <input type="number" name="year" value={formData.year} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Mileage / Range</label>
                  <input type="text" name="mileage" value={formData.mileage} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Fuel Type</label>
                  <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="input-field">
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Transmission</label>
                  <select name="transmission" value={formData.transmission} onChange={handleChange} className="input-field">
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Power (e.g. 500 hp)</label>
                  <input type="text" name="power" value={formData.power} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Features (comma separated)</label>
                  <input type="text" value={formData.features.join(', ')} onChange={handleFeaturesChange} className="input-field" placeholder="Sunroof, 360 Camera, Airbags" />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="input-field" rows="3" required></textarea>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Main Image</label>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  {formData.image && (
                    <img src={formData.image} alt="Preview" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                  )}
                  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '8px' }}>
                    <Upload size={18} /> Upload Image
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                <button type="button" className="btn-outline" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn-primary">{editingCar ? 'Update Vehicle' : 'Add Vehicle'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers(searchQuery);
    setUsers(fetchedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, [searchQuery]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Users</h2>
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="input-field"
          style={{ width: '300px' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={{ fontWeight: '500' }}>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || 'N/A'}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    background: user.role === 'admin' ? 'rgba(154, 0, 2, 0.1)' : 'rgba(0, 180, 216, 0.1)',
                    color: user.role === 'admin' ? '#9a0002' : '#00b4d8'
                  }}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td>{user.joined || 'Unknown'}</td>
                <td>
                  {user.id !== 'admin' && (
                    <div className="action-btns">
                      <button className="btn-icon" style={{ color: '#9a0002' }} onClick={() => handleDelete(user.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const fetchedOrders = await getOrders();
    setOrders(fetchedOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateOrderStatus(id, newStatus);
    fetchOrders();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#ffb703';
      case 'Processing': return '#00b4d8';
      case 'Delivered': return '#06d6a0';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Orders</h2>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td style={{ fontWeight: '500' }}>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.carModel}</td>
                <td>₹ {(order.price / 100000).toFixed(2)} L</td>
                <td>{order.date}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '4px',
                      background: 'rgba(25, 25, 25, 0.8)',
                      color: getStatusColor(order.status),
                      border: `1px solid ${getStatusColor(order.status)}`,
                      fontWeight: '600',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Pending" style={{ color: '#ffb703' }}>Pending</option>
                    <option value="Processing" style={{ color: '#00b4d8' }}>Processing</option>
                    <option value="Delivered" style={{ color: '#06d6a0' }}>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate('/login');
      } else if (currentUser.role !== 'admin') {
        navigate('/');
      }
    }
  }, [currentUser, loading, navigate]);

  if (loading || !currentUser || currentUser.role !== 'admin') {
    return null; // The global loader or redirect handles this
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/cars" element={<ManageCars />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/orders" element={<ManageOrders />} />
          <Route path="*" element={<div>Page under construction</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
