// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AddRequest from './pages/AddRequest';
import FindBuddy from './pages/FindBuddy';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<AddRequest />} />
            <Route path="/find" element={<FindBuddy />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
