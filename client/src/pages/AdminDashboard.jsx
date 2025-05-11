import React, { useState, useEffect } from 'react';
import { FiUsers, FiShoppingCart, FiDollarSign, FiActivity } from 'react-icons/fi';

// Mock active admin user - replace with actual user data from your auth system
const activeAdminUser = {
  name: 'Admin User', // Placeholder for the active admin's name
  role: 'Administrator',
};

// Mock data - in a real app, this would come from an API
const mockAdminStats = {
  totalUsers: 1250,
  totalOrders: 340,
  totalRevenue: 45200,
  pendingTasks: 5,
};

const mockRecentOrders = [
  { id: 'ORD101', customer: 'John Doe', date: '2023-11-15', total: 75.00, status: 'Processing', items: 3 },
  { id: 'ORD102', customer: 'Jane Smith', date: '2023-11-14', total: 120.50, status: 'Shipped', items: 2 },
  { id: 'ORD103', customer: 'Mike Brown', date: '2023-11-14', total: 35.20, status: 'Delivered', items: 1 },
  { id: 'ORD104', customer: 'Lisa White', date: '2023-11-13', total: 210.00, status: 'Pending', items: 5 },
];

const mockNewUsers = [
  { id: 'USR001', name: 'Alice Green', email: 'alice@example.com', joined: '2023-11-15' },
  { id: 'USR002', name: 'Bob Red', email: 'bob@example.com', joined: '2023-11-14' },
  { id: 'USR003', name: 'Charlie Blue', email: 'charlie@example.com', joined: '2023-11-13' },
];

// Mock order data - replace with actual order data from your backend
const mockOrders = [
  {
    id: 'ORD001',
    userName: 'Alice Wonderland',
    items: ['Development Board X', 'Sensor Kit A'],
    timestamp: new Date('2023-10-26T10:30:00Z'),
    status: 'Shipped',
    total: 75.99,
  },
  {
    id: 'ORD002',
    userName: 'Bob The Builder',
    items: ['Power Supply Unit', 'Soldering Iron', 'Multimeter'],
    timestamp: new Date('2023-10-25T15:45:00Z'),
    status: 'Processing',
    total: 120.50,
  },
  {
    id: 'ORD003',
    userName: 'Naihr',
    items: ['Raspberry Pi 4', 'MicroSD Card 64GB'],
    timestamp: new Date('2023-10-24T09:12:00Z'),
    status: 'Delivered',
    total: 95.00,
  },
  {
    id: 'ORD004',
    userName: 'Charlie Brown',
    items: ['Arduino Uno', 'Jumper Wires Pack'],
    timestamp: new Date('2023-10-23T12:05:00Z'),
    status: 'Shipped',
    total: 42.75,
  },
  {
    id: 'ORD005',
    userName: 'Diana Prince',
    items: ['LED Pack Assorted', 'Resistor Kit'],
    timestamp: new Date('2023-10-22T18:20:00Z'),
    status: 'Pending',
    total: 15.25,
  },
];

const AdminDashboard = () => {
  // State for actual data would be managed here, e.g., fetched via useEffect
  // const [stats, setStats] = useState(mockAdminStats);
  // const [orders, setOrders] = useState(mockRecentOrders);
  // const [users, setUsers] = useState(mockNewUsers);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Overview of your application's activity.</p>
          </div>
          {activeAdminUser && (
            <div className="text-right">
              <p className="text-md font-semibold text-indigo-700">Welcome, {activeAdminUser.name}</p>
              <p className="text-sm text-gray-500">{activeAdminUser.role}</p>
            </div>
          )}
        </div>
      </header>

      {/* Summary Statistics Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FiUsers className="text-3xl text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold text-gray-800">{mockAdminStats.totalUsers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FiShoppingCart className="text-3xl text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-semibold text-gray-800">{mockAdminStats.totalOrders}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FiDollarSign className="text-3xl text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-semibold text-gray-800">${mockAdminStats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FiActivity className="text-3xl text-red-500" />
          <div>
            <p className="text-sm text-gray-500">Pending Tasks</p>
            <p className="text-2xl font-semibold text-gray-800">{mockAdminStats.pendingTasks}</p>
          </div>
        </div>
      </section>

      {/* Recent Orders Table Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Orders</h2>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRecentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pending' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Orders Table Section */}
      <section className="bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Customer Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    {/* <Link to={`/admin/orders/${order.id}`}>{order.id}</Link> */}
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.userName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <ul className="list-disc list-inside">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-xs truncate max-w-xs">{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.timestamp.toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pending' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      // onClick={() => handleViewOrder(order.id)} 
                      className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                    >
                      View
                    </button>
                    {/* Add more actions like Edit, Delete if needed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {mockOrders.length === 0 && (
          <p className="text-center text-gray-500 mt-6 py-4">No orders to display yet.</p>
        )}
      </section>

      {/* New Users List Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">New Users</h2>
        <div className="bg-white shadow-md rounded-lg">
          <ul className="divide-y divide-gray-200">
            {mockNewUsers.map(user => (
              <li key={user.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    {user.name.charAt(0)} 
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Joined: {user.joined}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Add more sections as needed, e.g., charts, product management, etc. */}

    </div>
  );
};

export default AdminDashboard;
