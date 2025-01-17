import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Include CSS for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to Rental Management System</h1>
        <p>Streamline your rental business operations effortlessly.</p>
      </header>
      <div className="auth-options">
        <Link to="/signin" className="btn btn-primary">Sign In</Link>
        <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;
