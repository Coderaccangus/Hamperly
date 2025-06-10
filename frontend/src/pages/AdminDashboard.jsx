import React, { useEffect, useState } from 'react';
import './Styles.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch orders');
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrders();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleStatusToggle = async (orderId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'active' : 'completed';
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update order');

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const activeOrders = orders.filter((order) => order.status !== 'completed');
  const completedOrders = orders.filter((order) => order.status === 'completed');

  return (
    <div className="form-container">
      <h2>Admin Dashboard</h2>
      {error && <p className="error-text">{error}</p>}
      <button className="landing-button" onClick={handleLogout}>Logout</button>

      <h3>Active Orders</h3>
      {activeOrders.map((order) => (
        <div key={order._id} className="order-card">
          <p><strong>User:</strong> {order.user?.name}</p>
          <p><strong>Hamper:</strong> {order.hamper?.name}</p>
          <p><strong>Price:</strong> ${order.totalPrice}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <button onClick={() => handleStatusToggle(order._id, order.status)}>
            Mark as Completed
          </button>
        </div>
      ))}

      <h3>Completed Orders</h3>
      {completedOrders.map((order) => (
        <div key={order._id} className="order-card">
          <p><strong>User:</strong> {order.user?.name}</p>
          <p><strong>Hamper:</strong> {order.hamper?.name}</p>
          <p><strong>Price:</strong> ${order.totalPrice}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <button onClick={() => handleStatusToggle(order._id, order.status)}>
            Reopen Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
