import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Colleges.css';

const collegeItems = [
  {
    id: 'stanford',
    rank: 1,
    name: 'Stanford University',
    rating: '4.9',
    location: 'Stanford, California',
    courses: ['CS', 'Engineering', 'MBA'],
    feeLabel: '$56,000 / yr',
    feeValue: 56000,
    cutoff: '99.5%',
    type: 'Private',
    state: 'California',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3H4oNg_SwTzfTRJUPh6bA5a-OfI5-D3XguxBR_lRbk8HA8O5-jhDydRrQD8z3Oyev61VGU0sFJx4oDSSu7mN65Yq4JTGAh4PW6_y3LUMAuGxDLlm_QDg7oyc1bdYfbjYN4U8YWmsL8OwcEBzAY6cwN1vWkszJMHr8hi64Du10zvpy4DMkCvcAhnih5JwutryffQlRGG3K_ULjqKQgpMXQQIce1R9JsWIj0jWzmZ8ZkAYDkGAaJ00t',
  },
  {
    id: 'mit',
    rank: 2,
    name: 'Massachusetts Institute of Technology',
    rating: '4.9',
    location: 'Cambridge, Massachusetts',
    courses: ['Engineering', 'CS', 'Physics'],
    feeLabel: '$55,450 / yr',
    feeValue: 55450,
    cutoff: '99.6%',
    type: 'Private',
    state: 'Massachusetts',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQk4oxUU88rmboCZNrKn7NmNMTquKZmbwKE8LYu6_mcvyR7whaRD08AhIN83wD4gbM39SxjMtoEsSory7uusYWgRRBoeto6XV6RxREUo67gO7_tfG5Wzqk_RhflUcnSXZ6gcJs3YwAwXm53GNJAzuzI7iYhS1mCZFUGRdwDNvpUiizKKozEk7YWUIZ1gEMzpLbFcFBZAtSxC9xaLEbK9DnT3bLkr1NBb4nn1I5BmhBOu73MSgXk6oY',
  },
  {
    id: 'harvard',
    rank: 3,
    name: 'Harvard University',
    rating: '4.8',
    location: 'Cambridge, Massachusetts',
    courses: ['Law', 'Business', 'Med'],
    feeLabel: '$54,269 / yr',
    feeValue: 54269,
    cutoff: '99.4%',
    type: 'Private',
    state: 'Massachusetts',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCY90ZS6vJTCwESsN-6T-V3ClglcvdauGVb0Q7ToUByMjp7YRvaAquogP64vo3hhdibvhKxlX_LiVm-usPlXRiqmR0eLzln3KFt_pXncv9QY3qVUNC1cS5AjGwub6IBzOr0IJjTnh_OeSICEQ65iJfNrA0818qdlDO4GVDYYNbQ-J2e0UKgSMxl5px5utybrLMwSWcyo-yEXCpfzLdgSaBgn4HmWU2XqBtSCd-7VawhlOR3TguYIl8a',
  },
];

const stateOptions = ['California', 'New York', 'Massachusetts'];
const courseOptions = ['Computer Science', 'Engineering', 'Business'];
const sortOptions = [
  { value: 'relevance', label: 'Sort by: Relevance' },
  { value: 'ranking', label: 'Sort by: Ranking (High to Low)' },
  { value: 'fees', label: 'Sort by: Fees (Low to High)' },
];
const totalCollegeCount = 482;
const displayedPages = [1, 2, 3, 48];

