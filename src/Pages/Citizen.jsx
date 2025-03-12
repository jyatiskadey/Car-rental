import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../Apis/api';
import { FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Citizen = ({ openPopup }) => {
    const [citizens, setCitizens] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCitizens = async () => {
            setLoading(true);
            try {
                const response = await axios.get(API.GET_ALL_CITIZEN);
                if (response.status === 200) {
                    setCitizens(response.data.citizens);
                    toast.success('Citizens loaded successfully!', { position: 'top-right' });
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to fetch citizens.', {
                    position: 'top-right'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCitizens();
    }, []);

    const handleDelete = async (citizenId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This citizen will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API.DELETE_CITIZEN}/${citizenId}`);
                    setCitizens((prev) => prev.filter((citizen) => citizen._id !== citizenId));
                    Swal.fire('Deleted!', 'The citizen has been successfully deleted.', 'success');
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete the citizen.', 'error');
                }
            }
        });
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-8 rounded-3xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-wide">All Citizens</h2>

            {loading ? (
                <div className="text-gray-500 text-lg flex items-center justify-center min-h-[200px]">
                    Loading Citizens...
                </div>
            ) : citizens.length === 0 ? (
                <div className="text-gray-500 text-lg flex items-center justify-center min-h-[200px]">
                    No Citizens found. Start by adding some!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {citizens.map((citizen) => (
                        <div
                            key={citizen._id}
                            className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-2xl transition-all duration-300 p-5"
                        >
                            <h3 className="text-xl font-semibold text-gray-900">{citizen.name}</h3>
                            <p className="text-gray-600 text-sm mt-1">Email: {citizen.email}</p>
                            <p className="text-gray-600 text-sm">Phone: {citizen.phone}</p>

                            {/* Buttons */}
                            <div className="mt-4 flex gap-1">
                                <button
                                    onClick={() => openPopup(citizen, "details")}
                                    className="flex-1 flex items-center justify-center gap-2 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
                                >
                                    <FaInfoCircle className="text-sm" /> Details
                                </button>
                                <button
                                    onClick={() => openPopup(citizen, "edit")}
                                    className="flex-1 py-2 flex items-center justify-center gap-2 text-sm font-medium bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
                                >
                                    <FaEdit className="text-sm" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(citizen._id)}
                                    className="flex-1 py-2 flex items-center justify-center gap-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all focus:ring-2 focus:ring-red-400 focus:outline-none"
                                    aria-label="Delete Citizen"
                                >
                                    <FaTrash className="text-base" /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Citizen;
