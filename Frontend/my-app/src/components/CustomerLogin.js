// CustomerLogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import shared styles for login pages

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Clear any previous error message
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/v1/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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
    navigate('/customer-Sign');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Customer Login</h2>
      <input
        className="login-input"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

export default CustomerLogin;
