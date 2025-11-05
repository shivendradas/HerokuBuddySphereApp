import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // react-router v6 hook
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../travelbuddy/Travelbuddy';
import LocationAutocomplete from '../../components/LocationAutoComplete';
import SelectAddress from '../../components/map/SelectAddress';

const AddRequest = ({ toastRef }) => {
  const navigate = useNavigate();
  const [loggedInEmail] = useState(localStorage.getItem('email'));
  const [address, setAddress] = useState(null);

  useEffect(() => {
    // Navigate to login if user is not logged in initially
    if (!loggedInEmail) {
      toastRef.current.show({ severity: 'info', summary: 'Info', detail: 'Please login first', life: 3000 });
      navigate('/login');
    }
  }, [loggedInEmail, navigate]);

  const [formData, setFormData] = React.useState({
    adGivenBy: '',
    ownerName: '',
    ownerContact: '',
    propertyType: '',
    transactionType: '',
    title: '',
    description: '',
    location: '',
    address: '',
    lat: 0.0,
    lon: 0.0,
    price: '',
    bedrooms: '',
    bathrooms: '',
    areaSqft: '',
    contactName: '',
    contactPhone: '',
    images: []
  });

  const apiBaseUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleLocation2Change = (val) => {
    setFormData((prev) => ({
      ...prev,
      location: val
    }));
  };
  const handleAddressChange = (address) => {
    setFormData(prev => ({
      ...prev,
      address: address ? address.address : '',
      lat: address ? address.lat : 0.0,
      lon: address ? address.lon : 0.0
    }));
    //alert("Address selected: " + (address ? address.address : 'No address')); 
  };
  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const base64Images = [];
      for (let i = 0; i < formData.images.length; i++) {
        const base64 = await toBase64(formData.images[i]);
        base64Images.push(base64);
      }

      const payload = {
        adGivenBy: formData.adGivenBy,
        ownerName: formData.ownerName,
        ownerContact: formData.ownerContact,
        propertyType: formData.propertyType,
        transactionType: formData.transactionType,
        description: formData.description,
        location: formData.location,
        address: formData.address,
        latitude: formData.lat,
        longitute: formData.lon,
        price: formData.price,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        areaSqft: formData.areaSqft,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        email: loggedInEmail || '',
        imageData: base64Images[0] || null
      };

      await axios.post(`${apiBaseUrl}/api/properties/addPropertyRequest`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'Property aid submitted!', life: 3000 });
    } catch (error) {
      console.error('Submit error:', error);
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'Submission failed.', life: 3000 });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex flex-col">
            <span className="mb-1 text-blue-300">You are:</span>
            <select
              name="adGivenBy"
              className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 focus:outline-none w-full"
              value={formData.adGivenBy || ''}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="owner">Owner</option>
              <option value="agent">Agent</option>
              <option value="builder">Builder</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-blue-300">Property Type:</span>
            <select
              name="propertyType"
              className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 focus:outline-none w-full"
              value={formData.propertyType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="flat">Flat</option>
              <option value="individual_home">Individual Home</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-blue-300">Type:</span>
            <select
              name="transactionType"
              className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 focus:outline-none w-full"
              value={formData.transactionType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
              <option value="rent">Rent</option>
              <option value="lease">Lease</option>
            </select>
          </label>
        </div>
        {formData.adGivenBy === 'agent' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="mb-1 text-blue-300">Owner Name:</span>
              <input
                name="ownerName"
                type="text"
                className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 focus:outline-none w-full"
                value={formData.ownerName || ''}
                onChange={handleChange}
                placeholder="Owner's full name"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1 text-blue-300">Owner Contact Number:</span>
              <input
                name="ownerContact"
                type="tel"
                className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 focus:outline-none w-full"
                value={formData.ownerContact || ''}
                onChange={handleChange}
                placeholder="Owner contact number"
              />
            </label>
          </div>
        )}
        <label>
          Description:
          <textarea
            name="description"
            className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full"
            placeholder="Property Description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          {/* <input name="location" type="text" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full" placeholder="City, Area" value={formData.location} onChange={handleChange} /> */}

          <LocationAutocomplete name="location" customStyle="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full" value={formData.location} onChange={handleLocation2Change} placeholder="City or state 1" countryCode="IN" />        </label>
        <label>
          Address:
          <input name="address" type="text" disabled={true} className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full" value={formData.address} />

          <SelectAddress customClassName="bg-blue-600 text-white px-4 py-2 rounded mt-4" selectedAddress={address} onAddressChange={handleAddressChange} />
        </label>
        <label>
          Price:
          <input name="price" type="number" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full" placeholder="Price" value={formData.price} onChange={handleChange} />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <label className="flex flex-col">
            <span className="mb-1 text-blue-300">Bedrooms:</span>
            <input name="bedrooms" type="number" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-0 focus:outline-none w-full" min="0" value={formData.bedrooms} onChange={handleChange} />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-blue-300">Bathrooms:</span>
            <input name="bathrooms" type="number" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-0 focus:outline-none w-full" min="0" value={formData.bathrooms} onChange={handleChange} />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-blue-300">Area (sq ft):</span>
            <input name="areaSqft" type="number" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-0 focus:outline-none w-full" min="0" value={formData.areaSqft} onChange={handleChange} />
          </label>
        </div>

        <label>
          Contact Name:
          <input name="contactName" type="text" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full" value={formData.contactName} onChange={handleChange} />
        </label>

        <label>
          Contact Phone:
          <input name="contactPhone" type="tel" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full" value={formData.contactPhone} onChange={handleChange} />
        </label>

        {formData.transactionType !== 'buy' && (
          <label>
            Property Images:
            <input name="images" type="file" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full" multiple onChange={handleChange} />
          </label>
        )}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          Submit Property Aid
        </button>
      </form>
    </div>
  );
};

export default AddRequest;
