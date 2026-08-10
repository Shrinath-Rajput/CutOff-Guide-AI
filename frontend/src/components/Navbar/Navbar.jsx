import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMenu, FiX, FiSearch, FiUser, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ title, backTo = '/welcome' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (title) {
    return (
      <nav className="topbar auth-nav">
        <button type="button" className="nav-back" onClick={() => navigate(backTo)}>
          <FiArrowLeft />
        </button>
        <span className="nav-title">{title}</span>
        <div className="nav-spacer" />
      </nav>
    );
  }

  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <Link to="/home" className="brand-link">
          <span className="brand-mark">C</span>
          <div>
            <strong>CutOff Guide AI</strong>
            <span>Admission Platform</span>
          </div>
        </Link>

        <nav className={`site-menu ${mobileOpen ? 'open' : ''}`}>
          <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link to="/colleges" className={location.pathname === '/colleges' ? 'active' : ''}>Colleges</Link>
          <Link to="/compare" className={location.pathname === '/compare' ? 'active' : ''}>Compare</Link>
          <Link to="/cutoff" className={location.pathname === '/cutoff' ? 'active' : ''}>Cutoff / Result</Link>
          <Link to="/assistant" className={location.pathname === '/assistant' ? 'active' : ''}>AI Assistant</Link>
          <Link to="/saved" className={location.pathname === '/saved' ? 'active' : ''}>Saved Colleges</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </nav>

        <div className="navbar-actions">
          <button className="navbar-search" type="button" aria-label="Search">
            <FiSearch />
          </button>
          {isAuthenticated ? (
            <button className="navbar-profile" type="button" onClick={() => navigate('/profile')}>
              <FiUser />
              <span>{currentUser?.name?.split(' ')[0] || 'Profile'}</span>
              <FiChevronDown />
            </button>
          ) : (
            <Link to="/welcome" className="signin-link">
              Login / Signup
            </Link>
          )}
          <button type="button" className="mobile-toggle" onClick={() => setMobileOpen((prev) => !prev)}>
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
