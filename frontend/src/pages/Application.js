import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/recruiter/jobs/application', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data.applications);
    } catch (err) {
      console.error('Error fetching applications:', err);
      Swal.fire('Error', 'Failed to fetch applications', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/recruiter/jobs/status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire('Updated!', `Application ${status}`, 'success');
      fetchApplications(); // Refresh list
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Could not update status', 'error');
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading applications...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Applications for Your Posts</h1>

      {applications.length === 0 ? (
        <p className="text-gray-600 text-center">No applications found.</p>
      ) : (
        <div className="grid gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-blue-700">{app.job.title}</h2>
              <p className="text-gray-600">{app.job.company}</p>
              <p className="mt-2 text-sm text-gray-700">
                <strong>Candidate:</strong> {app.candidate?.name || 'N/A'} | {app.candidate?.email || 'N/A'}
              </p>
              <p className="text-sm mt-1">
                <strong>Resume:</strong>{' '}
                <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                  View Resume
                </a>
              </p>
              <p className="text-sm mt-1">
                <strong>Status:</strong>{' '}
                <span className={`font-medium ${app.status === 'pending' ? 'text-yellow-600' : app.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>
                  {app.status}
                </span>
              </p>

             <div className="mt-4 flex gap-3">
  <button
    onClick={() => handleStatusChange(app._id, 'accepted')}
    className={`px-4 py-2 rounded-md text-white ${
      app.status === 'accepted' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'
    }`}
  >
    Accept
  </button>
  <button
    onClick={() => handleStatusChange(app._id, 'rejected')}
    className={`px-4 py-2 rounded-md text-white ${
      app.status === 'rejected' ? 'bg-red-700' : 'bg-red-500 hover:bg-red-600'
    }`}
  >
    Reject
  </button>
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
