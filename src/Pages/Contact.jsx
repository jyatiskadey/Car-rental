import React from 'react';

function Contact() {
    return (
        <div className="p-6 md:p-12 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-8">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Contact Us</h2>
            <p className="text-center text-gray-600 mb-6">
                Have questions? Need assistance? Feel free to contact us anytime.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <span className="text-indigo-600 text-xl">📍</span>
                        <p>123 EliteDrive Street, Luxury City, EL 45678</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-indigo-600 text-xl">📞</span>
                        <p>+1 800-123-4567</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-indigo-600 text-xl">✉️</span>
                        <p>support@elitedrive.com</p>
                    </div>
                </div>

                {/* Contact Form */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Message</label>
                        <textarea
                            rows="4"
                            placeholder="Type your message..."
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
