import React, { useState } from 'react';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Chennai - T Nagar'
  });
  const [errors, setErrors] = useState({});

  const locations = [
    'Chennai - T Nagar', 'Chennai - Anna Nagar', 'Chennai - Velachery',
    'Chennai - Adyar', 'Chennai - Tambaram', 'Coimbatore', 'Madurai',
    'Tiruchirappalli', 'Salem', 'Tirunelveli'
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email required';
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = '10-digit phone number required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem('userData', JSON.stringify(formData));
      onLogin(formData);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1929 0%, #1a2332 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'rgba(26, 35, 50, 0.95)',
        borderRadius: '20px',
        padding: '3rem',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        border: '1px solid rgba(33, 150, 243, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌊</div>
          <h1 style={{ color: '#2196f3', marginBottom: '0.5rem', fontSize: '2rem' }}>
            AI Flood Prediction
          </h1>
          <p style={{ color: '#64b5f6', fontSize: '1.1rem' }}>Tamil Nadu</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64b5f6', fontWeight: '500' }}>
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: `1px solid ${errors.name ? '#f44336' : 'rgba(33, 150, 243, 0.3)'}`,
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
            {errors.name && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>{errors.name}</span>}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64b5f6', fontWeight: '500' }}>
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: `1px solid ${errors.email ? '#f44336' : 'rgba(33, 150, 243, 0.3)'}`,
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
            {errors.email && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>{errors.email}</span>}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64b5f6', fontWeight: '500' }}>
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="10-digit mobile number"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: `1px solid ${errors.phone ? '#f44336' : 'rgba(33, 150, 243, 0.3)'}`,
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
            {errors.phone && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>{errors.phone}</span>}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64b5f6', fontWeight: '500' }}>
              Your Location
            </label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(33, 150, 243, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem'
              }}
            >
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <button
            type="submit"
            className="primary"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}
          >
            Get Started →
          </button>

          <p style={{ textAlign: 'center', color: '#999', fontSize: '0.85rem' }}>
            Your data is secure and used only for flood alerts
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
