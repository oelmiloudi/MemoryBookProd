import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search Term:', searchTerm);
  };

  const handleUploadClick = () => {
    navigate('/landing'); // Navigate to the PhotoUpload page
  };

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="navbar-brand">MemoryBook</div>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search professionals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
        <div className="nav-links">
          <a href="/discover">Discover</a>
          <a href="/bookings">Bookings</a>
          <button onClick={handleUploadClick}>Upload</button> {/* Changed to button for click handling */}
        </div>
        <div className="nav-buttons">
          <button className="nav-button my-profile" onClick={() => console.log('Profile Clicked')}>Profile</button>
        </div>
      </nav>
      <main className="main-content">
        <section className="hero-section">
          <h1>Create and Preserve Your Memories</h1>
          <p>Discover the right service for you</p>
        </section>
        <section className="features-section">
          {/* Feature sections go here */}
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="contact-info">
            <h2>Contact Us</h2>
            <p>If you need any help or have any questions, please email us at <a href="mailto:noreplymemory@gmail.com">noreplymemory@gmail.com</a></p>
          </div>
          <div className="tech-support">
            <h2>Technical Support</h2>
            <p>For technical support, please email <a href="mailto:noreplymemory@gmail.com">noreplymemory@gmail.com</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
