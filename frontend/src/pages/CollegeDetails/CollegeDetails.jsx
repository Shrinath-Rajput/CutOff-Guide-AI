import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/MainLayout/MainLayout';
import Button from '../../components/Button/Button';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './CollegeDetails.css';

const collegeInfo = {
  'vkti-mumbai': {
    name: 'VJTI Mumbai',
    location: 'Mumbai, Maharashtra',
    about: 'One of the premier engineering colleges in Maharashtra with strong industry connections and placement records.',
    courses: ['Computer Engineering', 'Electronics', 'AI & DS'],
    fees: '₹1.2L/year',
    cutoff: '178',
    placements: '95% campus placement',
    facilities: ['Labs', 'Library', 'Hostels', 'Research Centres'],
  },
};

const CollegeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const college = collegeInfo[id] || collegeInfo['vkti-mumbai'];

  return (
    <MainLayout>
      <div className="detail-hero">
        <div className="detail-hero-copy">
          <span className="eyebrow">College Profile</span>
          <h1>{college.name}</h1>
          <p>{college.location}</p>
          <div className="detail-hero-actions">
            <Button variant="primary" onClick={() => navigate('/cutoff')}>Predict Cutoff</Button>
            <Button variant="secondary" onClick={() => navigate('/compare')}>Compare</Button>
          </div>
        </div>
      </div>

      <SectionHeader title="Campus highlights" description="A premium college overview with course, cutoff and placement details." />

      <div className="detail-grid">
        <section className="detail-card">
          <h3>About the college</h3>
          <p>{college.about}</p>
        </section>
        <section className="detail-card">
          <h3>Core details</h3>
          <ul>
            <li><strong>Fees:</strong> {college.fees}</li>
            <li><strong>Cutoff:</strong> {college.cutoff}</li>
            <li><strong>Placement rate:</strong> {college.placements}</li>
          </ul>
        </section>
        <section className="detail-card">
          <h3>Courses offered</h3>
          <ul>
            {college.courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </section>
        <section className="detail-card">
          <h3>Facilities</h3>
          <ul>
            {college.facilities.map((facility) => (
              <li key={facility}>{facility}</li>
            ))}
          </ul>
        </section>
      </div>
    </MainLayout>
  );
};

export default CollegeDetails;
