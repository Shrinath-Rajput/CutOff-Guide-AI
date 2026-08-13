import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="fourise-footer">
      <div className="footer-container">
        {/* ===== BRAND SECTION ===== */}
        <div className="footer-section footer-brand-section">
          <div className="footer-brand-logo">
            <span className="fourise-logo">FOURISE</span>
            <span className="fourise-tagline">Software Solutions Pvt. Ltd.</span>
          </div>
          <p className="footer-brand-description">
            Empowering academic excellence through AI-driven college admission insights.
          </p>
        </div>

        {/* ===== CONTACT SECTION ===== */}
        <div className="footer-section footer-contact-section">
          <h3 className="footer-section-title">Contact Information</h3>
          <div className="footer-contact-grid">
            {/* Website */}
            <div className="contact-item">
              <span className="contact-icon material-symbols-outlined">language</span>
              <div className="contact-content">
                <span className="contact-label">Website</span>
                <a href="https://www.fouriseindia.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                  www.fouriseindia.com
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="contact-item">
              <span className="contact-icon material-symbols-outlined">mail</span>
              <div className="contact-content">
                <span className="contact-label">Email</span>
                <a href="mailto:hr@fouriseindia.com" className="contact-link">
                  hr@fouriseindia.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-item">
              <span className="contact-icon material-symbols-outlined">phone</span>
              <div className="contact-content">
                <span className="contact-label">Phone</span>
                <a href="tel:9527605805" className="contact-link">
                  9527605805 / 7020759254
                </a>
              </div>
            </div>

            {/* Office Address */}
            <div className="contact-item">
              <span className="contact-icon material-symbols-outlined">location_on</span>
              <div className="contact-content">
                <span className="contact-label">Office Address</span>
                <span className="contact-text">
                  A-305, City Vista, Downtown Road,
                  <br />
                  Ashoka Nagar, Kharadi, Pune 411014
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== CORPORATE INFORMATION SECTION ===== */}
        <div className="footer-section footer-corporate-section">
          <h3 className="footer-section-title">Corporate Information</h3>
          <div className="corporate-info-grid">
            <div className="corporate-info-item">
              <span className="corporate-label">GST</span>
              <span className="corporate-value">27AAFCF4062R1Z3</span>
            </div>
            <div className="corporate-info-item">
              <span className="corporate-label">CIN</span>
              <span className="corporate-value">U62099PN2023PTC218917</span>
            </div>
          </div>
        </div>

        {/* ===== QUICK LINKS SECTION ===== */}
        <div className="footer-section footer-links-section">
          <h3 className="footer-section-title">Quick Links</h3>
          <div className="footer-links-grid">
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/terms" className="footer-link">Terms &amp; Conditions</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* ===== FOOTER BOTTOM / COPYRIGHT ===== */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            &copy; 2024 FOURISE Software Solutions Pvt. Ltd. All rights reserved.
          </p>
          <p className="footer-disclaimer">
            Cutoff Guide AI is a product of FOURISE Software Solutions Pvt. Ltd.
          </p>
        </div>
      </div>

      {/* ===== DECORATIVE ORANGE ACCENT ===== */}
      <div className="footer-accent-shape"></div>
    </footer>
  );
};

export default Footer;
