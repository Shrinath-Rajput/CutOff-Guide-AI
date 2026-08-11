import { Link, useNavigate } from 'react-router-dom';
import './Welcome.css';
import collegeImg from "../../assets/images/clg.jpeg";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">

      
      <section className="hero">

        <div className="left-content">

          <span className="tagline">
            AI Powered Admission Prediction
          </span>

          <h1>
            Welcome To <br />
            <span>Cutoff Guide AI</span>
          </h1>

          <p>
            Predict college cutoffs, explore admission chances,
            analyze previous year trends and make smarter
            career decisions.
          </p>

          <button className="start-btn" onClick={() => navigate('/login')}>
            Start Journey →
          </button>

          <div className="quote-box">
            <h4>Student Motivation</h4>
            <p>
              "Success is not final, failure is not fatal:
              it is the courage to continue that counts."
            </p>
          </div>

          <div className="stats">

            <div className="card">
              <h2>500+</h2>
              <span>Colleges</span>
            </div>

            <div className="card">
              <h2>50K+</h2>
              <span>Students</span>
            </div>

            <div className="card">
              <h2>95%</h2>
              <span>Accuracy</span>
            </div>

          </div>

        </div>

        <div className="right-content">

          <img
            src={collegeImg}
            alt="College"
          />

          <div className="overlay-card">
            <h3>Admission Open 2026</h3>
            <p>
              Explore colleges and predict your chances instantly.
            </p>
          </div>

        </div>

      </section>

      <footer>
        Fourise Software Sol. Pvt. Ltd.
      </footer>

    </div>
  );
}