import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const MyOrders = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setOrders(parsedUser.orders || []);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleToggleDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleReorder = (order) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...cart, ...order.items];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSuccessMessage('Order added to cart! Redirecting to checkout...');
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/checkout');
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'Completed':
        return 'bg-green-500';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-30 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Your Laundry Orders</h2>
          {successMessage && (
            <div className="mb-6 p-4 bg-[#008080] text-white rounded-md text-center animate-fade-in">
              {successMessage}
            </div>
          )}
          {!user ? (
            <p className="text-center text-gray-600">Redirecting to login...</p>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No Orders Yet</h3>
              <p className="text-gray-600 mb-6">It looks like you haven't placed any orders. Start your laundry journey now!</p>
              <button
                onClick={() => navigate('/booking')}
                className="px-5 py-3 rounded-md bg-[#F4B400] text-black font-medium hover:bg-[rgb(280,200,0)] transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <button
                        onClick={() => handleToggleDetails(order.id)}
                        className="text-sm text-[#008080] hover:text-[#006666]"
                      >
                        {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Total: AED {order.total.toFixed(2)}</p>
                  {expandedOrder === order.id && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-2">Order Details</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm text-gray-600">
                            <span>
                              {item.quantity}x {item.service}
                            </span>
                            <span>AED {(item.quantity * item.price).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleReorder(order)}
                        className="mt-4 px-5 py-2 rounded-md bg-[#008080] text-white font-medium hover:bg-[#006666] transition-colors duration-300"
                      >
                        Reorder
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;