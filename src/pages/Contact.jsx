import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess(false);
  };

  const validate = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phone)) return 'Phone number must be exactly 10 digits';
    if (!formData.message.trim()) return 'Message cannot be empty';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 1000);
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="container">
        <h1 className="section-title">Get in <span>Touch</span></h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '40px' }}>
          <div>
            <div className="glass-panel" style={{ padding: '40px', marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Contact Information</h3>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <MapPin color="var(--accent-primary)" />
                <div>
                  <div style={{ fontWeight: '600' }}>Showroom Address</div>
                  <div style={{ color: 'var(--text-secondary)' }}>123 Luxury Drive, Worli, Mumbai 400018</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <Phone color="var(--accent-primary)" />
                <div>
                  <div style={{ fontWeight: '600' }}>Phone</div>
                  <div style={{ color: 'var(--text-secondary)' }}>+91 98765 43210</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <Mail color="var(--accent-primary)" />
                <div>
                  <div style={{ fontWeight: '600' }}>Email</div>
                  <div style={{ color: 'var(--text-secondary)' }}>info@autohub.in</div>
                </div>
              </div>
            </div>
            
            <div className="glass-panel" style={{ padding: '40px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Business Hours</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Monday - Friday</span>
                <span style={{ color: 'var(--text-secondary)' }}>9:00 AM - 8:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Saturday</span>
                <span style={{ color: 'var(--text-secondary)' }}>10:00 AM - 6:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Sunday</span>
                <span style={{ color: 'var(--text-secondary)' }}>Closed</span>
              </div>
            </div>
          </div>
          
          <div className="glass-panel" style={{ padding: '40px' }}>
            <h3 style={{ marginBottom: '30px', fontSize: '1.5rem' }}>Send a Message</h3>
            
            {error && <div style={{ background: 'rgba(230,57,70,0.1)', color: '#ff4d4d', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontWeight: '500' }}>{error}</div>}
            
            {success && (
              <div style={{ background: 'rgba(6, 214, 160, 0.1)', color: '#06d6a0', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: '600' }}>
                <CheckCircle size={20} /> Your message has been sent successfully!
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500' }}>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="John Doe" style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(25,25,25,0.8)' }} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500' }}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="john@example.com" style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(25,25,25,0.8)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500' }}>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field" placeholder="9876543210" style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(25,25,25,0.8)' }} />
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500' }}>Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange} className="input-field" style={{ appearance: 'none', width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(25,25,25,0.8)' }}>
                  <option>General Inquiry</option>
                  <option>Test Drive Request</option>
                  <option>Finance Consultation</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500' }}>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} className="input-field" rows="5" placeholder="How can we help you?" style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(25,25,25,0.8)' }}></textarea>
              </div>
              
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '8px', fontSize: '1rem', fontWeight: '600' }} disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Embedded Map Section */}
        <div className="glass-panel" style={{ marginTop: '40px', padding: '10px', borderRadius: '16px', overflow: 'hidden' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8680788647575!2d72.81226597519503!3d19.025539553556557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cebb0e5bb3ab%3A0xe1001a4e9b98ec34!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="400" 
            style={{ border: 0, borderRadius: '8px', filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.9)' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Showroom Location Map"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default Contact;
