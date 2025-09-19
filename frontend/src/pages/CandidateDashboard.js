import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Swal from 'sweetalert2';

const CandidateDashboard = () => {
  const [candidateName, setCandidateName] = useState('');
  const navigate = useNavigate();

    const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/candidate/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCandidateName(response.data.name);
      } catch (error) {
        console.error('Failed to fetch candidate profile:', error);
        navigate('/login'); // Optional: logout on error
      }
    };

    fetchProfile();
  }, [navigate, token]);
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        Swal.fire('Logged out', 'You have been successfully logged out.', 'success');
        navigate('/login');  
      }
    });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-3 px-4">
          <Link to="/" className="text-2xl font-bold hover:text-indigo-300">
            Career<span className="text-yellow-400">Link</span>
          </Link>

          <div className="space-x-3 hidden md:flex">
            <button
              onClick={handleLogout}
              className="border border-white px-3 py-1 rounded hover:bg-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <header className="bg-gray-100 text-gray-800 text-center py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-extrabold mb-3">
            Welcome{candidateName ? `, ${candidateName}` : ''}!
          </h1>
          <p className="text-lg mb-8">Explore job opportunities tailored for you.</p>
        </div>
      </header>

      {/* Info about CareerLink */}
      <section className="bg-indigo-50 py-12">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">About CareerLink</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            CareerLink is your trusted platform to connect job seekers with top recruiters.
            Our mission is to simplify your job search and empower your career growth.
          </p>
        </div>
      </section>

      {/* What candidates can do */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">What You Can Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1008/1008103.png"
                alt="Browse Jobs"
                className="mx-auto h-16 w-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Browse Jobs</h3>
              <p className="text-gray-700">
                Search thousands of jobs filtered by your skills and preferences.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Applications"
                className="mx-auto h-16 w-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Manage Applications</h3>
              <p className="text-gray-700">
                Track your submitted applications and stay updated on their status.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
                alt="Profile"
                className="mx-auto h-16 w-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Build Your Profile</h3>
              <p className="text-gray-700">
                Create and update your profile to attract recruiters with your skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Description */}
      <section className="bg-indigo-50 py-12">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">Why Choose CareerLink?</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg">
            CareerLink is dedicated to making your job search effortless and productive.
            We provide a seamless platform for candidates to discover their dream jobs,
            connect directly with recruiters, and manage their applications all in one place.
            Join thousands of satisfied users and take the next step in your career today.
          </p>
        </div>
      </section>

      {/* Actions Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to="/job-search"
            className="group block rounded-lg border border-gray-200 shadow hover:shadow-lg transition-shadow p-6 text-center bg-indigo-50 hover:bg-indigo-100"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1008/1008103.png"
              alt="Jobs"
              className="mx-auto h-16 w-16 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-700">
              Browse Jobs
            </h3>
            <p className="text-gray-700">Find the perfect job match based on your skills.</p>
          </Link>

          <Link
            to="/my-applications"
            className="group block rounded-lg border border-gray-200 shadow hover:shadow-lg transition-shadow p-6 text-center bg-indigo-50 hover:bg-indigo-100"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Applications"
              className="mx-auto h-16 w-16 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-700">
              My Applications
            </h3>
            <p className="text-gray-700">Track and manage your job applications easily.</p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CandidateDashboard;
