import React, { useState } from 'react';

const SearchClassifiedAds = ({toastRef}) => {
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiBaseUrl = process.env.REACT_APP_API_URL;

  // Convert Node.js Buffer object to Base64 image string
  const bufferObjectToBase64Image = (bufferObj, mimeType = 'image/jpeg') => {
    if (!bufferObj || !Array.isArray(bufferObj.data)) return '';
    const uint8Arr = new Uint8Array(bufferObj.data);
    let binary = '';
    for (let i = 0; i < uint8Arr.byteLength; i++) {
      binary += String.fromCharCode(uint8Arr[i]);
    }
    const base64 = window.btoa(binary);
    return `data:${mimeType};base64,${base64}`;
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (category) queryParams.append('category', category);
      if (condition) queryParams.append('condition', condition);
      // Add more filters here if needed

      const res = await fetch(`${apiBaseUrl}/api/classifieds/search?${queryParams.toString()}`);      
      const data = await res.json();
      if (data.length === 0) {
        toastRef.current.show({ severity: 'warning', summary: 'Warning', detail: 'No results found. Please modify your search criteria.', life: 3000 });
      }
      setAds(data);
    } catch (err) {
      setAds([]);
      console.error('Search error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-400">Search Classified Ads</h2>

      <div className="mb-4">
        <label className="text-blue-300 block mb-1">Category</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 w-full focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="Bike">Bike</option>
          <option value="Television">Television</option>
          <option value="Washing Machine">Washing Machine</option>
          <option value="Laptop">Laptop</option>
          <option value="Desktop">Desktop</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="text-blue-300 block mb-1">Condition</label>
        <select
          value={condition}
          onChange={e => setCondition(e.target.value)}
          className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 w-full focus:outline-none"
        >
          <option value="">All Conditions</option>
          <option value="New">New</option>
          <option value="Used - Like New">Used - Like New</option>
          <option value="Used - Good">Used - Good</option>
          <option value="Used - Fair">Used - Fair</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        disabled={loading}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 w-full"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      <ul>
        {ads.map(ad => (
          <li
            key={ad.id}
            className="bg-gray-800 rounded-lg p-4 mb-5 shadow border border-blue-700"
          >
            <strong className="text-lg text-blue-300">{ad.title}</strong>
            <div className="text-gray-300">Category: {ad.category}</div>
            <div className="text-gray-300">Condition: {ad.condition}</div>
            <div className="text-gray-400">Description: {ad.description}</div>
            <div className="text-blue-400">Price: ₹{ad.price}</div>
            <div className="text-gray-300">Brand: {ad.brand || '-'}</div>
            <div className="text-gray-300">Model: {ad.model || '-'}</div>
            <div className="text-gray-300">Year of Purchase: {ad.year_of_purchase || '-'}</div>
            <div className="text-gray-300">Location: {ad.location || '-'}</div>
            <div className="text-gray-300">Contact: {ad.contact_email} {ad.contact_phone && `(${ad.contact_phone})`}</div>

            {ad.ad_image && (
              <div className="mt-3">
                <span className="text-blue-400">Image:</span>
                <img
                  src={bufferObjectToBase64Image(ad.ad_image, 'image/jpeg')}
                  alt={`Ad ${ad.title}`}
                  className="mt-2 max-h-48 rounded-md border-2 border-blue-600 cursor-pointer"
                  onClick={() => {
                    const imageSrc = bufferObjectToBase64Image(ad.ad_image, 'image/jpeg');
                    const imgHtml = `
                      <html>
                        <head><title>Image Preview</title></head>
                        <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background-color:#000;">
                          <img src="${imageSrc}" style="max-width:95vw;max-height:95vh;" alt="Preview" />
                        </body>
                      </html>
                    `;
                    const popup = window.open('', '_blank', 'width=800,height=600');
                    if (popup) {
                      popup.document.write(imgHtml);
                      popup.document.close();
                    } else {
                      alert('Popup blocked. Please allow popups for this site.');
                    }
                  }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchClassifiedAds;
