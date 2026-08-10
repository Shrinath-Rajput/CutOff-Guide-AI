import MainLayout from '../../components/MainLayout/MainLayout';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './About.css';

const About = () => {
  return (
    <MainLayout>
      <section className="page-hero about-hero">
        <div className="hero-copy">
          <span className="eyebrow">About CutOff Guide AI</span>
          <h1>One platform for smarter college admission decisions.</h1>
          <p>
            CutOff Guide AI combines intelligent admission insights with premium guidance to help students make the right choice.
          </p>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-card">
            <strong>Built for Maharashtra students</strong>
            <p>Explore cutoffs, compare options, and predict admission results with confidence.</p>
          </div>
        </div>
      </section>

      <SectionHeader title="How CutOff Guide AI helps you decide" description="A smarter, kinder admission journey designed to reduce uncertainty and increase confidence." />

      <div className="info-grid">
        <article className="info-card">
          <h3>Accurate cutoff estimates</h3>
          <p>Use a guided prediction tool built for MHT-CET and category-specific admissions.</p>
        </article>
        <article className="info-card">
          <h3>College comparison</h3>
          <p>Compare institutions side by side with a clean admissions dashboard.</p>
        </article>
        <article className="info-card">
          <h3>Saved shortlists</h3>
          <p>Keep your preferred colleges organized and revisit them anytime.</p>
        </article>
      </div>

      <section className="about-grid">
        <div className="feature-card">
          <h3>Mission</h3>
          <p>To make college admissions transparent, precise and student-friendly for every applicant.</p>
        </div>
        <div className="feature-card">
          <h3>Vision</h3>
          <p>To become the most trusted admission planning companion for Maharashtra aspirants.</p>
        </div>
        <div className="feature-card">
          <h3>AI at work</h3>
          <p>We merge data-driven cutoffs and academic reasoning into a polished admissions experience.</p>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
