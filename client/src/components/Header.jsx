// components/Header.jsx
import React from 'react';

const Header = () => (
  <header style={{ backgroundColor: 'blue', height: '80px', color: 'white', padding: '20px', display: 'flex', alignItems: 'center' }}>
    <img src="/header.png" alt="Header Logo" style={{ height: '60px', marginRight: '20px' }} />
    <h1>BuddySphere</h1>
  </header>
);

export default Header;
