import React from 'react';
import './contentCSS.css';

const Content = () => {
  return (
    <section className="content-section">
      <div className="content-banner">
        <h1>Welcome to Our Platform</h1>
        <p>We provide the best services for your needs. Discover a world of convenience with us.</p>
        <button className="cta-button">
          <a href="/create" className="cta-link">Get Started</a>
        </button>
      </div>
    </section>
  );
}

export default Content;