import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import { createBooking, getProfile } from '../Utils/api.js';
import Navbar from '../Components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

// Bind modal to app element for accessibility
Modal.setAppElement('#root');

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState('');
  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedSavedAddress, setSelectedSavedAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [countryCode, setCountryCode] = useState('+971');
  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([]);
  const [selectedSavedPayment, setSelectedSavedPayment] = useState('');
  const [newCardDetails, setNewCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [selectedBranch, setSelectedBranch] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialNotificationSent, setInitialNotificationSent] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart || [];
  const branch = location.state?.branch || { name: 'Main Branch' };
  const wsRef = useRef(null);
  const wsRetryCount = useRef(0);
  const maxRetries = 5;
  const baseRetryDelay = 2000; // 2 seconds

  const branches = [
    { id: '68a37f074e73a73a48ae52fc', name: 'Main Branch - Musaffah Shabiya' },
    { id: '68a37f074e73a73a48ae52fd', name: 'Branch 2 - Near Emirates National School' },
    { id: '68a37f074e73a73a48ae52fe', name: 'Branch 3 - Near Baniyas Court' },
  ];

  const countryCodes = [
    { code: '+971', country: 'UAE' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
  ];

  useEffect(() => {
    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const userData = await getProfile();
        console.log('Profile data fetched:', userData);
        setSavedAddresses(userData.addresses || []);
        setSavedPaymentMethods(userData.paymentMethods || []);
        // Auto-fill default address
        const defaultAddress = userData.addresses?.find((addr) => addr.isDefault);
        if (defaultAddress) {
          setSelectedSavedAddress(defaultAddress._id);
          setAddress(`${defaultAddress.street}, ${defaultAddress.area}, ${defaultAddress.city}, ${defaultAddress.state}, ${defaultAddress.zip}`);
          setUseSavedAddress(true);
        } else if (userData.addresses?.length > 0) {
          setSelectedSavedAddress(userData.addresses[0]._id);
          setAddress(`${userData.addresses[0].street}, ${userData.addresses[0].area}, ${userData.addresses[0].city}, ${userData.addresses[0].state}, ${userData.addresses[0].zip}`);
          setUseSavedAddress(true);
        } else {
          setUseSavedAddress(false);
        }
        // Auto-select first saved payment method
        if (userData.paymentMethods?.length > 0) {
          setSelectedSavedPayment(userData.paymentMethods[0]._id);
          setPaymentMethod('saved-card');
        } else {
          setPaymentMethod('cash-on-delivery');
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Unable to load saved addresses or payment methods. Please enter manually.', {
          position: 'top-right',
          autoClose: 3000,
        });
        setUseSavedAddress(false);
        setPaymentMethod('cash-on-delivery');
      }
    };

    fetchProfile();

    if (branches.length > 0) {
      setSelectedBranch(branches[0].id);
    }

    // WebSocket with retry and exponential backoff
    const connectWebSocket = () => {
      if (wsRetryCount.current >= maxRetries) {
        toast.error('Unable to connect to real-time updates.', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }
      try {
        wsRef.current = new WebSocket('ws://localhost:8080');
        wsRef.current.onopen = () => {
          console.log('WebSocket connected');
          wsRetryCount.current = 0;
        };
        wsRef.current.onmessage = (event) => {
          try {
            const { type, data } = JSON.parse(event.data);
            if (type === 'ORDER_UPDATE' && initialNotificationSent && data.status !== 'in progress') {
              toast.info(`Order ${data.orderId} status updated to ${data.status}`, {
                position: 'top-right',
                autoClose: 3000,
              });
            }
          } catch (error) {
            console.error('WebSocket message parsing error:', error);
          }
        };
        wsRef.current.onclose = () => {
          console.log('WebSocket disconnected, attempting to reconnect...');
          wsRetryCount.current += 1;
          const delay = baseRetryDelay * Math.pow(2, wsRetryCount.current);
          console.log(`Retrying WebSocket in ${delay}ms (attempt ${wsRetryCount.current}/${maxRetries})`);
          setTimeout(connectWebSocket, delay);
        };
        wsRef.current.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
      } catch (error) {
        console.error('WebSocket connection failed:', error);
        wsRetryCount.current += 1;
        const delay = baseRetryDelay * Math.pow(2, wsRetryCount.current);
        console.log(`Retrying WebSocket in ${delay}ms (attempt ${wsRetryCount.current}/${maxRetries})`);
        setTimeout(connectWebSocket, delay);
      }
    };
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  const validateInputs = () => {
    const newErrors = {};
    if (!contact.name.trim()) newErrors.name = 'Name is required';
    if (countryCode === '+971' && !contact.phone.match(/^(50|52|54|55|57|58|59|71|77|78)\d{7}$/)) {
      newErrors.phone = 'UAE numbers must be 9 digits starting with 50, 52, 54, 55, 57, 58, 59, 71, 77, or 78';
    } else if (!contact.phone.match(/^\d{7,12}$/)) {
      newErrors.phone = 'Phone number must be 7-12 digits';
    }
    if (!contact.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Invalid email address';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (useSavedAddress && !selectedSavedAddress && savedAddresses.length > 0) newErrors.address = 'Please select a saved address';
    if (paymentMethod === 'credit-card') {
      if (!newCardDetails.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = 'Card number must be 16 digits';
      if (!newCardDetails.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) newErrors.expiry = 'Expiry must be MM/YY';
      if (!newCardDetails.cvv.match(/^\d{3}$/)) newErrors.cvv = 'CVV must be 3 digits';
    }
    if (paymentMethod === 'saved-card' && !selectedSavedPayment && savedPaymentMethods.length > 0) {
      newErrors.payment = 'Please select a saved payment method';
    }
    if (!selectedBranch) newErrors.branch = 'Please select a branch';
    if (cart.length === 0) {
      newErrors.cart = 'Please select at least one service';
    } else {
      cart.forEach((item, index) => {
        if (!item.title || typeof item.title !== 'string') {
          newErrors[`service${index}`] = `Service at index ${index} is missing a valid title`;
        }
        if (!item.price || typeof item.price !== 'string' || !item.price.startsWith('AED ')) {
          newErrors[`service${index}`] = `Service at index ${index} is missing a valid price (e.g., "AED 50.00")`;
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    navigate('/booking', { state: { cart: updatedCart, branch } });
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (value.length > 2) {
      const dummySuggestions = [
        'Burj Al Arab, Jumeirah 1, Dubai',
        'Dubai Mall, Downtown Dubai',
        'Palm Jumeirah, Dubai',
        'JBR The Walk, Jumeirah Beach Residence',
      ].filter((s) => s.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(dummySuggestions);

      if (value.toLowerCase().includes('musaffah')) {
        setSelectedBranch(branches.find((b) => b.name.includes('Musaffah Shabiya'))?.id || branches[0].id);
      } else if (value.toLowerCase().includes('emirates national')) {
        setSelectedBranch(branches.find((b) => b.name.includes('Emirates National'))?.id || branches[0].id);
      } else if (value.toLowerCase().includes('baniyas')) {
        setSelectedBranch(branches.find((b) => b.name.includes('Baniyas Court'))?.id || branches[0].id);
      } else {
        setSelectedBranch(branches[0].id);
      }
    } else {
      setSuggestions([]);
      setSelectedBranch(branches[0].id);
    }
  };

  const handleServiceSelect = (service) => {
    navigate('/prices', { state: { service } });
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      toast.error('Please fill in all required fields correctly.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setIsModalOpen(false);
      return;
    }
    setIsLoading(true);
    setIsSubmitDisabled(true);
    const bookingData = {
      address: address,
      services: cart.map(({ title, price }) => ({ title, price: price.replace('AED ', '') })),
      contact: { ...contact, phone: contact.phone ? `${countryCode}${contact.phone}` : '' },
      paymentMethod: paymentMethod === 'saved-card' ? 'card' : paymentMethod === 'cash-on-delivery' ? 'cod' : paymentMethod === 'online-payment' ? 'paypal' : 'card',
      paymentDetails: paymentMethod === 'saved-card' ? { paymentId: selectedSavedPayment } : paymentMethod === 'credit-card' ? { ...newCardDetails, cardNumber: newCardDetails.cardNumber.slice(-4) } : null,
      total: cart.reduce((sum, item) => sum + parseFloat(item.price.replace('AED ', '')), 0).toFixed(2),
      branchId: selectedBranch,
    };
    console.log('Submitting bookingData:', bookingData);

    try {
      const data = await createBooking(bookingData);
      setInitialNotificationSent(true);
      toast.dismiss();
      toast.success(`Your order is in progress. We'll reach out soon! Order ID: ${data.order?._id || 'N/A'}`, {
        position: 'top-right',
        autoClose: 4000,
        onClose: () => setTimeout(() => navigate('/'), 2000),
      });
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Booking submission failed:', error);
      if (error.message.includes('401')) {
        console.log('401 Unauthorized: Redirecting to login');
        toast.error('Session expired. Please log in again.', {
          position: 'top-right',
          autoClose: 3000,
          onClose: () => {
            localStorage.removeItem('token');
            navigate('/login');
          },
        });
      } else {
        toast.error(error.message || 'Failed to create booking. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } finally {
      setIsLoading(false);
      setIsSubmitDisabled(false);
      setIsModalOpen(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && cart.length === 0) {
      toast.error('Please select at least one service before proceeding.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    if (currentStep === 2 && !validateInputs()) {
      toast.error('Please fill in all required fields correctly.', {
        position: 'top-right',
        autoClose: 3000,
      });
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#1E293B] text-center mb-6"
        >
          Schedule Your Laundry Pickup
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-[#64748B] text-center mb-10"
        >
          Hassle-free laundry service at your fingertips—book now!
        </motion.p>

        {/* Progress Bar */}
        <div className="relative mb-8">
          <div className="absolute top-9 w-full h-1 bg-gray-200 rounded-full">
            <motion.div
              className="h-1 mb-2 bg-[#008080] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 text-center">
                <div
                  className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${
                    currentStep >= step ? 'bg-[#008080] text-white' : 'bg-gray-300 text-gray-600'
                  }`}
                  aria-current={currentStep === step ? 'step' : undefined}
                >
                  {step}
                </div>
                <p className="text-xs mt-2 capitalize">
                  {step === 1 ? 'Services' : step === 2 ? 'Details' : 'Payment'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6"
          >
            <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Cart Summary</h3>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-[#008080]/10">
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
            <p className="text-sm font-semibold text-[#1E293B] mt-2">
              Total: AED {cart.reduce((sum, item) => sum + parseFloat(item.price.replace('AED ', '')), 0).toFixed(2)}
            </p>
          </motion.div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-semibold text-[#1E293B] mb-4">Step 1: Choose Your Services</h2>
              <p className="text-[#64748B] mb-6">Select the services that suit your needs—premium care for your clothes!</p>
              {cart.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {['Wash & Fold', 'Clean & Iron', 'Ironing', 'Duvets & Bulky', 'Dry Cleaning'].map((service) => (
                    <motion.div
                      key={service}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white rounded-lg shadow-md p-6 border border-[#008080]/10 hover:shadow-lg cursor-pointer transition-all"
                      onClick={() => handleServiceSelect(service)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleServiceSelect(service)}
                      aria-label={`Select ${service} service`}
                    >
                      <div className="bg-[#008080] rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
                        <i
                          className={`fas fa-${
                            service === 'Wash & Fold'
                              ? 'shirt'
                              : service === 'Clean & Iron'
                              ? 'ironing'
                              : service === 'Ironing'
                              ? 'steam-iron'
                              : service === 'Duvets & Bulky'
                              ? 'bed'
                              : 'dry-cleaning'
                          } text-2xl`}
                          aria-hidden="true"
                        ></i>
                        <span className="sr-only">{service}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1E293B]">{service}</h3>
                      <p className="text-sm text-[#64748B]">
                        {service === 'Wash & Fold'
                          ? 'Fresh and clean daily essentials.'
                          : service === 'Clean & Iron'
                          ? 'Crisp and ready-to-wear clothes.'
                          : service === 'Ironing'
                          ? 'Perfectly pressed for a polished look.'
                          : service === 'Duvets & Bulky'
                          ? 'Special care for large items.'
                          : 'Dry cleaning for your clothes, Duvets & Bulky, and shoes'}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[#64748B]">
                    Services selected. Proceed to the next step or add more services.
                  </p>
                  <motion.button
                    className="bg-[#008080] text-white py-2 px-6 rounded-lg hover:bg-[#008080]/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/prices')}
                    aria-label="Add more services"
                  >
                    Add More Services
                  </motion.button>
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
              <h2 className="text-2xl font-semibold text-[#1E293B] mb-4">Step 2: Enter Your Details</h2>
              <p className="text-[#64748B] mb-6">Provide your contact and address details for pickup.</p>
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Branch</label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className={`w-full p-3 border ${
                    errors.branch ? 'border-red-500' : 'border-[#008080]/20'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition`}
                  aria-label="Select branch"
                >
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
                {errors.branch && (
                  <p className="text-red-500 text-xs mt-1">{errors.branch}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Address</label>
                {savedAddresses.length > 0 && (
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      checked={useSavedAddress}
                      onChange={() => {
                        setUseSavedAddress(!useSavedAddress);
                        if (useSavedAddress) {
                          setAddress('');
                          setSelectedSavedAddress('');
                        }
                      }}
                      className="h-4 w-4 text-[#008080] focus:ring-[#008080] border-gray-300 rounded"
                      aria-label="Use saved address"
                    />
                    <span className="ml-2 text-sm text-[#1E293B]">Use saved address</span>
                  </div>
                )}
                {useSavedAddress && savedAddresses.length > 0 ? (
                  <select
                    value={selectedSavedAddress}
                    onChange={(e) => {
                      setSelectedSavedAddress(e.target.value);
                      const selected = savedAddresses.find((addr) => addr._id === e.target.value);
                      setAddress(selected ? `${selected.street}, ${selected.area}, ${selected.city}, ${selected.state}, ${selected.zip}` : '');
                    }}
                    className={`w-full p-3 border ${
                      errors.address ? 'border-red-500' : 'border-[#008080]/20'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition`}
                    aria-label="Select saved address"
                  >
                    <option value="">Select a saved address</option>
                    {savedAddresses.map((addr) => (
                      <option key={addr._id} value={addr._id}>
                        {addr.street}, {addr.area}, {addr.city}, {addr.state}, {addr.zip} {addr.isDefault ? '(Default)' : ''}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    <input
                      type="text"
                      value={address}
                      onChange={handleAddressChange}
                      placeholder="Enter pickup address"
                      className={`w-full p-3 border ${
                        errors.address ? 'border-red-500' : 'border-[#008080]/20'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition`}
                      aria-describedby={errors.address ? 'address-error' : undefined}
                    />
                    {suggestions.length > 0 && (
                      <ul className="bg-white border border-[#008080]/20 rounded-lg mt-2 shadow-md max-h-40 overflow-auto">
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="p-2 hover:bg-[#008080]/10 cursor-pointer"
                            onClick={() => {
                              setAddress(suggestion);
                              setSuggestions([]);
                            }}
                            role="option"
                            aria-selected={address === suggestion}
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
                {errors.address && (
                  <p id="address-error" className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Contact</label>
                <input
                  id="name"
                  type="text"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder="Full Name"
                  className={`w-full p-3 mb-3 border ${
                    errors.name ? 'border-red-500' : 'border-[#008080]/20'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition`}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
                <div className="flex gap-3 mb-3">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className={`w-1/3 p-3 border ${
                      errors.phone ? 'border-red-500' : 'border-[#008080]/20'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition`}
                    aria-label="Select country code"
                  >
                    {countryCodes.map(({ code, country }) => (
                      <option key={code} value={code}>
                        {code} ({country})
                      </option>
                    ))}
                  </select>
                  <input
                    id="phone"
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    placeholder="Phone Number"
                    className={`w-2/3 p-3 border ${
                      errors.phone ? 'border-red-500' : 'border-[#008080]/20'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition`}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                </div>
                {errors.phone && (
                  <p id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
                <input
                  id="email"
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="Email Address"
                  className={`w-full p-3 border ${
                    errors.email ? 'border-red-500' : 'border-[#008080]/20'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition`}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
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
              <h2 className="text-2xl font-semibold text-[#1E293B] mb-4">Step 3: Payment Method</h2>
              <p className="text-[#64748B] mb-6">Choose how you'd like to pay for your laundry service.</p>
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-[#008080]/20 rounded-lg hover:bg-[#008080]/10 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash-on-delivery"
                    checked={paymentMethod === 'cash-on-delivery'}
                    onChange={() => setPaymentMethod('cash-on-delivery')}
                    className="h-4 w-4 text-[#008080] focus:ring-[#008080] border-gray-300"
                    aria-label="Cash on Delivery"
                  />
                  <span className="ml-3 text-[#1E293B] font-medium">Cash on Delivery</span>
                </label>
                {savedPaymentMethods.length > 0 && (
                  <label className="flex flex-col p-4 border border-[#008080]/20 rounded-lg hover:bg-[#008080]/10 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="saved-card"
                        checked={paymentMethod === 'saved-card'}
                        onChange={() => setPaymentMethod('saved-card')}
                        className="h-4 w-4 text-[#008080] focus:ring-[#008080] border-gray-300"
                        aria-label="Saved Card"
                      />
                      <span className="ml-3 text-[#1E293B] font-medium">Saved Card</span>
                    </div>
                    {paymentMethod === 'saved-card' && (
                      <select
                        value={selectedSavedPayment}
                        onChange={(e) => setSelectedSavedPayment(e.target.value)}
                        className={`w-full mt-3 p-3 border ${
                          errors.payment ? 'border-red-500' : 'border-[#008080]/20'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition`}
                        aria-label="Select saved payment method"
                      >
                        <option value="">Select a saved card</option>
                        {savedPaymentMethods.map((pm) => (
                          <option key={pm._id} value={pm._id}>
                            Card ending in {pm.cardNumber} (Expires {pm.expiry})
                          </option>
                        ))}
                      </select>
                    )}
                    {errors.payment && (
                      <p className="text-red-500 text-xs mt-1">{errors.payment}</p>
                    )}
                  </label>
                )}
                <label className="flex flex-col p-4 border border-[#008080]/20 rounded-lg hover:bg-[#008080]/10 transition-colors">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={() => setPaymentMethod('credit-card')}
                      className="h-4 w-4 text-[#008080] focus:ring-[#008080] border-gray-300"
                      aria-label="Credit Card"
                    />
                    <span className="ml-3 text-[#1E293B] font-medium">Credit Card</span>
                  </div>
                  {paymentMethod === 'credit-card' && (
                    <div className="mt-3 space-y-3">
                      <input
                        type="text"
                        value={newCardDetails.cardNumber}
                        onChange={(e) => setNewCardDetails({ ...newCardDetails, cardNumber: e.target.value })}
                        placeholder="Card Number"
                        className={`w-full p-3 border ${
                          errors.cardNumber ? 'border-red-500' : 'border-[#008080]/20'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition`}
                        aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
                      />
                      {errors.cardNumber && (
                        <p id="cardNumber-error" className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                      )}
                      <div className="flex gap-3">
                        <div className="w-1/2">
                          <input
                            type="text"
                            value={newCardDetails.expiry}
                            onChange={(e) => setNewCardDetails({ ...newCardDetails, expiry: e.target.value })}
                            placeholder="MM/YY"
                            className={`w-full p-3 border ${
                              errors.expiry ? 'border-red-500' : 'border-[#008080]/20'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition`}
                            aria-describedby={errors.expiry ? 'expiry-error' : undefined}
                          />
                          {errors.expiry && (
                            <p id="expiry-error" className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                          )}
                        </div>
                        <div className="w-1/2">
                          <input
                            type="text"
                            value={newCardDetails.cvv}
                            onChange={(e) => setNewCardDetails({ ...newCardDetails, cvv: e.target.value })}
                            placeholder="CVV"
                            className={`w-full p-3 border ${
                              errors.cvv ? 'border-red-500' : 'border-[#008080]/20'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] transition`}
                            aria-describedby={errors.cvv ? 'cvv-error' : undefined}
                          />
                          {errors.cvv && (
                            <p id="cvv-error" className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </label>
                <label className="flex items-center p-4 border border-[#008080]/20 rounded-lg hover:bg-[#008080]/10 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online-payment"
                    checked={paymentMethod === 'online-payment'}
                    onChange={() => setPaymentMethod('online-payment')}
                    className="h-4 w-4 text-[#008080] focus:ring-[#008080] border-gray-300"
                    aria-label="Pay with PayPal"
                  />
                  <span className="ml-3 text-[#1E293B] font-medium">Pay with PayPal</span>
                  <img src="/images/PayPal.png" alt="PayPal Logo" className="ml-auto w-20 h-auto" />
                </label>
                <p className="text-sm font-semibold text-[#1E293B] mt-4">
                  Total: AED {cart.reduce((sum, item) => sum + parseFloat(item.price.replace('AED ', '')), 0).toFixed(2)}
                </p>
                <p className="text-sm text-[#64748B] mt-2">Assigned Branch: {branch.name}</p>
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

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <motion.button
                className="bg-gray-300 text-[#1E293B] py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                aria-label="Go to previous step"
              >
                Back
              </motion.button>
            )}
            {currentStep < 3 ? (
              <motion.button
                className="ml-auto bg-[#008080] text-white py-2 px-6 rounded-lg hover:bg-[#008080]/90 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                disabled={isLoading}
                aria-label="Go to next step"
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                className="ml-auto bg-[#F4B400] text-[#1E293B] py-2 px-6 rounded-lg hover:bg-[#F4B400]/90 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={cart.length === 0 || isLoading || isSubmitDisabled}
                onClick={() => setIsModalOpen(true)}
                aria-label="Confirm booking"
              >
                {isLoading ? 'Processing...' : 'Confirm Booking'}
              </motion.button>
            )}
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="bg-white p-6 rounded-lg max-w-md mx-auto mt-20 shadow-lg outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          aria={{
            labelledby: 'confirm-modal-title',
            describedby: 'confirm-modal-description',
          }}
        >
          <h2 id="confirm-modal-title" className="text-xl font-semibold text-[#1E293B] mb-4">
            Confirm Your Booking
          </h2>
          <p id="confirm-modal-description" className="text-[#64748B] mb-6">
            Are you sure you want to proceed? Total: AED{' '}
            {cart.reduce((sum, item) => sum + parseFloat(item.price.replace('AED ', '')), 0).toFixed(2)}
          </p>
          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-300 text-[#1E293B] py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              onClick={() => setIsModalOpen(false)}
              aria-label="Cancel booking"
            >
              Cancel
            </button>
            <button
              className="bg-[#F4B400] text-[#1E293B] py-2 px-4 rounded-lg hover:bg-[#F4B400]/90 transition-colors disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isLoading || isSubmitDisabled}
              aria-label="Confirm booking"
            >
              {isLoading ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BookingPage;