// src/pages/PaymentPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const PaymentPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const homeId = searchParams.get('homeId');
  const days = Number(searchParams.get('days'));

  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/home-listing`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const foundHome = res.data.find(h => h._id === homeId);
        if (!foundHome) throw new Error('Home not found');
        setHome(foundHome);
      } catch (err) {
        setError('Failed to load home details');
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, [homeId, token]);

  const handlePayment = () => {
    alert('✅ Payment successful! Thank you.');
    navigate('/dashboard');
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  const totalCost = home.pricePerNight * days;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-3xl">
          <h2 className="text-3xl font-semibold mb-6 text-center">Payment Summary</h2>

          <div className="mb-6 text-lg space-y-2">
            <p><strong>Location:</strong> {home.location}</p>
            <p><strong>Price per Night:</strong> ₹{home.pricePerNight}</p>
            <p><strong>Number of Nights:</strong> {days}</p>
            <p className="text-xl mt-4"><strong>Total Amount:</strong> ₹{totalCost}</p>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-3 text-lg rounded hover:bg-green-700"
          >
            💳 Pay ₹{totalCost} Now
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
