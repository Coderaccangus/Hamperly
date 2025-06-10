// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to Hamperly</h1>
      <p>Your go-to platform for luxury and personalized gift hampers.</p>
      <p>Curated hampers for every occasion — from luxury spa sets to gourmet treats.</p>
      <p>Register today or log in to get started.</p>

      <div className="button-group">
        <Link to="/register">
          <button className="landing-button">Register</button>
        </Link>
        <Link to="/user-login">
          <button className="landing-button">User Login</button>
        </Link>
        <Link to="/adminloginpage">
          <button className="landing-button">Admin Login</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
