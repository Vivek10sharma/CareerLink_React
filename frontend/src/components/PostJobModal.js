import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostJobModal = ({ isOpen = true, onClose, onSuccess, job = null, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    company: '',
    category: '',
  });

  useEffect(() => {
    if (mode === 'edit' && job) {
      setFormData({
        title: job.title || '',
        description: job.description || '',
        location: job.location || '',
        company: job.company || '',
        category: job.category || '',
      });
    }
  }, [job, mode]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    if (mode === 'edit') {
      await axios.put(
        `http://localhost:5000/api/recruiter/jobs/my-jobs/${job._id}`,
        formData,
        config
      );
    } else {
      await axios.post('http://localhost:5000/api/recruiter/jobs/post', formData, config);
    }
     onSuccess(); 

  } catch (err) {
    console.error('Error submitting job:', err.response?.data || err.message);
    alert('There was an issue. Please try again.');
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          {mode === 'edit' ? 'Update Job' : 'Post a New Job'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-300"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              {mode === 'edit' ? 'Update Job' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobModal;
