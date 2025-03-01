import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import swift from '../Media/swift.jpg';
import creta from '../Media/creta.jpg';
import innova from '../Media/innova.jpg';
import harrier from '../Media/harier.jpg';
import thar from '../Media/thar.jpg';
import city from '../Media/city.jpg';
import seltos from '../Media/seltos.jpg';
import hector from '../Media/hector.jpg';
import scorpio from '../Media/scorpio.jpg';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const carList = [
    {
        id: 1,
        name: "Maruti Suzuki Swift",
        type: "Hatchback",
        price: "₹1,800/day",
        image: swift
    },
    {
        id: 2,
        name: "Hyundai Creta",
        type: "SUV",
        price: "₹3,500/day",
        image: creta
    },
    {
        id: 3,
        name: "Toyota Innova Crysta",
        type: "MUV",
        price: "₹4,500/day",
        image: innova
    },
    {
        id: 4,
        name: "Tata Harrier",
        type: "SUV",
        price: "₹4,000/day",
        image: harrier
    },
    {
        id: 5,
        name: "Mahindra Thar",
        type: "SUV",
        price: "₹5,000/day",
        image: thar
    },
    {
        id: 6,
        name: "Honda City",
        type: "Sedan",
        price: "₹3,000/day",
        image: city
    },
    {
        id: 7,
        name: "Kia Seltos",
        type: "SUV",
        price: "₹3,200/day",
        image: seltos
    },
    {
        id: 8,
        name: "MG Hector",
        type: "SUV",
        price: "₹3,800/day",
        image: hector
    },
    {
        id: 9,
        name: "Mahindra Scorpio",
        type: "SUV",
        price: "₹3,800/day",
        image: scorpio
    }
];

export default function Cars() {
    const [selectedCar, setSelectedCar] = useState(null);
    const [popupType, setPopupType] = useState('');

    const openPopup = (car, type) => {
        setSelectedCar(car);
        setPopupType(type);
    };

    const closePopup = () => {
        setSelectedCar(null);
        setPopupType('');
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen mt-10">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Available Cars</h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {carList.map((car) => (
                <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                    <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                    <div className="p-5">
                        <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
                        <p className="text-gray-600">{car.price}</p>

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
                    </div>
                </div>
            ))}
        </div>

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
                            <p className="mt-4 text-sm text-gray-700">This car is designed for maximum comfort and top-tier performance. Perfect for road trips or city drives.</p>
                        </div>
                    )}

                    {popupType === "book" && (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Book This Car</h2>
                            <p className="text-gray-600 mb-2"><strong>Car:</strong> {selectedCar.name}</p>
                            <p className="text-gray-600 mb-4"><strong>Price:</strong> {selectedCar.price}</p>
                            <form className="space-y-3">
                                <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" />
                                <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" />
                                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
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

