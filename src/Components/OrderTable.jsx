import React from 'react';
import { Link } from 'react-router-dom';

const OrderTable = ({ orders, selectedOrders, toggleSelect, isLoading }) => {
  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => toggleSelect(e.target.checked ? orders.map(o => o._id) : [])}
                  checked={orders?.length > 0 && selectedOrders.length === orders.length}
                />
              </th>
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left">Delivery Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map(order => (
              <tr key={order._id} className="border-t">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order._id)}
                    onChange={() => toggleSelect(order._id)}
                  />
                </td>
                <td className="p-2">{order.orderId}</td>
                <td className="p-2">{order.customerId?.name || 'Unknown'}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      order.status === 'Pending' ? 'bg-yellow-500' :
                      order.status === 'In Progress' ? 'bg-blue-500' :
                      order.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2">${order.totalAmount}</td>
                <td className="p-2">
                  {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-2">
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderTable;