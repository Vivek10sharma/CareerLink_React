import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/recruiter/jobs'); 
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Job Listings</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition cursor-default select-none"
            >
              <h2 className="text-2xl font-semibold text-indigo-700">{job.title}</h2>
              <p className="text-indigo-600 font-medium mt-1">{job.company} - {job.location}</p>
              <p className="text-gray-700 mt-4 line-clamp-3">{job.description}</p>
              <p className="text-sm text-indigo-500 mt-4 font-semibold">Category: {job.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default JobListPage;
