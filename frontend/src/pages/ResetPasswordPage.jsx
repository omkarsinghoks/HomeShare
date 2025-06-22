import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';


const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  

  const [error, setError] = useState('');

  const handleSubmit = async e => {
   
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/users/reset-password`, {
        email,
        oldPassword,
        newPassword,
      } );
      
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
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
            placeholder="Old Password"
            required
            className="w-full p-2 border rounded mb-4"
            onChange={e => setOldPassword(e.target.value)}
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
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPage;
