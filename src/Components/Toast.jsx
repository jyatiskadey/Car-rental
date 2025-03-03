import { toast } from 'react-toastify';

export const toastHandler = (response) => {
    if (response?.data?.message === "Booking successful!") {
        toast.success('Booking successful!', { position: 'top-right' });
    } else {
        toast.error(response?.data?.message || 'Something went wrong!', { position: 'top-right' });
    }
};
