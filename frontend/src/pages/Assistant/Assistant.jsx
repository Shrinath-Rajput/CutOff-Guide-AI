import { useState } from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Assistant.css';

const suggestions = [
  'Which colleges match my cutoff?',
  'How do I compare AI courses?',
  'What is the expected cutoff for COEP?',
  'How do I prepare for CAP rounds?',
];

const Assistant = () => {
  const [messages, setMessages] = useState([
    { from: 'assistant', text: 'Hi there! Ask me anything about college admissions.' },
  ]);
  const [query, setQuery] = useState('');

  const handleSend = () => {
    if (!query.trim()) return;
    setMessages((prev) => [...prev, { from: 'user', text: query }, { from: 'assistant', text: 'That’s a great question — I recommend checking your preferred cutoff range and eligibility criteria.' }]);
    setQuery('');
  };

  return (
    <MainLayout>
      <SectionHeader title="AI Assistant" description="Ask admission questions and get clear, college-focused guidance." />

      <div className="assistant-grid">
        <aside className="assistant-suggestions">
          <h3>Suggested questions</h3>
          <ul>
            {suggestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>

        <section className="assistant-chat">
          <div className="chat-window">
            {messages.map((message, index) => (
              <div key={index} className={`chat-bubble ${message.from}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input-row">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask about cutoffs, colleges, or admission steps" />
            <button type="button" onClick={handleSend}>Send</button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Assistant;
