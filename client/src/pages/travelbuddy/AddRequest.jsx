// pages/AddRequest.jsx
import React, { useState } from 'react';
import axios from 'axios';

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata'];

const AddRequest = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    dateTime: '',
    name: '',
    mobile: '',
    email: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/addRequest', formData);
    alert('Request submitted successfully');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <select name="from" onChange={handleChange} className="w-full p-2 border">
        <option value="">From City</option>
        {cities.map(city => <option key={city}>{city}</option>)}
      </select>
      <select name="to" onChange={handleChange} className="w-full p-2 border">
        <option value="">To City</option>
        {cities.map(city => <option key={city}>{city}</option>)}
      </select>
      <input type="datetime-local" name="dateTime" onChange={handleChange} className="w-full p-2 border" />
      <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border" />
      <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} className="w-full p-2 border" />
      <input type="email" name="email" placeholder="Email ID" onChange={handleChange} className="w-full p-2 border" />
      <button className="bg-blue-500 text-white p-2 w-full">Submit</button>
    </form>
  );
};

export default AddRequest;

