import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiChevronRight } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-widgets">
        <div className="footer-brand">
          <span className="footer-logo">C</span>
          <div>
            <h3>CutOff Guide AI</h3>
            <p>Premium college admission guidance tailored for your future.</p>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Quick Links</h4>
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/colleges">Colleges</Link>
            <Link to="/compare">Compare</Link>
          </div>
          <div>
            <h4>Resources</h4>
            <Link to="/cutoff">Cutoff & Result</Link>
            <Link to="/assistant">AI Assistant</Link>
            <Link to="/saved">Saved Colleges</Link>
            <Link to="/history">History</Link>
          </div>
          <div>
            <h4>Support</h4>
            <Link to="/contact">Contact</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>
            <FiMail /> <a href="mailto:hello@cutoffguide.ai">hello@cutoffguide.ai</a>
          </p>
          <p>
            <FiPhone /> <a href="tel:+911234567890">+91 12345 67890</a>
          </p>
          <p>
            <FiMapPin /> Pune, Maharashtra, India
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CutOff Guide AI. All rights reserved.</p>
        <div className="footer-socials">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <FiChevronRight /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram <FiChevronRight /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
