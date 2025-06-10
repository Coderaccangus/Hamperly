import React, { useEffect, useState } from 'react';
import './Styles.css';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [hampers, setHampers] = useState([]);
  const [selectedHamper, setSelectedHamper] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderMessage, setOrderMessage] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchHampers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hampers');
        const data = await response.json();
        setHampers(data);
      } catch (err) {
        console.error('Failed to fetch hampers:', err);
      }
    };

    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchHampers();
    fetchOrders();
  }, []);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!selectedHamper) {
      setOrderMessage('Please select a hamper.');
      return;
    }

    const hamper = hampers.find(h => h._id === selectedHamper);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          hamper: hamper._id,
          totalPrice: hamper.price * quantity,
          quantity: quantity
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create order');

      const newOrder = {
        ...data,
        hamper: hamper,
        orderDate: new Date().toISOString()
      };

      setOrders([newOrder, ...orders]);
      setOrderMessage(`Order placed for "${hamper.name}" x${quantity}!`);
      setSelectedHamper('');
      setQuantity(1);
    } catch (err) {
      setOrderMessage(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/user-login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>User Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <form onSubmit={handleOrderSubmit} className="form">
        <label htmlFor="hamper">Choose a hamper:</label>
        <select
          id="hamper"
          value={selectedHamper}
          onChange={(e) => setSelectedHamper(e.target.value)}
        >
          <option value="">-- Select a hamper --</option>
          {hampers.map((hamper) => (
            <option key={hamper._id} value={hamper._id}>
              {hamper.name} (${hamper.price.toFixed(2)} | Stock: {hamper.stock})
            </option>
          ))}
        </select>

        {selectedHamper && (
          <>
            <p className="hamper-description">
              {hampers.find(h => h._id === selectedHamper)?.description}
            </p>

            <label htmlFor="quantity">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[...Array(hampers.find(h => h._id === selectedHamper)?.stock || 0).keys()].map(n => (
                <option key={n + 1} value={n + 1}>{n + 1}</option>
              ))}
            </select>

            <p className="summary-text">
              Total Price: ${
                (hampers.find((h) => h._id === selectedHamper)?.price * quantity).toFixed(2)
              }
            </p>
          </>
        )}

        <button type="submit" className="landing-button">Place Order</button>
      </form>

      {orderMessage && <p className="success-text">{orderMessage}</p>}

      <h3>Your Previous Orders</h3>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Hamper</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4">No previous orders found.</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.hamper?.name || 'Unknown'}</td>
                <td>{order.quantity}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
