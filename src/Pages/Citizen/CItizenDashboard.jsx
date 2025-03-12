import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSignOutAlt, FaUserCircle, FaClipboardList, FaRegBell, FaCar, FaMoneyCheckAlt } from 'react-icons/fa';
import { MdOutlineCarRental } from 'react-icons/md';
import Swal from 'sweetalert2';
import CarLoader from '../../Components/Loader';
const CitizenDashboard = () => {
    const [citizen, setCitizen] = useState(null);  // Start with null
    const [notifications, setNotifications] = useState([]);
    const [bookedCars, setBookedCars] = useState(0);
    const [pendingPayments, setPendingPayments] = useState(0);

    const fetchCitizenProfile = async () => {
        try {
            const token = localStorage.getItem('token');
    
            if (!token) {
                alert('Session expired, please login again.');
                handleLogout();
                return;
            }
    
            const response = await axios.get('http://localhost:5000/api/citizen/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            const data = response.data.citizen;
            setCitizen(data);
    
            // Store user details in localStorage
         
            localStorage.setItem('citizenDetails', JSON.stringify({
                name: data.name, 
                email: data.email, 
                mmobileNo: data.phone
            }));
    
            // Dummy or mock data for booked cars and pending payments
            setBookedCars(2);   // Replace with actual response field if available
            setPendingPayments(1);
            setNotifications([
                "Your car booking #1234 is confirmed!",
                "Payment pending for booking #1235"
            ]);
    
            // Enforce minimum 2 seconds loader time
            // setTimeout(() => {
            //     setLoading(false);   // Assuming you have 'loading' state in parent component
            // }, 2000);
    
        } catch (error) {
            console.error('Error fetching citizen profile:', error);
    
            alert('Session expired, please login again.');
            handleLogout();
        }
    };
    
    
    // Add this helper function to handle logout (reuse where needed)
   
    
    // Trigger profile fetch on component mount
    useEffect(() => {
        fetchCitizenProfile();
    }, []);
    

    const handleLogout = () => {
      Swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, logout!',
      }).then((result) => {
          if (result.isConfirmed) {
              localStorage.removeItem('token');
              localStorage.removeItem('citizenDetails');
              Swal.fire(
                  'Logged Out!',
                  'You have been successfully logged out.',
                  'success'
              ).then(() => {
                  window.location.href = '/';
              });
          }
      });
  };

    if (!citizen) {
        return <CarLoader/>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800"><img src="/images/logo.png" className='h-10 w-20' alt="" /> </h1>
                <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
    >
        <FaSignOutAlt /> Logout
    </button>

            </header>

            <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
                    <FaUserCircle className="text-7xl text-blue-500 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800">{citizen.name}</h2>
                    <span className="text-sm text-gray-500">Premium Member</span>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">🚀 Quick Actions</h3>
                    <a href="/elitedrive/cars" className="flex items-center justify-between bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition">
                        <span>Book a Car</span>
                        <MdOutlineCarRental className="text-2xl" />
                    </a>
                    <a href="/citizen/bookings" className="flex items-center justify-between bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition">
                        <span>My Bookings</span>
                        <FaClipboardList className="text-2xl" />
                    </a>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800">🔔 Notifications</h3>
                    <div className="mt-4 space-y-2">
                        {notifications.length > 0 ? (
                            notifications.map((note, index) => (
                                <div key={index} className="flex items-center gap-2 text-gray-600">
                                    <FaRegBell className="text-yellow-500" />
                                    <span>{note}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No new notifications</p>
                        )}
                    </div>
                </div>
            </main>

            <section className="p-6">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800">📊 My Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                        <div className="flex flex-col items-center bg-blue-50 text-blue-700 py-4 rounded-lg">
                            <FaCar className="text-3xl mb-2" />
                            <p className="text-sm">Booked Cars</p>
                            <p className="text-2xl font-bold">{bookedCars}</p>
                        </div>
                        <div className="flex flex-col items-center bg-red-50 text-red-700 py-4 rounded-lg">
                            <FaMoneyCheckAlt className="text-3xl mb-2" />
                            <p className="text-sm">Pending Payments</p>
                            <p className="text-2xl font-bold">{pendingPayments}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-500 py-4 rounded-lg">
                            Coming Soon
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-500 py-4 rounded-lg">
                            Coming Soon
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CitizenDashboard;
