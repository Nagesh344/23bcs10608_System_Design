import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './OrderDetail.css';

const STEPS = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];

const STATUS_LABELS = {
  pending: 'Order Placed',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  out_for_delivery: 'On the Way',
  delivered: 'Delivered',
};

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/orders/${id}`)
      .then(r => setOrder(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-loader"><div className="spinner" /></div>;
  if (!order) return <div className="container" style={{ padding: 60 }}>Order not found. <Link to="/orders">Back</Link></div>;

  const stepIndex = STEPS.indexOf(order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="order-detail container">
      <div className="order-detail-header">
        <Link to="/orders" className="back-link">← My Orders</Link>
        <div>
          <h1>Order Details</h1>
          <p className="order-id">Order #{order._id.slice(-8).toUpperCase()}</p>
        </div>
      </div>

      {/* Progress Tracker */}
      {!isCancelled ? (
        <div className="progress-tracker">
          {STEPS.map((step, i) => (
            <div key={step} className={`progress-step ${i <= stepIndex ? 'done' : ''} ${i === stepIndex ? 'active' : ''}`}>
              <div className="step-circle">
                {i <= stepIndex ? '✓' : i + 1}
              </div>
              <span>{STATUS_LABELS[step]}</span>
              {i < STEPS.length - 1 && <div className={`step-line ${i < stepIndex ? 'done' : ''}`} />}
            </div>
          ))}
        </div>
      ) : (
        <div className="cancelled-banner">❌ This order was cancelled</div>
      )}

      <div className="order-detail-layout">
        {/* Items */}
        <div className="order-items-section">
          <h3>Items Ordered</h3>
          <div className="order-items-list">
            {order.items.map((item, i) => (
              <div key={i} className="order-item-row">
                <span className="item-qty">{item.quantity}×</span>
                <span className="item-name">{item.name}</span>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row"><span>Subtotal</span><span>${(order.totalAmount - order.deliveryFee - (order.totalAmount - order.deliveryFee) * 0.1 / 1.1).toFixed(2)}</span></div>
            <div className="total-row"><span>Delivery Fee</span><span>${order.deliveryFee?.toFixed(2)}</span></div>
            <div className="total-row bold"><span>Total</span><span>${order.totalAmount.toFixed(2)}</span></div>
          </div>
        </div>

        {/* Info */}
        <div className="order-info-section">
          <div className="info-card">
            <h4>📍 Delivery Address</h4>
            <p>{order.deliveryAddress?.street}</p>
            <p>{order.deliveryAddress?.city}, {order.deliveryAddress?.zip}</p>
          </div>

          <div className="info-card">
            <h4>💳 Payment</h4>
            <p>{order.paymentMethod === 'cod' ? '💵 Cash on Delivery' : '💳 Card'}</p>
            <p>Status: <strong>{order.paymentStatus}</strong></p>
          </div>

          <div className="info-card">
            <h4>🏪 Restaurant</h4>
            <p>{order.restaurant?.name}</p>
            <p>Est. delivery: {order.restaurant?.deliveryTime || order.estimatedDelivery}</p>
          </div>

          {order.notes && (
            <div className="info-card">
              <h4>📝 Notes</h4>
              <p>{order.notes}</p>
            </div>
          )}

          <div className="info-card">
            <h4>🕐 Ordered At</h4>
            <p>{new Date(order.createdAt).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <Link to="/restaurants" className="btn btn-primary">Order Again 🍕</Link>
      </div>
    </div>
  );
}
