import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './MenuItemCard.css';

export default function MenuItemCard({ item, restaurantId }) {
  const { user } = useAuth();
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const cartItem = cart.find(c => c.menuItem?._id === item._id);

  const handleAdd = async () => {
    if (!user) { navigate('/login'); return; }
    setLoading(true);
    const result = await addToCart(item, restaurantId);
    setLoading(false);
    if (result?.conflict) {
      toast.error('Your cart has items from another restaurant. Clear cart first.');
    } else if (result?.success) {
      toast.success(`${item.name} added to cart!`);
    } else {
      toast.error(result?.error || 'Failed to add item');
    }
  };

  return (
    <div className="menu-card">
      <div className="menu-card-info">
        <div className="menu-card-header">
          <span className={`veg-dot ${item.isVeg ? 'veg' : 'nonveg'}`} title={item.isVeg ? 'Veg' : 'Non-Veg'} />
          <h4>{item.name}</h4>
        </div>
        <p className="menu-price">${item.price.toFixed(2)}</p>
        <p className="menu-desc">{item.description}</p>

        {cartItem ? (
          <div className="in-cart-badge">✓ In Cart ({cartItem.quantity})</div>
        ) : (
          <button className="add-btn" onClick={handleAdd} disabled={loading || !item.isAvailable}>
            {loading ? '...' : !item.isAvailable ? 'Unavailable' : '+ Add'}
          </button>
        )}
      </div>

      {item.image && (
        <div className="menu-card-img">
          <img src={item.image} alt={item.name}
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'; }} />
        </div>
      )}
    </div>
  );
}
