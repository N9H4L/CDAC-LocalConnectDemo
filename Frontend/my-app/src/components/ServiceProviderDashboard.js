// CustomerDashboard.js

import React from 'react';
import './Dashboard.css'; // Import shared styles for dashboard pages
import NavBar from './Dashboard/Navbar';
import Footer from './Dashboard/Footer';
import ServiceList from './Dashboard/ServiceList';

const CustomerDashboard = () => {
  return (
    <div>
    <NavBar />
    <ServiceList/>
    {/* Add other components here, like your service grid */}
    <Footer />
  </div>
  );
};

export default CustomerDashboard;
