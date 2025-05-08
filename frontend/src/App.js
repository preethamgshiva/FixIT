import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import UserPage from './components/IssueForm';
import AdminPage from './components/AdminDashboard';

const Favicon = () => {
  const location = useLocation();

  useEffect(() => {
    const favicon = document.getElementById('favicon');
    if (location.pathname === '/admin') {
      favicon.setAttribute('href', '/login-logo.png'); // Login logo for admin page
    } else if (location.pathname === '/') {
      favicon.setAttribute('href', '/user-logo.png'); // User logo for issue page
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

function App() {
  return (
    <Router>
      <Favicon /> {/* This will change the favicon dynamically */}
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
