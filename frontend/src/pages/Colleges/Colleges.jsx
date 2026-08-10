import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout/MainLayout';
import SearchBar from '../../components/SearchBar/SearchBar';
import CollegeCard from '../../components/CollegeCard/CollegeCard';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Colleges.css';

const collegeData = [
  {
    id: 'vkti-mumbai',
    name: 'VJTI Mumbai',
    location: 'Mumbai, Maharashtra',
    category: 'Engineering',
    courses: ['Computer Engineering', 'AI & DS'],
    fees: '₹1.2L/year',
    cutoff: '178',
    rating: '4.7',
  },
  {
    id: 'coep',
    name: 'COEP Technological University',
    location: 'Pune, Maharashtra',
    category: 'Engineering',
    courses: ['Mechanical', 'Electronics'],
    fees: '₹1.1L/year',
    cutoff: '182',
    rating: '4.6',
  },
  {
    id: 'pict-pune',
    name: 'PICT Pune',
    location: 'Pune, Maharashtra',
    category: 'Engineering',
    courses: ['AI & DS', 'IT'],
    fees: '₹1.4L/year',
    cutoff: '176',
    rating: '4.4',
  },
];

const Colleges = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredColleges = useMemo(
    () =>
      collegeData.filter((college) => {
        const searchTerm = search.toLowerCase();
        return (
          (college.name.toLowerCase().includes(searchTerm) || college.location.toLowerCase().includes(searchTerm)) &&
          (filter === 'All' || college.category === filter)
        );
      }),
    [search, filter]
  );

  return (
    <MainLayout>
      <SectionHeader title="Explore premium colleges" description="Search and compare colleges with curated admission details and cutoff insights." />

      <div className="colleges-topbar">
        <SearchBar value={search} onChange={setSearch} />
        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option>All</option>
          <option>Engineering</option>
          <option>Management</option>
          <option>Science</option>
        </select>
      </div>

      <div className="college-grid">
        {filteredColleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            onView={(id) => navigate(`/college/${id}`)}
            onCompare={(id) => navigate('/compare')}
            onSave={() => navigate('/saved')}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default Colleges;
