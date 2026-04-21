import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Checkout.css';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [address, setAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    zip: user?.address?.zip || '',
  });
  const [notes, setNotes] = useState('');

  const DELIVERY_FEE = 2.99;
  const TAX = cartTotal * 0.1;
  const GRAND_TOTAL = cartTotal + DELIVERY_FEE + TAX;

  // Determine restaurant from cart
  const restaurantId = cart[0]?.menuItem?.restaurant;

  const handleOrder = async () => {
    if (!address.street || !address.city || !address.zip) {
      toast.error('Please fill in all address fields'); return;
    }
    setLoading(true);
    try {
      const items = cart.map(c => ({
        menuItem: c.menuItem._id,
        name: c.menuItem.name,
        price: c.menuItem.price,
        quantity: c.quantity,
      }));
      const { data } = await axios.post('/api/orders', {
        restaurant: restaurantId,
        items,
        totalAmount: GRAND_TOTAL,
        deliveryFee: DELIVERY_FEE,
        deliveryAddress: address,
        paymentMethod,
        notes,
      });
      await clearCart();
      toast.success('🎉 Order placed successfully!');
      navigate(`/orders/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) { navigate('/cart'); return null; }

  return (
    <div className="checkout-page container">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <div className="checkout-form">
          <section className="form-section">
            <h3>📍 Delivery Address</h3>
            <div className="form-group">
              <label>Street Address</label>
              <input placeholder="123 Main St, Apt 4B" value={address.street}
                onChange={e => setAddress({ ...address, street: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input placeholder="New York" value={address.city}
                  onChange={e => setAddress({ ...address, city: e.target.value })} />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input placeholder="10001" value={address.zip}
                  onChange={e => setAddress({ ...address, zip: e.target.value })} />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3>💳 Payment Method</h3>
            <div className="payment-options">
              {['cod', 'card'].map(method => (
                <label key={method} className={`payment-option ${paymentMethod === method ? 'selected' : ''}`}>
                  <input type="radio" name="payment" value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)} />
                  {method === 'cod' ? '💵 Cash on Delivery' : '💳 Pay by Card'}
                </label>
              ))}
            </div>
            {paymentMethod === 'card' && (
              <div className="card-note">ℹ️ Card payment integration requires Stripe setup. Defaulting to COD for demo.</div>
            )}
          </section>

          <section className="form-section">
            <h3>📝 Order Notes (Optional)</h3>
            <textarea placeholder="E.g. No onions, extra sauce..." rows={3}
              value={notes} onChange={e => setNotes(e.target.value)} />
          </section>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-items">
            {cart.map(({ menuItem, quantity }) => (
              <div key={menuItem._id} className="checkout-item">
                <span>{menuItem.name} × {quantity}</span>
                <span>${(menuItem.price * quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="divider" />
          <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Delivery</span><span>${DELIVERY_FEE.toFixed(2)}</span></div>
          <div className="summary-row"><span>Tax (10%)</span><span>${TAX.toFixed(2)}</span></div>
          <div className="summary-row total"><span>Total</span><span>${GRAND_TOTAL.toFixed(2)}</span></div>

          <button className="btn btn-primary place-order-btn" onClick={handleOrder} disabled={loading}>
            {loading ? 'Placing Order...' : `🚀 Place Order • $${GRAND_TOTAL.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
