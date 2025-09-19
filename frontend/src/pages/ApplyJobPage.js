import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ApplyJobPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [resumeURL, setResumeURL] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/candidate/${jobId}`);
        setJob(res.data);
      } catch (err) {
        console.error('Failed to load job details', err);
        Swal.fire('Error', 'Failed to load job details', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token'); 

  try {
    await axios.post(
      `http://localhost:5000/api/applications/apply/${jobId}`, 
      {
        jobId,
        resumeUrl: resumeURL, 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   Swal.fire({
  icon: 'success',
  title: 'Application Sent',
  text: 'Your job application has been submitted successfully.',
}).then(() => navigate('/candidate-dashboard'));
    setResumeURL('');
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Application Failed',
      text: err.response?.data?.msg || 'Could not submit application.',
    });
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Job not found or an error occurred.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-3xl p-8">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{job.title}</h1>
          <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="resume"
              className="block mb-2 text-gray-700 font-medium"
            >
              Resume URL
            </label>
            <input
              type="url"
              id="resume"
              placeholder="https://example.com/my-resume.pdf"
              value={resumeURL}
              onChange={(e) => setResumeURL(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobPage;
