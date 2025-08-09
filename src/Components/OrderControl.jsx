import React from 'react';
import { CheckCircle, MessageSquareText, Truck, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrderControl = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
        {/* Left image with badge */}
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-lg max-w-[400px] sm:max-w-[350px] md:max-w-[400px] w-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/images/Relaxedman.jpg" 
            alt="User relaxing at home using mobile app"
            className="rounded-2xl w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <motion.div
            className="absolute bottom-4 right-4 bg-white shadow-lg rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-teal-50 transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            aria-label="Order status badge"
          >
            <CheckCircle className="text-teal-600" size={24} />
            <span className="text-sm font-semibold text-gray-800">
              Order Confirmed
            </span>
          </motion.div>
        </motion.div>

        {/* Right text content */}
        <motion.div
          className="max-w-xl text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Full Control at Your Fingertips
          </h2>
          <ul className="space-y-6">
            <motion.li 
              className="flex items-start gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <MessageSquareText className="text-teal-600" size={20} sm:size={24} />
              </div>
              <p className="text-base sm:text-lg font-medium text-gray-800">
                Get real-time updates on your orders with instant notifications.
              </p>
            </motion.li>
            <motion.li 
              className="flex items-start gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <Truck className="text-teal-600" size={20} sm:size={24} />
              </div>
              <p className="text-base sm:text-lg font-medium text-gray-800">
                Track your delivery status live, anytime, anywhere.
              </p>
            </motion.li>
            <motion.li 
              className="flex items-start gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <RefreshCcw className="text-teal-600" size={20} sm:size={24} />
              </div>
              <p className="text-base sm:text-lg font-medium text-gray-800">
                Reschedule deliveries with a single tap, hassle-free.
              </p>
            </motion.li>
          </ul>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link
              to="/booking"
              className="inline-block bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-200"
              aria-label="Get started with booking"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderControl;