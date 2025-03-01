import React from 'react';
import { ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
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
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your admin username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your admin password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Forgot password? <a href="/admin-reset" className="text-red-600 font-semibold">Reset here</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
