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
        <div>
            <h2>Search Properties</h2>
            <select
                value={transactionType}
                onChange={e => setTransactionType(e.target.value)}
            >
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
                <option value="Lease">Lease</option>
            </select>
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
            <ul>
                {properties.map(prop => (
                    <li key={prop.id} style={{ marginBottom: '20px' }}>
                        <strong>{prop.name}</strong>
                        <div>Type: {prop.property_type}</div>
                        <div>Transaction: {prop.transaction_type}</div>
                        <div>Description: {prop.description}</div>
                        <div>Location: {prop.location}</div>
                        <div>Price: ₹{prop.price}</div>
                        <div>Bedrooms: {prop.bedrooms}</div>
                        <div>Bathrooms: {prop.bathrooms}</div>
                        <div>Area: {prop.area_sqft} sqft</div>
                        <div>Contact: {prop.contact_name} ({prop.contact_phone})</div>
                        {prop.images &&
                            <div>
                                Images:
                                <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                    <img
                                        key={prop.id}
                                        src={bufferObjectToBase64Image(prop.images, 'image/jpeg')}
                                        alt={`Property ${prop.name}`}
                                        style={{ width: '100px', height: '70px', objectFit: 'cover' }}
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
