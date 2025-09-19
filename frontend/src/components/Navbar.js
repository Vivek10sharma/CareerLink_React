import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-700">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3">
        {/* Brand */}
        <Link className="text-white font-bold text-xl" to="/">
          Career<span className="text-yellow-400">Link</span>
        </Link>

        {/* Hamburger Button for Mobile */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            to="/jobs" 
            className="text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
          >
            Jobs
          </Link>
          <Link
            to="/login"
            className="bg-white text-blue-700 px-3 py-1 rounded text-sm hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-700 px-3 py-1 rounded text-sm hover:bg-gray-100"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Mobile menu toggle */}
      <div className={`w-full md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        {/* Mobile Menu Links */}
        <div className="px-4 pb-4 space-y-2">
          <Link
            to="/jobs"
            className="block text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Jobs
          </Link>
          <Link
            to="/login"
            className="block bg-white text-blue-700 px-3 py-2 rounded text-sm hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block bg-white text-blue-700 px-3 py-2 rounded text-sm hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
