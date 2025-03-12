import React, { useEffect , useState } from 'react';
import axios from 'axios';   // ✅ Fixed axios import
import { toast } from 'react-toastify';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { API } from '../Apis/api';

export default function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [newDriver, setNewDriver] = useState({
        name: '',
        email: '',
        mobile: '',
        image: null,  // Make sure image is file object (not URL string)
    });

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDriver({ ...newDriver, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!newDriver.name || !newDriver.mobile || !newDriver.image || !newDriver.email) {
            toast.error('All fields are required!', { position: 'top-right' });
            return;
        }

        const formData = new FormData();
        formData.append('name', newDriver.name);
        formData.append('email', newDriver.email);
        formData.append('phone', newDriver.mobile);
        formData.append('image', newDriver.image);  // File object will be here

        try {
            const response = await axios.post(API.CREATE_DRIVER, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 201) {
                toast.success('Driver added successfully!', { position: 'top-right' });

                // Reset form
                setNewDriver({ name: '', email: '', mobile: '', image: null });

                // Fetch latest drivers from backend (optional - you can also just update local state if needed)
                fetchDrivers();
setLoading(false);
                closeForm();
            }
        } catch (error) {
            console.error('Failed to add driver:', error);
            toast.error(error.response?.data?.message || 'Failed to add driver', { position: 'top-right' });
        }
    };

    const fetchDrivers = async () => {
        try {
            const response = await axios.get(API.GET_ALL_DRIVER);
            setDrivers(response.data.drivers);   // This assumes your API returns { drivers: [...] }
        } catch (error) {
            console.error('Failed to fetch drivers:', error);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);
    

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Driver Management</h1>
                <button
                    onClick={openForm}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <FaPlus /> Add Driver
                </button>
            </div>

            {/* Driver List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {drivers.map(driver => (
        <div key={driver._id} className="relative bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 transition-transform transform hover:scale-105">
            <div className="w-full h-40 bg-gray-100 flex justify-center items-center overflow-hidden">
                <img src={driver.image} alt={driver.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold text-gray-800">{driver.name}</h3>
                <p className="text-gray-600 text-sm flex items-center gap-2">
                    📧 <span className="font-medium">{driver.email}</span>
                </p>
                <p className="text-gray-600 text-sm flex items-center gap-2">
                    🪪 <span className="font-medium">{driver.driverId}</span>
                </p>
                <p className="text-gray-600 text-sm flex items-center gap-2">
                    📱 <span className="font-medium">{driver.phone}</span>
                </p>

                <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Active Driver
                </div>
            </div>
        </div>
    ))}
</div>


            {/* Add Driver Form Popup */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center px-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <button
                            onClick={closeForm}
                            className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-600 transition"
                        >
                            <FaTimes />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Driver</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium">Driver Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Driver Name"
                                    value={newDriver.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={newDriver.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    value={newDriver.mobile}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium">Driver Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={(e) => setNewDriver({ ...newDriver, image: e.target.files[0] })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                                disabled={loading}
                            >
                               {loading ? 'Adding...' : 'Add Driver'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
