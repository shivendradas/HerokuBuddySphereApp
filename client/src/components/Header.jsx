import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const toggleLogin = () => {
    navigate('/login');
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  return (
    <header
      style={{
        background: 'linear-gradient(90deg, #111827 0%, #2a5298 100%)',
        height: '80px',
        color: '#60A5FA',
        padding: '0 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
      </div>

      <button
        onClick={toggleLogin}
        style={{
          backgroundColor: '#2563EB',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Login
      </button>
    </header>
  );
};

export default Header;
