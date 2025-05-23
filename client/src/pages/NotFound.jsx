import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nottound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
