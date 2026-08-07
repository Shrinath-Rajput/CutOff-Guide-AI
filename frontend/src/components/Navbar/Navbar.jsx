import { Link, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ title, backTo = '/welcome' }) => {
  const location = useLocation();

  return (
    <nav className="topbar">
      <Link to={backTo} className={`nav-back ${location.pathname === '/' ? 'hidden' : ''}`}>
        <FiArrowLeft />
      </Link>
      <span className="nav-title">{title}</span>
      <div className="nav-spacer" />
    </nav>
  );
};

export default Navbar;
