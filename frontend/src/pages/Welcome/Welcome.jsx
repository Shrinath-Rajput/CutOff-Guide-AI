import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const stats = [
  { value: '500+', label: 'Elite Colleges' },
  { value: '95%', label: 'Prediction Accuracy' },
  { value: '120K+', label: 'Successful Students' },
];

const features = [
  {
    icon: 'target',
    title: 'AI Predictor',
    description: 'Calculate your true admission chances based on historical cutoff data and real-time trends.',
  },
  {
    icon: 'explore',
    title: 'Discovery Engine',
    description: 'Uncover hidden gem institutions that perfectly align with your academic profile and career goals.',
  },
  {
    icon: 'compare_arrows',
    title: 'Smart Compare',
    description: 'Evaluate multiple colleges side-by-side using over 50 metric points from ROI to campus life.',
  },
];

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-shell">
      <header className="welcome-topbar">
        <button type="button" className="icon-button" aria-label="Menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="welcome-brand">Cut-Off Guide AI</div>
        <button type="button" className="icon-button" aria-label="Search">
          <span className="material-symbols-outlined">search</span>
        </button>
      </header>

      <main className="welcome-canvas">
        <section className="hero-panel">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="material-symbols-outlined fill-icon">temp_preferences_custom</span>
              AI POWERED
            </div>
            <h1>Your Future.<br />Your College.<br />Your Choice.</h1>
            <p>
              Navigate the complexities of elite higher education admissions with precision. Our AI-driven intelligence provides clarity, not just data.
            </p>
            <div className="hero-actions">
              <button type="button" className="hero-cta hero-cta--primary" onClick={() => navigate('/login')}>
                Start Your Journey
              </button>
              <button type="button" className="hero-cta hero-cta--secondary" onClick={() => navigate('/colleges')}>
                Explore Colleges
              </button>
            </div>
            <div className="hero-stats">
              {stats.map((item) => (
                <div key={item.label} className="hero-stat">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBTmnfvvw6sQtUDMxSBbwM9pLOQ05foYgSF8JFMhoHEl9W55_nffqcH5yKGi5xTcgt29Wl0R9i9Xk7kfcjk3oHJazQkVAnh2GQPGwiwFrEuBHk3h1rEBSxSMARuwow_Q0VJrjo0E8w6arK9c6Ha26ieheJL5Fwpch5Gk4yE9jH5ytELuKfn1vH6ropmjMK4P1BIkxmmXzfJsSvazK4uSfzO4fXy-6jPFC8Duv-vv8NoeI_rVpYcuKj"
                alt="Elite college campus"
              />
              <div className="hero-glass-card">
                <div>
                  <div className="glass-label">AI Insight</div>
                  <p>Admission Probability High</p>
                </div>
                <div className="glass-icon">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined">{feature.icon}</span>
              </div>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="process-section">
          <div className="process-heading">
            <h2>The Methodology</h2>
            <p>A structured, data-driven path from confusion to conviction.</p>
          </div>
          <div className="process-steps">
            {[
              { label: 'Profile', detail: 'Input scores & preferences.' },
              { label: 'Analysis', detail: 'AI cross-references data.' },
              { label: 'Prediction', detail: 'Generate probability matrix.' },
              { label: 'Matching', detail: 'Filter by strict criteria.' },
              { label: 'Recommend', detail: 'Final curated list.' },
            ].map((step, index) => (
              <div key={step.label} className={`process-step ${index === 2 ? 'process-step--active' : ''}`}>
                <div className="process-step__index">0{index + 1}</div>
                <div>
                  <h4>{step.label}</h4>
                  <p>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="welcome-footer">
        <p>© 2026 Cut-Off Guide AI. Premium Academic Intelligence.</p>
        <div className="footer-actions">
          <button type="button" onClick={() => navigate('/terms')}>Terms of Service</button>
          <button type="button" onClick={() => navigate('/about')}>About</button>
          <button type="button" onClick={() => navigate('/contact')}>Contact</button>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
