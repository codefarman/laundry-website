import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import api  from '../Utils/api';
import Sidebar from '../Components/Sidebar';

const Services = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    pricePerKg: 0,
    pricePerItem: 0,
    imageUrl: '',
  });

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => api.get('/services').then(res => res.data),
  });

  const addServiceMutation = useMutation({
    mutationFn: (data) => api.post('/services', data),
    onSuccess: () => queryClient.invalidateQueries(['services']),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addServiceMutation.mutate(formData);
    setFormData({ name: '', category: '', pricePerKg: 0, pricePerItem: 0, imageUrl: '' });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <header className="sticky top-0 bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Services</h1>
          <button
            onClick={() => document.getElementById('service-form').classList.toggle('hidden')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Service
          </button>
        </header>
        <div className="mt-6">
          <div id="service-form" className="hidden bg-white p-4 rounded shadow mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Price per Kg"
                  value={formData.pricePerKg}
                  onChange={(e) => setFormData({ ...formData, pricePerKg: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Price per Item"
                  value={formData.pricePerItem}
                  onChange={(e) => setFormData({ ...formData, pricePerItem: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Image URL (Cloudinary)"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="border p-2 rounded"
                />
              </div>
              <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Save Service
              </button>
            </form>
          </div>
          {isLoading ? (
            <p>Loading services...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded shadow">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Category</th>
                    <th className="p-2 text-left">Price/Kg</th>
                    <th className="p-2 text-left">Price/Item</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services?.map(service => (
                    <tr key={service._id} className="border-t">
                      <td className="p-2">{service.name}</td>
                      <td className="p-2">{service.category}</td>
                      <td className="p-2">${service.pricePerKg}</td>
                      <td className="p-2">${service.pricePerItem}</td>
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

export default Services;