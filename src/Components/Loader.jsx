import { useEffect, useState } from "react";

const CarLoader = ({ onLoaded }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            if (onLoaded) onLoaded(); // Trigger when loading is done
        }, 3000); // Minimum 3 seconds

        return () => clearTimeout(timer);
    }, [onLoaded]);

    if (!loading) return null; // Hide loader after 3 seconds

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="relative flex flex-col items-center">
                {/* Road Animation */}
                <div className="relative w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gray-600 w-10 h-full animate-road"></div>
                </div>

                {/* Car Icon Moving on Road */}
                <div className="text-4xl mt-2 animate-car-move">🚗</div>

                {/* Loading Text */}
                <p className="mt-4 text-lg font-semibold text-gray-700 animate-fade-in">
                    Loading... Please wait
                </p>
            </div>

            {/* Tailwind Animations */}
            <style>
                {`
                @keyframes car-move {
                    0% { transform: translateX(-30px); }
                    50% { transform: translateX(30px); }
                    100% { transform: translateX(-30px); }
                }
                @keyframes road {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-car-move { animation: car-move 1s infinite ease-in-out; }
                .animate-road { animation: road 1s infinite linear; }
                .animate-fade-in { animation: fade-in 1s ease-in-out; }
                `}
            </style>
        </div>
    );
};

export default CarLoader;
