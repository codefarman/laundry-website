import React from 'react';

const StatsCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl">{value}</p>
  </div>
);

export default StatsCard;