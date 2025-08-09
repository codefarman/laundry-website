import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { api } from '../Utils/api';
import Sidebar from '../Components/Sidebar';

const Analytics = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => api.get('/analytics').then(res => res.data),
  });

  const revenueData = analytics?.revenueByMonth || [
    { name: 'Jan', revenue: 2400 },
    { name: 'Feb', revenue: 1800 },
    { name: 'Mar', revenue: 3000 },
  ];

  const peakTimes = analytics?.peakTimes || [
    { day: 'Mon', orders: 100 },
    { day: 'Tue', orders: 80 },
    { day: 'Wed', orders: 120 },
  ];

  const forecastData = analytics?.forecast || [
    { day: 'Mon', predictedOrders: 110 },
    { day: 'Tue', predictedOrders: 90 },
    { day: 'Wed', predictedOrders: 130 },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <header className="sticky top-0 bg-white shadow p-4">
          <h1 className="text-2xl font-bold">Analytics</h1>
        </header>
        <div className="mt-6">
          {isLoading ? (
            <p>Loading analytics...</p>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Revenue Breakdown</h2>
                <div className="bg-white p-4 rounded shadow">
                  <BarChart width={600} height={300} data={revenueData} className="w-full">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Peak Times</h2>
                <div className="bg-white p-4 rounded shadow">
                  <BarChart width={600} height={300} data={peakTimes} className="w-full">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#82ca9d" />
                  </BarChart>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Demand Forecast</h2>
                <div className="bg-white p-4 rounded shadow">
                  <BarChart width={600} height={300} data={forecastData} className="w-full">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="predictedOrders" fill="#ff7300" />
                  </BarChart>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;