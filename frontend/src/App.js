// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ListHomePage from './pages/ListHomePage';
import ViewHomesPage from './pages/ViewHomesPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/payment" element={<PaymentPage />} /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-home"
            element={
              <ProtectedRoute>
                <ListHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/homes"
            element={
              <ProtectedRoute>
                <ViewHomesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:homeId"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />

           <Route
            path="/payment"
            element={
              <ProtectedRoute>
               <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
             
                <ForgotPasswordPage/>
             
            }
          />
          <Route
            path="/reset-password"
            element={  
                <ResetPasswordPage />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
