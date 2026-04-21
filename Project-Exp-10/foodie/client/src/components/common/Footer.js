import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">🍕 Foodie</div>
          <p>Delicious food delivered to your door in minutes. Fresh, fast, and always satisfying.</p>
          <div className="footer-social">
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Facebook">f</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Refund Policy</a>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>📧 support@foodie.com</p>
          <p>📞 1-800-FOODIE</p>
          <p>🕐 24/7 Support</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Foodie. All rights reserved. Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
