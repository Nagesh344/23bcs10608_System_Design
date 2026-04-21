import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import './Home.css';

const CATEGORIES = [
  { label: 'Burgers', emoji: '🍔', cuisine: 'Burgers' },
  { label: 'Pizza', emoji: '🍕', cuisine: 'Pizza' },
  { label: 'Sushi', emoji: '🍣', cuisine: 'Sushi' },
  { label: 'Tacos', emoji: '🌮', cuisine: 'Tacos' },
  { label: 'Healthy', emoji: '🥗', cuisine: 'Healthy' },
  { label: 'Italian', emoji: '🍝', cuisine: 'Italian' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/restaurants?featured=true')
      .then(r => setFeatured(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/restaurants?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content container">
          <div className="hero-text">
            <span className="hero-tag">🚀 Fast Delivery in 30 mins</span>
            <h1>Craving something <span className="hero-accent">delicious?</span></h1>
            <p>Order from the best local restaurants and get food delivered to your door in minutes.</p>

            <form className="search-bar" onSubmit={handleSearch}>
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search restaurants or cuisines..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>

            <div className="hero-stats">
              <div><strong>500+</strong><span>Restaurants</span></div>
              <div><strong>30 min</strong><span>Avg. Delivery</span></div>
              <div><strong>50k+</strong><span>Happy Customers</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-img-wrap">
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=500&fit=crop" alt="Delicious food" />
              <div className="hero-float hero-float-1">🍕 Pizza just ordered!</div>
              <div className="hero-float hero-float-2">⭐ 4.9 Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories container">
        <h2>What are you craving?</h2>
        <div className="categories-grid">
          {CATEGORIES.map(cat => (
            <Link key={cat.label} to={`/restaurants?cuisine=${cat.cuisine}`} className="category-chip">
              <span className="cat-emoji">{cat.emoji}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="featured container">
        <div className="section-header">
          <h2>Featured Restaurants</h2>
          <Link to="/restaurants" className="see-all">See All →</Link>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : (
          <div className="restaurants-grid">
            {featured.map(r => <RestaurantCard key={r._id} restaurant={r} />)}
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="cta-banner container">
        <div className="cta-inner">
          <div>
            <h2>Hungry? We've got you covered.</h2>
            <p>Sign up and get 20% off your first order.</p>
          </div>
          <Link to="/register" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
