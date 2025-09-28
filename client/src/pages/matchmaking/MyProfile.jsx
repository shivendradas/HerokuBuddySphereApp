import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const MyProfile = ({ toastRef }) => {
    const navigate = useNavigate();
    const [loggedInEmail] = useState(localStorage.getItem('email'));
    const [loading, setLoading] = useState(false);

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
        email: loggedInEmail || '',
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

    const [existingImagePreview, setExistingImagePreview] = useState(null);
    const [newImagePreview, setNewImagePreview] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const apiBaseUrl = process.env.REACT_APP_API_URL;

    const bufferToBase64 = (buffer) => {
        if (!buffer) return null;
        let binary = '';
        const bytes = new Uint8Array(buffer);
        bytes.forEach(b => binary += String.fromCharCode(b));
        return `data:image/jpeg;base64,${window.btoa(binary)}`;
    };

    useEffect(() => {
        if (loggedInEmail) {
            setLoading(true);
            axios.get(`${apiBaseUrl}/api/matchmaking/myprofile?email=${loggedInEmail}`)
                .then(res => {
                    const data = res.data.find(p => p.email === loggedInEmail);
                    if (data) {
                        setProfile({
                            name: data.name || '',
                            dateOfBirth: data.date_of_birth ? data.date_of_birth.split('T')[0] : '',
                            age: data.age || '',
                            gender: data.gender || '',
                            maritalStatus: data.marital_status || '',
                            height: data.height || '',
                            weight: data.weight || '',
                            religion: data.religion || '',
                            caste: data.caste || '',
                            motherTongue: data.mother_tongue || '',
                            nationality: data.nationality || '',
                            email: data.email || loggedInEmail || '',
                            phone: data.phone || '',
                            education: data.education || '',
                            occupation: data.occupation || '',
                            annualIncome: data.annual_income || '',
                            fatherOccupation: data.father_occupation || '',
                            motherOccupation: data.mother_occupation || '',
                            siblings: data.siblings || '',
                            familyType: data.family_type || '',
                            foodHabits: data.food_habits || '',
                            smokingHabit: data.smoking_habit || '',
                            drinkingHabit: data.drinking_habit || '',
                            languagesKnown: data.languages_known || '',
                            aboutYourself: data.about_yourself || '',
                            partnerAgeRange: data.partner_age_range || '',
                            partnerHeightRange: data.partner_height_range || '',
                            partnerReligion: data.partner_religion || '',
                            partnerCaste: data.partner_caste || '',
                            partnerLocation: data.partner_location || '',
                            partnerEducation: data.partner_education || '',
                            partnerOccupation: data.partner_occupation || '',
                            profileImage: null
                        });
                        if (data.profile_image) {
                            setExistingImagePreview(bufferToBase64(data.profile_image.data));
                        }
                    } else {
                        toastRef.current.show({ severity: 'warn', summary: 'Warning', detail: 'Profile not found', life: 3000 });
                    }
                })
                .catch(error => {
                    console.error('Error loading profile:', error);
                    toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to load profile', life: 3000 });
                })
                .finally(() => setLoading(false));
        }
    }, [loggedInEmail, apiBaseUrl, navigate, toastRef]);

    const handleProfileChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            if (files.length > 0) {
                setImageLoading(true);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewImagePreview(reader.result);
                    setImageLoading(false);
                    setProfile(prev => ({ ...prev, profileImage: files[0] }));
                };
                reader.readAsDataURL(files[0]);
            }
        } else {
            setProfile(prev => ({ ...prev, [name]: value }));
        }
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let base64Image = null;
            if (profile.profileImage) {
                base64Image = await toBase64(profile.profileImage);
            }

            const payload = {
                ...profile,
                profileImageData: base64Image,
                email: loggedInEmail || profile.email,
                profileImage: undefined
            };

            delete payload.profileImage;

            await axios.put(`${apiBaseUrl}/api/matchmaking/updateProfile/${loggedInEmail}`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully!', life: 3000 });
        } catch (error) {
            console.error('Update error:', error);
            toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'Profile update failed.', life: 3000 });
        }
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">Update Profile</h2>
            {loading && <p>Loading...</p>}
            <form onSubmit={handleProfileSubmit} className="p-fluid matchmaking-form">
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" value={profile.name} onChange={handleProfileChange} required className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input id="dateOfBirth" name="dateOfBirth" type="date" value={profile.dateOfBirth} onChange={handleProfileChange} required className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="age">Age</label>
                    <input id="age" name="age" type="number" min="18" max="100" value={profile.age} onChange={handleProfileChange} required className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" value={profile.gender} onChange={handleProfileChange} required className="w-full px-3 py-2 border rounded-md shadow-sm">
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="maritalStatus">Marital Status</label>
                    <select id="maritalStatus" name="maritalStatus" value={profile.maritalStatus} onChange={handleProfileChange} required className="w-full px-3 py-2 border rounded-md shadow-sm">
                        <option value="">Select marital status</option>
                        <option value="Never Married">Never Married</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="height">Height (in cm)</label>
                    <input id="height" name="height" type="number" min="50" max="300" value={profile.height} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="weight">Weight (in kgs)</label>
                    <input id="weight" name="weight" type="number" min="20" max="200" value={profile.weight} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="religion">Religion</label>
                    <select
                        id="religion"
                        name="religion"
                        value={["Hindu", "Muslim", "Christian", "Sikh", "Jain"].includes(profile.religion) ? profile.religion : "Others"}
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
                    {(!["Hindu", "Muslim", "Christian", "Sikh", "Jain"].includes(profile.religion) || profile.religion === "Others") && (
                        <input
                            type="text"
                            id="religionOther"
                            name="religion"
                            value={(!["Hindu", "Muslim", "Christian", "Sikh", "Jain"].includes(profile.religion)) ? profile.religion : ""}
                            onChange={handleProfileChange}
                            placeholder="Please specify religion"
                            className="w-full px-3 py-2 border rounded-md shadow-sm mt-2"
                        />
                    )}
                </div>
                <div className="p-field">
                    <label htmlFor="caste">Caste/Sub-caste</label>
                    <input id="caste" name="caste" type="text" value={profile.caste} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="motherTongue">Mother Tongue</label>
                    <input id="motherTongue" name="motherTongue" type="text" value={profile.motherTongue} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="nationality">Nationality</label>
                    <input id="nationality" name="nationality" type="text" value={profile.nationality} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={profile.email} onChange={handleProfileChange} required className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" value={profile.phone} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="education">Educational Qualification</label>
                    <input id="education" name="education" type="text" value={profile.education} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="occupation">Occupation</label>
                    <input id="occupation" name="occupation" type="text" value={profile.occupation} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="annualIncome">Annual Income</label>
                    <input id="annualIncome" name="annualIncome" type="number" value={profile.annualIncome} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="fatherOccupation">Father's Occupation</label>
                    <input id="fatherOccupation" name="fatherOccupation" type="text" value={profile.fatherOccupation} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="motherOccupation">Mother's Occupation</label>
                    <input id="motherOccupation" name="motherOccupation" type="text" value={profile.motherOccupation} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="siblings">Number of Siblings</label>
                    <input id="siblings" name="siblings" type="number" min="0" max="20" value={profile.siblings} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="familyType">Family Type</label>
                    <select id="familyType" name="familyType" value={profile.familyType} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm">
                        <option value="">Select family type</option>
                        <option value="Nuclear">Nuclear</option>
                        <option value="Joint">Joint</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="foodHabits">Food Habits</label>
                    <select id="foodHabits" name="foodHabits" value={profile.foodHabits} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm">
                        <option value="">Select food habit</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                        <option value="Eggetarian">Eggetarian</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="smokingHabit">Smoking Habit</label>
                    <select id="smokingHabit" name="smokingHabit" value={profile.smokingHabit} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm">
                        <option value="">Select smoking habit</option>
                        <option value="No">No</option>
                        <option value="Occasionally">Occasionally</option>
                        <option value="Regularly">Regularly</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="drinkingHabit">Drinking Habit</label>
                    <select id="drinkingHabit" name="drinkingHabit" value={profile.drinkingHabit} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm">
                        <option value="">Select drinking habit</option>
                        <option value="No">No</option>
                        <option value="Occasionally">Occasionally</option>
                        <option value="Regularly">Regularly</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="languagesKnown">Languages Known</label>
                    <input id="languagesKnown" name="languagesKnown" type="text" value={profile.languagesKnown} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="aboutYourself">About Yourself</label>
                    <textarea id="aboutYourself" name="aboutYourself" rows={4} value={profile.aboutYourself} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>

                <h3>Partner Preferences</h3>

                <div className="p-field">
                    <label htmlFor="partnerAgeRange">Age Range</label>
                    <input id="partnerAgeRange" name="partnerAgeRange" type="text" placeholder="e.g. 25-30" value={profile.partnerAgeRange} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="partnerHeightRange">Height Range (cm)</label>
                    <input id="partnerHeightRange" name="partnerHeightRange" type="text" placeholder="e.g. 160-175" value={profile.partnerHeightRange} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="partnerReligion">Religion</label>
                    <select id="partnerReligion" name="partnerReligion" value={profile.partnerReligion} onChange={handleProfileChange} required className="w-full px-3 py-2 border rounded-md shadow-sm">
                        <option value="">Select religion</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Sikh">Sikh</option>
                        <option value="Christian">Christian</option>
                        <option value="Any">Any</option>
                    </select>
                </div>
                <div className="p-field">
                    <label htmlFor="partnerCaste">Caste/Sub-caste</label>
                    <input id="partnerCaste" name="partnerCaste" type="text" value={profile.partnerCaste} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="partnerLocation">Location</label>
                    <input id="partnerLocation" name="partnerLocation" type="text" value={profile.partnerLocation} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="partnerEducation">Education</label>
                    <input id="partnerEducation" name="partnerEducation" type="text" value={profile.partnerEducation} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>
                <div className="p-field">
                    <label htmlFor="partnerOccupation">Occupation</label>
                    <input id="partnerOccupation" name="partnerOccupation" type="text" value={profile.partnerOccupation} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                </div>

                <div className="p-field">
                    <label htmlFor="profileImage">Profile Image</label>
                    <input id="profileImage" name="profileImage" type="file" accept="image/*" onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-md shadow-sm" />
                    {imageLoading && <div>Loading image...</div>}
                    {newImagePreview && !imageLoading ? (
                        <img src={newImagePreview} alt="New Profile Preview" className="mt-2 max-h-48 rounded-md" />
                    ) : existingImagePreview ? (
                        <img src={existingImagePreview} alt="Existing Profile" className="mt-2 max-h-48 rounded-md" />
                    ) : null}
                </div>

                <Button type="submit" label="Update Profile" className="p-mt-2 matchmaking-btn" disabled={loading} />
            </form>
        </div>
    );
};

export default MyProfile;
