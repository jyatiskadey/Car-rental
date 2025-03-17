import React, { useEffect, useState } from 'react';
import { Car, Tag, IndianRupee, Upload, User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Make sure toastify is installed
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../Apis/api';
import Select from 'react-select';
const CarForm = ({ addCar }) => {
    const [driverOptions, setDriverOptions] = useState([]);
    const [car, setCar] = useState({
        name: '',
        type: '',
        price: '',
        driverName: '',
        imageFile: null,
        imagePreview: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCar({
                ...car,
                imageFile: file,
                imagePreview: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!car.name || !car.type || !car.price || !car.driverName || !car.imageFile) {
            toast.error('All fields are required!', { position: 'top-right' });
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('name', car.name);
        formData.append('model', car.model);
        formData.append('price', car.price);
        formData.append('driverName', car.driverName);
        formData.append('image', car.imageFile);

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(API.ADD_CAR, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                toast.success('Car added successfully!', { position: 'top-right' });

                if (addCar) {
                    addCar(response.data.car);
                }

                setCar({
                    name: '',
                    model: '',
                    price: '',
                    driverName: '',
                    imageFile: null,
                    imagePreview: '',
                });
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Failed to add car. Please try again.',
                { position: 'top-right' }
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchDrivers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/drivers/get-all-drivers-name');
                if (response.status === 200) {
                    const options = response.data.driverNames.map(driver => ({
                        value: driver.name,
                        label: driver.name
                    }));
                    setDriverOptions(options);
                }
            } catch (error) {
                console.error('Error fetching drivers:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDrivers();
    }, []);
    return (
<form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 space-y-6 max-w-lg mx-auto overflow-y-auto max-h-[90vh]"
    style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f9fafb' }}
>
    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 border-b pb-4">
        <Car className="text-red-500 w-6 h-6" />
        Add New Car
    </h2>

    {/* Car Name */}
    <div className="space-y-2">
        <label className="text-gray-600 font-medium flex items-center gap-2">
            <Car className="w-5 h-5 text-red-500" /> Car Name
        </label>
        <input
            type="text"
            name="name"
            placeholder="Enter car name"
            value={car.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 bg-gray-50"
        />
    </div>

    {/* Car Type */}
    <div className="space-y-2">
        <label className="text-gray-600 font-medium flex items-center gap-2">
            <Tag className="w-5 h-5 text-red-500" /> Car Type
        </label>
        <input
            type="text"
            name="type"
            placeholder="SUV, Sedan, etc."
            value={car.model}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 bg-gray-50"
        />
    </div>

    {/* Price */}
    <div className="space-y-2">
        <label className="text-gray-600 font-medium flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-red-500" /> Price (per day)
        </label>
        <input
            type="text"
            name="price"
            placeholder="e.g., ₹3000"
            value={car.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 bg-gray-50"
        />
    </div>

    {/* Driver Name */}
    <div className="space-y-2">
            <label className="text-gray-600 font-medium flex items-center gap-2">
                <User className="w-5 h-5 text-red-500" /> Driver Name
            </label>
            <Select
                options={driverOptions}
                isLoading={loading}
                placeholder="Select a driver"
                value={driverOptions.find(option => option.value === car.driverName)}
                onChange={selectedOption => setCar({ ...car, driverName: selectedOption.value })}
                className="w-full"
            />
        </div>


    {/* Image Upload or Preview */}
    <div className="space-y-2">
        <label className="text-gray-600 font-medium flex items-center gap-2">
            <Upload className="w-5 h-5 text-red-500" /> Car Image
        </label>
        {car.imagePreview ? (
            <div className="relative group w-full rounded-lg overflow-hidden border border-gray-300 h-48">
                <img
                    src={car.imagePreview}
                    alt="Car Preview"
                    className="w-full h-full object-cover"
                />
                <button
                    type="button"
                    onClick={() => {
                        setCar({ ...car, imageFile: null, imagePreview: '' });
                    }}
                    className="absolute inset-0 bg-black/50 text-white font-medium flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                    Change Image
                </button>
            </div>
        ) : (
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border rounded-lg bg-gray-50 cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-red-500 file:text-white file:rounded-md hover:file:bg-red-600"
            />
        )}
    </div>

    {/* Submit Button */}
    <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
        disabled={loading}
    >
        {loading ? 'Adding...' : 'Add Car'}
    </button>
</form>
    );
};

export default CarForm;
