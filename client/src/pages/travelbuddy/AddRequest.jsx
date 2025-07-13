// pages/AddRequest.jsx
import React, { useState } from 'react';
import axios from 'axios';
import stateCityData from '../../data/stateCityData.json';

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

    delete submissionData.fromState;
    delete submissionData.fromCity;
    delete submissionData.toState;
    delete submissionData.toCity;

    const apiBaseUrl = process.env.REACT_APP_API_URL;
    await axios.post(`${apiBaseUrl}/api/addRequest`, submissionData);

    alert('🎉 Request submitted successfully!');
  };

  const renderSelectOrCustomInput = (label, name, options, value, onChange, customValue, setCustomValue) => (
    <>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
        <option value="Other">Other</option>
      </select>
      {value === 'Other' && (
        <input
          type="text"
          placeholder={`Enter custom ${label}`}
          className="mt-2 w-full px-3 py-2 border rounded-md shadow-sm"
          value={customValue}
          onChange={e => setCustomValue(e.target.value)}
        />
      )}
    </>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">Add Travel Request</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        {renderSelectOrCustomInput('From State', 'fromState', Object.keys(stateCityData), formData.fromState, handleChange, customFromState, setCustomFromState)}

        {renderSelectOrCustomInput('From City', 'fromCity', stateCityData[formData.fromState] || [], formData.fromCity, handleChange, customFromCity, setCustomFromCity)}

        {renderSelectOrCustomInput('To State', 'toState', Object.keys(stateCityData), formData.toState, handleChange, customToState, setCustomToState)}

        {renderSelectOrCustomInput('To City', 'toCity', stateCityData[formData.toState] || [], formData.toCity, handleChange, customToCity, setCustomToCity)}

        <div>
          <label className="block text-sm font-medium text-gray-700">Travel Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              placeholder="10-digit mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email ID</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">User Type</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
          >
            <option value="">Select User Type</option>
            <option value="passenger">Passenger (Looking for a cab)</option>
            <option value="driver">Driver (Have a cab)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea
            name="description"
            placeholder="Any additional info (max 100 characters)"
            maxLength={100}
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default AddRequest;
