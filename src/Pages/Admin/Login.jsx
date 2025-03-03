import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../../Apis/api'; // Ensure your API file exports LOGIN_ADMIN correctly

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(API.LOGIN_ADMIN, { username, password });

      if (response.status === 200) {
        toast.success('Admin login successful!', { position: 'top-right' });

        // Save token and role to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);

        // Redirect to admin dashboard
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 1500);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed. Please check your credentials.',
        { position: 'top-right' }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <ShieldCheck className="w-16 h-16 mx-auto text-red-500" />
          <h2 className="text-3xl font-bold text-red-600 mt-4">Admin Login</h2>
          <p className="text-gray-600 mt-2">Access restricted to authorized personnel only</p>
        </div>

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Forgot password?{' '}
          <a href="/admin-reset" className="text-red-600 font-semibold">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
