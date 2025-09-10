import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// AuthProvider provides authentication state/context across the app
import { AuthProvider } from './context/AuthContext';
// ProtectedRoute is a wrapper component that checks authentication before rendering child routes
import ProtectedRoute from './components/ProtectedRoute';
// Navbar is the top navigation bar component
import Navbar from './components/Navbar';
// Authentication pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Dashboard (main logged-in area)
import Dashboard from './components/dashboard/Dashboard';
// Customer detail page (for viewing individual customer info & leads)
import CustomerDetail from './components/customers/CustomerDetail';
// Global CSS styles
import './App.css';

function App() {
  return (
    // Provide authentication state to the entire app
    <AuthProvider>
      {/* Router enables navigation using react-router-dom */}
      <Router>
        <div className="App">
          {/* Navbar is shown on all pages */}
          <Navbar />

          <div className="container">
            <Routes>
              {/* Public routes (no authentication required) */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes (require authentication) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/:id"
                element={
                  <ProtectedRoute>
                    <CustomerDetail />
                  </ProtectedRoute>
                }
              />

              {/* Default route (redirect root "/" to dashboard) */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
