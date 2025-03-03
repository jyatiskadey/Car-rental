import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import CarForm from './CarForm';
import CarList from './CarList';

const ManageCarsSection = ({ cars, addCar }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-700">Manage Cars</h3>
                <button
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusCircle /> Add New Car
                </button>
            </div>
            <CarList cars={cars} />
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
                        <button className="absolute top-3 right-3 text-red-500" onClick={() => setIsModalOpen(false)}>✖</button>
                        <CarForm addCar={(car) => { addCar(car); setIsModalOpen(false); }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCarsSection;
