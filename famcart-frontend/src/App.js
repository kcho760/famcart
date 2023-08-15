import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SplashPage from './components/SplashPage/SplashPage';
import Dashboard from './components/Dashboard/Dashboard';

function DashboardWrapper() {
  const navigate = useNavigate();
  const isAuthenticated = true; // This should be determined by your authentication logic

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  return <Dashboard />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/dashboard" element={<DashboardWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
