import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../Utils/api';
import Sidebar from '../Components/Sidebar';
import OrderTable from '../Components/OrderTable';

const Orders = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ status: '', name: '', orderId: '' });
  const [selectedOrders, setSelectedOrders] = useState([]);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', filters],
    queryFn: () => api.get('/orders', { params: filters }).then(res => res.data),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderIds, status }) => api.patch('/orders/bulk', { orderIds, status }),
    onSuccess: () => queryClient.invalidateQueries(['orders']),
  });

  const handleBulkUpdate = (status) => {
    updateStatusMutation.mutate({ orderIds: selectedOrders, status });
    setSelectedOrders([]);
  };

  const toggleSelect = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
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
              disabled={selectedOrders.length === 0}
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
          </div>
          <OrderTable
            orders={orders}
            selectedOrders={selectedOrders}
            toggleSelect={toggleSelect}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;