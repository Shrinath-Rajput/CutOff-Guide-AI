import MainLayout from '../../components/MainLayout/MainLayout';
import './Terms.css';

const Terms = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainLayout>
      <main className="terms-page">
        {/* Page Header */}
        <div className="terms-header">
          <h1 className="terms-title">Terms & Conditions</h1>
          <p className="terms-date">Last updated: October 26, 2024</p>
        </div>

        {/* Contents Navigation */}
        <nav className="terms-contents-card">
          <h2 className="contents-title">Contents</h2>
          <ul className="contents-list">
            <li>
              <a href="#intro" onClick={(e) => { e.preventDefault(); scrollToSection('intro'); }}>
                1. Introduction
              </a>
            </li>
            <li>
              <a href="#responsibilities" onClick={(e) => { e.preventDefault(); scrollToSection('responsibilities'); }}>
                2. User Responsibilities
              </a>
            </li>
            <li>
              <a href="#ai" onClick={(e) => { e.preventDefault(); scrollToSection('ai'); }}>
                3. AI Disclaimer
              </a>
            </li>
            <li>
              <a href="#privacy" onClick={(e) => { e.preventDefault(); scrollToSection('privacy'); }}>
                4. Privacy Policy
              </a>
            </li>
          </ul>
        </nav>

        {/* Terms Content */}
        <article className="terms-content">
          {/* Section 1: Introduction */}
          <section id="intro" className="terms-section">
            <h2 className="section-title">1. Introduction</h2>
            <p className="section-text">
              Welcome to Cutoff Guide AI. These Terms & Conditions govern your use of our platform, which provides AI-assisted college admission predictions and related data. By accessing or using our services, you agree to be bound by these terms.
            </p>
          </section>

          {/* Section 2: User Responsibilities */}
          <section id="responsibilities" className="terms-section">
            <h2 className="section-title">2. User Responsibilities</h2>
            <p className="section-text">
              As a user of Cutoff Guide AI, you agree to:
            </p>
            <ul className="terms-list">
              <li>Provide accurate information when using our predictive tools.</li>
              <li>Use the platform for personal, non-commercial purposes only.</li>
              <li>Not attempt to reverse engineer or scrape our proprietary datasets.</li>
            </ul>
          </section>

          {/* Section 3: AI Disclaimer */}
          <section id="ai" className="terms-section">
            <h2 className="section-title">3. AI Disclaimer</h2>
            <div className="disclaimer-card">
              <p className="disclaimer-text">
                The predictions provided by Cutoff Guide AI are generated using machine learning models trained on historical data. They are intended for informational purposes only and do not guarantee admission to any institution. Actual admission decisions are made solely by the respective colleges based on their criteria.
              </p>
            </div>
          </section>

          {/* Section 4: Privacy */}
          <section id="privacy" className="terms-section">
            <h2 className="section-title">4. Privacy</h2>
            <p className="section-text">
              Your privacy is important to us. Please review our separate Privacy Policy to understand how we collect, use, and protect your data.
            </p>
          </section>
        </article>
      </main>
    </MainLayout>
  );
};

export default Terms;
