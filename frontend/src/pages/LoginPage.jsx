// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
        email,
        password,
      });
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
           <div className="mt-5 text-center flex flex-col gap-2">
  <Link
    to="/forgot-password"
    className="text-blue-500 hover:text-blue-700 transition-colors duration-200 hover:font-semibold"
  >
    Forgot Password?
  </Link>
  <Link
    to="/reset-password"
    className="text-green-500 hover:text-green-700 transition-colors duration-200 hover:font-semibold"
  >
    Reset Password
  </Link>
</div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
