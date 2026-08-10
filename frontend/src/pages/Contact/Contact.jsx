import { useState } from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Button from '../../components/Button/Button';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <MainLayout>
      <SectionHeader
        title="Connect with our admissions experts"
        description="Send us a message and our team will help you navigate the latest cutoff trends and college options."
      />

      <div className="contact-layout">
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <div className="contact-grid">
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Aarav Sharma" />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </label>
          </div>
          <label>
            Subject
            <input name="subject" value={form.subject} onChange={handleChange} placeholder="Admission guidance query" />
          </label>
          <label>
            Message
            <textarea name="message" value={form.message} onChange={handleChange} rows="5" placeholder="Tell us what you need help with..." />
          </label>
          <Button variant="primary" type="submit">Send message</Button>
        </form>

        <aside className="contact-details">
          <div className="contact-card">
            <h3>Office</h3>
            <p>Pune, Maharashtra, India</p>
          </div>
          <div className="contact-card">
            <h3>Email</h3>
            <p>hello@cutoffguide.ai</p>
          </div>
          <div className="contact-card">
            <h3>Phone</h3>
            <p>+91 12345 67890</p>
          </div>
          <div className="contact-card">
            <h3>Need help?</h3>
            <p>Our admission guide team is available Monday to Saturday.</p>
          </div>
        </aside>
      </div>
    </MainLayout>
  );
};

export default Contact;
