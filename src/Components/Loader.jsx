const CarLoader = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="relative flex flex-col items-center">
                {/* Spinning Wheel */}
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>

                {/* Car Icon */}
                <div className="mt-4 text-xl font-semibold text-gray-700 flex items-center gap-2">
                    <span className="animate-bounce">🚗</span>
                    <span>Loading... Please wait</span>
                </div>
            </div>
        </div>
    );
};

export default CarLoader;
