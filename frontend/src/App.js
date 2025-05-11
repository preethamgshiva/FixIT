import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import IssueForm from './components/IssueForm';
import AdminDashboard from './components/AdminDashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-content">
            <Link to="/" className="nav-logo">
              FixMyNeighborhood
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Report Issue</Link>
              <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
              <button onClick={toggleTheme} className="theme-toggle">
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<IssueForm />} />
            <Route path="/admin/signin" element={<SignIn />} />
            <Route path="/admin/signup" element={<SignUp />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2024 FixMyNeighborhood. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
