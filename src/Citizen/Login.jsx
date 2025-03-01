import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../Apis/api'; // Import API from apis.js

// toast.configure();

const CitizenLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(API.LOGIN_CITIZEN, { email, password });

      if (response.status === 200) {
        toast.success('Login successful!', { position: 'top-right' });

        // Save token and role to localStorage (if needed)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);

        // Redirect after short delay
        setTimeout(() => {
          window.location.href = '/citizen/dashboard'; // Change this to actual dashboard route
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.', {
        position: 'top-right'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex justify-center items-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image Section */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1556761175-129418cb2dfe"
            alt="Citizen Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Citizen Login</h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Don't have an account? <a href="/register" className="text-blue-600 font-semibold">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CitizenLogin;
