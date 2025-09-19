import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'candidate',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Capitalize first letter of each word in name
  const capitalizeName = (name) => {
    return name
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formattedName = capitalizeName(formData.name);

    const nameRegex = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)+$/;
    if (!nameRegex.test(formattedName)) {
      return Swal.fire({
        icon: 'error',
        title: 'Invalid Name',
        text: 'Full name must contain at least two words, each starting with a capital letter.',
      });
    }

    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      return Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: 'Password must be at least 8 characters long and contain at least one number.',
      });
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        ...formData,
        name: formattedName,
      });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: response.data.msg,
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/login');
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.response?.data?.msg || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="candidate">Job Seeker</option>
            <option value="recruiter">Employer</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
