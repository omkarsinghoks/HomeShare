// src/pages/DashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <div
          className="h-64 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl text-white font-bold">
              Welcome, {user.name} 👋
            </h1>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          {user.role === 'host' ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">List a New Home</h2>
                  <p className="text-gray-600 mb-4">
                    Share your space with guests while you're away. Earn money by listing your property.
                  </p>
                </div>
                <Link
                  to="/list-home"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
                >
                  ➕ List Home
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Explore Listings</h2>
                  <p className="text-gray-600 mb-4">
                    Check out what other hosts are offering and get inspired by their listings.
                  </p>
                </div>
                <Link
                  to="/homes"
                  className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 text-center"
                >
                  🏠 View Homes
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">Browse Available Homes</h2>
              <p className="text-gray-600 mb-4">
                Looking for a cozy place to stay? Browse through our curated listings.
              </p>
              <Link
                to="/homes"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 inline-block"
              >
                🔍 Explore Homes
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
