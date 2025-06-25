// src/pages/BookingPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const BookingPage = () => {
  const { homeId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const handleSubmit = async e => {
     
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/bookings`,  
        { home: homeId, ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status !== 200) {
        throw new Error('Booking failed');
         
      }

      setSuccess('Booking  slot successful! Redirecting to payment...');
      const days = calculateDays(form.startDate, form.endDate);
      setBookingDetails({ booking: res.data.booking, days });

      setTimeout(() => navigate(`/payment?homeId=${homeId}&days=${days}`), 1500);
    } catch (err) {
      const message = err.response?.data?.message || 'Booking failed';
      alert(message); // pop-up alert
      setError(message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Book This Home </h2>

          {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
          {success && <p className="text-green-600 mb-2 text-center">{success}</p>}

          <input
            type="date"
            name="startDate"
            placeholder="Start Date"
            required
            className="w-full p-2 border rounded mb-4"
            onChange={handleChange}
          />
          <input
            type="date"
            name="endDate"
            placeholder="End Date"
            required
            className="w-full p-2 border rounded mb-4"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </>
  );
};

export default BookingPage;
