import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../Utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['userOrders'],
    queryFn: () => api.get('/orders/user').then((res) => res.data),
  });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      if (type === 'ORDER_UPDATE' || type === 'NEW_ORDER') {
        queryClient.invalidateQueries(['userOrders']);
        toast.info(type === 'NEW_ORDER' ? 'New order placed' : 'Order status updated');
      }
    };
    return () => ws.close();
  }, [queryClient]);

  if (isLoading) return <p className="text-gray-500 text-center mt-8">Loading orders...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Orders</h2>
      {orders?.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders?.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-700">Order ID: {order._id}</h3>
              <p>Branch: {order.branchId?.name || 'Unknown'}</p>
              <p>Services: {order.services.map((s) => s.title).join(', ')}</p>
              <p>Total: AED {order.total}</p>
              <p>Status: 
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-sm font-medium text-white ${
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
                  {order.status}
                </span>
              </p>
              <p>Address: {order.address}</p>
              <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
              {order.confirmation && (
                <p>
                  Confirmed via {order.confirmation.method} at{' '}
                  {new Date(order.confirmation.confirmedAt).toLocaleString()}
                  {order.confirmation.notes && <span> - Notes: {order.confirmation.notes}</span>}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserOrders;