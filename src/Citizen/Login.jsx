import React from 'react';

const CitizenLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex justify-center items-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image Section */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1556761175-129418cb2dfe" // Replace with better citizen-related image if needed
            alt="Citizen Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Citizen Login</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Login
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
