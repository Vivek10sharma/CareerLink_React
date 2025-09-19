import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const res = await axios.get('http://localhost:5000/api/applications/myapplications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data.applications);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (applicationId) => {
    const confirm = await Swal.fire({
      title: 'Cancel Application?',
      text: 'Are you sure you want to cancel this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/applications/myapplications/${applicationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire('Cancelled!', 'Your application has been cancelled.', 'success');
        fetchApplications(); 
      } catch (err) {
        Swal.fire('Error', err.response?.data?.msg || 'Could not cancel application', 'error');
      }
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading applications...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Job Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center">You haven't applied to any jobs yet.</p>
      ) : (
        <div className="grid gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-1">{app.job.title}</h2>
              <p className="text-gray-700">{app.job.company}</p>
              <p className="text-sm text-gray-500 mt-1">{app.job.location || 'Remote / Location not specified'}</p>
              <p className="text-sm text-gray-600 mt-3">
                <strong>Resume URL:</strong>{' '}
                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {app.resumeUrl}
                </a>
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full 
                    ${
                      app.status === 'accepted'
                        ? 'bg-green-100 text-green-700'
                        : app.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                >
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>

                <button
                  onClick={() => handleCancel(app._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel Application
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
