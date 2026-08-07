import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiPhone, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { auth, createRecaptchaVerifier, sendOtpToPhone } from '../../services/firebase';
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
      if (window.recaptchaVerifier?.clear) {
        window.recaptchaVerifier.clear();
      }

      const verifier = createRecaptchaVerifier('recaptcha-container', auth);
      if (!verifier) {
        throw new Error('Unable to initialize phone verification');
      }

      const confirmationResult = await sendOtpToPhone(phoneNumber, verifier);
      window.confirmationResult = confirmationResult;
      sessionStorage.setItem(
        'auth_pending_user',
        JSON.stringify({
          name: form.fullName.trim(),
          email: form.email.trim(),
        })
      );
      sessionStorage.setItem('auth_pending_phone', phoneNumber);
      toast.success('OTP sent successfully');
      navigate('/otp');
    } catch (error) {
      console.error('OTP send error', error);
      const errorMessage =
        error?.code === 'auth/invalid-phone-number'
          ? 'Invalid phone number'
          : error?.message || 'Unable to send OTP. Please try again.';
      toast.error(errorMessage);
      if (window.recaptchaVerifier?.clear) {
        window.recaptchaVerifier.clear();
      }
      window.recaptchaVerifier = null;
      window.confirmationResult = null;
    } finally {
      setIsSending(false);
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

          <div id="recaptcha-container" style={{ display: 'none' }} />
          <Button variant="primary" fullWidth type="submit" disabled={isSending}>
            {isSending ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
