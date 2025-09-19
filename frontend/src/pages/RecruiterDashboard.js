import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import PostJobModal from '../components/PostJobModal';

// Icons
const BriefcaseIcon = () => (
  <svg className="w-10 h-10 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 12v6"></path>
    <path d="M6 6h12v12H6z"></path>
    <path d="M8 6v-2a2 2 0 0 1 4 0v2"></path>
  </svg>
);

const UsersIcon = () => (
  <svg className="w-10 h-10 text-green-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M17 11v-1a4 4 0 0 0-8 0v1"></path>
    <path d="M21 21v-2a4 4 0 0 0-8 0v2"></path>
  </svg>
);

const DescriptionIcon = () => (
  <svg className="w-10 h-10 text-purple-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 20h9"></path>
    <path d="M12 4h9"></path>
    <path d="M12 12h9"></path>
    <path d="M3 6h.01"></path>
    <path d="M3 12h.01"></path>
    <path d="M3 18h.01"></path>
  </svg>
);

const ActionIcon = ({ icon }) => (
  <div className="mb-4 text-blue-500">{icon}</div>
);

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleJobSubmit = async (jobData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/recruiter/jobs/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('Success', 'Job posted successfully!', 'success');
        setShowModal(false);
      } else {
        Swal.fire('Error', data.message || 'Failed to post job.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold tracking-wide cursor-pointer select-none">
          Career<span className="text-yellow-400">Link</span>
        </h1>
        <div className="flex items-center gap-6 font-semibold text-lg">
          <span className="hidden sm:inline">Hello, <span className="underline decoration-yellow-400">{user?.name || 'Recruiter'}</span></span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 transition-colors rounded-md px-4 py-2 shadow-md shadow-red-300"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Welcome Section */}
      <header className="py-16 text-center bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 drop-shadow-lg">
        <h2 className="text-4xl font-bold mb-3 text-gray-900 tracking-tight">Welcome to CareerLink</h2>
        <p className="max-w-xl mx-auto text-xl text-gray-700 font-medium">
          Your gateway to top talent and seamless hiring
        </p>
      </header>

      {/* About CareerLink */}
      <section className="px-8 py-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-xl p-8 shadow-lg border border-blue-200">
          <BriefcaseIcon />
          <div>
            <h3 className="text-3xl font-semibold mb-3 text-blue-700">About CareerLink</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              CareerLink is a modern job portal bridging recruiters and candidates.
              Post jobs, track applications, and connect with skilled professionals.
              Designed to make hiring faster and smarter.
            </p>
          </div>
        </div>
      </section>

      {/* What Recruiters Can Do */}
      <section className="px-8 py-12 max-w-5xl mx-auto bg-blue-50 rounded-xl shadow-inner border border-blue-100">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <UsersIcon />
          <div>
            <h3 className="text-3xl font-semibold mb-3 text-green-700">What Recruiters Can Do</h3>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
              <li>Post new job opportunities easily</li>
              <li>Manage and update your job listings</li>
              <li>Explore the talent pool and find candidates</li>
              <li>Track and review job applications in real-time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose CareerLink */}
      <section className="px-8 py-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-xl p-8 shadow-lg border border-purple-200">
          <DescriptionIcon />
          <div>
            <h3 className="text-3xl font-semibold mb-3 text-purple-700">Why Choose CareerLink?</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our platform is designed with simplicity and power in mind.
              Whether you are a startup or a large enterprise, CareerLink adapts to your recruitment needs, helping you hire smarter, faster, and easier.
            </p>
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="py-12 bg-blue-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-8">
          <div
            onClick={handleOpenModal}
            className="cursor-pointer bg-white rounded-lg shadow-md p-8 flex flex-col items-center hover:shadow-lg transition-shadow border border-blue-300"
          >
            <ActionIcon icon={<BriefcaseIcon />} />
            <h4 className="text-xl font-semibold mb-2 text-blue-700">Add Job</h4>
            <p className="text-gray-600 text-center">
              Post new job opportunities and attract top candidates.
            </p>
          </div>

          <Link to="/recruiter/my-jobs" className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center hover:shadow-lg transition-shadow border border-green-300">
            <ActionIcon icon={<UsersIcon />} />
            <h4 className="text-xl font-semibold mb-2 text-green-700">My Job Posts</h4>
            <p className="text-gray-600 text-center">View and manage your job listings.</p>
          </Link>

          <Link to="/jobs" className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center hover:shadow-lg transition-shadow border border-yellow-300">
            <ActionIcon icon={<DescriptionIcon />} />
            <h4 className="text-xl font-semibold mb-2 text-yellow-600">All Jobs</h4>
            <p className="text-gray-600 text-center">Browse all active job listings.</p>
          </Link>

          <Link to="/application" className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center hover:shadow-lg transition-shadow border border-purple-300">
            <ActionIcon icon={<BriefcaseIcon />} />
            <h4 className="text-xl font-semibold mb-2 text-purple-700">Applications</h4>
            <p className="text-gray-600 text-center">Review job applications.</p>
          </Link>
        </div>
      </section>

      {/* Post Job Modal */}
      {showModal && (
        <PostJobModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onPostJob={handleJobSubmit}
          onSuccess={() => {
            Swal.fire('Success', 'Job posted successfully!', 'success');
            setShowModal(false);
          }}

        />
      )}

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6 text-center mt-auto shadow-inner">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CareerLink. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default RecruiterDashboard;
