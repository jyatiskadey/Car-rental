import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

const carImages = [
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be', // Front view of luxury car
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8fDB8fHww', // Black luxury SUV
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf', // Road trip SUV
    'https://images.unsplash.com/photo-1502877338535-766e1452684a', // Sports car on street
    'https://images.unsplash.com/photo-1459603677915-a62079ffd002?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FyfGVufDB8fDB8fHww'  // Modern car interior
];


function HeroSection() {
    return (
        <div className="relative h-[90vh] text-white">
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 5000 }}
                loop
                className="h-full"
            >
                {carImages.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div 
                            className="h-[90vh] bg-cover bg-center flex items-center justify-center"
                            style={{ backgroundImage: `url(${url})` }}
                        >
                            <div className="absolute inset-0 bg-black/50"></div>
                            <div className="relative z-10 text-center">
                                <h1 className="text-5xl font-bold mb-4">Drive Your Dream Car Today</h1>
                                <p className="text-xl mb-6">Luxury, Comfort, and Affordable Rentals</p>
                                <a href="#search"
                                   className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg">
                                    Find Your Car
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default HeroSection;
