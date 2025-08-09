import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { api } from '../Utils/api';
import Sidebar from '../Components/Sidebar';
import StatsCard from '../Components/StatsCard';

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.get('/stats').then(res => res.data),
  });

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['recentOrders'],
    queryFn: () => api.get('/orders/recent').then(res => res.data),
  });

  const chartData = [
    { name: 'Jan', orders: 400, revenue: 2400 },
    { name: 'Feb', orders: 300, revenue: 1800 },
    { name: 'Mar', orders: 500, revenue: 3000 },
    { name: 'Apr', orders: 600, revenue: 3600 },
    { name: 'May', orders: 450, revenue: 2700 },
    { name: 'Jun', orders: 700, revenue: 4200 },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <header className="sticky top-0 bg-white shadow p-4 flex justify-between items-center z-10">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="space-x-2">
            <Link to="/admin/services/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Service
            </Link>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Export Report
            </button>
          </div>
        </header>
        {statsLoading ? (
          <p>Loading stats...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <StatsCard title="Total Orders Today" value={stats?.todayOrders || 0} />
            <StatsCard title="Total Revenue" value={`$${stats?.revenue || 0}`} />
            <StatsCard title="Active Customers" value={stats?.customers || 0} />
            <StatsCard title="Pending Orders" value={stats?.pending || 0} />
          </div>
        )}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Order Trends</h2>
          <div className="bg-white p-4 rounded shadow">
            <LineChart width={600} height={300} data={chartData} className="w-full">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#8884d8" />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          {ordersLoading ? (
            <p>Loading orders...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded shadow">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Order ID</th>
                    <th className="p-2 text-left">Customer</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Total</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map(order => (
                    <tr key={order._id} className="border-t">
                      <td className="p-2">{order.orderId}</td>
                      <td className="p-2">{order.customerId.name}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-white ${
                          order.status === 'Pending' ? 'bg-yellow-500' :
                          order.status === 'In Progress' ? 'bg-blue-500' :
                          order.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-2">${order.totalAmount}</td>
                      <td className="p-2">
                        <Link to={`/admin/orders/${order._id}`} className="text-blue-500 hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;