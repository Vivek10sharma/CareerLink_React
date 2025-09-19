import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const JobSearch = () => {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch all jobs on initial load
  useEffect(() => {
  const fetchAllJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // or wherever you save it
      const res = await axios.get('http://localhost:5000/api/candidate/jobs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      Swal.fire('Error', 'Failed to fetch jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  fetchAllJobs();
}, []);


  // Handle search by query
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/candidate/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error searching jobs:', error);
      Swal.fire('Error', 'Failed to search jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle job application
  const handleApply = async (jobId) => {
    try {
      navigate(`/jobs/${jobId}`);
    } catch (error) {
      console.error('Error applying for job:', error);
      Swal.fire('Error', 'Failed to apply', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Search Jobs</h1>

      <form onSubmit={handleSearch} className="flex items-center justify-center mb-8 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Enter job title, location, company..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-r-md hover:bg-indigo-700"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading jobs...</p>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-1"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-600 mb-1"><strong>Category:</strong> {job.category}</p>
              <p className="text-gray-600 mb-3"><strong>Description:</strong> {job.description?.slice(0, 100)}...</p>
              <button
                onClick={() => handleApply(job._id)}
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No jobs found.</p>
      )}
    </div>
  );
};

export default JobSearch;
