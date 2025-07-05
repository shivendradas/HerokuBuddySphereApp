// pages/FindBuddy.jsx
import React, { useState } from 'react';
import axios from 'axios';

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata'];

const FindBuddy = () => {
  const [criteria, setCriteria] = useState({ from: '', to: '', date: '' });
  const [results, setResults] = useState([]);

  const handleChange = e => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const res = await axios.get('http://localhost:5000/api/findBuddy', { params: criteria });
    setResults(res.data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-x-4 mb-4">
        <select name="from" onChange={handleChange} className="p-2 border">
          <option value="">From City</option>
          {cities.map(city => <option key={city}>{city}</option>)}
        </select>
        <select name="to" onChange={handleChange} className="p-2 border">
          <option value="">To City</option>
          {cities.map(city => <option key={city}>{city}</option>)}
        </select>
        <input type="date" name="date" onChange={handleChange} className="p-2 border" />
        <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2">Search</button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Mobile</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i} className="text-center">
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.mobile}</td>
              <td className="border p-2">{r.email}</td>
              <td className="border p-2">{new Date(r.dateTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FindBuddy;
