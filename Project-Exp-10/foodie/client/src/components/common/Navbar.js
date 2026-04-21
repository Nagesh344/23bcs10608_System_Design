import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          🍕 <span>Foodie</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
          <Link to="/restaurants" className={isActive('/restaurants') ? 'active' : ''}>Restaurants</Link>
          {user && <Link to="/orders" className={isActive('/orders') ? 'active' : ''}>My Orders</Link>}
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/cart" className="cart-btn">
                🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <div className="user-menu">
                <button className="user-btn" onClick={() => setMenuOpen(!menuOpen)}>
                  <span className="user-avatar">{user.name[0]}</span>
                  <span>{user.name.split(' ')[0]}</span>
                  <span>▾</span>
                </button>
                {menuOpen && (
                  <div className="dropdown">
                    <Link to="/profile" onClick={() => setMenuOpen(false)}>👤 Profile</Link>
                    <Link to="/orders" onClick={() => setMenuOpen(false)}>📦 Orders</Link>
                    <button onClick={handleLogout}>🚪 Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ padding: '8px 20px' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 20px' }}>Sign Up</Link>
            </>
          )}
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/restaurants" onClick={() => setMenuOpen(false)}>Restaurants</Link>
          {user ? (
            <>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart {cartCount > 0 && `(${cartCount})`}</Link>
              <Link to="/orders" onClick={() => setMenuOpen(false)}>My Orders</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
