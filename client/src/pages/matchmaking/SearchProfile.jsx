import React, { useState } from 'react';

const searchTypeMap = {
  Bride: 'Male',
  Groom: 'Female',
};

const SearchProfile = () => {
  const [gender, setGender] = useState('Bride');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiBaseUrl = process.env.REACT_APP_API_URL;

  const handleSearch = async () => {
    setLoading(true);
    const typeForQuery = searchTypeMap[gender];
    try {
      const res = await fetch(`${apiBaseUrl}/api/matchmaking/search?gender=${typeForQuery}`);
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      setProperties([]);
    }
    setLoading(false);
  };

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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
      <label className="text-blue-300 mr-2">Looking for:</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none"
      >
        <option value="Male">Bride</option>
        <option value="Female">Groom</option>
      </select>
      <button
        onClick={handleSearch}
        disabled={loading}
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
      <ul>
        {properties.map((prop) => (
          <li
            key={prop.id}
            className="bg-gray-800 rounded-lg p-4 mb-5 shadow border border-blue-700"
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong className="text-lg text-blue-300">{prop.name}</strong>
                <div className="text-gray-300">Religion: {prop.religion}</div>
                <div className="text-gray-300">Education: {prop.education}</div>
                <div className="text-gray-300">Occupation: {prop.occupation}</div>
                <div className="text-gray-400">Salary: {prop.annual_income}</div>
                <div className="text-gray-300">Contact: {prop.phone}</div>
              </div>
              {prop.profile_image && (
                <div style={{ flexShrink: 0 }}>
                  <span className="text-blue-400 block mb-1">Profile Picture:</span>
                  <img
                    src={bufferObjectToBase64Image(prop.profile_image, 'image/jpeg')}
                    alt={`Profile ${prop.name}`}
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      border: '2px solid #3b82f6',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const imageSrc = bufferObjectToBase64Image(prop.profile_image, 'image/jpeg');
                      const imgHtml = `
          <html>
            <head><title>Image Preview</title></head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background-color:#000;">
              <img src="${imageSrc}" style="max-width:95vw; max-height:95vh;" alt="Preview" />
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchProfile;
