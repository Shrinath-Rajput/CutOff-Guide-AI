import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';
import OTPinput from '../../components/OTPinput/OTPinput';
import './OTP.css';

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((value) => value - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    if (otp.length === 6) {
      navigate('/welcome');
    }
  };

  return (
    <div className="page-shell otp-shell">
      <Card className="auth-card otp-card">
        <Navbar title="Verify OTP" backTo="/login" />
        <div className="auth-heading">
          <h2>Enter the 6-digit code</h2>
          <p>We sent a secure verification code to your phone.</p>
        </div>

        <OTPinput value={otp} onChange={setOtp} />

        <div className="otp-meta">
          <span>Resend in 00:{timer < 10 ? `0${timer}` : timer}</span>
          <button className="link-button" type="button" onClick={() => setTimer(30)}>
            Resend OTP
          </button>
        </div>

        <Button variant="primary" fullWidth onClick={handleVerify}>
          Verify
        </Button>
        <Button variant="ghost" fullWidth onClick={() => navigate('/login')}>
          Back
        </Button>
      </Card>
    </div>
  );
};

export default OTP;
