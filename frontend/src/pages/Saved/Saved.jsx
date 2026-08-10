import MainLayout from '../../components/MainLayout/MainLayout';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Saved.css';

const savedColleges = [
  { name: 'VJTI Mumbai', location: 'Mumbai', cutoff: '178' },
  { name: 'PICT Pune', location: 'Pune', cutoff: '176' },
];

const Saved = () => {
  return (
    <MainLayout>
      <SectionHeader title="Saved colleges" description="Your shortlisted colleges are stored here for easy review." />
      <div className="saved-grid">
        {savedColleges.map((college) => (
          <article key={college.name} className="saved-card">
            <h3>{college.name}</h3>
            <p>{college.location}</p>
            <span>Cutoff: {college.cutoff}</span>
          </article>
        ))}
      </div>
    </MainLayout>
  );
};

export default Saved;
