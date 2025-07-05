import React from 'react';
import './Footer.css'; // Optional: add styles in Footer.css

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} FindTravelBuddy. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
