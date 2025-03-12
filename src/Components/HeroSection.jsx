import React from "react";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-12 bg-[#0A1931] min-h-[90vh] text-white mt-12">
      {/* Left Side - Text Content */}
      <div className="max-w-xl text-left">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          RENT A CAR <br /> FOR TRAVEL
        </h1>
        <p className="text-2xl text-orange-500 mt-4 font-bold">
          PRICE START AT <span className="text-white">₹1299 ONLY</span>
        </p>
        <p className="text-gray-300 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="relative flex flex-col items-center mt-8 md:mt-0">
        <img
          src="/images/car.png"
          alt="Car Rental"
          className="w-[400px] md:w-[500px] h-auto object-contain"
        />
        {/* <div className="absolute top-4 left-4 bg-white p-2 rounded-md shadow-lg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Qrcode_wikipedia_fr_v2clean.png"
            alt="QR Code"
            className="w-16 h-16"
          />
          <p className="text-xs text-gray-900 font-semibold text-center mt-1">SCAN ME!</p>
        </div> */}
      </div>
    </div>
  );
}

export default HeroSection;
