import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout/MainLayout';
import './Compare.css';
import stanfordImage from '../../assets/images/clg.jpg';
import mitImage from '../../assets/images/clg1.jpg';

const initialCollegeCards = [
  {
    id: 'stanford',
    name: 'Stanford University',
    location: 'Stanford, CA',
    image: stanfordImage,
  },
  {
    id: 'mit',
    name: 'MIT',
    location: 'Cambridge, MA',
    image: mitImage,
  },
  null,
  null,
];

const comparisonRows = [
  {
    metric: 'Ranking',
    icon: 'trophy',
    stanford: '#2 Global',
    mit: '#1 Global',
    highlight: 'mit',
  },
  {
    metric: 'Rating',
    icon: 'star',
    stanford: '4.9 / 5.0',
    mit: '4.8 / 5.0',
    highlight: 'stanford',
  },
  {
    metric: 'Tuition Fees (Yr)',
    icon: 'payments',
    stanford: '$56,169',
    mit: '$55,878',
    highlight: 'mit',
  },
  {
    metric: 'Acceptance Rate',
    icon: 'trending_up',
    stanford: '3.9%',
    mit: '4.0%',
    highlight: 'mit',
  },
];

const placementCards = [
  {
    title: 'Average Package',
    value: '$135k',
    comparison: '$128k',
    bars: [
      { label: 'Stanford', value: 100, color: 'primary' },
      { label: 'MIT', value: 92, color: 'secondary' },
    ],
  },
  {
    title: 'Highest Package',
    value: '$450k',
    comparison: '$420k',
    bars: [
      { label: 'Stanford', value: 100, color: 'primary' },
      { label: 'MIT', value: 93, color: 'secondary' },
    ],
  },
];

const Compare = () => {
  const navigate = useNavigate();
  const [collegeCards, setCollegeCards] = useState(initialCollegeCards);

  const removeCollege = (index) => {
    setCollegeCards((prev) => prev.map((card, idx) => (idx === index ? null : card)));
  };

  const handleAddCollege = () => {
    navigate('/colleges');
  };

  const handleAskAI = () => {
    navigate('/assistant');
  };

  return (
    <MainLayout>
      <section className="compare-page">
        <div className="compare-hero">
          <div className="compare-copy">
            <div className="compare-eyebrow">Compare Colleges</div>
            <h1>Compare Colleges</h1>
            <p>
              Select up to 4 institutions to compare their academic rigor, placement records, and infrastructure side-by-side.
            </p>
          </div>
          <button className="compare-hero-action" type="button" onClick={handleAskAI}>
            <span className="material-symbols-outlined compare-action-icon">smart_toy</span>
            Ask AI Which College Is Better?
          </button>
        </div>

        <section className="compare-selection-card">
          <div className="selection-grid">
            {collegeCards.map((card, index) => (
              <div key={index} className={card ? 'college-card selected-card' : 'college-card empty-card'}>
                {card ? (
                  <>
                    <div className="college-card-meta">
                      <img src={card.image} alt={card.name} className="college-card-image" />
                      <div>
                        <p className="college-card-name">{card.name}</p>
                        <p className="college-card-location">{card.location}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="college-card-close"
                      aria-label={`Remove ${card.name}`}
                      onClick={() => removeCollege(index)}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </>
                ) : (
                  <button type="button" className="empty-card-button" onClick={handleAddCollege}>
                    <span className="material-symbols-outlined">add_circle</span>
                    <span>Add College</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="compare-table-wrapper">
          <div className="compare-table">
            <div className="table-row table-header">
              <div className="table-cell metric-cell" />
              <div className="table-cell college-header">
                <img src={stanfordImage} alt="Stanford University" />
                <span>Stanford</span>
              </div>
              <div className="table-cell college-header">
                <img src={mitImage} alt="MIT" />
                <span>MIT</span>
              </div>
              <div className="table-cell empty-header">
                <span className="material-symbols-outlined">domain_add</span>
                <span>Empty</span>
              </div>
              <div className="table-cell empty-header">
                <span className="material-symbols-outlined">domain_add</span>
                <span>Empty</span>
              </div>
            </div>
            {comparisonRows.map((row) => (
              <div key={row.metric} className="table-row">
                <div className="table-cell metric-cell">
                  <span className="material-symbols-outlined metric-icon">{row.icon}</span>
                  <span>{row.metric}</span>
                </div>
                <div className={`table-cell ${row.highlight === 'stanford' ? 'highlight-cell' : ''}`}>
                  {row.stanford}
                </div>
                <div className={`table-cell ${row.highlight === 'mit' ? 'highlight-cell' : ''}`}>
                  {row.mit}
                </div>
                <div className="table-cell empty-value">-</div>
                <div className="table-cell empty-value">-</div>
              </div>
            ))}
          </div>
        </section>

        <section className="placement-section">
          <div className="placement-header">
            <h2>Placement Packages Comparison</h2>
          </div>

          <div className="placement-grid">
            {placementCards.map((card) => (
              <article key={card.title} className="placement-card">
                <div className="placement-card-header">
                  <p className="placement-card-label">{card.title}</p>
                  <div className="placement-card-values">
                    <span className="placement-value-primary">{card.value}</span>
                    <span className="placement-value-secondary">vs {card.comparison}</span>
                  </div>
                </div>

                <div className="placement-bars">
                  {card.bars.map((bar) => (
                    <div key={bar.label} className="placement-bar-row">
                      <span className="placement-bar-label">{bar.label}</span>
                      <div className="placement-bar-track">
                        <div className={`placement-bar ${bar.color}`} style={{ width: `${bar.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </MainLayout>
  );
};

export default Compare;
