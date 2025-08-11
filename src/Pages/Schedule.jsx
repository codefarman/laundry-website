import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../Utils/api';
import { getNearestBranch } from '../Utils/nearestBranch';

const Schedule = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [orderData, setOrderData] = useState({
    services: [],
    pickupDate: '',
    notes: '',
    // Add other fields as needed
  });

  const { data: branches } = useQuery({
    queryKey: ['branches'],
    queryFn: () => api.get('/branches').then(res => res.data),
  });

  const createOrderMutation = useMutation({
    mutationFn: (data) => api.post('/orders', data),
    onSuccess: () => {
      // Redirect or show success
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        if (branches) {
          const nearest = getNearestBranch(latitude, longitude, branches);
          setSelectedBranch(nearest);
        }
      },
      (error) => console.error('Geolocation error:', error),
      { enableHighAccuracy: true }
    );
  }, [branches]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBranch) {
      const fullOrder = {
        ...orderData,
        branchId: selectedBranch._id,
        // Add customerId, totalAmount, etc.
      };
      createOrderMutation.mutate(fullOrder);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Schedule Order</h1>
      <form onSubmit={handleSubmit}>
        {/* Services selection, date picker, notes input */}
        <div className="mb-4">
          <label>Nearest Branch (Auto-Selected):</label>
          <p>{selectedBranch ? `${selectedBranch.name} (${selectedBranch.address})` : 'Detecting location...'}</p>
          {/* Option to manual select if needed */}
          <select onChange={(e) => setSelectedBranch(branches.find(b => b._id === e.target.value))}>
            <option value="">Select Manually</option>
            {branches?.map(branch => (
              <option key={branch._id} value={branch._id}>{branch.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Schedule;