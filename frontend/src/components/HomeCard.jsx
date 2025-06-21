import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeCard = ({ home }) => {
  const [showMore, setShowMore] = useState(false);

  const descriptionWords = home.description?.split(' ') || [];
  const shortDescription = descriptionWords.slice(0, 20).join(' ');

  const toggleShow = () => setShowMore(prev => !prev);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-80">
      <img src={
    home.imageUrl?.startsWith('http')
      ? home.imageUrl
      : `${process.env.REACT_APP_BACKEND_URL}${home.imageUrl}`
  } alt="Home" className="w-full h-48 object-cover" />
      
      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">{home.location}</h2>
        <p className="text-sm text-gray-600 mb-1">₹{home.pricePerNight} per night</p>

        {/* Description with toggle */}
        <p className="text-sm text-gray-500 mb-2">
          {showMore || descriptionWords.length <= 20
            ? home.description
            : `${shortDescription}...`}{' '}
          {descriptionWords.length > 20 && (
            <button onClick={toggleShow} className="text-blue-600 hover:underline text-xs ml-1">
              {showMore ? 'Read Less' : 'Read More'}
            </button>
          )}
        </p>

        <Link
          to={`/book/${home._id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default HomeCard;
