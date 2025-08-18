import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar';
import {
  getProfile,
  updateContactDetails,
  addAddress,
  updateAddress,
  deleteAddress,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from '../Utils/api';

const Account = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('contact');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ area: '', street: '', city: '', state: '', zip: '', isDefault: false });
  const [editAddress, setEditAddress] = useState(null);
  const [streetSuggestions, setStreetSuggestions] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPayment, setNewPayment] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [editPayment, setEditPayment] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const wsRef = useRef(null); // Track WebSocket instance
  const navigate = useNavigate();

  const uaeAreas = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];
  const streetNames = [
    'Sheikh Zayed Road', 'Al Wasl Road', 'Jumeirah Beach Road', 'Khalifa Street', 'Hamdan Street',
    'Al Maktoum Road', 'Oud Metha Road', 'Al Khaleej Street', 'Corniche Road', 'Electra Street'
  ];

  // Initialize WebSocket with retry
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;
    const baseRetryDelay = 2000; // 2 seconds

    const connectWebSocket = () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        console.log('WebSocket already connected');
        return;
      }

      const websocket = new WebSocket('ws://localhost:8080');
      wsRef.current = websocket;

      websocket.onopen = () => {
        console.log('WebSocket connected');
        retryCount = 0; // Reset retry count
      };

      websocket.onmessage = (event) => {
        try {
          const { type, data } = JSON.parse(event.data);
          if (type === 'PROFILE_UPDATE') {
            toast.info('Your profile has been updated!', { position: 'top-right', autoClose: 3000 });
          }
        } catch (error) {
          console.error('WebSocket message error:', error);
        }
      };

      websocket.onclose = () => {
        console.log('WebSocket disconnected');
        if (retryCount < maxRetries) {
          retryCount++;
          const delay = baseRetryDelay * Math.pow(2, retryCount); // Exponential backoff
          console.log(`Retrying WebSocket connection (${retryCount}/${maxRetries}) in ${delay}ms...`);
          setTimeout(connectWebSocket, delay);
        }
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    // Delay initial connection to ensure server is ready
    const timer = setTimeout(connectWebSocket, 1000);

    return () => {
      clearTimeout(timer);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const userData = await getProfile();
        setUser(userData);
        setName(userData.name || '');
        setPhone(userData.phone || '');
        setCompany(userData.company || '');
        setVatNumber(userData.vatNumber || '');
        setAddresses(userData.addresses || []);
        setPaymentMethods(userData.paymentMethods || []);
      } catch (error) {
        toast.error(error.message, { position: 'top-right', autoClose: 5000 });
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const validateContactDetails = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (phone && !/^\+971\d{9}$/.test(phone)) newErrors.phone = 'Phone must be a valid UAE number (+971)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAddress = (address) => {
    const newErrors = {};
    if (!address.area) newErrors.area = 'Area is required';
    if (!address.street) newErrors.street = 'Street is required';
    if (!address.city) newErrors.city = 'City is required';
    if (!address.state) newErrors.state = 'Emirate is required';
    if (!address.zip || !/^\d{5}$/.test(address.zip)) newErrors.zip = 'ZIP code must be 5 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (payment) => {
    const newErrors = {};
    if (!payment.cardNumber || !/^\d{16}$/.test(payment.cardNumber)) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!payment.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry)) newErrors.expiry = 'Expiry must be MM/YY';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value, setState, validator) => {
    setState(value);
    validator();
  };

  const handleSaveContactDetails = async (e) => {
    e.preventDefault();
    if (!validateContactDetails()) return;
    setLoading(true);
    try {
      const updatedUser = await updateContactDetails({ name, phone, company, vatNumber });
      setUser(updatedUser);
      toast.success('Your contact details have been updated successfully!', { position: 'top-right', autoClose: 3000 });
      setErrors({});
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'PROFILE_UPDATE', data: { userId: updatedUser._id } }));
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-right', autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleStreetInput = (e, address, setAddress) => {
    const value = e.target.value;
    setAddress({ ...address, street: value });
    if (value.length > 2) {
      const suggestions = streetNames.filter((name) => name.toLowerCase().includes(value.toLowerCase()));
      setStreetSuggestions(suggestions);
    } else {
      setStreetSuggestions([]);
    }
    validateAddress(address);
  };

  const handleSuggestionClick = (suggestion, address, setAddress) => {
    setAddress({ ...address, street: suggestion });
    setStreetSuggestions([]);
    validateAddress({ ...address, street: suggestion });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!validateAddress(newAddress)) return;
    setLoading(true);
    try {
      const updatedAddresses = await addAddress(newAddress);
      setAddresses(updatedAddresses);
      setNewAddress({ area: '', street: '', city: '', state: '', zip: '', isDefault: false });
      setStreetSuggestions([]);
      toast.success('Address added successfully!', { position: 'top-right', autoClose: 3000 });
      setErrors({});
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'PROFILE_UPDATE', data: { userId: user._id } }));
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-right', autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleEditAddress = (address) => {
    setEditAddress(address);
    setNewAddress(address);
    setActiveSection('edit-address');
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    if (!validateAddress(newAddress)) return;
    setLoading(true);
    try {
      const updatedAddresses = await updateAddress(editAddress._id, newAddress);
      setAddresses(updatedAddresses);
      setNewAddress({ area: '', street: '', city: '', state: '', zip: '', isDefault: false });
      setEditAddress(null);
      setActiveSection('addresses');
      toast.success('Address updated successfully!', { position: 'top-right', autoClose: 3000 });
      setErrors({});
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'PROFILE_UPDATE', data: { userId: user._id } }));
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-right', autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    setLoading(true);
    try {
      const updatedAddresses = await deleteAddress(addressId);
      setAddresses(updatedAddresses);
      toast.success('Address deleted successfully!', { position: 'top-right', autoClose: 3000 });
      setShowDeleteModal(null);
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'PROFILE_UPDATE', data: { userId: user._id } }));
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-right', autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    if (!validatePayment(newPayment)) return;
    setLoading(true);
    try {
      const updatedPayments = await addPaymentMethod(newPayment);
      setPaymentMethods(updatedPayments);
      setNewPayment({ cardNumber: '', expiry: '', cvv: '' });
      toast.success('Payment method added successfully!', { position: 'top-right', autoClose: 3000 });
      setErrors({});
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'PROFILE_UPDATE', data: { userId: user._id } }));
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-right', autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleEditPayment = (payment) => {
    setEditPayment(payment);
    setNewPayment({ cardNumber: '', expiry: payment.expiry, cvv: '' });
    setActiveSection('edit-payment');
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    if (!validatePayment(newPayment)) return;
    setLoading(true);
    try {
      const updatedPayments = await updatePaymentMethod(editPayment._id, newPayment);
      setPaymentMethods(updatedPayments);
      setNewPayment({ cardNumber: '', expiry: '', cvv: '' });
      setEditPayment(null);
      setActiveSection('payments');
      toast.success('Payment method updated successfully!', { position: 'top-right', autoClose: 3000 });
      setErrors({});
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'PROFILE_UPDATE', data: { userId: user._id } }));
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-right', autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    setLoading(true);
    try {
      const updatedPayments = await deletePaymentMethod(paymentId);
      setPaymentMethods(updatedPayments);
      toast.success('Payment method deleted successfully!', { position: 'top-right', autoClose: 3000 });
      setShowDeleteModal(null);
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'PROFILE_UPDATE', data: { userId: user._id } }));
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-right', autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  // Debug log moved after function declarations to avoid TDZ
  console.log('Account component initialized. handleSaveContactDetails defined:', !!handleSaveContactDetails);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-24 mt-12 pb-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Manage Your Account</h2>
          {loading && (
            <div className="mb-6 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#008080]"></div>
            </div>
          )}
          {!user && !loading ? (
            <p className="text-center text-gray-600">Redirecting to login...</p>
          ) : (
            <div className="space-y-8">
              {/* Navigation Buttons */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['contact', 'addresses', 'payments'].map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`px-5 py-3 rounded-md font-medium transition-colors duration-300 ${
                        activeSection === section
                          ? 'bg-[#008080] text-white'
                          : 'bg-gray-200 text-gray-900 hover:bg-[#006666] hover:text-white'
                      }`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Details Section */}
              {activeSection === 'contact' && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-[#008080] mb-4">Contact Details</h3>
                  <p className="text-gray-600 mb-6">Update your personal or company information.</p>
                  <form onSubmit={handleSaveContactDetails} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => handleInputChange('name', e.target.value, setName, validateContactDetails)}
                        className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                        placeholder="Enter your name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => handleInputChange('phone', e.target.value, setPhone, validateContactDetails)}
                        className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                        placeholder="+971123456789"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        VAT Number (Optional)
                      </label>
                      <input
                        id="vatNumber"
                        type="text"
                        value={vatNumber}
                        onChange={(e) => setVatNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                        placeholder="Enter VAT number"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-5 py-2 rounded-md bg-[#008080] text-white font-medium hover:bg-[#006666] transition-colors duration-300 disabled:bg-gray-400"
                    >
                      Save Contact Details
                    </button>
                  </form>
                </div>
              )}

              {/* Addresses Section */}
              {activeSection === 'addresses' && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-[#008080] mb-4">Your Addresses</h3>
                  <p className="text-gray-600 mb-6">Manage your delivery addresses for quick bookings.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {addresses.map((addr) => (
                      <div key={addr._id} className="p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow">
                        <p className="text-sm font-medium text-gray-900">{addr.street}, {addr.area}</p>
                        <p className="text-sm text-gray-600">{addr.city}, {addr.state} {addr.zip}</p>
                        {addr.isDefault && <p className="text-sm text-[#008080] font-semibold">Default</p>}
                        <div className="mt-2 flex space-x-2">
                          <button
                            onClick={() => handleEditAddress(addr)}
                            disabled={loading}
                            className="text-sm text-[#008080] hover:text-[#006666] disabled:text-gray-400"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setShowDeleteModal({ type: 'address', id: addr._id })}
                            disabled={loading}
                            className="text-sm text-red-600 hover:text-red-800 disabled:text-gray-400"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Add New Address</h4>
                  <form onSubmit={handleAddAddress} className="space-y-4">
                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                        Area
                      </label>
                      <select
                        id="area"
                        value={newAddress.area}
                        onChange={(e) => handleInputChange('area', e.target.value, (val) => setNewAddress({ ...newAddress, area: val }), () => validateAddress(newAddress))}
                        className={`w-full px-3 py-2 border ${errors.area ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                      >
                        <option value="">Select an area</option>
                        {uaeAreas.map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                      {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                    </div>
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                        Street
                      </label>
                      <input
                        id="street"
                        type="text"
                        value={newAddress.street}
                        onChange={(e) => handleStreetInput(e, newAddress, setNewAddress)}
                        className={`w-full px-3 py-2 border ${errors.street ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                        placeholder="Enter street name"
                      />
                      {streetSuggestions.length > 0 && (
                        <ul className="mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-auto">
                          {streetSuggestions.map((suggestion) => (
                            <li
                              key={suggestion}
                              onClick={() => handleSuggestionClick(suggestion, newAddress, setNewAddress)}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                      {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          id="city"
                          type="text"
                          value={newAddress.city}
                          onChange={(e) => handleInputChange('city', e.target.value, (val) => setNewAddress({ ...newAddress, city: val }), () => validateAddress(newAddress))}
                          className={`w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                          placeholder="Enter city"
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                          Emirate
                        </label>
                        <input
                          id="state"
                          type="text"
                          value={newAddress.state}
                          onChange={(e) => handleInputChange('state', e.target.value, (val) => setNewAddress({ ...newAddress, state: val }), () => validateAddress(newAddress))}
                          className={`w-full px-3 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                          placeholder="Enter emirate"
                        />
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        id="zip"
                        type="text"
                        value={newAddress.zip}
                        onChange={(e) => handleInputChange('zip', e.target.value, (val) => setNewAddress({ ...newAddress, zip: val }), () => validateAddress(newAddress))}
                        className={`w-full px-3 py-2 border ${errors.zip ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                        placeholder="Enter ZIP code"
                      />
                      {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                    </div>
                    <div className="flex items-center">
                      <input
                        id="default-address"
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        className="h-4 w-4 text-[#008080] focus:ring-[#008080] border-gray-300 rounded"
                      />
                      <label htmlFor="default-address" className="ml-2 text-sm text-gray-600">
                        Set as default address
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-5 py-2 rounded-md bg-[#008080] text-white font-medium hover:bg-[#006666] transition-colors duration-300 disabled:bg-gray-400"
                    >
                      Add Address
                    </button>
                  </form>
                </div>
              )}

              {/* Edit Address Section */}
              {activeSection === 'edit-address' && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-[#008080] mb-4">Edit Address</h3>
                  <p className="text-gray-600 mb-6">Update your address details.</p>
                  <form onSubmit={handleUpdateAddress} className="space-y-4">
                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                        Area
                      </label>
                      <select
                        id="area"
                        value={newAddress.area}
                        onChange={(e) => handleInputChange('area', e.target.value, (val) => setNewAddress({ ...newAddress, area: val }), () => validateAddress(newAddress))}
                        className={`w-full px-3 py-2 border ${errors.area ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                      >
                        <option value="">Select an area</option>
                        {uaeAreas.map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                      {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                    </div>
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                        Street
                      </label>
                      <input
                        id="street"
                        type="text"
                        value={newAddress.street}
                        onChange={(e) => handleStreetInput(e, newAddress, setNewAddress)}
                        className={`w-full px-3 py-2 border ${errors.street ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                        placeholder="Enter street name"
                      />
                      {streetSuggestions.length > 0 && (
                        <ul className="mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-auto">
                          {streetSuggestions.map((suggestion) => (
                            <li
                              key={suggestion}
                              onClick={() => handleSuggestionClick(suggestion, newAddress, setNewAddress)}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                      {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          id="city"
                          type="text"
                          value={newAddress.city}
                          onChange={(e) => handleInputChange('city', e.target.value, (val) => setNewAddress({ ...newAddress, city: val }), () => validateAddress(newAddress))}
                          className={`w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                          placeholder="Enter city"
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                          Emirate
                        </label>
                        <input
                          id="state"
                          type="text"
                          value={newAddress.state}
                          onChange={(e) => handleInputChange('state', e.target.value, (val) => setNewAddress({ ...newAddress, state: val }), () => validateAddress(newAddress))}
                          className={`w-full px-3 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                          placeholder="Enter emirate"
                        />
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        id="zip"
                        type="text"
                        value={newAddress.zip}
                        onChange={(e) => handleInputChange('zip', e.target.value, (val) => setNewAddress({ ...newAddress, zip: val }), () => validateAddress(newAddress))}
                        className={`w-full px-3 py-2 border ${errors.zip ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                        placeholder="Enter ZIP code"
                      />
                      {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                    </div>
                    <div className="flex items-center">
                      <input
                        id="default-address"
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        className="h-4 w-4 text-[#008080] focus:ring-[#008080] border-gray-300 rounded"
                      />
                      <label htmlFor="default-address" className="ml-2 text-sm text-gray-600">
                        Set as default address
                      </label>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-5 py-2 rounded-md bg-[#008080] text-white font-medium hover:bg-[#006666] transition-colors duration-300 disabled:bg-gray-400"
                      >
                        Update Address
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewAddress({ area: '', street: '', city: '', state: '', zip: '', isDefault: false });
                          setEditAddress(null);
                          setActiveSection('addresses');
                        }}
                        className="w-full px-5 py-2 rounded-md bg-gray-200 text-gray-900 font-medium hover:bg-gray-300 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Payment Methods Section */}
              {activeSection === 'payments' && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-[#008080] mb-4">Your Payment Methods</h3>
                  <p className="text-gray-600 mb-6">Securely add or manage your payment methods for quick bookings.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {paymentMethods.map((pm) => (
                      <div key={pm._id} className="p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow">
                        <p className="text-sm font-medium text-gray-900">Card ending in {pm.cardNumber}</p>
                        <p className="text-sm text-gray-600">Expires {pm.expiry}</p>
                        <div className="mt-2 flex space-x-2">
                          <button
                            onClick={() => handleEditPayment(pm)}
                            disabled={loading}
                            className="text-sm text-[#008080] hover:text-[#006666] disabled:text-gray-400"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setShowDeleteModal({ type: 'payment', id: pm._id })}
                            disabled={loading}
                            className="text-sm text-red-600 hover:text-red-800 disabled:text-gray-400"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Add New Payment Method</h4>
                  <form onSubmit={handleAddPayment} className="space-y-4">
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        id="card-number"
                        type="text"
                        value={newPayment.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value, (val) => setNewPayment({ ...newPayment, cardNumber: val }), () => validatePayment(newPayment))}
                        className={`w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          id="expiry"
                          type="text"
                          value={newPayment.expiry}
                          onChange={(e) => handleInputChange('expiry', e.target.value, (val) => setNewPayment({ ...newPayment, expiry: val }), () => validatePayment(newPayment))}
                          className={`w-full px-3 py-2 border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                          placeholder="MM/YY"
                        />
                        {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          id="cvv"
                          type="text"
                          value={newPayment.cvv}
                          onChange={(e) => setNewPayment({ ...newPayment, cvv: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-5 py-2 rounded-md bg-[#008080] text-white font-medium hover:bg-[#006666] transition-colors duration-300 disabled:bg-gray-400"
                    >
                      Add Payment Method
                    </button>
                  </form>
                </div>
              )}

              {/* Edit Payment Section */}
              {activeSection === 'edit-payment' && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-[#008080] mb-4">Edit Payment Method</h3>
                  <p className="text-gray-600 mb-6">Update your payment method details.</p>
                  <form onSubmit={handleUpdatePayment} className="space-y-4">
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        id="card-number"
                        type="text"
                        value={newPayment.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value, (val) => setNewPayment({ ...newPayment, cardNumber: val }), () => validatePayment(newPayment))}
                        className={`w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          id="expiry"
                          type="text"
                          value={newPayment.expiry}
                          onChange={(e) => handleInputChange('expiry', e.target.value, (val) => setNewPayment({ ...newPayment, expiry: val }), () => validatePayment(newPayment))}
                          className={`w-full px-3 py-2 border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]`}
                          placeholder="MM/YY"
                        />
                        {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          id="cvv"
                          type="text"
                          value={newPayment.cvv}
                          onChange={(e) => setNewPayment({ ...newPayment, cvv: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-5 py-2 rounded-md bg-[#008080] text-white font-medium hover:bg-[#006666] transition-colors duration-300 disabled:bg-gray-400"
                      >
                        Update Payment Method
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewPayment({ cardNumber: '', expiry: '', cvv: '' });
                          setEditPayment(null);
                          setActiveSection('payments');
                        }}
                        className="w-full px-5 py-2 rounded-md bg-gray-200 text-gray-900 font-medium hover:bg-gray-300 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Delete Confirmation Modal */}
              {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Deletion</h3>
                    <p className="text-gray-600 mb-6">
                      Are you sure you want to delete this {showDeleteModal.type === 'address' ? 'address' : 'payment method'}?
                    </p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          if (showDeleteModal.type === 'address') {
                            handleDeleteAddress(showDeleteModal.id);
                          } else {
                            handleDeletePayment(showDeleteModal.id);
                          }
                        }}
                        className="w-full px-5 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-300"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(null)}
                        className="w-full px-5 py-2 rounded-md bg-gray-200 text-gray-900 font-medium hover:bg-gray-300 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;