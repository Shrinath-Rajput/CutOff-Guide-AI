import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  return (
    <div className="page-shell login-shell">
      <Card className="auth-card">
        <Navbar title="Dashboard" backTo="/home" />
        <div className="auth-heading">
          <h2>Welcome, {currentUser?.name || 'Guest'}</h2>
          <p>
            You are signed in with{' '}
            {currentUser?.provider === 'guest'
              ? 'guest access'
              : currentUser?.provider === 'google'
              ? 'Google'
              : 'phone OTP'}.
          </p>
        </div>
        <div className="action-stack">
          <Button variant="primary" fullWidth onClick={() => navigate('/home')}>
            Open Premium Home
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/profile')}>
            View Profile
          </Button>
          <Button
            variant="ghost"
            fullWidth
            onClick={async () => {
              await logout();
              navigate('/welcome');
            }}
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
