// pages/AddRequest.jsx
import React, { useState } from 'react';
import axios from 'axios';
import stateCityData from '../../data/stateCityData.json'; // Adjust the path as needed


const AddRequest = () => {
  const [formData, setFormData] = useState({
    fromState: '',
    fromCity: '',
    toState: '',
    toCity: '',
    dateTime: '',
    name: '',
    mobile: '',
    email: '',
    userType: '',
    description: ''
  });

  const [customFromState, setCustomFromState] = useState('');
  const [customFromCity, setCustomFromCity] = useState('');
  const [customToState, setCustomToState] = useState('');
  const [customToCity, setCustomToCity] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const actualFromState = formData.fromState === 'Other' ? customFromState : formData.fromState;
    const actualFromCity = formData.fromCity === 'Other' ? customFromCity : formData.fromCity;
    const actualToState = formData.toState === 'Other' ? customToState : formData.toState;
    const actualToCity = formData.toCity === 'Other' ? customToCity : formData.toCity;

    const submissionData = {
      ...formData,
      from: `${actualFromState}+${actualFromCity}`,
      to: `${actualToState}+${actualToCity}`,
    };

    // Optional: remove separate state and city fields if not needed in backend
    delete submissionData.fromState;
    delete submissionData.fromCity;
    delete submissionData.toState;
    delete submissionData.toCity;
    const apiBaseUrl = process.env.REACT_APP_API_URL;
    await axios.post(`${apiBaseUrl}/api/addRequest`, submissionData);

    alert('Request submitted successfully');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">

      {/* From State */}
      <select name="fromState" onChange={handleChange} className="w-full p-2 border">
        <option value="">From State</option>
        {Object.keys(stateCityData).map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      {formData.fromState === 'Other' && (
        <input
          type="text"
          placeholder="Enter custom From State"
          className="w-full p-2 border"
          value={customFromState}
          onChange={e => setCustomFromState(e.target.value)}
        />
      )}

      {/* From City */}
      <select name="fromCity" onChange={handleChange} className="w-full p-2 border">
        <option value="">From City</option>
        {(stateCityData[formData.fromState] || []).map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      {formData.fromCity === 'Other' && (
        <input
          type="text"
          placeholder="Enter custom From City"
          className="w-full p-2 border"
          value={customFromCity}
          onChange={e => setCustomFromCity(e.target.value)}
        />
      )}

      {/* To State */}
      <select name="toState" onChange={handleChange} className="w-full p-2 border">
        <option value="">To State</option>
        {Object.keys(stateCityData).map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      {formData.toState === 'Other' && (
        <input
          type="text"
          placeholder="Enter custom To State"
          className="w-full p-2 border"
          value={customToState}
          onChange={e => setCustomToState(e.target.value)}
        />
      )}

      {/* To City */}
      <select name="toCity" onChange={handleChange} className="w-full p-2 border">
        <option value="">To City</option>
        {(stateCityData[formData.toState] || []).map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      {formData.toCity === 'Other' && (
        <input
          type="text"
          placeholder="Enter custom To City"
          className="w-full p-2 border"
          value={customToCity}
          onChange={e => setCustomToCity(e.target.value)}
        />
      )}

      <input type="datetime-local" name="dateTime" onChange={handleChange} className="w-full p-2 border" />

      <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border" />

      <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} className="w-full p-2 border" />

      <input type="email" name="email" placeholder="Email ID" onChange={handleChange} className="w-full p-2 border" />

      <select name="userType" onChange={handleChange} className="w-full p-2 border">
        <option value="">Select User Type</option>
        <option value="passenger">Passenger (Looking for a cab)</option>
        <option value="driver">Driver (Have a cab)</option>
      </select>

      <textarea
        name="description"
        placeholder="Short description (max 100 characters)"
        maxLength={100}
        rows={3}
        onChange={handleChange}
        className="w-full p-2 border resize-none"
      ></textarea>

      <button className="bg-blue-500 text-white p-2 w-full">Submit</button>
    </form>
  );
};

export default AddRequest;
