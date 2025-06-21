import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dvghllujw/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'homeshare';

const ListHomePage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    location: '',
    availableFrom: '',
    availableTo: '',
    description: '',
    requirements: '',
    pricePerNight: '',
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  const uploadToCloudinary = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(CLOUDINARY_UPLOAD_URL, data);
    return res.data.secure_url; // ✅ this is what goes into MongoDB
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const imageUrl = await uploadToCloudinary();

      await axios.post(
        'http://localhost:8000/api/home-listing',
        { ...form, imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Home listed successfully!');
      setTimeout(() => navigate('/homes'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to list home');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-8 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">List Your Home</h2>

          {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
          {success && <p className="text-green-600 mb-3 text-center">{success}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="location" placeholder="Location" required className="border p-3 rounded w-full" onChange={handleChange} />
            <input name="pricePerNight" placeholder="Price per Night (INR)" type="number" required className="border p-3 rounded w-full" onChange={handleChange} />
            <input name="availableFrom" type="date" required className="border p-3 rounded w-full" onChange={handleChange} />
            <input name="availableTo" type="date" required className="border p-3 rounded w-full" onChange={handleChange} />
            <input type="file" accept="image/*" onChange={handleImageChange} required className="border p-3 rounded w-full col-span-1 md:col-span-2" />
            <textarea name="description" placeholder="Description (optional)" className="border p-3 rounded w-full col-span-1 md:col-span-2" onChange={handleChange} />
            <textarea name="requirements" placeholder="Special Requirements (optional)" className="border p-3 rounded w-full col-span-1 md:col-span-2" onChange={handleChange} />
          </div>

          <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full">
            📤 Submit Your Listing
          </button>
        </form>
      </div>
    </>
  );
};

export default ListHomePage;
