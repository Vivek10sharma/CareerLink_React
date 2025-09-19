import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">Oops! The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
