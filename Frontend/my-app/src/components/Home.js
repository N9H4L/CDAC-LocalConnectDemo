// Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import component-specific styles

const Home = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate('/customer-login');
  };

  const handleServiceProviderClick = () => {
    navigate('/service-provider-login');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to<br></br>LocalConnect</h1>
      <p className="home-subtitle">LocalConnect, an interactive website that streamlines service discovery and hiring processes.</p>
      <br></br><br></br>
      <p className="home-heading">Join us as a Customer or Service Provider</p>
      
      <div className="button-container">
        <button className="home-button" onClick={handleCustomerClick}>
          Customer
        </button>
        <button className="home-button" onClick={handleServiceProviderClick}>
          Service Provider
        </button>
      </div>
    </div>
  );
};

export default Home;
