import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../Utils/api';
import Sidebar from '../Components/Sidebar';

const Orders = () => {
  const [filters, setFilters] = useState({ status: '', name: '', orderId: '', branchId: '' });

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', filters],
    queryFn: () => api.get('/orders', { params: filters }).then(res => res.data),
  });

  const { data: branches } = useQuery({
    queryKey: ['branches'],
    queryFn: () => api.get('/branches').then(res => res.data),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderIds, status }) => api.patch('/orders/bulk', { orderIds, status }),
    onSuccess: () => queryClient.invalidateQueries(['orders']),
  });

  const handleBulkUpdate = (status) => {
    const selectedOrders = orders.filter(order => order.selected).map(order => order._id);
    updateStatusMutation.mutate({ orderIds: selectedOrders, status });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <header className="sticky top-0 bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Orders</h1>
          <div className="space-x-2">
            <button
              onClick={() => handleBulkUpdate('Completed')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Mark Selected Completed
            </button>
          </div>
        </header>
        <div className="mt-6">
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Search by Order ID"
              value={filters.orderId}
              onChange={(e) => setFilters({ ...filters, orderId: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Search by Customer Name"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              className="border p-2 rounded"
            />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={filters.branchId}
              onChange={(e) => setFilters({ ...filters, branchId: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="">All Branches</option>
              {branches?.map(branch => (
                <option key={branch._id} value={branch._id}>{branch.name}</option>
              ))}
            </select>
          </div>
          {isLoading ? (
            <p>Loading orders...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded shadow">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">
                      <input type="checkbox" />
                    </th>
                    <th className="p-2 text-left">Order ID</th>
                    <th className="p-2 text-left">Customer</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Total</th>
                    <th className="p-2 text-left">Delivery Date</th>
                    <th className="p-2 text-left">Branch</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map(order => (
                    <tr key={order._id} className="border-t">
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={order.selected}
                          onChange={() => {/* Toggle selection */}}
                        />
                      </td>
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
                      <td className="p-2">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                      <td className="p-2">{order.branchId.name}</td>
                      <td className="p-2">
                        <Link to={`/orders/${order._id}`} className="text-blue-500 hover:underline">
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

export default Orders;