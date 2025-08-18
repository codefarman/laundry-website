import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import  api  from '../Utils/api';
import Sidebar from '../Components/Sidebar';

const Branches = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    lat: 0,
    lng: 0,
  });

  const { data: branches, isLoading } = useQuery({
    queryKey: ['branches'],
    queryFn: () => api.get('/branches').then(res => res.data),
  });

  const addBranchMutation = useMutation({
    mutationFn: (data) => api.post('/branches', data),
    onSuccess: () => queryClient.invalidateQueries(['branches']),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBranchMutation.mutate(formData);
    setFormData({ name: '', address: '', phone: '', lat: 0, lng: 0 });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <header className="sticky top-0 bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Branches</h1>
          <button
            onClick={() => document.getElementById('branch-form').classList.toggle('hidden')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Branch
          </button>
        </header>
        <div className="mt-6">
          <div id="branch-form" className="hidden bg-white p-4 rounded shadow mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Branch Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Latitude"
                  value={formData.lat}
                  onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Longitude"
                  value={formData.lng}
                  onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                  className="border p-2 rounded"
                  required
                />
              </div>
              <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Save Branch
              </button>
            </form>
          </div>
          {isLoading ? (
            <p>Loading branches...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded shadow">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Address</th>
                    <th className="p-2 text-left">Phone</th>
                    <th className="p-2 text-left">Latitude</th>
                    <th className="p-2 text-left">Longitude</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {branches?.map(branch => (
                    <tr key={branch._id} className="border-t">
                      <td className="p-2">{branch.name}</td>
                      <td className="p-2">{branch.address}</td>
                      <td className="p-2">{branch.phone}</td>
                      <td className="p-2">{branch.lat}</td>
                      <td className="p-2">{branch.lng}</td>
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

export default Branches;