const Colleges = () => {
  const searchInputRef = useRef(null);
  const [search, setSearch] = useState('');
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [feeValue, setFeeValue] = useState(100000);
  const [sortOption, setSortOption] = useState('relevance');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState({});
  const [compareSelected, setCompareSelected] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedStates, selectedCourses, feeValue, selectedType]);

  const toggleSelection = (value, selectedValues, setSelectedValues) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleSearchFocus = () => {
    searchInputRef.current?.focus();
  };

  const filteredColleges = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return collegeItems.filter((college) => {
      if (normalizedSearch) {
        const matchesSearch = [college.name, college.location, ...college.courses]
          .some((text) => text.toLowerCase().includes(normalizedSearch));
        if (!matchesSearch) {
          return false;
        }
      }

      if (selectedStates.length && !selectedStates.includes(college.state)) {
        return false;
      }

      if (selectedCourses.length) {
        const hasCourse = selectedCourses.some((course) => college.courses.includes(course));
        if (!hasCourse) {
          return false;
        }
      }

      if (feeValue < college.feeValue) {
        return false;
      }

      if (selectedType && college.type !== selectedType) {
        return false;
      }

      return true;
    });
  }, [search, selectedStates, selectedCourses, feeValue, selectedType]);

  const sortedColleges = useMemo(() => {
    const sorted = [...filteredColleges];

    if (sortOption === 'ranking') {
      sorted.sort((a, b) => a.rank - b.rank);
    }

    if (sortOption === 'fees') {
      sorted.sort((a, b) => a.feeValue - b.feeValue);
    }

    return sorted;
  }, [filteredColleges, sortOption]);

  const visibleColleges = useMemo(
    () => sortedColleges.slice((currentPage - 1) * 10, currentPage * 10),
    [sortedColleges, currentPage]
  );

  const displayStart = visibleColleges.length ? (currentPage - 1) * 10 + 1 : 0;
  const displayEnd = visibleColleges.length ? Math.min(currentPage * 10, sortedColleges.length) : 0;

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCompare = (id) => {
    setCompareSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const clearAllFilters = () => {
    setSelectedStates([]);
    setSelectedCourses([]);
    setSelectedType('');
    setFeeValue(100000);
  };

  return (
    <div className="colleges-page">
      <Navbar onSearch={handleSearchFocus} />

      <main className="colleges-main">
        <header className="colleges-header">
          <div className="colleges-header-copy">
            <h1>Explore Colleges</h1>
            <p>
              Discover elite institutions, analyze historical cutoffs, and pinpoint your ideal academic destination with AI-driven insights.
            </p>
          </div>

          <div className="search-input-wrapper">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              ref={searchInputRef}
              id="colleges-search-input"
              className="search-input"
              type="text"
              placeholder="Search colleges, courses or locations..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </header>

        <div className="colleges-layout">
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h2>Filters</h2>
              <button type="button" className="clear-button" onClick={clearAllFilters}>
                Clear All
              </button>
            </div>

            <div className="filter-group">
              <div className="filter-group-title">
                <span>State</span>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <div className="filter-options">
                {stateOptions.map((state) => (
                  <label key={state} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedStates.includes(state)}
                      onChange={() => toggleSelection(state, selectedStates, setSelectedStates)}
                    />
                    <span>{state}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="divider" />

            <div className="filter-group">
              <div className="filter-group-title">
                <span>Course / Major</span>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <div className="filter-options">
                {courseOptions.map((course) => (
                  <label key={course} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course)}
                      onChange={() => toggleSelection(course, selectedCourses, setSelectedCourses)}
                    />
                    <span>{course}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="divider" />

            <div className="filter-group">
              <div className="filter-group-title">
                <span>Approx Fees (Annual)</span>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <div className="fee-group">
                <input
                  className="fee-range"
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={feeValue}
                  onChange={(event) => setFeeValue(Number(event.target.value))}
                />
                <div className="fee-labels">
                  <span>$0</span>
                  <span>$100k+</span>
                </div>
              </div>
            </div>

            <div className="divider" />

            <div className="filter-group">
              <div className="filter-group-title">
                <span>College Type</span>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <div className="type-buttons">
                {['Public', 'Private'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`type-button ${selectedType === type ? 'selected' : ''}`}
                    onClick={() => setSelectedType(selectedType === type ? '' : type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="results-column">
            <div className="results-toolbar">
              <p>
                Showing <strong>{displayStart}-{displayEnd || (sortedColleges.length ? 10 : 0)}</strong> of <strong>{totalCollegeCount}</strong> Colleges
              </p>
              <div className="results-actions">
                <button type="button" className="mobile-filter-toggle" onClick={() => setMobileFiltersOpen(true)}>
                  <span className="material-symbols-outlined">tune</span>
                  Filters
                </button>
                <select value={sortOption} onChange={(event) => setSortOption(event.target.value)} className="sort-select">
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="cards-list">
              {visibleColleges.map((college) => (
                <article key={college.id} className="college-card">
                  <div className="card-image">
                    <img src={college.image} alt={college.name} />
                    <div className="card-badge">#{college.rank} National Rank</div>
                    <button
                      type="button"
                      className="bookmark-button"
                      onClick={() => toggleBookmark(college.id)}
                      aria-label={bookmarked[college.id] ? 'Remove bookmark' : 'Bookmark college'}
                    >
                      <span className="material-symbols-outlined">
                        {bookmarked[college.id] ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>

                  <div className="card-content">
                    <div>
                      <div className="card-header-row">
                        <h3>{college.name}</h3>
                        <div className="card-rating">
                          <span className="material-symbols-outlined rating-icon" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          <span>{college.rating}</span>
                        </div>
                      </div>
                      <p className="card-location">
                        <span className="material-symbols-outlined">location_on</span>
                        {college.location}
                      </p>
                      <div className="card-stats">
                        <div className="stat-block">
                          <p className="stat-label">Top Courses</p>
                          <p className="stat-value">{college.courses.join(', ')}</p>
                        </div>
                        <div className="stat-block">
                          <p className="stat-label">Approx Fees</p>
                          <p className="stat-value">{college.feeLabel}</p>
                        </div>
                        <div className="stat-block stat-block-highlight">
                          <p className="stat-label">Avg. Cutoff Percentile</p>
                          <p className="stat-value stat-value-strong">{college.cutoff}</p>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer-row">
                      <label className={`compare-label ${compareSelected[college.id] ? 'selected' : ''}`}>
                        <input
                          type="checkbox"
                          checked={!!compareSelected[college.id]}
                          onChange={() => toggleCompare(college.id)}
                        />
                        <span className="compare-checkbox-box">
                          <span className="material-symbols-outlined">check</span>
                        </span>
                        <span>Compare</span>
                      </label>
                      <Link to={`/college/${college.id}`} className="view-college-button">
                        View College
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="pagination">
              <button
                type="button"
                className="pagination-button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>

              {displayedPages.map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  className={`pagination-page ${currentPage === pageNumber ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                type="button"
                className="pagination-button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 48))}
                disabled={currentPage === 48}
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      <div className={`mobile-filter-panel ${mobileFiltersOpen ? 'open' : ''}`}>
        <div className="mobile-filter-content">
          <div className="mobile-filter-header">
            <h2>Filters</h2>
            <button type="button" className="icon-button close-button" onClick={() => setMobileFiltersOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="filters-sidebar mobile-filter-body">
            <div className="filter-group">
              <div className="filter-group-title">
                <span>State</span>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <div className="filter-options">
                {stateOptions.map((state) => (
                  <label key={state} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedStates.includes(state)}
                      onChange={() => toggleSelection(state, selectedStates, setSelectedStates)}
                    />
                    <span>{state}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="divider" />

            <div className="filter-group">
              <div className="filter-group-title">
                <span>Course / Major</span>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <div className="filter-options">
                {courseOptions.map((course) => (
                  <label key={course} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course)}
                      onChange={() => toggleSelection(course, selectedCourses, setSelectedCourses)}
                    />
                    <span>{course}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="divider" />

            <div className="filter-group">
              <div className="filter-group-title">
                <span>Approx Fees (Annual)</span>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <div className="fee-group">
                <input
                  className="fee-range"
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={feeValue}
                  onChange={(event) => setFeeValue(Number(event.target.value))}
                />
                <div className="fee-labels">
                  <span>$0</span>
                  <span>$100k+</span>
                </div>
              </div>
            </div>

            <div className="divider" />

            <div className="filter-group">
              <div className="filter-group-title">
                <span>College Type</span>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <div className="type-buttons">
                {['Public', 'Private'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`type-button ${selectedType === type ? 'selected' : ''}`}
                    onClick={() => setSelectedType(selectedType === type ? '' : type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" className="mobile-clear-button" onClick={clearAllFilters}>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colleges;
