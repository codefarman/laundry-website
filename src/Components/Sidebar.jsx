import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ShoppingCartIcon, TagIcon, UserIcon, ChartBarIcon, UsersIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white h-screen fixed top-0 left-0">
    <div className="p-4">
      <h1 className="text-2xl font-bold">Laundry Admin</h1>
    </div>
    <nav className="mt-4">
      <Link to="/admin" className="flex items-center py-2 px-4 hover:bg-gray-700">
        <HomeIcon className="w-5 h-5 mr-2" /> Dashboard
      </Link>
      <Link to="/admin/orders" className="flex items-center py-2 px-4 hover:bg-gray-700">
        <ShoppingCartIcon className="w-5 h-5 mr-2" /> Orders
      </Link>
      <Link to="/admin/services" className="flex items-center py-2 px-4 hover:bg-gray-700">
        <TagIcon className="w-5 h-5 mr-2" /> Services
      </Link>
      <Link to="/admin/customers" className="flex items-center py-2 px-4 hover:bg-gray-700">
        <UserIcon className="w-5 h-5 mr-2" /> Customers
      </Link>
      <Link to="/admin/analytics" className="flex items-center py-2 px-4 hover:bg-gray-700">
        <ChartBarIcon className="w-5 h-5 mr-2" /> Analytics
      </Link>
      <Link to="/admin/staff" className="flex items-center py-2 px-4 hover:bg-gray-700">
        <UsersIcon className="w-5 h-5 mr-2" /> Staff
      </Link>
      <Link to="/admin/branches" className="flex items-center py-2 px-4 hover:bg-gray-700">
        <MapPinIcon className="w-5 h-5 mr-2" /> Branches
      </Link>
    </nav>
  </div>
);

export default Sidebar;