import React from 'react';

const MyProfile = ({ profiles = [] }) => (
    <div className="matchmaking-list">
        {profiles.length === 0 ? (
            <p>No profiles added yet.</p>
        ) : (
            <ul>
                {profiles.map((p, idx) => (
                    <li key={idx} className="matchmaking-profile-item">
                        <strong>{p.name}</strong> ({p.gender}, {p.age})<br />
                        Location: {p.location}<br />
                        Interests: {p.interests}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default MyProfile;
