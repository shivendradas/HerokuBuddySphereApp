import React from 'react';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../travelbuddy/Travelbuddy';

const AddRequest = () => {
  const [formData, setFormData] = React.useState({
    propertyType: '',
    transactionType: '',
    title: '',
    description: '',
    location: '',
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
        propertyType: formData.propertyType,
        transactionType: formData.transactionType,
        transactionType: formData.transactionType,
        description: formData.description,
        location: formData.location,
        price: formData.price,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        areaSqft: formData.areaSqft,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        imageData: base64Images[0] || null
      };

      await axios.post(`${apiBaseUrl}/api/properties/addPropertyRequest`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      alert('Property aid submitted!');
    } catch (error) {
      console.error('Submit error:', error);
      alert('Submission failed.');
    }
  };

return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-blue-400">Add Property Aid</h2>
        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            <label>
                Property Type:
                <select name="propertyType" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none" value={formData.propertyType} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="flat">Flat</option>
                    <option value="individual_home">Individual Home</option>
                </select>
            </label>

            <label>
                Type:
                <select name="transactionType" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none" value={formData.transactionType} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                    <option value="rent">Rent</option>
                    <option value="lease">Lease</option>
                </select>
            </label>

            

            <label>
                Description:
                <textarea name="description" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full" placeholder="Property Description" value={formData.description} onChange={handleChange} />
            </label>

            <label>
                Location:
                <input name="location" type="text" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full" placeholder="City, Area" value={formData.location} onChange={handleChange} />
            </label>

            <label>
                Price:
                <input name="price" type="number" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full" placeholder="Price" value={formData.price} onChange={handleChange} />
            </label>

            <label>
                Bedrooms:
                <input name="bedrooms" type="number" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-24" min="0" value={formData.bedrooms} onChange={handleChange} />
            </label>

            <label>
                Bathrooms:
                <input name="bathrooms" type="number" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-24" min="0" value={formData.bathrooms} onChange={handleChange} />
            </label>

            <label>
                Area (sq ft):
                <input name="areaSqft" type="number" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-24" min="0" value={formData.areaSqft} onChange={handleChange} />
            </label>

            <label>
                Contact Name:
                <input name="contactName" type="text" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full" value={formData.contactName} onChange={handleChange} />
            </label>

            <label>
                Contact Phone:
                <input name="contactPhone" type="tel" className="bg-gray-800 text-blue-300 border border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none w-full" value={formData.contactPhone} onChange={handleChange} />
            </label>

            {/* Only show image upload if not 'buy' */}
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
