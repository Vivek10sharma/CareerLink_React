import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PostJobModal from '../components/PostJobModal';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/recruiter/jobs/my-jobs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const handleDelete = async (jobId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This job will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/recruiter/jobs/my-jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(jobs.filter((job) => job._id !== jobId));
        Swal.fire('Deleted!', 'The job has been deleted.', 'success');
      } catch (err) {
        console.error('Error deleting job:', err);
        Swal.fire('Error', 'There was a problem deleting the job.', 'error');
      }
    }
  };

  const handleEdit = (job) => {
    setEditJob(job);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditJob(null);
  };

  const handleUpdateSuccess = () => {
  fetchJobs(); // reload job list
  Swal.fire({
    icon: 'success',
    title: 'Updated!',
    text: 'The job has been updated successfully.',
    timer: 2000,
    showConfirmButton: false,
  });
  handleModalClose();
};

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Posted Jobs</h2>
      </div>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg shadow p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="mt-2 text-sm text-gray-700">
                  {job.description?.slice(0, 100)}...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Location:</strong> {job.location}
                  <br />
                  <strong>Category:</strong> {job.category}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No jobs posted yet.</p>
      )}

      {showModal && (
  <PostJobModal
    mode={editJob ? 'edit' : 'create'}
    job={editJob}
    onClose={handleModalClose}
    onSuccess={handleUpdateSuccess}
  />
)}
    </div>
  );
};

export default MyJobs;
