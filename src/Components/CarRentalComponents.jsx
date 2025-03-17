import { useState } from "react";
import { motion } from "framer-motion";
import { FaCar, FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
// import carImage from "./assets/car.jpg";
// import serviceImage from "./assets/service.jpg";
// import faqImage from "./assets/faq.jpg";

export default function LandingSections() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    { question: "How do I rent a car?", answer: "Simply select a car, choose your rental period, and confirm your booking." },
    { question: "What documents are required?", answer: "You need a valid driver’s license and a credit card for payment." },
    { question: "Is there a cancellation policy?", answer: "Yes, free cancellation is available up to 24 hours before pickup." },
  ];

  return (
    <div className="space-y-12 p-6">
      {/* How It Works */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8"
      >
        <img src="https://img.freepik.com/free-vector/car-rental-concept-illustration_114360-9267.jpg?uid=R179397616&ga=GA1.1.404267234.1741410602&semt=ais_authors_boohttps://img.freepik.com/premium-vector/problem-solving-consultation-concept-flat-illustration_720185-3975.jpg?uid=R179397616&ga=GA1.1.404267234.1741410602&semt=ais_authors_boost" alt="How It Works" className="w-full md:w-1/2 rounded-lg shadow-md" />
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <FaCar className="text-blue-500 mr-2" /> How It Works
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>✔ Choose your car from our extensive fleet.</li>
            <li>✔ Select rental dates and confirm your booking.</li>
            <li>✔ Pick up your car and enjoy your journey.</li>
          </ul>
        </div>
      </motion.section>

      {/* Why Choose Us? */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gray-100 shadow-lg rounded-2xl p-8 flex flex-col md:flex-row-reverse items-center gap-8"
      >
        <img src="https://img.freepik.com/free-vector/tiny-people-sitting-standing-near-giant-faq_74855-7879.jpg?uid=R179397616&ga=GA1.1.404267234.1741410602&semt=ais_authors_boost" alt="Why Choose Us" className="w-full md:w-1/2 rounded-lg shadow-md" />
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" /> Why Choose Us?
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>🚗 Wide range of luxury and budget-friendly cars.</li>
            <li>⚡ Fast & hassle-free booking process.</li>
            <li>🛠 24/7 customer support for a smooth experience.</li>
          </ul>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FaQuestionCircle className="text-yellow-500 mr-2" /> Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                className="w-full p-4 text-left flex justify-between items-center bg-gray-100 hover:bg-gray-200"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                {item.question}
                <span>{openFAQ === index ? "-" : "+"}</span>
              </button>
              {openFAQ === index && (
                <div className="p-4 bg-white text-gray-600">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}