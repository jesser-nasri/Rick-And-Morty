// src/components/Card.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  id: number;
  image: string;
  name: string;
  status: string;
  location: string;
}

const Card: React.FC<CardProps> = ({ id, image, name, status, location }) => {

  // Determine the background color based on the status
  const getStatusColor = () => {
    switch (status) {
      case 'Alive':
        return 'bg-green-300'; // Green color for Alive
      case 'Dead':
        return 'bg-red-300'; // Red color for Dead
      case 'unknown':
        return 'bg-gray-300'; // Gray color for Unknown
      default:
        return 'bg-white'; // Default to white if no status matches
    }
  };

  return (
    <div className={`border-2 border-black rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-300 ${getStatusColor()} w-64 h-auto`}>
      <img src={image} alt={name} className="w-full h-56 object-cover rounded-md mb-4 border-2 border-black shadow-md" />
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">{name}</h3>
      <p className="text-sm text-gray-800 text-center">
        <span className="font-semibold text-gray-700">Status:</span> 
        <span className={`${status === 'Alive' ? 'text-green-600' : status === 'Dead' ? 'text-red-600' : 'text-gray-600'}`}> {status}</span>
      </p>
      <p className="text-sm text-gray-800 text-center">
        <span className="font-semibold text-gray-700">Location: </span> 
        <span className="text-blue-600">{location}</span>
      </p>
      <div className="text-center mt-4">
        <Link to={`/card/${id}`} className="text-blue-500 hover:text-blue-700 font-semibold hover:underline transition duration-200">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
