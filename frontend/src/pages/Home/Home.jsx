import { motion } from 'framer-motion';
import { FiSearch, FiCompass, FiBell, FiBookOpen, FiHeart, FiClock, FiZap, FiMapPin } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';

const featuredColleges = [
  { name: 'VJTI Mumbai', tag: 'Computer Engineering' },
  { name: 'COEP Technological University', tag: 'Mechanical' },
  { name: 'Pict Pune', tag: 'AI & DS' },
];

const quickActions = [
  { title: 'AI shortlist', icon: <FiCompass /> },
  { title: 'Saved colleges', icon: <FiHeart /> },
  { title: 'Recent searches', icon: <FiClock /> },
];

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="page-shell home-shell">
      <Card className="home-card">
        <Navbar title="Premium Home" backTo="/welcome" />

        <div className="home-hero">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h2>Hello, {currentUser?.name || 'Student'} 👋</h2>
            <p>Your AI admission journey is ready. Discover the next best college with confidence.</p>
          </div>
          <div className="hero-badge">
            <FiZap /> Premium Access
          </div>
        </div>

        <motion.div className="search-bar" whileHover={{ scale: 1.01 }}>
          <FiSearch />
          <input placeholder="Search colleges, branches, or cities" />
          <Button variant="primary">Search</Button>
        </motion.div>

        <div className="home-grid">
          <section className="panel">
            <div className="panel-heading">
              <h3>Continue where you left</h3>
              <span>Resume</span>
            </div>
            <div className="resume-chip">MHT CET Engineering • Round 1</div>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <h3>Featured colleges</h3>
              <span>Trending</span>
            </div>
            <ul>
              {featuredColleges.map((college) => (
                <li key={college.name}>
                  <strong>{college.name}</strong>
                  <span>{college.tag}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <h3>Latest notifications</h3>
              <span><FiBell /></span>
            </div>
            <p>Cutoff updates for Computer Engineering in Pune are now live.</p>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <h3>Top courses</h3>
              <span>Popular</span>
            </div>
            <div className="chips">
              <span>Artificial Intelligence</span>
              <span>Data Science</span>
              <span>Mechanical</span>
            </div>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <h3>Quick actions</h3>
              <span>Fast</span>
            </div>
            <div className="quick-actions">
              {quickActions.map((action) => (
                <div key={action.title} className="quick-action">
                  {action.icon}
                  <span>{action.title}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <h3>Saved colleges</h3>
              <span><FiHeart /></span>
            </div>
            <p>No colleges saved yet. Start exploring and save your favourites.</p>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <h3>Recent searches</h3>
              <span><FiClock /></span>
            </div>
            <div className="recent-searches">
              <span><FiMapPin /> Pune engineering colleges</span>
              <span><FiBookOpen /> B.Tech AI colleges</span>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default Home;
