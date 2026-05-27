import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithGoogle, login, signup, logout } from '../services/authService';
import { Car, Eye, EyeOff, ShieldAlert, User } from 'lucide-react';

const Login = () => {
  const [portalMode, setPortalMode] = useState('user'); // 'user' or 'admin'
  const [isLoginView, setIsLoginView] = useState(true); // only applies to 'user' mode
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await loginWithGoogle();
      
      if (portalMode === 'admin') {
        if (user.role !== 'admin') {
          await logout();
          throw new Error('Unauthorized: This account is not an administrator.');
        }
        navigate('/admin');
      } else {
        if (user.role === 'admin') navigate('/admin');
        else navigate('/');
      }
    } catch (err) {
      console.error("Google Auth Error:", err);
      setError(`${err.message || 'Authentication failed'}`);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    if (portalMode === 'user' && !isLoginView && !formData.name) return 'Full Name is required';
    if (!formData.email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    if (!formData.password) return 'Password is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      let user;
      if (portalMode === 'admin') {
        // Must be the admin email to even attempt
        if (formData.email !== 'test@admin.com') {
          throw new Error('Unauthorized: Incorrect admin email.');
        }
        user = await login(formData.email, formData.password);
        if (user.role !== 'admin') {
          await logout();
          throw new Error('Unauthorized: This account is not an administrator.');
        }
        navigate('/admin');
      } else {
        if (isLoginView) {
          user = await login(formData.email, formData.password);
        } else {
          user = await signup(formData.email, formData.password, formData.name);
        }
        
        if (user.role === 'admin') navigate('/admin');
        else navigate('/');
      }
    } catch (err) {
      console.error("Authentication Full Error Object:", err);
      if (err.message?.includes('auth/invalid-credential')) {
        setError('Invalid email or password');
      } else if (err.message?.includes('auth/email-already-in-use')) {
        setError('Email already in use. Please log in.');
      } else {
        setError(`${err.message || 'Authentication failed'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', padding: '20px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '40px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px' }}>
            <Car size={32} color="var(--accent-primary)" />
            AutoHub <span style={{ color: 'var(--accent-primary)' }}>India</span>
          </Link>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>
            {portalMode === 'admin' ? 'Admin Portal' : (isLoginView ? 'Welcome Back' : 'Create Account')}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {portalMode === 'admin' ? 'Secure access for administrators' : (isLoginView ? 'Sign in to your account' : 'Join us to access special features')}
          </p>
        </div>

        {/* Portal Mode Toggle */}
        <div style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
          <button 
            onClick={() => { setPortalMode('user'); setError(''); }}
            style={{
              flex: 1, padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: portalMode === 'user' ? 'var(--bg-primary)' : 'rgba(255, 255, 255, 0.05)',
              color: portalMode === 'user' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              border: portalMode === 'user' ? '1px solid var(--accent-primary)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <User size={18} /> User Login
          </button>
          <button 
            onClick={() => { setPortalMode('admin'); setError(''); }}
            style={{
              flex: 1, padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: portalMode === 'admin' ? 'rgba(230,57,70,0.1)' : 'rgba(255, 255, 255, 0.05)',
              color: portalMode === 'admin' ? '#e63946' : 'var(--text-secondary)',
              border: portalMode === 'admin' ? '1px solid #e63946' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldAlert size={18} /> Admin Login
          </button>
        </div>

        {portalMode === 'user' && (
          <div style={{ display: 'flex', marginBottom: '25px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '5px' }}>
            <button 
              onClick={() => { setIsLoginView(true); setError(''); }}
              style={{
                flex: 1, padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600',
                background: isLoginView ? 'var(--text-primary)' : 'transparent',
                color: isLoginView ? 'var(--bg-primary)' : 'var(--text-secondary)',
                transition: 'all 0.2s ease'
              }}
            >
              Sign In
            </button>
            <button 
              onClick={() => { setIsLoginView(false); setError(''); }}
              style={{
                flex: 1, padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600',
                background: !isLoginView ? 'var(--text-primary)' : 'transparent',
                color: !isLoginView ? 'var(--bg-primary)' : 'var(--text-secondary)',
                transition: 'all 0.2s ease'
              }}
            >
              Sign Up
            </button>
          </div>
        )}
        
        {error && <div style={{ background: 'rgba(230,57,70,0.1)', color: '#ff4d4d', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontWeight: '500', fontSize: '0.9rem' }}>{error}</div>}
        
        <form onSubmit={handleEmailAuth}>
          {portalMode === 'user' && !isLoginView && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500' }}>Full Name</label>
              <input 
                type="text" 
                name="name"
                className="input-field" 
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(25,25,25,0.8)' }}
              />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500' }}>Email Address</label>
            <input 
              type="email" 
              name="email"
              className="input-field" 
              value={formData.email}
              onChange={handleChange}
              placeholder={portalMode === 'admin' ? "test@admin.com" : "you@example.com"}
              style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(25,25,25,0.8)' }}
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Password</label>
              {(isLoginView || portalMode === 'admin') && <a href="#" style={{ color: 'var(--accent-primary)', fontSize: '0.875rem' }}>Forgot password?</a>}
            </div>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(25,25,25,0.8)', paddingRight: '45px' }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ 
              width: '100%', 
              padding: '14px', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              fontWeight: '600', 
              marginBottom: '15px',
              backgroundColor: portalMode === 'admin' ? '#e63946' : 'var(--accent-primary)'
            }} 
            disabled={loading}
          >
            {loading ? 'Processing...' : (portalMode === 'admin' ? 'Access Dashboard' : (isLoginView ? 'Sign In' : 'Create Account'))}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          <span style={{ padding: '0 15px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
        </div>
        
        <button 
          type="button"
          onClick={handleGoogleLogin} 
          className="btn-outline" 
          style={{ 
            width: '100%', 
            padding: '12px', 
            borderRadius: '8px', 
            fontSize: '1rem', 
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }} 
          disabled={loading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" style={{ width: '18px', height: '18px' }} />
          Continue with Google
        </button>
        
      </div>
    </div>
  );
};

export default Login;
