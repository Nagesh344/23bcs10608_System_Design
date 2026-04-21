import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Orders.css';

const STATUS_COLORS = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  preparing: '#8b5cf6',
  out_for_delivery: '#06b6d4',
  delivered: '#22c55e',
  cancelled: '#ef4444',
};

const STATUS_ICONS = {
  pending: '⏳',
  confirmed: '✅',
  preparing: '👨‍🍳',
  out_for_delivery: '🛵',
  delivered: '🎉',
  cancelled: '❌',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/orders/my')
      .then(r => setOrders(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader"><div className="spinner" /></div>;

  return (
    <div className="orders-page container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <span>📦</span>
          <h2>No orders yet</h2>
          <p>Start ordering from your favourite restaurants!</p>
          <Link to="/restaurants" className="btn btn-primary">Browse Restaurants</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <Link to={`/orders/${order._id}`} key={order._id} className="order-card">
              <div className="order-card-left">
                {order.restaurant?.image && (
                  <img src={order.restaurant.image} alt={order.restaurant.name}
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=80'; }} />
                )}
                <div>
                  <h3>{order.restaurant?.name || 'Restaurant'}</h3>
                  <p>{order.items.length} item{order.items.length > 1 ? 's' : ''} • ${order.totalAmount.toFixed(2)}</p>
                  <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <div className="order-card-right">
                <span className="order-status" style={{ color: STATUS_COLORS[order.status] }}>
                  {STATUS_ICONS[order.status]} {order.status.replace(/_/g, ' ')}
                </span>
                <span className="view-details">View Details →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
