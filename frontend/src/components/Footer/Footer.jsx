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
          <Link to="/compare">Compare</Link>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <a href="#careers">Careers</a>
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <Link to="/terms">Terms &amp; Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
