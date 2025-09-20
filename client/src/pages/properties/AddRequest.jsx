import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../travelbuddy/Travelbuddy'; // Add scroll style here

const AddRequest = () => {
    return (
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">Add Property Aid</h2>
                <form className="grid grid-cols-1 gap-4">
                    <label>
                        Property Type:
                        <select className="ml-2 p-2 border rounded">
                            <option value="">Select</option>
                            <option value="flat">Flat</option>
                            <option value="individual_home">Individual Home</option>
                        </select>
                    </label>
                    <label>
                        Title:
                        <input type="text" className="ml-2 p-2 border rounded w-full" placeholder="Property Title" />
                    </label>
                    <label>
                        Description:
                        <textarea className="ml-2 p-2 border rounded w-full" placeholder="Property Description" />
                    </label>
                    <label>
                        Location:
                        <input type="text" className="ml-2 p-2 border rounded w-full" placeholder="City, Area" />
                    </label>
                    <label>
                        Price:
                        <input type="number" className="ml-2 p-2 border rounded w-full" placeholder="Price" />
                    </label>
                    <label>
                        Bedrooms:
                        <input type="number" className="ml-2 p-2 border rounded w-24" min="0" />
                    </label>
                    <label>
                        Bathrooms:
                        <input type="number" className="ml-2 p-2 border rounded w-24" min="0" />
                    </label>
                    <label>
                        Area (sq ft):
                        <input type="number" className="ml-2 p-2 border rounded w-24" min="0" />
                    </label>
                    <label>
                        Contact Name:
                        <input type="text" className="ml-2 p-2 border rounded w-full" />
                    </label>
                    <label>
                        Contact Phone:
                        <input type="tel" className="ml-2 p-2 border rounded w-full" />
                    </label>
                    <label>
                        Property Images:
                        <input type="file" className="ml-2 p-2 border rounded w-full" multiple />
                    </label>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
                        Submit Property Aid
                    </button>
                </form>
            </div>
    );
};

export default AddRequest;
