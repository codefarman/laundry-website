import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../Utils/api';
import Sidebar from '../Components/Sidebar';

const Staff = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ name: '', role: 'staff' });

  const { data: staff, isLoading } = useQuery({
    queryKey: ['staff'],
    queryFn: () => api.get('/staff').then(res => res.data),
  });

  const addStaffMutation = useMutation({
    mutationFn: (data) => api.post('/staff', data),
    onSuccess: () => queryClient.invalidateQueries(['staff']),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addStaffMutation.mutate(formData);
    setFormData({ name: '', role: 'staff' });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <header className="sticky top-0 bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Staff</h1>
          <button
            onClick={() => document.getElementById('staff-form').classList.toggle('hidden')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Staff
          </button>
        </header>
        <div className="mt-6">
          <div id="staff-form" className="hidden bg-white p-4 rounded shadow mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Staff Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border p-2 rounded"
                  required
                />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="border p-2 rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
              <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Save Staff
              </button>
            </form>
          </div>
          {isLoading ? (
            <p>Loading staff...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded shadow">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Role</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff?.map(member => (
                    <tr key={member._id} className="border-t">
                      <td className="p-2">{member.name}</td>
                      <td className="p-2">{member.role}</td>
                      <td className="p-2">
                        <button className="text-blue-500 hover:underline mr-2">Edit</button>
                        <button className="text-red-500 hover:underline">Delete</button>
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

export default Staff;