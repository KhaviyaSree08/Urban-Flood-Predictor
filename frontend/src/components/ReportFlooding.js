import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function ReportFlooding() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setVerificationResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setMessage('❌ Please enter a valid address.');
      return;
    }

    setLoading(true);
    setMessage('🔄 Submitting report and analyzing image...');
    setVerificationResult(null);

    try {
      const formData = new FormData();
      if (image) {
        formData.append('image', image);
      }
      formData.append('address', address);
      formData.append('severity', severity);
      formData.append('additionalDetails', additionalDetails);

      const res = await axios.post(`${API_URL}/verify-flood-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setVerificationResult(res.data);
      
      if (res.data.verified) {
        setMessage(`✅ Flood confirmed by AI! Confidence: ${(res.data.confidence * 100).toFixed(1)}%. Check map for red marker.`);
      } else if (res.data.image_analyzed) {
        setMessage(`⚠️ Image verification inconclusive. Confidence: ${(res.data.confidence * 100).toFixed(1)}%. Check map for orange marker.`);
      } else {
        setMessage('✅ Report submitted successfully (no image provided). Check map for marker.');
      }
      
      // Reset form
      setImage(null);
      setImagePreview(null);
      setAddress('');
      setAdditionalDetails('');
      setSeverity('Medium');
    } catch (err) {
      console.error('Error:', err);
      setMessage('❌ Error submitting report. Please ensure backend is running on port 5000.');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div className="card">
        <h2>📸 Report Flooding</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64b5f6' }}>
            Upload Photo (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '1rem', color: '#fff' }}
          />
          
          {imagePreview && (
            <div style={{ marginBottom: '1rem' }}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          )}

          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64b5f6' }}>
            Flood Severity
          </label>
          <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64b5f6' }}>
            Address / Location *
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter street address, area, or landmark"
            style={{ marginBottom: '1rem' }}
          />

          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64b5f6' }}>
            Additional Details (Optional)
          </label>
          <textarea
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            placeholder="Describe flood conditions, affected areas, water level, or any other relevant information..."
            rows="4"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(33, 150, 243, 0.3)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '1rem',
              marginBottom: '1rem',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />

          <button 
            type="submit" 
            className="primary" 
            disabled={loading}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {loading ? '⏳ Analyzing...' : '📤 Submit Report'}
          </button>

          {message && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              borderRadius: '8px',
              background: message.includes('✅') ? 'rgba(76, 175, 80, 0.2)' : 
                         message.includes('⚠️') ? 'rgba(255, 152, 0, 0.2)' : 
                         message.includes('🔄') ? 'rgba(33, 150, 243, 0.2)' : 'rgba(244, 67, 54, 0.2)',
              color: message.includes('✅') ? '#4caf50' : 
                     message.includes('⚠️') ? '#ff9800' : 
                     message.includes('🔄') ? '#2196f3' : '#f44336',
              fontSize: '0.95rem'
            }}>
              {message}
            </div>
          )}
        </form>
      </div>

      <div className="card">
        <h2>🤖 AI Verification Status</h2>
        {verificationResult ? (
          <div>
            <div style={{ 
              padding: '1.5rem', 
              background: verificationResult.verified ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              <h3 style={{ 
                color: verificationResult.verified ? '#4caf50' : '#ff9800',
                marginBottom: '1rem'
              }}>
                {verificationResult.verified ? '✅ Flood Detected' : '⚠️ Unverified'}
              </h3>
              <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                <strong>Confidence:</strong> {(verificationResult.confidence * 100).toFixed(1)}%
              </div>
              <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                <strong>Status:</strong> {verificationResult.status}
              </div>
              <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                <strong>Marker:</strong> {verificationResult.verified ? '🔴 Red Pin' : '🟠 Orange Pin'}
              </div>
            </div>

            <div className="card" style={{ background: 'rgba(33, 150, 243, 0.1)' }}>
              <h3>📍 Report Details</h3>
              <p><strong>Address:</strong> {verificationResult.address}</p>
              <p><strong>Severity:</strong> {verificationResult.severity}</p>
              {verificationResult.additionalDetails && (
                <p><strong>Details:</strong> {verificationResult.additionalDetails}</p>
              )}
              <p><strong>Timestamp:</strong> {new Date(verificationResult.timestamp).toLocaleString()}</p>
              {verificationResult.image_analyzed && (
                <p><strong>Image Analysis:</strong> Completed</p>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64b5f6' }}>
            <p>Upload an image and submit to see AI verification results</p>
            <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#999' }}>
              <p>🔍 AI analyzes images for:</p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                <li>• Water presence</li>
                <li>• Road flooding</li>
                <li>• Flood severity indicators</li>
              </ul>
            </div>
          </div>
        )}

        <div className="card" style={{ background: 'rgba(33, 150, 243, 0.05)', marginTop: '1rem' }}>
          <h3>🗺️ Map Marker Legend</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            <div><span style={{ color: '#4caf50' }}>🟢</span> Prediction Only</div>
            <div><span style={{ color: '#ff9800' }}>🟠</span> Citizen Report (Unverified)</div>
            <div><span style={{ color: '#f44336' }}>🔴</span> AI-Confirmed Flood</div>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#999' }}>Check Map View tab to see your report marker</p>
        </div>
      </div>
    </div>
  );
}

export default ReportFlooding;
