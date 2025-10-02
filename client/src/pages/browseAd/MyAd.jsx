import React, { useState, useEffect } from 'react';

const MyAd = ({ toastRef }) => {
  const [loggedInEmail] = useState(localStorage.getItem('email'));
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiBaseUrl = process.env.REACT_APP_API_URL;

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
    if (!loggedInEmail) {
      setAds([]);
      return;
    }
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('email', loggedInEmail);
      if (category) queryParams.append('category', category);
      if (condition) queryParams.append('condition', condition);

      const res = await fetch(`${apiBaseUrl}/api/classifieds/myad/?${queryParams.toString()}`);
      const data = await res.json();
      if (data.length === 0) {
        toastRef.current?.show({
          severity: 'warning',
          summary: 'Warning',
          detail: 'No results found. Please modify your search criteria.',
          life: 3000,
        });
      }
      setAds(data);
    } catch {
      setAds([]);
      toastRef.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to fetch ads.',
        life: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, [loggedInEmail]); // Initial load with no filters

  const handleDelete = async (propertyId) => {
    if (!window.confirm('Are you sure you want to delete this Ad?')) return;
    try {
      const res = await fetch(`${apiBaseUrl}/api/classifieds/delete/${propertyId}`, { method: 'DELETE' });
      if (res.ok) {
        setAds(ads.filter((prop) => prop.id !== propertyId));
        toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'Ad deleted.', life: 3000 });
      } else {
        toastRef.current?.show({ severity: 'warning', summary: 'Warning', detail: 'Failed to delete the Ad.', life: 3000 });
      }
    } catch {
      toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting the Ad.', life: 3000 });
    }
  };

  const handleActiveDeactive = async (propertyId) => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/classifieds/toggleActive/${propertyId}`, { method: 'PATCH' });
      if (res.ok) {
        const updatedProperty = await res.json();
        setAds(ads.map((prop) => (prop.id === propertyId ? updatedProperty : prop)));
        toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'Property status updated.', life: 3000 });
      } else {
        toastRef.current?.show({ severity: 'warning', summary: 'Info', detail: 'Failed to update the Ad status.', life: 3000 });
      }
    } catch {
      toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while updating the Ad status.', life: 3000 });
    }
  };

  const openImagePreview = (imageSrc) => {
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
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-400">My Classified Ads</h2>
      <ul>
        {ads.length > 0 ? (
          ads.map((prop) => (
            <li key={prop.id} className="bg-gray-800 rounded-lg p-4 mb-5 shadow border border-blue-700">
              <strong className="text-lg text-blue-300">{prop.title}</strong>
              <div className="text-gray-300">Category: {prop.category || '-'}</div>
              <div className="text-gray-300">Condition: {prop.condition || '-'}</div>
              <div className="text-gray-300">Type: {prop.brand}</div>
              <div className="text-gray-300">Transaction: {prop.year_of_purchase}</div>
              <div className="text-gray-400">Description: {prop.description}</div>
              <div className="text-gray-300">Location: {prop.location}</div>
              <div className="text-blue-400">Price: ₹{prop.price}</div>
              <div className="text-gray-300">Contact: {prop.contact_name} ({prop.contact_phone})</div>
              {prop.images && (
                <div>
                  <span className="text-blue-400">Images:</span>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                    <img
                      src={bufferObjectToBase64Image(prop.images, 'image/jpeg')}
                      alt={`Property ${prop.name}`}
                      style={{ width: '100px', height: '70px', objectFit: 'cover', border: '2px solid #3b82f6', cursor: 'pointer' }}
                      className="rounded-md"
                      onClick={() => openImagePreview(bufferObjectToBase64Image(prop.images, 'image/jpeg'))}
                    />
                  </div>
                </div>
              )}
              <div className="mt-3 flex gap-3">
                <button
                  className={`px-4 py-2 rounded ${prop.isActive ? 'bg-green-600' : 'bg-red-600'} text-white`}
                  onClick={() => handleActiveDeactive(prop.id)}
                >
                  {prop.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-700 hover:bg-red-800 text-white"
                  onClick={() => handleDelete(prop.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 py-6">No record found.</li>
        )}
      </ul>
    </div>
  );
};

export default MyAd;
