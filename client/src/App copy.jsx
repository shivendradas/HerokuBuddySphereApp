// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
// index.js or main.jsx
import './index.css';

import Header from './components/Header';
import Footer from './components/Footer';
import AddRequest from './pages/AddRequest';
import FindBuddy from './pages/FindBuddy';
import MainBody from './components/Body';
/*import FindJobs from './pages/FindJobs';
import MatchMaking from './pages/MatchMaking';
 */
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-grow">
          {/* Sidebar */}
          <div className="w-64 bg-gray-100 p-4">
            <nav className="flex flex-col space-y-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? "text-blue-600 font-bold" : "text-gray-700"
                }
              >
                Find Travel Buddy
              </NavLink>
              <NavLink 
                to="/jobs" 
                className={({ isActive }) => 
                  isActive ? "text-blue-600 font-bold" : "text-gray-700"
                }
              >
                Find Jobs
              </NavLink>
              <NavLink 
                to="/match" 
                className={({ isActive }) => 
                  isActive ? "text-blue-600 font-bold" : "text-gray-700"
                }
              >
                Match Making
              </NavLink>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-grow p-6">
            <Routes>
              <Route path="/" element={<AddRequest />} />
              <Route path="/find" element={<FindBuddy />} />{/* 
              <Route path="/jobs" element={<FindJobs />} />
              <Route path="/match" element={<MatchMaking />} /> */}
            </Routes>
          </div>
        </div>
        <MainBody />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
