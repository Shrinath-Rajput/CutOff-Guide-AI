import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import './Onboarding.css';

const steps = ['Personal', 'Academic', 'Preferences', 'Prediction'];

const Onboarding = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [form, setForm] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    branch: '',
    score: '',
    category: '',
  });

  const currentLabel = useMemo(() => steps[activeStep - 1], [activeStep]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (activeStep < steps.length) {
      setActiveStep((prev) => prev + 1);
      return;
    }
    navigate('/home');
  };

  const handleBack = () => {
    if (activeStep === 1) {
      navigate('/home');
      return;
    }
    setActiveStep((prev) => prev - 1);
  };

  return (
    <div className="page-shell onboarding-shell">
      <Card className="auth-card onboarding-card">
        <div className="onboarding-header">
          <div>
            <p className="eyebrow">Student Onboarding</p>
            <h2>Build your admission profile in minutes</h2>
            <p className="subtext">
              Complete the onboarding flow to unlock smarter college match recommendations and predictive cutoffs.
            </p>
          </div>
          <div className="onboarding-badge">Step {activeStep} of {steps.length}</div>
        </div>

        <div className="onboarding-progress">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          <div className="progress-labels">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const state = stepNumber === activeStep ? 'active' : stepNumber < activeStep ? 'done' : 'idle';
              return (
                <div key={step} className={`step-pill ${state}`}>
                  <div className="step-dot">{stepNumber}</div>
                  <span>{step}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="onboarding-form-shell">
          <div className="onboarding-step-label">{currentLabel} Information</div>
          <form className="onboarding-form">
            <div className="form-grid">
              <label className="field-group">
                <span className="field-label">Full Name</span>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Aarav Sharma"
                />
              </label>
              <label className="field-group">
                <span className="field-label">Email Address</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </label>
              <label className="field-group">
                <span className="field-label">Phone Number</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                />
              </label>
              <label className="field-group">
                <span className="field-label">Preferred Branch</span>
                <input
                  type="text"
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  placeholder="Engineering, MBA, Medical"
                />
              </label>
              <label className="field-group">
                <span className="field-label">Expected Score</span>
                <input
                  type="text"
                  name="score"
                  value={form.score}
                  onChange={handleChange}
                  placeholder="630 / 720"
                />
              </label>
              <label className="field-group">
                <span className="field-label">Reservation Category</span>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Open / OBC / EWS"
                />
              </label>
            </div>
          </form>
        </div>

        <div className="onboarding-actions">
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" onClick={handleContinue}>
            {activeStep < steps.length ? 'Continue' : 'Finish Onboarding'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
