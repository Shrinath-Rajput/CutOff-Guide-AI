import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-column footer-brand">
          <h3>Cutoff Guide AI</h3>
          <p>© 2024 Cutoff Guide AI. Empowering academic excellence.</p>
        </div>

        <div className="footer-column">
          <h4>Product</h4>
          <Link to="/colleges">Colleges</Link>
          <Link to="/cutoff">Predictor</Link>
          <Link to="/assistant">AI Assistant</Link>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <a href="#">Careers</a>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <Link to="/contact">Help Center</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
