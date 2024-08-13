import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ background: 'black', color: 'white', padding: '10px 20px' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'flex-end' }}>
        <li style={{ margin: '0 10px' }}><a href="/profile" style={{ color: 'white', textDecoration: 'none' }}>My Profile</a></li>
        <li style={{ margin: '0 10px' }}><a href="/settings" style={{ color: 'white', textDecoration: 'none' }}>My Settings</a></li>
        <li style={{ margin: '0 10px' }}><a href="/logout" style={{ color: 'white', textDecoration: 'none' }}>Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
