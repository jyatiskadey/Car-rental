import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../Apis/api';
import { FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CarList = ({ toggleCarStatus, openPopup }) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const response = await axios.get(API.GET_CAR);
                if (response.status === 200) {
                    setCars(response.data.cars);
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

    const handleDelete = async (carId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This car will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API.DELETE_CAR}/${carId}`);
                    setCars((prevCars) => prevCars.filter((car) => car._id !== carId)); // Remove from UI
                    Swal.fire('Deleted!', 'The car has been successfully deleted.', 'success');
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete the car.', 'error');
                }
            }
        });
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-8 rounded-3xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-wide">Available Cars</h2>

            {loading ? (
                <div className="text-gray-500 text-lg flex items-center justify-center min-h-[200px]">
                    Loading cars...
                </div>
            ) : cars.length === 0 ? (
                <div className="text-gray-500 text-lg flex items-center justify-center min-h-[200px]">
                    No cars found. Start by adding some!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cars.map((car) => (
                        <div
                            key={car._id}
                            className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Car Image */}
                            <div className="w-full overflow-hidden">
                                <img
                                    src={car.imageUrl}
                                    alt={car.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Car Info */}
                            <div className="">
                            <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-4">
    {/* Car Name */}
    {car.name && (
        <h3 className="text-2xl font-bold text-gray-900 truncate">{car.name}</h3>
    )}

    {/* Car Model (Only Show If Exists) */}
    {car.model && (
        <p className="text-gray-700 text-sm mt-1 font-medium">Model: {car.model}</p>
    )}

    {/* Rent Price */}
    {car.price && (
        <p className="text-green-600 font-bold text-lg mt-2">
            Rent Price: ₹{car.price}
        </p>
    )}

    {/* Driver Name (Only Show If Exists) */}
    {car.driverName && (
        <div className="flex items-center gap-2 mt-3">
            <span className="text-gray-600 text-sm font-medium">Driver:</span>
            <h4 className="text-lg font-semibold text-red-500 truncate">
                {car.driverName}
            </h4>
        </div>
    )}
</div>



                                {/* Buttons */}
                                <div className="mt-4 flex gap-1">
                                    <button
                                        onClick={() => openPopup(car, "details")}
                                        className="flex-1 flex items-center justify-center gap-2 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
                                    >
                                        <FaInfoCircle className="text-sm" /> Details
                                    </button>
                                    <button
                                        onClick={() => openPopup(car, "edit")}
                                        className="flex-1 py-2 flex items-center justify-center gap-2 text-sm font-medium bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
                                    >
                                        <FaEdit className="text-sm" /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(car._id)}
                                        className="flex-1 py-2 flex items-center justify-center gap-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all focus:ring-2 focus:ring-red-400 focus:outline-none"
                                        aria-label="Delete Car"
                                    >
                                        <FaTrash className="text-base" /> Delete
                                    </button>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold py-1 px-3 rounded-full shadow-lg">
                                ₹{car.price}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CarList;
