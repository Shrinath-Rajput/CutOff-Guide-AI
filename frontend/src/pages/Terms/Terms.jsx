import MainLayout from '../../components/MainLayout/MainLayout';
import './Terms.css';

const Terms = () => {
  return (
    <MainLayout>
      <section className="page-hero terms-hero">
        <div>
          <span className="eyebrow">Terms of Service</span>
          <h1>Responsible use of CutOff Guide AI</h1>
          <p>Our admission guidance is designed to support your research and planning. Please review the terms before using the platform.</p>
        </div>
      </section>

      <div className="terms-grid">
        <article>
          <h2>1. Service overview</h2>
          <p>CutOff Guide AI offers cutoff predictions, college discovery, and admission planning tools. It is not a guaranteed admission decision maker.</p>
        </article>
        <article>
          <h2>2. Data use</h2>
          <p>We process user-provided details and college data to deliver personalized recommendations. Personal data is handled in accordance with our privacy policy.</p>
        </article>
        <article>
          <h2>3. AI disclaimer</h2>
          <p>Predictions are estimates based on available datasets and should not replace official counseling or government announcements.</p>
        </article>
        <article>
          <h2>4. User responsibilities</h2>
          <p>Users are responsible for verifying eligibility, cutoff notifications, and application requirements from official sources.</p>
        </article>
        <article>
          <h2>5. Privacy and security</h2>
          <p>We safeguard authentication and profile information, but users should always protect personal login credentials and phone access.</p>
        </article>
      </div>
    </MainLayout>
  );
};

export default Terms;
