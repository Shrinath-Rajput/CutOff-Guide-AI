import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';
import './Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="page-shell profile-shell">
      <Card className="auth-card">
        <Navbar title="Profile" backTo="/home" />
        <div className="auth-heading">
          <h2>{currentUser?.name || 'Student Profile'}</h2>
          <p>{currentUser?.email || 'Your account details are synced securely.'}</p>
        </div>
        <div className="profile-card">
          <div>
            <strong>Provider</strong>
            <p>{currentUser?.provider || 'phone'}</p>
          </div>
          <div>
            <strong>Phone</strong>
            <p>{currentUser?.phone || 'Not provided'}</p>
          </div>
          <div>
            <strong>UID</strong>
            <p>{currentUser?.uid || 'N/A'}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          fullWidth
          onClick={async () => {
            await logout();
            window.location.href = '/welcome';
          }}
        >
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
