import React from 'react';
import { FaCar, FaClipboardList, FaUserCircle, FaRegBell, FaSignOutAlt, FaMoneyCheckAlt } from 'react-icons/fa';
import { MdOutlineCarRental } from 'react-icons/md';

const CitizenDashboard = () => {
  const citizenName = "John Doe"; // Example, replace with actual citizen name from API
  const bookedCars = 2;
  const pendingPayments = 1;
  const notifications = [
    "Your car booking #1234 is confirmed!",
    "Payment pending for booking #1235",
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      {/* Header Navbar */}
      <header className="bg-blue-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">🚗 EliteDrive Citizen Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Dashboard Content */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center border border-gray-200">
          <FaUserCircle className="text-blue-500 text-6xl mb-3" />
          <h2 className="text-xl font-bold text-gray-800">{citizenName}</h2>
          <p className="text-gray-500">Premium Member</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-700 mb-4">🚀 Quick Actions</h3>
          <div className="space-y-3">
            <a
              href="/elitedrive/cars"
              className="block bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 flex items-center gap-2 transition"
            >
              <MdOutlineCarRental className="text-xl" /> Book a Car
            </a>
            <a
              href="/citizen/bookings"
              className="block bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 flex items-center gap-2 transition"
            >
              <FaClipboardList className="text-xl" /> View My Bookings
            </a>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-700 mb-4">🔔 Notifications</h3>
          <ul className="space-y-2">
            {notifications.map((note, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-600">
                <FaRegBell className="mt-1 text-yellow-500" />
                {note}
              </li>
            ))}
            {notifications.length === 0 && (
              <p className="text-gray-500">No new notifications</p>
            )}
          </ul>
        </div>
      </main>

      {/* Summary Section */}
      <section className="mt-6 mx-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-bold mb-4 text-gray-700">📊 My Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {/* Booked Cars */}
          <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
            <FaCar className="text-blue-600 text-3xl mb-2" />
            <p className="text-gray-600">Booked Cars</p>
            <p className="text-2xl font-bold">{bookedCars}</p>
          </div>

          {/* Pending Payments */}
          <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg">
            <FaMoneyCheckAlt className="text-red-600 text-3xl mb-2" />
            <p className="text-gray-600">Pending Payments</p>
            <p className="text-2xl font-bold">{pendingPayments}</p>
          </div>

          {/* Future slots (for adding more features later) */}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Coming Soon</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Coming Soon</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CitizenDashboard;
