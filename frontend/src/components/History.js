import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/history`);
      setHistory(res.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  return (
    <div className="card">
      <h2>📜 Prediction History</h2>
      {history.length > 0 ? (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {history.map((item, idx) => (
            <div key={idx} className="card">
              <h3>{item.location}</h3>
              <p style={{ color: '#64b5f6', marginBottom: '1rem' }}>
                {new Date(item.timestamp).toLocaleString()}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem' }}>
                {item.predictions.slice(0, 3).map((pred, i) => (
                  <div key={i} style={{ padding: '0.5rem', background: 'rgba(33, 150, 243, 0.1)', borderRadius: '4px' }}>
                    <div>{pred.date}</div>
                    <span className={`risk-badge ${pred.riskLevel.toLowerCase()}`}>{pred.riskLevel}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', padding: '3rem', color: '#64b5f6' }}>No prediction history available</p>
      )}
    </div>
  );
}

export default History;
