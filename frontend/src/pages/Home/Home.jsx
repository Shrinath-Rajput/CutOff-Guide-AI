import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAward, FiShield, FiBarChart2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/MainLayout/MainLayout';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import CollegeCard from '../../components/CollegeCard/CollegeCard';
import './Home.css';

const heroStats = [
  { label: 'Colleges', value: '250+' },
  { label: 'Predictions', value: '12K+' },
  { label: 'Success rate', value: '94%' },
];

const popularColleges = [
  { id: 'vkti-mumbai', name: 'VJTI Mumbai', location: 'Mumbai, MH', category: 'Engineering', courses: ['Computer Eng.'], fees: '₹1.2L/yr', cutoff: '178', rating: '4.7' },
  { id: 'coep-pune', name: 'COEP Pune', location: 'Pune, MH', category: 'Engineering', courses: ['Mechanical'], fees: '₹1.1L/yr', cutoff: '182', rating: '4.6' },
  { id: 'pict-pune', name: 'PICT Pune', location: 'Pune, MH', category: 'Engineering', courses: ['AI & DS'], fees: '₹1.4L/yr', cutoff: '176', rating: '4.4' },
];

const courses = ['Artificial Intelligence', 'Data Science', 'Computer Engineering', 'Mechanical', 'Electronics'];

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredColleges = useMemo(
    () => popularColleges.filter((college) => college.name.toLowerCase().includes(search.toLowerCase()) || college.location.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <MainLayout>
      <section className="home-hero-section">
        <div className="hero-copy">
          <span className="hero-eyebrow">Premium college admission guidance</span>
          <h1>Find the right college for your future.</h1>
          <p>CutOff Guide AI blends admissions expertise with intelligent cutoff predictions to help you make confident choices.</p>
          <div className="hero-actions">
            <button type="button" className="button-primary" onClick={() => navigate('/colleges')}>Explore Colleges</button>
            <button type="button" className="button-secondary" onClick={() => navigate('/cutoff')}>Predict My Cutoff</button>
          </div>
          <div className="hero-stats">
            {heroStats.map((item) => (
              <div key={item.label} className="hero-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual" />
      </section>

      <section className="section-panel section-light">
        <SectionHeader title={`Welcome back, ${currentUser?.name?.split(' ')[0] || 'Student'}`} description="Continue your admission planning with curated insights and fast access to top tools." />
        <div className="home-actions-grid">
          <div className="action-card">
            <FiAward />
            <h3>Saved colleges</h3>
            <p>Your personalized shortlist for fast review.</p>
          </div>
          <div className="action-card">
            <FiBarChart2 />
            <h3>Predict cutoffs</h3>
            <p>Estimate your best college matches in one step.</p>
          </div>
          <div className="action-card">
            <FiShield />
            <h3>Admission guidance</h3>
            <p>Get reliable advice on CAP rounds and eligibility.</p>
          </div>
        </div>
      </section>

      <section className="section-panel">
        <SectionHeader title="Popular Colleges" description="Explore top institutions with premium admission insights." />
        <div className="popular-grid">
          {filteredColleges.map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
              onView={() => navigate(`/college/${college.id}`)}
              onCompare={() => navigate('/compare')}
              onSave={() => navigate('/saved')}
            />
          ))}
        </div>
      </section>

      <section className="section-panel section-light">
        <SectionHeader title="Explore courses" description="Review the programs most students consider for a strong admission profile." />
        <div className="course-pill-grid">
          {courses.map((course) => (
            <button key={course} type="button" className="course-pill">{course}</button>
          ))}
        </div>
      </section>

      <section className="section-panel cta-panel">
        <div>
          <span className="hero-eyebrow">Admission planning made premium</span>
          <h2>Track cutoffs, compare colleges, and save the best options—all in one place.</h2>
        </div>
        <button type="button" className="button-primary" onClick={() => navigate('/assistant')}>Talk to AI Assistant</button>
      </section>
    </MainLayout>
  );
};

export default Home;
