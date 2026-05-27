import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, LayoutDashboard, Users, Settings, LogOut, ShoppingCart } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <aside className="admin-sidebar">
      <Link to="/" className="admin-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none' }}>
        <Car size={32} color="#e63946" />
        AutoHub <span>Admin</span>
      </Link>
      
      <ul className="admin-nav">
        <li>
          <Link to="/admin" className={isActive('/admin')}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/cars" className={isActive('/admin/cars')}>
            <Car size={20} /> Cars
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className={isActive('/admin/orders')}>
            <ShoppingCart size={20} /> Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className={isActive('/admin/users')}>
            <Users size={20} /> Users
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className={isActive('/admin/settings')}>
            <Settings size={20} /> Settings
          </Link>
        </li>
        <li style={{ marginTop: '40px' }}>
          <Link to="/" onClick={() => localStorage.removeItem('user')}>
            <LogOut size={20} /> Logout
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
