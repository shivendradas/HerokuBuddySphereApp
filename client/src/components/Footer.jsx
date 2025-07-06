import React from 'react';
import './Footer.css'; // Optional: add styles in Footer.css

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>© {new Date().getFullYear()} BuddySphere. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
