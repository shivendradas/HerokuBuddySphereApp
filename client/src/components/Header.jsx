import React from 'react';

const Header = () => (
  <header
    style={{
      background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
      height: '80px',
      color: 'white',
      padding: '0 30px',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}
  >
    <img
      src="/header.png"
      alt="BuddySphere Logo"
      style={{
        height: '50px',
        marginRight: '20px',
        transition: 'transform 0.3s ease',
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
    />
    <h1 style={{ fontSize: '1.8rem', margin: 0 }}>BuddySphere</h1>
  </header>
);

export default Header;
