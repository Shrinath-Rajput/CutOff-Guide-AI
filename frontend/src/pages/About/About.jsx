import Navbar from '../../components/Navbar/Navbar';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />

      <main className="about-main">
        <header className="about-hero-header">
          <h1>About CutOff Guide AI</h1>
          <p>One platform for smarter college admission decisions, built for Maharashtra students seeking clarity, confidence, and better outcomes.</p>
        </header>

        <section className="about-section">
          <h2>About CutOff Guide AI</h2>
          <p>
            CutOff Guide AI helps students make informed choices by using intelligent admission insights and past cutoff trends. Our goal is to connect your profile with the best-fit colleges and courses across Maharashtra.
          </p>
        </section>

        <section className="about-section">
          <h2>How CutOff Guide AI helps you decide</h2>
          <ul>
            <li>Accurate cutoff estimates based on historical data and category-specific trends.</li>
            <li>College comparison tools to weigh options side-by-side.</li>
            <li>Saved shortlists so you can track and revisit strong admission choices.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Mission &amp; Vision</h2>
          <p>
            Our mission is to empower students with admission clarity through intuitive AI-driven tools. We envision a future where every student can confidently navigate college selection using accurate, easy-to-understand guidance.
          </p>
        </section>

        <section className="about-section">
          <h2>AI at work</h2>
          <p>
            CutOff Guide AI analyzes past cutoff patterns, reservation categories, and university preferences to provide intelligent recommendations. This helps students identify strong college matches and understand the admission landscape better.
          </p>
        </section>
      </main>

      <footer className="about-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-title">Cutoff Guide AI</div>
            <p>© 2024 Cutoff Guide AI. Empowering academic excellence.</p>
          </div>
          <div className="footer-column">
            <h4>Product</h4>
            <a href="/colleges">Colleges</a>
            <a href="/cutoff">Predictor</a>
            <a href="/assistant">AI Assistant</a>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <a href="/about">About Us</a>
            <a href="/contact">Careers</a>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <a href="/contact">Help Center</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
