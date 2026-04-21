import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './Cart.css';

export default function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const DELIVERY_FEE = 2.99;
  const TAX = cartTotal * 0.1;
  const GRAND_TOTAL = cartTotal + DELIVERY_FEE + TAX;

  if (cart.length === 0) return (
    <div className="empty-cart container">
      <div className="empty-cart-inner">
        <span>🛒</span>
        <h2>Your cart is empty</h2>
        <p>Add items from a restaurant to get started</p>
        <Link to="/restaurants" className="btn btn-primary">Browse Restaurants</Link>
      </div>
    </div>
  );

  return (
    <div className="cart-page container">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <button className="clear-btn" onClick={async () => { await clearCart(); toast.success('Cart cleared'); }}>
          🗑 Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(({ menuItem, quantity }) => (
            <div key={menuItem._id} className="cart-item">
              {menuItem.image && (
                <img src={menuItem.image} alt={menuItem.name}
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'; }} />
              )}
              <div className="cart-item-info">
                <h4>{menuItem.name}</h4>
                <p>${menuItem.price.toFixed(2)} each</p>
              </div>
              <div className="qty-controls">
                <button onClick={() => updateQuantity(menuItem._id, quantity - 1)}>−</button>
                <span>{quantity}</span>
                <button onClick={() => updateQuantity(menuItem._id, quantity + 1)}>+</button>
              </div>
              <div className="cart-item-total">
                ${(menuItem.price * quantity).toFixed(2)}
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(menuItem._id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Delivery Fee</span><span>${DELIVERY_FEE.toFixed(2)}</span></div>
          <div className="summary-row"><span>Tax (10%)</span><span>${TAX.toFixed(2)}</span></div>
          <div className="summary-row total"><span>Total</span><span>${GRAND_TOTAL.toFixed(2)}</span></div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
            onClick={() => navigate('/checkout')}>
            Proceed to Checkout →
          </button>
          <Link to="/restaurants" style={{ display: 'block', textAlign: 'center', marginTop: 12, fontSize: 14, color: 'var(--text-muted)' }}>
            + Add more items
          </Link>
        </div>
      </div>
    </div>
  );
}
