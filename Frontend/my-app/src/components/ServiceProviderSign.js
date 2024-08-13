// ServiceProviderSignup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import shared styles for signup pages

const ServiceProviderSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [service, setService] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePinCode = (pinCode) => {
    // Assuming PIN code is a 5 or 6 digit number
    const pinCodeRegex = /^[0-9]{5,6}$/;
    return pinCodeRegex.test(pinCode);
  };
  const handleLogin = () => {
    // Navigate to the signup page
    navigate('/service-provider-login');
  };

  const handleSignupSubmit = async () => {
    setError('');

    // Check if all fields are filled
    if (!email || !password || !confirmPassword || !name || !gender || !address || !pinCode || !service) {
      setError('All fields are required.');
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long and contain a number and a special character.'
      );
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Validate PIN code
    if (!validatePinCode(pinCode)) {
      setError('Please enter a valid 5 or 6-digit PIN code.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, gender, address, pinCode, service }),
      });

      if (response.ok) {
        navigate('/service-provider-dashboard'); // Redirect on successful completion
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to register. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Service Provider Signup</h2>
      <table cellSpacing={0} cellPadding={15}>
          <tr>
          <td>
      <input
        className="signup-input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /></td>
        <td>
      <input
        className="signup-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
        </td></tr>
      <tr>
      <td>
      <input
        className="signup-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </td>
        <td>
      <input
        className="signup-input"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      /></td>
      
      </tr>
      <tr>
        <td>
      <select
        className="signup-input"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      </td>
      <td>
      <select
        className="signup-input"
        value={service}
        onChange={(e) => setService(e.target.value)}
      >
        <option value="">Select Service</option>
        <option value="plumbing">Plumbing</option>
        <option value="electrician">Electrician</option>
        <option value="cleaning">Cleaning</option>
        <option value="carpentry">Carpentry</option>
        <option value="painting">Painting</option>
      </select>
      </td>
      </tr>
      <tr>
      <td>
      <input
        className="signup-input"
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      </td>
      <td>
      <input
        className="signup-input"
        type="text"
        placeholder="PIN Code"
        value={pinCode}
        onChange={(e) => setPinCode(e.target.value)}
      />
      </td>
      </tr>
      </table>
      <button className="signup-button" onClick={handleSignupSubmit}>
        Sign Up
      </button>
      <br></br>
      <button className="signup-button" onClick={handleLogin}>
        Login
      </button>

      {error && <p className="signup-error">{error}</p>}
    </div>
  );
};

export default ServiceProviderSignup;
