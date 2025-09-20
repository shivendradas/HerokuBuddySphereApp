// src/pages/matchmaking/SearchProfile.jsx
import React from 'react';
import { InputText } from 'primereact/inputtext';

const SearchProfile = ({ profiles, search, setSearch }) => {
    const filteredProfiles = profiles.filter(p => {
        const query = search.trim().toLowerCase();
        return (
            (p.name?.toLowerCase().includes(query)) ||
            (p.location?.toLowerCase().includes(query)) ||
            (Array.isArray(p.interests)
                ? p.interests.join(', ').toLowerCase().includes(query)
                : p.interests?.toString().toLowerCase().includes(query))
        );
    });

    return (
        <>
            <div className="p-field">
                <InputText
                    placeholder="Search by name, location, interests"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="matchmaking-search"
                />
            </div>
            <div className="matchmaking-list">
                {filteredProfiles.length === 0 ? (
                    <p>No profiles found.</p>
                ) : (
                    <ul>
                        {filteredProfiles.map((p, idx) => (
                            <li key={idx} className="matchmaking-profile-item">
                                <strong>{p.name}</strong> ({p.gender}, {p.age})<br />
                                Location: {p.location}<br />
                                Interests: {Array.isArray(p.interests) ? p.interests.join(', ') : p.interests}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default SearchProfile;
