import React, { useState, useEffect, useRef } from 'react';
import { Link, Route, Routes, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../Utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newNotifications, setNewNotifications] = useState({ orders: 0, feedback: 0 });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      try {
        const { type, data } = JSON.parse(event.data);
        if (type === 'NEW_ORDER') {
          setNewNotifications((prev) => ({ ...prev, orders: prev.orders + 1 }));
        } else if (type === 'NEW_FEEDBACK') {
          setNewNotifications((prev) => ({ ...prev, feedback: prev.feedback + 1 }));
        }
      } catch (error) {
        console.error('WebSocket message parsing error:', error);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="fixed top-0 left-0 w-64 h-screen bg-gradient-to-b from-teal-700 to-teal-900 text-white p-6 shadow-xl z-20 font-sans"
    >
      <h2 className="text-3xl font-extrabold mb-8 tracking-tight">Towers Laundry</h2>
      <nav>
        {[
          { path: '/admin', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
          { path: '/admin/orders', label: 'Orders', icon: 'fas fa-shopping-cart', badge: newNotifications.orders },
          { path: '/admin/customers', label: 'Customers', icon: 'fas fa-users' },
          { path: '/admin/feedback', label: 'Feedback', icon: 'fas fa-comments', badge: newNotifications.feedback },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 mb-2 rounded-lg transition-all duration-300 ${
              location.pathname === item.path
                ? 'bg-white text-teal-700 font-semibold shadow-md'
                : 'hover:bg-teal-800 hover:text-white'
            }`}
            onClick={() => {
              if (item.path === '/admin/orders') setNewNotifications((prev) => ({ ...prev, orders: 0 }));
              if (item.path === '/admin/feedback') setNewNotifications((prev) => ({ ...prev, feedback: 0 }));
            }}
          >
            <i className={`${item.icon} mr-3 text-lg`} aria-hidden="true"></i>
            <span className="text-sm font-medium">{item.label}</span>
            {item.badge > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};

const StatsCard = ({ title, value, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300"
  >
    <i className={`${icon} text-3xl text-teal-600`} aria-hidden="true"></i>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-teal-600">{value}</p>
    </div>
  </motion.div>
);

const SkeletonTable = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-4 text-left text-gray-700">ID</th>
          <th className="p-4 text-left text-gray-700">Customer</th>
          <th className="p-4 text-left text-gray-700">Details</th>
          <th className="p-4 text-left text-gray-700">Status</th>
          <th className="p-4 text-left text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={i} className="border-b">
            <td className="p-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
            <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
            <td className="p-4"><div className="h-4 bg-gray-200 rounded w-2/3"></div></td>
            <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
            <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Feedback = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const queryClient = useQueryClient();
  const feedbackPerPage = 10;

  const { data: feedbackData, isLoading, error } = useQuery({
    queryKey: ['feedback', page, statusFilter],
    queryFn: () => api.get('/feedback', { params: { page, limit: feedbackPerPage, status: statusFilter } }).then((res) => res.data || { feedback: [], total: 0 }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ feedbackId, status }) => api.patch(`/feedback/${feedbackId}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(['feedback']);
      toast.success('Feedback status updated', { position: 'top-right' });
    },
    onError: (err) => toast.error(`Failed to update feedback status: ${err.message}`, { position: 'top-right' }),
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded-lg w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
      {isLoading ? (
        <SkeletonTable />
      ) : error ? (
        <p className="text-red-500">Error loading feedback: {error.message}</p>
      ) : !feedbackData?.feedback?.length ? (
        <p className="text-gray-500">No feedback found.</p>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-gray-700">ID</th>
                  <th className="p-4 text-left text-gray-700">Customer</th>
                  <th className="p-4 text-left text-gray-700">Message</th>
                  <th className="p-4 text-left text-gray-700">Status</th>
                  <th className="p-4 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.feedback.map((feedback) => (
                  <tr key={feedback._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">{feedback._id}</td>
                    <td className="p-4">{feedback.name} ({feedback.email})</td>
                    <td className="p-4">{feedback.message.substring(0, 100)}...</td>
                    <td className="p-4">
                      <select
                        value={feedback.status}
                        onChange={(e) => updateStatusMutation.mutate({ feedbackId: feedback._id, status: e.target.value })}
                        className="border p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                      >
                        <option value="Open">Open</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <Link to={`/admin/feedback/${feedback._id}`} className="text-teal-600 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 hover:bg-teal-700 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-700">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={feedbackData.feedback.length < feedbackPerPage}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 hover:bg-teal-700 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const FeedbackDetail = () => {
  const { feedbackId } = useParams();
  const navigate = useNavigate();

  const { data: feedback, isLoading, error } = useQuery({
    queryKey: ['feedback', feedbackId],
    queryFn: () => api.get(`/feedback/${feedbackId}`).then((res) => res.data || {}),
  });

  if (isLoading) return <p className="text-gray-500">Loading feedback...</p>;
  if (error) return <p className="text-red-500">Error loading feedback: {error.message}</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8 bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback Details: {feedback._id || 'N/A'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Customer</h3>
          <p>Name: {feedback.name || 'Unknown'}</p>
          <p>Email: {feedback.email || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">Feedback Info</h3>
          <p>Category: {feedback.category || 'N/A'}</p>
          <p>Message: {feedback.message || 'N/A'}</p>
          <p>Status: {feedback.status || 'N/A'}</p>
          <p>Created: {feedback.createdAt ? new Date(feedback.createdAt).toLocaleString() : 'N/A'}</p>
          <p>Updated: {feedback.updatedAt ? new Date(feedback.updatedAt).toLocaleString() : 'N/A'}</p>
        </div>
      </div>
      <button
        onClick={() => navigate('/admin/feedback')}
        className="mt-4 text-teal-600 hover:underline"
      >
        Back to Feedback
      </button>
    </motion.div>
  );
};

const NewOrderPopup = ({ order, onClose }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 bg-white p-6 rounded-xl shadow-xl max-w-sm z-50"
    >
      <h3 className="text-lg font-semibold text-gray-800">New Order Received!</h3>
      <p className="text-gray-600 mt-2">
        Order ID: {order._id}<br />
        Branch: {order.branchId?.name || 'Unknown'}<br />
        Customer: {order.contact?.name || 'Unknown'}<br />
        Total: AED {order.total || 0}
      </p>
      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="text-teal-600 hover:underline"
        >
          Dismiss
        </button>
        <button
          onClick={() => {
            onClose();
            navigate(`/admin/orders/${order._id}`);
          }}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          View Order
        </button>
      </div>
    </motion.div>
  );
};

const BranchOrders = ({ orders, searchQuery }) => {
  const [isOpen, setIsOpen] = useState(true);
  const filteredOrders = searchQuery
    ? orders.filter(
        (order) =>
          order.contact?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order._id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : orders;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-teal-50 p-4 rounded-lg shadow-md hover:bg-teal-100 transition-colors"
      >
        <h3 className="text-xl font-semibold text-gray-800">Orders</h3>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-teal-600`} aria-hidden="true"></i>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {!Array.isArray(filteredOrders) || filteredOrders.length === 0 ? (
              <p className="text-gray-500 p-4">No orders found.</p>
            ) : (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-2">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left text-gray-700">Order ID</th>
                      <th className="p-4 text-left text-gray-700">Customer</th>
                      <th className="p-4 text-left text-gray-700">Services</th>
                      <th className="p-4 text-left text-gray-700">Total</th>
                      <th className="p-4 text-left text-gray-700">Status</th>
                      <th className="p-4 text-left text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr key={order._id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                        <td className="p-4">{order._id}</td>
                        <td className="p-4">{order.contact?.name || 'Unknown'}</td>
                        <td className="p-4">{order.services?.map((s) => s.title).join(', ') || 'None'}</td>
                        <td className="p-4">AED {order.total || 0}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                              order.status === 'Pending'
                                ? 'bg-yellow-500'
                                : order.status === 'Confirmed'
                                ? 'bg-blue-500'
                                : order.status === 'In Progress'
                                ? 'bg-indigo-500'
                                : order.status === 'Completed'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }`}
                          >
                            {order.status || 'N/A'}
                          </span>
                        </td>
                        <td className="p-4">
                          <Link to={`/admin/orders/${order._id}`} className="text-teal-600 hover:underline">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Dashboard = () => {
  const queryClient = useQueryClient();
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.get('/stats').then((res) => res.data || {}),
  });

  const { data: branches, isLoading: branchesLoading, error: branchesError } = useQuery({
    queryKey: ['branches'],
    queryFn: () => api.get('/branches').then((res) => res.data || []),
  });

  const { data: orders, isLoading: ordersLoading, error: ordersError } = useQuery({
    queryKey: ['recentOrders'],
    queryFn: () => api.get('/orders/recent').then((res) => res.data || []),
  });

  const chartData = {
    labels: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'],
    datasets: [
      {
        data: [
          stats?.pending || 0,
          stats?.confirmed || 0,
          stats?.inProgress || 0,
          stats?.completed || 0,
          stats?.cancelled || 0,
        ],
        backgroundColor: ['#f59e0b', '#3b82f6', '#6366f1', '#10b981', '#ef4444'],
        hoverOffset: 20,
      },
    ],
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Orders per Month',
        data: [65, 59, 80, 81, 56, 55, 40, stats?.todayOrders || 0],
        fill: true,
        backgroundColor: 'rgba(0, 128, 128, 0.1)',
        borderColor: '#008080',
        tension: 0.3,
        pointBackgroundColor: '#008080',
        pointHoverRadius: 8,
      },
    ],
  };

  return (
    <div className="mt-8 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        <button
          onClick={() => queryClient.invalidateQueries(['stats', 'branches', 'recentOrders'])}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Refresh Data
        </button>
      </div>
      {statsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : statsError ? (
        <p className="text-red-500">Error loading stats: {statsError.message}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Orders Today" value={stats?.todayOrders || 0} icon="fas fa-shopping-cart" />
          <StatsCard title="Total Revenue" value={`AED ${stats?.revenue || 0}`} icon="fas fa-dollar-sign" />
          <StatsCard title="Active Customers" value={stats?.customers || 0} icon="fas fa-users" />
          <StatsCard title="Pending Orders" value={stats?.pending || 0} icon="fas fa-hourglass-half" />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Status Distribution</h3>
          <Pie data={chartData} options={{ plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } } }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Trends</h3>
          <Line data={lineChartData} options={{ plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } } }} />
        </motion.div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Orders by Branch</h2>
        {branchesLoading || ordersLoading ? (
          <SkeletonTable />
        ) : branchesError ? (
          <p className="text-red-500">Error loading branches: {branchesError.message}</p>
        ) : ordersError ? (
          <p className="text-red-500">Error loading orders: {ordersError.message}</p>
        ) : !Array.isArray(branches) || branches.length === 0 ? (
          <p className="text-gray-500">No branches found.</p>
        ) : (
          branches.map((branch) => (
            <BranchOrders
              key={branch._id}
              branch={branch}
              orders={orders?.filter((order) => order.branchId?._id === branch._id) || []}
              searchQuery=""
            />
          ))
        )}
      </div>
    </div>
  );
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => api.get(`/orders/${orderId}`).then((res) => res.data || {}),
  });

  const confirmOrderMutation = useMutation({
    mutationFn: ({ contactMethod, notes }) => api.post(`/orders/${orderId}/confirm`, { contactMethod, notes }),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders', 'recentOrders']);
      toast.success('Order confirmed successfully', { position: 'top-right' });
    },
    onError: (err) => toast.error(`Failed to confirm order: ${err.message}`, { position: 'top-right' }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ status }) => api.patch(`/orders/${orderId}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders', 'recentOrders']);
      toast.success('Order status updated', { position: 'top-right' });
    },
    onError: (err) => toast.error(`Failed to update order status: ${err.message}`, { position: 'top-right' }),
  });

  const [contactMethod, setContactMethod] = useState('');
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    if (!contactMethod) {
      toast.error('Please select a contact method', { position: 'top-right' });
      return;
    }
    confirmOrderMutation.mutate({ contactMethod, notes });
  };

  if (isLoading) return <p className="text-gray-500">Loading order...</p>;
  if (error) return <p className="text-red-500">Error loading order: {error.message}</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8 bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Details: {order._id || 'N/A'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Customer</h3>
          <p>Name: {order.contact?.name || 'Unknown'}</p>
          <p>Email: {order.contact?.email || 'N/A'}</p>
          <p>Phone: {order.contact?.phone || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">Order Info</h3>
          <p>Branch: {order.branchId?.name || 'N/A'}</p>
          <p>Total: AED {order.total || 0}</p>
          <p>Status: {order.status || 'N/A'}</p>
          <p>Services: {order.services?.map((s) => s.title).join(', ') || 'None'}</p>
          <p>Address: {order.address || 'N/A'}</p>
          <p>Created: {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</p>
          {order.confirmation && (
            <p>
              Confirmed via {order.confirmation.method} at{' '}
              {new Date(order.confirmation.confirmedAt).toLocaleString()}
              {order.confirmation.notes && <span> - Notes: {order.confirmation.notes}</span>}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700">Update Status</h3>
        <select
          value={order.status || ''}
          onChange={(e) => updateStatusMutation.mutate({ status: e.target.value })}
          className="border p-2 rounded-lg mt-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700">Confirm Order</h3>
        <div className="space-y-4">
          <select
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
            className="border p-2 rounded-lg w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="">Select Contact Method</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
          </select>
          <textarea
            placeholder="Notes (e.g., call details)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <button
            onClick={handleConfirm}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Confirm Order
          </button>
        </div>
      </div>
      <button
        onClick={() => navigate('/admin/orders')}
        className="mt-4 text-teal-600 hover:underline"
      >
        Back to Orders
      </button>
    </motion.div>
  );
};

const Orders = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(null);
  const ordersPerPage = 10;

  const branches = [
    { _id: null, name: 'All Branches' },
    { _id: '689ed9201be7ac46b783dd83', name: 'Main Branch' },
    { _id: '689ed9201be7ac46b783dd84', name: 'Branch 2' },
    { _id: '689ed9201be7ac46b783dd85', name: 'Branch 3' },
  ];

  const { data: ordersData, isLoading, error } = useQuery({
    queryKey: ['orders', page, statusFilter, timeFilter, sortBy, sortOrder, selectedBranch],
    queryFn: () =>
      api.get('/orders', {
        params: { page, limit: ordersPerPage, branchId: selectedBranch, status: statusFilter, sortBy, sortOrder, timeFilter },
      }).then((res) => res.data || { orders: [], total: 0 }),
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">All Orders</h2>
        <button
          onClick={() => queryClient.invalidateQueries(['orders'])}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Refresh Data
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {branches.map((branch) => (
            <button
              key={branch._id || 'all'}
              onClick={() => setSelectedBranch(branch._id)}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
                selectedBranch === branch._id
                  ? branch._id === null
                    ? 'bg-purple-600 text-white'
                    : branch.name === 'Main Branch'
                    ? 'bg-teal-600 text-white'
                    : branch.name === 'Branch 2'
                    ? 'bg-blue-600 text-white'
                    : 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {branch.name}
            </button>
          ))}
        </div>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="border p-2 rounded-lg w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="last24hours">Last 24 Hours</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>
        <input
          type="text"
          placeholder="Search by Customer Name or Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-3 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded-lg w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => handleSort('createdAt')}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Sort by Date {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('total')}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Sort by Total {sortBy === 'total' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
      {isLoading ? (
        <SkeletonTable />
      ) : error ? (
        <p className="text-red-500">Error loading orders: {error.message}</p>
      ) : !ordersData?.orders?.length ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <>
          <BranchOrders orders={ordersData.orders} searchQuery={searchQuery} />
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 hover:bg-teal-700 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-700">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={ordersData.orders.length < ordersPerPage}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 hover:bg-teal-700 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const CustomerEditModal = ({ customer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(customer._id, formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Customer</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-600 ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-600 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="text-teal-600 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const Customers = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [editCustomer, setEditCustomer] = useState(null);
  const queryClient = useQueryClient();
  const customersPerPage = 10;

  const { data: customers, isLoading, error } = useQuery({
    queryKey: ['customers', search, page],
    queryFn: () => api.get('/customers', { params: { search, page, limit: customersPerPage } }).then((res) => res.data || []),
  });

  const updateCustomerMutation = useMutation({
    mutationFn: ({ id, data }) => api.patch(`/customers/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
      toast.success('Customer updated successfully', { position: 'top-right' });
      setEditCustomer(null);
    },
    onError: (err) => toast.error(`Failed to update customer: ${err.message}`, { position: 'top-right' }),
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customers</h2>
      <input
        type="text"
        placeholder="Search by Name or Email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded-lg w-full max-w-md mb-6 focus:outline-none focus:ring-2 focus:ring-teal-600"
      />
      {isLoading ? (
        <SkeletonTable />
      ) : error ? (
        <p className="text-red-500">Error loading customers: {error.message}</p>
      ) : !Array.isArray(customers) || customers.length === 0 ? (
        <p className="text-gray-500">No customers found.</p>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-gray-700">Name</th>
                  <th className="p-4 text-left text-gray-700">Email</th>
                  <th className="p-4 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">{customer.name}</td>
                    <td className="p-4">{customer.email}</td>
                    <td className="p-4">
                      <button
                        onClick={() => setEditCustomer(customer)}
                        className="text-teal-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 hover:bg-teal-700 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-700">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={customers.length < customersPerPage}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 hover:bg-teal-700 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
      {editCustomer && (
        <CustomerEditModal
          customer={editCustomer}
          onClose={() => setEditCustomer(null)}
          onSave={(id, data) => updateCustomerMutation.mutate({ id, data })}
        />
      )}
    </div>
  );
};

const AdminPanel = () => {
  const queryClient = useQueryClient();
  const wsRef = useRef(null);
  const [newOrder, setNewOrder] = useState(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('ws://localhost:8080');
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        toast.info('Real-time updates enabled', { position: 'top-right' });
      };

      ws.onmessage = (event) => {
        try {
          const { type, data } = JSON.parse(event.data);
          if (['NEW_ORDER', 'ORDER_UPDATE', 'NEW_FEEDBACK', 'FEEDBACK_UPDATE'].includes(type)) {
            queryClient.invalidateQueries(['orders', 'recentOrders', 'feedback']);
            if (type === 'NEW_ORDER') {
              setNewOrder(data);
              const audio = new Audio('https://cdn.pixabay.com/audio/2023/02/22/14-48-49-567_200x200.mp3');
              audio.play().catch((err) => console.error('Audio playback error:', err));
            }
            toast.info(
              type === 'NEW_ORDER'
                ? `New order at ${data.branchId?.name || 'Unknown Branch'}`
                : type === 'NEW_FEEDBACK'
                ? `New feedback from ${data.name}`
                : type === 'FEEDBACK_UPDATE'
                ? `Feedback status updated for ${data.name}`
                : `Order status updated at ${data.branchId?.name || 'Unknown Branch'}`,
              { position: 'top-right' }
            );
          }
        } catch (error) {
          console.error('WebSocket message parsing error:', error);
          toast.error('Failed to process real-time update', { position: 'top-right' });
        }
      };

      ws.onerror = (err) => {
        console.error('WebSocket error:', err);
        toast.error('WebSocket connection failed', { position: 'top-right' });
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected, attempting to reconnect...');
        setTimeout(connectWebSocket, 3000);
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        console.log('WebSocket connection closed on component unmount');
      }
    };
  }, [queryClient]);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="ml-64 flex-1 p-8">
        <header className="sticky top-0 bg-white shadow-lg p-6 flex justify-between items-center rounded-xl z-10">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <div className="space-x-4">
            <button
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Export Report
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/feedback/:feedbackId" element={<FeedbackDetail />} />
        </Routes>
        {newOrder && (
          <NewOrderPopup
            order={newOrder}
            onClose={() => setNewOrder(null)}
          />
        )}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick />
      </div>
    </div>
  );
};

export default AdminPanel;