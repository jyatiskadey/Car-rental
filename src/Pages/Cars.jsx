import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../Components/Navbar';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import { API } from '../Apis/api';
import 'react-toastify/dist/ReactToastify.css';  
import { toastHandler } from '../Components/Toast';

export default function Cars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [name, setName] = useState('');
const [date, setDate] = useState('');
const [pickupLocation, setPickupLocation] = useState('');
const [dropLocation, setDropLocation] = useState('');

// This will be available when the popup opens for booking a car
const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const response = await axios.get(API.GET_CAR);
                if (response.status === 200) {
                    setCars(response.data.cars);  // Ensure your API returns {cars: []}
                    toast.success('Cars loaded successfully!', { position: 'top-right' });
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to fetch cars.', {
                    position: 'top-right'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const openPopup = (car, type) => {
        setSelectedCar(car);
        setPopupType(type);
    };

    const closePopup = () => {
        setSelectedCar(null);
        setPopupType('');
    };

    const handlePlaceSelect = (place, type) => {
        const address = place.formatted_address;
        if (type === 'pickup') {
            setPickupLocation(address);
        } else if (type === 'drop') {
            setDropLocation(address);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const bookingData = {
            name,
            date,
            pickupLocation,
            dropLocation,
            carName: selectedCar.name,
            price: selectedCar.price
        };
    
        try {
            const response = await axios.post('http://localhost:5000/api/bookings/create', bookingData);
            toastHandler(response);  // Automatically show toast based on message
            if (response?.data?.message === "Booking successful!") {
                closePopup(); // close popup if booking was successful
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to submit booking!', { position: 'top-right' });
        }
    };
    

    return (
        <div className="p-10 bg-gray-100 min-h-screen mt-10">
            <Navbar />

            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Available Cars</h1>

            {loading ? (
                <p className="text-center text-xl">Loading cars...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {cars.map((car) => (
                        <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                            <img src={car.imageUrl} alt={car.name} className="w-full h-48 object-cover" />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
                                <p className="text-gray-600">{car.price}</p>

                                {localStorage.getItem('token') && (
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => openPopup(car, "details")}
                                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            <FaInfoCircle /> View Details
                                        </button>
                                        <button
                                            onClick={() => openPopup(car, "book")}
                                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                                        >
                                            <FaCheckCircle /> Book Now
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Popup Modal */}
            {selectedCar && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center px-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                        <button onClick={closePopup} className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-600 transition">&times;</button>

                        {popupType === "details" && (
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Car Details</h2>
                                <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-52 object-cover rounded-lg" />
                                <h3 className="text-xl font-semibold mt-4">{selectedCar.name}</h3>
                                <p className="text-gray-600">{selectedCar.price}</p>
                                <p className="mt-4 text-sm text-gray-700">
                                    This car is designed for maximum comfort and top-tier performance. Perfect for road trips or city drives.
                                </p>
                            </div>
                        )}

                        {popupType === "book" && (
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Book This Car</h2>
                                <p className="text-gray-600 mb-2"><strong>Car:</strong> {selectedCar.name}</p>
                                <p className="text-gray-600 mb-4"><strong>Price:</strong> {selectedCar.price}</p>

                                <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                required
            />

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                required
            />

            <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                required
            >
                <option value="">Select Pickup Location</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Kolkata">Kolkata</option>
            </select>

            <select
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                required
            >
                <option value="">Select Drop Location</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Jaipur">Jaipur</option>
            </select>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
                Confirm Booking
            </button>
        </form>

                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
