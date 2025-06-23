// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'guest' });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/users/register`, formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    finally {
    setLoading(false);
  }
  };

  return (
    <>
  <Navbar />
  
  
  {loading && (
    <div className="loading-overlay">
      <div className="loader"></div>
    </div>
  )}

  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="relative w-full max-w-md">
      
    

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative z-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input name="name" type="text" placeholder="Name" className="w-full p-2 border rounded mb-4" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded mb-4" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded mb-4" onChange={handleChange} required />
        
        <select name="role" className="w-full p-2 border rounded mb-4" onChange={handleChange} required>
          <option value="guest">Guest</option>
          <option value="host">Host</option>
        </select>

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  </div>
</>

  );
};

export default RegisterPage;
