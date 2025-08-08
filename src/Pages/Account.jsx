import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Account = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('contact'); // Default to contact section
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ area: '', street: '', city: '', state: '', zip: '', isDefault: false });
  const [streetSuggestions, setStreetSuggestions] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPayment, setNewPayment] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const uaeAreas = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];
  const streetNames = [
    'Sheikh Zayed Road', 'Al Wasl Road', 'Jumeirah Beach Road', 'Khalifa Street', 'Hamdan Street',
    'Al Maktoum Road', 'Oud Metha Road', 'Al Khaleej Street', 'Corniche Road', 'Electra Street'
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.name || parsedUser.email?.split('@')[0] || '');
      setPhone(parsedUser.phone || '');
      setCompany(parsedUser.company || '');
      setVatNumber(parsedUser.vatNumber || '');
      setAddresses(parsedUser.addresses || []);
      setPaymentMethods(parsedUser.paymentMethods || []);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSaveContactDetails = (e) => {
    e.preventDefault();
    if (user) {
      const updatedUser = { ...user, name, phone, company, vatNumber, addresses, paymentMethods };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      window.dispatchEvent(new Event('userLogin'));
      setSuccessMessage('Contact details saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleStreetInput = (e) => {
    const value = e.target.value;
    setNewAddress({ ...newAddress, street: value });
    if (value.length > 2) {
      const suggestions = streetNames.filter((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setStreetSuggestions(suggestions);
    } else {
      setStreetSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setNewAddress({ ...newAddress, street: suggestion });
    setStreetSuggestions([]);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (newAddress.area && newAddress.street && newAddress.city && newAddress.state && newAddress.zip) {
      const updatedAddresses = newAddress.isDefault
        ? [{ ...newAddress, id: Date.now() }, ...addresses.map((addr) => ({ ...addr, isDefault: false }))]
        : [...addresses, { ...newAddress, id: Date.now() }];
      setAddresses(updatedAddresses);
      setNewAddress({ area: '', street: '', city: '', state: '', zip: '', isDefault: false });
      setStreetSuggestions([]);
      const updatedUser = { ...user, addresses: updatedAddresses };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccessMessage('Address added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDeleteAddress = (id) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== id);
    setAddresses(updatedAddresses);
    const updatedUser = { ...user, addresses: updatedAddresses };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setSuccessMessage('Address deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (newPayment.cardNumber && newPayment.expiry && newPayment.cvv) {
      const updatedPayments = [...paymentMethods, { ...newPayment, id: Date.now() }];
      setPaymentMethods(updatedPayments);
      setNewPayment({ cardNumber: '', expiry: '', cvv: '' });
      const updatedUser = { ...user, paymentMethods: updatedPayments };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccessMessage('Payment method added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDeletePayment = (id) => {
    const updatedPayments = paymentMethods.filter((pm) => pm.id !== id);
    setPaymentMethods(updatedPayments);
    const updatedUser = { ...user, paymentMethods: updatedPayments };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setSuccessMessage('Payment method deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-30 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Manage Your Account</h2>
          {successMessage && (
            <div className="mb-6 p-4 bg-[#008080] text-white rounded-md text-center animate-fade-in">
              {successMessage}
            </div>
          )}
          {!user ? (
            <p className="text-center text-gray-600">Redirecting to login...</p>
          ) : (
            <div className="space-y-8">
              {/* Navigation Buttons */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveSection('contact')}
                    className={`px-5 py-3 rounded-md font-medium transition-colors duration-300 ${
                      activeSection === 'contact'
                        ? 'bg-[#008080] text-white'
                        : 'bg-gray-200 text-gray-900 hover:bg-[#006666] hover:text-white'
                    }`}
                  >
                    Contact Details
                  </button>
                  <button
                    onClick={() => setActiveSection('addresses')}
                    className={`px-5 py-3 rounded-md font-medium transition-colors duration-300 ${
                      activeSection === 'addresses'
                        ? 'bg-[#008080] text-white'
                        : 'bg-gray-200 text-gray-900 hover:bg-[#006666] hover:text-white'
                    }`}
                  >
                    Addresses
                  </button>
                  <button
                    onClick={() => setActiveSection('payments')}
                    className={`px-5 py-3 rounded-md font-medium transition-colors duration-300 ${
                      activeSection === 'payments'
                        ? 'bg-[#008080] text-white'
                        : 'bg-gray-200 text-gray-900 hover:bg-[#006666] hover:text-white'
                    }`}
                  >
                    Payment Methods
                  </button>
                </div>
              </div>

              {/* Contact Details Section */}
              {activeSection === 'contact' && (
                <div className="space-y-8">
                  {/* Individual Details */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-[#008080] mb-4">Individual Details</h3>
                    <p className="text-gray-600 mb-6">Update your personal information below.</p>
                    <form onSubmit={handleSaveContactDetails} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <p className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600">
                          {user.email}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-5 py-2 rounded-md bg-[#F4B400] text-black font-medium hover:bg-[rgb(280,200,0)] transition-colors duration-300"
                      >
                        Save Individual Details
                      </button>
                    </form>
                  </div>

                  {/* Company Details */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-[#008080] mb-4">Company Details</h3>
                    <p className="text-gray-600 mb-6">Provide or update your company information (optional).</p>
                    <form onSubmit={handleSaveContactDetails} className="space-y-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                          placeholder="Enter your company name"
                        />
                      </div>
                      <div>
                        <label htmlFor="vat-number" className="block text-sm font-medium text-gray-700 mb-2">
                          VAT Number
                        </label>
                        <input
                          id="vat-number"
                          type="text"
                          value={vatNumber}
                          onChange={(e) => setVatNumber(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                          placeholder="Enter your VAT number"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-5 py-2 rounded-md bg-[#F4B400] text-black font-medium hover:bg-[rgb(280,200,0)] transition-colors duration-300"
                      >
                        Save Company Details
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Addresses Section */}
              {activeSection === 'addresses' && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-[#008080] mb-4">Your Addresses</h3>
                  <p className="text-gray-600 mb-6">Add or manage your delivery addresses for a seamless laundry experience.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="p-4 border border-gray-200 rounded-md relative">
                        <p className="text-sm font-medium text-gray-900">
                          {addr.street}, {addr.city}, {addr.state} {addr.zip} ({addr.area})
                        </p>
                        {addr.isDefault && (
                          <span className="absolute top-2 right-2 bg-[#008080] text-white text-xs font-semibold px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
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
                        onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      >
                        <option value="">Select an area</option>
                        {uaeAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative">
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        id="street"
                        type="text"
                        value={newAddress.street}
                        onChange={handleStreetInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                        placeholder="Enter street address (e.g., Sheikh Zayed Road)"
                      />
                      {streetSuggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 overflow-auto">
                          {streetSuggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          id="city"
                          type="text"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                          Emirate
                        </label>
                        <input
                          id="state"
                          type="text"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                          placeholder="Enter emirate"
                        />
                      </div>
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          id="zip"
                          type="text"
                          value={newAddress.zip}
                          onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                          placeholder="Enter ZIP code"
                        />
                      </div>
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
                      className="w-full px-5 py-2 rounded-md bg-[#008080] text-white font-medium hover:bg-[#006666] transition-colors duration-300"
                    >
                      Add Address
                    </button>
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
                      <div key={pm.id} className="p-4 border border-gray-200 rounded-md">
                        <p className="text-sm font-medium text-gray-900">Card ending in {pm.cardNumber.slice(-4)}</p>
                        <p className="text-sm text-gray-600">Expires {pm.expiry}</p>
                        <button
                          onClick={() => handleDeletePayment(pm.id)}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
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
                        onChange={(e) => setNewPayment({ ...newPayment, cardNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                        placeholder="1234 5678 9012 3456"
                      />
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
                          onChange={(e) => setNewPayment({ ...newPayment, expiry: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                          placeholder="MM/YY"
                        />
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
                      className="w-full px-5 py-2 rounded-md bg-[#008080] text-white font-medium hover:bg-[#006666] transition-colors duration-300"
                    >
                      Add Payment Method
                    </button>
                  </form>
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