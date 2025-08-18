import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar';
import { getUserOrders } from '../Utils/api';
import axios from 'axios'; // Added for fetching order details

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [ws, setWs] = useState(null); // WebSocket state
  const navigate = useNavigate();
  const limit = 10; // Orders per page

  // Initialize WebSocket connection
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');
    setWs(websocket);

    websocket.onopen = () => {
      console.log('WebSocket connected');
    };

    websocket.onmessage = (event) => {
      try {
        const { type, data } = JSON.parse(event.data);
        if (type === 'ORDER_UPDATE') {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === data.orderId ? { ...order, status: data.status } : order
            )
          );
          toast.info(`Order ${data.orderId} status updated to ${data.status}`, {
            position: 'top-right',
            autoClose: 3000,
          });
        } else if (type === 'NEW_ORDER') {
          // Fetch the new order to get full details
          fetchOrders(page, true);
          toast.info(`New order ${data.orderId} placed!`, {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
      setWs(null);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      websocket.close();
    };
  }, [page]); // Re-fetch orders if page changes due to NEW_ORDER

  // Fetch orders
  const fetchOrders = async (pageNum, append = false) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await getUserOrders({ page: pageNum, limit });
      const newOrders = response;
      setOrders((prevOrders) => (append ? [...prevOrders, ...newOrders] : newOrders));
      setHasMore(newOrders.length === limit);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch orders', {
        position: 'top-right',
        autoClose: 5000,
      });
      if (error.message.includes('Authentication')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page, navigate]);

  const handleToggleDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleReorder = async (order) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to reorder', { position: 'top-right', autoClose: 3000 });
        navigate('/login');
        return;
      }

      // Fetch full order details to get branchId
      const response = await axios.get(`http://localhost:5000/api/orders/${order.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fullOrder = response.data;

      // Map order items to cart format
      const reorderedItems = order.items.map((item) => ({
        title: item.service,
        price: `AED ${item.price.toFixed(2)}`,
        calculatedPrice: `AED ${(item.price * item.quantity).toFixed(2)}`,
        quantity: item.quantity,
      }));

      // Update cart in localStorage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = [...cart, ...reorderedItems];
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Get branch details (use fullOrder.branchId or fallback to stored branch)
      const branch =
        fullOrder.branchId || JSON.parse(localStorage.getItem('selectedBranch')) || { name: 'Main Branch' };

      setSuccessMessage('Order added to cart! Redirecting to booking...');
      toast.success('Order added to cart!', { position: 'top-right', autoClose: 2000 });

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/booking', { state: { cart: updatedCart, branch } });
      }, 2000);
    } catch (error) {
      console.error('Error reordering:', error);
      toast.error(error.response?.data?.message || 'Failed to reorder', {
        position: 'top-right',
        autoClose: 5000,
      });
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Processing':
      case 'In Progress':
        return 'bg-blue-500';
      case 'Confirmed':
        return 'bg-teal-500';
      case 'Picked Up':
        return 'bg-purple-500';
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
      <div className="min-h-screen bg-gray-100 pt-24 pb-12 mt-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Your Laundry Orders</h2>
          {successMessage && (
            <div className="mb-6 p-4 bg-[#008080] text-white rounded-md text-center animate-fade-in">
              {successMessage}
            </div>
          )}
          {loading && page === 1 && (
            <div className="mb-6 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#008080]"></div>
            </div>
          )}
          {orders.length === 0 && !loading ? (
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
              {hasMore && !loading && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-5 py-3 rounded-md bg-[#008080] text-white font-medium hover:bg-[#006666] transition-colors duration-300"
                  >
                    Load More
                  </button>
                </div>
              )}
              {loading && page > 1 && (
                <div className="mt-6 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#008080]"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;