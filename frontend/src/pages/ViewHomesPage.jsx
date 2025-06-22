// src/pages/ViewHomesPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import HomeCard from '../components/HomeCard';

const ViewHomesPage = () => {
  const { token } = useAuth();
  const [homes, setHomes] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState({
    location: '',
    availableFrom: '',
    availableTo: '',
    minPrice: '',
    maxPrice: ''
  });

  const fetchHomes = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/home-listing/search?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHomes(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load homes');
    }
  };

  useEffect(() => {
    fetchHomes();
  }, [token]);

  const handleChange = e => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = e => {
    e.preventDefault();
    fetchHomes(search);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Available Homes</h2>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-6xl mx-auto mb-6">
  <input
    type="text"
    name="location"
    placeholder="Location"
    className="p-2 border rounded"
    onChange={handleChange}
  />
  <input
    type="date"
    name="availableFrom"
    className="p-2 border rounded"
    onChange={handleChange}
  />
  <input
    type="date"
    name="availableTo"
    className="p-2 border rounded"
    onChange={handleChange}
  />
  <input
    type="number"
    name="minPrice"
    placeholder="Min Price"
    className="p-2 border rounded"
    onChange={handleChange}
  />
  <input
    type="number"
    name="maxPrice"
    placeholder="Max Price"
    className="p-2 border rounded"
    onChange={handleChange}
  />
  <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    🔍 Search
  </button>
</form>


        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex flex-wrap justify-center gap-6">
          {homes.length > 0 ? (
            homes.map(home => <HomeCard key={home._id} home={home} />)
          ) : (
            <p className="text-gray-600">No homes available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewHomesPage;
