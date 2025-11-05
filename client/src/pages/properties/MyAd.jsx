import React, { useState, useEffect } from 'react';

const MyAd = ({ toastRef }) => {
    const [loggedInEmail] = useState(localStorage.getItem('email'));
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiBaseUrl = process.env.REACT_APP_API_URL;

    const handleSearch = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiBaseUrl}/api/properties/myad/?email=${loggedInEmail}`);
            const data = await res.json();
            setProperties(data);
        } catch (err) {
            setProperties([]);
        }
        setLoading(false);
    };
    useEffect(() => {
        handleSearch();
    }, []); // empty dependency array ensures this runs only once on mount

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
    const handleDelete = async (propertyId) => {
        if (!window.confirm('Are you sure you want to delete this property?')) return;
        try {
            const res = await fetch(`${apiBaseUrl}/api/properties/delete/${propertyId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setProperties(properties.filter(prop => prop.id !== propertyId));
            } else {
                toastRef.current.show({ severity: 'warning', summary: 'Warning', detail: 'Failed to delete the property.', life: 3000 });
            }
        } catch (err) {
            toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting the property.', life: 3000 });
        }
    };
    const handleActiveDeactive = async (propertyId) => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/properties/toggleActive/${propertyId}`, {
                method: 'PATCH',
            });
            if (res.ok) {
                const updatedProperty = await res.json();
                setProperties(properties.map(prop => prop.id === propertyId ? updatedProperty : prop));
            } else {
                toastRef.current.show({ severity: 'warning', summary: 'Info', detail: 'Failed to update the property status.', life: 3000 });
            }
        } catch (err) {
            //alert('An error occurred while updating the property status.');
            toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while updating the property status.', life: 3000 });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
            {loading && (
                <img
                    src="/progress.gif"
                    alt="Travel Buddy"
                />
            )}
            <ul>
                {properties.length > 0 ? (properties.map(prop => (
                    <li
                        key={prop.id}
                        className="bg-gray-800 rounded-lg p-4 mb-5 shadow border border-blue-700"
                    >
                        <strong className="text-lg text-blue-300">{prop.name}</strong>
                        {prop.ad_given_by === 'agent' && (
                            <>
                                <div className="text-gray-300">Owner: {prop.owner_name}</div>
                                <div className="text-gray-300">Owner Contact: {prop.owner_contact}</div>
                            </>
                        )}
                        <div className="text-gray-300">Type: {prop.property_type}</div>
                        <div className="text-gray-300">Transaction: {prop.transaction_type}</div>
                        <div className="text-gray-400">Description: {prop.description}</div>
                        <div className="text-gray-300">Location: {prop.location}</div>
                        <div className="text-blue-400">Price: ₹{prop.price}</div>
                        <div className="text-gray-300">Bedrooms: {prop.bedrooms}</div>
                        <div className="text-gray-300">Bathrooms: {prop.bathrooms}</div>
                        <div className="text-gray-300">Area: {prop.area_sqft} sqft</div>
                        <div className="text-gray-300">Contact: {prop.contact_name} ({prop.contact_phone})</div>
                        {prop.images &&
                            <div>
                                <span className="text-blue-400">Images:</span>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                    <img
                                        key={prop.id}
                                        src={bufferObjectToBase64Image(prop.images, 'image/jpeg')}
                                        alt={`Property ${prop.name}`}
                                        style={{ width: '100px', height: '70px', objectFit: 'cover', border: '2px solid #3b82f6', cursor: 'pointer' }}
                                        className="rounded-md"
                                        onClick={() => {
                                            const imageSrc = bufferObjectToBase64Image(prop.images, 'image/jpeg');
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
                            </div>
                        }

                        <div className="mt-3 flex gap-3">
                            <button
                                className={`px-4 py-2 rounded ${prop.isActive ? 'bg-green-600' : 'bg-red-600'} text-white`}
                                onClick={() => handleActiveDeactive(prop.id)}
                            >
                                {prop.isactive ? 'Deactive' : 'Active'}
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-red-700 hover:bg-red-800 text-white"
                                onClick={() => handleDelete(prop.id)} // Add your delete logic here
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))
                ) : (
                    <li className="text-center text-gray-500 py-6">
                        No record found.
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MyAd;
