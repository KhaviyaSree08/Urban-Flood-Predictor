import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get(`${API_URL}/alerts`);
      setAlerts(res.data);
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  };

  return (
    <div className="card">
      <h2>🚨 Flood Alerts</h2>
      {alerts.length > 0 ? (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {alerts.map(alert => (
            <div key={alert.id} className="card" style={{ 
              borderLeft: `4px solid ${alert.severity === 'critical' ? '#f44336' : '#ff9800'}`,
              background: 'rgba(244, 67, 54, 0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#f44336', marginBottom: '0.5rem' }}>{alert.message}</h3>
                  <p style={{ color: '#ccc' }}>Location: {alert.location}</p>
                  <p style={{ color: '#ccc' }}>Date: {alert.timestamp}</p>
                </div>
                <span className={`risk-badge ${alert.riskLevel.toLowerCase()}`}>
                  {alert.riskLevel}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', padding: '3rem', color: '#64b5f6' }}>
          No active alerts. All zones are safe.
        </p>
      )}
    </div>
  );
}

export default Alerts;
