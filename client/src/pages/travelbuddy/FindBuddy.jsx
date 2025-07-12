import React, { useState } from 'react';
import axios from 'axios';
import stateCityData from '../../data/stateCityData.json'; // Adjust the path as necessary

const FindBuddy = () => {
  const [criteria, setCriteria] = useState({
    fromState: '',
    fromCity: '',
    toState: '',
    toCity: '',
    fromDate: '',
    toDate: '',
    userType: ''
  });

  const [customFromState, setCustomFromState] = useState('');
  const [customFromCity, setCustomFromCity] = useState('');
  const [customToState, setCustomToState] = useState('');
  const [customToCity, setCustomToCity] = useState('');

  const [results, setResults] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const actualFromState = criteria.fromState === 'Other' ? customFromState : criteria.fromState;
    const actualFromCity = criteria.fromCity === 'Other' ? customFromCity : criteria.fromCity;
    const actualToState = criteria.toState === 'Other' ? customToState : criteria.toState;
    const actualToCity = criteria.toCity === 'Other' ? customToCity : criteria.toCity;
  
    // Create the full payload
    let payload = {
      from: actualFromState && actualFromCity ? `${actualFromState}+${actualFromCity}` : '',
      to: actualToState && actualToCity ? `${actualToState}+${actualToCity}` : '',
      fromDate: criteria.fromDate,
      toDate: criteria.toDate,
      userType: criteria.userType
    };
  
    // Remove empty fields so only filled ones are sent
    Object.keys(payload).forEach(key => {
      if (!payload[key]) {
        delete payload[key];
      }
    });
  
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${apiBaseUrl}/api/findBuddy`, { params: payload });
      setResults(res.data);
    } catch (error) {
      console.error("Search failed:", error);
      alert("Error fetching results. Please try again.");
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-x-4 mb-4 flex flex-wrap gap-2">

        {/* From State */}
        <select name="fromState" onChange={handleChange} className="p-2 border">
          <option value="">From State</option>
          {Object.keys(stateCityData).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {criteria.fromState === 'Other' && (
          <input
            type="text"
            placeholder="Custom From State"
            value={customFromState}
            onChange={e => setCustomFromState(e.target.value)}
            className="p-2 border"
          />
        )}

        {/* From City */}
        <select name="fromCity" onChange={handleChange} className="p-2 border">
          <option value="">From City</option>
          {(stateCityData[criteria.fromState] || []).map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
          {criteria.fromState && !(stateCityData[criteria.fromState] || []).includes("Other") && (
            <option value="Other">Other</option>
          )}
        </select>
        {criteria.fromCity === 'Other' && (
          <input
            type="text"
            placeholder="Custom From City"
            value={customFromCity}
            onChange={e => setCustomFromCity(e.target.value)}
            className="p-2 border"
          />
        )}

        {/* To State */}
        <select name="toState" onChange={handleChange} className="p-2 border">
          <option value="">To State</option>
          {Object.keys(stateCityData).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {criteria.toState === 'Other' && (
          <input
            type="text"
            placeholder="Custom To State"
            value={customToState}
            onChange={e => setCustomToState(e.target.value)}
            className="p-2 border"
          />
        )}

        {/* To City */}
        <select name="toCity" onChange={handleChange} className="p-2 border">
          <option value="">To City</option>
          {(stateCityData[criteria.toState] || []).map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
          {criteria.toState && !(stateCityData[criteria.toState] || []).includes("Other") && (
            <option value="Other">Other</option>
          )}
        </select>
        {criteria.toCity === 'Other' && (
          <input
            type="text"
            placeholder="Custom To City"
            value={customToCity}
            onChange={e => setCustomToCity(e.target.value)}
            className="p-2 border"
          />
        )}

        {/* Dates */}
        <input
          type="date"
          name="fromDate"
          value={criteria.fromDate}
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          type="date"
          name="toDate"
          value={criteria.toDate}
          onChange={handleChange}
          className="p-2 border"
        />

        {/* User Type */}
        <select name="userType" onChange={handleChange} className="p-2 border">
          <option value="">All</option>
          <option value="passenger">Passenger</option>
          <option value="driver">Driver</option>
        </select>

        <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2">Search</button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-sm">
            <th className="border p-2">Name</th>
            <th className="border p-2">Mobile</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Date & Time</th>
            <th className="border p-2">User Type</th>
            <th className="border p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i} className="text-center text-sm">
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.mobile}</td>
              <td className="border p-2">{r.email}</td>
              <td className="border p-2">{new Date(r.date_time).toLocaleString()}</td>
              <td className="border p-2 capitalize">{r.user_type}</td>
              <td className="border p-2">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FindBuddy;
