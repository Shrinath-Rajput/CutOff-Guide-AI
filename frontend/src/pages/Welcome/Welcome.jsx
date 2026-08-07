import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiPhone, FiUser, FiChrome } from 'react-icons/fi';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="page-shell welcome-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-stack"
      >
        <Card glow className="welcome-card">
          <div className="hero-copy">
            <span className="eyebrow">AI-guided admissions for Maharashtra</span>
            <h1>Welcome to CutOff Guide AI</h1>
            <p>Your AI Powered Maharashtra Admission Assistant</p>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="dashboard-preview">
              <div className="preview-bar" />
              <div className="preview-block" />
              <div className="preview-block short" />
            </div>
          </div>

          <div className="action-stack">
            <Button variant="primary" fullWidth icon={<FiChrome />} onClick={() => navigate('/login')}>
              Continue with Google
            </Button>
            <Button variant="secondary" fullWidth icon={<FiPhone />} onClick={() => navigate('/login')}>
              Continue with Phone
            </Button>
            <Button variant="ghost" fullWidth icon={<FiUser />} onClick={() => navigate('/login')}>
              Continue as Guest
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Welcome;
