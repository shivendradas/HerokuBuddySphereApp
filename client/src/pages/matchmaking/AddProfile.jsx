import React, { useState } from 'react';
import { Button } from 'primereact/button';

const AddProfile = ({ onAddProfile }) => {
    const [profile, setProfile] = useState({
        name: '',
        dateOfBirth: '',
        age: '',
        gender: '',
        maritalStatus: '',
        height: '',
        weight: '',
        religion: '',
        caste: '',
        motherTongue: '',
        nationality: '',
        email: '',
        phone: '',
        education: '',
        occupation: '',
        annualIncome: '',
        fatherOccupation: '',
        motherOccupation: '',
        siblings: '',
        familyType: '',
        foodHabits: '',
        smokingHabit: '',
        drinkingHabit: '',
        languagesKnown: '',
        aboutYourself: '',
        partnerAgeRange: '',
        partnerHeightRange: '',
        partnerReligion: '',
        partnerCaste: '',
        partnerLocation: '',
        partnerEducation: '',
        partnerOccupation: '',
        profileImage: null
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageLoading(true);
            // Simulate loading if uploading to server
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setImageLoading(false);
                setProfile(prev => ({
                    ...prev,
                    profileImage: file
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        if (onAddProfile) {
            onAddProfile(profile);
        }
        setProfile({
            name: '',
            dateOfBirth: '',
            age: '',
            gender: '',
            maritalStatus: '',
            height: '',
            weight: '',
            religion: '',
            caste: '',
            motherTongue: '',
            nationality: '',
            email: '',
            phone: '',
            education: '',
            occupation: '',
            annualIncome: '',
            fatherOccupation: '',
            motherOccupation: '',
            siblings: '',
            familyType: '',
            foodHabits: '',
            smokingHabit: '',
            drinkingHabit: '',
            languagesKnown: '',
            aboutYourself: '',
            partnerAgeRange: '',
            partnerHeightRange: '',
            partnerReligion: '',
            partnerCaste: '',
            partnerLocation: '',
            partnerEducation: '',
            partnerOccupation: '',
            profileImage: null
        });
        setImagePreview(null);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">Add Profile</h2>
            <form onSubmit={handleProfileSubmit} className="p-fluid matchmaking-form">
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={profile.name} onChange={handleProfileChange} required className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleProfileChange} required className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" name="age" value={profile.age} onChange={handleProfileChange} required min="18" max="100" className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" value={profile.gender} onChange={handleProfileChange} required className="w-full px-3 py-2 border rounded-md shadow-sm" >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="maritalStatus">Marital Status</label>
                    <select id="maritalStatus" name="maritalStatus" value={profile.maritalStatus} onChange={handleProfileChange} required className="w-full px-3 py-2 border rounded-md shadow-sm" >
                        <option value="">Select marital status</option>
                        <option value="Never Married">Never Married</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="height">Height (in cm)</label>
                    <input type="number" id="height" name="height" value={profile.height} onChange={handleProfileChange} min="50" max="300" className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="weight">Weight (in kgs)</label>
                    <input type="number" id="weight" name="weight" value={profile.weight} onChange={handleProfileChange} min="20" max="200" className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="religion">Religion</label>
                    <select
                        id="religion"
                        name="religion"
                        value={
                            profile.religion === "" ? "Hindu" :
                                ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Others"].includes(profile.religion)
                                    ? profile.religion
                                    : "Others"
                        }
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border rounded-md shadow-sm"
                    >
                        <option value="">Select religion</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Christian">Christian</option>
                        <option value="Sikh">Sikh</option>
                        <option value="Others">Others</option>
                    </select>
                    {(profile.religion === "Others" || !["Hindu", "Muslim", "Christian", "Sikh", "Jain"].includes(profile.religion)) ? (
                        <input
                            type="text"
                            id="religionOther"
                            name="religion"
                            value={["Hindu", "Muslim", "Christian", "Sikh", "Jain"].includes(profile.religion) ? "" : profile.religion}
                            onChange={handleProfileChange}
                            placeholder="Please specify religion"
                            className="w-full px-3 py-2 border rounded-md shadow-sm mt-2"
                        />
                    ) : null}
                </div>
                <div className="p-field">
                    <label htmlFor="caste">Caste/Sub-caste</label>
                    <input type="text" id="caste" name="caste" value={profile.caste} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="motherTongue">Mother Tongue</label>
                    <input type="text" id="motherTongue" name="motherTongue" value={profile.motherTongue} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="nationality">Nationality</label>
                    <input type="text" id="nationality" name="nationality" value={profile.nationality} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={profile.email} onChange={handleProfileChange} required className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={profile.phone} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="education">Educational Qualification</label>
                    <input type="text" id="education" name="education" value={profile.education} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="occupation">Occupation</label>
                    <input type="text" id="occupation" name="occupation" value={profile.occupation} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="annualIncome">Annual Income</label>
                    <input type="number" id="annualIncome" name="annualIncome" value={profile.annualIncome} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="fatherOccupation">Father's Occupation</label>
                    <input type="text" id="fatherOccupation" name="fatherOccupation" value={profile.fatherOccupation} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="motherOccupation">Mother's Occupation</label>
                    <input type="text" id="motherOccupation" name="motherOccupation" value={profile.motherOccupation} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="siblings">Number of Siblings</label>
                    <input type="number" id="siblings" name="siblings" value={profile.siblings} onChange={handleProfileChange} min="0" max="20" className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="familyType">Family Type</label>
                    <select id="familyType" name="familyType" value={profile.familyType} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" >
                        <option value="">Select family type</option>
                        <option value="Nuclear">Nuclear</option>
                        <option value="Joint">Joint</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="foodHabits">Food Habits</label>
                    <select id="foodHabits" name="foodHabits" value={profile.foodHabits} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" >
                        <option value="">Select food habit</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                        <option value="Eggetarian">Eggetarian</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="smokingHabit">Smoking Habit</label>
                    <select id="smokingHabit" name="smokingHabit" value={profile.smokingHabit} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" >
                        <option value="">Select smoking habit</option>
                        <option value="No">No</option>
                        <option value="Occasionally">Occasionally</option>
                        <option value="Regularly">Regularly</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="drinkingHabit">Drinking Habit</label>
                    <select id="drinkingHabit" name="drinkingHabit" value={profile.drinkingHabit} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" >
                        <option value="">Select drinking habit</option>
                        <option value="No">No</option>
                        <option value="Occasionally">Occasionally</option>
                        <option value="Regularly">Regularly</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="languagesKnown">Languages Known</label>
                    <input type="text" id="languagesKnown" name="languagesKnown" value={profile.languagesKnown} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="aboutYourself">About Yourself</label>
                    <textarea id="aboutYourself" name="aboutYourself" value={profile.aboutYourself} onChange={handleProfileChange} rows={4} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>

                <h3>Partner Preferences</h3>

                <div className="p-field">
                    <label htmlFor="partnerAgeRange">Age Range</label>
                    <input type="text" id="partnerAgeRange" name="partnerAgeRange" value={profile.partnerAgeRange} onChange={handleProfileChange} placeholder="e.g. 25-30" className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="partnerHeightRange">Height Range (cm)</label>
                    <input type="text" id="partnerHeightRange" name="partnerHeightRange" value={profile.partnerHeightRange} onChange={handleProfileChange} placeholder="e.g. 160-175" className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="partnerReligion">Religion</label>
                    <div className="p-field">
                        <select
                            id="partnerReligion"
                            name="partnerReligion"
                            value={profile.partnerReligion}
                            onChange={handleProfileChange}
                            required
                            className="w-full px-3 py-2 border rounded-md shadow-sm"
                        >
                            <option value="">Select religion</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Muslim">Muslim</option>
                            <option value="Sikh">Sikh</option>
                            <option value="Christian">Christian</option>
                            <option value="Any">Any</option>
                        </select>
                    </div>
                </div>
                <div className="p-field">
                    <label htmlFor="partnerCaste">Caste/Sub-caste</label>
                    <input type="text" id="partnerCaste" name="partnerCaste" value={profile.partnerCaste} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="partnerLocation">Location</label>
                    <input type="text" id="partnerLocation" name="partnerLocation" value={profile.partnerLocation} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="partnerEducation">Education</label>
                    <input type="text" id="partnerEducation" name="partnerEducation" value={profile.partnerEducation} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="partnerOccupation">Occupation</label>
                    <input type="text" id="partnerOccupation" name="partnerOccupation" value={profile.partnerOccupation} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="profileImage">Profile Image</label>
                    <input
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {imageLoading && <div>Loading image...</div>}
                    {imagePreview && !imageLoading && (
                        <img src={imagePreview} alt="Profile Preview" className="mt-2 max-h-48 rounded-md" />
                    )}
                </div>

                {/* Partner preferences and other fields here */}

                <Button type="submit" label="Add Profile" className="p-mt-2 matchmaking-btn" />
            </form>
        </div>
    );
};

export default AddProfile;
