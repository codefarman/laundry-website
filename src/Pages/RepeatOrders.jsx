import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const RepeatOrder = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [pickupTime, setPickupTime] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [newAddress, setNewAddress] = useState({ area: '', street: '', city: '', state: '', zip: '', isDefault: false });
  const [streetSuggestions, setStreetSuggestions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const uaeAreas = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];
  const streetNames = [
    'Sheikh Zayed Road', 'Al Wasl Road', 'Jumeirah Beach Road', 'Khalifa Street', 'Hamdan Street',
    'Al Maktoum Road', 'Oud Metha Road', 'Al Khaleej Street', 'Corniche Road', 'Electra Street'
  ];
  const availableServices = [
    { service: 'Wash & Fold', price: 20 },
    { service: 'Dry Cleaning', price: 15 },
    { service: 'Ironing', price: 10 },
    { service: 'Specialty Cleaning', price: 25 }
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setOrders(parsedUser.orders || []);
      setSelectedAddress(parsedUser.addresses?.find((addr) => addr.isDefault)?.id || '');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleOrderSelect = (e) => {
    const orderId = parseInt(e.target.value);
    const order = orders.find((o) => o.id === orderId);
    setSelectedOrder(order);
    setOrderItems(order ? [...order.items] : []);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...orderItems];
    updatedItems[index].quantity = Math.max(1, parseInt(quantity) || 1);
    setOrderItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedItems);
  };

  const handleAddItem = (e) => {
    const service = availableServices.find((s) => s.service === e.target.value);
    if (service) {
      setOrderItems([...orderItems, { service: service.service, quantity: 1, price: service.price }]);
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
        ? [{ ...newAddress, id: Date.now() }, ...user.addresses.map((addr) => ({ ...addr, isDefault: false }))]
        : [...user.addresses, { ...newAddress, id: Date.now() }];
      const updatedUser = { ...user, addresses: updatedAddresses };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSelectedAddress(newAddress.id || updatedAddresses[0].id);
      setNewAddress({ area: '', street: '', city: '', state: '', zip: '', isDefault: false });
      setStreetSuggestions([]);
      setSuccessMessage('Address added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (orderItems.length === 0 || !pickupTime || !selectedAddress) {
      setSuccessMessage('Please select an order, pickup time, and address.');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }
    const total = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...cart, ...orderItems];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSuccessMessage('Order added to cart! Redirecting to checkout...');
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/checkout');
    }, 2000);
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-30 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Repeat an Order</h2>
          {successMessage && (
            <div className="mb-6 p-4 bg-[#008080] text-white rounded-md text-center animate-fade-in">
              {successMessage}
            </div>
          )}
          {!user ? (
            <p className="text-center text-gray-600">Redirecting to login...</p>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No Previous Orders</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet. Check your order history or book a new service!</p>
              <button
                onClick={() => navigate('/my-orders')}
                className="px-5 py-3 rounded-md bg-[#F4B400] text-black font-medium hover:bg-[rgb(280,200,0)] transition-colors duration-300"
              >
                View Orders
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Order Selection */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#008080] mb-4">Select a Previous Order</h3>
                <select
                  value={selectedOrder?.id || ''}
                  onChange={handleOrderSelect}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                >
                  <option value="">Choose an order</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      Order #{order.id} - {new Date(order.date).toLocaleDateString()} (AED {order.total.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Order Customization */}
              {selectedOrder && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-[#008080] mb-4">Customize Order</h3>
                  <p className="text-gray-600 mb-4">Modify items or add new services for your order.</p>
                  <div className="space-y-4">
                    {orderItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.service}</p>
                          <p className="text-sm text-gray-600">AED {item.price.toFixed(2)} per unit</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                          />
                          <button
                            onClick={() => handleRemoveItem(index)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Add New Service</label>
                      <select
                        onChange={handleAddItem}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      >
                        <option value="">Select a service</option>
                        {availableServices.map((service) => (
                          <option key={service.service} value={service.service}>
                            {service.service} (AED {service.price.toFixed(2)})
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 mt-4">Total: AED {calculateTotal()}</p>
                  </div>
                </div>
              )}

              {/* Pickup Time */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#008080] mb-4">Select Pickup Time</h3>
                <input
                  type="datetime-local"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                />
              </div>

              {/* Address Selection */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#008080] mb-4">Select Delivery Address</h3>
                {user.addresses?.length > 0 ? (
                  <select
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  >
                    <option value="">Choose an address</option>
                    {user.addresses.map((addr) => (
                      <option key={addr.id} value={addr.id}>
                        {addr.street}, {addr.city}, {addr.state} {addr.zip} ({addr.area})
                        {addr.isDefault && ' (Default)'}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-600 mb-4">No addresses saved. Add one below.</p>
                )}
                <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Add New Address</h4>
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

              {/* Confirm Order */}
              {selectedOrder && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-[#008080] mb-4">Confirm Your Order</h3>
                  <form onSubmit={handleConfirmOrder}>
                    <button
                      type="submit"
                      className="w-full px-5 py-3 rounded-md bg-[#F4B400] text-black font-medium hover:bg-[rgb(280,200,0)] transition-colors duration-300"
                    >
                      Confirm and Add to Cart
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

export default RepeatOrder;