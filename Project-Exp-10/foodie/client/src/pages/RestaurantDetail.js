import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import MenuItemCard from '../components/restaurant/MenuItemCard';
import { useCart } from '../context/CartContext';
import './RestaurantDetail.css';

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const { cartCount, cartTotal } = useCart();

  useEffect(() => {
    Promise.all([
      axios.get(`/api/restaurants/${id}`),
      axios.get(`/api/menu/restaurant/${id}`)
    ]).then(([rRes, mRes]) => {
      setRestaurant(rRes.data);
      setMenu(mRes.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-loader"><div className="spinner" /></div>;
  if (!restaurant) return <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>Restaurant not found. <Link to="/restaurants">Back</Link></div>;

  const categories = ['All', ...new Set(menu.map(i => i.category))];
  const filteredMenu = activeCategory === 'All' ? menu : menu.filter(i => i.category === activeCategory);

  return (
    <div className="rest-detail">
      <div className="rest-hero" style={{ backgroundImage: `url(${restaurant.image || ''})` }}>
        <div className="rest-hero-overlay" />
        <div className="container rest-hero-content">
          <Link to="/restaurants" className="back-btn">← Back</Link>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          <div className="rest-meta">
            <span>⭐ {restaurant.rating} ({restaurant.reviewCount} reviews)</span>
            <span>🕐 {restaurant.deliveryTime}</span>
            <span>🛵 ${restaurant.deliveryFee} delivery</span>
            <span>💵 Min order ${restaurant.minOrder}</span>
            <span className={`status-badge ${restaurant.isOpen ? 'open' : 'closed'}`}>
              {restaurant.isOpen ? '● Open' : '● Closed'}
            </span>
          </div>
        </div>
      </div>

      <div className="container rest-body">
        <div className="menu-section">
          <div className="category-tabs">
            {categories.map(c => (
              <button
                key={c}
                className={`cat-tab ${activeCategory === c ? 'active' : ''}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {filteredMenu.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', padding: '40px 0' }}>No items in this category.</p>
          ) : (
            <div className="menu-grid">
              {filteredMenu.map(item => (
                <MenuItemCard key={item._id} item={item} restaurantId={id} />
              ))}
            </div>
          )}
        </div>

        {cartCount > 0 && (
          <Link to="/cart" className="floating-cart">
            <span>🛒 {cartCount} item{cartCount > 1 ? 's' : ''}</span>
            <span>View Cart → ${cartTotal.toFixed(2)}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
