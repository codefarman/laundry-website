import React from 'react';
import { CheckCircle, MessageSquareText, Truck, RefreshCcw } from 'lucide-react';

const OrderControl = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-28">
        {/* Left image with badge */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-[400px] md:max-w-none">
          <img 
            src="/images/Relaxedman.jpg" 
            alt="User relaxing at home using mobile app"
            className="rounded-2xl w-full h-auto object-cover"
          />
          <div className="absolute bottom-6 right-6 bg-white shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
            <CheckCircle className="text-teal-600" size={28} />
            <span className="text-sm font-medium text-gray-800">
              Order Confirmed
            </span>
          </div>
        </div>

        {/* Right text content */}
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-6 tracking-tight">
            Full control at your fingertips.
          </h2>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <MessageSquareText className="text-teal-600" size={24} />
              </div>
              <p className="text-base font-medium text-gray-800">
                Get real-time updates on your orders.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <Truck className="text-teal-600" size={24} />
              </div>
              <p className="text-base font-medium text-gray-800">
                Track your delivery on the go.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <RefreshCcw className="text-teal-600" size={24} />
              </div>
              <p className="text-base font-medium text-gray-800">
                Reschedule deliveries in just a tap.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderControl;
