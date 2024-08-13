// ServiceProviderLogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import shared styles for login pages

const ServiceProviderLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Clear any previous error message
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // If login is successful, navigate to the dashboard
        navigate('/customer-dashboard');
      } else {
        // If login fails, display an error message
        const data = await response.json();
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      // Handle network or other errors
      setError('An error occurred. Please try again later.');
    }
  };

  const handleSignUp = () => {
    // Navigate to the signup page
    navigate('/service-provider-Sign');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Service Provider Login</h2>
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <button className="signup-button" onClick={handleSignUp}>
        Sign Up
      </button>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default ServiceProviderLogin;
