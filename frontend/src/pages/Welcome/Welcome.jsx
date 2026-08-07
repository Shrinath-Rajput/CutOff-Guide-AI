import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiPhone, FiUser, FiChrome, FiCpu, FiBookOpen, FiZap } from 'react-icons/fi';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="page-shell welcome-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="hero-stack"
      >
        <Card glow className="welcome-card">
          <div className="brand-mark" aria-label="CutOff Guide AI logo">
            <div className="brand-icon">
              <FiCpu />
              <span className="brand-icon-mini">
                <FiBookOpen />
              </span>
            </div>
            <div className="brand-copy">
              <span className="brand-title">CutOff Guide AI</span>
              <span className="brand-subtitle">AI Admission Companion</span>
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-copy">
              <span className="eyebrow">
                <FiZap /> AI-guided admissions for Maharashtra
              </span>
              <h1>Find your perfect college with clarity.</h1>
              <p>Discover cutoffs, compare options and move through admissions with confidence.</p>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="glow-ring" />
              <div className="particle particle-one" />
              <div className="particle particle-two" />
              <div className="particle particle-three" />
              <div className="dashboard-preview">
                <div className="preview-top">
                  <span className="preview-pill">Live</span>
                  <span className="preview-pill soft">AI Match</span>
                </div>
                <div className="preview-chart">
                  <div className="preview-bar tall" />
                  <div className="preview-bar medium" />
                  <div className="preview-bar short" />
                  <div className="preview-bar tall alt" />
                </div>
                <div className="preview-row">
                  <div className="preview-metric">
                    <strong>94%</strong>
                    <span>Fit Score</span>
                  </div>
                  <div className="preview-metric">
                    <strong>12</strong>
                    <span>Colleges</span>
                  </div>
                </div>
              </div>
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
