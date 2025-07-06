// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
// index.js or main.jsx
import './index.css';

import Header from './components/Header';
import Footer from './components/Footer';
import MainBody from './components/Body';
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow overflow-hidden">
          <MainBody />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
