import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const AddItemAd = ({ toastRef }) => {
    const navigate = useNavigate();
    const [loggedInEmail] = useState(localStorage.getItem('email'));
    useEffect(() => {
        // Navigate to login if user is not logged in initially
        if (!loggedInEmail) {
            toastRef.current.show({ severity: 'info', summary: 'Info', detail: 'Please login first', life: 3000 });
            navigate('/login');
        }
    }, [loggedInEmail, navigate]);
    const [adDetails, setAdDetails] = useState({
        category: '',
        condition: '',
        title: '',
        description: '',
        price: '',
        brand: '',
        model: '',
        yearOfPurchase: '',
        contactEmail: loggedInEmail,
        contactPhone: '',
        location: '',
        adImage: null
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const apiBaseUrl = process.env.REACT_APP_API_URL;

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            if (files.length > 0) {
                setImageLoading(true);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                    setImageLoading(false);
                    setAdDetails(prev => ({
                        ...prev,
                        adImage: files[0]
                    }));
                };
                reader.readAsDataURL(files[0]);
            }
        } else {
            setAdDetails(prev => ({ ...prev, [name]: value }));
        }
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
            let base64Image = null;
            if (adDetails.adImage) {
                base64Image = await toBase64(adDetails.adImage);
            }

            const payload = {
                ...adDetails,
                adImageData: base64Image,
                adImage: undefined
            };

            delete payload.adImage;

            await axios.post(`${apiBaseUrl}/api/classifieds/add`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'Ad posted successfully!', life: 3000 });

            // Reset form and preview
            setAdDetails({
                category: '',
                condition: '',
                title: '',
                description: '',
                price: '',
                brand: '',
                model: '',
                yearOfPurchase: '',
                contactEmail: loggedInEmail,
                contactPhone: '',
                location: '',
                adImage: null
            });
            setImagePreview(null);

        } catch (error) {
            console.error('Ad submission error:', error);
            toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to post ad.', life: 3000 });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">Post Your Item for Sale</h2>
            <form onSubmit={handleSubmit} className="p-fluid classifieds-form">
                <div className="p-field">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" value={adDetails.category} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md shadow-sm">
                        <option value="">Select category</option>
                        <option value="Bike">Bike</option>
                        <option value="Television">Television</option>
                        <option value="Washing Machine">Washing Machine</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="condition">Condition</label>
                    <select id="condition" name="condition" value={adDetails.condition} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md shadow-sm">
                        <option value="">Select condition</option>
                        <option value="New">New</option>
                        <option value="Used - Like New">Used - Like New</option>
                        <option value="Used - Good">Used - Good</option>
                        <option value="Used - Fair">Used - Fair</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="title">Ad Title</label>
                    <input type="text" id="title" name="title" value={adDetails.title} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md shadow-sm" placeholder="Short description of the item" />
                </div>
                <div className="p-field">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={adDetails.description} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border rounded-md shadow-sm" placeholder="Detailed description of your item" />
                </div>
                <div className="p-field">
                    <label htmlFor="price">Price (in INR)</label>
                    <input type="number" id="price" name="price" value={adDetails.price} onChange={handleInputChange} min="0" required className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="brand">Brand</label>
                    <input type="text" id="brand" name="brand" value={adDetails.brand} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="model">Model</label>
                    <input type="text" id="model" name="model" value={adDetails.model} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="yearOfPurchase">Year of Purchase</label>
                    <input type="number" id="yearOfPurchase" name="yearOfPurchase" value={adDetails.yearOfPurchase} onChange={handleInputChange} min="1900" max={new Date().getFullYear()} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="contactEmail">Contact Email</label>
                    <input type="email" id="contactEmail" name="contactEmail" value={adDetails.contactEmail} onChange={handleInputChange} disabled={true} required className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="contactPhone">Contact Phone</label>
                    <input type="tel" id="contactPhone" name="contactPhone" value={adDetails.contactPhone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" value={adDetails.location} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md shadow-sm" placeholder="City or area" />
                </div>
                <div className="p-field">
                    <label htmlFor="adImage">Ad Image</label>
                    <input type="file" id="adImage" name="adImage" accept="image/*" onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                    {imageLoading && <div>Loading image...</div>}
                    {imagePreview && !imageLoading && <img src={imagePreview} alt="Ad Preview" className="mt-2 max-h-48 rounded-md" />}
                </div>

                <Button type="submit" label="Post Ad" className="p-mt-2" />
            </form>
        </div>
    );
};

export default AddItemAd;
