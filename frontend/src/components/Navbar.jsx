// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">🏠 HomeShare</Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 sm:mt-0">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/homes" className="hover:underline">Homes</Link>
             {user.role === 'host' && (
      <Link to="/list-home" className="hover:underline">List Your Home</Link>
    )}
              <span className="text-sm">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
