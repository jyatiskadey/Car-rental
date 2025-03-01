import React, { useState } from "react";
import { ChevronDown, Shield, User } from "lucide-react";

const Navbar = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4">
      <h1 className="text-3xl font-bold text-indigo-700">EliteDrive</h1>
      
      <div className="flex items-center space-x-6">
        <a href="/" className="hover:text-indigo-600 font-medium">Home</a>
        <a href="/elitedrive/cars" className="hover:text-indigo-600 font-medium">Our Cars</a>
        <a href="/contact" className="hover:text-indigo-600 font-medium">Contact</a>

        {/* Login Dropdown */}
        
<div className="relative">
  <button
    onClick={() => setShowLoginOptions(!showLoginOptions)}
    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
  >
    Login
    <ChevronDown
      className={`w-5 h-5 transition-transform duration-300 ${
        showLoginOptions ? "rotate-180" : ""
      }`}
    />
  </button>

  {/* Dropdown Items */}
  <div
    className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden transition-[max-height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
      showLoginOptions ? "max-h-40" : "max-h-0"
    }`}
  >
    
    <a
      href="/citizen-login"
      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
    >
        <User className="w-5 h-5 text-indigo-600" /> Citizen Login
      
      
    </a>
    <a
      href="/admin-login"
      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
    >
      <Shield className="w-5 h-5 text-indigo-600" /> Admin Login
    </a>
  </div>
</div>
      </div>
    </nav>
  );
};

export default Navbar;
