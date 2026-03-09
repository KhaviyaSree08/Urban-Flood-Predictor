import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Intro from './components/Intro';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import Alerts from './components/Alerts';
import Charts from './components/Charts';
import History from './components/History';
import EmergencyContacts from './components/EmergencyContacts';
import ReportFlooding from './components/ReportFlooding';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    const introCompleted = localStorage.getItem('introCompleted');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setIsLoggedIn(true);
      if (introCompleted) {
        setShowIntro(false);
      } else {
        setShowIntro(true);
      }
    }
  }, []);

  const handleLogin = (data) => {
    setUserData(data);
    setIsLoggedIn(true);
    setShowIntro(true);
  };

  const handleIntroComplete = () => {
    localStorage.setItem('introCompleted', 'true');
    setShowIntro(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('introCompleted');
    setIsLoggedIn(false);
    setShowIntro(false);
    setUserData(null);
    setActiveTab('dashboard');
  };

  const handleUpdateProfile = (newData) => {
    setUserData(newData);
    localStorage.setItem('userData', JSON.stringify(newData));
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (showIntro) {
    return <Intro userData={userData} onComplete={handleIntroComplete} />;
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'map': return <MapView />;
      case 'report': return <ReportFlooding />;
      case 'alerts': return <Alerts />;
      case 'charts': return <Charts />;
      case 'history': return <History />;
      case 'contacts': return <EmergencyContacts />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-wave"></div>
        <div className="header-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
            <div>
              <h1>🌊 AI Urban Flood Prediction System - Tamil Nadu</h1>
              <p>Real-time Disaster Monitoring & Prevention for Tamil Nadu</p>
            </div>
            <UserProfile 
              userData={userData} 
              onUpdate={handleUpdateProfile}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </header>

      <nav className="nav-bar">
        <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</button>
        <button className={activeTab === 'map' ? 'active' : ''} onClick={() => setActiveTab('map')}>🗺️ Map View</button>
        <button className={activeTab === 'report' ? 'active' : ''} onClick={() => setActiveTab('report')}>📸 Report Flood</button>
        <button className={activeTab === 'alerts' ? 'active' : ''} onClick={() => setActiveTab('alerts')}>🚨 Alerts</button>
        <button className={activeTab === 'charts' ? 'active' : ''} onClick={() => setActiveTab('charts')}>📈 Charts</button>
        <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>📜 History</button>
        <button className={activeTab === 'contacts' ? 'active' : ''} onClick={() => setActiveTab('contacts')}>📞 Emergency</button>
      </nav>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
