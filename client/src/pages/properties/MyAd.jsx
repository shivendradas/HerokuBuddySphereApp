import React, { useState, useEffect } from 'react';

const transactionTypeMap = {
    Buy: 'sell',
    Rent: 'rent',
    Lease: 'lease',
};

const MyAd = ({toastRef}) => {
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
            }   else {
                toastRef.current.show({ severity: 'warning', summary: 'Info', detail: 'Failed to update the property status.', life: 3000 });
            }
        } catch (err) {
            //alert('An error occurred while updating the property status.');
            toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while updating the property status.', life: 3000 });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-blue-400">My Ad</h2>

            <ul>
                {properties.map(prop => (
                    console.log(prop),
                    <li
                        key={prop.id}
                        className="bg-gray-800 rounded-lg p-4 mb-5 shadow border border-blue-700"
                    >
                        <strong className="text-lg text-blue-300">{prop.name}</strong>
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
                                        style={{ width: '100px', height: '70px', objectFit: 'cover', border: '2px solid #3b82f6' }}
                                        className="rounded-md"
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
                ))}
            </ul>
        </div>
    );
};

export default MyAd;
