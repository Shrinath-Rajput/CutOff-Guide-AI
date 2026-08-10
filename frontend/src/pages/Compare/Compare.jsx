import MainLayout from '../../components/MainLayout/MainLayout';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Compare.css';

const compareData = [
  {
    name: 'VJTI Mumbai',
    location: 'Mumbai',
    course: 'Computer Engineering',
    cutoff: '178',
    fees: '₹1.2L',
    placement: '95%',
    rating: '4.7',
  },
  {
    name: 'COEP Pune',
    location: 'Pune',
    course: 'Mechanical',
    cutoff: '182',
    fees: '₹1.1L',
    placement: '94%',
    rating: '4.6',
  },
];

const Compare = () => {
  return (
    <MainLayout>
      <SectionHeader title="Compare colleges" description="Review key admission metrics side by side for easy decision-making." />

      <div className="compare-table-shell">
        <div className="compare-row compare-header">
          <div>College</div>
          <div>Location</div>
          <div>Course</div>
          <div>Cutoff</div>
          <div>Fees</div>
          <div>Placement</div>
          <div>Rating</div>
        </div>
        {compareData.map((item) => (
          <div key={item.name} className="compare-row">
            <div>{item.name}</div>
            <div>{item.location}</div>
            <div>{item.course}</div>
            <div className={item.cutoff === '178' ? 'highlight' : ''}>{item.cutoff}</div>
            <div>{item.fees}</div>
            <div>{item.placement}</div>
            <div>{item.rating}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Compare;
