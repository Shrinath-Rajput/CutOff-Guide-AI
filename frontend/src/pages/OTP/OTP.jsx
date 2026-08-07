import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { auth, createRecaptchaVerifier, sendOtpToPhone } from '../../services/firebase';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';
import OTPinput from '../../components/OTPinput/OTPinput';
import { useAuth } from '../../context/AuthContext';
import './OTP.css';

const OTP = () => {
  const navigate = useNavigate();
  const { registerAndLogin } = useAuth();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const pendingUser = sessionStorage.getItem('auth_pending_user');
  const pendingPhone = sessionStorage.getItem('auth_pending_phone');
  const parsedUser = pendingUser ? JSON.parse(pendingUser) : null;

  useEffect(() => {
    if (!parsedUser || !pendingPhone) {
      navigate('/login');
    }
  }, [navigate, parsedUser, pendingPhone]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((value) => value - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length !== 6 || !window.confirmationResult) {
      toast.error('Invalid OTP');
      return;
    }

    setIsVerifying(true);

    try {
      const credential = await window.confirmationResult.confirm(otp);
      const firebaseUser = credential.user;
      const userPayload = {
        uid: firebaseUser.uid,
        name: parsedUser?.name || firebaseUser.displayName || 'User',
        email: parsedUser?.email || firebaseUser.email || '',
        phone: pendingPhone || firebaseUser.phoneNumber || '',
        provider: 'phone',
        photoURL: firebaseUser.photoURL || '',
      };

      await registerAndLogin(userPayload);
      toast.success('Phone login successful');
      navigate('/home');
    } catch (error) {
      console.error('OTP verify error', error);
      if (error?.code === 'auth/invalid-verification-code') {
        toast.error('Invalid OTP. Please try again.');
      } else if (error?.code === 'auth/code-expired') {
        toast.error('OTP has expired. Please request a new code.');
      } else {
        toast.error(error?.message || 'Unable to verify OTP. Please try again.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || isResending || !pendingPhone) return;
    setIsResending(true);

    try {
      if (window.recaptchaVerifier?.clear) {
        window.recaptchaVerifier.clear();
      }
      const verifier = createRecaptchaVerifier('recaptcha-container', auth);
      const confirmationResult = await sendOtpToPhone(pendingPhone, verifier);
      window.confirmationResult = confirmationResult;
      setTimer(30);
      toast.success('OTP sent successfully');
    } catch (error) {
      console.error('OTP resend error', error);
      toast.error('Unable to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
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
          <button className="link-button" type="button" onClick={handleResend} disabled={timer > 0 || isResending}>
            {isResending ? 'Resending...' : 'Resend OTP'}
          </button>
        </div>

        <div id="recaptcha-container" style={{ display: 'none' }} />
        <Button variant="primary" fullWidth onClick={handleVerify} disabled={isVerifying}>
          {isVerifying ? 'Verifying...' : 'Verify'}
        </Button>
        <Button variant="ghost" fullWidth onClick={() => navigate('/login')}>
          Back
        </Button>
      </Card>
    </div>
  );
};

export default OTP;
