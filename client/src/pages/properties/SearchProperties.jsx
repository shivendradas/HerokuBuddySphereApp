import React, { useState } from 'react';

const transactionTypeMap = {
    Buy: 'sell',
    Rent: 'rent',
    Lease: 'lease',
};

const SearchProperties = () => {
    const [transactionType, setTransactionType] = useState('Buy');
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiBaseUrl = process.env.REACT_APP_API_URL;

    const handleSearch = async () => {
        setLoading(true);
        const typeForQuery = transactionTypeMap[transactionType];
        try {
            const res = await fetch(`${apiBaseUrl}/api/properties/search?transactionType=${typeForQuery}`);
            const data = await res.json();
            setProperties(data);
        } catch (err) {
            setProperties([]);
        }
        setLoading(false);
    };

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

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-blue-400">Search Properties</h2>
            <select
                value={transactionType}
                onChange={e => setTransactionType(e.target.value)}
                className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none"
            >
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
                <option value="Lease">Lease</option>
            </select>
            <button
                onClick={handleSearch}
                disabled={loading}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Searching...' : 'Search'}
            </button>
            <ul>
                {properties.map(prop => (
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchProperties;
