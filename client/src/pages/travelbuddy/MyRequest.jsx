import React, { useState, useEffect } from 'react';

const MyRequest = ({ toastRef }) => {
    const [loggedInEmail] = useState(localStorage.getItem('email'));
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiBaseUrl = process.env.REACT_APP_API_URL;

    const handleSearch = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiBaseUrl}/api/findBuddy/myad/?email=${loggedInEmail}`);
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

    const handleDelete = async (travelId) => {
        if (!window.confirm('Are you sure you want to delete this request?')) return;
        try {
            const res = await fetch(`${apiBaseUrl}/api/findBuddy/delete/${travelId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setProperties(properties.filter(prop => prop.id !== travelId));
            } else {
                toastRef.current.show({ severity: 'warning', summary: 'Warning', detail: 'Failed to delete the request.', life: 3000 });
            }
        } catch (err) {
            toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting the request.', life: 3000 });
        }
    };
    const handleActiveDeactive = async (travelId) => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/findBuddy/toggleActive/${travelId}`, {
                method: 'PATCH',
            });
            if (res.ok) {
                const updatedrequest = await res.json();
                setProperties(properties.map(prop => prop.id === travelId ? updatedrequest : prop));
            } else {
                toastRef.current.show({ severity: 'warning', summary: 'Info', detail: 'Failed to update the request status.', life: 3000 });
            }
        } catch (err) {
            toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while updating the request status.', life: 3000 });
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
                {properties.length > 0 ? (
                    properties.map(prop => (
                        <li
                            key={prop.id}
                            className="bg-gray-800 rounded-lg p-4 mb-5 shadow border border-blue-700"
                        >
                            <strong className="text-lg text-blue-300">{prop.name}</strong>
                            <div className="text-gray-300">From City: {prop.from_city}</div>
                            <div className="text-gray-300">To City: {prop.to_city}</div>
                            <div className="text-gray-400">Description: {prop.description}</div>
                            <div className="text-gray-300">Date Time of Travel: {prop.date_time}</div>
                            <div className="text-blue-400">Contact Number: ₹{prop.mobile}</div>
                            <div className="text-gray-300">User Type: {prop.user_type}</div>
                            <div className="mt-3 flex gap-3">
                                <button
                                    className={`px-4 py-2 rounded ${prop.isactive ? 'bg-green-600' : 'bg-red-600'} text-white`}
                                    onClick={() => handleActiveDeactive(prop.id)}
                                >
                                    {prop.isactive ? 'Deactive' : 'Active'}
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
                    <li className="text-center text-gray-500 py-6">
                        No record found.
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MyRequest;
