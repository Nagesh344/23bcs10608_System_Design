import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import './Restaurants.css';

const CUISINES = ['All', 'Burgers', 'Pizza', 'Sushi', 'Tacos', 'Healthy', 'Italian', 'Mexican', 'Japanese'];

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCuisine, setSelectedCuisine] = useState(searchParams.get('cuisine') || 'All');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (selectedCuisine && selectedCuisine !== 'All') params.append('cuisine', selectedCuisine);

    axios.get(`/api/restaurants?${params}`)
      .then(r => setRestaurants(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, selectedCuisine]);

  const handleSearch = (e) => {
    e.preventDefault();
    const val = e.target.search.value;
    setSearch(val);
  };

  return (
    <div className="restaurants-page">
      <div className="restaurants-header">
        <div className="container">
          <h1>All Restaurants</h1>
          <p>Find your next favourite meal</p>

          <form className="rest-search" onSubmit={handleSearch}>
            <input
              name="search"
              defaultValue={search}
              placeholder="Search by name or cuisine..."
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </div>

      <div className="container">
        <div className="cuisine-filter">
          {CUISINES.map(c => (
            <button
              key={c}
              className={`cuisine-btn ${selectedCuisine === c ? 'active' : ''}`}
              onClick={() => setSelectedCuisine(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="spinner" />
        ) : restaurants.length === 0 ? (
          <div className="empty-state">
            <p>😕 No restaurants found.</p>
            <button className="btn btn-outline" onClick={() => { setSearch(''); setSelectedCuisine('All'); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <p className="results-count">{restaurants.length} restaurants found</p>
            <div className="restaurants-grid">
              {restaurants.map(r => <RestaurantCard key={r._id} restaurant={r} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
