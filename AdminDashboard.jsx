import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; // We'll create this CSS file next

// Mock function to simulate fetching orders
const fetchOrders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'ORD001', userName: 'Alice Smith', item: 'Laptop Pro', quantity: 1, total: 1200, status: 'Processing', timestamp: new Date(Date.now() - 3600000).toLocaleString() },
        { id: 'ORD002', userName: 'Bob Johnson', item: 'Wireless Mouse', quantity: 2, total: 50, status: 'Shipped', timestamp: new Date(Date.now() - 7200000).toLocaleString() },
        { id: 'ORD003', userName: 'Carol White', item: 'Keyboard RGB', quantity: 1, total: 75, status: 'Delivered', timestamp: new Date(Date.now() - 10800000).toLocaleString() },
        { id: 'ORD004', userName: 'David Green', item: 'Monitor 27"', quantity: 1, total: 300, status: 'Processing', timestamp: new Date(Date.now() - 120000).toLocaleString() },
      ]);
    }, 1000);
  });
};

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchOrders().then(data => {
      setOrders(data);
      setIsLoading(false);
    });

    // For actual real-time updates, you'd use WebSockets or long polling here.
    // Example:
    // const interval = setInterval(() => {
    //   fetchOrders().then(data => setOrders(data));
    // }, 5000); // Fetch new orders every 5 seconds
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-dashboard-container">
      <div className="admin-active-status">Admin NM is active</div>
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>
      <main className="dashboard-main">
        <h2>Real-time Placed Orders</h2>
        {isLoading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Total ($)</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.userName}</td>
                    <td>{order.item}</td>
                    <td>{order.quantity}</td>
                    <td>{order.total.toFixed(2)}</td>
                    <td><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td>{order.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="real-time-note">
          <em>Note: Order data is currently mocked. Implement WebSockets or polling for true real-time updates.</em>
        </p>
      </main>
    </div>
  );
}

export default AdminDashboard;
