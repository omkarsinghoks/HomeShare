// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { user, token } = useAuth(); // check login status

  return (
    <>
      <Navbar />
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://lh4.googleusercontent.com/OljzWa2o_v9hzbU4ssWVn3DdOcaTx_cKecch2IG6xuByffH6RqFNcL2qDzXMnqFT5S-M_CAnyigz6bh66phNQjlrevcts79jVepTyoK5BZohUfGFo3abaryV3PbFvVijV6GdZnVN8eAQZzsA7GTUfhE')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to HomeShare 🏡</h1>
          <p className="text-lg md:text-xl mb-6">
            List your home or book a place to stay while traveling.
          </p>

          {/* 👇 Only show if user is NOT logged in */}
          {!token && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
