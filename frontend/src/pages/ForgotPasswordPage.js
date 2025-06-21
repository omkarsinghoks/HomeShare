import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  // const useNavigate = useNavigate();

  const handleSubmit = async e => {
    const navigate = useNavigate();
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await axios.post('${process.env.REACT_APP_BACKEND_URL}/api/users/forget-password', { email, newPassword });
      console.log(res.data);
      setMessage(res.data.message);
      // Redirect to login after successful password reset
      setTimeout(() => {
        navigate('/login'); // <-- Correct usage
      }, 1000);
     
      
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
          {message && <p className="text-green-600 text-center mb-2">{message}</p>}
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded mb-4"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            required
            className="w-full p-2 border rounded mb-4"
            onChange={e => setNewPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordPage;