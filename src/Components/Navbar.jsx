import React, { useState } from "react";
import { ChevronDown, Menu, X, User, Shield } from "lucide-react";

function Navbar() {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <a href="/" className="text-3xl font-bold text-indigo-700">
            <img src="/images/logo.png" alt="Logo" className="h-14 w-auto" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href={localStorage.getItem("token") ? "/citizen/dashboard" : "/"}
              className="hover:text-indigo-600 font-medium"
            >
              Home
            </a>
            <a href="/elitedrive/cars" className="hover:text-indigo-600 font-medium">
              Our Cars
            </a>
            <a href="/contact" className="hover:text-indigo-600 font-medium">
              Contact
            </a>

            {/* Login Dropdown */}
            <div className="relative">
              {!localStorage.getItem("token") && (
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
              )}

              {/* Dropdown Items */}
              {showLoginOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
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
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-indigo-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <a
              href={localStorage.getItem("token") ? "/citizen/dashboard" : "/"}
              className="text-gray-800 hover:text-indigo-600"
            >
              Home
            </a>
            <a href="/elitedrive/cars" className="text-gray-800 hover:text-indigo-600">
              Our Cars
            </a>
            <a href="/contact" className="text-gray-800 hover:text-indigo-600">
              Contact
            </a>

            {/* Mobile Login Dropdown */}
            {!localStorage.getItem("token") && (
              <div className="border-t pt-4">
                <p className="text-gray-600 font-semibold">Login Options:</p>
                <a
                  href="/citizen-login"
                  className="flex items-center gap-2 mt-2 text-gray-800 hover:text-indigo-600"
                >
                  <User className="w-5 h-5 text-indigo-600" /> Citizen Login
                </a>
                <a
                  href="/admin-login"
                  className="flex items-center gap-2 mt-2 text-gray-800 hover:text-indigo-600"
                >
                  <Shield className="w-5 h-5 text-indigo-600" /> Admin Login
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
