import MainLayout from '../../components/MainLayout/MainLayout';
import SectionHeader from '../../components/SectionHeader/SectionHeader';


const History = () => {
  return (
    <MainLayout>
      <SectionHeader title="History" description="Review your past predictions, comparisons and AI conversations." />
      <div className="history-grid">
        <section className="history-card">
          <h3>Prediction history</h3>
          <p>Last estimated cutoff: 178 for VJTI Mumbai.</p>
        </section>
        <section className="history-card">
          <h3>Comparison history</h3>
          <p>Recently compared VJTI Mumbai and COEP Pune.</p>
        </section>
        <section className="history-card">
          <h3>AI chat history</h3>
          <p>Asked about cutoff trends for AI & DS programs.</p>
        </section>
      </div>
    </MainLayout>
  );
};

export default History;
