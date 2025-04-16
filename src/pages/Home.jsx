// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'


const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">Keeper</div>
        <div className="auth-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/register" className="btn register-btn">Register</Link>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Platform</h1>
          <p>Discover amazing features that will revolutionize your experience</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn cta-register">Get Started</Link>
            <Link to="/login" className="btn cta-login">Existing User</Link>
          </div>
        </div>
      </main>

      <section className="features">
        <div className="feature-card">
          <h3>Feature One</h3>
          <p>Description of the first amazing feature</p>
        </div>
        <div className="feature-card">
          <h3>Feature Two</h3>
          <p>Description of the second fantastic feature</p>
        </div>
        <div className="feature-card">
          <h3>Feature Three</h3>
          <p>Description of the third incredible feature</p>
        </div>
      </section>
    </div>
  );
};

export default Home;