import React, { useState } from 'react';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const stats = {
    totalUsers: 1250,
    totalBookings: 432,
    totalRevenue: 5670000,
    pendingBookings: 23
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white min-h-screen p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            {[
              { key: 'dashboard', label: '📊 Dashboard', icon: '📊' },
              { key: 'destinations', label: '📍 Destinations', icon: '📍' },
              { key: 'hotels', label: '🏨 Hotels', icon: '🏨' },
              { key: 'packages', label: '🎒 Packages', icon: '🎒' },
              { key: 'transport', label: '🚌 Transport', icon: '🚌' },
              { key: 'bookings', label: '📋 Bookings', icon: '📋' },
              { key: 'users', label: '👤 Users', icon: '👤' },
              { key: 'reviews', label: '⭐ Reviews', icon: '⭐' }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeSection === item.key
                    ? 'bg-primary-600'
                    : 'hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>

          {activeSection === 'dashboard' && (
            <div>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="text-gray-600 mb-2">Total Users</p>
                  <p className="text-3xl font-bold text-primary-600">{stats.totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="text-gray-600 mb-2">Total Bookings</p>
                  <p className="text-3xl font-bold text-accent-600">{stats.totalBookings}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="text-gray-600 mb-2">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600">₹{(stats.totalRevenue/100000).toFixed(1)}L</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="text-gray-600 mb-2">Pending Bookings</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">ID</th>
                        <th className="text-left py-3">User</th>
                        <th className="text-left py-3">Type</th>
                        <th className="text-left py-3">Amount</th>
                        <th className="text-left py-3">Status</th>
                        <th className="text-left py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map(i => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="py-3">#{i}</td>
                          <td className="py-3">User {i}</td>
                          <td className="py-3">Package</td>
                          <td className="py-3">₹25,000</td>
                          <td className="py-3">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                              Confirmed
                            </span>
                          </td>
                          <td className="py-3">
                            <button className="text-primary-600 hover:underline">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection !== 'dashboard' && (
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Manage {activeSection}</h2>
                <button className="btn-primary">Add New</button>
              </div>
              <p className="text-gray-600">Content for managing {activeSection} will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
