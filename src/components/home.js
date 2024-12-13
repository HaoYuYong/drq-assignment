// Importing React and the custom CSS file for styling the component
import React from 'react';
import './homeCSS.css';

const Content = () => {
  // This component returns a section with a banner and a call-to-action button
  return (
    <section className="content-section">
      <div className="content-banner">
        <h1>Welcome to Our Platform</h1>
        <p>We provide the best services for your needs. Discover a world of convenience with us.</p>
        {/* Button element with a call-to-action */}
        <button className="cta-button">
          {/* Link inside the button to navigate to the 'create' page */}
          <a href="/create" className="cta-link">Get Started</a>
        </button>
      </div>
    </section>
  );
}

export default Content;