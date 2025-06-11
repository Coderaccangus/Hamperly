import React, { useEffect, useState } from 'react';
import './Styles.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [hampers, setHampers] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Fetch orders
        const orderRes = await fetch('http://localhost:5000/api/admin/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const orderData = await orderRes.json();
        if (!orderRes.ok) throw new Error(orderData.error || 'Failed to fetch orders');
        setOrders(orderData);

        // Fetch users
        const userRes = await fetch('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await userRes.json();
        if (!userRes.ok) throw new Error(userData.error || 'Failed to fetch users');
        setUsers(userData);

        // Fetch hampers
        const hamperRes = await fetch('http://localhost:5000/api/hampers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const hamperData = await hamperRes.json();
        if (!hamperRes.ok) throw new Error(hamperData.error || 'Failed to fetch hampers');
        setHampers(hamperData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAdminData();
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

      <h3>Users</h3>
      {users.map((user) => (
        <div key={user._id} className="order-card">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ))}

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

      <h3>Inventory</h3>
      {hampers.map((hamper) => (
        <div key={hamper._id} className="order-card">
          <p><strong>Name:</strong> {hamper.name}</p>
          <p><strong>Description:</strong> {hamper.description}</p>
          <p><strong>Price:</strong> ${hamper.price}</p>
          <p><strong>Stock:</strong> {hamper.stock}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
