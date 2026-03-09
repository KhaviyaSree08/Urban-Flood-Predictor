import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function Dashboard() {
  const [location, setLocation] = useState('Chennai - T Nagar');
  const [days, setDays] = useState(7);
  const [email, setEmail] = useState('');
  const [weather, setWeather] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchWeather();
    fetchLocations();
  }, []);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`${API_URL}/weather-data`);
      setWeather(res.data);
    } catch (err) {
      console.error('Error fetching weather:', err);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get(`${API_URL}/locations`);
      setLocations(res.data);
    } catch (err) {
      setLocations(['Chennai - T Nagar', 'Chennai - Anna Nagar', 'Coimbatore']);
    }
  };

  const predictFlood = async () => {
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setMessage('❌ Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post(`${API_URL}/predict-flood`, { location, days, email });
      setPredictions(res.data.predictions);
      
      if (email && res.data.emailSent) {
        setMessage('✅ Prediction complete! Alert email sent to ' + email);
      } else if (email) {
        setMessage('⚠️ Prediction complete! Email notification failed.');
      } else {
        setMessage('✅ Prediction complete!');
      }
    } catch (err) {
      console.error('Error predicting flood:', err);
      setMessage('❌ Error: Unable to connect to server. Please ensure backend is running.');
    }
    setLoading(false);
  };

  const getRiskColor = (level) => {
    const colors = { Low: 'low', Medium: 'medium', High: 'high', Critical: 'critical' };
    return colors[level] || 'low';
  };

  const currentRisk = predictions.length > 0 ? predictions[0].riskLevel : 'Low';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
      <div>
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3>🎯 Prediction Parameters</h3>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64b5f6' }}>Location (Tamil Nadu)</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64b5f6' }}>Forecast Days</label>
          <input type="number" value={days} onChange={(e) => setDays(e.target.value)} min="1" max="14" />
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64b5f6' }}>Email (Optional - for alerts)</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="your-email@example.com"
          />
          <button className="primary" onClick={predictFlood} disabled={loading} style={{ width: '100%' }}>
            {loading ? '⏳ Predicting...' : '🔮 Predict Flood Risk'}
          </button>
          {message && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.75rem', 
              borderRadius: '8px', 
              background: message.includes('❌') ? 'rgba(244, 67, 54, 0.2)' : 'rgba(76, 175, 80, 0.2)',
              color: message.includes('❌') ? '#f44336' : '#4caf50',
              fontSize: '0.9rem'
            }}>
              {message}
            </div>
          )}
        </div>

        {weather && (
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3>🌤️ Current Weather</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div><strong>Temperature:</strong><br/>{weather.temperature}°C</div>
              <div><strong>Humidity:</strong><br/>{weather.humidity}%</div>
              <div><strong>Rainfall:</strong><br/>{weather.rainfall} mm</div>
              <div><strong>Wind Speed:</strong><br/>{weather.windSpeed} km/h</div>
            </div>
          </div>
        )}

        <div className="card">
          <h3>⚠️ Current Risk Level</h3>
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <span className={`risk-badge ${getRiskColor(currentRisk)}`} style={{ fontSize: '1.5rem', padding: '1rem 2rem' }}>
              {currentRisk}
            </span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>📊 Prediction Results</h2>
        {predictions.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #2196f3' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Risk Level</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Risk Score</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Precipitation</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Humidity</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Wind Speed</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((pred, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(33, 150, 243, 0.2)' }}>
                    <td style={{ padding: '1rem' }}>{pred.date}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`risk-badge ${getRiskColor(pred.riskLevel)}`}>{pred.riskLevel}</span>
                    </td>
                    <td style={{ padding: '1rem' }}>{pred.riskScore}</td>
                    <td style={{ padding: '1rem' }}>{pred.precipitation} mm</td>
                    <td style={{ padding: '1rem' }}>{pred.humidity}%</td>
                    <td style={{ padding: '1rem' }}>{pred.windSpeed} km/h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '3rem', color: '#64b5f6' }}>
            Select location and click "Predict Flood Risk" to see results
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
