import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pickupTime, setPickupTime] = useState('');
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart || [];

  // Function to remove item from cart
  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    navigate('/booking', { state: { cart: updatedCart } });
  };

  // Sample Dubai address suggestions (replace with API in production)
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (value.length > 2) {
      const dummySuggestions = [
        'Burj Al Arab, Jumeirah 1, Dubai',
        'Dubai Mall, Downtown Dubai',
        'Palm Jumeirah, Dubai',
        'JBR The Walk, Jumeirah Beach Residence',
      ].filter(s => s.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(dummySuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleServiceSelect = (service) => {
    navigate('/prices', { state: { service } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      address,
      pickupTime,
      services: cart.map(item => item.title),
      contact,
      paymentMethod,
      total: cart.reduce((sum, item) => sum + parseFloat(item.price.replace('AED ', '')), 0).toFixed(2),
    };

    try {
      const response = await fetch('http://localhost:3000/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      alert('Booking successful! ' + JSON.stringify(data));
      navigate('/');
    } catch (error) {
      alert('Error submitting booking: ' + error.message);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && cart.length === 0) {
      alert('Please select at least one service before proceeding.');
      return;
    }
    if (currentStep === 2 && (!address || !pickupTime || !contact.name || !contact.phone || !contact.email)) {
      alert('Please fill in all pickup details before proceeding.');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0F2F7] font-sans pt-24">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#1E293B] text-center mb-6"
        >
          Schedule Your Laundry Pickup Today!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-[#64748B] text-center mb-10"
        >
          Take the first step towards a cleaner, fresher life—schedule your pickup now and enjoy hassle-free laundry service!
        </motion.p>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex-1 text-center">
              <div
                className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${
                  currentStep >= step ? 'bg-[#008080] text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step}
              </div>
              <p className="text-xs mt-2 capitalize">{step === 1 ? 'Services' : step === 2 ? 'Pickup Details' : 'Payment'}</p>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-semibold text-[#1E293B] mb-4">Step 1: Choose Your Services</h2>
              <p className="text-[#64748B] mb-6">Select the services that suit your needs and let us handle the rest—your clothes deserve the best care!</p>
              {cart.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white rounded-lg shadow-md p-6 border border-[#008080]/10 hover:shadow-lg cursor-pointer transition-all"
                    onClick={() => handleServiceSelect('Wash & Fold')}
                  >
                    <div className="bg-[#008080] rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
                      <i className="fas fa-shirt text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-[#1E293B]">Wash & Fold</h3>
                    <p className="text-sm text-[#64748B]">Fresh and clean daily essentials.</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white rounded-lg shadow-md p-6 border border-[#008080]/10 hover:shadow-lg cursor-pointer transition-all"
                    onClick={() => handleServiceSelect('Clean & Iron')}
                  >
                    <div className="bg-[#008080] rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
                      <i className="fas fa-ironing text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-[#1E293B]">Clean & Iron</h3>
                    <p className="text-sm text-[#64748B]">Perfect for pressed garments.</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white rounded-lg shadow-md p-6 border border-[#008080]/10 hover:shadow-lg cursor-pointer transition-all"
                    onClick={() => handleServiceSelect('Ironing')}
                  >
                    <div className="bg-[#008080] rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
                      <i className="fas fa-steam-iron text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-[#1E293B]">Ironing</h3>
                    <p className="text-sm text-[#64748B]">Crisp and neat finishes.</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white rounded-lg shadow-md p-6 border border-[#008080]/10 hover:shadow-lg cursor-pointer transition-all"
                    onClick={() => handleServiceSelect('Duvets & Bulky')}
                  >
                    <div className="bg-[#008080] rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
                      <i className="fas fa-bed text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-[#1E293B]">Duvets & Bulky</h3>
                    <p className="text-sm text-[#64748B]">Care for larger items.</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white rounded-lg shadow-md p-6 border border-[#008080]/10 hover:shadow-lg cursor-pointer transition-all"
                    onClick={() => handleServiceSelect('Sneaker Care')}
                  >
                    <div className="bg-[#008080] rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
                      <i className="fas fa-sneaker text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-[#1E293B]">Sneaker Care</h3>
                    <p className="text-sm text-[#64748B]">Expert footwear cleaning.</p>
                  </motion.div>
                </div>
              ) : (
                <div>
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-[#008080]/10">
                      <span className="text-[#1E293B]">{item.title}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[#64748B]">{item.price}</span>
                        <motion.button
                          className="w-6 h-6 text-[#64748B] hover:text-[#1E293B] transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveItem(index)}
                          aria-label={`Remove ${item.title}`}
                        >
                          &times;
                        </motion.button>
                      </div>
                    </div>
                  ))}
                  <p className="text-sm text-[#64748B] mt-4">Total: AED {cart.reduce((sum, item) => sum + parseFloat(item.price.replace('AED ', '')), 0).toFixed(2)}</p>
                </div>
              )}
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-semibold text-[#1E293B] mb-4">Step 2: Provide Pickup Details</h2>
              <p className="text-[#64748B] mb-6">Enter your details securely—your information is protected with top-tier encryption for your peace of mind!</p>
              {/* Address Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="Enter building or apartment name in Dubai"
                  className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition"
                  required
                />
                {suggestions.length > 0 && (
                  <ul className="mt-2 border border-[#008080]/20 rounded-lg bg-white">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-[#F1F5F9] cursor-pointer transition"
                        onClick={() => {
                          setAddress(suggestion);
                          setSuggestions([]);
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  className="w-full mt-3 bg-[#008080] text-white py-2 rounded-lg hover:bg-[#008080]/90 transition-colors"
                  onClick={() => alert('Map selection placeholder - Integrate Google Maps API here')}
                >
                  Select on Map
                </button>
                <p className="text-xs text-[#64748B] mt-2">We use secure geolocation to ensure accurate pickups—your privacy is our priority.</p>
              </div>
              {/* Pickup Time */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Pickup Time</label>
                <input
                  type="datetime-local"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition"
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
                <p className="text-xs text-[#64748B] mt-2">Choose a time that suits you—we’ll confirm your slot securely.</p>
              </div>
              {/* Contact Information */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Contact</label>
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full p-3 mb-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition"
                  required
                />
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="Phone Number"
                  className="w-full p-3 mb-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition"
                  required
                />
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="Email Address"
                  className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition"
                  required
                />
                <p className="text-xs text-[#64748B] mt-2">Your data is encrypted and never shared—trust us with your details.</p>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-semibold text-[#1E293B] mb-4">Step 3: Complete Your Payment</h2>
              <p className="text-[#64748B] mb-6">Your payment is 100% secure with SSL encryption—rest easy knowing your transaction is safe!</p>
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Payment Method</label>
                <div className="space-y-4">
                  <label className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition shadow-sm">
                    <input
                      type="radio"
                      value="cash-on-delivery"
                      checked={paymentMethod === 'cash-on-delivery'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-4 w-5 h-5 text-[#008080] focus:ring-[#008080]"
                      required
                    />
                    <span className="text-sm text-[#1E293B]">Cash on Delivery</span>
                    <span className="ml-auto text-xs text-[#64748B]">Pay safely when we deliver.</span>
                  </label>
                  <label className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition shadow-sm">
                    <input
                      type="radio"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-4 w-5 h-5 text-[#008080] focus:ring-[#008080]"
                    />
                    <span className="text-sm text-[#1E293B]">Credit Card</span>
                    {paymentMethod === 'credit-card' && (
                      <div className="ml-6 mt-2 space-y-3 w-full">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition"
                          required
                        />
                        <div className="flex gap-3">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-1/2 p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition"
                            required
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="w-1/2 p-3 border border-[#008080]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition"
                            required
                          />
                        </div>
                      </div>
                    )}
                    <img src="/images/payment.jpg" alt="Payment Logos" className="ml-auto w-20 h-auto" />
                  </label>
                  <label className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition shadow-sm">
                    <input
                      type="radio"
                      value="online-payment"
                      checked={paymentMethod === 'online-payment'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-4 w-5 h-5 text-[#008080] focus:ring-[#008080]"
                    />
                    <span className="text-sm text-[#1E293B]">Online Payment (via PayPal)</span>
                    {paymentMethod === 'online-payment' && (
                      <div className="ml-6 mt-2 w-full">
                        <button
                          type="button"
                          className="w-full bg-[#0070BA] text-white py-2 rounded-lg hover:bg-[#005EA6] transition-colors"
                          onClick={() => alert('Redirect to PayPal payment gateway')}
                        >
                          Pay with PayPal
                        </button>
                      </div>
                    )}
                    <img src="/images/PayPal.png" alt="PayPal Logo" className="ml-auto w-20 h-auto" />
                  </label>
                </div>
                <p className="text-sm text-[#64748B] mt-4">Total: AED {cart.reduce((sum, item) => sum + parseFloat(item.price.replace('AED ', '')), 0).toFixed(2)}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-[#64748B]">Secured by SSL & 256-bit Encryption</span>
                  <div className="flex space-x-2">
                    {/* <img src="https://via.placeholder.com/30x20?text=SSL" alt="SSL Badge" className="w-8 h-5" />
                    <img src="https://via.placeholder.com/30x20?text=PCI" alt="PCI Badge" className="w-8 h-5" /> */}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <motion.button
                className="bg-gray-300 text-[#1E293B] py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
              >
                Back
              </motion.button>
            )}
            {currentStep < 3 ? (
              <motion.button
                className="ml-auto bg-[#008080] text-white py-2 px-6 rounded-lg hover:bg-[#008080]/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                className="ml-auto bg-[#F4B400] text-[#1E293B] py-2 px-6 rounded-lg hover:bg-[#F4B400]/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={cart.length === 0}
              >
                Confirm Booking
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;