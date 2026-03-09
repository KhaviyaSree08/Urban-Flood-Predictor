import React from 'react';

function EmergencyContacts() {
  const contacts = [
    { name: 'Emergency Services', phone: '112', icon: '🚨' },
    { name: 'Tamil Nadu Disaster Management', phone: '044-28524161', icon: '⚠️' },
    { name: 'Chennai Flood Control', phone: '044-25619206', icon: '🌊' },
    { name: 'State Emergency Operations', phone: '044-28524161', icon: '🚨' },
    { name: 'Chennai Corporation', phone: '044-25619200', icon: '🏛️' },
    { name: 'Ambulance Service', phone: '108', icon: '🚑' }
  ];

  return (
    <div className="card">
      <h2>📞 Emergency Contacts</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {contacts.map((contact, idx) => (
          <div key={idx} className="card" style={{ background: 'rgba(33, 150, 243, 0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{contact.icon}</div>
            <h3>{contact.name}</h3>
            <p style={{ fontSize: '1.2rem', color: '#2196f3', fontWeight: 'bold' }}>{contact.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmergencyContacts;
