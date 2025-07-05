// components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <div className="text-xl font-bold">FindTravelBuddy</div>
    <nav>
      <NavLink className="px-4" to="/">Add Request</NavLink>
      <NavLink className="px-4" to="/find">Find Buddy</NavLink>
    </nav>
  </header>
);

export default Header;
