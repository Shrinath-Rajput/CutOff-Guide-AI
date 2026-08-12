import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { sendOtp } from '../../services/api';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Navbar from '../../components/Navbar/Navbar';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isGoogleSigning, setIsGoogleSigning] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'phone') {
      const normalizedValue = value.replace(/\D/g, '').slice(0, 10);
      setForm((prev) => ({ ...prev, phone: normalizedValue }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email';
    if (!/^[0-9]{10}$/.test(form.phone)) nextErrors.phone = 'Enter a valid 10-digit phone number';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSending(true);
    const phoneNumber = `+91${form.phone}`;

    try {
      const response = await sendOtp({
        name: form.fullName.trim(),
        email: form.email.trim(),
        phone: phoneNumber,
      });

      if (response?.status !== 'success') {
        throw new Error(response?.message || 'Unable to send OTP. Please try again.');
      }

      sessionStorage.setItem(
        'auth_pending_user',
        JSON.stringify({
          name: form.fullName.trim(),
          email: form.email.trim(),
        })
      );
      sessionStorage.setItem('auth_pending_phone', phoneNumber);
      if (response?.sessionId) {
        sessionStorage.setItem('auth_pending_otp_session_id', response.sessionId);
      }

      toast.success('OTP sent successfully');
      navigate('/otp');
    } catch (error) {
      console.error('OTP send error', error);
      const errorMessage =
        error?.response?.data?.message || error?.message || 'Unable to send OTP. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleSigning(true);
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    const url = `${apiBase}/api/auth/google`;

    try {
      // Quick probe: if backend is not configured it returns 501 JSON.
      const resp = await fetch(url, { method: 'GET', credentials: 'include', redirect: 'manual' });

      if (resp && resp.status === 501) {
        const data = await resp.json().catch(() => null);
        const message = (data && data.message) || 'Google sign-in is not configured yet. Please contact the administrator.';
        toast.error(message);
        return;
      }

      // Otherwise navigate so the backend can redirect to the provider (or to company auth URL).
      window.location.href = url;
    } catch (err) {
      // Some browsers block cross-origin fetch after redirect; fall back to direct navigation.
      try {
        window.location.href = url;
      } catch (e) {
        toast.error('Google sign-in is not configured yet. Please contact the administrator.');
      }
    } finally {
      setIsGoogleSigning(false);
    }
  };

  return (
    <div className="page-shell login-shell">
      <Card className="auth-card">
        <Navbar title="Create Account" backTo="/welcome" />
        <div className="auth-heading">
          <h2>Let’s get you started</h2>
          <p>Secure your seat with a premium onboarding experience.</p>
        </div>

        <div className="social-auth">
          <Button
            variant="ghost"
            fullWidth
            onClick={handleGoogleSignIn}
            disabled={isGoogleSigning}
            icon={<FaGoogle />}
          >
            {isGoogleSigning ? 'Redirecting...' : 'Continue with Google'}
          </Button>

          <div className="or-separator">OR</div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Aarav Sharma"
            icon={<FiUser />}
            error={errors.fullName}
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            icon={<FiMail />}
            error={errors.email}
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
            icon={<FiPhone />}
            error={errors.phone}
          />

          <Button variant="primary" fullWidth type="submit" disabled={isSending}>
            {isSending ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </form>

        <p className="auth-terms">
          By continuing, you agree to our <span onClick={() => navigate('/terms')}>Terms of Service</span> and <span onClick={() => navigate('/contact')}>Privacy Policy</span>.
        </p>
      </Card>
    </div>
  );
};

export default Login;
