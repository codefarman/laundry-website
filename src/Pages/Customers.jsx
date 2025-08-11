import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../Utils/api';
import Sidebar from '../Components/Sidebar';

const Customers = () => {
  const [search, setSearch] = useState('');

  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers', search],
    queryFn: () => api.get('/customers', { params: { search } }).then(res => res.data),
  });

  const updateCustomerMutation = useMutation({
    mutationFn: ({ id, data }) => api.patch(`/customers/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries(['customers']),
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <header className="sticky top-0 bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Customers</h1>
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded"
          />
        </header>
        <div className="mt-6">
          {isLoading ? (
            <p>Loading customers...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded shadow">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Phone</th>
                    <th className="p-2 text-left">Loyalty Points</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers?.map(customer => (
                    <tr key={customer._id} className="border-t">
                      <td className="p-2">{customer.name}</td>
                      <td className="p-2">{customer.email}</td>
                      <td className="p-2">{customer.phone}</td>
                      <td className="p-2">{customer.loyaltyPoints}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-white ${
                          customer.blacklisted ? 'bg-red-500' : 'bg-green-500'
                        }`}>
                          {customer.blacklisted ? 'Blacklisted' : 'Active'}
                        </span>
                      </td>
                      <td className="p-2">
                        <Link to={`/customers/${customer._id}`} className="text-blue-500 hover:underline mr-2">
                          View
                        </Link>
                        <button
                          onClick={() => updateCustomerMutation.mutate({ id: customer._id, data: { blacklisted: !customer.blacklisted } })}
                          className="text-red-500 hover:underline"
                        >
                          {customer.blacklisted ? 'Unblacklist' : 'Blacklist'}
                        </button>
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

export default Customers;