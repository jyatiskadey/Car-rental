import React, { useState } from 'react';
import { BarChart, Car, CircleDollarSign, Users, Settings, LogOut, PlusCircle, User } from 'lucide-react';
import CarForm from '../../Components/CarForm'; // Ensure this file exists and works correctly
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Important for Chart.js to work properly
import CarList from '../../Components/CarList';
import { FaSignOutAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Drivers from '../../Components/DriverForm';
import Citizen from '../Citizen';
// Dummy chart data (for bookings chart)
const bookingChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Bookings',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: '#f87171',
        },
    ],
};

const AdminDashboard = ({ cars = [], addCar }) => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal Controls
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // SidebarLink Component (Reusable for sidebar items)
    const SidebarLink = ({ icon: Icon, label, section }) => (
        <button
            onClick={() => setActiveSection(section)}
            className={`flex items-center gap-3 p-3 rounded transition w-full text-left ${
                activeSection === section ? 'bg-red-500' : 'hover:bg-red-500'
            }`}
        >
            <Icon /> {label}
        </button>
    );
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            // confirmButtonColor: '#d33',
            // cancelButtonColor: '#3085d6',
            // confirmButtonText: 'Yes, logout!',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
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


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-red-600 text-white p-6 space-y-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <nav className="space-y-2">
                    <SidebarLink icon={BarChart} label="Dashboard" section="dashboard" />
                    <SidebarLink icon={Car} label="Manage Cars" section="manage-cars" />
                    <SidebarLink icon={CircleDollarSign} label="Bookings" section="bookings" />
                    {/* <SidebarLink icon={Users} label="Users" section="users" /> */}
                    <SidebarLink icon={Settings} label="Settings" section="settings" />
                    <SidebarLink icon={User} label="Drivers" section="Drivers" />
                    <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
    >
        <FaSignOutAlt /> Logout
    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                {/* Topbar */}
                <div className="flex justify-between items-center bg-white shadow p-4 rounded-lg mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeSection.replace('-', ' ')}</h2>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-300 rounded-lg px-3 py-1"
                        />
                        <img
                            src="/images/logo.png"
                            alt="Admin"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-6">
                    {/* Dashboard Section */}
                    {activeSection === 'dashboard' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard icon={Car} label="Total Cars" value={cars.length} color="red" />
                                <StatCard icon={CircleDollarSign} label="Total Bookings" value="124" color="green" />
                                <StatCard icon={Users} label="Total Users" value="58" color="blue" />
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold mb-4">Monthly Bookings</h3>
                                <Bar data={bookingChartData} />
                            </div>
                        </>
                    )}

                    {/* Manage Cars Section */}
                    {activeSection === 'manage-cars' && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-700">Manage Cars</h3>
                                <button
                                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                    onClick={openModal}
                                >
                                    <PlusCircle /> Add New Car
                                </button>
                            </div>                         
<CarList cars={cars} />
                            {/* Add Car Modal */}
                            {isModalOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
                                        <button
                                            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                                            onClick={closeModal}
                                        >
                                            ✖
                                        </button>
                                        <CarForm
                                            addCar={(car) => {
                                                addCar(car);
                                                closeModal();
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeSection === 'bookings' && (
                        <div className="bg-white p-6 rounded-lg shadow text-gray-500">
                            Bookings data will come here...
                        </div>
                    )}

                    {/* {activeSection === 'users' && (
                        <div className="bg-white p-6 rounded-lg shadow text-gray-500">
                            <Citizen/>
                        </div>
                    )} */}

                    {activeSection === 'settings' && (
                        <div className="bg-white p-6 rounded-lg shadow text-gray-500">
                            Settings page will come here...
                        </div>
                    )}
                    {activeSection === 'Drivers' && (
                        <div className="bg-white p-6 rounded-lg shadow text-gray-500">
                           <Drivers/>
                        </div>
                    )}

                  
                </div>
            </main>
        </div>
    );
};

// StatCard Component (Reusable for dashboard stats)
const StatCard = ({ icon: Icon, label, value, color }) => {
    const colors = {
        red: 'text-red-600',
        green: 'text-green-600',
        blue: 'text-blue-600',
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
            <Icon className={`${colors[color]} w-10 h-10`} />
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
            </div>
        </div>
    );
};

export default AdminDashboard;
