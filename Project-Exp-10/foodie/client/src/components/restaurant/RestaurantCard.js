import { Link } from 'react-router-dom';
import './RestaurantCard.css';

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant._id}`} className="rest-card">
      <div className="rest-card-img">
        <img
          src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'}
          alt={restaurant.name}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'; }}
        />
        {restaurant.featured && <span className="featured-tag">⭐ Featured</span>}
        {!restaurant.isOpen && <div className="closed-overlay">Closed</div>}
      </div>

      <div className="rest-card-body">
        <div className="rest-card-header">
          <h3>{restaurant.name}</h3>
          <span className="rating">⭐ {restaurant.rating}</span>
        </div>

        <p className="cuisine">{restaurant.cuisine?.join(' • ')}</p>
        <p className="description">{restaurant.description}</p>

        <div className="rest-card-meta">
          <span>🕐 {restaurant.deliveryTime}</span>
          <span>🛵 ${restaurant.deliveryFee} delivery</span>
          <span>💵 Min ${restaurant.minOrder}</span>
        </div>

        {restaurant.tags?.length > 0 && (
          <div className="rest-tags">
            {restaurant.tags.map(tag => (
              <span key={tag} className="rest-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
