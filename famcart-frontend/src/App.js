import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SplashPage from './components/SplashPage/SplashPage';
import Main from './components/Main/Main';

function DashboardWrapper() {
  const navigate = useNavigate();
  const isAuthenticated = true; // This should be determined by your authentication logic

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  return <Main />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/dashboard" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
